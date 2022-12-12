import React from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function CancelPresentationIconButton({ onClick }) {
  return (
    <div className="grid grid-cols-1 w-full">
      <CancelPresentationIcon
        className="absolute top-3 right-8 lg:right-5 text-customRed  rounded cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
}

export default CancelPresentationIconButton;
