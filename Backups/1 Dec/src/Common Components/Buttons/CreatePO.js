import React from "react";

    export default function CreatePO({ onClick, label }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 w-full bg-customBlue text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        Create PO {label ? label:''}
      </button>
    </div>
  );
}

