import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  TablePagination,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export default function IndentListTable(props) {
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

  //actions
  const [printAction, setPrintAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);

  // which we can update by calling on setRows function
  const [rows, setRows] = React.useState([{ id: 1, qty: "" }]);
  const [disable, setDisable] = React.useState(true);
  React.useEffect(() => {
    console.log("The props for CommonDetails Table are ", props);
  }, [props]);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...headers];
    list[index][qty] = value;
    setRows(list);
  };

  // to input elements and record their values in state
  const handleInputBatchNoChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...headers];
    list[index][batchno] = value;
    setRows(list);
  };

  // React.useEffect(() => {
  //   props.data.actions.forEach((action) => {
  //     if (action === "Print") {
  //       setPrintAction(true);
  //     }
  //     if (action === "Delete") {
  //       setDeleteAction(true);
  //     }
  //   });
  // }, []);


  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 2, border: "1px solid lightgray" }}>
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
              className="rounded h-56 2xl:h-auto"
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
                        className="whitespace-nowrap"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index, i) => {
                    console.log("row is", JSON.stringify(row));
                    return (
                      <TableRow key={index}>
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                              {/* {printAction ? (
                                <Tooltip title="Print Consent">
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-[#e28a42] mr-1"
                                  >
                                    <LocalPrintshopIcon
                                    // onClick={(e) => {
                                    //   props.setOpen(true);
                                    //   props.editRow(row);
                                    // }}
                                    />
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )} */}

                              {deleteAction ? (
                                <Tooltip title="Delete Consent">
                                  <a
                                    href="##"
                                    className="text-[#df2f2f] mr-3"
                                    // onClick={() => deleteRow(index)}
                                  >
                                    {<DeleteOutlineOutlinedIcon />}
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
                            <TableCell className="whitespace-nowrap" key={i}>
                              <span>{row[header]}</span>
                              {header === "Qty" ? (
                                <input
                                  className="border rounded border-black w-24"
                                  type="number"
                                  size="small"
                                  // name="qty"
                                  // value={row.Qty}
                                  // onChange={(e) => handleInputChange(e, i)}
                                  // onKeyPress={(event) => {
                                  //   if (!/[0-9]/.test(event.key)) {
                                  //     event.preventDefault();
                                  //   }
                                  // }}
                                />
                              ) : (
                                ""
                              )}
                              {header === "Batch No" ? (
                                <input
                                  className="border rounded border-black w-24"
                                  type="number"
                                  size="small"
                                  // name="batchno"
                                  // value={row.batchno}
                                  // onChange={(e) => handleInputBatchNoChange(e, i)}
                                  // onKeyPress={(event) => {
                                  //   if (!/[0-9]/.test(event.key)) {
                                  //     event.preventDefault();
                                  //   }
                                  // }}
                                />
                              ) : (
                                ""
                              )}
                            </TableCell>
                          ))}
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
