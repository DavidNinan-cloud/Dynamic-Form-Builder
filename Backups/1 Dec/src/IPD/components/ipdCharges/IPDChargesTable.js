import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function CommonTable(props) {
  // console.log("Props", props);

  const [deleteAction, setDeleteAction] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);
  //state varibale for the table

  React.useEffect(() => {
    if (props.actions) {
      props.actions.forEach((action) => {
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
    }
  }, []);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data[0]);

  const headers = removeHeaders(allHeaders, ["Id", "doctorId", "serviceId"]);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 1 }}>
            <TableContainer className="rounded lg:h-44 2xl:h-44 border">
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell> */}
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
                  {props.data.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {props.actions && props.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                              {editAction ? (
                                <button className="text-blue-500 mr-1">
                                  <DriveFileRenameOutlineIcon
                                    fontSize="small"
                                    onClick={(e) => {
                                      // props.setOpen(true);
                                      // props.editRow(row, index);
                                    }}
                                  />
                                </button>
                              ) : (
                                ""
                              )}

                              {deleteAction ? (
                                <button
                                  className="text-red-500 mr-3"
                                  onClick={() => props.deleteRow(index)}
                                >
                                  {
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                  }
                                </button>
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
                            <>
                              {row[header] !== null ? (
                                <TableCell
                                  className="whitespace-nowrap"
                                  
                                  onClick={() => {
                                    props.displayView(row, index);
                                  }}
                                >
                                  {row[header]}
                                </TableCell>
                              ) : (
                                <TableCell
                                  className="whitespace-nowrap"
                                  key={i}
                                  onClick={() => {
                                    props.displayView(row, index);
                                  }}
                                >
                                  -
                                </TableCell>
                              )}
                            </>
                          ))}
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
