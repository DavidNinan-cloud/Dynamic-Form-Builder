import React from "react";

function ViewChargesButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border bg-customBlue text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        View Previous
      </button>
    </div>
  );
}

export default ViewChargesButton;
