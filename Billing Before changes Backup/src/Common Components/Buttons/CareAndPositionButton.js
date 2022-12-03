import React from "react";

function CareAndPositionButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border border-customOrange text-customOrange rounded text-sm font-semibold"
        onClick={onClick}
      >
        Care And Position
      </button>
    </div>
  );
}

export default CareAndPositionButton;
