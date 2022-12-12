import React from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

import { Controller } from "react-hook-form";
import { fontSize, fontWeight } from "@mui/system";
const ControlledCheckBoxField = ({
  value,
  onChange,
  name,
  label,
  control,
  defaultValue,
  style,
  checkBoxStyle,
}) => {
  return (
    <>
      <FormControl>
        <Controller
          render={({ field }) => (
            <FormControlLabel
              label={<span className="text-sm xl:text-base">{label}</span>}
              control={
                <Checkbox
                  checked={value}
                  defaultChecked={defaultValue}
                  onChange={(e) => {
                    let value = e.target.checked;
                    onChange(value);
                  }}
                />
              }
              {...field}
              type="checkbox"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              className="w-full items-center text-gray-800 font-bold tracking-wider "
            />
          )}
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </FormControl>
    </>
  );
};

export default ControlledCheckBoxField;
