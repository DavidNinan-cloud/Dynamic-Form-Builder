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

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";

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
export default function EmployeeListTable(props) {
        const {
        tableApiFunc ,
        searchString ,
        dataResult ,
        setDataResult,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        count,
        openReschedulefunc,
        openEditfunc,
        openDeletefunc
        } = props;

        
        const [spinner, showSpinner] = React.useState(false);
        //state varibale for the table
        const [order, setOrder] = React.useState("asc");
        const [orderBy, setOrderBy] = React.useState();

        //show and hide button
        const [visible, setVisible] = React.useState(false);
        const [disable, setDisable] = React.useState(false);

        //actions
        const [editAction, setEditAction] = React.useState(false);
        const [deleteAction, setDeleteAction] = React.useState(false);
        const [confirmAction, setconfirmAction] = React.useState(false);
        const [rescheduleAction, setrescheduleAction] = React.useState(false);
        const [cancelAction, setcancelAction] = React.useState(false);
        const [billingAction, setBillingAction] = React.useState(false);

        // 

        
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

        // console.log(props.result);
        const defaultParams = {
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
        let departmentList = {
        result: [],
        actions: [],
        };
        res.result.forEach((jsonString) => {
        let jsonObject = JSON.parse(jsonString);
        let orderItObj = {}
        departmentList.result.push(jsonObject);
        });

        // 
        showSpinner(false);
        let incomingData = departmentList.result
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

        const headers = removeHeaders(allHeaders, [
        "id",'educationInfo'
        ]);

        const handlePageChange = (event, newPage) => {
        console.log("newPage",newPage)
        setOldCount((page + 1) * rowsPerPage)
        setPage(parseInt(newPage));
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
        setRowsPerPage(newRows);
        };

        React.useEffect(() => {
        // console.log("actions",props.data.actions)
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
        // console.log("actions array", props.result.actions);
        //table start
        return (
        <div className=" mx-auto ">
        <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
        <TablePagination
        rowsPerPageOptions={[ 10, 15, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer sx={{ marginTop: "0rem" }} className="rounded ">
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
        {/*1 srNo */}
        <TableCell
        sortDirection={orderBy === 'srNo' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'srNo' ? order : "asc"}
        onClick={createSortHandler('srNo')}
        >
        <span className="text-gray-600 font-bold">
        Sr No
        </span>
        {orderBy === 'srNo' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*2 firstName */}
        <TableCell
        sortDirection={orderBy === 'firstName' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'firstName' ? order : "asc"}
        onClick={createSortHandler('firstName')}
        >
        <span className="text-gray-600 font-bold">
        First Name
        </span>
        {orderBy === 'firstName' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*3 lastName */}
        <TableCell
        sortDirection={orderBy === 'lastName' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'lastName' ? order : "asc"}
        onClick={createSortHandler('lastName')}
        >
        <span className="text-gray-600 font-bold">
        Last Name
        </span>
        {orderBy === 'lastName' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*4 mobileNo */}
        <TableCell
        sortDirection={orderBy === 'mobileNo' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'mobileNo' ? order : "asc"}
        onClick={createSortHandler('mobileNo')}
        >
        <span className="text-gray-600 font-bold">
        Mobile No.
        </span>
        {orderBy === 'mobileNo' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*5 isAdmin */}
        <TableCell
        sortDirection={orderBy === 'isAdmin' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'isAdmin' ? order : "asc"}
        onClick={createSortHandler('isAdmin')}
        >
        <span className="text-gray-600 font-bold">
                Is Admin
        </span>
        {orderBy === 'isAdmin' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*6 isClinical */}
        <TableCell
        sortDirection={orderBy === 'isClinical' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'isClinical' ? order : "asc"}
        onClick={createSortHandler('isClinical')}
        >
        <span className="text-gray-600 font-bold">
        isClinical
        </span>
        {orderBy === 'isClinical' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*7 units */}
        <TableCell
        sortDirection={orderBy === 'units' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'units' ? order : "asc"}
        onClick={createSortHandler('units')}
        >
        <span className="text-gray-600 font-bold">
        units
        </span>
        {orderBy === 'units' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*8 departments */}
        <TableCell
        sortDirection={orderBy === 'departments' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'departments' ? order : "asc"}
        onClick={createSortHandler('departments')}
        >
        <span className="text-gray-600 font-bold">
        departments
        </span>
        {orderBy === 'departments' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*9 gender */}
        <TableCell
        sortDirection={orderBy === 'gender' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'gender' ? order : "asc"}
        onClick={createSortHandler('gender')}
        >
        <span className="text-gray-600 font-bold">
        gender
        </span>
        {orderBy === 'gender' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*10 birthDate */}
        <TableCell
        sortDirection={orderBy === 'birthDate' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'birthDate' ? order : "asc"}
        onClick={createSortHandler('birthDate')}
        >
        <span className="text-gray-600 font-bold">
        birthDate
        </span>
        {orderBy === 'birthDate' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*11 address */}
        <TableCell
        sortDirection={orderBy === 'address' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'address' ? order : "asc"}
        onClick={createSortHandler('address')}
        >
        <span className="text-gray-600 font-bold">
        address
        </span>
        {orderBy === 'address' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*12 country */}
        <TableCell
        sortDirection={orderBy === 'country' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'country' ? order : "asc"}
        onClick={createSortHandler('country')}
        >
        <span className="text-gray-600 font-bold">
        country
        </span>
        {orderBy === 'country' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*13 state */}
        <TableCell
        sortDirection={orderBy === 'state' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'state' ? order : "asc"}
        onClick={createSortHandler('state')}
        >
        <span className="text-gray-600 font-bold">
        state
        </span>
        {orderBy === 'state' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*14 district */}
        <TableCell
        sortDirection={orderBy === 'district' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'district' ? order : "asc"}
        onClick={createSortHandler('district')}
        >
        <span className="text-gray-600 font-bold">
        district
        </span>
        {orderBy === 'district' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*15 city */}
        <TableCell
        sortDirection={orderBy === 'city' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'city' ? order : "asc"}
        onClick={createSortHandler('city')}
        >
        <span className="text-gray-600 font-bold">
        city
        </span>
        {orderBy === 'city' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*16 area */}
        <TableCell
        sortDirection={orderBy === 'area' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'area' ? order : "asc"}
        onClick={createSortHandler('area')}
        >
        <span className="text-gray-600 font-bold">
        area
        </span>
        {orderBy === 'area' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*17 loginApplicable */}
        <TableCell
        sortDirection={orderBy === 'loginApplicable' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'loginApplicable' ? order : "asc"}
        onClick={createSortHandler('srNo')}
        >
        <span className="text-gray-600 font-bold">
        loginApplicable
        </span>
        {orderBy === 'loginApplicable' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*18 doctorShareApplicable */}
        <TableCell
        sortDirection={orderBy === 'doctorShareApplicable' ? order : false}
        className="whitespace-nowrap"
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'doctorShareApplicable' ? order : "asc"}
        onClick={createSortHandler('doctorShareApplicable')}
        >
        <span className="text-gray-600 font-bold">
        doctorShareApplicable
        </span>
        {orderBy === 'doctorShareApplicable' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*19 concessionApplicable */}
        <TableCell
        sortDirection={orderBy === 'concessionApplicable' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'concessionApplicable' ? order : "asc"}
        onClick={createSortHandler('concessionApplicable')}
        >
        <span className="text-gray-600 font-bold">
        concessionApplicable
        </span>
        {orderBy === 'concessionApplicable' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*20 createdBy */}
        <TableCell
        sortDirection={orderBy === 'createdBy' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'createdBy' ? order : "asc"}
        onClick={createSortHandler('createdBy')}
        >
        <span className="text-gray-600 font-bold">
        Created By
        </span>
        {orderBy === 'createdBy' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*21 lastModifiedBy */}
        <TableCell
        sortDirection={orderBy === 'lastModifiedBy' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'lastModifiedBy' ? order : "asc"}
        onClick={createSortHandler('lastModifiedBy')}
        >
        <span className="text-gray-600 font-bold">
        lastModifiedBy
        </span>
        {orderBy === 'lastModifiedBy' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*22 createdDate */}
        <TableCell
        sortDirection={orderBy === 'createdDate' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'createdDate' ? order : "asc"}
        onClick={createSortHandler('createdDate')}
        >
        <span className="text-gray-600 font-bold">
        createdDate
        </span>
        {orderBy === 'createdDate' ? (
        <Box component="span" sx={visuallyHidden}>
        {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
        </Box>
        ) : null}
        </TableSortLabel>
        </TableCell>
        {/*23 lastModifiedDate */}
        <TableCell
        sortDirection={orderBy === 'lastModifiedDate' ? order : false}
        className="whitespace-nowrap"
        
        >
        <TableSortLabel
        active={false}
        direction={orderBy === 'lastModifiedDate' ? order : "asc"}
        onClick={createSortHandler('lastModifiedDate')}
        >
        <span className="text-gray-600 font-bold">
        lastModifiedDate
        </span>
        {orderBy === 'lastModifiedDate' ? (
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
        <div className=" flex mx-auto justify-center">
        <LoadingSpinner />
        </div>
        ) : <>
        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
        rows.slice().sort(getComparator(order, orderBy)) */}
        {stableSort(dataResult, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
        .map((row, index) => {
        return (
        <TableRow
        
        sx={{
        "& td": {
        paddingY: 1,
        },
        }}
        >
                {props.data.actions.length > 0 ? (
                <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                <div className="flex">
                {editAction ? (
                <>
                <div className="flex items-center space-x-1">
                <Tooltip title="Edit Employee">
                <a
                href="##"
                className="text-blue-500 mr-3 mb-2"
                onClick={() =>
                openEditfunc(index, row)
                }
                >
                <DriveFileRenameOutlineIcon />
                </a>
                </Tooltip>
                </div>
                </>
                ) : (
                ""
                )}
                {deleteAction ? (
                <Tooltip title="Delete Employee">
                <a
                href="##"
                className="text-red-500 mr-3"
                onClick={() =>{ openDeletefunc(index,row)}}
                >
                {<DeleteOutlineOutlinedIcon />}
                </a>
                </Tooltip>
                ) : (
                ""
                )}

                {rescheduleAction ? (
                <>
                {/* { row["Appointment Status"] !== "Pending" ?( */}
                <Tooltip title="Reschedule Appointment">
                <a
                href="##"
                className="text-blue-500 mr-3"
                onClick={() =>
                openReschedulefunc(index, row)
                }
                >
                {<CalendarMonthIcon />}
                </a>
                </Tooltip>
                {/* ):""} */}
                </>
                ) : (
                ""
                )}
                {billingAction ? (
                <>
                {row["Appointment Status"] == "Confirm" ? (
                <Tooltip title="Billing">
                <a
                className=" w-4 mt-1"
                onClick={() =>
                props.routeBilling(index, row)
                }
                >
                Billing
                </a>
                </Tooltip>
                ) : (
                ""
                )}
                </>
                ) : (
                ""
                )}
                {confirmAction ? (
                <>
                {row.patientVisitId == null ? (
                <Tooltip title="Confirm Appointment">
                <a
                href="##"
                className="text-green-600 mr-3"
                // onClick={() => props.deleteRow()}
                >
                <button
                onClick={() =>
                props.openConfirmfunc(index, row)
                }
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
                </>
                ) : (
                ""
                )}
                </div>
                </TableCell>
                ) : (
                ""
                )}

                {/* srNo */}
                <TableCell className="whitespace-nowrap">
                        {row['srNo']}
                </TableCell>
                {/* firstName */}
                <TableCell className="whitespace-nowrap">
                        {row['firstName']}
                </TableCell>
                {/* lastName */}
                <TableCell className="whitespace-nowrap">
                        {row['lastName']}
                </TableCell>
                {/* mobileNo */}
                <TableCell className="whitespace-nowrap">
                        {row['mobileNo']}
                </TableCell>

                {/* isAdmin */}
                <TableCell className="whitespace-nowrap">
                        {
                                row['isAdmin'] === true ? 
                                (
                                <button className="border border-green-600 text-center rounded px-5 text-green-600 w-full">
                                True
                                </button>
                                ) : 
                                (
                                <button className="border border-red-500 text-center rounded px-3 text-red-500 w-full">
                                False
                                </button>
                                )
                        }
                </TableCell>
                {/* isClinical */}
                <TableCell className="whitespace-nowrap">
                        {
                                row['isClinical'] === true ? 
                                (
                                <button className="border-2 border-green-600 text-center rounded px-5 text-green-600 w-full">
                                True
                                </button>
                                ) : 
                                (
                                <button className="border border-red-500 text-center rounded px-3 text-red-500 w-full">
                                False
                                </button>
                                )
                        }
                </TableCell>

                {/* units */}
                <TableCell className="whitespace-nowrap">
                        <div className="space-x-4">
                                {row['units'] && row['units'].map((value, iu) => (
                                <button className="border border-blue-500 text-center rounded px-3 text-blue-500">
                                {value.label}
                                </button>
                                ))}
                        </div>
                </TableCell>
                {/* departments */}
                <TableCell className="whitespace-nowrap">
                        <div className="space-x-4">
                                {row['departments'] && row['departments'].map((value, iu) => (
                                <button className="border border-blue-500 text-center rounded px-3 text-blue-500">
                                {value.label}
                                </button>
                                ))}
                        </div>
                </TableCell>

                {/* gender */}
                <TableCell className="whitespace-nowrap">
                        {row['gender'].label}
                </TableCell>
                {/* birthDate */}
                <TableCell className="whitespace-nowrap">
                        {row['birthDate']}
                </TableCell>
                {/* address */}
                <TableCell className="whitespace-nowrap">
                        {row['address']}
                </TableCell>
                {/* country */}
                <TableCell className="whitespace-nowrap">
                        {row['country'].label}
                </TableCell>

                {/* state */}
                <TableCell className="whitespace-nowrap">
                        {row['state'].label}
                </TableCell>

                {/* district */}
                <TableCell className="whitespace-nowrap">
                        {row['district'].label}
                </TableCell>

                {/* city */}
                <TableCell className="whitespace-nowrap">
                        {row['city'].label}
                </TableCell>

                {/* area */}
                <TableCell className="whitespace-nowrap">
                        {row['area'].label}
                </TableCell>

                {/* loginApplicable */}
                <TableCell className="whitespace-nowrap">
                        {
                                row['loginApplicable'] === true ? 
                                (
                                <button className="border border-green-600 text-center rounded px-5 text-green-600 w-['0.4rem']">
                                True
                                </button>
                                ) : 
                                (
                                <button className="border border-red-500 text-center rounded px-3 text-red-500 w-['0.4rem']">
                                False
                                </button>
                                )
                        }
                </TableCell>
                {/* doctorShareApplicable */}
                <TableCell className="whitespace-nowrap flex justify-center">
                        <div className="w-20 text-center border">
                        {
                                row['doctorShareApplicable'] === true ? 
                                (
                                <button className="border border-green-600 text-center rounded px-5 text-green-600 w-20" >
                                        True 
                                </button>
                                ) : 
                                (
                                <button className="border border-red-500 text-center rounded px-3 text-red-500 w-20" >
                                        False
                                </button>
                                )
                        }
                        </div>
                </TableCell>
                {/* concessionApplicable */}
                <TableCell className="whitespace-nowrap">
                        
                        <div className="w-20 text-center border">
                        {
                                row['concessionApplicable'] === true ? 
                                (
                                <button className="w-20 border border-green-600 text-center rounded px-5 text-green-600">
                                True
                                </button>
                                ) : 
                                (
                                <button className="w-20 border border-red-500 text-center rounded px-3 text-red-500">
                                False
                                </button>
                                )
                        }
                        </div>
                </TableCell>

                {/* createdBy */}
                <TableCell className="whitespace-nowrap">
                        {row['createdBy']}
                </TableCell>
                {/* lastModifiedBy */}
                <TableCell className="whitespace-nowrap">
                        {row['lastModifiedBy']}
                </TableCell>
                {/* createdDate */}
                <TableCell className="whitespace-nowrap">
                        {row['createdDate']}
                </TableCell>
                {/* lastModifiedDate */}
                <TableCell className="whitespace-nowrap">
                        {row['lastModifiedDate']}
                </TableCell>
        
        </TableRow>
        );
        })}

        </>}
        </TableBody>
        
        </Table>
        </TableContainer>

</Paper>
</Box>
</div>
);
}