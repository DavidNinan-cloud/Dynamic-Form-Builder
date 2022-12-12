import React from "react";
import ReactSelect, { components } from "react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDropdown = ({
  isDisabled,
  isMulti,
  placeholdernotVisible,
  searchIcon,
  control,
  error,
  name,
  dataArray,
  inputRef,
  placeholder,
  label,
  handleInputChange,
}) => {

  let isError=!!error?.message
  let bgColor="rgba(255, 255, 255, 1)"
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
      borderRadius: "5px",
      minHeight:"2.5rem",
      maxHeight:"fit-content",
      border: isError
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
    singleValue: (Singstyles) => ({ ...Singstyles }),
    indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),
    container: (provided) => ({
      ...provided,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      overflow: state.hasValue || state.selectProps.inputValue ?  "hidden" :"clipped",
      paddingLeft: state.hasValue || state.selectProps.inputValue ? 8 : 7,
      whiteSpace: "nowrap",
      flexWrap: "wrap",
      fontStyle: "normal",
    }),
    input: (provided, state) => ({
      ...provided,
    }),
    placeholder: (provided, state) => ({
      ...provided,

      display: placeholdernotVisible ? (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? "none"  : "block" ) : "block",
      position: "absolute",
      borderRadius:'2px',
      color: state.menuIsOpen || state.selectProps.menuIsOpen  ? (isDisabled ?  '#eaeaea': '#1976D2' ): isError? "#d32f2f":'#9e9e9e',

      fontSize: (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue) && 12,
      transition: "top 0.1s, font-size 0.1s",

      top: placeholdernotVisible ? "" : state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -19  : 4, 

      paddingLeft: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "", 

      paddingRight: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "",

      backgroundColor: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? (isDisabled ? "#f0f0f0" : bgColor) : "",

      zIndex: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 10:"",

      fontStyle: "normal",

      // display: placeholdernotVisible
      //   ? state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue
      //     ? "none"
      //     : "block"
      //   : "block",
      // position: "absolute",

      // color:
      //   state.menuIsOpen || state.selectProps.menuIsOpen
      //     ? "#1976D2"
      //     : isError
      //     ? "#d32f2f"
      //     : "#9e9e9e",

      // fontSize:
      //   (state.menuIsOpen ||
      //     state.selectProps.menuIsOpen ||
      //     state.hasValue ||
      //     state.selectProps.inputValue) &&
      //   12,
      // transition: "top 0.1s, font-size 0.1s",

      // // eslint-disable-next-line no-undef
      // top: placeholdernotVisible
      //   ? ""
      //   : state.menuIsOpen ||
      //     state.selectProps.menuIsOpen ||
      //     state.hasValue ||
      //     state.selectProps.inputValue
      //   ? -16
      //   : 4,

      // paddingLeft:
      //   state.menuIsOpen ||
      //   state.selectProps.menuIsOpen ||
      //   state.hasValue ||
      //   state.selectProps.inputValue
      //     ? 4
      //     : "",

      // paddingRight:
      //   state.menuIsOpen ||
      //   state.selectProps.menuIsOpen ||
      //   state.hasValue ||
      //   state.selectProps.inputValue
      //     ? 4
      //     : "",

      // backgroundColor:
      //   state.menuIsOpen ||
      //   state.selectProps.menuIsOpen ||
      //   state.hasValue ||
      //   state.selectProps.inputValue
      //     ? "white"
      //     : "",

      // zIndex:
      //   state.menuIsOpen ||
      //   state.selectProps.menuIsOpen ||
      //   state.hasValue ||
      //   state.selectProps.inputValue
      //     ? 10
      //     : 10,

      // fontStyle: "normal",
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
    <div className=" w-full">
      <div className="flex w-full space-x-2 items-center">
        <FormControl fullWidth>
          <Controller
            control={control}
            name={name}
            defaultValue={""}
            render={({ field }) => (
              <ReactSelect
                className="text-sm lg:text-base w-full"
                inputRef={inputRef}
                ref={null}
                {...field}
                options={dataArray}
                defaultValue={""}
                isMulti={isMulti}
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
          <FormHelperText style={{ color: "#d32f2f" }} className='capitalize'>
            {error?.message}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};
export default SearchDropdown;
