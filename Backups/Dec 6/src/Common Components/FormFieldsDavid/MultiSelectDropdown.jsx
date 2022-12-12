import React from 'react'
import FormControl from '@mui/material/FormControl';
import {  FormHelperText } from '@mui/material';
import { Controller } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";
import { components } from "react-select";
import CloseIcon from '@mui/icons-material/Close';
// import './MultiselectStyle.css'; 

const MultiSelectDropdown = ({
    control,
    name,
    dataArray,
    placeholder,
    error
    }) => {

        let isError=!!error?.message
        let color="#DEEBFF"

        const selectStyles = { 
            chips: { // To change css chips(Selected options)
                background: "red",
              },
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
                // border: isError? (state.isSelected
                //   ? "1px solid #DEEBFF"
                //   : state.isFocused
                //   ? "1px solid #DEEBFF"
                //   : state.hasValue || state.selectProps.inputValue ? "1px solid #d32f2f": "1px solid #d32f2f") : (state.hasValue || state.selectProps.inputValue? "": "")
            }) ,
            singleValue: Singstyles => ({ ...Singstyles, 
                // zIndex: 10
                // position: "static", or "relative"  //if u want the div size to change
                // position: "absolute",
                // boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
                // borderRadius: "6px",
                // borderBottom: '2px dotted pink', 
                
                // backgroundColor:"red"
            }) ,
            indicatorSeparator: (styles) => ({display:'none',paddingX:"2px"}),
            container: (provided, state) => ({
                ...provided,
                marginTop: 2
              }),
            valueContainer: (provided, state) => ({
                ...provided,
                overflow: "visible",
                paddingLeft:state.hasValue || state.selectProps.inputValue ? 8:7,
              }),
            placeholder: (provided, state) => ({
                ...provided,
                position: "absolute",
                color: state.menuIsOpen || state.selectProps.menuIsOpen  ? '#1976D2' : '#0f0f0f',
                fontSize: (state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue) && 12,
                transition: "top 0.1s, font-size 0.1s",

                top: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? -15 : "0%", 

                paddingLeft: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "", 
                paddingRight: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "",
                backgroundColor: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ?"white":"",
                zIndex: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 10:"",
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
    <div>
        <FormControl fullWidth >
                            <Controller
                                control={control}
                                name={name}
                                defaultValue={""}
                                render={({ field: { value, onChange } }) => (
                                    <Multiselect
                                        options={dataArray}
                                        displayValue="label"
                                        showCheckbox={true}
                                        placeholder={placeholder}
                                        defaultValue={""}
                                        onSelect={onChange}
                                        onRemove={onChange}
                                        selectedValues={value}
                                        // components={{
                                        //     ValueContainer: CustomValueContainer
                                        //     }}
                                        // styles={selectStyles}
                                        menuPlacement="auto"
                                        hidePlaceholder={true}
                                        customCloseIcon={<div ><CloseIcon  className=' ml-3 rounded-full border border-[#2196f3]' color="primary" sx={{ fontSize: 20 }}/></div>}
                                        menuShouldBlockScroll={false}
                                        style={{
                                            // closeIcon:{
                                            //     background: 'black',
                                            //     color:"black",
                                            // },
                                            chips: {
                                              background: 'white',
                                              color:"#2196f3",
                                              border:"1px solid #2196f3"
                                            },
                                            multiselectContainer: {
                                              color: ''
                                            },
                                            searchBox: {
                                                borderRadius: "6px",
                                            //   border: 'none',
                                            //   'border-bottom': '1px solid blue',
                                            //   'border-radius': '0px'
                                            }
                                            
                                          }}
                                    />
                                )}
                                
                            />
                            <FormHelperText style={{color:'#d32f2f'}}>{error?.message}</FormHelperText>
        </FormControl>
    </div>
  )
}

export default MultiSelectDropdown