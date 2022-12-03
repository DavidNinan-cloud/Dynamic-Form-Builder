import React from "react";
import { Box, Modal, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  getAntibioticById,
  addNewAntibiotic,
  updateAntibiotic,
} from "../../../../services/lims/pathology/AntibioticServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";

// import {
//   addNewCountry,
//   getCountryById,
// } from "../../services/area/CountryService";

const AntibioticModal = (props) => {
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  const schema = yup.object().shape({
    antibioticCode: yup.string().required("Antibiotic Code Required"),
    antibioticShortName: yup.string().required("Antibiotic Name Required"),
    antibioticName: yup.string().required("Antibiotic Name Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    antibioticCode: "",
    antibioticShortName: "",
    antibioticName: "",
    id: "",
    status: true,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

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

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked", data);

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);

      let updateObj = {
        active: data.status,
        antiBioticCode: data.antibioticCode,
        antiBioticShortName: data.antibioticShortName,
        antiBioticName: data.antibioticName,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let obj = {
        active: data.status,
        antiBioticCode: data.antibioticCode,
        antiBioticShortName: data.antibioticShortName,
        antiBioticName: data.antibioticName,
      };

      console.log(obj);

      console.log(obj);
      setOpenPost(true);
      setFinalData(obj);
    }
  };

  //useMutation hook for the implementation of post request data saving
  const { mutate: postParameterUnit } = useMutation(addNewAntibiotic, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setCountClick(0);
      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();
      successAlert();
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
      console.log(error);
      props.setCountClick(0);
      //Code for React toast
      errorAlert();

      //When the request is not successfull ; close the confirmation modal for POST
      handleClosePost();
    },
  });

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postParameterUnit(finalData);
    }
  }

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");

    if (props.countClick === 0) {
      updateAntibiotic(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert();
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setCountClick(props.countClick + 1);
            props.setEdit(false);

            reset(defaultValues);
            handleClosePut();
            props.setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setCountClick(props.countClick + 1);
          errorAlert();
          handleClosePut();
        });
    }
  }
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["AntibioticInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getAntibioticById(props.idValue);
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
          antibioticCode: data.data.result.antiBioticCode,
          antibioticShortName: data.data.result.antiBioticShortName,
          antibioticName: data.data.result.antiBioticName,
          id: data.data.result.id,
          status: data.data.result.status,
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

  return (
    <div className="w-[100%] grid justify-center items-center rounded lg:px-0 mt-4">
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
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>

          <div className="row">
            <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2">
              <legend className="px-2 font-bold text-gray-700">
                Add New Lab Antibiotic
              </legend>

              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 md:grid-cols-1 w-full  gap-2"
              >
                <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-2 gap-2">
                  {/* Country Code  */}
                  <div className="lg:col-span-2 md:col-span-1">
                    {/*Country Code Input field */}

                    <InputField
                      name="antibioticCode"
                      variant="outlined"
                      label="Antibiotic Code"
                      error={errors.antibioticCode}
                      control={control}
                    />
                  </div>

                  {/* Country Name */}
                  <div className="lg:col-span-2 md:col-span-1">
                    {/* Country Name input field */}

                    <InputField
                      name="antibioticShortName"
                      variant="outlined"
                      label="Antibiotic Short Name"
                      error={errors.antibioticShortName}
                      control={control}
                    />
                  </div>
                  <div className="lg:col-span-2 md:col-span-1">
                    {/* Country Name input field */}

                    <InputField
                      name="antibioticName"
                      variant="outlined"
                      label="Antibiotic Name"
                      error={errors.antibioticName}
                      control={control}
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className="lg:col-start-5 pl-0.5 md:col-start-2">
                    {/* Checkbox component */}

                    <CheckBoxField
                      control={control}
                      name="status"
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
                        props.handleClose();
                        props.setEdit(false);
                        reset(defaultValues);
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
      {/* Confirmation modal for POST request */}
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
      {/* Confirmation modal for PUT request */}
      <ConfirmationModal //setEdit(false);
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
    </div>
  );
};

export default AntibioticModal;
