import React from "react";

function CancelButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border border-customRed text-customRed rounded text-sm font-semibold"
        onClick={onClick}
      >
        Cancel
      </button>
    </div>
  );
}

export default CancelButton;
