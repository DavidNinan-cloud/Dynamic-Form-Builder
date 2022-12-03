import React from "react";

function CompleteButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 text-sm font-medium  bg-customGreen text-white rounded "
        onClick={onClick}
      >
        Complete
      </button>
    </div>
  );
}

export default CompleteButton;
