import React from "react";

function LogFileButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
        LOG FILE
      </button>
    </div>
  );
}

export default LogFileButton;
