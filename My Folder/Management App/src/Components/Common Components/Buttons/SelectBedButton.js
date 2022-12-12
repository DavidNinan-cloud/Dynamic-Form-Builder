import React from "react";

function SelectBedButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border border-customBlue text-white bg-customBlue rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Select Bed
      </button>
    </div>
  );
}

export default SelectBedButton;