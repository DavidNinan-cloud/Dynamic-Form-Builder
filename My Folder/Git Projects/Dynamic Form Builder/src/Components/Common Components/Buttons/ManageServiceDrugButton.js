import React from "react";

export default function ManageServiceDrugButton({ onClick }) {
  return (
    <div>
      <button
        className="h-10 px-3 w-max text-base font-medium  bg-customBlue text-white rounded  overflow-hidden"
        onClick={onClick}
      >
      Manage Service/Drugs
      </button>
    </div>
  );
}
