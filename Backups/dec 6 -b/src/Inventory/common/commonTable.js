import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function PurchaseOrderTable(props) {
  console.log(props);
  const {
    searchString,
  } = props;

  //state varibale for the table
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
    <div className="w-auto grid">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ width: "100%", my: 2}}>
          <TableContainer
            className="rounded"
            sx={{
              maxHeight: 250,
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
          >
            <Table
            stickyHeader aria-label="sticky table"
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
                {props.data.result.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "& td": {
                            paddingY: 0.5,
                          },
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap capitalize"
                              key={i}
                            >
                              {header.toLowerCase() === "status" ? (
                                row[header] === true ? (
                                  <button className="border border-green-800 text-center rounded px-[1.18rem] text-green-800">
                                    Active
                                  </button>
                                ) : (
                                  <button className="border border-red-500 text-center rounded px-3 text-red-500">
                                    InActive
                                  </button>
                                )
                              ) : (
                                row[header]
                              )}
                            </TableCell>
                          ))}
                       
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
