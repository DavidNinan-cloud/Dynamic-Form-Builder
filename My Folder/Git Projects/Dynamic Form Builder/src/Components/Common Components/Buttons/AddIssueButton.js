import React from "react";

function AddIssueButton({ onClick, label }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 w-full bg-customBlue text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        + Add Issue {label ? label : ""}
      </button>
    </div>
  );
}

export default AddIssueButton;
