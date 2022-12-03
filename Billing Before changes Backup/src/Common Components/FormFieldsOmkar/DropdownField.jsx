import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import ReactSelect, { components } from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const DropdownField = ({
  inputRef,
  isSearchable,
  control,
  error,
  dataArray,
  name,
  label,
  placeholder,
  isClearable,
  onInputChange,
  defaultValue,
}) => {
  let isError = !!error?.message;
  let color = "#DEEBFF";

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
  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ReactSelect
            inputRef={inputRef}
            {...field}
            ref={null}
            options={dataArray}
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={placeholder}
            defaultValue={defaultValue}
            styles={selectStyles}
            menuPlacement="auto"
            menuShouldBlockScroll={false}
            onInputChange={onInputChange}
            components={{
              DropdownIndicator: () =>
                isSearchable ? (
                  <SearchIcon className="mx-2 text-slate-100" />
                ) : (
                  <KeyboardArrowDownIcon className="mx-2 text-slate-100" />
                ),
              ValueContainer: CustomValueContainer,
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

export default DropdownField;
