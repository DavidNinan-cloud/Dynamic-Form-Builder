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
import { FaRegCalendarAlt, FaBarcode } from "react-icons/fa";
import { visuallyHidden } from "@mui/utils";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import PrintIcon from "@mui/icons-material/Print";

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

export default function SelectionCommonMasterTable(props) {
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
    selected,
    setSelected,
    selectedObj,
    setSelectedObj,
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

  const headers = removeHeaders(allHeaders, [
    "OrderId",
    "UHID",
    "SampleNo",
    "SampleStatus",
  ]);
  // headers.unshift("#");
  // headers[0] = "#";

  const defaultParams = {
    category: null,
    fromDate: null,
    fromOrderNo: null,
    page: page,
    // patientType: null,
    opdIpd: null,
    sampleStatus: null,
    searchString: "",
    patientId: searchString,
    size: rowsPerPage,
    testTypeId: null,
    toDate: null,
    toOrderNo: null,
    unitId: null,
  };

  // React.useEffect(() => {
  //   checkCallApi(page, rowsPerPage, oldCount);
  // }, [page, rowsPerPage, oldCount]);

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
          callAgainTableApi(needed, pageNo, rowsPerPageNo);
        } else if (toShow > totalDataLength) {
          needed = toShow - totalDataLength;
          callAgainTableApi(needed, pageNo, rowsPerPageNo);
        } else {
          needed = rowsPerPageNo;
          callAgainTableApi(needed, pageNo, rowsPerPageNo);
        }
      }
    }
  };
  const callAgainTableApi = (recordsNeeded, pageNo, rowsPerPageNo) => {
    let myDefaultParams = {
      category: null,
      fromDate: null,
      fromOrderNo: null,
      page: pageNo,
      // patientType: null,
      opdIpd: null,
      sampleStatus: null,
      searchString: "",
      patientId: searchString,
      size: rowsPerPageNo,
      testTypeId: null,
      toDate: null,
      toOrderNo: null,
      unitId: null,
    };
    console.log("defaultParams", myDefaultParams);
    tableApiFunc(myDefaultParams)
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
    checkCallApi(parseInt(newPage), rowsPerPage, oldCount);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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

    checkCallApi(page - 1, newRows, oldCount);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dataResult.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row, id) => {
    setSelectedObj(row);
    console.log("row", row);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    newSelected = newSelected.concat(id);

    console.log("newSelected", newSelected);
    console.log("selectedIndex", selectedIndex);

    console.log("selected", selected);

    if (selectedIndex === 0) {
      newSelected = [];
      setSelected(null);
    }

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    setSelected(newSelected);
  };

  //table start
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Paper sx={{ width: "100%" }}>
        {/* pagination */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-left text-md ml-4">
            List Of Orders
          </span>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={
              <>
                <div>
                  <span>Rows Per Page:</span>
                </div>
              </>
            }
          />
        </div>

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
            height: "230px",
          }}
          className="rounded "
        >
          <Table size="small" component={Paper}>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    paddingY: 0.5,
                    backgroundColor: "#F1F1F1",
                  },
                }}
              >
                <TableCell className="whitespace-nowrap">
                  <span className="text-gray-600 font-bold">Select</span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="text-gray-600 font-bold">Actions</span>
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
                      <span className="text-gray-600 font-bold">{header}</span>
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
                {/* <TableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Actions
                    </span>
                  </TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(dataResult, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                .map((row, index) => {
                  {
                    const isItemSelected = isSelected(row.OrderId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // key={index}
                        hover
                        onClick={(event) =>
                          handleClick(event, row, row.OrderId)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.OrderId}
                        selected={isItemSelected}
                        // onClick={(e) => {
                        // props.displayView(row, index);
                        // props.setOpen(true);
                        // props.editRow(row);
                        // }}

                        // sx={{
                        //   "& td": {
                        //     paddingY: 0.5,
                        //   },
                        // }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-6">
                            <div className="lg:flex lg:items-center lg:space-x-1 lg:justify-end md:grid md:grid-cols-4 lg:gap-1 md:gap-2 lg:gap-x-1">
                              <Tooltip title="Print Barcode">
                                <div>
                                  <FaBarcode
                                    size={24}
                                    className="text-gray-500 cursor-pointer"
                                  />
                                </div>
                              </Tooltip>
                              <Tooltip title="Reschedule">
                                <CalendarMonthIcon className="text-blue-500 cursor-pointer" />
                              </Tooltip>
                              <Tooltip title="Cancel Order">
                                <CancelOutlinedIcon className="text-red-500 cursor-pointer" />
                              </Tooltip>
                              {/* <MdCancel size={20} /> */}
                              <Tooltip title="Print">
                                <PrintIcon className="text-orange-400 cursor-pointer" />
                              </Tooltip>
                            </div>
                          </div>
                        </TableCell>
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap capitalize"
                              key={i}
                              // onClick={() => {
                              //   props.displayView(row, index);
                              // }}
                            >
                              {row[header]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* //table end */}
      </Paper>
    </Box>
  );
}
