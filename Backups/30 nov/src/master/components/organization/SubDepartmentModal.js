import React, { useEffect } from "react";

//imports from react hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";

import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";

//imports from the common FormControl folder
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField"; //imports from material ui library
import { Box, Modal, Button } from "@mui/material";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

import {
  addNewSubDepartment,
  getSubDepartmentById,
  updateSubDepartment,
} from "./../../services/organization/SubDepartmentServices";
import {
  getDepartmentList,
  getUnitlist,
} from "../../services/organization/SubDepartmentServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
export default function SubDepartmentMoal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    subDepartmentCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, " Sub Department Code not Valid")
      .min(2, "Add at least 2 Digit Department Code"),
    subDepartmentName: yup
      .string()
      .required("Required")
      .min(4, "Add Sub Department Name")
      .matches(/^[A-Za-z\s]+$/, "Only Alphabets Are Allowed For This Field "),
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
    department: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    subDepartmentCode: "",
    subDepartmentName: "",
    unit: "",
    department: " ",
    active: true,
  };

  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
  //state variable to close the confirmation modal for PUT request
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
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [unit, setUnit] = React.useState([]);

  const [department, setDepartment] = React.useState([]);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

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
        department: {
          id: data.department.value,
        },
        subDepartmentCode: data.subDepartmentCode,
        subDepartmentName: data.subDepartmentName,
        unit: {
          id: data.unit.value,
        },
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );

      let postObj = {
        active: data.active,
        department: {
          id: data.department.id,
        },
        subDepartmentCode: data.subDepartmentCode,
        subDepartmentName: data.subDepartmentName,
        unit: {
          id: data.unit.id,
        },
      };

      console.log(postObj);

      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postSubDepartment(finalData);
    // }
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postSubDepartment } = useMutation(addNewSubDepartment, {
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
      console.log(error);

      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["SubDepartment", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getSubDepartmentById(props.idValue);
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
          department: data.data.result.department,
          subDepartmentCode: data.data.result.subDepartmentCode,
          subDepartmentName: data.data.result.subDepartmentName,
          unit: data.data.result.unit,
          active: data.data.result.status,
        };
        console.log(data);
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
    console.log("Your data has been updated");
    updateSubDepartment(finalData)
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

  //call unit dropdown list
  useEffect(() => {
    getDepartmentList(department)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setDepartment(res.result);
      });
  }, []);

  //call unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
  }, []);

  return (
    <>
      {/* Model open on add button  start */}
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
                  Sub Department
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:p-2">
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        //handleChange={handleChange}
                        error={errors.department}
                        name="department"
                        dataArray={department}
                        placeholder="Department *"
                        //isMulti={false}
                        isSearchable={false}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="subDepartmentCode"
                        variant="outlined"
                        label="Sub Department Code *"
                        error={errors.subDepartmentCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="subDepartmentName"
                        variant="outlined"
                        label="Sub Department Name *"
                        error={errors.subDepartmentName}
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
                        placeholder="Unit *"
                        isMulti={false}
                        isSearchable={false}
                      />
                    </div>
                    <div className="px-2">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton
                        onClick={() => reset(defaultValues)} //Reset
                      />
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
      {/* model and table name button end */}
    </>
  );
}
