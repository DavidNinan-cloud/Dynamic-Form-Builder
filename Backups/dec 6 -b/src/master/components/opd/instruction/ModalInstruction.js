// "STAT"
// "AFTER BREAKFAST, LUNCH & DINNER"
// "BEFORE BREAKFAST"
// "APPLY ON SKIN"
// "AFTER LUNCH & DINNER"
// "AFTER MEALS"
// "ON EMPTY STOMOCH"
// "BEFORE SLEEP"
// "APPLY ON EFFECTED AREA"
// "AFTER BREAKFAST"
// "AFTER LUNCH"
// "AFTER DINNER"
// "BEFORE LUNCH"
// "BEFORE DINNER"

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
  getInstructionById,
  addNewInstruction,
  updateInstruction,
  getUnitDropdown,
} from "../../../services/opd/instruction/InstructionServices";
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
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalInstruction(props) {
  const schema = yup.object().shape({
    instructionCode: yup
      .string()
      .required("Required")
      .min(2, "Add Instruction Code")
      .matches(/^[a-zA-Z0-9\s]+$/, "Special Characters Not Allow"),
    instruction: yup
      .string()
      .required("Required")
      .min(2, "Add Instruction Description")
      .matches(/^[a-zA-Z\s&]+$/, "Number Not Allow For This Field"),
    // instructionLocal: yup
    //   .string()
    //   .required("Required")
    //   .min(2, "Add Local Instruction")
    //   .matches(/^[a-zA-Z\s-]+$/, "Number Not Allow For This Field"),
    unit: yup
      .array()
      .nullable(false, "Select At least One Unit")
      .min(1, "Select At least One Unit")
      .of(
        yup.object().shape({
          label: yup.string().required("Select At least One Unit"),
          value: yup.string().required("Select At least One Unit"),
        })
      )
      .required("Required"),
  });

  const defaultValues = {
    id: "",
    instructionCode: "",
    instruction: "",
    instructionLocal: "",
    unit: [],
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  //All the options in the unit drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = React.useState([]);

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
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //Store all the options of the Country Dropdown before the component gets mounted
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
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        instructionCode: data.instructionCode,
        instruction: data.instruction,
        instructionLocal: data.instructionLocal,
        id: data.id,
        unit: data.unit,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        instructionCode: data.instructionCode,
        instruction: data.instruction,
        instructionLocal: data.instructionLocal,
        unit: data.unit,
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
      postInstruction(finalData);

  }

  //ADD POST API save data
  const { mutate: postInstruction } = useMutation(addNewInstruction, {
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
    ["getInstructionById", props.idValue],
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getInstructionById(props.idValue);
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
        console.log("Status", status);
        console.log("Final result is" + data.data.result);
        console.log(typeof data.data.result);
        const obj = JSON.parse(data.data.result);
        console.log("converted object ala " + JSON.stringify(obj));

        let resetObj = {
          id: obj.id,
          instructionCode: obj.instructionCode,
          instruction: obj.instruction,
          instructionLocal: obj.instructionLocal,
          unit: obj.units,
          active: obj.status,
        };
        if (data) {
          reset(resetObj);
          console.log("getValues", getValues());
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
      updateInstruction(finalData)
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
              <legend className="ml-2 lg:ml-0 font-bold text-gray-800">
                Instruction
              </legend>
              <form
                className="grid grid-cols-1 w-full"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
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
                  
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="instructionCode"
                      variant="outlined"
                      label="Instruction Code *"
                      error={errors.instructionCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  {/* Input Fields */}
                  <div className=" w-full">
                    <InputField
                      name="instruction"
                      variant="outlined"
                      label="Description *"
                      error={errors.instruction}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields */}
                  <div className=" w-full">
                    <InputField
                      name="instructionLocal"
                      variant="outlined"
                      label="Instruction(Local) *"
                      // error={errors.instructionLocal}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  </div>

                  {/* Active Checkbox */}
                  <div className="flex md:px-3 lg:px-0  pt-2 justify-between items-start">
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
        confirmationMsg="Are you sure want to add the record ?"
        confirmationButtonMsg="Add"
      />
    </>
  );
}
