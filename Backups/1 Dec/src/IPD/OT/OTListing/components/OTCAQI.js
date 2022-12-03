import React from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddButton } from "../../../../Common Components/Buttons/CommonButtons";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import SurgeryTable from "../../OTBooking/SurgeryTable";
import { useEffect } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OTCAQITable from "../common/OTCAQITable";

const OTCheckListData = {
  message: "Special Instruction list found",
  result: [
    {
      "Check List": "Review PAC Done",
    },
    {
      "Check List": "The anesthesia plan modified to.",
    },
    {
      "Check List": "Anesthesia-related mortality.",
    },
    {
      "Check List": "Unplanned ventilation post-anesthesia.",
    },
    {
      "Check List": "Adverse anaesthesia events.",
    },
    {
      "Check List": "Intra-operative change in surgical plan",
    },
    {
      "Check List": "Surgery rescheduled",
    },
    {
      "Check List": "Return to OT",
    },
    {
      "Check List": "Re-exploration",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const OTCAQI = () => {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  return (
    <div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-2">
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Surgeon Arrival Time:
          </p>
          <div>
            <Controller
              control={control}
              name="surgeonArrivalTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.surgeonArrivalTime}
                        helperText={errors.surgeonArrivalTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Anesthetist Arrival Time :
          </p>
          <div>
            <Controller
              control={control}
              name="anesthetistArrivalTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.anesthetistArrivalTime}
                        helperText={errors.anesthetistArrivalTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Patient Arrival Time :
          </p>
          <div>
            <Controller
              control={control}
              name="patientArrivalTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.patientArrivalTime}
                        helperText={errors.patientArrivalTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Time of Administration of Anaesthesia:
          </p>
          <div>
            <Controller
              control={control}
              name="ADMAnesthesiaTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.ADMAnesthesiaTime}
                        helperText={errors.ADMAnesthesiaTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">Wheel In:</p>
          <div>
            <Controller
              control={control}
              name="wheelInTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.wheelInTime}
                        helperText={errors.wheelInTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">Wheel Out:</p>
          <div>
            <Controller
              control={control}
              name="wheelOutTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.wheelOutTime}
                        helperText={errors.wheelOutTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            OT Cleaning Start Time:
          </p>
          <div>
            <Controller
              control={control}
              name="OTCleanStartTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.OTCleanStartTime}
                        helperText={errors.OTCleanStartTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            OT Cleaning End Time:
          </p>
          <div>
            <Controller
              control={control}
              name="OTCleanEndTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.OTCleanEndTime}
                        helperText={errors.OTCleanEndTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Surgical Safety Check List Read By:
          </p>
          <div className="w-full">
            <Controller
              control={control}
              name="staffName"
              render={({ field }) => (
                <DropdownField
                  name="staffName"
                  placeholder="Staff Name*"
                  control={control}
                  // error={errors.staffName}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 gap-4 w-full my-2">
        <fieldset className="border border-gray-300 rounded p-2">
          <legend className="font-semibold px-2">
            Antibiotic given at Time (in ward)
          </legend>
          <form className="flex gap-4 grid-cols-3">
            <SearchBar
              className="col-span-2"
              name="searchAntibiotic"
              placeholder="Search Antibiotic"
              searchIcon={true}
            />
           <Controller
              control={control}
              name="antibioticInWardTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.antibioticInWardTime}
                        helperText={errors.antibioticInWardTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </form>
        </fieldset>
        <fieldset className="border border-gray-300 rounded p-2">
          <legend className="font-semibold px-2">
            Antibiotic given at Time (in OT)
          </legend>
          <form className="flex gap-4 grid-cols-3">
            <SearchBar
              className="col-span-2"
              name="searchAntibiotic"
              placeholder="Search Antibiotic"
              searchIcon={true}
            />
           <Controller
              control={control}
              name="antibioticInOtTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.antibioticInOtTime}
                        helperText={errors.antibioticInOtTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </form>
        </fieldset>
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold w-full">
            Time Patient Shifted from Recovery to Wards:
          </p>
          <div>
          <Controller
              control={control}
              name="patientShiftTime"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={errors.patientShiftTime}
                        helperText={errors.patientShiftTime?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div>
          <InputField name="reason" label="Reason For Delay" />
        </div>
      </div>
      <div>
        <OTCAQITable data={OTCheckListData} />
      </div>
    </div>
  );
};

export default OTCAQI;
