import React from "react";

function PreviousReturnedReceiveListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-max  bg-customBlue text-white rounded text-sm font-medium"
      >
        Previous Return Receive List
      </button>
    </div>
  );
}

export default PreviousReturnedReceiveListButton;
