import React from "react";

function OxygenStartButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-[24px] border border-customOrange text-customOrange rounded text-sm font-medium"
        onClick={onClick}
      >
        Oxygen Start
      </button>
    </div>
  );
}

export default OxygenStartButton;
