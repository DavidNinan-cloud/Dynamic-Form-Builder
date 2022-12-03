import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// import profile from "../../../../Common Components/profile.svg";
import { Divider, makeStyles } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// function randomColor() {
//   let hex = Math.floor(Math.random() * 0xffffff);
//   let color = "#" + hex.toString(16);
//   return color;
// }

function GeneralProfile(props) {
  console.log("Email", props.patientInfo);
  // let { patientInfo } = props;

  return (
    <>
      {typeof props.patientInfo !== "undefined" ? (
        <div className="flex justify-between border shadow-md p-2 my-2 bg-gray-100 ml-3">
          {/* <div className="w-full justify-between flex items-center text-sm xl:text-base md:space-x-0 xl:space-x-3 2xl:space-x-5 ml-2"> */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-0 lg:gap-2 w-full ">
            {/* //Profile Pic and Name// */}
            <div className="flex justify-between">
              <div className="flex items-center space-x-3 mr-4">
                {/* <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 68, height: 68 }}
                src={patientinfo.profileimg}
              />
            
            </Stack> */}
                <Avatar
                  alt="No Image"
                  src={props.patientInfo.patientImagePath}
                  style={{
                    // backgroundColor: randomColor(),
                    backgroundColor: "darkblue",
                  }}
                >
                  {props.patientInfo.patientName.charAt(0).toLocaleUpperCase()}
                </Avatar>
                <div className="text-sm text-slate-600">
                  <h1>{props.patientInfo.patientName}</h1>
                  <h1 className="text-slate-400 flex items-center space-x-2">
                    <span>
                      {/* <LocationOnIcon className="text-customBlue" /> */}
                    </span>
                    {/* <span>{patientInfo.location}</span> */}
                  </h1>
                </div>
              </div>
              <Divider
                sx={{ height: 70, paddingLeft: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
            </div>
            {/* //Gender and Marital Status// */}
            <div className="flex justify-between">
              <div className="text-sm pl-2 mx-auto text-slate-600 my-auto">
                <h1 className="flex space-x-1 ">
                  <span className="font-bold">Gender :</span>
                  <span className="capitalize">{props.patientInfo.gender}</span>
                </h1>
                {props.patientInfo.maritalStatus !== null ? (
                  <h1 className="flex space-x-2">
                    <span className="font-bold">Marital Status :</span>
                    <span>{props.patientInfo.maritalStatus}</span>
                  </h1>
                ) : null}
              </div>
              <Divider
                sx={{ height: 70, paddingLeft: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
            </div>
            {/* //DOB and Age// */}
            <div className="flex justify-between lg:col-span-2">
              <div className="text-sm mx-auto pl-2 text-slate-600 my-auto">
                <h1 className="flex space-x-1">
                  <span className="font-bold">DOB :</span>
                  <span>{props.patientInfo.birthDate}</span>
                </h1>
                <h1 className="flex space-x-1">
                  <span className="whitespace-nowrap font-bold">Age :</span>
                  <span>{props.patientInfo.age}</span>
                </h1>
              </div>
              <Divider
                sx={{ height: 70, paddingLeft: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
            </div>
            {/* //UHID// */}
            <div className="flex justify-between">
              <div className="text-sm mx-auto text-slate-600 my-auto">
                <h1 className="flex space-x-2">
                  <span className="font-bold">UHID:</span>
                  <span>{props.patientInfo.uhid}</span>
                </h1>
                {/* <h1 className="flex space-x-2">
                  <span>Category :</span>
                  <span>{patientinfo.category}</span>
                </h1> */}
              </div>
              <div className="">
                <Divider
                  sx={{ height: 70, paddingLeft: 1 }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
              </div>
            </div>
            {/* //Phone and Email// */}
            <div className="text-sm pl-2 mx-auto text-slate-600 my-auto">
              <h1 className="flex items-center space-x-2">
                <span>
                  <PhoneIcon className="text-customBlue " /> :
                </span>
                <span>{props.patientInfo.mobile}</span>
              </h1>
              {props.patientInfo.email !== null ? (
                <h1 className="flex items-center space-x-2 overflow-x-hidden">
                  <span className="flex">
                    <EmailIcon className="text-customBlue " /> :
                  </span>
                  <span className="truncate w-40">
                    {props.patientInfo.email}
                  </span>
                </h1>
              ) : null}
            </div>
          </div>
          {/* </div> */}
        </div>
      ) : (
        <div className="flex justify-center border shadow-md p-2 my-2 ml-2 rounded-md bg-white">
          <p className="text-center my-4 text-sm  tracking-wider">
            Patient Details are Not Available
          </p>
        </div>
      )}
    </>
  );
}

export default GeneralProfile;
