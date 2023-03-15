import React from "react";

function PreviousReturnedListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-max  bg-customBlue text-white rounded text-sm font-medium"
      >
        Previous Returned List
      </button>
    </div>
  );
}

export default PreviousReturnedListButton;
