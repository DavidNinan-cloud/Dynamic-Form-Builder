import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

export default function EmployeeTable(props) {
  console.log("action array", props.data.actions);
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);

  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //actions
  const [editAction, setEditAction] = React.useState(false);
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

  //table start
  return (
    <>
      <div className="grid w-full">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ marginTop: "0.8rem" }} className="rounded ">
              <Table>
                <TableHead>
                  <TableRow>
                    
                  <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                    {/* <TableCell
                      sortDirection={orderBy === "Id" ? order : false}
                      className="whitespace-nowrap"
                      // key={index}
                    >
                      <TableSortLabel
                        active={false} //arrow for sorting
                        direction={orderBy === header ? order : "asc"}
                        onClick={createSortHandler(header)}
                      >
                        <span className="text-gray-600 font-bold"></span>
                        {orderBy === header ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell> */}

                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Sr No.
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Department Name
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold ">Units</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        IsClinical
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Status
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Created By
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Created Date
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Last Modified By
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Last Modified Date
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((department) => (
                    <TableRow>
                      {props.data.actions.length > 0 ? (
                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex">
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
                                    props.editRow(department);
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
                                  onClick={() => props.deleteRow(department)}
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
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </TableCell>
                      ) : (
                        ""
                      )}
                      <TableCell className="whitespace-nowrap">
                        {department.srNo}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.department.label}
                      </TableCell>
                      <TableCell sx={{ display:"flex",flexWrap:"wrap",gap:"5px", width:"175px" }}>
                        {department.units.map((unit) => (
                          <>
                            <span className="flex gap-2 flex-wrap border border-blue-500 text-center rounded px-2 text-blue-500   ">
                              {unit.label}
                            </span>
                          </>
                        ))}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.deptIsClinical}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.activeStatus === true ? (
                          <button className="border border-green-800 text-center rounded px-5 text-green-800">
                            Active
                          </button>
                        ) : (
                          <button className="border border-red-500 text-center rounded px-3 text-red-500">
                            Inactive
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.createdBy}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.createdDate}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.lastModifiedBy}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {department.lastModifiedDate}
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* //table end */}
            {/* pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.data.result.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </>
  );
}
