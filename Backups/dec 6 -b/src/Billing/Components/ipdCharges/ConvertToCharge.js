import React, { useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ConvertToChargeTable from "./ConvertToChargeTable";

const ConvertToCharge = (props) => {
  //   const [packageNameList, setPackageNameList] = useState();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-base">Convert to Charge</h1>
        <div className="-mt-2">
          <CancelPresentationIcon
            className="text-red-600  rounded cursor-pointer"
            onClick={() => {
              props.setOpenCovertToCharge(false);
            }}
          />
        </div>
      </div>

      {/* //Service List Table// */}
      <div>
        <div className="w-full h-auto max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
          <ConvertToChargeTable />
        </div>
      </div>

      <div className="flex justify-end mx-4 my-1">
        <button className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
          Convert To Charge
        </button>
      </div>
    </div>
  );
};

export default ConvertToCharge;
