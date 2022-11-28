import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
//set descending sort order
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//set sort desc
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function NoApiCommonMasterTable(props) {
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);

  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //actions
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["id"]);
  // headers.unshift("#");
  // headers[0] = "#";

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
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

  //table start
  return (
    <>
      <div className="grid w-[100%]">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ marginTop: "0.8rem" }} className="rounded ">
              <Table>
                <TableHead>
                  <TableRow>
                    {/* heading of table */}
                    {headers.map((header, index) => (
                      <TableCell
                        sortDirection={orderBy === header ? order : false}
                        className="whitespace-nowrap"
                        key={index}
                      >
                        <TableSortLabel
                          active={false} //arrow for sorting
                          direction={orderBy === header ? order : "asc"}
                          onClick={createSortHandler(header)}
                        >
                          <span className="text-gray-600 font-bold">
                            {header}
                          </span>
                          {orderBy === header ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(props.data.result, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not
                    // use that time show all rows
                    .map((row, index) => {
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