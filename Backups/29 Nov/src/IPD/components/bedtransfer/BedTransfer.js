import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import BedDetails from "./BedDetails";
import BedChangeModal from "./bedselection/BedChangeModal";
import BedTransferHistory from "./BedTransferHistory";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const BedTransfer = () => {
  const [openTransferBed, setOpenTransferBed] = React.useState(false);
  const handleOpenTransfer = () => setOpenTransferBed(true);
  const handleCloseTransfer = () => setOpenTransferBed(false);
  let location = useLocation();
  let bedDetailsData = location.state;
  console.log("Location", bedDetailsData);
  return (
    <div className="mt-16">
      <p className="text-center text-2xl my-4 text-gray-700  font-Poppins">
        Bed Transfer
      </p>
      <div className="flex justify-between mr-6 mb-2">
        <div className="flex ml-8 w-9/12 lg:w-6/12">
          <SearchBar
            type="button"
            name="searchableSelect"
            placeholder="Search by Patient Name Mobile No."
            isSearchable={true}
            // handleInputChange={handleInputChange}
            // onChange={(e) => {
            //   console.log("MobileNo.", e);
            //   if (e !== null) {
            //     inputSearchid = e.mobileNumber;
            //     console.log("inputSearchid", inputSearchid);
            //     // setSelectedSearchKey(e.mobileNumber);
            //   } else {
            //     inputSearchid = "";
            //     setSearchString(inputSearchid);
            //     setPage(0);
            //   }
            // }}
            // dataArray={list}
          />
          <button
            className="border border-gray-500 rounded-md h-[2.3rem] ml-5 w-16 cursor-pointer p-1"
            onClick={(e) => {
              console.log("inputSearchid", inputSearchid);
              setSearchString(inputSearchid);
              setPage(0);
            }}
          >
            <SearchRoundedIcon />
          </button>
        </div>

        <button
          className="h-10 bg-customBlue px-2 rounded-sm text-white"
          onClick={handleOpenTransfer}
        >
          Transfer Bed
        </button>
      </div>
      <BedDetails bedDetailsData={bedDetailsData} />
      <BedTransferHistory />

      <Modal
        open={openTransferBed}
        onClose={handleCloseTransfer}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "100vh",
            bgcolor: "white",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <BedChangeModal
            handleOpenTransfer={handleOpenTransfer}
            handleCloseTransfer={handleCloseTransfer}
            openTransferBed={openTransferBed}
            setOpenTransferBed={setOpenTransferBed}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default BedTransfer;
