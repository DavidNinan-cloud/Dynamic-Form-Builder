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
import Modal from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { blue } from "@mui/material/colors";
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

export default function CommonMasterTable(props) {
  console.log(props);
  const {
    tableApiFunc,
    searchString,
    dataResult,
    setDataResult,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
  } = props;

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [open, setOpen] = React.useState();

  //actions
  const [editAction, setEditAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  const [oldCount, setOldCount] = React.useState();

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

  const headers = removeHeaders(allHeaders, ["Id"]);
  // headers.unshift("#");
  // headers[0] = "#";

  const defaultParams = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
  };

  React.useEffect(() => {
    checkCallApi(page, rowsPerPage, oldCount);
  }, [page, rowsPerPage, oldCount]);

  const checkCallApi = (pageNo, rowsPerPageNo, oldTotal) => {
    pageNo = pageNo + 1;
    let newTotal = pageNo * rowsPerPageNo;
    console.log("oldTotal", oldTotal);
    console.log("newTotal", newTotal);

    let arr = [...dataResult];
    let totalDataLength = count;
    let availableDataLength = arr.length;
    if (totalDataLength > availableDataLength) {
      // page has moved forward
      console.log("page", pageNo);
      console.log("rowsPerPage", rowsPerPageNo);
      console.log("totalDataLength", totalDataLength);
      console.log("availableDataLength", availableDataLength);

      // if i dont have total record to show
      if (newTotal > availableDataLength) {
        //
        let require = newTotal - availableDataLength;
        let toShow = availableDataLength + require;

        // check available vs needed
        // needed is less than count
        let needed;
        if (toShow < totalDataLength) {
          needed = newTotal - oldTotal;
          callAgainTableApi(needed);
        } else if (toShow > totalDataLength) {
          needed = toShow - totalDataLength;
          callAgainTableApi(needed);
        } else {
          needed = rowsPerPageNo;
          callAgainTableApi(needed);
        }
      }
    }
  };
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

  const handlePageChange = (event, newPage) => {
    console.log("newPage", newPage);
    setOldCount((page + 1) * rowsPerPage);
    setPage(parseInt(newPage));
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setOldCount((page + 1) * rowsPerPage);
    let newRows = parseInt(event.target.value, 10);
    let newTotal = (page + 1) * newRows;
    let additionalRecord = newTotal - count;
    if (additionalRecord > newRows) {
      setPage(page - 1);
    }
    setRowsPerPage(newRows);
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
    <div className="w-auto grid">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ width: "100%", my: 2 }}>
          {/* pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={
              <>
                <span style={{ marginRight: "10px", color: "blue" }}>
                  <span>
                    <a href="#" onClick={props.DownloadTableData}>
                      Download Template
                    </a>
                  </span>
                  <span> | </span>

                  <span>
                    <label>
                      Import Data
                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={(e) => props.uploadExcelData(e)}
                      ></input>
                    </label>
                  </span>
                </span>
                <span>Rows Per Page:</span>
              </>
            }
          />
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
            <Table>
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
                      Actions
                    </span>
                  </TableCell>

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
                </TableRow>
              </TableHead>

              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(dataResult, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                  .map((row, index) => {
                    {
                    }
                    return (
                      <TableRow
                        key={index}
                        // onClick={(e) => {
                        // props.displayView(row, index);
                        // props.setOpen(true);
                        // props.editRow(row);
                        // }}
                        sx={{
                          "& td": {
                            paddingY: 0.5,
                          },
                        }}
                      >
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                              {editAction ? (
                                <Tooltip title="Edit">
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-blue-500 mr-1"
                                  >
                                    <DriveFileRenameOutlineIcon
                                      onClick={(e) => {
                                        props.setOpen(true);
                                        props.editRow(row);
                                      }}
                                    />
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}

                              {deleteAction ? (
                                <Tooltip title="Delete">
                                  <a
                                    href="##"
                                    className="text-red-500 mr-3"
                                    onClick={() => props.deleteRow(row)}
                                    // onClick={() => props.deleteRow(index)}
                                  >
                                    {<DeleteOutlineOutlinedIcon />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {confirmAction ? (
                                <Tooltip title="Confirm Appointment">
                                  <a
                                    href="##"
                                    className="text-green-800 mr-3"
                                    onClick={() => props.deleteRow(row)}
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
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap capitalize"
                              key={i}
                              // onClick={() => {
                              //   props.displayView(row, index);
                              // }}
                            >
                              {header.toLowerCase() === "status" ? (
                                row[header] === true ? (
                                  <button className="border border-green-800 text-center rounded px-5 text-green-800">
                                    Active
                                  </button>
                                ) : (
                                  <button className="border border-red-500 text-center rounded px-3 text-red-500">
                                    InActive
                                  </button>
                                )
                              ) : (
                                row[header]
                              )}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //table end */}
        </Paper>
      </Box>
    </div>
  );
}
