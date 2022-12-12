import React from "react";
//imports from the yup library
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";

//imports from the common FormControl folder
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import { Modal, Box, Button } from "@mui/material";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

// imports from react-query library
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

import {
  addNewTypeOfAppointment,
  getTypeOfAppoinmentById,
  updateTypeOfAppointment,
} from "../../services/appointment/TypeOfAppointmentServices";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

export default function TypeOfAppointmentModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    appointmentTypeCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, "Only alphabets are allowed for this field "),
    appointmentTypeName: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    appointmentTypeCode: "",
    appointmentTypeName: "",
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
    // errors object for show you the errors in the form
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked", data);
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        appointmentTypeCode: data.appointmentTypeCode,
        appointmentTypeName: data.appointmentTypeName,
        id: data.id,
      };

      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postObj = {
        active: data.active,
        appointmentTypeCode: data.appointmentTypeCode,
        appointmentTypeName: data.appointmentTypeName,
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
    postTypeOfAppointment(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postTypeOfAppointment } = useMutation(
    addNewTypeOfAppointment,
    {
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
    }
  );
  //EDIT GET API
  const { status } = useQuery(
    ["Type Of Appointment", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getTypeOfAppoinmentById(props.idValue);
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
          appointmentTypeCode: data.data.result.appointmentTypeCode,
          appointmentTypeName: data.data.result.appointmentTypeName,
          id: data.data.result.id,
        };

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    handleClosePut();
    props.setOpenBackdrop(true);
    updateTypeOfAppointment(finalData)
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
      <div className="w-full flex items-center md: lg:px-0 mt-4 rounded">
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
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2 ">
                <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                  Type Of Appointment
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2 mx-2"
                >
                  <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="">
                      <InputField
                        name="appointmentTypeCode"
                        variant="outlined"
                        label="Appointment Code *"
                        error={errors.appointmentTypeCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="appointmentTypeName"
                        variant="outlined"
                        label="Appointment Type *"
                        error={errors.appointmentTypeName}
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
    </>
  );
}
