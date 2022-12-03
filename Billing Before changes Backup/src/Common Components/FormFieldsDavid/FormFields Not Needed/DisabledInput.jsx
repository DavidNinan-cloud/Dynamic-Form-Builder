import React from "react";
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Controller } from "react-hook-form";

const DisabledInput = ({
  disabled,
  value,
  name,
  label,
  error,
  control
}) => {
  return (

    <FormControl   
    fullWidth
    size="small" >
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
    value={value}
    disabled={disabled}
    size="small" 
/>
)}
name={name}
control={control}
// defaultValue={value}
/>
<FormHelperText style={{color:'#d32f2f'}}>
{error?.message}</FormHelperText>

</FormControl>
  );
};


export default DisabledInput;