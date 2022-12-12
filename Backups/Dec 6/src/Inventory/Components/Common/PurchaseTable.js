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
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner"; 
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

export default function CabinTable(props) {
  console.log(props);
  const { 
    tableApiFunc ,
    searchString ,
    dataResult ,
    setDataResult,
    page, setPage, rowsPerPage, setRowsPerPage, count ,enquiryNo , setSelectedFromDate , itemCategoryId , itemName , setSelectedToDate ,unitId ,  } = props;

  console.log("Table enquiry result is", props.dataResult);

  //state varibale for the table
  const [spinner, showSpinner] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [open, setOpen] = React.useState();

  //actions
  const [visible, setVisible] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);
 
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

  // const removeHeaders = (headers, fieldToRemove) => {
  //   return headers.filter((v) => {
  //     return !fieldToRemove.includes(v);
  //   });
  // };

  // //set rows object to table
  // const allHeaders = Object.keys(props.data.result[0]);

  // const headers = removeHeaders(allHeaders, ["Id"]);

  const handlePageChange = (event, newPage) => {
    console.log("newPage", newPage);
    setOldCount((page + 1) * rowsPerPage)
    setPage(parseInt(newPage));
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setOldCount((page + 1) * rowsPerPage)
    let newRows = parseInt(event.target.value, 10)
    let newTotal = (page+1) * newRows
    let additionalRecord = newTotal - count
    if(additionalRecord > newRows){
      setPage(page - 1)
    }
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const defaultParams = {
    enquiryNo: enquiryNo,
    fromDate: null,
    itemCategoryId: itemCategoryId,
    itemName: itemName,
    itemTypeId: itemTypeId,
    page: 0,
    size: rowsPerPage,
    suppliersId: suppliersId,
    toDate: null,
    unitId: unitId,
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

            let needed;
            if(toShow < totalDataLength){
                needed = newTotal - oldTotal;
                callAgainTableApi(needed);
            }else if(toShow > totalDataLength){
                needed = toShow - totalDataLength
                callAgainTableApi(needed);
            }else{
                needed = rowsPerPageNo;
                callAgainTableApi(needed);
            }
        }
    }
  }
  const callAgainTableApi = (recordsNeeded) => {
    console.log("defaultParams", defaultParams);
    // showSpinner(true);
    tableApiFunc(defaultParams)
      .then((response) => response.data)
      .then((res) => {
        let enquiryList = []
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          enquiryList.push(jsonObject);
        });

        let incomingData = enquiryList;
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
      });
  }

 

  

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
      if (action === "Edit") {
        setVisible(true);
      }
    });
  }, []);

  //table start
  return (
    <>
      <div className="w-auto grid">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 2 }}>
            {/* pagination */}
            <TablePagination
              rowsPerPageOptions={[10 , 25 , 50]}
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
                      <a href="#">Import Data</a>
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
                  height: 5,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
             className="rounded ">
              <Table size="small">
                <TableHead>
                  <TableRow
                  className="bg-gray-100"
                  >
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>

                    <TableCell
                      sortDirection={orderBy === "Id" ? order : false}
                      className="whitespace-nowrap"
                    >
                      <TableSortLabel
                        active={false} //arrow for sorting
                        direction={orderBy === "srNo" ? order : "asc"}
                        onClick={createSortHandler("srNo")}
                      >
                        <span className="text-gray-600 font-bold whitespace-nowrap">
                          Enquiry No.
                        </span>
                        {orderBy === "srNo" ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      sortDirection={orderBy === "Id" ? order : false}
                      className="whitespace-nowrap"
                    >
                      <TableSortLabel
                        active={false} //arrow for sorting
                        direction={orderBy === "cabinCode" ? order : "asc"}
                        onClick={createSortHandler("cabinCode")}
                      >
                        <span className="text-gray-600 font-bold whitespace-nowrap">
                          Enquiry Date
                        </span>
                        {orderBy === "cabinCode" ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      sortDirection={orderBy === "Id" ? order : false}
                      className="whitespace-nowrap"
                    >
                      <TableSortLabel
                        active={false} //arrow for sorting
                        direction={orderBy === "cabinName" ? order : "asc"}
                        onClick={createSortHandler("cabinName")}
                      >
                        <span className="text-gray-600 font-bold whitespace-nowrap">
                          Supplier Name
                        </span>
                        {orderBy === "cabinName" ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      sortDirection={orderBy === "Id" ? order : false}
                      className="whitespace-nowrap"
                    >
                      <TableSortLabel
                        active={false} //arrow for sorting
                        direction={orderBy === "units" ? order : "asc"}
                        onClick={createSortHandler("units")}
                      >
                        <span className="text-gray-600 font-bold whitespace-nowrap">
                          Quoatation Received
                        </span>
                        {orderBy === "units" ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
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
                  {stableSort(dataResult, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not
                    .map((enquiryData) => {
                     console.log("Table DataResult is: ", dataResult);
                      return (
                        <TableRow>
                          {props.data.actions.length > 0 ? (
                            <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                              <div className="flex">
                                {/* {displayActions(props.data.actions)} */}

                                {visible ? (
                                    <Tooltip title="Edit">
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-blue-500 mr-1"
                                  >
                                    {/* eidttext - toggle to button edit to save */}
                                    <VisibilityIcon
                                      onClick={(e) => {
                                        props.setOpen(true);
                                        props.editRow(enquiryData);
                                      }}
                                    />
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
                          <TableCell className="whitespace-nowrap">
                            {enquiryData.EnquiryNo}
                          </TableCell>

                          <TableCell className="whitespace-nowrap">
                            {enquiryData.EnquiryDate}
                          </TableCell>

                          <TableCell className="whitespace-nowrap">
                            {enquiryData.SupplierName}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {enquiryData.QuotationReceived}
                          </TableCell>                          
                        </TableRow>
                      );
                    })}
                    </>
                     )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
