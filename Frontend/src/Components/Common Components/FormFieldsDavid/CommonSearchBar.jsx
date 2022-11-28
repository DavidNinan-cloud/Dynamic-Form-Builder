import React from "react";
import { useEffect, useRef, useState } from "react";
import ReactSelect, { components } from "react-select";
const Control = ({ children, ...props }) => {
  const style = { cursor: "pointer", paddingLeft: 10, color: "gray" };

  return (
    <>
      <components.Control {...props}>{children}</components.Control>
    </>
  );
};
const styles = {
  control: (css) => ({ ...css, paddingLeft: "0px" }),
};

const CommonSearchBar = ({
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
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);
  return (
    <div className="  w-full" ref={ref}>
      <div className="flex w-full space-x-2 items-center">
        <ReactSelect
          value={selectedObj}
          className="w-full text-lg"
          inputRef={inputRef}
          ref={null}
          options={dataArray}
          label={label}
          placeholder={placeholder}
          openMenuOnClick={false}
          isClearable={true}
          styles={styles}
          components={{
            Control,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onInputChange={handleInputChange}
          onChange={selectedValue}
        />
      </div>
      {open && (
        <div className="flex ">
          <div className="absolute w-[42%]  z-10 border border-gray-300 rounded-sm text-gray-600">
            <div className="">
              <div
                className="py-4 px-4 justify-center"
                style={{ backgroundColor: "white" }}
              >
                <div>
                  <p className="justify-center text-sm">
                    aspernatur! Accusamus inventore illum at eius magnam numquam
                    maxime nisi consectetur eveniet consequatur odio voluptatum
                    dicta velit corrupti ducimus, sunt dolor, similique tempore
                    minus vitae praesentium error dolore. Sit officia corporis
                    reiciendis. Itaque voluptatibus quibusdam accusantium
                    aliquam quae deleniti nobis similique rerum provident,
                    distinctio dignissimos, perferendis in aspernatur, vero
                    aperiam ratione voluptatum odio sed! Dolor, similique.
                    Reprehenderit dolorem rem asperiores ipsa at assumenda,
                    laborum obcaecati deserunt amet delectus non.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CommonSearchBar;