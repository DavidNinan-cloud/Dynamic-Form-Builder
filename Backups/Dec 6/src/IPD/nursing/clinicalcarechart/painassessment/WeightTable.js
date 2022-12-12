import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { VisitContext } from "../ClinicalCareChart";

export default function DailyWeightTable(props) {
  //state varibale for the table
// console.log("Weight data props:", props);
  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.weightData.result[0]);

  const headers = removeHeaders(allHeaders, ["id"]);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", border: "0.1px solid gainsboro" }}>
            <TableContainer
              className="rounded h-44"
              sx={{
                maxHeight: 230,
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
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead
                  sx={{
                    width: "100%",
                    "& th": {
                      paddingY: 1,
                    },
                  }}
                >
                  <TableRow
                    sx={{
                      width: "100%",
                      "& tr": {
                        paddingY: 1,
                      },
                    }}
                  >
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
                  {props.weightData.result.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th ,&:last-child tr": {
                            border: 0,
                            paddingY: 1,
                          },
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              onClick={() => {
                             console.log("OnClick");
                              }}
                            >
                              {row[header]}
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
