import React from "react";

function NextButton({ type, onClick }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded "
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
