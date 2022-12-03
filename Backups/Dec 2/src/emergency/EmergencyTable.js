import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Modal,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
// import { baseUrl } from "../../http-common-precription";
import { useState } from "react";
import LoadingSpinner from "../Common Components/loadingspinner/loadingSpinner";

function Row(props) {
  console.log("Emergency Table Called!!!!!");
  const {
    headers,
    row,
    setOpenTransferToWard,
    setOpenDenialAdmissionModal,
    setData,
    dataArray,
    page,
    rowsPerPage,
    searchString,
    searchId,
    count,
    dataResult,
    open,
  } = props;
  console.log("PRops", props.row);

  return (
    <>
      <TableRow sx={{ backgroundColor: props.open ? " #E1F8DC" : "none" }}>
        <TableCell
          sx={{
            marginLeft: "1rem",
            padding: "0px",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>
              props.onClick(props.open ? "" : row["Mobile Number"])
            }
          >
            {props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-end text-blue-700 underline whitespace-nowrap">
            <a href="#">ETU/EMR</a>
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

              {header === "Is Emergency" ? (
                row[header] === true ? (
                  <span>True</span>
                ) : (
                  <span>False</span>
                )
              ) : (
                ""
              )}

              {header === "MLC" ? (
                row[header] === true ? (
                  <Tooltip title="Print MLC">
                    <a href="##" value="click" className="text-[#e28a42] mr-1">
                      <LocalPrintshopIcon
                      // onClick={(e) => {
                      //   props.setOpen(true);
                      //   props.editRow(row);
                      // }}
                      />
                    </a>
                  </Tooltip>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </TableCell>
          ))}
      </TableRow>
      <TableRow sx={{ backgroundColor: props.open ? " #E1F8DC" : "none" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
          <Collapse
            in={props.open}
            timeout={{ enter: 200, exit: 100 }}
            unmountOnExit
            easing={{ enter: "linear", exit: "linear" }}
            // style={{ display: "block" }}
          >
            <Box sx={{ margin: 1 }}>
              <div className="flex pt-12 lg:pt-14 ">
                <div className="relative -mt-12  lg:ml-32 md:mx-10 flex overflow-x-scroll lg:overflow-x-hidden">
                  <button
                    type="button"
                    // disabled  opacity-20 bg-transparent
                    className="mx-1 hover:bg-slate-700 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                 onClick={props.setOpenDenialAdmissionModal}
                 >
                    Deny Admission
                  </button>
                  <button
                    type="button"
                    // disabled  opacity-20 bg-transparent
                    className="mx-1 hover:bg-slate-700 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                    onClick={props.setOpenTransferToWard}
                  >
                    Transfer To Ward
                  </button>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const VisitCollapsibleTable = (props) => {
  const {
    tableApiFunc,
    searchString,
    searchId,
    dataResult,
    setDataResult,
    page,
    setData,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setOpenTransferToWard,
    setOpenDenialAdmissionModal,
    count,
    data,
    selectedFromDate,
    setSelectedFromDate,
    selectedToDate,
    setSelectedToDate,
  } = props;

  const [dataArray, setDataArray] = React.useState(props.data.result);
   //state varibale for the table
   const [order, setOrder] = React.useState("asc");
   const [orderBy, setOrderBy] = React.useState();
  const [oldCount, setOldCount] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  const [btnStyle, setBtnStyle] = React.useState();
  const [disableBtn, setDisableBtn] = React.useState();
  const [prescriptionPdf, setPrescriptionPdf] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [callBtnStatus, setCallBtnStatus] = React.useState();
  const [pdfSpinner, setPdfSpinner] = useState(false);
  const [role, setRole] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultParams = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
    fromDate: null,
    // toDate: toDateI,
    toDate: null,
    searchId: searchId,
  };

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

  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
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

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };
  console.log("props.data.result[0]  is :", props.data.result[0]);
  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openRow, setOpenRow] = React.useState("");

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

  return (
    <div className="grid w-auto">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ width: "100%" }}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 1,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "0.3rem",
                      marginLeft: "-2rem",
                      padding: "0px",
                    }}
                  />

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
                <>
                  {stableSort(dataResult,getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <Row
                        dataArray={dataResult}
                        headers={headers}
                        key={row.id}
                        row={row}
                        page={page}
                        setDataResult={setDataResult}
                        setData={setData}
                        open={row["Mobile Number"] == openRow}
                        onClick={(id) => {
                          setOpenRow(id);
                        }}
                        setOpenTransferToWard={setOpenTransferToWard}
                        setOpenDenialAdmissionModal={setOpenDenialAdmissionModal}
                      />
                    ))}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default VisitCollapsibleTable;
