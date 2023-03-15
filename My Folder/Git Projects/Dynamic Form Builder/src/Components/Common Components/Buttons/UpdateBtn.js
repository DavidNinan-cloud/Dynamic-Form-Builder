import React from "react";

function UpdateBtn({ type, onClick }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="h-10 px-3  bg-customGreen text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Update
      </button>
    </div>
  );
}

export default UpdateBtn;
