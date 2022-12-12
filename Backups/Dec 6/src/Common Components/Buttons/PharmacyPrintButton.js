import React from "react";

function PharmacyPrintButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-max  bg-customOrange text-white rounded text-sm font-medium"
      >
        Pharmacy Print
      </button>
    </div>
  );
}

export default PharmacyPrintButton;