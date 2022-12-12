import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({ name, label, error, control, disabled }) => {
  return name !== "email" ? (
    <FormControl fullWidth size="small">
      <Controller
        render={({ field }) => (
          <TextField
            error={!!error?.message}
            variant="outlined"
            label={label}
            placeholder={label}
            name={name}
            fullWidth
            {...field}
            disabled={disabled}
            size="small"
            inputProps={{
              style: { textTransform: "capitalize" },
            }}
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
  ) : (
    <FormControl fullWidth size="small">
      <Controller
        render={({ field }) => (
          <TextField
            error={!!error?.message}
            variant="outlined"
            label={label}
            placeholder={label}
            name={name}
            fullWidth
            {...field}
            disabled={disabled}
            size="small"
            inputProps={{
              style: { textTransform: "lowercase" },
            }}
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
