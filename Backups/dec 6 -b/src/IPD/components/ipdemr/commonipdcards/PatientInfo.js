import React from "react";

const PatientInfo = () => {
  return (
    <div className="border shadow-md p-2 my-2 bg-gray-100 ml-3">
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-y-4 mx-4">
        <div className="flex justify-between w-8/12">
          <p className="font-bold text-sm">Patient Name</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm"> Mr. Rohit R. Patil</p>

        <div className="flex justify-between w-8/12">
          <p className="font-bold text-sm">UHID</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm">RP/2022/000180</p>

        <div className="flex justify-between w-8/12 lg:w-9/12">
          <p className="font-bold text-sm">Age</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm">55 Years 0 months 0 days</p>

        <div className="flex justify-between w-8/12">
          <p className="font-bold text-sm">Gender</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm"> Male</p>

        <div className="flex justify-between w-8/12">
          <p className="font-bold text-sm">Bed No.</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm">110</p>

        <div className="flex justify-between w-8/12 lg:w-9/12">
          <p className="font-bold text-sm">Arrival Date & Time</p>
          <p className="font-bold text-sm">:</p>
        </div>
        <p className="text-sm">18/11/2022, 12:11 PM</p>
      </div>
    </div>
  );
};

export default PatientInfo;
