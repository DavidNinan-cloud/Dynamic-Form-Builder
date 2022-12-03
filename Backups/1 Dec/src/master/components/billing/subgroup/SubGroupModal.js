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
import { ModalStyle } from "../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
//importing the asynchronous function for using in the react query hooks
import {
  addNewSubGroup,
  getSubGroupById,
  updateSubGroup,
} from "../../../services/billing/subgroup/SubGroupServices";
import { getGroupList } from "../../../services/billing/group/GroupServices";
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

function SubGroupModal(props) {
  console.log("This is SubGroupModal component");
  //All the options in the SubGroup drop down list are going to be stored in this state variable
  const [groupOptions, setGroupOptions] = useState([]);
  //Yup schema
  const schema = yup.object().shape({
    group: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
    subGroupName: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    subGroupDescription: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    group: null,
    subGroupName: "",
    subGroupDescription: "",
    active: true,
  };
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});


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
  
   //Store all the options of the group dropdown before the component gets mounted
   useEffect(() => {
    console.log("getsubGroupList() is going to be executed");
    getGroupListDropdown();
  }, []);
  useEffect(() => {
    console.log("this is Props.value" + props.idValue);
  }, [props.idValue]);

  //state variable to open the confirmation modal for POST request
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
        group: {
          groupName: data.group.label,
          id: data.group.value,
        },
        id: data.id,
        subGroupDescription: data.subGroupDescription,
        subGroupName: data.subGroupName,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postedObj = {
        active: data.active,
        group: {
          groupName: data.group.label,
          id: data.group.value,
        },
        id: data.id,
        subGroupDescription: data.subGroupDescription,
        subGroupName: data.subGroupName,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
    //to set the form fields as blank
  };

   //event listener function for the Add button on the modal form
   function addRecord() {
    console.log("A new record has been added");
    //handleSubmit of React hook forms can be invoked remotely as well
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postSubGroup(finalData);
    }
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postSubGroup } = useMutation(addNewSubGroup, {
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
      props.setCountClick(0);
      errorAlert(error.message);
      handleClosePost();
    },
  });

   //useQuery hook for the functionality of edit icon click
   const { status } = useQuery(
    ["SubGroupInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        return getSubGroupById(props.idValue);
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
          id: data.data.result.id,
          group: data.data.result.group,
          subGroupName: data.data.result.subGroupName,
          subGroupDescription: data.data.result.subGroupDescription,
          active: data.data.result.status,
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

  //Get request to have all the list of SubGroup. This request belongs to the SuBGroup-controller on swagger
  function getGroupListDropdown() {
    getGroupList()
      .then((response) => {
        console.log("The list of all the countries are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setGroupOptions(response.data.result);
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log(error);
      });
  }

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    if (props.countClick === 0) {
      updateSubGroup(finalData)
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
                  Add Sub-Group
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full  gap-2 px-3"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {/*Select group drop down menu*/}
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.group}
                        name="group"
                        placeholder="Select Group*"
                        dataArray={groupOptions}
                        isDisabled={props.edit}
                      />
                    </div>
                    <div className="w-full">
                      {/* sub Group Name input field */}
                      <InputField
                        name="subGroupName"
                        variant="outlined"
                        label="Sub-Group Name*"
                        error={errors.subGroupName}
                        control={control}
                        inputProps={{ style : { textTransform : "capitalize" } , }}
                      />
                    </div>
                    <div className="w-full">
                      {/* Sub Group descrition Input field */}
                      <InputField
                        name="subGroupDescription"
                        variant="outlined"
                        label="Sub-Group Description*"
                        error={errors.subGroupDescription}
                        control={control}
                        inputProps={{ style : { textTransform : "capitalize" } , }}
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
export default SubGroupModal;
