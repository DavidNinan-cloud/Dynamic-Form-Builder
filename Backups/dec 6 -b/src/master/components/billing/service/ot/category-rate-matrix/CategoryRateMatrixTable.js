import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal, { FormControl, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { blue } from "@mui/material/colors";
import InputField from "../../../../../../Common Components/FormFields/InputField";
import { Controller, useForm, useFormContext } from "react-hook-form";

import { styled } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#ffffff",
    height: "2rem",
  },
});
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    background: "#F1F1F1",
    position: "sticky",
    top: "0px",
    left: "0px",
    zIndex: 40,

  },
}));

export default function CategoryRateMatrixTable(props) {
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
    categoryData,
  } = props;

  const {
    setValue,
    control,
    watch,
    register,
    // formState: { errors },
  } = useFormContext();
  const methods = useFormContext();

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
  // const allHeaders = Object.keys(props.data[0]);
  const getHeaders = (arr) => {
    let headerArr = [];
    for (let value of arr) {
      headerArr.push(value.class);
    }
    return headerArr;
  };
  const headers = getHeaders(props.data);

  // headers.unshift("#");
  // headers[0] = "#";

  const defaultParams = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
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

  let i = -1;
  //table start
  return (
    <div className="w-auto grid">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ my: 2 }} className="w-full">
          <TableContainer
            className="rounded h:[100%]"
            sx={{
              // maxHeight: 340,
              "&::-webkit-scrollbar": {
                width: 7,
                // height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#7393B3",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "lightBlue",
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.9,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <StyledTableCell>
                    <span className="text-gray-600 font-bold whitespace-nowrap">
                      Category Description
                    </span>
                  </StyledTableCell>

                  {/* heading of table */}
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap text-gray-600 font-bold "
                      key={index}
                      sx={{ width: 300 }}
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

              <TableBody
                sx={{
                  // width: "80%",
                  "& td": {
                    paddingY: 0.5,
                  },
                }}
              >
                {props.categoryData.map((category, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "& td": {
                          paddingY: 1,
                        },
                      }}
                    >
                      {/* colSpan={props.data.length} */}
                      <StyledTableCell>
                        <span className="text-gray-600 font-semibold">
                          {category.categoryDescription}
                        </span>
                      </StyledTableCell>

                      {props.data.map((classData, classIndex) => {
                        i++;
                        setValue(`categoryMatrix[${i}].categoryId`, {
                          id: Number(category.id),
                        });
                        setValue(`categoryMatrix[${i}].classId`, {
                          id: Number(classData.id),
                        });

                        return (
                          <TableCell
                            className="mx-auto "
                            key={classIndex}
                            // colSpan={props.data.length}
              
                          >
                            <div className="">
                              <FormControl>
                                <Controller
                                  render={({ field }) => (
                                    <CustomTextField
                                    sx={{ width: 150 }}
                                      type="number"
                                      name={`categoryMatrix[${i}].rate`}
                                      label=""
                                      {...field}
                                      // error={errors.categoryMatrix?.[i]?.rate}
                                      control={control}
                                      size="small"
                                    />
                                  )}
                                  name={`categoryMatrix[${i}].rate`}
                                  control={control}
                                />
                              </FormControl>
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //table end */}
        </Paper>
      </Box>
    </div>
  );
}
