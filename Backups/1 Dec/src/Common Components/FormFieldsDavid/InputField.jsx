import React from "react";
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Controller } from "react-hook-form";

const InputField = ({ variant, defaultValue, inputProps, type, disabled,
    inputRef,
    name,
    label,
    error,
    control
  }) => {
  return (

    <FormControl   
      fullWidth
      size="small"
      >
        <Controller
            render={({ field }) => (
              <TextField
                  inputRef={inputRef}
                  ref={null}
                  inputProps={inputProps}
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
            <FormHelperText style={{color:'#d32f2f'}}>
              {error?.message}
            </FormHelperText>
    </FormControl>
  );
};


export default InputField;