import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import { Button, Box, Modal } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getICDCodeById,
  addNewICDCode,
  updateICDCode,
  getUnitDropdown,
} from "../../../services/opd/icdcode/ICDCodeService";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ICDCodeModal(props) {
  //Schema validation form fields
  const schema = yup.object().shape({
    icdCode: yup
      .string()
      .required("Required")
      .min(1, "Add ICD Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Characters Not Allow"),
    icdCodeDescription: yup
      .string()
      .required("Required")
      .min(4, "Add ICDCode Description")
      .matches(/^[a-zA-Z0-9\s]+$/, "Numbers Not Allow For This Field"),
  });

  const defaultValues = {
    id: "",
    icdCode: "",
    icdCodeDescription: "",
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

  
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        icdCode: data.icdCode,
        icdCodeDescription: data.icdCodeDescription,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        icdCode: data.icdCode,
        icdCodeDescription: data.icdCodeDescription,
      };
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postICDCode(finalData);
  }
  //ADD POST API save data
  const { mutate: postICDCode } = useMutation(addNewICDCode, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      console.log("Record has been created");
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

  //EDIT API
  const { status } = useQuery(
    ["getICDCodeById", props.idValue],
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getICDCodeById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "Data fetched from get response by id is " + JSON.stringify(data)
        );
        console.log(status);
        let resetObj = {
          id: data.data.result.id,
          icdCode: data.data.result.icdCode,
          icdCodeDescription: data.data.result.icdCodeDescription,
          active: data.data.result.status,
        };
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  //UPDATE PUT API
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Your data has been updated");
      updateICDCode(finalData)
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
          props.setOpenBackdrop(false);
          errorAlert(error.message);
          handleClosePut();
        });
  }

  return (
    <>
  
      {/* Modal/popup (textField)*/}
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
            <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                ICDCode
              </legend>
              <form
                className="grid grid-cols-1 w-full gap-x-2 py-4"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 px-5 lg:px-2 gap-2">
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="icdCode"
                      variant="outlined"
                      label="ICDCode *"
                      error={errors.icdCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  {/* Input Fields */}
                  <div className=" w-full">
                    <InputField
                      name="icdCodeDescription"
                      variant="outlined"
                      label="ICDCode Description *"
                      error={errors.icdCodeDescription}
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

                <div className="flex space-x-3 items-center justify-end">
                  {/* conditional rendering of the Reset button */}
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

    </>
  );
}
