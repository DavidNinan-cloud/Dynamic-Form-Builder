import { Divider } from "@mui/material";
import React from "react";

const BedDetails = (props) => {
  return (
    <div className="ml-8 mr-6">
      {props.bedDetailsData !== null ? (
        <div className="border shadow-md p-2 my-2 bg-gray-100 ">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 py-2 px-4 ">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold w-28">Patient Name </p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left">
                  {props.bedDetailsData.patientName}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold w-28">UHID </p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left  ">
                  {props.bedDetailsData.uhid}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold w-28">Age </p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left ">
                  {props.bedDetailsData.age}
                </span>
              </div>
            </div>
            {/* <div className="flex justify-between">
              <p className="text-sm">Gender :</p>
              <span className="text-sm text-left font-semibold w-6/12">
                {props.bedDetailsData.gender}
              </span>
            </div> */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold w-28">Department</p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left">
                  {props.bedDetailsData.department}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold w-28">Doctor </p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left">
                  {props.bedDetailsData.doctor}
                </span>
              </div>
            </div>

            {/* <div className="flex justify-between">
              <p className="text-sm">Patient Id :</p>
              <span className="text-sm text-left font-semibold w-6/12">
                {props.bedDetailsData.patientId}
              </span>
            </div> */}
            {/* <div className="flex justify-between">
              <p className="text-sm">Bed No :</p>
              <span className="text-sm text-left font-semibold w-6/12">
                {props.bedDetailsData.bedNo}
              </span>
            </div> */}
            <div className="flex  items-center gap-2">
              <p className="text-sm font-semibold w-28">Bed Category </p>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-sm text-left ">
                  {props.bedDetailsData.bedCategory}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BedDetails;
