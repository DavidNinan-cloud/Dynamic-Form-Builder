import React from "react";

function NewEnquiryButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 w-max  bg-customBlue  text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        New Enquiry
      </button>
    </div>
  );
}

export default NewEnquiryButton;