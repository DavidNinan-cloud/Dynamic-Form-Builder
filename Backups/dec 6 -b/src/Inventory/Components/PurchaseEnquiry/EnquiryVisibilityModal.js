import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import { getEnquiryVisibility } from "../../services/enquiry/EnquiryServices";

export default function EnquiryVisibilityModal(props) {
  const [visibleData, setVisibleData] = React.useState([]);

  React.useEffect(() => {
    callenquiryVisibleTableApi();
  }, [props.enquiryId])
  
  const callenquiryVisibleTableApi = (enquiryId) => {
    getEnquiryVisibility(enquiryId).then((response) => {
      console.log("Visiblity Response is", response.data);
      return response.data;
    }).then((res)=>{
      setVisibleData(res.result)
    })
  };
  return (
    <div className="w-full justify-center items-center rounded lg:px-0 mt-4">
      <Modal
        open={props.visiblityModal}
        close={props.handleVisibilityClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <div className="grid grid-cols-1 md:grid-cols-1  w-full">
            <CancelPresentationIconButton
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleVisibilityClose();
              }}
            />
          </div>
          <div className="">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2">
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-16 lg:space-x-10">
                  <span className="text-sm">Enquiry No</span>
                  <span className="">:</span>
                </h1>
                {/* <h1 className="font-normal">123</h1> */}
                <h1 className="font-normal">{props.enquiryInfo.enquiryNo}</h1>
              </div>
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-16 lg:space-x-10">
                  <span className="text-sm">Enquiry Date</span>
                  <span className="">:</span>
                </h1>
                {/* <h1 className="font-normal">123</h1> */}
                <h1 className="font-normal">{props.enquiryInfo.enquiryDate}</h1>
              </div>
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-16 lg:space-x-10">
                  <span className="text-sm">Supplier</span>
                  <span className="">:</span>
                </h1>
                <span className="px-2">
                  {props.enquiryInfo.suppliers &&
                    props.enquiryInfo.suppliers.map((eachSupp) => {
                      return (
                        <>
                          <h1 className="">{eachSupp.label + ","}</h1>
                        </>
                      );
                    })}
                </span>
              </div>
            </div>

            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <Paper sx={{ width: "100%", my: 1 }}>
                <TableContainer
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: 7,
                      height: 10,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#7393B3",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "lightBlue",
                    },
                  }}
                  className="rounded h-56"
                >
                  <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            Item Name
                          </span>
                        </TableCell>

                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            U.O.M.
                          </span>
                        </TableCell>

                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            Quantity
                          </span>
                        </TableCell>

                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            Total Quantity
                          </span>
                        </TableCell>

                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            Pack Size
                          </span>
                        </TableCell>

                        <TableCell
                          className="whitespace-nowrap"
                          style={{ background: "#F1F1F1" }}
                        >
                          <span className="text-gray-600 font-bold">
                            Remark
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {/* <TableBody>
                      {props.itemData.map((enquiry, index) => {
                      
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <a
                                href="##"
                                className="text-red-500 mr-3"
                                onClick={() => deleteRow(index)}
                              >
                                {<DeleteOutlineOutlinedIcon />}
                              </a>
                            </TableCell>

                            
                            <TableCell className="whitespace-nowrap">
                              {enquiry.itemMaster.label}
                            </TableCell>

                            <TableCell className="whitespace-nowrap">
                              {enquiry.uom}
                            </TableCell>

                            <TableCell className="whitespace-nowrap">
                              {enquiry.quantity}
                            </TableCell>

                            <TableCell className="whitespace-nowrap">
                              {enquiry.packSize}
                            </TableCell>

                            <TableCell className="whitespace-nowrap">
                              {enquiry.remark}
                            </TableCell>

                          </TableRow>
                        );
                      })}
                    </TableBody> */}
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
