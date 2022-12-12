import React from 'react'
import {
  Checkbox,
  FormControlLabel
} from "@mui/material";

import { Controller } from 'react-hook-form'
const CheckBoxField = ({ name, label, control}) => {
  return (
    <FormControlLabel
      control={
            <Controller
              name={name}
              control={control}
              render={({ field:{ value=false, ...field }}) =>{
                return < Checkbox size='small' {...field} checked={!!value} />;
              }}
              />
        }
        label={label}
      />
  )
}

export default CheckBoxField