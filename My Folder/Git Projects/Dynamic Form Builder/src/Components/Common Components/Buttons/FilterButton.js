import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
function FilterButton({ onClick }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-sm font-medium  bg-customBlue text-white rounded "
        onClick={onClick}
      >
        <TuneIcon />
      </button>
    </div>
  );
}

export default FilterButton;
