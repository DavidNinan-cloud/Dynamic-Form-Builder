import React from "react";

function AddButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Add
      </button>
    </div>
  );
}

export default AddButton;
