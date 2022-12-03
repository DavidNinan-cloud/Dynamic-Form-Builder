import {
  Button,
  Modal,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Style } from "../../../../IPD/components/bedallowcation/Style";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CommonTable from "../../common/CommonTable";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
//imports from react hook form
import { Controller, useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonSelectRowTable from "../../common/CommonSelectRowTable";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import ShowButton from "../../../../Common Components/Buttons/ShowButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";

const data = {
  message: "Medication list found ",
  result: [
    {
      Id: 30,
      DateAndTime: "NEP",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 29,
      DateAndTime: "GER",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 28,
      DateAndTime: "AUS",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 16,
      DateAndTime: "JPN",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 1,
      DateAndTime: "IN",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 16,
      DateAndTime: "JPN",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
    {
      Id: 1,
      DateAndTime: "IN",
      "Added/UpdatedBy": "Nepal",
      "Added/UpdatedData": "Nepal",
    },
  ],
  statusCode: 200,

  count: 5,
};
const ServiceTableData = {
  message: "medication error list found ",
  result: [
    {
      Id: 30,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 29,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 28,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 16,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 17,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 18,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 19,
      ErrorTypes: "lorem ipsum",
    },
    {
      Id: 20,
      ErrorTypes: "lorem ipsum",
    },
  ],
  statusCode: 200,

  count: 5,
};

function MedicationErrorRepModal(props) {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const schema = yup.object().shape({
    service: yup
      .object()
      //   .required("Required")
      .nullable()
      .shape({
        label: yup.string().required("Please Select Service"),
        value: yup.string().required("Please Select Service"),
      }),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    service: "",

    active: true,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    console.log(data);
    // setOpenPost(true);
    // setFinalData(postedObj);
    //to set the form fields as blank
  };
  return (
    <div className=" backdrop-blur-0">
      <Modal
        open={props.open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="w-[90%] h-[85%] xl:h-[75%] px-4 pb-2">
          <div className="sticky top-0 bg-white z-50 w-full">
            <div className=" py-2">
              <div className="flex justify-between items-center w-full ">
                <div className="w-full">
                  <h1 className="font-semibold text-xl mt-1">
                    Medication Error Reporting
                  </h1>
                </div>
                <CancelPresentationIconButton
                  onClick={() => {
                    props.handleClose();
                  }}
                />
              </div>
              <div className="bg-gray-100 px-2 rounded-md  border border-gray-300 mt-2">
               <div className="grid grid-cols-2 lg:grid-cols-3 text-gray-500  text-sm items-center gap-1 w-full py-3">
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-12 lg:space-x-16">
                      <span>UHID</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">124584 </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-11 lg:space-x-4">
                      <span>Gender</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">Male </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-9">
                      <span>BedNo</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">9857 </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-1">
                      <span>PatientName </span>
                      <span className=""> :</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      Venkata Narasimha Rajuvaripet
                    </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-14 lg:space-x-10">
                      <span>Age</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      23 Year 02 Months 04 Days.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="w-full  mt-2">
            <div className="flex space-x-2 items-center">
              <div className="w-full border-r-2 pr-2">
                <div className="flex space-x-3 items-center ">
                  <div className="w-full">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Form Date"
                        name="fromDate"
                        value={fromDate}
                        onChange={(newValue) => {
                          setFromDate(newValue);
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
                  <div className="w-full">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="To Date"
                        name="toDate"
                        value={toDate}
                        onChange={(newValue) => {
                          setToDate(newValue);
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
                  <div>
                    <ShowButton />
                  </div>
                </div>
                <div>
                  <CommonTable data={data} />
                </div>
              </div>
              <div className="w-full">
                <div className="flex space-x-3 items-center">
                  <DropdownField
                    control={control}
                    error={errors.service}
                    name="service"
                    label="Service"
                    //   dataArray={reffCounsltant}
                    isSearchable={false}
                    placeholder="Service"
                    isClearable={false}
                  />
                  <ShowButton />
                </div>

                <div>
                  <CommonSelectRowTable data={ServiceTableData} />
                </div>
              </div>
            </div>
            <div>
              <TextField label="Remarks" fullWidth size="small" />
            </div>
            <div className="mt-2 flex justify-end w-full space-x-2">
              <ResetButton />
              <SaveButton />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default MedicationErrorRepModal;
