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
import { ModalStyle } from "../../../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";
//importing the asynchronous function for using in the react query hooks
import {
  addNewRoom,
  getRoomById,
  updateRoom,
} from "../../../../../services/infrastructure/room/RoomServices";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import UploadFile from "./assets/UploadFile.png";
import BlankProfile from "./assets/blankProfile.jpeg";

import AddButton from "../../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../../../Common Components/Buttons/UpdateButton";
import baseUrl from "../../../../../http-common"

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

function RoomModal(props) {
  //Yup schema
  const schema = yup.object().shape({
    roomCode: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed "
      ),
    roomName: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed"
      ),

    // roomImageName: yup.mixed().required("Required")
  });

  //the object to reset the form to blank values
  let defaultValues = {
    id: "",
    roomCode: "",
    roomName: "",
    active: true,
    roomImageName: null,
    roomImageBase64: null,
  };
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  //state variable to open the confirmation modal for POST request
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleClosePutHas been called");
    if (openPut) {
      setOpenPut(false);
    }
  };

  //upload room img
  const [profile, setProfile] = React.useState(BlankProfile);
  const [profilePicName, setProfilePicName] = React.useState();

  const fileHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        setProfile(result);
        console.log("Image", typeof result, result);
        console.log(file.name);
        setProfilePicName(file.name);
      };

      reader.readAsDataURL(file);
    } else {
      setProfile(BlankProfile);
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

  const onSubmitDataHandler = (data) => {
    data.roomImagePath = roomImageName;
    // let previewStr = profile.toString();
    // data.roomImageBase64 = previewStr.split(",")[1];
    // data.file = data.roomImageBase64;
    data.roomImageName = profilePicName;
    let roomPicString = profile.toString().split(",")[1];
    data.roomImageBase64 = roomPicString;
    // data.file = data.roomImageBase64;
    console.log(roomPicString);

    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      
      let updateObj = {
        id: data.id,
        active: data.active,
        roomCode: data.roomCode,
        roomName: data.roomName,
        roomImageBase64: data.roomPicString,
        roomImageName: data.profilePicName,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );

      let postedObj = {
        active: data.active,
        roomCode: data.roomCode,
        roomName: data.roomName,
        roomImageBase64: roomPicString,
        roomImageName: profilePicName,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);

      console.log("The final data is ");
      console.log(finalData);

      console.log("The post obj is ");
      console.log(postedObj);

      //sending the post request using the postRoom() function
      // postRoom(postedObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    //handleSubmit of React hook forms can be invoked remotely as well
    setOpenPost(false);
    props.setOpenBackdrop(true);
      postRoom(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postRoom } = useMutation(addNewRoom, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      console.log(result);

      props.setOpenBackdrop(false);
      console.log("Record has been created");
      handleClosePost();
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
      console.log(error);
      props.setOpenBackdrop(false);
      errorAlert(error.message);
      handleClosePost();
      // Code for React toast
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["RoomInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        return getRoomById(props.idValue);
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

        if (data.data.result.roomImagePath !== null) {
          setProfile(`${baseUrl}/file${data.data.result.roomImagePath}`);
        } else {
          setProfile(BlankProfile);
        }
        
        let resetObj = {
          id: data.data.result.id,
          roomName: data.data.result.roomName,
          roomCode: data.data.result.roomCode,
          active: data.data.result.status,
          roomImageName: data.data.result.roomImagePath,
        };
        console.log("The resetObj for patching is " + JSON.stringify(resetObj));
        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error.message);
        //Code for React Toast
      },
    }
  );

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Update record clicked");
      updateRoom(finalData)
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
          errorAlert(error.message);
          props.setOpenBackdrop(false);
        });
  }

  return (
    <>
      {/* Body of State Modal */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
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
              <fieldset className="border border-gray-300 text-left w-full md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700 ml-3">
                  Add Room
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full gap-2 px-3"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="w-full">
                      {/* block code input field */}
                      <InputField
                        name="roomCode"
                        variant="outlined"
                        label="Room Code*"
                        error={errors.roomCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      {/* block Name Input field */}
                      <InputField
                        name="roomName"
                        variant="outlined"
                        label="Room Name*"
                        error={errors.roomName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="grid cursor-pointer w-full">
                      <TextField
                        type="file"
                        size="small"
                        accept="image/*"
                        fullWidth
                        name="roomImageName"
                        id="roomImageName"
                        // required
                        // {...register("profilePic")}
                        // error={errors.profilePic ? true : false}
                        onChange={fileHandler}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={UploadFile}
                                alt=""
                                className="h-5 md:h-7"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="flex justify-center">
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
              <CommonBackDrop openBackdrop={props.openBackdrop} />
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
export default RoomModal;
