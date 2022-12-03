import React from "react";

function SelectButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border border-customBlue text-white bg-customBlue rounded text-base font-medium"
        onClick={onClick}
      >
        Select
      </button>
    </div>
  );
}

export default SelectButton;