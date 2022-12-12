import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  TablePagination,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

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

export default function InPatientTable(props) {
  const {
    tableApiFunc,
    searchString,
    dataResult,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count,
    setDataResult,
  } = props;

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [oldCount, setOldCount] = React.useState();

  //actions
  const [printAction, setPrintAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [consentFor, setConsentFor] = React.useState(true);
  const [viewfile, setViewFile] = React.useState(true);

  // const [rowIndex, setRowIndex] = React.useState("");
  // const handleClick = (index, row) => {
  //   console.log("Selected row object is " + JSON.stringify(row));
  //   setRowIndex(index);
  // }; //use for change color click on row click

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
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  //  const checkCallApi = (pageNo, rowsPerPageNo, oldTotal) => {
  //   pageNo = pageNo + 1;
  //   let newTotal = pageNo * rowsPerPageNo;
  //   console.log("oldTotal", oldTotal);
  //   console.log("newTotal", newTotal);

  //   let arr = [...dataResult];
  //   let totalDataLength = count;
  //   let availableDataLength = arr.length;
  //   if (totalDataLength > availableDataLength) {
  //     // page has moved forward
  //     console.log("page", pageNo);
  //     console.log("rowsPerPage", rowsPerPageNo);
  //     console.log("totalDataLength", totalDataLength);
  //     console.log("availableDataLength", availableDataLength);

  //     // if i dont have total record to show
  //     if (newTotal > availableDataLength) {
  //       //
  //       let require = newTotal - availableDataLength;
  //       let toShow = availableDataLength + require;

  //       // check available vs needed
  //       // needed is less than count
  //       let needed;
  //       if (toShow < totalDataLength) {
  //         needed = newTotal - oldTotal;
  //         callAgainTableApi(needed);
  //       } else if (toShow > totalDataLength) {
  //         needed = toShow - totalDataLength;
  //         callAgainTableApi(needed);
  //       } else {
  //         needed = rowsPerPageNo;
  //         callAgainTableApi(needed);
  //       }
  //     }
  //   }
  // };

  // const callAgainTableApi = (recordsNeeded) => {
  //   console.log("defaultParams", defaultParams);
  //   tableApiFunc(defaultParams)
  //     .then((response) => response.data)
  //     .then((res) => {
  //       let incomingData = res.result;
  //       let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded));

  //       // append needed data
  //       let existData = [...dataResult];
  //       for (let value of onlyNeededData) {
  //         existData.push(value);
  //       }
  //       setDataResult(existData);
  //     });
  // };

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

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
      if (action === "Print") {
        setPrintAction(true);
      }
      if (action === "Delete") {
        setDeleteAction(true);
      }
      if (action === "ChooseFile") {
        setConsentFor(true);
      }
      if (action === "ViewFile") {
        setViewFile(true);
      }
    });
  }, []);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 1 }}>
            {/* pagination */}
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
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
                      <label>
                        Import Data
                        <input
                          type="file"
                          style={{ display: "none" }}
                          name="file"
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => props.uploadExcelData(e)}
                        ></input>
                      </label>
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
                  height: 7,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-[60%]"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell>

                    {headers.map((header, index) => (
                      <TableCell
                        sortDirection={orderBy === header ? order : false}
                        className="whitespace-nowrap justify-between"
                        key={index}
                        style={{ background: "#F1F1F1" }}
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
                  {stableSort(dataResult, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    // props.data.result.map((row, index) => {
                    .map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          onClick={(e) => {
                            // handleClick(index, row); //use for change color click on row click
                            // props.handleOpenRowModal(true);
                            // props.editRow(row);
                          }}
                          // style={{
                          //   backgroundColor: rowIndex === index ? "#FFC44B" : "",
                          // }}    //use for change color click on row click
                        >
                          {props.data.actions.length > 0 ? (
                            <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                              <div className="flex">
                                {printAction ? (
                                  <Tooltip title="Print Consent">
                                    <a
                                      href="##"
                                      value="click"
                                      className="text-[#e28a42] mr-1"
                                      onClick={() => {
                                        window.print();
                                        console.log("Click on Print Icon");
                                      }}
                                    >
                                      {<LocalPrintshopIcon />}
                                    </a>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}

                                {/* {deleteAction ? (
                                <Tooltip title="Delete Consent">
                                  <a
                                    href="##"
                                    className="text-[#df2f2f] mr-3"
                                    onClick={() => props.deleteRow(row)}
                                    // onClick={() => props.deleteRow(index)}
                                  >
                                    {<DeleteIcon />}
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )} */}
                              </div>
                            </TableCell>
                          ) : (
                            ""
                          )}
                          {headers &&
                            headers.map((header, i) => (
                              <TableCell
                                className="whitespace-nowrap"
                                key={i}
                                onClick={() => {
                                  props.handleOpenRowModal(true);
                                  props.rowClick(row, index);
                                }}
                              >
                                {row[header]}
                              </TableCell>
                            ))}
                        </TableRow>
                      );
                    })}
                  {/* } */}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
