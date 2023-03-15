import React, { useRef } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Value = styled.div`
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  margin: 0 0.55rem 0.55rem 0;
  font-size: 0.75rem;
  color: black;
  background-color: lightGray;
  user-select: none;
`;

const XButton = styled.button`
  all: unset;
  margin-left: 0.5rem;
  color: black;

  transition: fill 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    color: black;
  }
  &:focus {
    color: black;
  }
`;

const OptionsOutsideSelect = (props) => {
  const {
    isMulti,
    value,
    onChange,
    isDisabled,
    name,
    control,
    defaultValue,
    placeholder,
  } = props;
  const ref = useRef(null);

  const selectStyles = {
    menu: (styles) => ({
      ...styles,
      position: "absolute",
      boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      zIndex: 50,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      minWidth: "100%",
      maxWidth: "fit-content",
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
      borderRadius: "5px",
      minHeight: "2.5rem",
      // border:'2px solid green',
      maxHeight: "fit-content",
      // width: fullwidth,
      // maxWidth: fullwidth,
      // maxHeight: 'fit-content',
      // overflow:'clip',
      textOverflow: "ellipsis",
      display: "flex",
      flexWrap: isMulti
        ? "wrap"
        : "nowrap"
        ? state.isSelected
          ? "1px solid #DEEBFF"
          : state.isFocused
          ? "1px solid #DEEBFF"
          : state.hasValue || state.selectProps.inputValue
          ? "1px solid #d32f2f"
          : "1px solid #d32f2f"
        : state.hasValue || state.selectProps.inputValue
        ? ""
        : "",
    }),
    singleValue: (Singstyles) => ({
      ...Singstyles,
      // border:'2px solid black',
      display: "flex",
      // width:'2px',
      maxWidth: "94%",
      textOverflow: "clipped",
    }),
    indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),

    input: (provided, state) => ({
      ...provided,
      // width:'2px',
      // maxWidth: width,
      // maxHeight: 'fit-content',
      // textOverflow:'ellipsis',
      // display:'flex',
      overflow: "clip",
    }),
  };
  const handleRemoveValue = (e) => {
    console.log("handleRemoveValue function call");
    if (!onChange) return;
    const { name: buttonName } = e.currentTarget;
    console.log("E.target value iss:", e.currentTarget);
    const removedValue = value.find((val) => val.value === buttonName);
    if (!removedValue) return;
    onChange(
      value.filter((val) => val.value !== buttonName),
      { action: "remove-value", removedValue }
    );
  };

  return (
    <div className="grid gap-2">
      <FormControl fullWidth sx={{ overFlowX: "hidden", marginY: "2px" }}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              {...props}
              name={name}
              controlShouldRenderValue={!isMulti}
              styles={selectStyles}
              isDisabled={isDisabled}
              placeholder={placeholder}
              defaultValue={defaultValue}

              // {...field}
            />
          )}
        />

        <ValuesContainer>
          {isMulti
            ? value.map((val) => (
                <Value key={val.value}>
                  {val.label}
                  <XButton name={val.value} onClick={handleRemoveValue}>
                    ✕
                  </XButton>
                </Value>
              ))
            : null}
        </ValuesContainer>
      </FormControl>
    </div>
  );
};

export default OptionsOutsideSelect;
