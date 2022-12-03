import React, { useEffect } from "react";

//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../common/ModalStyle";

//imports from the common FormControl folder
import InputField from "../../common/formfields/InputField";
import CheckBoxField from "../../common/formfields/CheckBoxField";
import DropdownField from "../../common/formfields/DropdownField";

//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/Toasts";

//importing the asynchronous function for using in the react query hooks
import {
  getAppointmentBookingSourceById,
  addNewAppointmentBookingSource,
  updateAppointmentBookingSource,
} from "../../../services/appointment/AppointmentBookingSourceServices";

import { getUnitList } from "../../../services/appointment/AppointmentBookingSourceServices";

import ConfirmationModal from "../../common/formfields/ConfirmationModal";

export default function AllergyModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    allergyCode: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9\s]+$/,
        "Only alphabets are allowed for this field "
      ),
    allergy: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9\s]+$/,
        "Only alphabets are allowed for this field "
      ),
    unit: yup
      .array()
      .required("Required")
      .nullable(false, "Required")
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    allergyCode: "",
    allergy: "",
    unit: [],
    active: true,
  };

  const [unit, setUnit] = React.useState([]);

  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

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
    // errors object for show you the errors in the form
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //call unit dropdown list
  useEffect(() => {
    getUnitList(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log("result", res);
        setUnit(res.result);
      });
  }, []);

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
        allergyCode: data.allergyCode,
        allergy: data.allergy,
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
        allergyCode: data.allergyCode,
        allergy: data.allergy,
        unit: data.unit,
      };

      console.log(postObj);

      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postAppointmentBookingSource(finalData);
    }
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postAppointmentBookingSource } = useMutation(
    addNewAppointmentBookingSource,
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        console.log(result);
        props.setCountClick(0);
        handleClosePost();
        console.log("Record has been created");

        successAlert();
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
        props.setCountClick(0);
        errorAlert();
        //Code for React toast
        handleClosePost();
      },
    }
  );

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["Allergy", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue) {
        return getAppointmentBookingSourceById(props.idValue);
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
          allergyCode: data.data.result.allergyCode,
          allergy: data.data.result.allergy,
          unit: data.data.result.unit,
          id: data.data.result.id,
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
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      updateAppointmentBookingSource(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert();
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setCountClick(0);
            props.setEdit(false);

            reset(defaultValues);

            props.setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setCountClick(0);
          errorAlert();
          //Code for React Toast
        });
    }
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
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-400  rounded cursor-pointer"
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
                  Allergy
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-  gap-2 mx-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="">
                      <InputField
                        name="allergyCode"
                        variant="outlined"
                        label="Allergy Code"
                        error={errors.allergyCode}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="allergyType"
                        variant="outlined"
                        label="Allergy"
                        error={errors.allergy}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        //handleChange={handleChange}
                        error={errors.unit}
                        name="unit"
                        dataArray={unit}
                        placeholder="Select Unit"
                        isMulti={true}
                        isSearchable={false}
                      />
                    </div>
                    <div className="px-8">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 gap-4 justify-end">
                    {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                    {props.edit ? (
                      <Button
                        type="button"
                        size="small"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "35px",
                          minWidth: "90px",
                          minHeight: "35px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          reset(defaultValues);
                          props.handleClose();
                          props.setEdit(false);
                        }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="small"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "35px",
                          minWidth: "90px",
                          minHeight: "35px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                        onClick={() => reset(defaultValues)} //Reset
                      >
                        Reset
                      </Button>
                    )}

                    {props.edit ? (
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "35px",
                          minWidth: "120px",
                          minHeight: "35px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "35px",
                          minWidth: "120px",
                          minHeight: "35px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </form>
              </fieldset>
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
