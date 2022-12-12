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
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Modal,
  TablePagination,
  TextField,
} from "@mui/material";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import {
  callPatient,
  getPrescription,
  getVisitPatientList,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { useEffect } from "react";
import { baseUrl } from "../../http-common-precription";
import { useState } from "react";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

function Row(props) {
  const {
    row,
    allHeaders,
    dataArray,
    params,
    setData,
    handleCall,
    handleCloseVisit,
  } = props;
  const [btnStyle, setBtnStyle] = React.useState();
  const [disableBtn, setDisableBtn] = React.useState();
  const [prescriptionPdf, setPrescriptionPdf] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [callBtnStatus, setCallBtnStatus] = React.useState();
  const [pdfSpinner, setPdfSpinner] = useState(false);
  const [role, setRole] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let statusDetails, callStatus;
  const navigate = useNavigate();
  let userRole = localStorage.getItem("role");
  useEffect(() => {
    userRole.toLowerCase() === "doctor" ? setRole("Doctor") : setRole("");
    console.log("Role", userRole);
  }, [role]);

  useEffect(() => {
    //   //   // console.log("SEtTimer", setTimer);
    //   let statusValue = dataArray.map((item) => {
    //     if (
    //       item.Status.toLowerCase() === "ongoing" ||
    //       item.Status.toLowerCase() === "completed"
    //     ) {
    //       setDisableBtn(!disableBtn);
    //     }
    //   });
    statusDetails = dataArray.find((val) => {
      // console.log("Value", val);
      // eslint-disable-next-line no-unused-expressions
      val.Status.toLowerCase() === "ongoing" ? setDisableBtn(true) : "";
    });
    // console.log("statusDetails", statusDetails);
  }, [statusDetails, row]);

  // useEffect(() => {
  //   callStatus = dataArray.find((val) => {
  //     val.Status.toLowerCase() === "ongoing"
  //       ? setStatusCall(true)
  //       : setStatusCall(false);
  //   });
  // }, [row]);

  // const handleCall = (visitId) => {
  //   callPatient(visitId)
  //     .then((response) => {
  //       getVisitPatientList(params)
  //         .then((res) => {
  //           setData(res.data);
  //         })
  //         .catch((err) => {
  //           console.log("Error", err);
  //         });
  //     })
  //     .catch((response) => {
  //       console.log("Error", response);
  //     });
  // };

  useEffect(() => {
    console.log("Status Change", callBtnStatus);
    if (row.Status.toLowerCase() === "ongoing") {
      setCallBtnStatus(true);
    } else {
      setCallBtnStatus(false);
    }
  }, [dataArray, callBtnStatus]);

  useEffect(() => {
    console.log("Disable Btn", disableBtn);
    disableBtn === true
      ? setBtnStyle(
          "opacity-20 bg-transparent mx-1 hover:bg-slate-500 opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white py-1 px-4 border border-black hover:border-transparent rounded"
        )
      : setBtnStyle(
          "outline-1  bg-transparent mx-1 hover:bg-green-500 text-green-500 font-semibold hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded"
        );
  }, [disableBtn]);

  const handleEMR = (rowDetails) => {
    console.log("rowDetails", rowDetails);

    //Param for Navgation
    let params;
    rowDetails.Status.toLowerCase() === "completed"
      ? (params = {
          patientId: rowDetails["patientInfoId"],
          visitId: rowDetails["patientVisitId"],
          visitNumber: rowDetails["Patient Visit Number"],
          visitDate: rowDetails["visitDate"],
          status: rowDetails["Status"],
        })
      : (params = {
          patientId: rowDetails["patientInfoId"],
          visitId: 0,
          visitNumber: rowDetails["Patient Visit Number"],
          visitDate: rowDetails["visitDate"],
          status: rowDetails["Status"],
        });

    navigate("/opd/emr", { state: params });
  };

  const handlePrintPrescription = (visitId) => {
    console.log("Visit Id ", visitId);
    getPrescription(visitId)
      .then((response) => {
        if (response.status === 200) {
          console.log("response.status", response.status);
          setOpen(true);
          setPdfSpinner(true);
          setPrescriptionPdf(
            `${baseUrl}/reports/generatePdf/prescription?visitId=${visitId}`
          );
          setPdfSpinner(false);
        }
      })
      .catch((response) => {
        console.log("response catch", response);
      });
  };

  return (
    <>
      <TableRow>
        {(userRole && userRole.toLowerCase() === "admin") ||
        userRole.toLowerCase() === "nurse" ? (
          ""
        ) : (
          <TableCell>
            <div className="flex">
              <button type="button">
                <CloseIcon className="text-gray-400" fontSize="small" />
              </button>

              {role.toLowerCase() === "doctor" ? (
                callBtnStatus === true ||
                row.Status.toLowerCase() === "completed" ? (
                  <button
                    type="button"
                    disabled={true}
                    className="opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white py-1 px-4 border border-black hover:border-transparent rounded"
                    onClick={() => handleCall(row.patientVisitId)}
                  >
                    Call
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={disableBtn}
                    className={btnStyle}
                    onClick={() => handleCall(row.patientVisitId)}
                  >
                    Call
                  </button>
                )
              ) : (
                <button
                  type="button"
                  disabled={true}
                  className="opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white py-1 px-4 border border-black hover:border-transparent rounded"
                >
                  Call
                </button>
              )}
            </div>
          </TableCell>
        )}
        <TableCell
          sx={{
            marginLeft: "1rem",
            padding: "0px",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => props.onClick(props.open ? "" : row.patientVisitId)}
          >
            {props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {row.Status.toLowerCase() === "confirmed" ? (
          <TableCell>
            <p className="text-white bg-sky-500 font-bold border py-1 px-2 text-center border-sky-500 rounded">
              Confirmed
            </p>
          </TableCell>
        ) : row.Status.toLowerCase() === "ongoing" ? (
          <TableCell>
            <p className="text-white bg-orange-500 font-bold border py-1 px-2 text-center border-orange-500 rounded">
              Ongoing
            </p>{" "}
          </TableCell>
        ) : row.Status.toLowerCase() === "completed" ? (
          <TableCell>
            <p className="text-white bg-green-500 font-bold border py-1 px-2 text-center border-green-500 rounded">
              Completed
            </p>{" "}
          </TableCell>
        ) : (
          ""
        )}

        {allHeaders &&
          allHeaders.map((header, i) => (
            <>
              <TableCell key={i}>{row[header]}</TableCell>
            </>
          ))}

        {/* <TableCell sx={{ minWidth: "100px" }}>{row.dateOfBirth}</TableCell>
<TableCell>{row.mobileNumber}</TableCell>
<TableCell>{row.patientInfoId}</TableCell> */}
        {/* {row.StatusofToken === "Waiting" ? (
<TableCell>
<p className="text-amber-900 font-bold">Waiting</p>
</TableCell>
) : row.StatusofToken === "Ongoing" ? (
<TableCell>
<p className="text-orange-500 font-bold">Ongoing</p>{" "}
</TableCell>
) : row.StatusofToken === "Completed" ? (
<TableCell>
<p className="text-green-500 font-bold">Completed</p>{" "}
</TableCell>
) : (
""
)} */}

        {/* <TableCell>{row.PatientName}</TableCell>
<TableCell>{row.ptEmail}</TableCell> */}
      </TableRow>
      <TableRow>
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
                    disabled
                    className="opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                  >
                    Barcode
                  </button>
                  <button
                    type="button"
                    disabled
                    className="opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                  >
                    Visit Case Paper
                  </button>
                  {/* <button
                    type="button"
                    className="bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white  h-8 px-4 border border-black hover:border-transparent rounded"
                  >
                    Add Vital Info
                  </button> */}
                  <button
                    type="button"
                    className="bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white  h-8 px-4 border border-black hover:border-transparent rounded"
                  >
                    Bill
                  </button>
                  {/* <Link to="/opd/emr"> */}
                  <button
                    type="button"
                    className="bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white h-8 px-4 border border-black hover:border-transparent rounded"
                    onClick={() => {
                      handleEMR(row);
                    }}
                  >
                    EMR
                  </button>
                  {/* </Link> */}
                  <button
                    type="button"
                    disabled
                    className="opacity-20 bg-transparent mx-1 hover:bg-slate-500 text-black font-semibold hover:text-white  h-8 px-4 border border-black hover:border-transparent rounded"
                  >
                    Smart Card
                  </button>
                  {row.Status.toLowerCase() === "confirmed" ? (
                    <button className="bg-transparent disabled:true opacity-20 mx-1 hover:bg-red-500 text-red-500 font-semibold hover:text-white  h-8 px-4 border border-red-500 hover:border-transparent rounded ">
                      Close Visit
                    </button>
                  ) : row.Status.toLowerCase() === "ongoing" &&
                    userRole.toLowerCase() === "doctor" ? (
                    <button
                      className="bg-transparent mx-1 hover:bg-red-500 text-red-500 font-semibold hover:text-white  h-8 px-4 border border-red-500 hover:border-transparent rounded "
                      onClick={() => handleCloseVisit(row.patientVisitId)}
                    >
                      Close Visit
                    </button>
                  ) : (
                    <button
                      className="bg-transparent mx-1 hover:bg-orange-400 text-orange-400 font-semibold hover:text-white  h-8 px-4 border border-orange-400 hover:border-transparent rounded "
                      onClick={() =>
                        handlePrintPrescription(row.patientVisitId)
                      }
                    >
                      Print Prescription
                    </button>
                  )}
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* //Prescription Modal// */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginX: "auto",
            position: "absolute",
            top: "1%",
            left: "1%",
            backgroundColor: "white",
            width: "97%",
            height: "93%",
          }}
        >
          <div className=" bg-white font-bold flex justify-between px-4">
            <p className="text-lg">Prescription Details</p>
            <Button
              onClick={handleClose}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Close
            </Button>
          </div>

          {prescriptionPdf !== "" ? (
            pdfSpinner ? (
              <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <embed
                src={prescriptionPdf}
                frameBorder="0"
                width="100%"
                height="100%"
              />
            )
          ) : (
            <div>
              <p>Prescription is Not Available</p>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

const VisitCollapsibleTable = (props) => {
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
    handleCall,
    handleCloseVisit,
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
      page: page,
      size: rowsPerPage,
      searchString: searchString,
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
    "patientInfoId",
    "patientVisitId",
    "Status",
    "visitDate",
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
  // props.defaultParams.size = page;
  // props.defaultParams.size = rowsPerPage;

  // let dataArray = props.data.result;
  // let params = props.defaultParams;
  // let setData = props.setData;

  // const checkStatus = (status) =>{
  //   if(status.Status.toLowerCase() === "ongoing"){
  //     console.log("Ongoing True")
  //   }
  // }

  return (
    <div className="lg:w-[96%] mx-auto md:w-[90%] ">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
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
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {userRole.toLowerCase() === "admin" ||
                  userRole.toLowerCase() === "nurse" ? (
                    ""
                  ) : (
                    <TableCell align="center" sx={{ maxWidth: "2rem" }}>
                      <p className="font-bold">Actions</p>
                    </TableCell>
                  )}
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "0.3rem",
                      marginLeft: "-2rem",
                      padding: "0px",
                    }}
                  />
                  {/* {allHeaders.map((header, index) => (
                    <TableCell key={index}>
                      <p className="font-bold  w-auto">{header}</p>
                    </TableCell>
                  ))} */}
                  {/* <TableCell>
                    <p className="font-bold w-11">Sr No.</p>
                  </TableCell> */}
                  <TableCell align="center">
                    <p className="font-bold">Status</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-36">Patient Visit Number</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-36">Patient Name</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-44">Patient Email</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-12 justify-start">Gender</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-36">Date of Birth</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-24">Mobile No.</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-bold  w-60">Call Start Time</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-60">Call End Time</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold  w-60">Total Time In Minutes</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {spinner ? (
                  <div className="flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <>
                    {dataResult
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
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
                          handleCall={handleCall}
                          handleCloseVisit={handleCloseVisit}
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

export default VisitCollapsibleTable;
