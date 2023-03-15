import React, { useLayoutEffect, useRef, useState } from "react";
import ReactSelect, { components, InputActionMeta } from "react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useEffect } from "react";

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
  menuShouldBlockScroll,
  menuPlacement,
  isClearable,
  onChange,
  defaultValue,
}) => {
  if (menuPlacement) {
  } else {
    menuPlacement = "auto";
  }
  if (menuShouldBlockScroll !== true) {
    menuShouldBlockScroll = false;
  }
  const ref = useRef(null);
  // const searchRef = useRef(null);
  const placeHolderPositionTop = useRef(null);
  const [width, setWidth] = useState(0);
  const [placeHolderTop, setPlaceHolderTop] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  useEffect(() => {
    console.log("working useEffect placeHolderTop", placeHolderTop);
    // console.log('working useEffect searchRef',searchRef.current?.blur())
    // placeHolderPositionTop.current = placeHolderTop;
  }, [placeHolderTop]);
  useEffect(() => {
    console.log("working useEffect menuIsOpen", menuIsOpen);
  }, [menuIsOpen]);
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth - 100);
  }, []);
  let isError = !!error?.message;
  let bgColor = "rgba(255, 255, 255, 1)";
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
      //   "working placeHolderPositionTop.current state",
      //   placeHolderPositionTop.current
      // );
      // console.log("working placeHolderTop state", placeHolderTop);
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
  const { IndicatorSeparator, Placeholder } = components;

  useEffect(()=>{
    console.log('working control',control)
  })
  //   const CustomPlaceholder = ({ children, ...props }) => {
  //     console.log("working selectProps.inputValue CustomPlaceholder", props);
  //     console.log("working length CustomPlaceholder", props.hasValue);
  //     if(props.hasValue){
  //       if(!placeHolderTop){
  //         setPlaceHolderTop(true)
  //       }
  //     }else{
  //         if(props.selectProps.inputValue){

  //         }else{
  //           if(placeHolderTop){
  //             setPlaceHolderTop(false)
  //           }

  //         }
  //     }
  //   return (
  //       <Placeholder {...props} isFocused={props.isFocused}>
  //         {props.selectProps.placeholder}
  //       </Placeholder>
  //   );
  // };
  // const CustomIndicatorSeparator = ({ children, ...props }) => {
  //     console.log("working selectProps.inputValue", props.selectProps.inputValue);
  //     console.log("working length", props.hasValue);
  //     if(props.hasValue){
  //       if(!placeHolderTop){
  //         setPlaceHolderTop(true)
  //       }
  //     }else{
  //         if(props.selectProps.inputValue){

  //         }else{
  //           if(placeHolderTop){
  //             setPlaceHolderTop(false)
  //           }

  //         }
  //     }
  //   return null
  // };
  let i = 0
  const fnhandleInputChange = (
    inputValue,
    { action, prevInputValue }
  ) => {
    // if (action === 'input-change') 
    // // return inputValue;
    // if (action === 'menu-close') {
    //   if (prevInputValue) setMenuIsOpen(true);
    //   else setMenuIsOpen(undefined);
    // }
    // return prevInputValue;

    // if( action == 'set-value'){
    //   console.log('working must top',action)
    // }
    // if (action === 'input-change') {
    //   console.log('working must top',action)

      handleInputChange(inputValue);
    // }

        // console.log(`${i} working inputValue`,inputValue)
        // console.log('working action',action)
        // console.log('working prevInputValue',prevInputValue)
  };

  // const fnhandleInputChange = ({ children, ...props }) => {
  //   // if (action === 'input-change') return inputValue;
  //   // if (action === 'menu-close') {
  //   //   if (prevInputValue) setMenuIsOpen(true);
  //   //   else setMenuIsOpen(undefined);
  //   // }
  //   // return prevInputValue;
  //       console.log('working children',children)
  //       console.log('working props',props)
  //       handleInputChange(e)
  // };


  // ###
  // const fnhandleInputChange = (e) => {
  //   // setPlaceHolderTop(true)
  //   if (e == null) {
  //     // console.log('working handleInputChange null',e)
  //   } else if (e == "") {
  //     // console.log('working handleInputChange undefined',e)
  //   } else {
  //     // setPlaceHolderTop(true);
  //   }
  //   // console.log('working handleInputChange',e)
  //   // placeHolderPositionTop.current = true
  //   handleInputChange(e);
  // };

  return (
    <div className=" w-full" ref={ref}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <ReactSelect
              className="text-sm lg:text-base w-full"
              inputRef={inputRef}
              ref={null}
              {...field}
              options={dataArray}
              defaultValue={defaultValue}
              isMulti={isMulti}
              label={label}
              placeholder={placeholder}
              openMenuOnClick={false}
              isClearable={isClearable}
              clearValue={true}
              styles={selectStyles}
              menuPlacement={menuPlacement}
              menuShouldBlockScroll={menuShouldBlockScroll}
              components={{
                DropdownIndicator: () =>
                  searchIcon ? (
                    <SearchIcon className=" mr-4 text-slate-500" />
                  ) : (
                    <KeyboardArrowDown className="mr-2 text-gray-600" />
                  ),
                IndicatorSeparator: () => null,
                // Placeholder : CustomPlaceholder
              }}
              onInputChange={fnhandleInputChange}
            />
          )}
        />
        {/* <FormHelperText style={{ color: "#d32f2f" }} className='capitalize'>
            {error?.message}
          </FormHelperText> */}
      </FormControl>
    </div>
  );
};
export default SearchDropdown;
