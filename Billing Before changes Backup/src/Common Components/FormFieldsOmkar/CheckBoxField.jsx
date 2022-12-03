import React from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

import { Controller } from "react-hook-form";
const CheckBoxField = ({defaultChecked, name, label, placeholder, control }) => {
  return (
    <FormControl>
      <Controller
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox 
              defaultChecked={defaultChecked}
            />}
            {...field}
            type="checkbox"
            label={label}
            placeholder={placeholder}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            className="w-full items-center pl-20 md:pl-0 text-gray-800 font-semibold tracking-wider mr-2"
          />
        )}
        name={name}
        control={control}
        defaultValue=""
      />
    </FormControl>
  );
};

export default CheckBoxField;
