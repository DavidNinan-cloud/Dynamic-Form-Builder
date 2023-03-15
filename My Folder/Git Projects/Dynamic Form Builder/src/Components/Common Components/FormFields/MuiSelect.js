import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
  InputAdornment,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const MuiSelect = (props) => {
  const { options, label, name, control } = props;
  return (
    <div className="w-full">
      <FormControl fullWidth size="small">
        <InputLabel size="small" id="demo-simple-select-label">
          {label}
        </InputLabel>
        <Controller
          control={control}
          defaultValue={null}
          name={name}
          render={({ field: { ref, ...field } }) => {
            return (
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={label}
                size="small"
              >
                {options.map((item) => {
                  return <MenuItem value={item.value}>{item.label}</MenuItem>;
                })}
              </Select>
            );
          }}
        />
      </FormControl>
    </div>
  );
};

export default MuiSelect;
