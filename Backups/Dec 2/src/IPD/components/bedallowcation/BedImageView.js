import React, { useEffect, useState } from "react";
import Female from "./assets/Female.svg";
import Male from "./assets/Male.svg";
import bed from "./assets/bed.svg";
import ac from "./assets/ac.svg";
import ConfirmationModal from "../../../master/components/common/formfields/ConfirmationModal";
import nonac from "./assets/nonac.svg";
import tv from "./assets/tv.svg";
import Emptybed from "./assets/Emptybed.svg";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ChildPatient from "./assets/ChildPatient.svg";
import DischargePatient from "./assets/DischargePatient.svg";
import AdmitPatient from "./assets/AdmitPatient.svg";
import { baseUrl } from "../../http-common";
import { useNavigate } from "react-router-dom";
import PatientInfoModal from "../bedtransfer/bedselection/PatientInfoModal";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const data = [
  {
    id: 1,
    roomNo: 12345,
    bedNo: 2355,
    active: true,
    image: Emptybed,
    bedImage: bed,
    tvImage: tv,
    acImage: ac,
    class: "Semi Pvt",
    department: "Medicine",
  },
  {
    id: 2,
    roomNo: 5345,
    bedNo: 1355,
    active: false,
    image: Male,
    bedImage: bed,
    tvImage: tv,
    acImage: ac,
    class: "Semi Pvt",
    department: "Medicine",
  },
  {
    id: 3,
    roomNo: 12345,
    bedNo: 2355,
    active: true,
    image: Emptybed,
    bedImage: bed,
    tvImage: tv,
    acImage: ac,
    class: "Semi Pvt",
    department: "Medicine",
  },
  {
    id: 4,
    roomNo: 12345,
    bedNo: 2355,
    active: false,
    image: Male,
    bedImage: bed,
    tvImage: tv,
    acImage: ac,
    class: "Semi Pvt",
    department: "Medicine",
  },
  {
    id: 5,
    roomNo: 32345,
    bedNo: 5355,
    active: false,
    image: Female,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Medicine",
  },
  {
    id: 6,
    roomNo: 32345,
    bedNo: 5355,
    active: false,
    image: Female,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 7,
    roomNo: 32345,
    bedNo: 5355,
    active: false,
    image: Female,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 8,
    roomNo: 32345,
    bedNo: 5355,
    active: false,
    image: Female,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 9,
    roomNo: 32345,
    bedNo: 5355,
    active: true,
    image: Emptybed,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 10,
    roomNo: 32345,
    bedNo: 5355,
    active: true,
    image: Emptybed,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 11,
    roomNo: 32345,
    bedNo: 5355,
    active: false,
    image: ChildPatient,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 12,
    roomNo: 30085,
    bedNo: 5355,
    active: true,
    image: AdmitPatient,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
  {
    id: 13,
    roomNo: 32345,
    bedNo: 5355,
    active: true,
    gender: "Male",
    image: DischargePatient,
    bedImage: bed,
    tvImage: tv,
    acImage: nonac,
    class: "Pvt",
    department: "Pediatric",
  },
];

function BedImageView(props) {
  console.log("Bed Props", props.bedListData);

  //state variable to open the confirmation modal for POST request
  const [openModal, setOpenModal] = React.useState(false);
  const [bedData, setBedData] = React.useState([]);
  const [bedDetails, setBedDetails] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.bedListData !== null) {
      setBedData(props.bedListData);
    }
  }, [props]);

  //state variable to open the confirmation modal for bed add request
  const handelOpenModal = (bedDetails) => {
    console.log(
      "Confirmation modal for post request has been opened",
      bedDetails
    );
    setOpenModal(true);
    setBedDetails(bedDetails);
  };
  //state variable to close the confirmation modal for bed  request
  const handleCloseModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  //event listener function for the Add button on the modal form
  function addRecord(bedDetails) {
    console.log("A new bed  has been added", bedDetails);
    //handleSubmit of React hook forms can be invoked remotely as well
    const params = {
      room: bedDetails.room,
      bedNo: bedDetails.bedcode,
      bedId: bedDetails.bedid,
      ward: bedDetails.ward,
      floors: bedDetails.floors,
      block: bedDetails.block,
      bedcategory: bedDetails.bedcategory,
    };
    navigate("/ipd/admission", { state: params });
    setOpenModal(false);
    props.handleClose();
  }
  //
  const handleClick = (value) => {
    // console.log(`${value}`);
    value.allocatedflag === false ? handelOpenModal(value) : null;
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="top" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "black",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  return (
    <div className="overflow-hidden w-full">
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 px-5  mt-2 w-full">
        {bedData.map((item) => {
          console.log("Item");
          return (
            <div className="w-full">
              <button
                className="w-full"
                type="button"
                onClick={() => {
                  // handelOpenModal(item.Allocated ? Allocated : "");
                  handleClick(item);
                }}
              >
                <div className="bg-white border shadow rounded-lg w-full transform transition duration-500 hover:scale-110 ">
                  <div className="flex px-1 items-center justify-between font-semibold space-x-3 w-full pt-2">
                    <div className="border border-customBlue rounded flex space-x-2 text-sm text-customBlue px-2">
                      <img src={bed} />
                      <span className="border-l border-customBlue"> </span>
                      <p>{item.bedcode}</p>
                    </div>
                    <div>
                      <p
                        className={`${
                          item.allocatedflag
                            ? "w-3 h-3 rounded-full bg-red-600"
                            : "w-3 h-3 rounded-full bg-green-600"
                        }`}
                      ></p>
                    </div>
                  </div>
                  <div className="flex justify-center ">
                    <div>
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <div className="grid gap-2 text-sm bg-black p-2 rounded-md">
                              <div className="flex space-x-2 font-semibold ">
                                <h2 className="text-white ">Department :</h2>
                                <p>{item.department}</p>
                              </div>
                              <div className="flex space-x-2 justify-center border border-customBlue rounded  w-20">
                                <h1 className="text-customBlue flex justify-center">
                                  AC{" "}
                                </h1>
                                <span className="border-l border-customBlue"></span>
                                <img
                                  className="flex justify-center"
                                  src={item.acImage}
                                />
                              </div>
                              <div className="flex space-x-2 border border-customBlue rounded justify-center w-20">
                                <h1 className="text-customBlue flex justify-center">
                                  TV{" "}
                                </h1>
                                <span className="border-l border-customBlue"></span>
                                <img
                                  className=" flex justify-center"
                                  src={item.tvImage}
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        }
                      >
                        <button className="">
                          <img
                            style={{ height: "120px" }}
                            src={`${baseUrl}/file${item.bedimagepath}`}
                            // srcSet={`${baseUrl}/file${item.BedImagePath}`}
                          />
                        </button>
                      </HtmlTooltip>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-200 py-1 px-2 text-sm leading-6 ">
                    <div className="flex space-x-2 justify-between ">
                      <div className="flex space-x-2">
                        <h2 className="text-customBlue"> Class :</h2>
                        <p>{item.bedcategory.label}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 justify-between">
                      <div className="flex space-x-2 ">
                        <h1 className="text-customBlue">Room :</h1>
                        <h1>{item.room.label}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      <ConfirmationModal
        confirmationOpen={openModal}
        confirmationHandleClose={handleCloseModal}
        confirmationSubmitFunc={() => addRecord(bedDetails)}
        confirmationLabel="Confirmation"
        confirmationMsg="Click to add this bed ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}

export default BedImageView;
