import React from "react";

function ConfirmButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 text-sm font-medium  bg-customGreen text-white rounded "
        onClick={onClick}
      >
        Confirm
      </button>
    </div>
  );
}

export default ConfirmButton;
