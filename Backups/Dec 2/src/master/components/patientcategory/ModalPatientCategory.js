import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { Button, Box, Modal } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTypeOfPatientById,
  addNewTypeOfPatient,
  updatePatientCategory,
  getUnitDropdown,
} from "../../services/patientcategory/PatientCategoryServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
  updateAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalTypeOfPatient(props) {
  //yup's validation schema
  const schema = yup.object().shape({
    // patientTypeCode: yup
    //   .string()
    //   .required("Required")
    //   .min(2, "Add Patient Code")
    //   .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    category: yup
      .string()
      .required("Required")
      .min(2, "Add Patient Category Name")
      .matches(/^[a-zA-Z\s-]+$/, "Numbers Not Allow for This Field"),
    description: yup
      .string()
      .required("Required")
      .min(2, "Add Description")
      .matches(/^[a-zA-Z\s-]+$/, "Numbers Not Allow for This Field"),
    // unit: yup
    //   .object()
    //   .required("Required")
    //   .nullable()
    //   .shape({
    //     value: yup.string().required("Select At least One Unit"),
    //     label: yup.string().required("Select At least One Unit"),
    //   }),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    category: "",
    description: "",
    // patientTypeCode: "",
    // unit: null,
    isDefault: true,
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [unitOptions, setUnitOptions] = React.useState([]);
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

  //useFor Get Unit Options
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
  }, []);

  //axios get request to have all the list of countries. This request belongs to the country-controller on swagger
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the units are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitDataHandler = (data) => {
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        isDefault: data.isDefault,
        id: data.id,
        // patientTypeCode: data.patientTypeCode,
        category: data.category,
        description: data.description,
        // unit: {
        //   id: data.unit.value,
        // },
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        isDefault: data.isDefault,
        // patientTypeCode: data.patientTypeCode,
        category: data.category,
        description: data.description,
        // unit: {
        //   id: data.unit.value,
        // },
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
      postTypeOfPatient(finalData);
  }

  //ADD POST API save data
  const { mutate: postTypeOfPatient } = useMutation(addNewTypeOfPatient, {
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
    ["TypeOfPatientById", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getTypeOfPatientById(props.idValue);
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
          category: data.data.result.category,
          description: data.data.result.description,
          // patientTypeCode: data.data.result.patientTypeCode,
          id: data.data.result.id,
          // unit: data.data.result.unit,
          isDefault: data.data.result.isDefault,
          active: data.data.result.status,
        };
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
      updatePatientCategory(finalData)
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
          handleClosePut();
        });
  }

  return (
    <>
      {/* {
  "active": true,
  "category": "string",
  "description": "string",
  "isDefault": true
} */}
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
              <legend className="ml-3 lg:ml-0 font-bold text-gray-800">
                Patient Category
              </legend>
              <form
                className="grid grid-cols-1 w-full"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2 ">
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="category"
                      variant="outlined"
                      label="Patient Category *"
                      error={errors.category}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="description"
                      variant="outlined"
                      label="Description *"
                      error={errors.description}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields
                  <div className="w-full">
                    <InputField
                      name="patientTypeCode"
                      variant="outlined"
                      label="Code *"
                      error={errors.patientTypeCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div> */}

                  {/* Dropdown Fields
                  <div className="w-full ">
                    <DropdownField
                      control={control}
                      error={errors.unit}
                      name="unit"
                      placeholder="Select Unit *"
                      dataArray={unitOptions}
                      // isMulti={true}
                      isSearchable={false}
                    />
                  </div> */}

                  {/* isDefault Checkbox */}
                  <div className="grid justify-start items-start">
                    <CheckBoxField
                      control={control}
                      name="isDefault"
                      label="isDefault"
                      placeholder="isDefault"
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className="grid justify-start items-start">
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>
                </div>

                {/* conditional rendering of the Reset button */}
                {/*  */}
                <div className="flex gap-4 space-x-3 md:px-3 lg:px-0 pb-2 justify-end">
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
