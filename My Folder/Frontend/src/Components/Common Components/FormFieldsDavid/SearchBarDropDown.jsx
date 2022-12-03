import React from 'react'
import { Controller } from "react-hook-form";
import {FormControl, FormHelperText } from '@mui/material'
import ReactSelect,{ components } from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const SearchBarDropDown = ({selectedValue,
  placeholdernotVisible, isMulti,
    inputRef,
    isSearchable,
    control, 
    error, 
    dataArray,
    name,
    onInputChange,
    placeholder, isClearable, defaultValue }) => {
        let isError=!!error?.message

        const selectStyles = { 
            menu: styles => ({ ...styles, 
                position: "absolute",
                boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
                zIndex: 20,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px"
            }) ,
            option: (provided, {  isDisabled, isFocused, isSelected }) => ({ ...provided, 
                    whiteSpace: "nowrap",
                    backgroundColor: isDisabled ? undefined : isSelected ? "rgba(222,235,255,1)" : isFocused ? "rgba(222,235,255,0.5)" : undefined,

                    color: 
                    isDisabled ? undefined: isSelected ? "#000000" : isFocused ? "#000000"
                    : undefined,
            }) ,
            control:    (Colstyles,state ) => ({ ...Colstyles, 
                borderRadius: "6px",
                border: isError? (state.isSelected
                  ? "1px solid #DEEBFF"
                  : state.isFocused
                  ? "1px solid #DEEBFF"
                  : state.hasValue || state.selectProps.inputValue ? "1px solid #d32f2f": "1px solid #d32f2f") : (state.hasValue || state.selectProps.inputValue? "": "")
            }) ,
            singleValue: Singstyles => ({ ...Singstyles, 
            }) ,
            indicatorSeparator: (styles) => ({display:'none',paddingX:"2px"}),
            container: (provided) => ({
                ...provided,
              }),
            valueContainer: (provided, state) => ({
                ...provided,
                overflow: "visible",
                paddingLeft:state.hasValue || state.selectProps.inputValue ? 8:7,
                whiteSpace: "nowrap",
                flexWrap: 'wrap',
                fontStyle: "normal",
              }),
              input: (provided, state) => ({
                ...provided,
            }),
            placeholder: (provided, state) => ({
                ...provided,
                display: placeholdernotVisible ? (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? "none"  : "block" ) : "block",
                position: "absolute",

                color: state.menuIsOpen || state.selectProps.menuIsOpen  ? '#1976D2' : isError? "#d32f2f":'#0f0f0f',

                fontSize: (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue) && 12,
                transition: "top 0.1s, font-size 0.1s",

                top: placeholdernotVisible ? "" : isSearchable ? (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -12 : 2):(state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -16  : "0%"), 

                paddingLeft: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "", 

                paddingRight: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "",

                backgroundColor: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ?"white":"",

                zIndex: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 10:10,

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
              {React.Children.map(children, child =>
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
                render = {({ field})=> (
                    <ReactSelect
                        inputRef={inputRef}
                        {...field}
                        ref={null}
                        isMulti={isMulti}
                        closeMenuOnSelect={!isMulti}
                        options={dataArray}
                        isClearable={isClearable}
                        clearValue={true}
                        isSearchable={isSearchable}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        styles={selectStyles}
                        blurInputOnSelect={true}
                        menuPlacement="auto"
                        menuShouldBlockScroll={false}
                        onInputChange={onInputChange}
                        onChange={selectedValue}
                        components={{
                          DropdownIndicator: () => isMulti? (<KeyboardArrowDownIcon className='mx-2 text-slate-500'/>) : isSearchable? (<SearchIcon className='mx-2 text-slate-500'/>):(<KeyboardArrowDownIcon className='mx-2 text-slate-500'/>)
                          ,
                            ValueContainer: CustomValueContainer,

                            }}
                    />
                )}
        />
        <FormHelperText style={{color:'#d32f2f'}}>{error?.message}</FormHelperText>
    </FormControl>
    )
}

export default SearchBarDropDown