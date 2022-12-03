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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

//main function
export default function CommonTableGroupList(props) {
  const schema = yup.object().shape({});
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);

  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //actions
  const [editAction, setEditAction] = React.useState(false);
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState(false);

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

  console.log(props.resultList);

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);
  // headers.unshift("#");
  // headers[0] = "#";
  console.log("# sign comes here", headers);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log("page value", page);
  console.log("rowsPerPage value", rowsPerPage);

  React.useEffect(() => {
    props.resultList.actions.forEach((action) => {
      if (action === "Upload") {
        //console.log("actions comes in action", props.resultList.actions);
        setFileUpload(true);
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
  console.log("actions array", props.resultList.actions);
  //table start
  return (
    <div className="w-auto grid">
      <Box sx={{ width: "100%", overflowY: "scroll", maxHeight: 300 }}>
        <Paper sx={{ width: "100%", my: 0 }}>
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
            className="rounded "
          >
            <Table
              sx={{
                border: 1,
                borderColor: "#e0e0e0",

                paddingY: "scroll",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {/* heading of table */}
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap"
                    >
                      <TableSortLabel
                        active={false}
                        direction={orderBy === header ? order : "asc"}
                        onClick={createSortHandler(header)}
                        key={index}
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
                    <span className="text-gray-600 font-bold whitespace-nowrap"></span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(
                  props.resultList.dataList,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                  .map((row, index) => {
                    console.log("value of row", row);
                    console.log("value of index", index);
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "& td": {
                            paddingY: 0.5,
                          },
                        }}
                      >
                        {headers &&
                          headers.map((header, index) => (
                            <TableCell className="whitespace-nowrap justify-center items-center p-0">
                              {row[header]}
                              {header === "ReScheduleDate" ? (
                                <div className="p-0 pl-10">
                                  <Checkbox
                                    className="p-0 "
                                    sx={{ padding: 0 }}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                              {header === "ReScheduleDate" ? (
                                <div className="p-0 text-sky-500 pl-10 cursor-pointer">
                                  <CalendarMonthIcon />
                                </div>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          ))}
                        {props.resultList.actions.length > 0 ? (
                          <TableCell className="px-2 flex whitespace-nowrap ">
                            <div className="flex">
                              {/* {displayActions(props.resultList.actions)} */}

                              {checkbox ? <input type="file" /> : ""}

                              {deleteAction ? (
                                <a
                                  href="##"
                                  className="text-red-500 mr-3"
                                  onClick={() => props.deleteRow()}
                                >
                                  {<DeleteOutlineOutlinedIcon />}
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
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
