import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CommonTable(props) {
  //state varibale for the table
  //actions
  const [editAction, setEditAction] = React.useState(false);
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
      if (action === "Edit") {
        setEditAction(true);
      }
      if (action === "Delete") {
        setDeleteAction(true);
      }
      if (action === "Confirm") {
        setconfirmAction(true);
      }
      if (action === "Reschedule") {
        setrescheduleAction(true);
      }
      if (action === "Cancel") {
        setcancelAction(true);
      }
    });
  }, []);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 2 }}>
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
              className="rounded h-56 2xl:h-auto"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
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
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              onClick={() => {
                                props.displayView(row, index);
                              }}
                            >
                              {row[header]}
                            </TableCell>
                          ))}
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                              {/* {displayActions(props.data.actions)} */}

                              {editAction ? (
                                <a
                                  href="##"
                                  value="click"
                                  className="text-blue-500 mr-1"
                                >
                                  {/* eidttext - toggle to button edit to save */}
                                  <DriveFileRenameOutlineIcon
                                    onClick={(e) => {
                                      props.setOpen(true);
                                      props.editRow(row);
                                    }}
                                  />
                                </a>
                              ) : (
                                ""
                              )}

                              {deleteAction ? (
                                <a
                                  href="##"
                                  value="click"
                                  className="text-red-500 mr-3"
                                >
                                  <DeleteOutlineOutlinedIcon
                                    onClick={() => props.deleteRow(row)}
                                  />
                                </a>
                              ) : (
                                ""
                              )}
                              {confirmAction ? (
                                <Tooltip title="Confirm Appointment">
                                  <a
                                    href="##"
                                    className="text-green-800 mr-3"
                                    onClick={() => props.deleteRow()}
                                  >
                                    {<CheckCircleIcon />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {confirmAction ? (
                                <Tooltip title="Reschedule Appointment">
                                  <a
                                    href="##"
                                    className="text-blue-500 mr-3"
                                    onClick={() => props.deleteRow()}
                                  >
                                    {<CalendarMonthIcon />}
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
                                      onClick={() => props.deleteRow()}
                                    >
                                      <CancelIcon />
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
                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
