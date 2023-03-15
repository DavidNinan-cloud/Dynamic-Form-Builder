import React from "react";

function ProceedButton({ onClick }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium"
        onClick={onClick}
      >
        Proceed
      </button>
    </div>
  );
}

export default ProceedButton;
