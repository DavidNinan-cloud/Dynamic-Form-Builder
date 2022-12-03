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
import {fetchAllServices, getExcel, postExcel} from '../../services-services/ServiceList-services/ServiceListServices'

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import { useState } from "react";
import authHeader from "../../../../../../authentication/authservices/auth-header";
import { baseUrl } from "../../../../../http-common";
import axios from "axios";
// import billImg from './billsm.png'

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
export default function ServiceListTable(props) {
  //state varibale for the table
  const { isPackageFlag, tableApiFunc , searchString , dataResult , setDataResult, page, setPage, rowsPerPage, setRowsPerPage, count, openEditfunc} = props

  
  const [spinner, showSpinner] = React.useState(false);
  const [oldCount, setOldCount] = React.useState();
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
    isPackageFlag:isPackageFlag,
    page: page,
    size: rowsPerPage,
    searchString: searchString,
  };
  React.useEffect(() => {
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

            // check available vs needed
            // needed is less than count
            let needed;
            if(toShow < totalDataLength){
                needed = newTotal - oldTotal
                callAgainTableApi(needed)
            }else if(toShow > totalDataLength){
                needed = toShow - totalDataLength
                callAgainTableApi(needed)
            }else{
                needed = rowsPerPageNo
                callAgainTableApi(needed)
            }
        }
    }
  }
  const callAgainTableApi = (recordsNeeded) => {
    console.log("defaultParams", defaultParams);
    
    showSpinner(true);
    tableApiFunc(defaultParams)
      .then((response) => response.data)
      .then((res) => {
        

        // 
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

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["id"]);

  const handlePageChange = (event, newPage) => {
    setOldCount((page + 1) * rowsPerPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    
    setOldCount((page + 1) * rowsPerPage)
    let newRows = parseInt(event.target.value, 10)
    let newTotal = (page+1) * newRows
    let additionalRecord = newTotal - count
    if(additionalRecord >= newRows){
      setPage(page - 1)
    }
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  React.useEffect(() => {
    console.log("actions",props.data.actions)
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
      if (action === "Billing") {
        setBillingAction(true);
      }
      
    });
  }, []);
  
  // const uploadExcelData = (e) => {
  //     postExcel(e)
  //     .then((response) => response.data)
  //     .then((res) => {
  //       let incomingData = res.result
  //     })
  //     .catch(() => {
  //     })
  // }
  // const DownloadTableData = () => {
  //     getExcel()
  //     .then((response) => response.data)
  //     .then((res) => {
  //       let incomingData = res.result
  //       console.log("incoming Data",incomingData)
  //     })
  //     .catch(() => {
  //       showSpinner(false);
  //     })
  // }
  
  const [excelData, setExcelData] = React.useState();
  const [uploadConfirm, setUploadConfirm] = useState(false);
  const uploadConfirmOpen = () => setUploadConfirm(true);

  //function to close the confirmation modal
  const uploadConfirmClose = () => {
    if (uploadConfirm) {
      setUploadConfirm(false);
    }
  };
    //function to download/upload the service excel
    function DownloadTableData() {
  
      // axios({
      //   url: "http://192.168.0.147:8090/masters/excelTemplate/country",
      //   method: "GET",
      //   responseType: "blob",
      // })
      getExcel().then((response) => {
        console.log("DownloadTableData function is called",response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Services.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    }
    function uploadExcelData(e) {
      console.log("function run");
      let files = e.target.files;
      console.log("data file", files[0]);
      // let dataExcel = new FormData();
      // dataExcel.append('file', files[0])

      let reader = new FileReader();
  
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        console.warn("excel data ", files[0]);
  
        console.log(typeof files[0]);
  
        let formData = { serviceExcel: files[0] };
  
        console.log("The formData is ");
        console.log(formData);
  
        reader.onloadend = () => {
          console.log("DONE", reader.readyState); // readyState will be 2
  
          setExcelData(formData);
          uploadConfirmOpen();
        };
      };
      // reader.onload = (e) => {
      //   console.log("excel data ", e.target.result);
      //   let formData = { serviceExcel: e.target.result };
      //   // let formData = e.target.result
      //   setExcelData(formData);
      //   uploadConfirmOpen();
      // };
      
    }
    const submitExcelData = () => {
      console.log("The excel sheet is going to be uploaded");
  
      console.log("The form data in submitExcelData function is ");
  
      console.log(excelData);
  
      const url = baseUrl + "/excelTemplate/uploadExcelService"
  
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: authHeader().Authorization,
        },
      };
  
      // console.log("The config obj is ");
      // console.log(config);
  
      axios.post(url, excelData, config)
        .then((response) => {
          console.log("The response after submitting the data is ");
          // console.log(response);
          // populateTable();
        })
        .catch((error) => {
          console.log(error);
        });
      // postExcel(excelData).then((response) => {
      //   console.log("The response after submitting the data is ");
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      uploadConfirmClose();
    };
  //table start
  return (
    <div className=" mx-auto ">
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
            labelRowsPerPage={
              <>
                <span style={{ marginRight: "10px", color: "blue" }}>
                  <span>
                    <a href="#" onClick={DownloadTableData}>
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
                        onChange={(e) => {uploadExcelData(e)}}
                      ></input>
                    </label>
                  </span>
                </span>
                <span>Rows Per Page:</span>
              </>
            }
          />
          <TableContainer sx={{ marginTop: "0.8rem" }} className="rounded ">
            <Table>
              <TableHead>
                <TableRow
                sx={{
                  "& th": {
                    paddingY: 1,
                  },
                }}
                >
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
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {spinner ? (
                  <div className=" flex mx-auto justify-center">
                    <LoadingSpinner />
                  </div>
                ) : <>
                {stableSort(
                  dataResult,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                  .map((row, index) => {
                    return (
                      <TableRow key={index}
                      sx={{
                        "& td": {
                          paddingY: 1,
                        },
                      }}
                      >
                        { props.data.actions .length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                            {editAction ? (<>
                                <div className="flex items-center space-x-1">
                                  <Tooltip title="Edit Service">
                                    <a
                                      href="##"
                                      className="text-blue-500 mr-3 mb-2"
                                      onClick={() => openEditfunc(index,row)}
                                    >
                                      <DriveFileRenameOutlineIcon
                                  />
                                    </a>
                                  </Tooltip>
                                </div></>
                              ) : (
                                ""
                              )}

                              {cancelAction ? (
                                <div className="flex items-center space-x-1">
                                  <Tooltip title="Delete Service">
                                    <a
                                      href="##"
                                      className="text-red-400 mr-3 mb-2"
                                      onClick={() => openCancelfunc(index,row)}
                                    >
                                      <CancelIcon color="red" sx={{color:'red'}}/>
                                    </a>
                                  </Tooltip>
                                </div>) : (
                                ""
                              )}

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
                                    // onClick={() => props.deleteRow()}
                                  >
                                    <button
                                      
                                    onClick={() => console.log("Confirm")}
                                    >
                                      {visible ? (
                                        <CheckCircleIcon />
                                      ) : (
                                        <CheckCircleOutlineIcon disabled />
                                      )}
                                    </button>
                                  </a>
                                </Tooltip>
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
                              {row[header]}
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
          {/* pagination */}
          
        </Paper>
      </Box>
      <ConfirmationModal
          confirmationOpen={uploadConfirm}
          confirmationHandleClose={uploadConfirmClose}
          confirmationSubmitFunc={submitExcelData}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure you want to upload this excel sheet?"
          confirmationButtonMsg="Upload"
        />
    </div>
  );
}