import React from "react";

function AddCssdIndentButton({ onClick }) {
  return (
    <div>
      <button
        className="h-10 px-3 w-max text-base font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        New CSSD Indent
      </button>
    </div>
  );
}

export default AddCssdIndentButton;
