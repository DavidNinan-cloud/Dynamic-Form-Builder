import React from "react";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDropdown = ({
  searchIcon,
  control,
  error,
  name,
  dataArray,
  inputRef,
  placeholder,
  label,
  handleInputChange,
  isDisabled,
}) => {
  return (
    <div className="  w-full">
      <div className="flex w-full space-x-2 items-center">
        <FormControl fullWidth>
          <Controller
            control={control}
            name={name}
            defaultValue={""}
            render={({ field }) => (
              <ReactSelect
                className="w-full"
                inputRef={inputRef}
                ref={null}
                {...field}
                options={dataArray}
                defaultValue={""}
                label={label}
                placeholder={placeholder}
                openMenuOnClick={false}
                isClearable={true}
                clearValue={true}
                isDisabled={isDisabled}
                // styles={styles}
                components={{
                  // Control,
                  DropdownIndicator: () =>
                    searchIcon ? (
                      <SearchIcon className=" mr-4 text-slate-500" />
                    ) : null,
                  IndicatorSeparator: () => null,
                }}
                onInputChange={handleInputChange}
              />
            )}
          />
          <FormHelperText style={{ color: "#d32f2f" }}>
            {error?.message}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};
export default SearchDropdown;
