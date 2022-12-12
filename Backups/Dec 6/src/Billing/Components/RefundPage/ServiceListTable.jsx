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
import { useForm, useFormContext } from "react-hook-form";
import ControlledInputField from "../../../Common Components/FormFields/ControlledInputField";
import { FormControl } from "@mui/material";
import { TextFields } from "@mui/icons-material";
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
  const {drawerOpen , serviceList ,setServiceList} = props

  const [spinner, showSpinner] = React.useState(false);
  const [oldCount, setOldCount] = React.useState();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  //show and hide button
  const [visible, setVisible] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  // const [open, setOpen] = React.useState();

  //actions
  const [cancelAction, setCancelAction] = React.useState(false);

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
  const allHeaders = Object.keys(props.serviceList[0]);

  const headers = removeHeaders(allHeaders, ["id","billId","billInfoId"]);

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

  // console.log("actions array", props.result.actions);
  //table start
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [checkIndex,setCheckIndex] = React.useState(null)
  return (
    <div className=" mx-auto w-full">
      <Box 
      sx={{width:"100%"}}
      // sx={drawerOpen ? 
      // { width: {sm:'30rem', md:'30rem',tab:'58rem', lg:'100%'}, maxWidth:{sm:'36rem', md:'30rem', tab:'58rem', lg:'100%'} }
      // : { width: {sm:'30rem', md:'30rem',tab:'68rem', lg:'100%'}, maxWidth:{sm:'40rem', md:'40rem', tab:'68rem', lg:'100%'}}
      // }
      >
        <Paper sx={{ width: "100%", mb: 2 }}>
          
          <TableContainer sx={{ marginTop: "0.8rem" }} className="rounded ">
            <Table>
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
                    className="text-gray-600 font-bold whitespace-nowrap text-sm  w-10"
                  >
                    Select Service To Edit
                  </TableCell>
                  {/* heading of table */}
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap"
                      key={index}
                    >
                      {/* <TableSortLabel
                        active={false}
                        direction={orderBy === header ? order : "asc"}
                        onClick={createSortHandler(header)}
                      > */}
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                        {/* {orderBy === header ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel> */}
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
                {
                // stableSort(
                //   serviceList,
                //   getComparator(order, orderBy)
                // )
                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                  serviceList.map((row, index) => {
                    console.log('max amount',Number(row.Amount) - Number(row['Refund Amount']))
                    setValue(`refund[${index}].maxAmount`,Number(row.Amount) - Number(row['Refund Amount']))
                    setValue(`refund[${index}].amount`,row.Refund)
                    return (
                      <TableRow key={index}
                      sx={{
                        "& td": {
                          paddingY: 1,
                        },
                      }}
                      >
                          <TableCell className="flex  justify-center ">
                            <div className="flex justify-center ">
                                 <ControlledCheckBoxField
                                    name={`service${index}`}
                                    // label={element.placeholder}
                                    onChange={(value) => {
                                            if(checkIndex !== index){
                                              setCheckIndex(index)
                                            }else{
                                              setCheckIndex(null)
                                            }
                                        }}
                                    value={checkIndex == index ? true : false}
                                    defaultValue={false}
                                    control={control}
                                />
                            </div>
                          </TableCell>
                        {headers &&
                          headers.map((header, headersIndex) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={headersIndex}
                            >
                              {/* <FormControl className="w-full hidden">
                            <TextFields
                              variant="outlined"
                              color="primary"
                              fullWidth
                              size="small"
                              value="View Slots"
                            />
                          </FormControl> */}
                          
                              { 
                                header == 'Refund' ? (
                                  <>
                                  {
                                     checkIndex == index && props.refundArray[index].maxAmount > 0 ? (
                                      <>  
                                            <ControlledInputField
                                                name={`refund[${index}].amount`}
                                                inputRef={{...register(`refund[${index}].amount`,{
                                                    onChange: (e) => {
                                                        let input = e.target.value
                                                        //  if(input <=  row.Amount){
                                                          let arr = [...serviceList]
                                                          arr[index].Refund = e.target.value
                                                          setServiceList(arr)
                                                        // }
                                                        // else{
                                                        //   let word = Array.from(input)
                                                        //   word.pop()
                                                        //   let str = ''
                                                        //   for(let o of word){
                                                        //     str+= o
                                                        //   }
                                                        //   setValue(`refund[${index}].amount`,str)
                                                        // }
                                                    },
                                                    })}}
                                                value={row.Refund}
                                                defaultValue={row.Refund}
                                                error={errors.refund?.[index]?.amount}
                                                control={control}
                                            />
                                      </>):(
                                        <>{row[header]}</>
                                      )
                                  }
                                  </>
                                ):(
                                  <>{row[header]}</>
                                )
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
        </Paper>
      </Box>
    </div>
  );
}