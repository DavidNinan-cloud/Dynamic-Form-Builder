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
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    maxHeight: 240,
    overflowY: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    maxHeight: 300,
    overflowY: "auto",
  },
  [theme.breakpoints.up("xl")]: {
    maxHeight: 520,
    overflowY: "auto",
  },
}));
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

export default function NoApiCommonMasterTable(props) {
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [rowIndex, setRowIndex] = React.useState("");

  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };

  const handleCheckClick = (event, index, row) => {
    console.log("Checkbox value is " + event.target.checked);

    console.log("Selected row object is " + JSON.stringify(row));

    if (event.target.checked === true) {
      setRowIndex(index);
    } else if (event.target.checked === false) {
      setRowIndex("");
    }
  };

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

  //table start
  return (
    <>
      <div className="grid w-[100%]">
      <Root
      sx={{
        "&::-webkit-scrollbar": {
          width: 7,
          height: 5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#7393B3",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#89CFF0",
        },
      }}
    >
        <Box sx={{ width: "100%", overflow: "hidden"}}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer    
            sx={{
              "&::-webkit-scrollbar": {
                width: 10,
                height: 5,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#7393B3",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "lightBlue",
              },
            }} className="rounded h-56">
              <Table size="small" stickyHeader aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    {/* heading of table */}
                    {headers.map((header, index) => (
                      <TableCell
                        sortDirection={orderBy === header ? order : false}
                        className="whitespace-nowrap"
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
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(props.data.result, getComparator(order, orderBy))
                    // use that time show all rows
                    .map((row, index) => {
                      if (props.checkboxVisible === false) {
                        return (
                          <TableRow
                            key={index.id}
                            tabIndex={-1}
                            onClick={() => handleClick(index, row)}
                            style={{
                              backgroundColor:
                                rowIndex === index ? "#FFC44B" : "",
                            }}
                          >
                            {headers &&
                              headers.map((header, i) => (
                                <TableCell
                                  className="whitespace-nowrap"
                                  key={row.id}
                                >
                                  {row[header]}
                                </TableCell>
                              ))}
                          </TableRow>
                        );
                      } else if (props.checkboxVisible === true) {
                        return (
                          <TableRow
                            key={index.id}
                            tabIndex={-1}
                            style={{
                              backgroundColor:
                                rowIndex === index ? "#FFC44B" : "",
                            }}
                          >
                            <TableCell>
                              <input
                                onClick={(event) =>
                                  handleCheckClick(event, index, row)
                                }
                                type="checkbox"
                              />
                            </TableCell>

                            {headers &&
                              headers.map((header, i) => (
                                <TableCell
                                  className="whitespace-nowrap"
                                  key={row.id}
                                >
                                  {row[header]}
                                </TableCell>
                              ))}
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        </Root>
      </div>
    </>
  );
}
