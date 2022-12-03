import React from "react";

function LogFileButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-full bg-customOrange text-white rounded text-base font-medium"
      >
        New Indent
      </button>
    </div>
  );
}

export default LogFileButton;
