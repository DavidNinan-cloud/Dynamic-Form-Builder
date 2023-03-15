import React from "react";

function PrintSummaryButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-base font-medium  bg-[#E3902F] text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Print Summary
      </button>
    </div>
  );
}

export default PrintSummaryButton;
