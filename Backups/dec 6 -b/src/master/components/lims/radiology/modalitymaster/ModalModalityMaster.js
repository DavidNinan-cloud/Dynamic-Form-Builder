import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Modal, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ModalStyle } from "../../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";
import {
  getModalityMasterById,
  addNewModalityMaster,
  updateModalityMaster,
} from "../../../../services/lims/radiology/modalitymaster/ModalityMasterServices";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalModalityMaster(props) {
  const schema = yup.object().shape({
    modalityName: yup
      .string()
      .required("Required")
      .min(2, "Add Modality Name")
      .matches(/^[a-zA-z\s()]+$/, "Number not allow"),
    modalityCode: yup
      .string()
      .required("Required")
      .min(2, "Add Gender Modality Code")
      .matches(/^[a-zA-Z0-9\s]+$/, "Numbers & Special Characters Not Allow"),
    aeTitle: yup
      .string()
      .required("Required")
      .min(2, "Add AE Title")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Characters Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    modalityName: "",
    modalityCode: "",
    aeTitle: "",
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

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

  // {
  //   "active": false,
  //   "aeTitle": "string",
  //   "id": 3,
  //   "modalityCode": "string",
  //   "modalityName": "string"
  // }
  const onSubmitDataHandler = (data) => { 
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        modalityCode: data.modalityCode,
        modalityName: data.modalityName,
        aeTitle: data.aeTitle,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        modalityName: data.modalityName,
        modalityCode: data.modalityCode,
        aeTitle: data.aeTitle,
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
      postModality(finalData);
  }

  //ADD POST API save data
  const { mutate: postModality } = useMutation(addNewModalityMaster, {
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
      props.setOpenBackdrop(false);
      errorAlert(error.message);
      handleClosePost();
    },
  });

  //EDIT GET API
  const { status } = useQuery(
    ["GenderInfo", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getModalityMasterById(props.idValue);
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
          modalityCode: data.data.result.modalityCode,
          modalityName: data.data.result.modalityName,
          aeTitle: data.data.result.aeTitle,
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
    console.log("Your data has been updated");
      updateModalityMaster(finalData)
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
          handleClosePut(); 
        }
      })
      .catch((error) => {
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
          onClose={()=>{
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
              <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
                <legend className=" ml-2 lg:ml-0 font-bold text-gray-800">
                  Modality Master
                </legend>
                <form
                  className="grid grid-cols-1 w-full"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2 ">
                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="modalityCode"
                        variant="outlined"
                        label="Modality Code *"
                        error={errors.modalityCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="modalityName"
                        variant="outlined"
                        label="Modality Name *"
                        error={errors.modalityName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="aeTitle"
                        variant="outlined"
                        label="AE Title *"
                        error={errors.aeTitle}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Dropdown Fields */}
                    {/*<div className="w-full">
                       <DropdownField
                        control={control}
                        error={errors.modalityName}
                        name="modalityName"
                        placeholder="Modality Name"
                        // dataArray={unitOptions}
                        isSearchable={false}
                        // isMulti={true}
                      />
                    </div> */}

                    {/* Dropdown Fields */}
                    {/* <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.aeTitle}
                        name="aeTitle"
                        placeholder="AE Title"
                        // dataArray={unitOptions}
                        isSearchable={false}
                        // isMulti={true}
                      />
                    </div> */}

                    {/* Active Checkbox */}
                    <div className=" grid justify-start items-start">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 md:px-3 lg:px-0 pb-2 justify-end">
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

        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

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
