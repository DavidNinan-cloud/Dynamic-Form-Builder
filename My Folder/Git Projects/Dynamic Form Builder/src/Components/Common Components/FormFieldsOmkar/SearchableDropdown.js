import React from "react";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  searchIcon,
  control,
  error,
  name,
  dataArray,
  inputRef,
  placeholder,
  isSearchable,
  label,
  handleInputChange,
}) => {
  let isError = !!error?.message;
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
    option: (provided, { isDisabled, isFocused, isSelected }) => ({
      ...provided,
      whiteSpace: "nowrap",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "rgba(222,235,255,1)"
        : isFocused
        ? "rgba(222,235,255,0.5)"
        : undefined,

      color: isDisabled
        ? undefined
        : isSelected
        ? "#000000"
        : isFocused
        ? "#000000"
        : undefined,
    }),
    control: (Colstyles, state) => ({
      ...Colstyles,
      borderRadius: "6px",
      border: isError
        ? state.isSelected
          ? "1px solid #DEEBFF"
          : state.isFocused
          ? "1px solid #DEEBFF"
          : state.hasValue || state.selectProps.inputValue
          ? "1px solid #d32f2f"
          : ""
        : state.hasValue || state.selectProps.inputValue
        ? ""
        : "",
    }),
    singleValue: (Singstyles) => ({
      ...Singstyles,
      // zIndex: 10
      // position: "static", or "relative"  //if u want the div size to change
      // position: "absolute",
      // boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      // borderRadius: "6px",
      // borderBottom: '2px dotted pink',

      // backgroundColor:"red"
    }),
    indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),
    container: (provided, state) => ({
      ...provided,
      marginTop: 2,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      overflow: "visible",
      paddingLeft: state.hasValue || state.selectProps.inputValue ? 8 : 7,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      position: "absolute",
      color:
        state.menuIsOpen || state.selectProps.menuIsOpen
          ? "#1976D2"
          : "#636e72",
      fontSize:
        (state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue) &&
        12,
      transition: "top 0.1s, font-size 0.1s",

      top: isSearchable
        ? state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue
          ? -12
          : 2
        : state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue
        ? -15
        : "0%",

      paddingLeft:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",
      paddingRight:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",
      backgroundColor:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? "white"
          : "",
      zIndex:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 10
          : "",
      fontStyle: "normal",
    }),
  };
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
                styles={selectStyles}
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
export default SearchBar;
