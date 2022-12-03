import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import { Box, Modal, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getEmployeeTypeById,
  addNewEmployeeType,
  updateEmployyeType,
} from "../../../../services/employeetype/EmployeeTypeServices";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalEmployeeType(props) {
  const schema = yup.object().shape({
    employeeType: yup
      .string()
      .required("Required")
      .min(2, "Add Employee Type")
      .matches(/^[a-zA-Z\s]+$/, "Number & Special Char Not Allow"),
  });

  const defaultValues = {
    id: "",
    employeeType: "",
    isClinical: false,
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
    props.setCountClick(0);
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
        employeeType: data.employeeType,
        isClinical: data.isClinical,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        employeeType: data.employeeType,
        isClinical: data.isClinical,
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
    postEmployeeType(finalData);
  }

  //ADD POST API save data
  const { mutate: postEmployeeType } = useMutation(addNewEmployeeType, {
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

  //EDIT API
  const { status } = useQuery(
    ["EmployeeType", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getEmployeeTypeById(props.idValue);
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
          id: data.data.result.id,
          employeeType: data.data.result.employeeType,
          isClinical: data.data.result.isClinical,
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
    
      updateEmployyeType(finalData)
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
      {/* Modal for Gender (textField)*/}
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
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
              props.setEdit(false);
              reset(defaultValues);
            }}
          />

          <div className="row">
            <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
              <legend className=" ml-3 lg:ml-0 font-bold text-gray-800">
                Employee Type
              </legend>
              <form
                className="grid lg:grid-cols-1 w-full"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 px-5 lg:px-2 gap-2">
                  {/* Input Fields */}
                  <div className=" w-full ">
                    <InputField
                      name="employeeType"
                      variant="outlined"
                      fullwidth
                      label="Employee Type *"
                      error={errors.employeeType}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  <div className="flex items-center md:justify-between gap-3">
                    <div className="flex gap-2">
                    <CheckBoxField
                      // defaultChecked={defaultValues}
                      control={control}
                      name="isClinical"
                      label="isClinical"
                      placeholder="Active"
                    />

                    {/* Checkbox */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>

                    <div className="flex space-x-3 items-center justify-end">
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
