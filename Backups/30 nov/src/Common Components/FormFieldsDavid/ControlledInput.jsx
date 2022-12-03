import React from "react";
import { FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material'
import { Controller } from "react-hook-form";

const ControlledInput = ({value,
    onChange, variant,  inputProps, type, disabled,
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
                  // onChange={ e =>{console.log(e)}}
                  value="443"
                  variant="filled"
                //   ref={null}
                  inputProps={inputProps}
                  type={type}
                  disabled={disabled}
                  inputRef={inputRef}
                  error={!!error?.message}
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
          />
            <FormHelperText style={{color:'#d32f2f'}}>
              {error?.message}
            </FormHelperText>
    </FormControl>
  );
};


export default ControlledInput;