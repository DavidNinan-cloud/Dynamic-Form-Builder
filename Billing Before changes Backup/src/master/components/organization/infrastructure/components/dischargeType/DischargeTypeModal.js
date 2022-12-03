//imports from material ui library
import { Box, Modal, Button, Input } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";
//importing the asynchronous function for using in the react query hooks
import {
  addNewDischargeType,
  getDischargeTypeById,
  updateDischargeType,
} from "../../../../../services/infrastructure/dischargeType/DischrageTypeServices";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from  "../../../../../../Common Components/Toasts/Toasts";


function DischargeTypeModal(props) {
  //Yup schema
  const schema = yup.object().shape({
    dischargeTypeCode: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed "
      ),
      dischargeTypeName: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id:0,
    dischargeTypeCode: "",
    dischargeTypeName: "",
    active: true,
  };
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  useEffect(() => {
    console.log("this is Props.value" + props.idValue);
  }, [props.idValue]);

  //state variable to open the confirmation modal for POST request
  const handelOpenPost = () => {
    console.log("Confirmation modal for post request has been opened");

    if (isValid === true) {
      //show the confirmation modal
      setOpenPost(true);
    } else if (isValid === false) {
      //handleSubmit of React hook forms can be invoked remotely as well. To show the error message
      handleSubmit(onSubmitDataHandler)();
    }
  };
  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
  //state variable to open the confirmation modal for PUT request
  const handelOpenPut = () => {
    console.log("Confirmation modal for post request has been opened");

    if (isValid === true) {
      //show the confirmation modal
      setOpenPut(true);
    } else if (isValid === false) {
      //handleSubmit of React hook forms can be invoked remotely as well. To show the error message
      handleSubmit(onSubmitDataHandler)();
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
    inputRef,
    formState: { errors,isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    //handleSubmit of React hook forms can be invoked remotely as well
    handleSubmit(onSubmitDataHandler)();
  }
  //onSubmitDataHandler function is passed as argument to the
  //built in handleSubmit() function of react hook forms.
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
        dischargeTypeCode: data.dischargeTypeCode,
        dischargeTypeName: data.dischargeTypeName,
      };

      updateData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postedObj = {
        active: data.active,
        id: data.id,
        dischargeTypeCode: data.dischargeTypeCode,
        dischargeTypeName: data.dischargeTypeName,
      };

      postDischargeType(postedObj);
    }
    //to set the form fields as blank
    reset(defaultValues);
  };

  //useMutation hook for the implementation of post request data saving
  const { mutate: postDischargeType } = useMutation(addNewDischargeType, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
       //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
       props.setEdit(false);
       //for closing the modal form
       props.setOpen(false);
      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();
      successAlert();
      props.populateTable({
        page:0,
        size:10,
        searchString:"",
      });
      console.log("Data has been recorded successfully");
    },
    onError: (error) => {
      console.log(error);
      errorAlert();
      handleClosePost();
      //Code for React toast
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["DischargeTypeInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        return getDischargeTypeById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
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
          id: data.data.result.id,
          dischargeTypeName: data.data.result.dischargeTypeName,
          dischargeTypeCode: data.data.result.dischargeTypeCode,
          active: data.data.result.status,
        };
        console.log("The resetObj for patching is " + JSON.stringify(resetObj));
        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        errorAlert();
        console.log(error);
        //Code for React Toast
      },
    }
  );
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");
    //handleSubmit of React hook forms can be invoked remotely as well
    handleSubmit(onSubmitDataHandler)();
  }
  //function to send the put request
  function updateData(data) {
    // This is PUT request
    updateDischargeType(data)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          console.log("Record has been updated successfully");
          props.populateTable({
            page:0,
            size:10,
            searchString:"",
          });
          updateAlert();
          //close the confirmation modal
          handleClosePut();
        }
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
        //Code for React Toast
      });
       //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
       props.setEdit(false);
       //for closing the modal form
       props.setOpen(false);
  }

  return (
    <>
      {/* Body of State Modal */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left w-full md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700 ml-3">
                  Add Discharge Type
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full  gap-2 px-3"
                >
                  <div className="lg:flex gap-2">
                  <div className="py-2 grid grid-cols-2 lg:flex gap-2 w-full">
                    <div className="w-full">
                      {/* block code input field */}
                      <InputField
                        name="dischargeTypeCode"
                        variant="outlined"
                        label="Discharge Type Code*"
                        error={errors.dischargeTypeCode}
                        control={control}
                        inputProps={{ style : { textTransform : "capitalize" } , }}
                      />
                    </div>
                    <div className="w-full">
                      {/* block Name Input field */}
                      <InputField
                        name="dischargeTypeName"
                        variant="outlined"
                        label="Discharge Type Name*"
                        error={errors.dischargeTypeName}
                        control={control}
                        inputProps={{ style : { textTransform : "capitalize" } , }}

                      />
                    </div>
                    
                    {/* Active Checkbox */}
                  </div>
                  <div className="flex justify-end">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                    </div>
                  <div className="flex gap-4 justify-end">
                    {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                    {props.edit ? (
                      <Button
                        href="#"
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
                        }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        href="#"
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
                        type="button"
                        variant="outlined"
                        size="small"
                        onClick={handelOpenPut}
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
                        type="button"
                        variant="outlined"
                        size="small"
                        onClick={handelOpenPost}
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
        {/* modal and table name button end */}
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
export default DischargeTypeModal;
