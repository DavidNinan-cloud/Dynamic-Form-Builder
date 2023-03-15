import React from "react";

function CssdPrintButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 w-max  bg-customOrange text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        CSSD Print
      </button>
    </div>
  );
}

export default CssdPrintButton;
