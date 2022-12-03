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
  addNewClass,
  getClassById,
  updateClass,
} from "../../../services/billing/class/ClassServices";
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

import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

function ClassModal(props) {
  //Yup schema
  const schema = yup.object().shape({
    classType: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    patientDepartment: yup
      .string()
      .nullable()
      .required("Required"),
    //nullable() was added because , when there is no selection ; at that time the value of input fields having name 'patientDepartment' have 'null' value. And it was throwing the custom error from yupp library which doesnt look user friendly. To avoid that message we used the nullable() validator.
  });

  //the object to reset the form to blank values
  const defaultValues = {
    classType: "",
    patientDepartment: "",
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
    console.log("handleCloePutHAs been called");
    props.setCountClick(0);
    if (openPut) {
      setOpenPut(false);
    }
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
        classType: data.classType,
        id: data.id,
        ipd: false,
        opd: false,
      };

      if (data.patientDepartment === "ipd") {
        updateObj.ipd = true;
      } else if (data.patientDepartment === "opd") {
        updateObj.opd = true;
      } else if (data.patientDepartment === "both") {
        updateObj.ipd = true;
        updateObj.opd = true;
      }
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postObj = {
        active: data.active,
        classType: data.classType,
        ipd: false,
        opd: false,
      };

      if (data.patientDepartment === "ipd") {
        postObj.ipd = true;
      } else if (data.patientDepartment === "opd") {
        postObj.opd = true;
      } else if (data.patientDepartment === "both") {
        postObj.ipd = true;
        postObj.opd = true;
      }
      console.log(postObj);
      setOpenPost(true);
      setFinalData(postObj);
    }

    //to set the form fields as blank
    reset(defaultValues);
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postClass(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postClass } = useMutation(addNewClass, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      console.log("Record has been created");
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
    },
  });
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["classInfo", props.idValue],
    //to avoid the automatic firing of the query. Because ClassModal is a child component of Class.js
    () => {
      if (props.idValue && openPut !== true) {
        return getClassById(props.idValue);
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
          classType: data.data.result.classType,
          patientDepartment: "",
          active: data.data.result.status,
          id: data.data.result.id,
        };

        if (data.data.result.opd === true && data.data.result.ipd === false) {
          resetObj.patientDepartment = "opd";
        } else if (
          data.data.result.ipd === true &&
          data.data.result.opd === false
        ) {
          resetObj.patientDepartment = "ipd";
        } else if (
          data.data.result.ipd === true &&
          data.data.result.opd === true
        ) {
          console.log("This is both block");
          resetObj.patientDepartment = "both";
        }

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
    props.setOpenBackdrop(true);
    updateClass(finalData)
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
      });
  }

  return (
    <>
      {/* Body of Class Modal form */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className=" w-full">
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
                  Add Class Type
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className=" w-full  gap-2 px-3"
                >
                  <div className="py-2 flex items-center gap-2">
                    <div className="w-5/12">
                      {/*class Name Input field */}
                      <InputField
                        name="classType"
                        variant="outlined"
                        label="Class Type*"
                        error={errors.classType}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    {/*  radio buttons Name */}
                    <div className="space-x-8 flex items-center">
                      <div className="w-full flex items-center space-x-3">
                        <input
                          type="radio"
                          name="patientDepartment"
                          value="opd"
                          error={errors.patientDepartment}
                          {...register("patientDepartment")}
                        />
                        <label>OPD</label>
                      </div>
                      <div className="w-full flex items-center space-x-3">
                        <input
                          name="patientDepartment"
                          type="radio"
                          value="ipd"
                          error={errors.patientDepartment}
                          {...register("patientDepartment")}
                        />
                        <label>IPD</label>
                      </div>
                      <div className="w-full ">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="patientDepartment"
                            value="both"
                            error={errors.patientDepartment}
                            {...register("patientDepartment")}
                          />
                          <label>Both</label>
                        </div>
                        <p className="text-red-700 text-sm">
                          {errors.patientDepartment?.message}
                        </p>
                      </div>
                    </div>
                    {/* Active Checkbox */}
                    <div className="hidden lg:block">
                      {/* Checkbox component */}
                      <div className="ml-3">
                        <CheckBoxField
                          control={control}
                          name="active"
                          label="Active"
                          placeholder="Status"
                        />
                      </div>
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
      </div>
    </>
  );
}
export default ClassModal;
