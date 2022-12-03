import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import CalenderMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { TextField, Tooltip } from "@mui/material";
import { CalendarMonth, Cancel, Print } from "@mui/icons-material";
import FileInfo from "../Assets/FileInfo.svg"
import OTDetailsModal from "../components/OTDetailsModal";

export default function PurchaseTable(props) {
  const { tableApiFunc, searchString, dataResult, setDataResult } = props;

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  //actions
  const [printAction, setPrintAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [consentFor, setConsentFor] = React.useState(true);
  const [viewfile, setViewFile] = React.useState(true);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const callAgainTableApi = (recordsNeeded) => {
    console.log("defaultParams", defaultParams);
    tableApiFunc(defaultParams)
      .then((response) => response.data)
      .then((res) => {
        let incomingData = res.result;
        let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded));

        // append needed data
        let existData = [...dataResult];
        for (let value of onlyNeededData) {
          existData.push(value);
        }
        setDataResult(existData);
      });
  };

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
      if (action === "Print") {
        setPrintAction(true);
      }
      if (action === "Delete") {
        setDeleteAction(true);
      }
      if (action === "ChooseFile") {
        setConsentFor(true);
      }
      if (action === "ViewFile") {
        setViewFile(true);
      }
      if (action === "Reschedule") {
        setrescheduleAction(true);
      }
      if (action === "Cancel") {
        setcancelAction(true);
      }
    });
  }, []);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  return (
    <>
      <div className="grid w-auto">
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
              className="rounded"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell>

                    {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap">
                            <div className="flex">
                              {confirmAction ? (
                                <Tooltip title="Confirm Appointment">
                                  <a
                                    href="##"
                                    className="text-green-800 mr-3"
                                    // onClick={() => props.deleteRow(row)}
                                  >
                                    {<CheckCircleIcon />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {rescheduleAction ? (
                                <Tooltip title="Reschedule Appointment">
                                  <a
                                    href="##"
                                    className="text-blue-500 mr-3"
                                    // onClick={() => props.deleteRow()}
                                  >
                                    {<CalendarMonth />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {printAction ? (
                                <Tooltip title="Print Appointment">
                                  <a
                                    href="##"
                                    className="text-orange-500 mr-3"
                                    // onClick={() => props.deleteRow()}
                                  >
                                    {<Print />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {cancelAction ? (
                                <div className="flex items-center space-x-1">
                                  <Tooltip title="Canel Appointment">
                                    <a
                                      href="##"
                                      className="text-red-500 mr-3"
                                      // onClick={() => props.deleteRow()}
                                    >
                                      <Cancel />
                                    </a>
                                  </Tooltip>

                                  {/* <img
                                    
                                    alt="reschedule"
                                    src={user1}
                                    className="h-10 w-10 rounded-md"
                                  /> */}
                                </div>
                              ) : (
                                ""
                              )}
                              {viewfile ? (
                                <Tooltip title="View Appointment">
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-[#29a8da] mr-1"
                                  >
                                    <img
                                    src={FileInfo}
                                     onClick={() => {
                                      handleOpen();
                                    }}
                                    />
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap flex text-center"
                              key={i}
                              onClick={() => {
                                props.displayView(row, index);
                              }}
                            >
                              {row[header]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <OTDetailsModal
         openModal={openModal}
         setOpenModal={setOpenModal}
         handleOpen={handleOpen}
         handleClose={handleClose}
        />
      </div>
    </>
  );
}
