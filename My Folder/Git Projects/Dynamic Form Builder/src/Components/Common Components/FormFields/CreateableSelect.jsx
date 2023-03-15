import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from '@mui/material'
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const CreateableSelect = ({
  isDisabled ,
  isSearchable ,
  placeholdernotVisible,
  showSearch,
  control, 
    error, 
    dataArray,
    name,
    placeholder,
    inputRef,
    onInputChange}) => {
        
      let bgColor="rgba(255, 255, 255, 1)"
      let isError=!!error?.message
      const ref = useRef(null);
      const placeHolderPositionTop = useRef(null);
      const [width, setWidth] = useState(0);
      const [placeHolderTop, setPlaceHolderTop] = useState(false);
    
      useEffect(() => {
        placeHolderPositionTop.current = placeHolderTop;
      }, [placeHolderTop]);
      useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth - 100);
      }, []);
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
          minHeight: "2.5rem",
          maxHeight: "fit-content",
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
          whiteSpace: "nowrap",
        }),
        singleValue: (Singstyles) => ({ ...Singstyles }),
        indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),
        container: (provided) => ({
          ...provided,
        }),
        valueContainer: (provided, state) => {
          // console.log('working state',state)
          // console.log('working valueContainer')
          return {
            ...provided,
            overflow: "visible",
            // overflowX: "hidden",
            // display: "block",
            paddingLeft: state.hasValue || state.selectProps.inputValue ? 8 : 7,
            whiteSpace: "nowrap",
            flexWrap: "wrap",
            fontStyle: "normal",
          };
        },
        input: (provided, state) => ({
          ...provided,
          width: width,
          overflow: "hidden",
        }),
        placeholder: (provided, state) => {
          // console.log(
          //   "working placeHolderPositionTop.current",
          //   placeHolderPositionTop.current
          // );
          // console.log("working placeHolderTop", placeHolderTop);
          // console.log("working state", state);
          // console.log("working placeholder");
          return {
            ...provided,
    
            display: placeholdernotVisible
              ? placeHolderTop
                ? "block"
                : "block"
              : "block",
            position: "absolute",
            borderRadius: "2px",
            color: placeHolderTop
              ? isDisabled
                ? "#eaeaea"
                : "#1976D2"
              : isError
              ? "#d32f2f"
              : "#9e9e9e",
    
            fontSize: placeHolderTop && 12,
            transition: "top 0.1s, font-size 0.1s",
    
            top: placeHolderTop ? -19 : 6,
    
            paddingLeft: placeHolderTop ? 4 : "",
    
            paddingRight: placeHolderTop ? 4 : "",
    
            backgroundColor: placeHolderTop
              ? isDisabled
                ? "#f0f0f0"
                : bgColor
              : "",
    
            zIndex: placeHolderTop ? 10 : "",
    
            fontStyle: "normal",
          };
        },
      };

  return (
    <div className=" w-full" ref={ref}>
    <FormControl   
          fullWidth
          size="small" 
          // className="w-48"
          >
      <Controller
          control={control}
                name={name}
                render = {({ field})=> (
                    <CreatableSelect
                    className='h-10'
                        {...field}
                        ref={null}
                        inputRef={inputRef}
                        onInputChange={onInputChange}
                        options={dataArray}
                        isClearable
                        placeholder={placeholder}
                        styles={selectStyles}
                        menuPlacement="auto"
                        menuShouldBlockScroll={false}
                        defaultValue={""}
                        components={{
                            DropdownIndicator: () => showSearch?  (<SearchIcon className='mx-2 text-slate-500'/>):(<KeyboardArrowDownIcon className='mx-2 text-slate-500'/>)
                            ,
                            // ValueContainer: CustomValueContainer,
                            }}
                    />
          )}
        />
        {/* <FormHelperText style={{color:'#d32f2f'}}>{error?.message}</FormHelperText> */}
    </FormControl>
    </div>             
    )
}

export default CreateableSelect