import React from "react";

function DraftButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 text-sm font-medium  bg-customBlue text-white rounded "
        onClick={onClick}
      >
        Draft
      </button>
    </div>
  );
}

export default DraftButton;
