import React from 'react'
import { Controller } from "react-hook-form";
import {FormControl, FormHelperText } from '@mui/material'
import ReactSelect,{ components } from "react-select"; 
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const DropdownField = ({
    className,
    isDisabled,
    placeholdernotVisible, 
    isMulti,
    inputRef,
    isSearchable,
    control, 
    error, 
    dataArray,
    name,
    onInputChange,
    placeholder, 
    isClearable, 
    defaultValue 
  }) => {
        let isError=!!error?.message
        let bgColor="rgba(255, 255, 255, 1)"

        const selectStyles = { 
            menu: styles => ({ ...styles, 
                position: "absolute",
                boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
                zIndex: 50,
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
                borderRadius: "5px",
                minHeight:"2.5rem",
                maxHeight:"fit-content",
                border: isSearchable ? '' : isError? (state.isSelected
                  ? "1px solid #DEEBFF"
                  : state.isFocused
                  ? "1px solid #DEEBFF"
                  : state.hasValue || state.selectProps.inputValue ? "1px solid #d32f2f": "1px solid #d32f2f") : (state.hasValue || state.selectProps.inputValue? "": ""),
            }) ,
            singleValue: Singstyles => ({ ...Singstyles, 
            }) ,
            indicatorSeparator: (styles) => ({display:'none',paddingX:"2px"}),
            
            valueContainer: (provided, state) => ({
                ...provided,
                position: "relative",
                overflow: "clipped",
                paddingLeft:state.hasValue || state.selectProps.inputValue ? 8:7,
                // whiteSpace: "nowrap",
                // flexWrap: 'wrap',
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
                color: isSearchable ? '' : state.menuIsOpen || state.selectProps.menuIsOpen  ? (isDisabled ?  '#eaeaea': '#1976D2' ): isError? "#d32f2f":'#9e9e9e',

                fontSize: isSearchable ? '' : (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue) && 12,
                transition: "top 0.1s, font-size 0.1s",

                top: placeholdernotVisible ? "" : isSearchable ? '' : (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -19  : "0%"), 

                paddingLeft: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "", 

                paddingRight: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "",

                backgroundColor: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? (isDisabled ? "#f0f0f0" : bgColor) : "",

                zIndex: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 10:"",

                fontStyle: "normal",

                // opacity:"0.2",
              }),    
        };
        const { ValueContainer, Placeholder } = components;

        // const CustomValueContainer = ({ children, ...props }) => {
        //   return (
        //     <ValueContainer {...props}>
        //       <Placeholder {...props} isFocused={props.isFocused}>
        //         {props.selectProps.placeholder}
        //       </Placeholder>
        //       {React.Children.map(children, child =>
        //         child && child.type !== Placeholder ? child : null
        //       )}
        //     </ValueContainer>
        //   );
        // };
  return (
    <FormControl fullWidth>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render = {({ field})=> (
                    <ReactSelect
                        className={className + 'text-sm lg:text-base text-gray-600 w-full h-10'}
                        isDisabled={isDisabled}
                        inputRef={inputRef}
                        {...field}
                        ref={null}
                        isMulti={isMulti}
                        closeMenuOnSelect={isMulti ? false : true}
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
                        components={{
                          DropdownIndicator: () => isMulti? (<KeyboardArrowDownIcon className='mx-2 text-gray-600'/>) : isSearchable? (<SearchIcon className='mx-2 text-gray-600'/>):(<KeyboardArrowDownIcon className='mx-2 text-gray-600'/>)
                          ,
                            // ValueContainer: CustomValueContainer,

                            }}
                    />
                )}
        />
        <FormHelperText style={{color:'#d32f2f'}} className='capitalize'>{error?.message}</FormHelperText>
    </FormControl>
    )
}

export default DropdownField