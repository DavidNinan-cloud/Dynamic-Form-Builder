import React, { useEffect, useState } from "react";
import Female from "../../bedallowcation/assets/Female.svg";
import Male from "../../bedallowcation/assets/Male.svg";
import bed from "../../bedallowcation/assets/bed.svg";
import ac from "../../bedallowcation/assets/ac.svg";
import nonac from "../../bedallowcation/assets/nonac.svg";
import tv from "../../bedallowcation/assets/tv.svg";
import Emptybed from "../../bedallowcation/assets/Emptybed.svg";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ChildPatient from "../../bedallowcation/assets/ChildPatient.svg";
import DischargePatient from "../../bedallowcation/assets/DischargePatient.svg";
import AdmitPatient from "../../bedallowcation/assets/AdmitPatient.svg";
import { baseUrl } from "../../../http-common";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import PatientInfoModal from "./PatientInfoModal";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

function BedAllocation(props) {
  console.log("Bed Props", props.bedListData);

  //state variable to open the confirmation modal for POST request
  const [openTransferModal, setOpenTransferModal] = React.useState(false);
  const [bedData, setBedData] = React.useState([]);
  const [bedDetails, setBedDetails] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.bedListData !== null) {
      setBedData(props.bedListData);
    }
  }, [props]);

  //state variable to open the confirmation modal for bed add request
  const handelTransferOpenModal = (bedDetails) => {
    console.log(
      "Confirmation modal for post request has been opened",
      bedDetails
    );
    setOpenTransferModal(true);
    setBedDetails(bedDetails);
  };
  //state variable to close the confirmation modal for bed  request
  const handleTransferCloseModal = () => {
    // if (openModal) {
    setOpenTransferModal(false);
    // }
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
    // navigate("/ipd/admission", { state: params });
    setOpenTransferModal(false);
    props.handleCloseTransfer();
  }
  //
  const handleClick = (value) => {
    console.log("Values:", value);

    value.allocatedflag === false ? handelTransferOpenModal(value) : null;
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

      <Modal
        open={openTransferModal}
        onClose={handleTransferCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "white",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <PatientInfoModal
            handleTransferCloseModal={handleTransferCloseModal}
            handleCloseTransfer={props.handleCloseTransfer}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default BedAllocation;
