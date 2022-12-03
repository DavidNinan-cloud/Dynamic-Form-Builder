import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";

function createData(
  dateandtime,
  behaviorcore,
  cardiovasculascore,
  respiratoryscore
) {
  return {
    dateandtime,
    behaviorcore,
    cardiovasculascore,
    respiratoryscore,
  };
}

const rows = [
  createData("01/02/2022, 11:30AM", "12", "14", "20 "),
  createData("02/02/2022, 11:30AM", "08", "05 ", "10 "),
  createData("01/02/2022, 11:30AM", "12", "14", "20 "),
  createData("01/02/2022, 11:30AM", "12", "14", "20 "),
  createData("01/02/2022, 11:30AM", "12", "14", "20 "),
];

export default function PewsTable() {
  return (
    <div className=" w-auto ">
      <Paper sx={{ width: "100%", border: "0.1px solid gainsboro" }}>
        <TableContainer
          className="rounded "
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
          <Table stickyHeader aria-label="sticky table">
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
                <TableCell
                  style={{
                    fontWeight: "600",
                    paddingY: 1,
                    backgroundColor: "#F1F1F1",
                  }}
                  align="left"
                >
                  Date And Time
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    paddingY: 1,
                    backgroundColor: "#F1F1F1",
                  }}
                  align="left"
                >
                  Behavior Score
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    paddingY: 1,
                    backgroundColor: "#F1F1F1",
                  }}
                  align="left"
                >
                  Cardiovascula Score
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    paddingY: 1,
                    backgroundColor: "#F1F1F1",
                  }}
                  align="left"
                >
                  Respiratory Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.srNo}
                  sx={{
                    "&:last-child td, &:last-child th ,&:last-child tr": {
                      border: 0,
                      paddingY: 1,
                    },
                  }}
                >
                  <TableCell
                    sx={{ paddingY: 1 }}
                    align="left"
                    className="whitespace-nowrap capitalize"
                  >
                    {row.dateandtime}
                  </TableCell>
                  <TableCell
                    sx={{ paddingY: 1 }}
                    align="left"
                    className="whitespace-nowrap capitalize"
                  >
                    {row.behaviorcore}
                  </TableCell>
                  <TableCell
                    sx={{ paddingY: 1 }}
                    align="left"
                    className="whitespace-nowrap capitalize"
                  >
                    {row.cardiovasculascore}
                  </TableCell>
                  <TableCell
                    sx={{ paddingY: 1 }}
                    align="left"
                    className="whitespace-nowrap capitalize"
                  >
                    {row.respiratoryscore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
