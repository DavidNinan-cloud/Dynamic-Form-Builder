import React from "react";

function VantilationStartButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3  border border-customOrange text-customOrange rounded text-sm font-medium"
        onClick={onClick}
      >
        Vantilation Start
      </button>
    </div>
  );
}

export default VantilationStartButton;
