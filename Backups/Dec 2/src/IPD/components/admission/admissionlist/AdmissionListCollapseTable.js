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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import receivedPatient from "../../../assets/receivepatient.png";
import emr from "../../../assets/emr.png";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Modal,
  TablePagination,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReceivePatientModal from "./ReceivePatientModal";
import MediclaimAmountModal from "./MediclaimAmountModal";

function Row(props) {
  const { row, allHeaders, handleList, dataArray, setData } = props;
  console.log("Props", row);

  const [color, setColor] = useState("none");
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [openMediclaimModal, setOpenMediclaimModal] = useState(false);

  let navigate = useNavigate();

  const params = {
    age: row.Age,
    department: row.Department,
    doctor: row.Doctor,
    patientName: row["Patient Name"],
    bedCategory: row["Bed Category"],
    patientVisitId: row.patientVisitId,
    uhid: row.UHID,
  };

  const handleIPDEmr = (rowDetails) => {
    console.log("RowDetails", rowDetails.patientId);
    let emrParams = {
      patientId: rowDetails.patientId,
      patientVisitId: rowDetails.patientVisitId,
    };
    navigate("/ipd/emr", { state: emrParams });
  };

  const handleBill = (rowDetails) => {
    console.log("RowDetails", rowDetails.admissionId);
    let billParams = {
      admissionId: rowDetails.admissionId,
      bedCategory: rowDetails.bcategoryId,
      tariff: rowDetails.tariff,
    };
    navigate("/ipd/charges", { state: billParams });
  };

  return (
    <>
      <TableRow sx={{ backgroundColor: props.open ? " #E1F8DC" : "none" }}>
        <TableCell
          sx={{
            marginLeft: "1rem",
            padding: "0px",
          }}
        >
          {row.Status.toLowerCase() === "open" ? (
            <Tooltip title="Receive Patient" arrow>
              <button
                type="button"
                onClick={() => {
                  setOpenReceiveModal(true);
                }}
              >
                <img src={receivedPatient} alt="reciveimg" className="h-8" />
              </button>
            </Tooltip>
          ) : (
            <div className="flex w-16 ml-1">
              <Tooltip title="EMR" arrow>
                <button
                  type="button"
                  onClick={() => {
                    handleIPDEmr(row);
                  }}
                >
                  <img src={emr} alt="emr" />
                </button>
              </Tooltip>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() =>
                  props.onClick(props.open ? "" : row.patientVisitId)
                }
              >
                {props.open ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          )}
        </TableCell>

        {allHeaders &&
          allHeaders.map((header, i) => (
            <>
              <TableCell
                // disablepadding
                key={i}
                className="w-auto whitespace-nowrap"
              >
                {row[header]}
              </TableCell>
            </>
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
                <div className="relative -mt-14 mx-10 lg:mx-auto flex flex-wrap">
                  {row.Status.toLowerCase() !== "open" ? (
                    <>
                      <button
                        type="button"
                        className="bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                        onClick={() =>
                          navigate("/ipd/bedtransfer", { state: params })
                        }
                      >
                        Transfer Bed
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                        onClick={() => {
                          handleBill(row);
                        }}
                      >
                        Bill
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Barcode
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Discharge
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Disc. Summary
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Disc. Status
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Clinical Chart
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Credit Limit
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                        onClick={() => {
                          setOpenMediclaimModal(true);
                        }}
                      >
                        Mediclaim Approval Amount
                      </button>
                      <button
                        type="button"
                        className=" bg-transparent mx-1 my-2 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                      >
                        Print MLC
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* //Receive Patient Modal// */}
      <Modal
        open={openReceiveModal}
        onClose={() => {
          setOpenReceiveModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ReceivePatientModal
            setOpenReceiveModal={setOpenReceiveModal}
            row={row}
            handleList={handleList}
          />
        </Box>
      </Modal>

      {/* //Mediclaim Amount Modal// */}
      <Modal
        open={openMediclaimModal}
        onClose={() => {
          setOpenMediclaimModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MediclaimAmountModal setOpenMediclaimModal={setOpenMediclaimModal} />
        </Box>
      </Modal>
    </>
  );
}

const AdmissionListCollapseTable = (props) => {
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
    handleList,
  } = props;

  const [dataArray, setDataArray] = React.useState(props.data.result);
  const [oldCount, setOldCount] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  const defaultParams = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
  };

  let userRole = localStorage.getItem("role");

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
    let defaultParamsPage = {
      bedCategory: null,
      blockId: null,
      floorId: null,
      fromDate: null,
      page: 0,
      searchId: null,
      searchString: searchString,
      size: 10,
      toDate: null,
      unitId: null,
      wardId: null,
    };
    setSpinner(true);
    console.log("defaultParams", defaultParamsPage);
    tableApiFunc(defaultParamsPage)
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

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };
  let headers = Object.keys(props.data.result[0]);
  const allHeaders = removeHeaders(headers, [
    "id",
    "admissionId",
    "patientVisitId",
    "mobileNumber",
    "gender",
    "tariff",
    "bcategoryId",
  ]);

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

    if (additionalRecord >= newRows) {
      setPage(page - 1);
    }
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className="lg:w-[96%] mx-auto -ml-0.5 md:w-[95%] ">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
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
                  <TableCell />

                  {/* heading of table */}
                  {allHeaders.map((header, index) => (
                    <TableCell
                      //   sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap"
                      key={index}
                    >
                      <span className="text-gray-600 font-bold">{header}</span>
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
                    {dataResult.map((row, index) => (
                        <Row
                          dataArray={dataResult}
                          allHeaders={allHeaders}
                          key={row.patientVisitId}
                          row={row}
                          setData={setData}
                          open={row.patientVisitId == openRow}
                          onClick={(patientVisitId) => {
                            setOpenRow(patientVisitId);
                          }}
                          handleList={handleList}
                        />
                      ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default AdmissionListCollapseTable;
