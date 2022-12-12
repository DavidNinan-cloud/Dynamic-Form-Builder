import React from "react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

const OTDetails = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
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
    <>
      <form>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          <div className="flex gap-2">
            <div>
              <Controller
                control={control}
                name="startTime"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Start Time"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          error={errors.startTime}
                          helperText={errors.startTime?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="endTime"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="End Time"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          error={errors.endTime}
                          helperText={errors.endTime?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Controller
                control={control}
                name="totalTime"
                render={({ field }) => (
                  <InputField
                    name="totalTime"
                    label="Total Time"
                    control={control}
                  />
                )}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox/>}
                name="emergency"
                label="Emergency"
              />
            </div>
          </div>
          <div>
            <Controller
              control={control}
              name="theater"
              render={({ field }) => (
                <DropdownField
                  name="theater"
                  placeholder="Theater*"
                  control={control}
                  error={errors.theater}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="otTable"
              render={({ field }) => (
                <DropdownField
                  name="otTable"
                  placeholder="OT Table"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="anesthesiaType"
              render={({ field }) => (
                <DropdownField
                  name="anesthesiaType"
                  placeholder="Anesthesia Type"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="procedureType"
              render={({ field }) => (
                <DropdownField
                  name="procedureType"
                  placeholder="Procedure Type"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="otStatus"
              render={({ field }) => (
                <DropdownField
                  name="otStatus"
                  placeholder="OT Status"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="otResult"
              render={({ field }) => (
                <DropdownField
                  name="otResult"
                  placeholder="OT Result"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="otType"
              render={({ field }) => (
                <DropdownField
                  name="otType"
                  placeholder="OT Type*"
                  control={control}
                  error={errors.otType}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="otCategory"
              render={({ field }) => (
                <DropdownField
                  name="otCategory"
                  placeholder="OT Category*"
                  control={control}
                  error={errors.otCategory}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="nurse"
              render={({ field }) => (
                <DropdownField
                  name="nurse"
                  placeholder="Nurse"
                  control={control}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="physician"
              render={({ field }) => (
                <DropdownField
                  name="physician"
                  placeholder="Physician"
                  control={control}
                />
              )}
            />
          </div>
          <div className="col-span-2 xl:col-span-3">
            <Controller
              control={control}
              name="remark"
              render={({ field }) => (
                <InputField name="remark" label="Remark" control={control} />
              )}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default OTDetails;
