import React, {useState,useRef } from "react";
import ReactSelect, { components } from "react-select";
import SearchIcon from "@mui/icons-material/Search";


const ControlledSearchBar = ({
  inputValue, setInputValue,
  searchIcon,
  clearSearchBar,
  dataArray,
  onChange,
  inputRef,
  placeholder,
  label,
  handleInputChange,
}) => {
  const selectStyles = {
    menu: (styles) => ({
      ...styles,
      position: "absolute",
      minWidth: "100%",
      boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      zIndex: 20,
      // fontStyle: "normal",
      fontSize: "16px",
      // lineHeight: "24px"
    }),
    control: (Colstyles, state) => ({
      ...Colstyles,
      borderRadius: "5px",
      height: "20px",
      
      fontSize: "16px",
      minWidth: "100%",
    }),
  };

//   const[inputValue,setInputValue] = useState("")
  
  const handleChange = (string,InputActionMeta) => {
    const { action, prevInputValue } = InputActionMeta
    // console.log("handleChange Called")
    // console.log("handleChange inputValue",string)
    // console.log("handleChange inputValue typeof",typeof(string))
    // console.log("handleChange InputActionMeta",InputActionMeta)
    // console.log("handleChange action",action)
    
    handleInputChange(string)


    if (action !== "input-blur" && action !== "menu-close") {
      setInputValue(string);
    }
  };
  const selectInputRef = useRef();

  const onClear = () => {
    selectInputRef.current.select.clearValue();
  };

  const handleOnChange = (e) =>{
    onChange(e)
    if(clearSearchBar){
      onClear()
    }
  }
  return (
    <div className=" w-full">

          <ReactSelect
              inputValue={inputValue}
              inputRef={inputRef}
              ref={selectInputRef}
              options={dataArray}
              label={label}
              // styles={selectStyles}
              placeholder={placeholder}
              openMenuOnClick={false}
              isClearable={true}
              clearValue={true}
              // styles={styles}
              components={{
                // Control,
                DropdownIndicator: () =>
                  searchIcon ? <SearchIcon className=" mr-4 text-slate-500" /> : null,
                IndicatorSeparator: () => null,
              }}
              onInputChange={handleChange}
              onChange={handleOnChange}
              blurInputOnSelect 
          />
    </div>
  );
};
export default ControlledSearchBar;
