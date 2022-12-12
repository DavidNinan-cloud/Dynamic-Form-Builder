import React from "react";

function SaveButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Save
      </button>
    </div>
  );
}

export default SaveButton;
