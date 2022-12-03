//imports from material ui library
import { Box, Modal, Button } from "@mui/material";

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
import { ModalStyle } from "../../common/ModalStyle";

//imports from the common FormControl folder
import InputField from "../../common/formfields/InputField";
import CheckBoxField from "../../common/formfields/CheckBoxField";
import DropdownField from "../../common/formfields/DropdownField";

//importing the asynchronous function for using in the react query hooks
import {
  addNewDrug,
  getDrugById,
  updateDrug,
} from "./../../../services/pharmacy/drug/DrugService";

import ConfirmationModal from "../../common/formfields/ConfirmationModal";

import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/Toasts";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

//body of Drug cromponent
export default function DrugModal(props) {
  console.log("This is Pincode Modal Component");

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [unit, setUnit] = React.useState([]);

  //validation start
  //form validation
  const schema = yup.object().shape({
    drugCode: yup
      .string()
      .required("Drug Code in number allow")
      .matches(/^[A-Za-z0-9\s]+$/, "Must be only digits"),
    drugName: yup
      .string()
      .min(5, "Add Drug Name")
      .required("Add Drug Name")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
    drugDescription: yup
      .string()
      .min(5, "Add Drug Description")
      .required("Add Drug Description")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
    unit: yup
      .array()
      .nullable(false, "Select At least One Unit")
      .min(1, "Select At least One Unit")
      .of(
        yup.object().shape({
          label: yup.string().required("Select At least One Unit"),
          value: yup.string().required("Select At least One Unit"),
        })
      )
      .required("Select At least One Unit"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    drugCode: "",
    drugName: "",
    drugDescription: "",
    unit: [],
    active: true,
  };

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
    console.log("Confirmation modal for put request has been opened");

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
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");

    //handleSubmit of React hook forms can be invoked remotely as well
    handleSubmit(onSubmitDataHandler)();
  }

  //function to send the put request
  function updateData(data) {
    // This is PUT request
    updateDrug(data)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert();
          console.log("Record has been updated successfully");
          props.populateTable(props.searchObj);

          //close the confirmation modal
          handleClosePut();
        }
      })
      .catch((error) => {
        console.log(error);
        //Code for React Toast
        errorAlert();
      });
  }

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
        drugCode: data.drugCode,
        drugName: data.drugName,
        drugDescription: data.drugDescription,
        unit: data.unit,
        id: data.id,
      };

      //invoke the function to send the put request
      updateData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postedObj = {
        active: data.active,
        drugCode: data.drugCode,
        drugName: data.drugName,
        drugDescription: data.drugDescription,
        unit: data.unit,
      };

      //function for post request
      postDrug(postedObj);

      props.setOpen(false);
    }

    //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
    props.setEdit(false);

    //to set the form fields as blank
    reset(defaultValues);

    //for closing the modal form
    props.setOpen(false);
  };

  // useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["Drug", props.idValue],

    //to avoid the automatic firing of the query. Because CityModal is a child component of City.js
    () => {
      if (props.idValue && openPut !== true) {
        return getDrugById(props.idValue);
      }
    },

    {
      enabled: props.edit,

      staleTime: 0,

      cacheTime: 0,

      onSuccess: (data) => {
        console.log(
          "data fetched with GET request by id using the react query library"
        );

        console.log(status);

        console.log(data);

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          console.log("The data coming from get response by id request is ");
          console.log(JSON.stringify(data));

          let resetObj = {
            id: data.data.result.id,
            drugCode: data.data.result.drugCode,
            drugName: data.data.result.drugName,
            drugDescription: data.data.drugDescription,
            unit: data.data.unit,
            active: data.data.result.status,
          };

          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  // useMutation hook for the implementation of post request data saving
  const { mutate: postDrug } = useMutation(addNewDrug, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();

      successAlert();
      props.populateTable(props.searchObj);
      console.log("Data has been Recorded successfully");
    },
    onError: () => {
      //Code for React toast
      errorAlert();
    },
  });

  return (
    <>
      <div className="w-full grid items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full lg:grid-cols-1">
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>

            <div className="row">
              <fieldset className="grid border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-8 rounded mt-8 lg:m-2">
                <legend className="px-2 font-bold text-gray-700">Drug</legend>

                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid justify-center px-2 grid-cols-1 md:grid-cols-1 w-full  gap-2"
                >
                  <div className="py-2 grid justify-center  grid-cols-2 lg:grid-cols-4  gap-2">
                    <div className="w-full">
                      <InputField
                        name="drugCode"
                        variant="outlined"
                        label="Drug Code"
                        error={errors.drugCode}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="drugName"
                        variant="outlined"
                        label="Drug Name"
                        error={errors.drugName}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="drugDescription"
                        variant="outlined"
                        label="Drug Description"
                        error={errors.drugDescription}
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
                    <div className="">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="isGeneric"
                        label="isGeneric"
                        placeholder="isGeneric"
                      />
                    </div>
                    {/* Active Checkbox */}
                    <div className="">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 space-x-3 justify-end">
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
                        onClick={() => reset(defaultValues)} //ReSet
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
