import React from "react";

function PrintPFRatio({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 w-full border bg-white border-customOrange text-customOrange rounded text-sm font-medium"
        onClick={onClick}
      >
        Print P:F Ratio
      </button>
    </div>
  );
}

export default PrintPFRatio;
