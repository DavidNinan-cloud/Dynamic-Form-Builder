import React, { useEffect } from "react";

//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";
import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
//imports from the common FormControl folder
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";

import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";
//importing the asynchronous function for using in the react query hooks
import {
  addNewDepartment,
  getUnitlist,
  getDepartmentById,
  updateDepartment,
} from "../../services/organization/DepartmentServices";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

export default function DepartmentModal(props) {
  const defaultValues = {
    id: "",
    departmentCode: "",
    departmentName: "",
    deptIsClinical: false,
    unit: [],
    active: true,
  };

  console.log("modal department cliked", props.idValue);
  const schema = yup.object().shape({
    departmentCode: yup.string().required("Required"),
    departmentName: yup.string().required("Required"),

    unit: yup
      .array()
      .required("Required")
      .nullable(false, "Required")
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Required"),
  });

  const [openPost, setOpenPost] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  const [openPut, setOpenPut] = React.useState(false);
  const handleClosePost = () => {
   ;
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
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        id: data.id,
        active: data.active,
        departmentCode: data.departmentCode,
        departmentName: data.departmentName,
        deptIsClinical: data.deptIsClinical,
        unit: data.unit,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postObj = {
        active: data.active,
        departmentCode: data.departmentCode,
        departmentName: data.departmentName,
        deptIsClinical: data.deptIsClinical,
        unit: data.unit,
      };
      console.log(postObj);
      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postDepartment(finalData);
  }

  const { mutate: postDepartment } = useMutation(addNewDepartment, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);

      successAlert(result.data.message);
      console.log("Record has been created");

      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      props.setEdit(false);
      reset(defaultValues);
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  const { status } = useQuery(
    ["Department", props.idValue],

    () => {
      if (props.idValue !== "" && openPut !== true) {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        return getDepartmentById(props.idValue);
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
        console.log("Final result is" + data.data.result);

        console.log(typeof data.data.result);

        const obj = JSON.parse(data.data.result);

        console.log("converted object ala " + JSON.stringify(obj));

        const resetObj = {
          id: obj.id,
          departmentCode: obj.departmentCode,
          departmentName: obj.departmentName,
          deptIsClinical: obj.deptIsClinical,
          unit: obj.units,
          active: obj.status,
        };

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
  const [unit, setUnit] = React.useState([]);

  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);

    updateDepartment(finalData)
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
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
  }, []);

  return (
    <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
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
            <CancelPresentationIconButton
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>
          <div className="row">
            <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2 ">
              <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                Department
              </legend>
              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 md:grid-cols-1  gap-2 mx-2"
              >
                <div className="pt-2 flex flex-nowrap md:grid md:grid-cols-2 lg:flex lg:flex-nowrap md:px-3 lg:px-0 gap-2">
                  <div className="w-full">
                    <InputField
                      name="departmentCode"
                      variant="outlined"
                      label="Department Code *"
                      error={errors.departmentCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  <div className="w-full">
                    <InputField
                      name="departmentName"
                      variant="outlined"
                      label="Department Name *"
                      error={errors.departmentName}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      error={errors.unit}
                      name="unit"
                      dataArray={unit}
                      placeholder="Select Unit *"
                      isMulti={true}
                      isSearchable={false}
                      isClearable={false}
                    />
                  </div>
                  <div className="">
                    <CheckBoxField
                      defaultChecked={defaultValues}
                      control={control}
                      name="deptIsClinical"
                      label="isClinical"
                      placeholder="Active"
                    />
                  </div>
                  <div className="w-full">
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end md:grid-cols-3 xl:grid-cols-5">
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
  );
}
