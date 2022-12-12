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
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import {fetchAllAppointments} from '../../services/AppointmentPageServices/AppointmentListServices'
import billImg from './billsm.png'
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";

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

//disable button on click
const handleClick = (event) => {
  event.currentTarget.disabled = true;
  // console.log("button clicked");
};

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
export default function AppointmentListTable(props) {
  const {
    tableApiFunc, searchString, dataResult, setDataResult,     
    data, setData,openReschedulefunc,openCancelfunc, 
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage, count,
    dateValue1,
    dateValue2 } = props
  //state varibale for the table
  const [spinner, showSpinner] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  
  //show and hide button
  const [visible, setVisible] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  // const [open, setOpen] = React.useState();

  //actions
  const [editAction, setEditAction] = React.useState(false);
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);
  const [billingAction, setBillingAction] = React.useState(false);
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


  
  // const [dataArr, setDataArr] = React.useState(props.data);

  let timeout
  const [timer,setTimer] = React.useState(true)

  // console.log(props.result);
  let getVisitData = async () => {
        let tokenStatus = localStorage.getItem("loggedUser");
        if (tokenStatus !== null) {
          if (timer === true) {
            console.log("defaultParams",props.senddefaultParams)
            const response = await fetchAllAppointments(props.senddefaultParams);
            if (response.status === 200) {
              setData(response.data);
              timeout = setTimeout(() => {
                if(timer){
                getVisitData();}
              }, 5000);
            }
          }
        }
  };

  //set rows object to table
  const allHeaders = Object.keys(data.result[0]);

  const headers = removeHeaders(allHeaders, ["companyId","unitId","cashBalance","id","patientId","patientVisitId","Appointment Id","doctorId","Department Id","patientCategoryId","patientAge",'patientCategory', 'company',]);

  const handlePageChange = (event, newPage) => {
    console.log("newPage",newPage)
    setOldCount((page + 1) * rowsPerPage)
    setPage(newPage);
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setOldCount((page + 1) * rowsPerPage)
    let newRows = parseInt(event.target.value, 10)
    let newTotal = (page+1) * newRows
    let additionalRecord = newTotal - count
    if(additionalRecord >= newRows){
      setPage(page - 1)
    }
    setRowsPerPage(parseInt(event.target.value, 10));
  };




  useDidMountEffect(() => {
    checkCallApi(page, rowsPerPage , oldCount);
  }, [page,rowsPerPage, oldCount]);


  const checkCallApi = (pageNo,rowsPerPageNo, oldTotal) => {
    
    pageNo = pageNo + 1
    let newTotal = pageNo * rowsPerPageNo
    console.log("oldTotal",oldTotal)
    console.log("newTotal",newTotal)
    
    let arr = [...dataResult]
    let totalDataLength = count
    let availableDataLength = arr.length
    if(totalDataLength>availableDataLength) // page has moved forward
    {
        console.log("page",pageNo)
        console.log("rowsPerPage",rowsPerPageNo)
        console.log("totalDataLength",totalDataLength)
        console.log("availableDataLength",availableDataLength)

        // if i dont have total record to show
        if(newTotal > availableDataLength){
          //
            let require = newTotal - availableDataLength

            let toShow = availableDataLength + require 

            // let possibleNo = totalDataLength - newTotal
            // check available vs needed
            // if(possibleNo > 0){

            // }else if(possibleNo < 0){

            // }else {

            // }
            // needed is less than count
            let needed = 0;
            if(toShow < totalDataLength){
                needed = newTotal - oldTotal
                callAgainTableApi(needed)
            }else if(toShow > totalDataLength){
                needed = totalDataLength - availableDataLength
                callAgainTableApi(needed)
            }else{
                needed = rowsPerPageNo
                callAgainTableApi(needed)
            }
        }
    }
  }
  const callAgainTableApi = (recordsNeeded) => {
    console.log("recordsNeeded",recordsNeeded)
    let datefrom= getDateModal(dateValue1)
    let dateto= getDateModal(dateValue2)
    let defaultParamsPage = {
      page: page,
      size: rowsPerPage,
      searchString: searchString,
      fromDate:datefrom,
      toDate:dateto
    };
    showSpinner(true);
    console.log("defaultParams", defaultParamsPage);
    tableApiFunc(defaultParamsPage)
      .then((response) => response.data)
      .then((res) => {

        showSpinner(false);
        let incomingData = res.result
        let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded))

        // append needed data
        let existData = [...dataResult]
        for (let value of onlyNeededData){
            existData.push(value)
        }
        setDataResult(existData)
      })
      .catch(() => {
        showSpinner(false);
      })
  }
  const getDateModal = (dobValue) => {
    let dobGivenYear = dobValue.getFullYear();
    let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    return fullDOB
  };
  let todaysDate = getDateModal(new Date())

  React.useEffect(() => {
    // console.log("actions",dataArr.actions)
    data.actions.forEach((action) => {
      if (action.toLowerCase() === "edit") {
        setEditAction(true);
      }
      if (action.toLowerCase() === "delete") {
        setDeleteAction(true);
      }
      if (action.toLowerCase() === "confirmed") {
        setconfirmAction(true);
      }
      if (action.toLowerCase() === "rescheduled") {
        setrescheduleAction(true);
      }
      if (action.toLowerCase() === "cancelled") {
        setcancelAction(true);
      }
      if (action.toLowerCase() === "billing") {
        setBillingAction(true);
      }
      
    });
  }, []);
  // console.log("actions array", props.result.actions);
  //table start
  return (
    <div className=" mx-auto ">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", marginBottom: 2 }}>
        <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            // count={count ? (count):data.result.length}
            
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableContainer sx={{ 
            marginTop: "0rem", 
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
        
        }} className="rounded ">
            <Table>
              <TableHead
              
              sx={{
                "& th": {
                  paddingY: 1,
                  backgroundColor: "#F1F1F1",
                },
              }}
              >
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#515563" }}
                    className="text-gray-600 font-bold whitespace-nowrap"
                  >
                    Actions
                  </TableCell>
                  {/* heading of table */}
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap"
                      key={index}
                    >
                      <TableSortLabel
                        active={false}
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
                ) : <>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(
                  dataResult,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                  .map((row, index) => {
                    // console.log("value of row", row.PatientName);
                    // console.log("value of index", index);
                    return (
                      <TableRow key={index}
                      sx={{
                        "& td": {
                          paddingY: 1,
                        },
                      }}
                      >
                        {data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">


                              {cancelAction ? (
                              <>
                                {/* { row["Appointment Status"].toLowerCase() !== "cancelled"  ?( */}

                                <div className={row["Appointment Status"].toLowerCase() !== "cancelled" && row["Appointment Status"].toLowerCase() !== "completed" ?"flex items-center space-x-1":'invisible'}>
                                  <Tooltip title="Cancel Appointment">
                                    <a
                                      href="##"
                                      className="text-red-400 mr-3 mb-2"
                                      onClick={() => openCancelfunc(index,row)}
                                    >
                                      <CancelIcon color="red" sx={{color:'red'}}/>
                                    </a>
                                  </Tooltip>
                                </div>
                                {/* ):""} */}
                                </>
                              ) : (
                                ""
                              )}

                              {/* {deleteAction ? (
                                <a
                                  href="##"
                                  className="text-red-500 mr-3"
                                  onClick={() => props.deleteRow()}
                                >
                                  {<DeleteOutlineOutlinedIcon />}
                                </a>
                              ) : (
                                ""
                              )} */}
                          
                              {rescheduleAction ? (
                                <>
                                   <div className={row["Appointment Status"] !== "Completed" ? "flex items-center space-x-1":'invisible'}>
                                 
                                <Tooltip title="Reschedule Appointment">
                                  <a
                                    href="##"
                                    className="text-blue-500 mr-3"
                                    onClick={() => openReschedulefunc(index,row)}
                                  >
                                    {<CalendarMonthIcon />}
                                  </a>
                                </Tooltip>
                                </div>
                                </>
                              ) : (
                                ""
                              )}
                              {billingAction ? (
                                <>
                                
                                {
                                  row["Appointment Status"].toLowerCase() == "confirmed" || row["Appointment Status"] == "Completed" ? (
                                    <Tooltip title="Billing">
                                    <a
                                      className=" w-4 mt-1"
                                    onClick={() => props.routeBilling(index,row)}
                                    >
                                      {/* billing */}
                                      <img src={billImg} alt=""  className="mr-3 " />
                                    </a>
                                </Tooltip>
                                  ):""
                                }
                                </>
                                ) : (
                              ""
                              )} 
                              {confirmAction ? (
                                <>
                                {
                                  row.patientVisitId == null && row["Appointment Status"].toLowerCase() !== "future" &&  row["Appointment Date"] == todaysDate && row["Appointment Status"].toLowerCase() !== "confirmed"  &&  row["Appointment Status"].toLowerCase() !== "cancelled" ? (
                                <Tooltip title="Confirm Appointment">
                                  <a
                                    href="##"
                                    className="text-green-800 mr-3"
                                    // onClick={() => props.deleteRow()}
                                  >
                                    <button
                                      
                                    onClick={() => props.openConfirmfunc(index,row)}
                                    >
                                      {visible ? (
                                        <CheckCircleIcon />
                                      ) : (
                                        <CheckCircleOutlineIcon disabled />
                                      )}
                                    </button>
                                  </a>
                                </Tooltip>):""
                                }
                              </>
                              ) : (
                                ""
                              )}



                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
                        {headers &&
                          headers.map((header, index) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={index}
                            >
                              {  header === 'Appointment Status' ? 
                                  ( <>
                                  {/* confirmed */}
                                    {
                                    row[header].toLowerCase() === "confirmed" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-green-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* pending */}
                                    {
                                    row[header].toLowerCase() === "pending" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-yellow-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* cancelled */}
                                    {
                                    row[header].toLowerCase() === "cancelled" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-red-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* reschedulled */}
                                    {
                                    row[header].toLowerCase() === "rescheduled" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-blue-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* reschedulled */}
                                    {
                                    row[header].toLowerCase() === "future" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-slate-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* completed */}
                                    {
                                    row[header].toLowerCase() === "completed" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-slate-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    {/* Missed */}
                                    {
                                    row[header].toLowerCase() === "missed" ? 
                                    (<button className=" w-full  font-bold text-center rounded px-3 text-red-500">
                                      {row[header]}
                                    </button>): ""
                                    }
                                    </>
                                    )
                                  : row[header]
                              }
                              
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
                  </>}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //table end */}
        </Paper>
      </Box>
    </div>
  );
}