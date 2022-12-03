import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

// Import FormFields
import InputField from "../../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { getBanksDropDown } from "../../services/EmployeeMaster/EmployeeMasterServices";
const EmployeeDocuments = () => {
  const {
    setValue,
    register, 
    control,
    formState: { errors },
  } = useFormContext();

  const [banks, setBanks] = useState();

  useEffect(() => {
    getBanksDropDown()
      .then((response) => response.data)
      .then((res) => {
        setBanks(res.result);
      });
  }, []);
  return (
    <div className="mb-1">
      <Grid container spacing={1}>
        {/* Adhaar No */}
        <Grid item lg={4} sm={4}>
          <InputField
            type="number"
            name="aadharNo"
            variant="outlined"
            label="Aadhar Number *"
            error={errors.aadharNo}
            control={control}
          />
        </Grid>
        {/* Pan No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="panNo"
            variant="outlined"
            label="Pan Card Number *"
            error={errors.panNo}
            control={control}
          />
        </Grid>
        {/* UAN No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="employeeUAN"
            variant="outlined"
            label="UAN Number"
            error={errors.employeeUAN}
            control={control}
            inputRef={{
              ...register("employeeUAN", {
                onChange: (e) => {
                  if(e.target.value == ""){
                  setValue("employeeUAN",null );}
                },
              }),
            }}
          />
        </Grid>
        {/* PF No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="employeePfNo"
            variant="outlined"
            label="Employee PF Number"
            error={errors.employeePfNo}
            inputRef={{
              ...register("employeePfNo", {
                onChange: (e) => {
                  if(e.target.value == ""){
                  setValue("employeePfNo",null );}
                },
              }),
            }}
            control={control}
          />
        </Grid>
        {/* Driver Licence No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="employeeDriverLicenceNo"
            variant="outlined"
            label="Driving Licence"
            error={errors.employeeDriverLicenceNo}
            control={control}
            inputRef={{
              ...register("employeeDriverLicenceNo", {
                onChange: (e) => {
                  if(e.target.value == ""){
                  setValue("employeeDriverLicenceNo",null );}
                },
              }),
            }}
          />
        </Grid>
        {/* Passport No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="employeePassportNo"
            variant="outlined"
            label="Passport Number"
            error={errors.employeePassportNo}
            control={control}
            inputRef={{
              ...register("employeePassportNo", {
                onChange: (e) => {
                  if(e.target.value == ""){
                  setValue("employeePassportNo",null );}
                },
              }),
            }}
          />
        </Grid>
        {/* Bank Name */}
        <Grid item lg={4} sm={4}>
          <DropdownField
            control={control}
            error={errors.bank}
            name="bank"
            dataArray={banks}
            placeholder="Bank Name "
            isSearchable={true}
            isClearable={false}
          />
        </Grid>
        {/* ifsCode */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="ifsCode"
            variant="outlined"
            label="IFSC Code "
            error={errors.ifsCode}
            control={control}
          />
        </Grid>
        {/* Bank Account No */}
        <Grid item lg={4} sm={4}>
          <InputField
            name="accountNo"
            variant="outlined"
            label="Bank Account Number "
            error={errors.accountNo}
            control={control}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDocuments;
