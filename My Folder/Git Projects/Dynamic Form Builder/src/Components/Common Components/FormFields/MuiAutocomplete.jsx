import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MuiAutocomplete = (props) => {
  const {
    options,
    label,
    isDisabled,
    handleInputChange,
    name,
    control,
    disabled,
    defaultValue,
  } = props;
  return (
    <div className="w-full">
      <Controller
        render={({ field, value }) => (
          <Autocomplete
            {...field}
            options={options}
            sx={{
              width: "100%",
              "& .MuiAutocomplete-popupIndicator": { transform: "none" },
            }}
            size="small"
            popupIcon={<SearchIcon />}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                size="small"
              />
            )}
            getOptionLabel={(option) => (option.label ? option.label : "")}
            disabled={disabled ? disabled : false}
            onChange={(_, data) => field.onChange(data)}
            // onInputChange={(event, newInputValue) => {
            //   console.log("newInputValue", newInputValue);
            //    handleInputChangeHandlerTechnician(newInputValue);
            // }}

            onInputChange={(_, data) => {
              if (data !== " ") {
                console.log("data", data);
                handleInputChange(data);
              }
            }}
            value={field.value}
          />
        )}
        name={name}
        control={control}
      />
    </div>
  );
};

export default MuiAutocomplete;
