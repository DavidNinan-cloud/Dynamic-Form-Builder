import React from "react";

function CareAndPositionButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out text-sm font-semibold"
        onClick={onClick}
      >
        Care And Position
      </button>
    </div>
  );
}

export default CareAndPositionButton;
