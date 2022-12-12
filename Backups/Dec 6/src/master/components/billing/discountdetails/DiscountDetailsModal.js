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
import { ModalStyle } from "../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
//importing the asynchronous function for using in the react query hooks
import {
  addNewDiscountDetails,
  getDiscountDetailsById,
  updateDiscountDetails,
} from "../../../services/billing/discountdetails/DiscountDetailsServices";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";

import AddButton from "../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";

function DiscountDetailsModal(props) {
  console.log("This is GroupModal component");
  //Yup schema
  const schema = yup.object().shape({
    discountType: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    discountType: "",
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
    console.log("Post modal is going to close");
    props.setCountClick(0);
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleCloePut has been called");
    props.setCountClick(0);
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
        discountType: data.discountType,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);
      let postObj = {
        id: data.id,
        active: data.active,
        discountType: data.discountType,
      };
      console.log(postObj);
      setOpenPost(true);
      setFinalData(postObj);
    }
    //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandler
    props.setEdit(false);
    //to set the form fields as blank
    reset(defaultValues);
    //for closing the modal form after executing the PUT or POST request
    props.setOpen(false);
  };

    //event listener function for the Add button on the modal form
    function addRecord() {
      console.log("A new record has been added");
      //handleSubmit of React hook forms can be invoked remotely as well
      if (props.countClick === 0) {
        props.setCountClick(props.countClick + 1);
        postDiscount(finalData);
      }
    }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postDiscount } = useMutation(addNewDiscountDetails, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setCountClick(0);
      console.log("Record has been created");
      handleClosePost();
      successAlert(result.data.message);
      props.populateTable({
        page:0,
        size:10,
        searchString:"",
      });
      reset(defaultValues);
      props.setOpen(false);
      props.setEdit(false);
    },
    onError: (error) => {
      console.log(error);
      props.setCountClick(0);
      errorAlert(error.message);
      handleClosePost();
      //Code for React toast
    },
  });
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["discountInfo", props.idValue],
    //to avoid the automatic firing of the query. Because GroupModal is a child component of Group.js
    () => {
      if (props.idValue && openPut !== true) {
        return getDiscountDetailsById(props.idValue);
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
          discountType: data.data.result.discountType,
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
        //Code for React Toast
      },
    }
  );
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    if (props.countClick === 0) {
      updateDiscountDetails(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert(response.data.message);
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
          errorAlert(error.message);
          handleClosePut();
        });
    }
  }

  return (
    <>
      {/* Body of Discount Modal form */}
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
              <fieldset className="border border-gray-300 text-left w-full  py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700 ml-3">
                  Add DiscountDetails
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1  w-full  gap-2"
                >
                  <div className="py-2 grid grid-cols-2 px-3 gap-2">
                    <div className=" w-full">
                      {/*Group Name Input field */}
                      <InputField
                        name="discountType"
                        variant="outlined"
                        label="Discount Type*"
                        error={errors.discountType}
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
export default DiscountDetailsModal;
