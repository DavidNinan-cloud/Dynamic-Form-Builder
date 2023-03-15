import React from "react";

function AddNewTypeButton({ onClick }) {
  return (
    <div>
      <button
        className="h-10 px-3 w-max text-base font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add New Type
      </button>
    </div>
  );
}

export default AddNewTypeButton;
