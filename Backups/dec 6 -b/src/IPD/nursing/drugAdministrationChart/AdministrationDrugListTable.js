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
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import DrugAdministratorOrderModal from "./DrugAdministratorDetailsModal";
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

const StyledCell = styled.div`
  &.AlternativeDayDrug {
    color: #0000c0 !important;
  }
  &.OnceInaWeekDrug {
    color: #008000 !important;
  }
  &.OutsideMedicines {
    color: #007ea9 !important;
  }
  &.PerHourDrug {
    color: #ff00ff !important;
  }
  &.StopDrug {
    color: #c00000 !important;
  }
`;

export default function AdministrationDrugList(props) {
  console.log("drugList", props.data);
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //actions

  const [stopAction, setStopAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [reScheduleAction, setReScheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  const [rowObj, setRowObj] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let requiredObj;

  React.useEffect(() => {
    if (rowObj !== "") {
      requiredObj = rowObj;
      console.log("row data is" + JSON.stringify(requiredObj));
    }
  }, [rowObj]);

  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowObj(row);
  };

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

  const headers = removeHeaders(allHeaders, [
    "Id",
    "PerHourDrug",
    "AlternativeDayDrug",
    "OnceInaWeekDrug",
    "OutsideMedicines",
    "StopDrug",
    "flag",
  ]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    console.log("actions are");
    console.log(props.data.actions);
    props.data.actions.forEach((action) => {
      if (action === "Stop") {
        setStopAction(true);
      }
      if (action === "Confirm") {
        setconfirmAction(true);
      }
      if (action === "ReSchedule") {
        setReScheduleAction(true);
      }
      if (action === "Cancel") {
        setcancelAction(true);
      }
    });
  }, []);

  React.useEffect(() => {
    console.log("props.data is ");
    console.log(props.data);
  }, [props.data]);

  function getCssClass(value) {
    console.log(props.data.result[value].StopDrug);
    if (props.data.result[value].PerHourDrug) return "PerHourDrug";
    else if (props.data.result[value].OutsideMedicines)
      return "OutsideMedicines";
    else if (props.data.result[value].OnceInaWeekDrug) return "OnceInaWeekDrug";
    else if (props.data.result[value].AlternativeDayDrug)
      return "AlternativeDayDrug";
    else if (props.data.result[value].StopDrug) return "StopDrug";
  }
  //table start
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%" }}>
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
              className="rounded h-auto"
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.data.result.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow
                    onClick={() => {
                      handleClick(index, row);
                      handleOpen();
                    }}
                  >
                    {/* heading of table */}
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
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
                          {props.data.actions.length > 0 ? (
                            <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                              <div className="flex">
                                {/* {displayActions(props.data.actions)} */}
                                {stopAction ? (
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-red-500 mr-3"
                                  >
                                    <DoDisturbIcon
                                      onClick={(e) => {
                                        props.printRow(row);
                                        handleClick(index, row);
                                      }}
                                      style={{
                                        visibility: row.StopDrug
                                          ? "hidden"
                                          : "",
                                      }}
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}

                                {reScheduleAction ? (
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-customBlue mr-3"
                                  >
                                    <CalendarMonthIcon
                                    //   onClick={() => props.deleteRow(row)}
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
                          {headers &&
                            headers.map((header) => (
                              <TableCell
                                className="whitespace-nowrap"
                                onClick={() => {
                                  handleClick(index, row);
                                  handleOpen();
                                }}
                                style={{
                                  backgroundColor:
                                    rowObj === index ? "#FFC44B" : "",
                                }}
                              >
                                <StyledCell
                                  className={getCssClass(index, header)}
                                  style={{
                                    textDecoration: row.StopDrug
                                      ? "line-through"
                                      : "",
                                  }}
                                >
                                  {row[header]}
                                </StyledCell>
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
        <div>
          <DrugAdministratorOrderModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
}
