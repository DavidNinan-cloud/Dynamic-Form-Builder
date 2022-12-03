import React from 'react'
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from '@mui/material'
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const CreateAbleSelect = ({
  showSearch,
  control, 
    error, 
    dataArray,
    name,
    placeholder,
    inputRef,
    onInputChange}) => {
        
        let isError=!!error?.message
        let color="#DEEBFF"

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
                    backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? "rgba(222,235,255,1)"
                    : isFocused
                    ? "rgba(222,235,255,0.5)"
                    : undefined,

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
            container: (provided, state) => ({
                ...provided,
                // marginTop: 2
              }),
            valueContainer: (provided, state) => ({
                ...provided,
                overflow: "visible",
                paddingLeft:state.hasValue || state.selectProps.inputValue ? 8:7,
                whiteSpace: "nowrap",
                flexWrap: 'wrap',
                fontStyle: "normal",
              }),
            placeholder: (provided, state) => ({
                ...provided,
                position: "absolute",
                color: state.menuIsOpen || state.selectProps.menuIsOpen  ? '#1976D2' : '#0f0f0f',
                fontSize: (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue) && 12,
                transition: "top 0.1s, font-size 0.1s",

                // top: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -13 : "0%", 
                top: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -13  : 4, 

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
                            DropdownIndicator: () => showSearch?  (<SearchIcon className='mx-2 text-slate-500'/>):(<KeyboardArrowDownIcon className='mx-2 text-slate-500'/>),
                            ValueContainer: CustomValueContainer
                            }}
                    />
          )}
        />
        <FormHelperText style={{color:'#d32f2f'}}>{error?.message}</FormHelperText>
    </FormControl>
                    
    )
}

export default CreateAbleSelect