import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Card,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import ReactSelect from "react-select";

const SearchableSelect = ({ control, error, options, name, label }) => {
  const handleChange = (option) => {
    console.log(option);
  };
  return (
    <FormControl fullWidth size="small" className="w-48">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactSelect
            {...field}
            ref={null}
            options={options}
            label={label}
            isClearable={true}
            placeholder={placeholder}
            onChange={(option) => handleChange(option)}
          />
        )}
      />
      <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default SearchableSelect;
