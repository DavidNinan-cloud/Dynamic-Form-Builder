import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { CancelButton } from "../../../../Common Components/Buttons/CommonButtons";

const PatientInfoModal = (props) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-customBlue text-lg">Room No. : 101</div>
        <CancelPresentationIcon
          className="absolute right-5 top-4 text-red-600  rounded cursor-pointer"
          onClick={() => {
            props.handleTransferCloseModal();
          }}
        />
      </div>
      <hr className="border my-2 divide-x-8 border-slate-300" />

      {/* //Occupied and Selected Bed Info//  */}
      <div>
        <div className="grid grid-cols-2">
          <div className=" border-r-2 border-slate-400 mr-4">
            <p className="text-green-500 font-semibold mb-2">
              Selected Bed Information
            </p>
            <div className="grid grid-cols-2">
              <p>Bed No. </p>
              <p> 1011</p>
              <p>Ward No. </p>
              <p> W-10</p>
            </div>
            {/* //Buttons// */}
            <div className="flex mt-14">
              <button
                className="h-10 bg-red-500 text-white px-4 mx-2 rounded-md"
                onClick={() => props.handleTransferCloseModal()}
              >
                Cancel
              </button>
              <button
                className="h-10 bg-customBlue text-white px-4 mx-2 rounded-md"
                onClick={() => handleOpenConfirmation()}
              >
                Proceed
              </button>
            </div>
          </div>
          <div>
            <p className="text-orange-500 font-semibold mb-2">
              Occupied Bed Information
            </p>
            <div className="grid grid-cols-2">
              <p>Bed No.</p>
              <p> 1012</p>
              <p>Patient Name </p>
              <p>Rohit Patil</p>
              <p>Gender</p>
              <p> Male</p>
              <p>Age</p>
              <p>27</p>
            </div>
          </div>
        </div>
      </div>
      {/* //Selected Bed Info// */}

      <div className="mx-auto">
        <p className="text-green-500 font-semibold mb-2">
          Selected Bed Information
        </p>
        <div className="grid grid-cols-4 w-full">
          <p>Bed No. </p>
          <p> 1011</p>
          <p>Ward No. </p>
          <p> W-10</p>
        </div>
        {/* //Buttons// */}
        <div className="flex justify-center mt-8">
          <button
            className="h-10 bg-red-500 text-white px-4 mx-2 rounded-md"
            onClick={() => props.handleTransferCloseModal()}
          >
            Cancel
          </button>
          <button
            className="h-10 bg-customBlue text-white px-4 mx-2 rounded-md"
            onClick={() => handleOpenConfirmation()}
          >
            Proceed
          </button>
        </div>
      </div>

      <Modal
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <p className="my-3 tracking-wide font-bold  text-lg ">Confirmation</p>
          <div className=" justify-center align-middle">
            <p className="my-3 tracking-wide text-lg">
              Please Confirm to Transfer the Bed
            </p>
            <div className="mt-4 flex  justify-center space-x-6">
              <CancelButton
                onClick={() => {
                  handleCloseConfirmation();
                }}
              />
              <button
                type="button"
                className="h-10 px-3 text-sm font-medium  bg-customGreen text-white rounded "
                onClick={() => {
                  props.handleCloseTransfer();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientInfoModal;
