import React from "react";
import ReactSelect, { components } from "react-select";
import SearchIcon from '@mui/icons-material/Search';

// const Control = ({ children, ...props }) => {
//   const style = { cursor: "pointer", paddingLeft: 10, color: "gray" };

//   return (
//     <>
//       <components.Control {...props}>{children}</components.Control>
//     </>
//   );
// };
// const styles = {
//   control: (css) => ({ ...css, paddingLeft: "0px" }),
// };

const SearchBar = ({
  searchIcon,
  isSearchable,
  control,
  error,
  dataArray,
  selectedValue,
  inputRef,
  placeholder,
  label,
  handleInputChange,
  selectedObj,
}) => {
  const selectStyles = { 
    menu: styles => ({ ...styles, 
        position: "absolute",
        boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
        zIndex: 20,
        // fontStyle: "normal",
        // fontSize: "16px",
        // lineHeight: "24px"
    }) ,}
  return (
        <ReactSelect
          inputRef={inputRef}
          ref={null}
          options={dataArray}
          label={label}
          placeholder={placeholder}
          openMenuOnClick={false}
          isClearable={true}
          clearValue={true}
          styles={selectStyles}
          // styles={styles}
          components={{
            // Control,
            DropdownIndicator: () => searchIcon ? (<SearchIcon className=' mr-4 text-slate-500'/>) : null,
            IndicatorSeparator: () => null,
          }}
          onInputChange={handleInputChange}
          onChange={selectedValue}
        />
  );
};
export default SearchBar;