import React from "react";

function SubmitButton({onClick}) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-sm font-medium  bg-customGreen text-white rounded overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
    onClick={onClick}
    >
        Submit
      </button>
    </div>
  );
}

export default SubmitButton;
