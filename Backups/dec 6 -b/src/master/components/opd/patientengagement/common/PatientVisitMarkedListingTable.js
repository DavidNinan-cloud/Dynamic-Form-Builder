import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
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
export default function CommonTable(props) {
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  const [rowIndex, setRowIndex] = React.useState("");
  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };
  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };
  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);
  console.log("get result array", props.data.result);
  console.log("get actions array", props.data.actions);
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 1 }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded  2xl:h-auto"
            >
              <Table
                size="small"
                stickyHeader
                aria-label="sticky table"
                sx={{
                  border: 1,
                  borderColor: "#e0e0e0",

                  paddingY: "scroll",
                }}
                className="md:h-72"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        paddingY: 0.5,
                        backgroundColor: "#F1F1F1",
                      },
                    }}
                  >
                    {headers.map((header, index) => (
                      <TableCell
                        sortDirection={orderBy === header ? order : false}
                        className="whitespace-nowrap"
                        style={{ background: "#F1F1F1" }}
                      >
                        <TableSortLabel
                          active={false}
                          direction={orderBy === header ? order : "asc"}
                          onClick={createSortHandler(header)}
                          key={index}
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
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow
                        key={index.id}
                        tabIndex={-1}
                        onClick={() => {
                          handleClick(index, row);
                          console.log("row is ");
                          console.log(row);

                          props.setOpdCoordinator(row);
                          props.setOpdCoordinatorEnable(true);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: rowIndex === index ? "#0081a8" : "",
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              // onClick={() => {
                              //   props.displayView(row, index);
                              // }}
                            >
                              {row[header]}
                              {header === "Upload" ? (
                                <div className="p-0 py-1 text-left">
                                  <input type="file" id="files" />
                                  {/* <label
                                    for="files"
                                    className="border p-1 rounded px-2 cursor-pointer"
                                  >
                                    Choose File
                                  </label> */}
                                </div>
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
