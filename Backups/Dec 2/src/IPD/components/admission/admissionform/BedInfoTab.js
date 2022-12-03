import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BedInfoTab = (props) => {
  const [isBedDetailsFlag, setIsBedDetailsFlag] = useState();
  let bedDetails = null;
  if (props.bedDetailsData && props.bedDetailsData !== null) {
    bedDetails = props.bedDetailsData;
  }


  let navigate = useNavigate();

  useEffect(() => {
    console.log("Bed Info Props", props, isBedDetailsFlag);
    if (props.isBedDetails === false) {
      setIsBedDetailsFlag(false);
    } else {
      setIsBedDetailsFlag(true);
    }
  }, [props, isBedDetailsFlag]);

  return (
    <div>
      <Card square={true} className="h-auto lg:h-16">
        <CardContent>
          <div className="flex justify-between">
            <p
              className="sm:text-sm  lg:text-[1.2rem] font-semibold my-2  text-black font-Poppins"
              style={{ wordSpacing: "0.2rem" }}
            >
              Admission Details
            </p>
            {bedDetails !== null && isBedDetailsFlag ? (
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 my-auto">
                <div className="border-r border-black">
                  <p className="text-sm">
                    Floor :
                    <span className=" mx-2 font-semibold text-[#1976d2]">
                      {bedDetails.floors.label}
                    </span>
                  </p>
                </div>
                <div className="border-r border-black">
                  <p className="text-sm">
                    Block :
                    <span className=" mx-2 font-semibold text-[#1976d2]">
                      {bedDetails.block.label}
                    </span>
                  </p>
                </div>
                <div className="border-r border-black">
                  <p className="text-sm">
                    Ward :
                    <span className=" mx-2 font-semibold text-[#1976d2]">
                      {bedDetails.ward.label}
                    </span>
                  </p>
                </div>
                <div className="border-r border-black">
                  <p className="text-sm">
                    Room :
                    <span className=" mx-2 font-semibold text-[#1976d2]">
                      {bedDetails.room.label}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Bed No. :
                    <span className=" mx-2 font-semibold text-[#1976d2]">
                      {bedDetails.bedNo}
                    </span>
                  </p>
                </div>
              </div>
            ) : isBedDetailsFlag === false ? (
              <div className="w-8/12">
                <p className="text-red-500 text-center">Please Select Bed</p>
              </div>
            ) : null}

            <button
              className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded "
              onClick={() => navigate("/ipd/admissionlist")}
            >
              View Admission List
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BedInfoTab;
