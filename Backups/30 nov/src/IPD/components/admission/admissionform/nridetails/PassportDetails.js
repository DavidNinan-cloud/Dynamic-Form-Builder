import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../../../../../Common Components/FormFields/InputField";

const PassportDetails = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openValidDate, setOpenValidDate] = useState(false);

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
      <div className="grid grid-cols-4 gap-3">
        {/* //Passport No // */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="passportNumber"
            variant="outlined"
            label="Passport No."
            error={errors.passportNumber}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        {/* //Place of Issue // */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="placeOfIssue"
            variant="outlined"
            label="Place Of Issue"
            error={errors.placeOfIssue}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Date of Issue// */}
        <div className="col-span-2 lg:col-span-1">
          <Controller
            control={control}
            defaultValue={new Date()}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={openDate}
                  onOpen={() => setOpenDate(true)}
                  onClose={() => setOpenDate(false)}
                  inputProps={{ readOnly: true }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      type="date"
                      variant="outlined"
                      label="Date of Issue"
                      name="dateOfIssue"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      onClick={(e) => setOpenDate(true)}
                    />
                  )}
                  inputFormat="dd/MM/yyyy"
                  disableFuture
                  {...field}
                  onAccept={(e) => {
                    // getNewRegDate(e);
                  }}
                  error={Boolean(errors.dateOfIssue)}
                  helperText={errors.dateOfIssue?.message}
                />
              </LocalizationProvider>
            )}
            name="dateOfIssue"
          />
        </div>

        {/* //Valid Till// */}
        <div className="col-span-2 lg:col-span-1">
          <Controller
            control={control}
            defaultValue={new Date()}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={openValidDate}
                  onOpen={() => setOpenValidDate(true)}
                  onClose={() => setOpenValidDate(false)}
                  inputProps={{ readOnly: true }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      type="date"
                      variant="outlined"
                      label="Valid Till"
                      name="validTill"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      onClick={(e) => setOpenValidDate(true)}
                    />
                  )}
                  inputFormat="dd/MM/yyyy"
                  disablePast
                  {...field}
                  onAccept={(e) => {
                    // getNewRegDate(e);
                  }}
                  error={Boolean(errors.validTill)}
                  helperText={errors.validTill?.message}
                />
              </LocalizationProvider>
            )}
            name="validTill"
          />
        </div>
      </div>
    </div>
  );
};

export default PassportDetails;
