import React from "react";
function GetReturnsButtonButton({ onClick }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-sm font-medium  bg-customBlue text-white rounded "
        onClick={onClick}
      >
        Get Return Items
      </button>
    </div>
  );
}

export default GetReturnsButtonButton;
