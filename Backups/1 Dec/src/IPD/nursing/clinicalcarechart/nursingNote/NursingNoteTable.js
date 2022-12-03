import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

export default function NursingNoteTable(props) {
  const [rowIndex, setRowIndex] = React.useState("");
  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
    props.setNoteInfo(row);
  };

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                  height: 20,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-60 2xl:h-72"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      Date And Time
                    </TableCell>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      User Name
                    </TableCell>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      Message
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.map((row, index) => (
                    <TableRow
                      key={index.id}
                      onClick={() => handleClick(index, row)}
                      style={{
                        backgroundColor: rowIndex === index ? "#bdb6ec" : "",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.dateTime}
                      </TableCell>
                      <TableCell>{row.addedBy}</TableCell>
                      <TableCell>{row.subjective}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
