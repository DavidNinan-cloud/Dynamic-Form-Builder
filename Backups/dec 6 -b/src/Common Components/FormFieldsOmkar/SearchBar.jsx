import React from "react";
import { useEffect, useRef, useState } from "react";
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

const SearchBar = ({searchIcon,
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
  return (
    <div className="  w-full" >
      <div className="flex w-full space-x-2 items-center">
        <ReactSelect
          // value={selectedObj}
          className="w-full"
          inputRef={inputRef}
          ref={null}
          options={dataArray}
          label={label}
          placeholder={placeholder}
          openMenuOnClick={false}
          isClearable={true}
          clearValue={true}
          // styles={styles}
          components={{
            // Control,
            DropdownIndicator: () => searchIcon ? (<SearchIcon className=' mr-4 text-slate-500'/>) : null,
            IndicatorSeparator: () => null,
          }}
          onInputChange={handleInputChange}
          onChange={selectedValue}
        />
      </div>
    </div>
  );
};
export default SearchBar;