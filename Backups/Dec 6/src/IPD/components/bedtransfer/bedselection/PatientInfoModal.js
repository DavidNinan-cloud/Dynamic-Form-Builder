import { Modal, Table, TableCell, TableHead, TableRow } from "@mui/material";
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
      <div className="mb-1 flex justify-between">
        <h1 className="text-lg font-semibold">Bed Information</h1>
        <div className="-mt-2">
          <CancelPresentationIcon
            className="text-red-600  rounded cursor-pointer"
            onClick={() => {
              props.handleTransferCloseModal();
            }}
          />
        </div>
      </div>
      <div className="flex justify-between border shadow-md p-2 my-2 bg-gray-100 ml-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold w-28">Room No </p>
          <div className="flex space-x-2 items-center">
            <span>:</span>
            <span className="text-sm text-left">101</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold w-28">Ward No </p>
          <div className="flex space-x-2 items-center">
            <span>:</span>
            <span className="text-sm text-left">W-01</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Selected Bed No.</p>
          <div className="flex space-x-2 items-center">
            <span>:</span>
            <span className="text-sm text-left">1041</span>
          </div>
        </div>
      </div>

      {/* //Occupied Bed Info// */}
      <div className="my-4">
        <h1 className="text-lg font-semibold">Occupied Bed Info</h1>
        <div>
          <div className="w-full h-60 mt-4 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
            <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Bed No.
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Patient Name
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Gender
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Age
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default PatientInfoModal;
