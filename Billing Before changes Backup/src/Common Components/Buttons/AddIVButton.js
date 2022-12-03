import React from "react";

function AddIVButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
        Add IV
      </button>
    </div>
  );
}

export default AddIVButton;
