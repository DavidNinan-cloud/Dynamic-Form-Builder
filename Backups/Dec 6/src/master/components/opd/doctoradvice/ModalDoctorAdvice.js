import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import { Box, Modal, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDoctorAdviceById,
  addNewDoctorAdvice,
  updateDrAdvice,
  getUnitDropdown,
} from "../../../services/opd/dradvice/DrAdviceService";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";

export default function ModalDoctorAdvice(props) {
  const schema = yup.object().shape({
    doctorAdviceCode: yup
      .string()
      .required("Required")
      .min(4, "Add Doctor Advice Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    doctorAdviceDescription: yup
      .string()
      .required("Required")
      .min(2, "Add Doctor Advice Description")
      .matches(/^[0-9-]+$/, "Alphabets Not Allow For This Field"),
    localAdvice: yup
      .string()
      .required("Required")
      .min(2, "Add Local Advice")
      .matches(/^[0-9-]+$/, "Alphabet Not Allow For This Field"),
    unit: yup
      .array()
      .required("Required")
      .nullable(false, "Select At least One Unit")
      .min(1, "Select At least One Unit")
      .of(
        yup.object().shape({
          label: yup.string().required("Select At least One Unit"),
          value: yup.string().required("Select At least One Unit"),
        })
      ),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    doctorAdviceCode: "",
    doctorAdviceDescription: "",
    localAdvice: "",
    unit: [],
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  const [unitOptions, setUnitOptions] = React.useState([]);

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

  //call unit dropdown list
  useEffect(() => {
    getUnitDropdown(unitOptions)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnitOptions(res.result);
      });
  }, []);

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        doctorAdviceCode: data.doctorAdviceCode,
        doctorAdviceDescription: data.doctorAdviceDescription,
        localAdvice: data.localAdvice,
        id: data.id,
        unit: data.unit,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      let postedObj = {
        active: data.active,
        doctorAdviceCode: data.doctorAdviceCode,
        doctorAdviceDescription: data.doctorAdviceDescription,
        localAdvice: data.localAdvice,
        unit: data.unit,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postDrAdvice(finalData);
    }
  }

  //ADD POST API save data
  //useMutation hook for the implementation of post request data saving
  const { mutate: postDrAdvice } = useMutation(addNewDoctorAdvice, {
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
      setOpen(false);
      setEdit(false);
    },
    onError: (error) => {
      console.log(error);
      props.setCountClick(0);
      errorAlert(error.message);
      handleClosePost();
    },
  });

  //EDIT API
  const { status } = useQuery(
    ["getDoctorAdviceById", props.idValue],
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getDoctorAdviceById(props.idValue);
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
        let resetObj = {
          id: obj.id,
          doctorAdviceCode: obj.doctorAdviceCode,
          doctorAdviceDescription: obj.doctorAdviceDescription,
          localAdvice: obj.localAdvice,
          unit: obj.units,
          active: obj.status,
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
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    console.log("Your data has been updated");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      updateDrAdvice(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert(response.data.message);
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setCountClick(0);
            handleClosePut();
            setEdit(false);
            reset(defaultValues);
            setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setCountClick(0);
          errorAlert(error.message);
          handleClosePut();
        });
    }
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
                <legend className="ml-3 lg:ml-0 font-bold text-gray-800">
                  Doctor Advice
                </legend>
                <form
                  className="grid grid-cols-1 w-full"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="doctorAdviceCode"
                        variant="outlined"
                        label="Code *"
                        error={errors.doctorAdviceCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className=" w-full">
                      <InputField
                        name="doctorAdviceDescription"
                        variant="outlined"
                        label="Advice Description *"
                        error={errors.doctorAdviceDescription}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className=" w-full">
                      <InputField
                        name="localAdvice"
                        variant="outlined"
                        label="Advice(Local) *"
                        error={errors.localAdvice}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        placeholder="Select Unit *"
                        dataArray={unitOptions}
                        isSearchable={false}
                        isMulti={true}
                      />
                    </div>
                  </div>

                    {/* Active Checkbox */}
                    <div className="flex md:px-3 lg:px-0  py-2 justify-between items-start">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                   

                  <div className="flex space-x-3  pb-2 justify-end">
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
