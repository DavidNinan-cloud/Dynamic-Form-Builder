import * as React from "react";
import bed from "../../../../OPD/assets/Images/bed.svg";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { createSearchParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";

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

export default function AdmissionListTable(props) {
  console.log("PatientInfo", props);
  const {
    tableApiFunc,
    searchString,
    dataResult,
    setDataResult,
    data,
    setData,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    // setSendDefaultParams,
    // senddefaultParams,
    count,
  } = props;
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  // const [page, setPage] = React.useState(0);
  // const [open, setOpen] = React.useState();
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //actions
  const [editAction, setEditAction] = React.useState(true);
  const [viewAction, setViewAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);
  const [oldCount, setOldCount] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  const navigate = useNavigate();

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
    setSpinner(true);
    tableApiFunc(defaultParams)
      .then((response) => {
        let incomingData = response.data.result;
        let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded));

        // append needed data
        let existData = [...dataResult];
        for (let value of onlyNeededData) {
          existData.push(value);
        }
        setDataResult(existData);
        showSpinner(false);
      })

      .catch(() => {
        setSpinner(false);
      });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["id"]);
  // headers.unshift("#");
  // headers[0] = "#";

  const handlePageChange = (event, newPage) => {
    console.log("newPage", newPage);
    setOldCount((page + 1) * rowsPerPage);
    setPage(newPage);
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
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // React.useEffect(() => {
  //   props.data.privileges.forEach((action) => {
  //     if (action.permission === "Edit") {
  //       setEditAction(true);
  //     } else {
  //       setEditAction(false);
  //     }
  //     if (action.permission === "View") {
  //       setViewAction(true);
  //     } else {
  //       setViewAction(false);
  //     }
  //     if (action.permission === "Delete") {
  //       setDeleteAction(true);
  //     } else {
  //       setDeleteAction(false);
  //     }
  //     if (action.permission === "Confirm") {
  //       setconfirmAction(true);
  //     } else {
  //       setconfirmAction(false);
  //     }
  //     if (action.permission === "Reschedule") {
  //       setrescheduleAction(true);
  //     } else {
  //       setrescheduleAction(false);
  //     }
  //     if (action.permission === "Cancel") {
  //       setcancelAction(true);
  //     } else {
  //       setcancelAction(false);
  //     }
  //   });
  // }, []);

  //Handle Bed Transfer
  const handleBedTransfer = (bedInfo) => {
    console.log("Bed Info", bedInfo);
    const params = {
      age: bedInfo.age,
      bedNo: bedInfo.bedNo,
      department: bedInfo.department,
      doctor: bedInfo.doctor,
      gender: bedInfo.gender,
      patientId: bedInfo.patientId,
      patientName: bedInfo.patientName,
      patientVisitId: bedInfo.patientVisitId,
      uhid: bedInfo.uhid,
    };
    navigate("/ipd/bedtransfer", { state: params });
  };

  //table start
  return (
    <div className="lg:w-[100%] mx-auto md:w-[100%] -ml-0.5 lg:ml-0 w-[95%] mt-4">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* pagination */}
          {/* <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <TableContainer className="rounded ">
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {/* {props.data.privileges.length > 0 ? (
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  ) : (
                    ""
                  )} */}
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
                {spinner ? (
                  <div className="flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataResult, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ) //splice use for show rows upto 5 when splice is not use that time show all rows
                      .map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                            onClick={(e) => {
                              //   props.viewModal(row, index);
                              //   props.setOpen(true);
                              //   props.editRow(row);
                            }}
                          >
                            {/* {props.data.privileges.length > 0 ? (
                              <TableCell>
                                <div className="flex justify-evenly">
                                  {viewAction === true ? (
                                    <VisibilityIcon
                                      className="text-sky-700 hover:cursor-pointer"
                                      onClick={() => {
                                        handleView(row);
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {editAction === true ? (
                                    <DriveFileRenameOutlineIcon
                                      className="text-sky-700 hover:cursor-pointer"
                                      onClick={() => {
                                        handleEditForm(row);
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </TableCell>
                            ) : (
                              ""
                            )} */}

                            <TableCell>
                              <div className="flex justify-evenly">
                                <Tooltip
                                  title="Bed Transform"
                                  arrow
                                  placement="left"
                                >
                                  <button
                                    onClick={() => handleBedTransfer(row)}
                                  >
                                    <img
                                      className="h-5 rounded-sm hover:cursor-pointer"
                                      src={bed}
                                      alt=""
                                    />
                                  </button>
                                </Tooltip>
                              </div>
                            </TableCell>

                            {headers &&
                              headers.map((header, i) => (
                                <TableCell
                                  className="whitespace-nowrap"
                                  key={i}
                                >
                                  {row[header]}
                                </TableCell>
                              ))}
                          </TableRow>
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //table end */}
        </Paper>
      </Box>
    </div>
  );
}
