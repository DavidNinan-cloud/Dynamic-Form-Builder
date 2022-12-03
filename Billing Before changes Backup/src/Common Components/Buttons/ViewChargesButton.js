import React from "react";

function ViewChargesButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border  border-customOrange text-customOrange rounded text-sm font-medium"
        onClick={onClick}
      >
        View Charges
      </button>
    </div>
  );
}

export default ViewChargesButton;
