import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, TextField } from "@mui/material";
import {
  getDoses,
  getDrugName,
  getFrequency,
  getInstruction,
  getRoute,
} from "../../../services/IpdEmr/IpdEmrServices";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";
import InputField from "../../../../Common Components/FormFields/InputField";
import IpdMedicationTable from "../emrtables/IpdMedicationTable";

const prescriptionType = [
  { id: 1, value: "Brand", label: "Brand Name" },
  { id: 2, value: "Generic", label: "Generic" },
];
const AddIpdMedicationModal = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    drugName: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Drug Name"),
    quantity: yup
      .string()
      .nullable()
      .matches(/^\+?(0|[1-9]\d*)$/, "Invalid Value")
      .required("Quantiy Required"),
    frequency: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Frequency"),
    dosage: yup
      .string()
      .nullable()
      .notRequired("Select Dosage"),
    instruction: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Instruction"),
    duration: yup
      .string()
      .nullable()
      .matches(/^\+?(0|[1-9]\d*)$/, "Invalid Value")
      .required("Duration Required"),
    durationIn: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Duration"),
    route: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Route"),
    ivFlowRate: yup
      .string()
      .nullable()
      .notRequired(),

    // department: yup
    //   .object()
    //   .nullable()
    //   .shape({
    //     value: yup.string(),
    //     label: yup.string(),
    //   })
    //   .required("please select department"),
    // doctorName: yup
    //   .object()
    //   .nullable()
    //   .shape({
    //     value: yup.string(),
    //     label: yup.string(),
    //   })
    //   .required("please select decotor name"),
    // priority: yup
    //   .object()
    //   .nullable()
    //   .shape({
    //     value: yup.string(),
    //     label: yup.string(),
    //   })
    //   .required("please select priority"),
    // notes: yup
    //   .string()
    //   .required("notes  Required")
    //   .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  });

  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState({ result: [], actions: ["Delete", "Edit"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [openStartDate, setOpenStartDate] = useState(false);
  const [instructionOptions, setInstructionOptions] = useState();
  const [instructionList, setInstructionList] = useState();
  const [instruction, setInstruction] = useState();
  const [frequency, setFrequency] = useState();
  const [frequencyOptions, setFrequencyOptions] = useState();
  const [dosageOption, setDosageOption] = useState();
  const [routeOption, setRouteOption] = useState();
  const [drugNameList, setDrugNameList] = useState();
  const [drugName, setDrugName] = useState();
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataId, setDataId] = React.useState(null);
  const [editInfo, setEditInfo] = React.useState();

  let defaultValues = {
    prescriptionType: 1,
    drugName: null,
    quantity: "",
    frequency: null,
    dosage: "",
    instruction: "",
    duration: "0",
    durationIn: null,
    route: "",
    ivFlowRate: "",
    startDate: new Date(),
  };

  const {
    handleSubmit,
    reset,
    formState,
    control,
    register,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  let durationValue = watch("duration");
  let durationInValue = watch("durationIn");
  let prescriptionDetails = watch("prescriptionType");

  function onSubmit(prescriptionData) {
    console.log("prescriptionData.instruction", dataId);

    let isNew;
    {
      typeof prescriptionData.instruction.__isNew__ !== "undefined"
        ? (isNew = true)
        : (isNew = false);
    }

    let drugType;
    {
      prescriptionData.prescriptionType === 1
        ? (drugType = "Brand")
        : (drugType = "Generic");
    }
    // display form data on success
    let year = prescriptionData.startDate.getFullYear();
    let month = String(prescriptionData.startDate.getMonth() + 1).padStart(
      2,
      "0"
    );
    let day = String(prescriptionData.startDate.getDate()).padStart(2, "0");
    let fullDate = year + "-" + month + "-" + day;

    let prescriptionDetails = {
      drugType: drugType,
      drugName: prescriptionData.drugName.label,
      quantity: prescriptionData.quantity,
      frequency: prescriptionData.frequency.label,
      localFrequency: prescriptionData.frequency.frequency,
      dosage: prescriptionData.dosage,
      instruction: prescriptionData.instruction.instruction,
      localInstruction: prescriptionData.instruction.instructionLocal,
      isNew: isNew,
      duration: parseInt(prescriptionData.duration),
      durationIn: prescriptionData.durationIn.label,
      route: prescriptionData.route.label,
      ivFlowRate: prescriptionData.ivFlowRate,
      startDate: fullDate,
    };
    if (dataId !== null) {
      data.result[dataId] = prescriptionDetails;
    } else {
      data.result.push(prescriptionDetails);
    }
    reset();
  }

  useEffect(() => {
    if (props.editInfo !== null && props.dataId !== null) {
      console.log("editInfo", props.editInfo);
      if (props.editInfo.drugType.toLowerCase() === "brand") {
        setValue("prescriptionType", 1);
      } else {
        setValue("prescriptionType", 2);
      }
      let drugName = { value: 1, label: props.editInfo.drugName };
      let frequency = { value: 1, label: props.editInfo.frequency };
      let instruction = { value: 1, label: props.editInfo.instruction };
      let durationIn = { value: 1, label: props.editInfo.durationIn };
      let route = { value: 1, label: props.editInfo.route };


      let myObj = {
        drugName: drugName,
        quantity: props.editInfo.quantity,
        frequency: frequency,
        dosage: props.editInfo.dosage,
        instruction: instruction,
        duration: props.editInfo.duration,
        durationIn: durationIn,
        route: route,
        ivFlowRate: props.editInfo.ivFlowRate,
      };
      reset(myObj);
    }
  }, [props.editInfo]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };

  const handleSave = () => {
    // props.followupDetails.push(finalDatails);

    if (props.dataId !== null) {
      let updatedPrescription = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedPrescription.push(item);
      });
      console.log("Prescription Value", updatedPrescription);
      props.medication[props.dataId] = updatedPrescription[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.medication.push(item);
      });
    }
    reset();
    props.setOpen(false);
  };

  let prescriptionName = watch("prescriptionType");
  let frequncyValue = watch("frequency");
  let freqArray;
  useEffect(() => {
    if (frequncyValue !== null) {
      freqArray = frequncyValue.label.split("-");
      console.log("frequncyValue", freqArray);
      console.log("durationInValue", durationInValue);
      setFrequency(freqArray);
    }
  }, [frequncyValue, durationInValue]);

  //Drug Name
  let prescriptionTypeValue = "Brand";
  const handleChange = (e) => {
    console.log("Data", e);
    prescriptionName === 1
      ? (prescriptionTypeValue = "Brand")
      : (prescriptionTypeValue = "Generic");
    console.log("Length", prescriptionTypeValue.length);
    if (e.length > 0) {
      getDrugName(prescriptionTypeValue, e)
        .then((response) => {
          setDrugNameList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  //Instructions
  useEffect(() => {
    getInstruction()
      .then((response) => {
        setInstructionOptions(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    console.log("PreData", data.result);
  }, [data]);

  //Instruction List
  const handleInstructionChange = (e) => {
    if (e.length > 0) {
      getInstruction(e)
        .then((response) => {
          setInstructionList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  //Frequncy Type
  useEffect(() => {
    getFrequency()
      .then((response) => {
        console.log("ResponseFrq", response);
        setFrequencyOptions(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //Doses Type
  useEffect(() => {
    getDoses()
      .then((response) => {
        setDosageOption(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //Route Type
  useEffect(() => {
    getRoute()
      .then((response) => {
        setRouteOption(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    let durationDay = durationValue;
    // let daysinNumber;
    // let totalQuntity;
    console.log("durationDay", durationValue);

    let frequencyCount = 0;
    if (frequency) {
      frequency.forEach((element) => {
        let value = element.trim();
        if (value === "1/2") {
          frequencyCount = frequencyCount + 0.5;
        } else if (value === "1") {
          frequencyCount = frequencyCount + 1;
        } else {
          frequencyCount = frequencyCount + 0;
        }
      });
    }

    let quantityCount;
    if (
      durationDay !== null &&
      props.dataId === null &&
      durationInValue !== null
    ) {
      console.log("durationDay", durationDay);
      if (durationInValue.label.toLowerCase() === "days") {
        // daysinNumber = durationDay.substring(0, durationDay.indexOf(" "));
        quantityCount = parseFloat(durationDay) * parseFloat(frequencyCount);
      } else if (durationInValue.label.toLowerCase() === "months") {
        // daysinNumber = durationDay.substring(0, durationDay.indexOf(" "));
        console.log("frequencyCount", frequencyCount);
        let quantityInMonths =
          parseFloat(durationDay) * parseFloat(frequencyCount);
        quantityCount = parseFloat(quantityInMonths) * 30;
      } else {
        // daysinNumber = durationDay.substring(0, durationDay.indexOf(" "));
        console.log("frequencyCount", frequencyCount);
        let quantityInYears =
          parseFloat(durationDay) * parseFloat(frequencyCount);
        quantityCount = parseFloat(quantityInYears) * 365;
      }

      let totalQuantity = Math.ceil(quantityCount);
      setValue("quantity", totalQuantity, { shouldValidate: true });
    }
    // if (typeof totalQuntity !== "undefined") {
    //   console.log("Quntity", typeof totalQuntity);
    //   setValue("quantity", totalQuntity, { shouldValidate: true });
    // }
  }, [durationValue, frequency]);

  function editRow(prescriptionInfo, index) {
    console.log("Edit Info", prescriptionInfo, index);
    setIsEdit(true);
    setEditInfo(prescriptionInfo);
    setDataId(index);
    let drugName = { value: 1, label: prescriptionInfo.drugName };
    let frequency = { value: 1, label: prescriptionInfo.frequency };
    let durationIn = { value: 1, label: prescriptionInfo.durationIn };
    let route = { value: 1, label: prescriptionInfo.route };

    let myObj = {
      prescriptionType: prescriptionType,
      drugName: drugName,
      quantity: prescriptionInfo.quantity,
      frequency: frequency,
      dosage: prescriptionInfo.dosage,
      instruction: instruction,
      duration: prescriptionInfo.duration,
      durationIn: durationIn,
      route: route,
      ivFlowRate: prescriptionInfo.ivFlowRate,
    };
    reset(myObj);
    let getInstructionKey = prescriptionInfo.instruction.split(" ");
    getInstruction(getInstructionKey[0])
      .then((response) => {
        let instructionArray = response.data.result;
        let val = instructionArray.find(
          (x) => x.instruction === prescriptionInfo.instruction
        );
        if (val) {
          setValue("instruction", val, { shouldValidate: true });
        }
      })
      .catch((response) => {
        console.log(response);
      });

    if (prescriptionInfo.drugType.toLowerCase() === "brand") {
      setValue("prescriptionType", 1);
    } else {
      setValue("prescriptionType", 2);
    }
  }

  // durationOption
  const durationInOption = [
    {
      value: "1",
      label: "Days",
    },
    {
      value: "2",
      label: "Months",
    },
    {
      value: "3",
      label: "Years",
    },
  ];

  const priorityOption = [
    {
      value: "1",
      label: "Saviour",
    },
    {
      value: "2",
      label: "Mild",
    },
    {
      value: "3",
      label: "Modrate",
    },
  ];

  return (
    <div>
      <fieldset className="border border-gray-300 text-left items-center rounded-md px-4 pt-5">
        <div className="text-base font-semibold  mb-3 flex justify-between">
          <h1>Medication</h1>

          <div className="-mt-2">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
          <div className=" grid grid-cols-3 lg:grid-cols-4 gap-2">
            {/* //Brand Name// */}
            <div className=" flex">
              <RadioField
                label=""
                name="prescriptionType"
                control={control}
                dataArray={prescriptionType}
              />
            </div>
            {/* //Drug Name// */}
            <div>
              <CreateableSelect
                control={control}
                error={errors.drugName}
                name="drugName"
                label="Drug Name*"
                placeholder="Drug Name*"
                dataArray={drugNameList}
                onInputChange={handleChange}
                inputRef={{
                  ...register("drugName", {
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setDrugName(e.target.value.value);
                      } else {
                        setDrugName(null);
                      }
                    },
                  }),
                }}
              />
            </div>
            {/* //Frequency// */}
            <div className="w-full flex space-x-2 justify-between">
              <DropdownField
                control={control}
                error={errors.frequency}
                name="frequency"
                placeholder="Frequency*"
                dataArray={frequencyOptions}
                isSearchable={false}
                handleChange={handleChange}
                inputRef={{
                  ...register("frequency", {
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setFrequency(e.target.value.label.split("-"));
                      } else {
                        setFrequency(0);
                      }
                    },
                  }),
                }}
              />
            </div>
            {/* //Dosage// */}
            <div className="w-full">
              <InputField
                name="dosage"
                variant="outlined"
                size="small"
                type="text"
                label="Dosage"
                placeholder="Dosage"
                error={errors.dosage}
                control={control}
              />
            </div>
            {/* //Instruction// */}
            <div className=" w-full flex  justify-between">
              <CreateableSelect
                control={control}
                error={errors.instruction}
                name="instruction"
                placeholder="Instruction*"
                dataArray={instructionList}
                isSearchable={false}
                // handleChange={handleChange}
                onInputChange={handleInstructionChange}
                inputRef={{
                  ...register("instruction", {
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setInstruction(e.target.value.value);
                      } else {
                        setInstruction(null);
                      }
                    },
                  }),
                }}
              />
            </div>
            {/* //Duration// */}
            <div className="flex space-x-2">
              <InputField
                name="duration"
                variant="outlined"
                size="small"
                type="number"
                label="Duration"
                placeholder="Duration"
                error={errors.duration}
                control={control}
              />
            </div>
            {/* //Duration In// */}
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.durationIn}
                name="durationIn"
                placeholder="Duration In*"
                dataArray={durationInOption}
                isSearchable={false}
                handleChange={handleChange}
              />
            </div>
            {/* //Quantity// */}
            <div className="flex  space-x-2 w-full">
              <InputField
                name="quantity"
                variant="outlined"
                size="small"
                type="string"
                label="Quantity *"
                placeholder="Quantity *"
                error={errors.quantity}
                control={control}
              />
            </div>
            {/* //Route// */}
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.route}
                name="route"
                placeholder="Route*"
                dataArray={routeOption}
                isSearchable={false}
                handleChange={handleChange}
              />
            </div>

            {/* //IV-Flow-Rate// */}
            <div className=" flex space-x-2 w-full">
              <InputField
                name="ivFlowRate"
                variant="outlined"
                label="IV-Flow-Rate"
                error={errors.ivFlowRate}
                control={control}
              />
            </div>
            {/* //Start Date// */}
            <div>
              <Controller
                control={control}
                defaultValue={new Date()}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      onOpen={() => setOpenStartDate(true)}
                      onClose={() => setOpenStartDate(false)}
                      // disablePast
                      inputProps={{ readOnly: true }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          type="date"
                          variant="outlined"
                          label="Start Date"
                          name="startDate"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          size="small"
                          onClick={(e) => setOpenStartDate(true)}
                        />
                      )}
                      inputFormat="dd/MM/yyyy"
                      disablePast
                      {...field}
                      error={Boolean(errors.startDate)}
                      helperText={errors.startDate?.message}
                    />
                  </LocalizationProvider>
                )}
                name="startDate"
              />
            </div>
            <div className="flex justify-end">
              {dataId !== null || props.dataId !== null ? (
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "35px",
                    minWidth: "90px",
                    minHeight: "35px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "35px",
                    minWidth: "90px",
                    minHeight: "35px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        </form>
      </fieldset>
      <div className="mt-10">
        {data.result.length > 0 ? (
          <div style={{ width: "68.25rem" }}>
            <div className=" max-h-24 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
              <IpdMedicationTable
                //data to be displayed
                data={data}
                deleteRow={deleteRow}
                // setOpen={setOpen}
                editRow={editRow}
              />
            </div>

            <div className="flex justify-end mt-2">
              <>
                <div className="flex">
                  <button
                    className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                    onClick={() => {
                      props.setOpen(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddIpdMedicationModal;
