import React, { useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
//yup liberary and hook form imports
import * as yup from "yup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../common/ModalStyle";
import DropdownField from "../../common/formfields/DropdownField";
//fromfield control liberary componant import
import InputField from "../../common/formfields/InputField";
import {
  getVitalById,
  addNewVital,
  updateVital,
} from "../../../services/opd/VitalService";
import { getUnitList } from "../../../services/appointment/AppointmentBookingSourceServices";
import CheckBoxField from "../../common/formfields/CheckBoxField";
import { useQuery, useMutation } from "@tanstack/react-query";

import ConfirmationModal from "../../common/formfields/ConfirmationModal";
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/Toasts";

export default function SymptomsModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    vitalName: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, "Only alphabets are allowed for this field "),
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    vitalName: "",

    unit: "",
    active: true,
  };

  const [unit, setUnit] = React.useState([]);
  const [countClick, setCountClick] = React.useState(0);
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

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
    // errors object for show you the errors in the form
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");

    if (countClick === 0) {
      setCountClick(countClick + 1);
      //handleSubmit of React hook forms can be invoked remotely as well
      handleSubmit(onSubmitDataHandler)();
    }
  }

  //function to send the put request
  function updateData(data) {
    // This is PUT request
    updateVital(data)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert();
          console.log("Record has been updated successfully");
          props.populateTable(props.searchObj);
          setCountClick(0);
          //close the confirmation modal
          handleClosePut();
        }
      })
      .catch((error) => {
        console.log(error);
        setCountClick(0);
        errorAlert();
        //Code for React Toast
        handleClosePut();
      });
  }

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");

    if (countClick === 0) {
      setCountClick(countClick + 1);
      //handleSubmit of React hook forms can be invoked remotely as well
      handleSubmit(onSubmitDataHandler)();
    }
  }

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
        vitalName: data.vitalName,

        id: data.id,
      };
      //invoke the function to send the put request
      updateData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postObj = {
        active: data.active,
        vitalName: data.vitalName,

        unit: data.unit,
      };

      console.log(postObj);

      postAppointmentBookingSource(postObj);
    }

    //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandler
    props.setEdit(false);

    //to set the form fields as blank
    reset(defaultValues);

    //for closing the modal form after executing the PUT or POST request
    props.setOpen(false);
  };

  //call unit dropdown list
  useEffect(() => {
    getUnitList(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log("result", res);
        setUnit(res.result);
      });
  }, []);

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["Vital", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue) {
        return getVitalById(props.idValue);
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
          active: data.data.result.status,
          vitalName: data.data.result.vitalName,
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

  //useMutation hook for the implementation of post request data saving
  const { mutate: posVital } = useMutation(addNewVital, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      setCountClick(0);
      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();

      console.log("Record has been created");

      successAlert();
      props.populateTable(props.searchObj);
    },
    onError: (error) => {
      console.log(error);
      setCountClick(0);
      errorAlert();
      //Code for React toast
      handleClosePost();
    },
  });

  return (
    <>
      {/* Model and table name start */}
      <div className="w-full flex items-center lg:px-0 mt-4 rounded">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full lg:grid-cols-1">
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-400  rounded cursor-pointer"
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 ml-8 md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700">Vitals</legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2 mx-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
                    <div className="">
                      <InputField
                        name="vitalName"
                        variant="outlined"
                        label="Vital Name *"
                        error={errors.vitalName}
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
                        placeholder="Unit *"
                        isMulti={false}
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
