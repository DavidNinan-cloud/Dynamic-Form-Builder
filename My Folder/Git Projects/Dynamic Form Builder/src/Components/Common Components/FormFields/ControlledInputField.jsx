import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledInputField = ({
  value,
  sx,
  variant,
  defaultValue,
  inputProps,
  type,
  disabled,
  inputRef,
  name,
  label,
  error,
  control,
  dontCapitalize,
}) => {

  return (
    <FormControl fullWidth size="small" sx={sx}>
      <Controller
        render={({ field }) => (
          <TextField
            value={value} 
            inputRef={inputRef}
            ref={null}
            inputProps={
              dontCapitalize
                ? inputProps
                : (inputProps, { style: { textTransform: "capitalize" } })
            }
            type={type}
            disabled={disabled}
            error={!!error?.message}
            variant={variant}
            label={label}
            placeholder={label}
            name={name}
            fullWidth
            {...field}
            size="small"
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {/* <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText> */}
    </FormControl>
  );
};

export default ControlledInputField;
