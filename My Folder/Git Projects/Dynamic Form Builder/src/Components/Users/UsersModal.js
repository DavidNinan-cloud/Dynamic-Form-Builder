//imports from material ui library
import { Box, Modal, Button } from "@mui/material";

import * as React from "react";

//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

//imports from react hook form
import { useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../Common Components/ModalStyle";

//imports from the common FormControl folder
import InputField from "../Common Components/FormFields/InputField";
import CheckBoxField from "../Common Components/FormFields/CheckBoxField";

//importing the asynchronous function for using in the react query hooks
import {
  addNewUsers,
  getUsersById,
  updateUsers,
} from "./UsersServices";

import ConfirmationModal from "../Common Components/ConfirmationModal";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../Common Components/Toasts/CustomToasts";

import AddButton from "../Common Components/Buttons/AddButton";
import ResetButton from "../Common Components/Buttons/ResetButton";
import CancelButton from "../Common Components/Buttons/CancelButton";
import UpdateButton from "../Common Components/Buttons/UpdateButton";

function UsersModal(props) {
  //Yup schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Required"),
    name: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    name: "",
    email: "",
    id: "",
    active: true,
  };
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
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
    formState: { errors,isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Add button on the modal form
  function addRecord() {
      postUsers(finalData);
  }

  const onSubmit = (data) => {
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        name: data.name,
        email: data.email,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else{
      let postedObj = {
        active: data.active,
        name: data.name,
        email: data.email,
      };
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };
  
  const { mutate: mutateUpdateUsers } = useMutation(updateUsers);

  const { mutate: postUsers } = useMutation(addNewUsers, {
    onSuccess: (res) => {
      console.log(res);
      console.log("Record has been created");
      handleClosePost();
      successAlert("Record has been created");
      props.populateTable({
        page:0,
        size:10,
        searchString:"",
      });
      reset();
      props.handleClose();
      props.setEdit(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      handleClosePost();
    },
  });

  React.useEffect(()=>{
    if(props.edit){
      getUsersById(props.idValue).then((response) => response.data)
      .then((res) => {
        console.log('edit res',res[0]);
        let resetObj = res[0]
        resetObj.active = true
        reset(resetObj)
      });
      reset()
    }else{
      reset(defaultValues)
    }
  },[props.edit])
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log('updateRecord',finalData);
      mutateUpdateUsers(finalData, {
        onSuccess: (res) => {
          console.log(res);
          console.log("Record has been created");
          handleClosePut();
          successAlert("Record has been created");
          props.populateTable({
            page:0,
            size:10,
            searchString:"",
          });
          reset();
          props.handleClose();
          props.setEdit(false);
        },
        onError: (error) => {
          errorAlert(error.message);
          handleClosePost();
        },
      })
  }

  return (
    <>
      {/* Body of Users Modal form */}
      <div className="w-full  grid justify-center items-center rounded lg:px-0 mt-4">
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
              <fieldset className="border border-gray-300 text-left w-full  py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700 ml-3">
                    {props.edit ? "Edit User":"Add User"}
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1  w-full  gap-2"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-3 px-3 gap-2">
                    <div className=" w-full">
                      {/*Users Name Input field */}
                      <InputField
                        name="name"
                        variant="outlined"
                        label="Users Name*"
                        error={errors.name}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      {/* users description input field */}
                      <InputField
                        name="email"
                        variant="outlined"
                        label="Users Email*"
                        error={errors.email}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    {/* Active Checkbox */}
                    <div className="hidden lg:block ">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 w-full items-center justify-between lg:justify-end px-2">
                    {/* Active Checkbox */}
                    <div className="lg:hidden">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                    {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                    <div className="flex space-x-3 items-center">
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
export default UsersModal;
