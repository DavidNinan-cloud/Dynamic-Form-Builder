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
import { TableSortLabel, TextField, Tooltip } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Controller, useFormContext } from "react-hook-form";
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

export default function OTConsentTable(props) {
  const {
    tableApiFunc,
    searchString,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    dataResult,
    setDataResult,
  } = props;

  console.log("Props is here", props);

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  //actions
  const [printAction, setPrintAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [consentFor, setConsentFor] = React.useState(true);
  const [viewfile, setViewFile] = React.useState(true);

  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  // const {
  //   control,
  //   watch,
  //   register,
  //   setValue,
  //   reset,
  // } = useFormContext();

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

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  console.log("row of header", headers);
  // console.log("row of header",row[header] );
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 1 }}>
            <TableContainer
              sx={{
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
              }}
              className="rounded h-56"
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
                        </TableSortLabel>
                      </TableCell>
                    ))}

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">
                        Upload Consent
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(dataResult, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
                    .map((row, index) => {
                      return (
                        <TableRow key={index}>
                          {props.data.actions.length > 0 ? (
                            <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                              <div className="flex">
                                {printAction ? (
                                  <Tooltip title="Print Consent">
                                    <a
                                      href="##"
                                      value="click"
                                      className="text-[#e28a42] mr-1"
                                    >
                                      <LocalPrintshopIcon />
                                    </a>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}

                                {deleteAction ? (
                                  <Tooltip title="Delete Consent">
                                    <a
                                      href="##"
                                      className="text-[#df2f2f] mr-3"
                                      onClick={() => props.deleteRow(row)}
                                    >
                                      {<DeleteIcon />}
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
                            headers.map((header, i) => (
                              <TableCell
                                className="whitespace-nowrap"
                                key={i}
                                onClick={() => {
                                  props.displayView(row, index);
                                }}
                              >
                                {row[header]}
                              </TableCell>
                            ))}

                          <TableCell className="whitespace-nowrap">
                            {row["Consent For"] ? (
                              <>
                                <div className="flex gap-2">
                                  <Tooltip title="View">
                                    <a
                                      href="##"
                                      value="click"
                                      className="text-[#29a8da] mr-1"
                                    >
                                      <VisibilityIcon className="" />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title="Change Consent">
                                    <button className="border px-2 text-black bg-gray-100 border-gray-400 rounded-lg">
                                      Change
                                    </button>
                                  </Tooltip>
                                </div>
                              </>
                            ) : (
                              <Tooltip title="Choose file here">
                                {/* <TextField
                                  sx={{
                                    "& fieldset": { border: "none" },
                                  }}
                                  type="file"
                                  size="small"
                                  fullWidth
                                  name="roomImageName"
                                  id="roomImageName"
                                /> */}

                                <label
                                  htmlFor="identificationDoc"
                                  className="ml-2 cursor-pointer text-black border px-3 py-0.5 bg-gray-100 border-gray-400 rounded-lg"
                                >
                                  Choose File
                                  <TextField
                                    sx={{
                                      "& fieldset": { border: "none" },
                                      display: "none",
                                    }}
                                    type="file"
                                    size="small"
                                    fullWidth
                                    name="identificationFile"
                                    id="identificationDoc"
                                    variant="outlined"
                                  />
                                </label>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
