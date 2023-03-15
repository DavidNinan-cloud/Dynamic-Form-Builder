import React, { useState, useRef } from "react";
import ReactSelect, { components } from "react-select";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  searchIcon,
  clearSearchBar,
  dataArray,
  onChange,
  inputRef,
  placeholder,
  isClearable,
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
  if(isClearable !== false){
    isClearable = true
  }
  const [inputValue, setInputValue] = useState("");

  const selectInputRef = useRef();

  const onClear = () => {
    selectInputRef.current.select.clearValue();
    setInputValue("");
    // selectInputRef.current.select.focus()
  };

  const handleOnChange = (e) => {
    setInputValue("");
    onChange(e);
    if (clearSearchBar) {
      onClear();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("do validate", selectInputRef.current);
      selectInputRef.current.select.focus();
      // event.preventDefault();
    }
  };

  const handleChange = (string, InputActionMeta) => {
    const { action, prevInputValue } = InputActionMeta;
    // console.log("handleChange Called")
    // console.log("handleChange inputValue",string)
    // console.log("handleChange inputValue typeof",typeof(string))
    // console.log("handleChange InputActionMeta",InputActionMeta)
    // console.log("handleChange action",action)

    handleInputChange(string);

    if (action !== "input-blur" && action !== "menu-close") {
      setInputValue(string);
    }
  };
  const handleInputChangeFunc = (string, action) => {
    if (action.action !== "input-blur" && action.action !== "menu-close") {
      console.log(string);
      handleInputChange(string);
      setInputValue(string);
    }
  };
  return (
    <div className=" w-full h-10">
      <ReactSelect
        inputValue={inputValue}
        ref={selectInputRef}
        options={dataArray}
        placeholder={placeholder}
        openMenuOnClick={false}
        isClearable={isClearable}
        inputRef={inputRef}
        clearValue={true}
        components={{
          DropdownIndicator: () =>
            searchIcon ? <SearchIcon className=" mr-4 text-slate-500" /> : null,
          IndicatorSeparator: () => null,
        }}
        // onInputChange={handleChange}

        onInputChange={handleInputChangeFunc.bind(this)}
        onChange={handleOnChange}
        blurInputOnSelect
        controlShouldRenderValue={!clearSearchBar}
        // onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default SearchBar;
