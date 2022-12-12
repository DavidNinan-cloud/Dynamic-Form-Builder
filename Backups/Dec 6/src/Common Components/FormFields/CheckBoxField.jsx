import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import { Controller } from "react-hook-form";
import { fontSize, fontWeight } from "@mui/system";
const CheckBoxField = ({
  name,
  label,
  control,
  defaultValue,
  style,
  checkBoxStyle,
}) => {
  return (
    <FormControlLabel
      control={
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          render={({ field: { value = false, ...field } }) => {
            return (
              <Checkbox
                size="medium"
                {...field}
                checked={!!value}
                sx={{ "& .MuiSvgIcon-root": checkBoxStyle }}
              />
            );
          }}
        />
      }
      label={<span className="text-sm" style={style}>{label}</span>}
    />
  );
};

export default CheckBoxField;
