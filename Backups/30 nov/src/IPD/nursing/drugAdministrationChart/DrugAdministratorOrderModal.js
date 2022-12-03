import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { Style } from "../../../IPD/components/bedallowcation/Style";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonTable from "../common/CommonTable";
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import {
  AddButton,
  SaveButton,
} from "../../../Common Components/Buttons/CommonButtons";
import CloseButton from "../../../Common Components/Buttons/CloseButton";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OrderdDrugDetailsTable from "./OrderdDrugDetailsTable";

const previousOrderDrugData = {
  message: "Apache Score list found ",
  result: [
    {
      Id: 30,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 29,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 28,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 16,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 1,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 3,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 4,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 12,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 22,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 44,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 42,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
    {
      Id: 56,
      DateTime: "01/02/2022,11:30Am",
      "Doctor Name": "Anand Patil",
    },
  ],
  statusCode: 200,
  count: 5,
};
const previousOrderDrugListData = {
  message: "Apache Score list found ",
  result: [
    {
      Id: 30,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
    },
    {
      Id: 29,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "800 mg",
      Route: "Oral",
      Frequency: "STAT",
      Duration: "16 Day",
      Quantity: 23,
    },
    {
      Id: 28,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "650 mg",
      Route: "Oral",
      Frequency: "1-0-0-1",
      Duration: "19 Day",
      Quantity: 39,
    },
    {
      Id: 16,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "800 mg",
      Route: "Oral",
      Frequency: "STAT",
      Duration: "1 Day",
      Quantity: "1",
    },
    {
      Id: 1,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "800 mg",
      Route: "Oral",
      Frequency: "STAT",
      Duration: "1 Day",
      Quantity: "1",
    },
    {
      Id: 3,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "800 mg",
      Route: "Oral",
      Frequency: "STAT",
      Duration: "1 Day",
      Quantity: "1",
    },
    {
      Id: 4,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "800 mg",
      Route: "Oral",
      Frequency: "STAT",
      Duration: "1 Day",
      Quantity: "1",
    },
    {
      Id: 12,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "90 mg",
      Route: "Oral",
      Frequency: "1-1-1-1",
      Duration: "4 Day",
      Quantity: "1",
    },
    {
      Id: 22,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "100 mg",
      Route: "Oral",
      Frequency: "1-1-1",
      Duration: "10 Day",
      Quantity: 8,
    },
    {
      Id: 44,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "400 mg",
      Route: "Oral",
      Frequency: "1-1-0",
      Duration: "5 Day",
      Quantity: 2,
    },
    {
      Id: 42,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "30 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "23 Day",
      Quantity: 12,
    },
    {
      Id: 56,
      "Drug Name": "Lorem ipsum dolor sit Lorem ",
      Dose: "80 mg",
      Route: "Oral",
      Frequency: "1-0-1",
      Duration: "15 Day",
      Quantity: 45,
    },
  ],
  statusCode: 200,
  count: 5,
};
const orderdDrugDetailsData = {
  message: "Order Drug Details list found ",
  result: [
    {
      Id: 30,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 29,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 28,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 16,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 1,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 3,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 4,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 12,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 22,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 44,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 42,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
    {
      Id: 56,
      "Drug Name": "Tab Wysolon 40mg",
      "Generic Name": "Lorem ipsum dolor ",
      Form: "Tab.",
      Dose: "900 mg",
      Route: "Oral",
      Frequency: "1-0-0",
      Duration: "40 Day",
      Quantity: 20,
      Instructions: "Lorem ipsum dolor sit Lorem ",
      StartDate: "01/02/2022",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function DrugAdministratorOrderModal(props) {
  //form validation
  const schema = yup.object().shape({
    drugName: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    genericName: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    form: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    dosage: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    frequency: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    duration: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    durationIn: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    quantity: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    route: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    ivFlowRate: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    quantity: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    startDate: yup
      .string()
      .required("Required")
      .nullable(),
    instructions: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
  });
  const [startDate, setStartDate] = React.useState(null);
  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    drugName: null,
    genericName: null,
    form: null,
    dosage: "",
    oneceInWeekDrug: false,
    alternativeDayDrug: false,
    perHourDrugDrug: false,
    frequency: null,
    duration: null,
    durationIn: null,
    quantity: "",
    route: null,
    ivFlowRate: null,
    instructions: null,
    startDate: new Date(),
    outsideMedicine: false,
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked" + data);
  };
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  return (
    <div className="w-full grid justify-center items-center rounded lg:px-0">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="h-[80%] w-[80%] p-4 ">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
              reset(defaultValues);
            }}
          />
          <div className="row">
            <h1 className="absolute top-3  text-xl font-semibold">
              Drug Administrator Order
            </h1>
            <div className="mt-6">
              <div className="bg-white p-2 shadow-md rounded-md  border w-full">
                <div className="grid  text-gray-500 grid-cols-2  xl:grid-cols-3    text-sm items-center gap-1 w-full py-3">
                  <div className="flex items-center    gap-2 w-10/12 lg:w-10/12">
                    <h1 className="text-black font-semibold">UHID </h1>
                    <div className="flex ml-14 relative left-0.5 lg:left-1 xl:left-0 xl:ml-6 space-x-2  items-center">
                      <span className="">:</span>
                      <span className="text-black font-normal">ABC </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-10/12 lg:w-8/12 border-l-2 pl-4">
                    <h1 className="text-black font-semibold">Gender </h1>
                    <div className="flex ml-4 xl:ml-2 space-x-2 items-center">
                      <span className="">:</span>
                      <span className="text-black font-normal">ABC </span>
                    </div>
                  </div>
                  <div className="flex items-center w-10/12 lg:w-6/12 xl:border-l-2 xl:pl-4">
                    <h1 className="text-black font-semibold">Patient Name </h1>
                    <div className="flex space-x-2 items-center ml-1 ">
                      <span>:</span>
                      <span className="text-black font-normal">ABC </span>
                    </div>
                  </div>
                  <div className="flex items-center w-10/12 lg:w-8/12 border-l-2  pl-4 xl:pl-0 xl:border-l-0">
                    <h1 className="text-black font-semibold">Bed No </h1>
                    <div className="flex relative left-0.5 lg:left-0 ml-6 xl:ml-4 space-x-2 items-center ">
                      <span>:</span>
                      <span className="text-black font-normal">ABC </span>
                    </div>
                  </div>
                  <div className="flex items-center w-10/12 lg:w-6/12 xl:border-l-2 xl:pl-4">
                    <h1 className="text-black font-semibold">Age </h1>
                    <div className="flex relative left-2 ml-16  xl:ml-8 space-x-2 items-center  ">
                      <span>:</span>
                      <span className="text-black font-normal">ABC </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:space-x-4 items-center mt-2 w-full">
              <div className="lg:border-r-2 lg:pr-4 lg:w-9/12 xl:w-7/12">
                <h1 className="text-lg font-semibold">Previous Ordered Drug</h1>
                <CommonTable data={previousOrderDrugData} />
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  Previous Ordered Drug List
                </h1>
                <CommonTable data={previousOrderDrugListData} />
              </div>
            </div>
            <div className="">
              <form>
                <h1 className="text-lg font-semibold my-2"> Order Drug</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.drugName}
                      name="drugName"
                      placeholder="Drug Name*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.genericName}
                      name="genericName"
                      placeholder="Generic Name*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.form}
                      name="form"
                      placeholder="Form*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="dosage"
                      variant="outlined"
                      label="Dosage*"
                      error={errors.dosage}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  <div className="col-span-2 flex space-x-2 items-center text-sm whitespace-nowrap">
                    {/* Checkbox component */}
                    <CheckBoxField
                      control={control}
                      name="onceInWeekDrug"
                      label="Once In Week Drug"
                      placeholder="Once In Week Drug"
                    />
                    <CheckBoxField
                      control={control}
                      name="alternativeDayDrug"
                      label="Alternative Day Drug"
                      placeholder="Alternative Day Drug"
                    />
                    <CheckBoxField
                      control={control}
                      name="perHourDrug"
                      label="Per Hour Drug"
                      placeholder="Per Hour Drug"
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.frequency}
                      name="frequency"
                      placeholder="Frequency*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.duration}
                      name="duration"
                      placeholder="Duration*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.durationIn}
                      name="durationIn"
                      placeholder="Duration In*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="quantity"
                      variant="outlined"
                      label="Quantity*"
                      error={errors.quantity}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.route}
                      name="route"
                      placeholder="Route*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      error={errors.ivFlowRate}
                      name="ivFlowRate"
                      placeholder="Iv Flow Rate*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className=" w-full xl:col-span-2">
                    <DropdownField
                      control={control}
                      error={errors.instructions}
                      name="instructions"
                      placeholder="Instructions*"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className="w-full ">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Start Date"
                        name="startDate"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className="bg-white"
                            fullWidth
                            size="small"
                            {...params}
                            sx={{
                              svg: { color: "#0B83A5" },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2 lg:col-span-1 justify-end whitespace-nowrap lg:justify-start">
                    <CheckBoxField
                      control={control}
                      name="outsideMedicine"
                      label="Outside Medicine"
                      placeholder="Outside Medicine"
                    />
                    <AddButton />
                  </div>
                </div>
                <div>
                  <OrderdDrugDetailsTable
                    data={orderdDrugDetailsData}
                    displayView={displayView}
                  />
                </div>
                <div className="flex space-x-2 justify-end">
                  <CloseButton />
                  <SaveButton />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
