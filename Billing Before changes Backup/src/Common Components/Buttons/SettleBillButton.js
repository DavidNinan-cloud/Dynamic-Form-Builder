import React from "react";

function SettleBillButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-10 px-3 border  bg-customBlue text-white rounded text-sm font-medium "
        onClick={onClick}
      >
        Settle Bill
      </button>
    </div>
  );
}

export default SettleBillButton;
