import React from "react";

function AddConsentButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3  bg-customBlue  text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add Consent
      </button>
    </div>
  );
}

export default AddConsentButton;
