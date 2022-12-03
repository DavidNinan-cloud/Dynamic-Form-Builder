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
import PrintIcon from '@mui/icons-material/Print';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import ArticleIcon from '@mui/icons-material/Article';
import ControlledCheckBoxField from "../../../Common Components/FormFields/ControlledCheckBoxField";
import { useForm } from "react-hook-form";
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

export default function BillList(props) {
    //state varibale for the table
    const { 
      checkIndex,
      setCheckIndex, 
      dataResult } = props
  
    const [spinner, showSpinner] = React.useState(false);
    const [oldCount, setOldCount] = React.useState();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState();
    //show and hide button
    const [visible, setVisible] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
  
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
    const allHeaders = Object.keys(props.dataResult[0]);
  
    const headers = removeHeaders(allHeaders, ["id","billId","cashBalance"]);
  
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
  


    const methods = useForm({
      mode: "onChange",
      // resolver: yupResolver(schema),
      defaultValues:{
          other:'',
          cancelType:''
      } 
  });
  const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;
  
    return (
      <div className=" mx-auto w-full">
        <Box 
        sx={{width:"100%"}}
        >
          <Paper sx={{ width: "100%", mb: 2 , overflow: 'hidden'}}>

            <TableContainer sx={{ marginTop: "0.8rem",maxHeight: 360  }} className="rounded ">
              <Table stickyHeader>
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
                      sx={{ fontWeight: "bold", color: "#515563" }}
                      className="text-gray-600 font-bold whitespace-nowrap text-sm"
                    >
                      Select Bill
                    </TableCell>
                    {/* heading of table */}
                    {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                      >
                          <span className="text-gray-600 font-bold">
                            {header}
                          </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {spinner ? (
                    <div className=" flex mx-auto justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : <>
                  {
                    dataResult.map((row, index) => {
                      return (
                        <TableRow key={index}
                        sx={{
                          "& td": {
                            paddingY: 1,
                          },
                        }}
                        >
                            <TableCell className="px-4 py-1 flex  justify-center whitespace-nowrap ">
                              <div className="flex justify-center ">
                                   <ControlledCheckBoxField
                                      name={`bill${index}`}
                                      onChange={(value) => {
                                            let arr = [...checkIndex] 
                                            arr[index] = value
                                            setCheckIndex(arr)
                                          }}
                                      value={checkIndex[index] ? true : false}
                                      defaultValue={false}
                                      control={control}
                                  />
                              </div>
                            </TableCell>
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
          </Paper>
        </Box>
      </div>
    );
  }
