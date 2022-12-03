import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useFileUpload from "../common component/hooks/useFileUpload";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InputField from "../../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { getIncome } from "../../../../services/personaldetails/personalDetailsServices";

const IncomeInfo = (props) => {
  const [incomeRange, setIncomeRange] = useState();

  const fileData = useFileUpload();

  const { incomeFile, setIncomeFile, setIncomeFileName } = props;
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  const handleIncomeFile = (target) => {
    const result = fileData.onProfilePicChange(target);
  };

  const incomeRangeValue = watch("incomeRange");

  useEffect(() => {
    setIncomeFile(fileData.path);
    setIncomeFileName(fileData.fileName);
  }, [fileData]);

  //Reset Identification No. on Chnage of Doc Type
  const handleResetOnChange = (changeField) => {
    console.log(changeField);

    setValue("incomeDocName", null);
  };

  useEffect(() => {
    getIncome()
      .then((response) => {
        console.log("Income", response);
        setIncomeRange(response.data.result);
      })
      .catch((response) => {
        console.log("Error", response);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-3">
        {/* //Indentification Doc// */}
        <div className="">
          <DropdownField
            control={control}
            error={errors.income}
            name="income"
            label="Income Range"
            dataArray={incomeRange}
            // isSearchable={false}
            isClearable={false}
            placeholder="Income Range"
            // inputRef={{
            //   ...register("incomeRange", {
            //     onChange: (e) => {
            //       handleResetOnChange(e.target.name);
            //     },
            //   }),
            // }}
          />
        </div>

        {/* //Indentification No. */}
        <div className="">
          <InputField
            name="incomeDocument"
            variant="outlined"
            label="Income Document"
            error={errors.incomeDocument}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Indentification File// */}
        <div className="">
          <div className=" border border-slate-400  py-1.5 rounded-md">
            <label
              htmlFor="incomeFile"
              className="cursor-pointer text-slate-600 "
            >
              <div className="w-full">
                <FileUploadOutlinedIcon />
                Upload Document
              </div>
              <Controller
                control={control}
                defaultValue={incomeFile}
                render={({ field }) => (
                  <TextField
                    id="incomeFile"
                    variant="outlined"
                    fullWidth
                    type="file"
                    name="incomeFile"
                    size="small"
                    {...field}
                    onChange={(e) => {
                      console.log(e);
                      field.onChange(e);
                      handleIncomeFile(e);
                    }}
                    error={Boolean(errors.incomeFile)}
                    helperText={errors.incomeFile?.message}
                    sx={{ display: "none" }}
                  />
                )}
                name="incomeFile"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeInfo;
