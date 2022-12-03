import React, { useEffect } from "react";

//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../common/ModalStyle";
import AddButton from "../../../Common Components/Buttons/AddButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
//fromfield control liberary componant import
import InputField from "../common/formfields/InputField";
import CheckBoxField from "../common/formfields/CheckBoxField";

//icon for closing the modal form
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

//importing the asynchronous function for using in the react query hooks
import {
  getReferTypeById,
  addNewReferType,
  updateReferType,
} from "../../services/referal/ReferTypeServices";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

export default function ReferTypeModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    referTypeCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, "Refer Type not valid")
      .min(2, "Add at least 2 digit Department Code"),
    referTypeName: yup.string(),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    referTypeCode: "",
    referTypeName: "",
    active: true,
  };

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

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
        referTypeCode: data.referTypeCode,
        referTypeName: data.referTypeName,
        id: data.id,
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
        referTypeCode: data.referTypeCode,
        referTypeName: data.referTypeName,
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
    postReferType(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  //useMutation hook for the implementation of post request data saving
  const { mutate: postReferType } = useMutation(addNewReferType, {
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
      console.log(error);

      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["ReferType", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getReferTypeById(props.idValue);
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
          referTypeCode: data.data.result.referTypeCode,
          referTypeName: data.data.result.referTypeName,
          id: data.data.result.id,
          active: data.data.result.status,
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
    props.setOpenBackdrop(true);

    updateReferType(finalData)
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
  return (
    <>
      {/* Model and table name start */}
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
            <div className="grid grid-cols-1 md:grid-cols-1  w-full lg:grid-cols-1">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2">
                <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                  Refer Type
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-4 mx-2 md:p-2"
                >
                  <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="">
                      <InputField
                        name="referTypeCode"
                        variant="outlined"
                        label="Refer Type Code *"
                        error={errors.referTypeCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="referTypeName"
                        variant="outlined"
                        label="Refer Type Name"
                        error={errors.referTypeName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    <div className="px-2">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                      />
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
