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
  getParameterUnitById,
  addNewParameterUnit,
  updateParameterUnit,
} from "../../../../services/lims/pathology/ParameterUnitServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";

// import {
//   addNewCountry,
//   getCountryById,
// } from "../../services/area/CountryService";

const ParameterUnitModal = (props) => {
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  const schema = yup.object().shape({
    unitCode: yup.string().required("Unit Code Required"),
    unitName: yup.string().required("Unit Name Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    unitCode: "",
    unitName: "",
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
        labUnitCode: data.unitCode,
        labUnitName: data.unitName,
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
        labUnitCode: data.unitCode,
        labUnitName: data.unitName,
      };

      console.log(obj);

      console.log(obj);
      setOpenPost(true);
      setFinalData(obj);
    }
  };

  //useMutation hook for the implementation of post request data saving
  const { mutate: postParameterUnit } = useMutation(addNewParameterUnit, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      //When the request is successfull ; close the confirmation modal for POST

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
      props.setOpenBackdrop(false);
      //Code for React toast
      errorAlert();

      //When the request is not successfull ; close the confirmation modal for POST
      handleClosePost();
    },
  });

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    handleClosePost();
    props.setOpenBackdrop(true);
    postParameterUnit(finalData);
  }

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["ParameterUnitInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getParameterUnitById(props.idValue);
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
          unitCode: data.data.result.labUnitCode,
          unitName: data.data.result.labUnitName,
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

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    console.log("Your data has been updated");

    props.setOpenBackdrop(true);
    updateParameterUnit(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert();

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

        errorAlert();
        props.setOpenBackdrop(false);
      });
  }

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
            <fieldset className="border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-8 rounded mt-8 lg:m-2 ">
              <legend className="px-2 font-bold text-gray-700">
                Add New Parameter Unit
              </legend>

              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 md:grid-cols-1 w-full gap-2"
              >
                <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-2 gap-4">
                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="unitCode"
                      variant="outlined"
                      label="Unit Code"
                      error={errors.unitCode}
                      control={control}
                    />
                  </div>

                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="unitName"
                      variant="outlined"
                      label="Unit Name"
                      error={errors.unitName}
                      control={control}
                    />
                  </div>

                  <div className="pl-1 lg:col-span-2 md:col-span-1">
                    <CheckBoxField
                      control={control}
                      name="status"
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
                    <ResetButton onClick={() => reset(defaultValues)} />
                  )}

                  {props.edit ? <UpdateButton /> : <AddButton />}
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

export default ParameterUnitModal;
