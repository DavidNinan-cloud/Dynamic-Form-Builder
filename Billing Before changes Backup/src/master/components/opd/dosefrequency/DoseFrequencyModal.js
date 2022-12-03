import React, { useEffect } from "react";

//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
//imports from the common FormControl folder
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/Toasts";
//importing the asynchronous function for using in the react query hooks
import {
  getDoseFrequencyById,
  addNewDoseFrequency,
  updateDoseFrequency,
} from "../../../services/opd/DoseFrequencyService";
import { getUnitList } from "../../../services/appointment/AppointmentBookingSourceServices";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

export default function DepartmentModal(props) {
  console.log("onclick data of edit id ", props.edit);
  const defaultValues = {
    id: "",
    frequencyCode: "",
    frequency: "",
    frequencyLocal: "",
    unit: [],
    active: true,
  };

  console.log("modal department cliked", props.idValue);
  const schema = yup.object().shape({
    frequencyCode: yup.string().required("Required"),
    // .matches(/^[A-Za-z0-9\s]+$/, "Required")
    frequency: yup.string().required("Required"),
    // .matches(/^[A-Za-z0-9\s]+$/, "Required")
    frequencyLocal: yup.string().required("Required"),
    // .matches(/^[A-Za-z0-9-]+$/, "Only Numbers and - allowed")
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
    console.log("onclick data of edit id ", props.edit);
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        frequencyCode: data.frequencyCode,
        frequency: data.frequency,
        frequencyLocal: data.frequencyLocal,
        unit: data.unit,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postObj = {
        active: data.active,
        frequencyCode: data.frequencyCode,
        frequency: data.frequency,
        frequencyLocal: data.frequencyLocal,
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
    postDoseFrequency(finalData);
  }

  const { mutate: postDoseFrequency } = useMutation(addNewDoseFrequency, {
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

  const { status } = useQuery(
    ["Dose Frequency", props.idValue],

    () => {
      if (props.idValue !== "" && openPut !== true) {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        return getDoseFrequencyById(props.idValue);
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
          active: obj.status,
          frequencyCode: obj.frequencyCode,
          frequency: obj.frequency,
          frequencyLocal: obj.frequencyLocal,
          unit: obj.units,
          id: obj.id,
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
    updateDoseFrequency(finalData)
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
    getUnitList(unit)
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
          <div className="grid grid-cols-1 md:grid-cols-1  w-full lg:grid-cols-1">
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
                Dose Frequency
              </legend>
              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 md:grid-cols-1  gap-2 "
              >
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:p-2">
                  <div className="">
                    <InputField
                      name="frequencyCode"
                      variant="outlined"
                      label="Dose Frequency Code *"
                      error={errors.frequencyCode}
                      control={control}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="frequency"
                      variant="outlined"
                      label="Dose Frequency Description *"
                      error={errors.frequency}
                      control={control}
                    />
                  </div>

                  <div className="w-full">
                    <InputField
                      name="frequencyLocal"
                      variant="outlined"
                      label="Dose Frequency (Local)*"
                      error={errors.frequencyLocal}
                      control={control}
                    />
                  </div>

                  <div className="flex flex-nowrap">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      error={errors.unit}
                      name="unit"
                      dataArray={unit}
                      placeholder="Select Unit *"
                      isMulti={true}
                      isSearchable={false}
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
