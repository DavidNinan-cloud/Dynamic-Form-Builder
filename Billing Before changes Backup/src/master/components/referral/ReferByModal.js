import React, { useEffect } from "react";

//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../common/ModalStyle";

import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

//fromfield control liberary componant import
import InputField from "../common/formfields/InputField";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import CheckBoxField from "../common/formfields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
//icon for closing the modal form

//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

// imports from react-query library
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

//importing the asynchronous function for using in the react query hooks
import {
  addNewReferBy,
  getReferById,
  updateReferBy,
} from "../../services/referal/ReferByServices";
import { getReferTypeList } from "../../services/referal/ReferTypeServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";

//phone number validation regular expression
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function ReferByModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    referByCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, "Refer By Code not valid"),
    referByName: yup
      .string()
      .required("Required")
      .min(2, "Add Refer By Name"),

    referByAddress: yup.string(),

    referByContactNo: yup.string(),
    referByEmail: yup.string().email("Invalid email format"),
    referByRegistrationNo: yup.string(),
    // .required("Add Refer By  Reg. No")
    referByAccountNo: yup.string(),
    // .required("Add Refer By Account Number")
    // .matches(/^[0-9]{0,11}$/, "Refer By Account Number not valid")
    // .min(11, "Add 11 digit Account Number")
    referByBankName: yup.string(),

    // .required("Refer By Bank Name must be added")
    // .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field ")
    referType: yup
      .object()
      .required("Required")
      .nullable()

      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    referByCode: "",
    referByName: "",
    referByAddress: "",
    referByContactNo: "",
    referByEmail: "",
    referByRegistrationNo: "",
    referByAccountNo: "",
    referByBankName: "",
    referType: null,
    active: true,
  };

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  const [unit, setUnit] = React.useState([]);
  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  const [referType, setReferType] = React.useState();
  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    // errors object for show you the errors in the form
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      let updateObj = {
        active: data.active,

        id: data.id,

        referByAccountNo: data.referByAccountNo,

        referByAddress: data.referByAddress,

        referByBankName: data.referByBankName,

        referByCode: data.referByCode,

        referByContactNo: data.referByContactNo,

        referByEmail: data.referByEmail,

        referByName: data.referByName,

        referByRegistrationNo: data.referByRegistrationNo,

        referType: {
          id: data.referType.id,
        },
      };
      //invoke the function to send the put request
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postObj = {
        active: data.active,

        referByAccountNo: data.referByAccountNo,

        referByAddress: data.referByAddress,

        referByBankName: data.referByBankName,

        referByCode: data.referByCode,

        referByContactNo: data.referByContactNo,

        referByEmail: data.referByEmail,

        referByName: data.referByName,

        referByRegistrationNo: data.referByRegistrationNo,

        referType: {
          id: data.referType.id,
        },
      };

      console.log(postObj);

      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postReferBy(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postReferBy } = useMutation(addNewReferBy, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);

      successAlert(result.data.message);
      console.log("Record has been created");

      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      props.setEdit(false);
      reset(defaultValues);
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["ReferBy", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getReferById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        console.log(status);

        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        let resetObj = {
          active: data.data.result.status,

          id: data.data.result.id,

          referByAccountNo: data.data.result.referByAccountNo,

          referByAddress: data.data.result.referByAddress,

          referByBankName: data.data.result.referByBankName,

          referByCode: data.data.result.referByCode,

          referByContactNo: data.data.result.referByContactNo,

          referByEmail: data.data.result.referByEmail,

          referByName: data.data.result.referByName,

          referByRegistrationNo: data.data.result.referByRegistrationNo,

          referType: data.data.result.referType,
        };
        console.log(data);
        if (data) {
          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    handleClosePut();
    props.setOpenBackdrop(true);
    updateReferBy(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset(defaultValues);
          props.setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setOpenBackdrop(false);
        errorAlert(error.message);
      });
  }
  //useQuery hook for the functionality
  //call unit dropdown list
  useEffect(() => {
    getReferTypeList(referType)
      .then((response) => response.data)
      .then((res) => {
        console.log("result", res);
        setReferType(res.result);
      });
  }, []);
  return (
    <>
      {/* Model open on add button  start */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={() => {
            props.handleClose();
            props.setEdit(false);
            reset(defaultValues);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2 ">
                <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                  Refer By
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2 mx-2"
                >
                  <div className="py-0   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="">
                      <DropdownField
                        control={control}
                        //handleChange={handleChange}
                        error={errors.referType}
                        name="referType"
                        dataArray={referType}
                        placeholder="Refer Type *"
                        //isMulti={true}
                        isSearchable={false}
                      />
                    </div>

                    <div className="">
                      <InputField
                        name="referByCode"
                        variant="outlined"
                        label="Code *"
                        error={errors.referByCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="referByName"
                        variant="outlined"
                        label="Name *"
                        error={errors.referByName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="referByAddress"
                        variant="outlined"
                        label="Address "
                        error={errors.referByAddress}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="py-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="">
                      <InputField
                        name="referByContactNo"
                        variant="outlined"
                        label="Contact No "
                        error={errors.referByContactNo}
                        control={control}
                      />
                    </div>

                    <div className="">
                      <InputField
                        name="referByEmail"
                        variant="outlined"
                        label="Email Id "
                        error={errors.referByEmail}
                        control={control}
                        inputProps={{ textTransform: "none" }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="referByRegistrationNo"
                        variant="outlined"
                        label="Registration No "
                        error={errors.referByRegistrationNo}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="referByAccountNo"
                        variant="outlined"
                        label="Account No "
                        error={errors.referByAccountNo}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="py-0 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
                    <div className="">
                      <InputField
                        name="referByBankName"
                        variant="outlined"
                        label="Bank Name "
                        error={errors.referByBankName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="px-2">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton
                        onClick={() => reset(defaultValues)} //Reset
                      />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </form>
              </fieldset>
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </div>
          </Box>
        </Modal>
        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
      {/* model and table name button end */}
    </>
  );
}
