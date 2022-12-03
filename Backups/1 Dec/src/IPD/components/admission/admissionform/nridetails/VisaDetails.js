import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../../../../../Common Components/FormFields/InputField";
import { getSystemDate } from "../../../../services/personaldetails/personalDetailsServices";

const VisaDetails = () => {
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

  //API to get System date for Registration date
  // useEffect(() => {
  //   getSystemDate()
  //     .then((response) => {
  //       // console.log(response.data.result);
  //       // setRegDate(response.data.result);
  //       let fullYear = response.data.result;
  //       let year = fullYear.substring(0, 4);
  //       let month = fullYear.substring(5, 7);
  //       let day = fullYear.substring(8, 10);
  //       setValue("dateOfVisaIssue", new Date(year, month, day), {
  //         shouldValidate: true,
  //       });
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // }, []);
  let fullVisaIssueDate;
  const getVisaIssueDate = (e) => {
    let regYear = e.getFullYear();
    let regMonth = String(e.getMonth() + 1).padStart(2, "0");
    let regDay = String(e.getDate()).padStart(2, "0");
    fullVisaIssueDate = [regYear, regMonth, regDay].join("-");
    setValue("dateOfVisaIssue", fullVisaIssueDate, { shouldValidate: true });
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {/* //Passport No // */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="visaNumber"
            variant="outlined"
            label="Visa No."
            error={errors.visaNumber}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        {/* //Place of Issue // */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="placeOfVisaIssue"
            variant="outlined"
            label="Place Of Issue"
            error={errors.placeOfVisaIssue}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Date of Issue// */}
        <div className="col-span-2 lg:col-span-1">
          <Controller
            control={control}
            // defaultValue={new Date()}
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
                      name="dateOfVisaIssue"
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
                    getVisaIssueDate(e);
                  }}
                  error={Boolean(errors.dateOfVisaIssue)}
                  helperText={errors.dateOfVisaIssue?.message}
                />
              </LocalizationProvider>
            )}
            name="dateOfVisaIssue"
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
                      name="validVisaTill"
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
            name="validVisaTill"
          />
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;
