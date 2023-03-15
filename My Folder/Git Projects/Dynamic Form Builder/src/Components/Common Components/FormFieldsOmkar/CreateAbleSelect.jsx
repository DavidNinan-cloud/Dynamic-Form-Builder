import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import CreatableSelect, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select/creatable";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const CreateAbleSelect = ({
  inputRef,
  control,
  error,
  dataArray,
  name,
  label,
  isSearchable,
  placeholder,
  onInputChange,
}) => {
  // const handleCreate = (e) => {
  //   let newObject = {
  //     id: dataArray.length + 1,
  //     value: dataArray.length + 1,
  //     label: e,
  //   };
  //   dataArray.push(newObject);
  // };

  const selectStyles = {
    menu: (styles) => ({
      ...styles,
      position: "absolute",
      boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      zIndex: 20,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "24px",
    }),
  };
  return (
    <FormControl fullWidth size="small" className="w-48">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CreatableSelect
            inputRef={inputRef}
            {...field}
            ref={null}
            options={dataArray}
            label={label}
            styles={selectStyles}
            isClearable
            placeholder={placeholder}
            onInputChange={onInputChange}
            // onCreateOption={handleCreate}
            menuPlacement="auto"
            menuShouldBlockScroll={false}
            components={{
              DropdownIndicator: () =>
                isSearchable ? (
                  <SearchIcon className="mx-2 text-slate-100" />
                ) : (
                  <KeyboardArrowDownIcon className="mx-2 text-slate-100" />
                ),
            }}
          />
        )}
      />
      <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default CreateAbleSelect;
