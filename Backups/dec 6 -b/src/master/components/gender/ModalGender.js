import React from "react";

//imports from the yup library
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//imported from react hook form
import { useForm } from "react-hook-form";

//closing to modal form
import { Box, Modal, Button } from "@mui/material";

import { useQuery, useMutation } from "@tanstack/react-query";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";

//imported FormField Common for all
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

import {
  getGenderById,
  addNewGender,
  updateGender,
} from "../../services/gender/GenderServices";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

export default function ModalGender(props) {
  //[YUP SCHEMA] Schema validation form fields
  const schema = yup.object().shape({
    genderCode: yup
      .string()
      .required("Required")
      .min(2, "Add Gender Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Characters Not Allow"),
    genderName: yup
      .string()
      .required("Required")
      .min(2, "Add Gender Name")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Characters Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    genderCode: "",
    genderName: "",
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleCloePut has been called");
    if (openPut) {
      setOpenPut(false);
    }
  };

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

  const onSubmitDataHandler = (data) => {
    console.log(data);
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        genderName: data.genderName,
        genderCode: data.genderCode,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        genderCode: data.genderCode,
        genderName: data.genderName,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postGender(finalData);
  }

  //ADD POST API save data
  const { mutate: postGender } = useMutation(addNewGender, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      props.setOpenBackdrop(false);
      successAlert(result.data.message);
      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      reset(defaultValues);
      props.setOpen(false);
      props.setEdit(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  //EDIT GET API
  const { status } = useQuery(
    ["GenderInfo", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getGenderById(props.idValue);
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
          genderName: data.data.result.genderName,
          genderCode: data.data.result.genderCode,
          id: data.data.result.id,
          active: data.data.result.status,
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

  //UPDATE PUT API
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);

    updateGender(finalData)
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

  return (
    <>
      {/* Modal for Gender (textField)*/}
      <Modal
        open={props.open}
        onClose={() => {
          // props.handleClose();
          props.setEdit(false);
          reset(defaultValues);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
              props.setEdit(false);
              reset(defaultValues);
            }}
          />

          <div className="row">
            <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2 ">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                Gender
              </legend>
              <form
                className="grid grid-cols-1 w-full gap-x-2 py-4"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 px-5 lg:px-2 gap-2">
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="genderName"
                      variant="outlined"
                      label="Gender Name *"
                      error={errors.genderName}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                      required
                    />
                  </div>
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="genderCode"
                      variant="outlined"
                      label="Gender Code *"
                      error={errors.genderCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className=" flex lg:justify-start px-2">
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>

                  <div className="flex space-x-3 items-center justify-end ">
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
            {/* Backdrop */}
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
