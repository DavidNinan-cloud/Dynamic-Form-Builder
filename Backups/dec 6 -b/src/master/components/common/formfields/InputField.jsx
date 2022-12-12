import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({ disabled, inputRef, name, label, error, control, inputProps, }) => {
  return (
    <FormControl fullWidth size="small">
      <Controller
        render={({ field }) => (
          <TextField
            inputProps={inputProps}
            disabled={disabled}
            inputRef={inputRef}
            error={!!error?.message}
            variant="outlined"
            label={label}
            autoCapitalize="none"
            placeholder={label}
            name={name}
            fullWidth
            {...field}
            size="small"
          />
        )}
        name={name}
        control={control}
        defaultValue=""
      />
      <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default InputField;
