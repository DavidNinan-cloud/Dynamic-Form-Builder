import React, { useState } from "react";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Import FormFields
import InputField from "../../../../../Common Components/FormFields/InputField";
// import CheckBoxField from '../../FormFields/CheckBoxField';
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";

const EmployeePosition = (props) => {
  const [val, setVal] = useState();
  const {
    employeeDesignations,
    drChrgAmt,
    empType,
    qualifications,
    passoutYears,
    joinDateIs,
    setJoinDateIs,
  } = props;
  const {
    trigger,
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // dda
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationInfo",
  });

  let degreeDetails;
  // , collegeDetails, percentageDetails;

  let eduDetails = watch("educationInfo");

  // eduDetails.map((item) => {
  //   degreeDetails = item.collegeName;
  //   // collegeDetails = item.college;
  //   // percentageDetails = item.percentage;
  // });
  return (
    <div className="mb-1">
      <Grid container className="flex">
        {/* Education */}
        {fields.map((item, index) => (
          <Grid
            item
            lg={12}
            sm={12}
            key={index}
            sx={{ marginBottom: "0.5rem" }}
          >
            <Grid container spacing={1}>
              <Grid item lg={4} sm={4}>
                <DropdownField
                  control={control}
                  error={errors.educationInfo?.[index]?.qualification}
                  name={`educationInfo[${index}].qualification`}
                  label="Qualification *"
                  dataArray={qualifications}
                  placeholder="Qualification *"
                  isSearchable={true}
                />
              </Grid>
              {/* Passing Year */}
              <Grid item lg={3.5} sm={3.5}>
                <InputField
                  name={`educationInfo[${index}].passingYear`}
                  variant="outlined"
                  label="Passout Year *"
                  error={errors.educationInfo?.[index]?.passingYear}
                  control={control}
                  inputRef={{
                    ...register(`educationInfo[${index}].passingYear`, {
                      onChange: (e) => {
                        setVal(e);
                      },
                    }),
                  }}
                />
              </Grid>
              <Grid item lg={3.3} sm={3.3}>
                {/* ///collegeName/// */}
                <InputField
                  name={`educationInfo[${index}].collegeName`}
                  variant="outlined"
                  label="College *"
                  error={errors.educationInfo?.[index]?.collegeName}
                  control={control}
                  inputRef={{
                    ...register(`educationInfo[${index}].collegeName`, {
                      onChange: (e) => {
                        setVal(e);
                      },
                    }),
                  }}
                />
              </Grid>

              <Grid item lg={1.2} sm={1.2}>
                <div className="flex">
                  {fields.length !== 1 && (
                    <RemoveOutlinedIcon
                      className="mt-2 rounded-full border-2 border-red-600"
                      onClick={() => remove(index)}
                    />
                  )}
                  {fields.length - 1 === index && (
                    <AddOutlinedIcon
                      className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                      onClick={(index) => {
                        console.log(
                          "educationInfo error",
                          !errors.educationInfo
                        );
                        eduDetails.map((item) => {
                          degreeDetails = item.collegeName;
                        });
                        if (
                          degreeDetails !== "" && !errors.educationInfo
                          // !errors.educationInfo
                        ) {
                          append({
                            collegeName: "",
                            qualification: "",
                            passingYear: "",
                          });
                        } else {
                          trigger("educationInfo");
                        }
                      }}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div className="font-bold tracking-wide my-2">Experience</div>
      <Grid container spacing={1}>
        {/* Employee Designation */}
        <Grid item lg={4} sm={4}>
          <DropdownField
            control={control}
            error={errors.designation}
            name="designation"
            dataArray={employeeDesignations}
            placeholder="Employee Designation "
            isSearchable={false}
            isClearable={false}
          />
        </Grid>
        {/* Employee Experience */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="experience"
            variant="outlined"
            label="Experience In Years "
            error={errors.experience}
            control={control}
          />
        </Grid>
        {/* Joining Date */}
        <Grid item lg={4} sm={4}>
          {/*  */}
          <FormControl
            sx={
              {
                // width: "19%",
              }
            }
            fullWidth
            size="small"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                maxDate={new Date()}
                label="Joining Date *"
                value={joinDateIs}
                onChange={(value) => {
                  setJoinDateIs(value);
                }}
                renderInput={(props) => <TextField {...props} size="small" />}
                name="employeeJoiningDate"
                defaultValue=""
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>

            <FormHelperText style={{ color: "#d32f2f" }}>
              {errors.employeeJoiningDate?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        {empType ? (
          <>
            {/* Duration of Appt Slot */}
            {drChrgAmt ? (
              <Grid item lg={4} sm={4}>
                {/* <DropdownField 
                  control={control} 
                  error={errors.employeeTimeSlot}
                  name="employeeTimeSlot" 
                  label="Appointment Slot in Mins" 
                  dataArray={employeeDesignations}
                  placeholder="Appointment Slot in Mins"
                  isSearchable={false}
                  isClearable={false}
                  /> */}
                <InputField
                  // disabled={true}
                  name="employeeTimeSlot"
                  label="Appointment Slot in Mins "
                  error={errors.employeeTimeSlot}
                  control={control}
                />
              </Grid>
            ) : (
              ""
            )}
            {/* Registration No */}
            <Grid item lg={4} sm={4}>
              <InputField
                // disabled={true}
                name="registrationNo"
                label="Registration Number "
                //  error={errors.registrationNo}
                control={control}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
      {drChrgAmt ? (
        <>
          <div className="font-bold tracking-wide my-2">
            Consultation Charges
          </div>
          <Grid container spacing={1}>
            {/* Consultation AMT */}
            <Grid item lg={4} sm={4}>
              <InputField
                type="number"
                inputProps={{ min: 0, pattern: "[0-9]*", step: "any" }}
                name="consultationAmount"
                label="Consultation Amount "
                error={errors.consultationAmount}
                control={control}
              />
            </Grid>
            {/* Follow Up AMT */}
            <Grid item lg={4} sm={4}>
              <InputField
                type="number"
                name="followUpAmount"
                inputProps={{ min: 0, pattern: "[0-9]*", step: "any" }}
                label="Follow Up Amount "
                error={errors.followUpAmount}
                control={control}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeePosition;
