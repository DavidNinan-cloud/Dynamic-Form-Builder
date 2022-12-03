//imports from material ui libraryinputProps
import { Box, Modal } from "@mui/material";

import * as React from "react";

//icon for closing the modal form
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

//imports from react hook form
import { useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";

//imports from the common FormControl folder
// import InputField from "../common/formfields/InputField";
import InputField from "../../../Common Components/FormFields/InputField";

import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

//importing the asynchronous function for using in the react query hooks
import {
  addNewCountry,
  getCountryById,
  updateCountry,
} from "./../../services/area/CountryService";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../Common Components/Toasts/Toasts";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

function CountryModal(props) {
  console.log("This is CountryModal component");

  //Yup schema
  const schema = yup.object().shape({
    countryCode: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    countryName: yup
      .string()
      .required("Required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    isdCode: yup
      .string()
      .required("Required")
      .matches(/^[+1-9]+[0-9]*$/, "Only numbers are allowed"), //should start with '+' sign
    mobileLength: yup
      .string()
      .required("Required")
      .matches(/^[1-9]+[0-9]*$/, "Only numbers are allowed"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    countryCode: "",
    countryName: "",
    id: "",
    isdCode: "",
    mobileLength: "",
    active: true,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    props.setCountClick(0);
    if (openPut) {
      setOpenPut(false);
    }
  };

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    //close the confirmation modal
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Your data has been updated");
    updateCountry(finalData)
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
        handleClosePut();
      });
  }

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);

    //close the confirmation modal
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postCountry(finalData);
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
      console.log("data.id", data.id);

      let updateObj = {
        active: data.active,
        countryCode: data.countryCode,
        countryName: data.countryName,
        id: data.id,
        isdCode: data.isdCode,
        mobileLength: data.mobileLength,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postObj = {
        active: data.active,
        countryCode: data.countryCode,
        countryName: data.countryName,
        isdCode: data.isdCode,
        mobileLength: data.mobileLength,
      };
      console.log(postObj);
      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["CountryInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getCountryById(props.idValue);
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
          countryCode: data.data.result.countryCode,
          countryName: data.data.result.countryName,
          id: data.data.result.id,
          isdCode: data.data.result.isdCode,
          mobileLength: data.data.result.mobileLength,
          active: data.data.result.status,
        };

        //if data is received ; then only execute the reset function to patch the value
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
  const { mutate: postCountry } = useMutation(addNewCountry, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      props.setOpenBackdrop(false);
      successAlert(result.data.message);
      props.populateTable({ page: 0, size: 10, searchString: "" });
      console.log("Record has been created");

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset(defaultValues);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      //When the request is not successfull ; close the confirmation modal for POST
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  return (
    <>
      {/* Body of country Modal form */}

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
          <div className="grid md:grid-cols-1  w-full">
            <CancelPresentationIconButton
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>

          <div className="row">
            <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
              <legend className="ml-2 lg:ml-0 font-bold text-gray-600">
                Country
              </legend>

              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 w-full"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
                  {/* Country Code  */}
                  <div className="w-full">
                    {/*Country Code Input field */}
                    <InputField
                      name="countryCode"
                      variant="outlined"
                      label="Code*"
                      error={errors.countryCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Country Name */}
                  <div className="w-full">
                    {/* Country Name input field */}

                    <InputField
                      name="countryName"
                      variant="outlined"
                      label="Country*"
                      error={errors.countryName}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Country ISD Code */}
                  <div className="w-full">
                    {/* Country ISD Code input field */}
                    {/* Input Fields */}

                    <InputField
                      name="isdCode"
                      variant="outlined"
                      label="ISD Code*"
                      error={errors.isdCode}
                      control={control}
                    />
                  </div>

                  {/* Mobile Length */}
                  <div className="w-full">
                    {/* Mobile length input field */}

                    <InputField
                      name="mobileLength"
                      variant="outlined"
                      label="Mobile Length*"
                      error={errors.mobileLength}
                      control={control}
                      //When the user types any input ; the hint "Example:10" should disappear
                      inputRef={{
                        ...register("mobileLength", {
                          onChange: () => {
                            //function call
                            props.setMobileLengthHint("");
                          },
                        }),
                      }}
                    />

                    <p className="text-gray-400 p1 text-sm">
                      {props.mobileLengthHint}
                    </p>
                  </div>
                </div>

                <div className="flex md:px-3 lg:px-0  pt-2 justify-between items-start">
                  <CheckBoxField
                    control={control}
                    name="active"
                    label="Active"
                    placeholder="Status"
                  />

                  {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                  <div className="flex gap-4 space-x-3  pb-2 justify-end">
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton onClick={() => reset(defaultValues)} />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </div>
              </form>
            </fieldset>
            {/* Backdrop component to disable the screen after submitting the form */}
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
    </>
  );
}

export default CountryModal;
