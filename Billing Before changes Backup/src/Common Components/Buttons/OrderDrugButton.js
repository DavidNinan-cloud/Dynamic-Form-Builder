import React from "react";

function OrderDrugButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
        Order Drug
      </button>
    </div>
  );
}

export default OrderDrugButton;
