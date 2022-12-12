import React from "react";

function PatientTransferButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3  bg-customOrange text-white rounded text-base font-medium"
        onClick={onClick}
      >
        Print Transfer Paper
      </button>
    </div>
  );
}

export default PatientTransferButton;
