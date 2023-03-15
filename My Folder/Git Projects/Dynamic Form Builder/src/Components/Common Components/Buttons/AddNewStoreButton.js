import React from "react";

function AddNewStoreButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3  bg-customBlue  text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add New Store
      </button>
    </div>
  );
}

export default AddNewStoreButton;
