import React from "react";

function PrintBarcodeButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3  bg-customOrange text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Print Barcode
      </button>
    </div>
  );
}

export default PrintBarcodeButton;
