import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./painassessment/style.css";
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

const data = [
  {
    id: 1,
    head: "Bed No.",
    roomNo: "201/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 2,
    head: "Patient Name",
    roomNo: "202/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 3,
    roomNo: "203/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 4,
    roomNo: "204/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 5,
    roomNo: "205/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 6,
    roomNo: "206/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 7,
    roomNo: "207/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 8,
    roomNo: "208/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 9,
    roomNo: "209/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
  {
    id: 10,
    roomNo: "210/ ABC",
    patientName: "Lorem ipsum dolor sit Lorem",
  },
];

export default function DenseTable() {
  const [selected, setSelected] = React.useState([1]);

  const handleClick = (event, select) => {
    const selectedIndex = selected.indexOf(select);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, select);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (roomNoNo) => selected.indexOf(roomNoNo) !== -1;

  return (
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
      <div className=" w-auto ">
        <Paper
          sx={{
            width: "100%",
            border: "0.1px solid gainsboro",
          }}
        >
          <TableContainer
            className="rounded"
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
                style={{ background: "#F1F1F1" }}
              >
                <TableRow
                  sx={{
                    width: "100%",
                    "& tr": {
                      paddingY: 1,
                    },
                  }}
                >
                  {data.map((header) => {
                    <TableCell
                      style={{
                        fontWeight: "600",
                        paddingY: 1,
                        backgroundColor: "#F1F1F1",
                      }}
                      align="left"
                    >
                      {header.head}
                    </TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th ,&:last-child tr": {
                          border: 0,
                          paddingY: 1,
                        },
                      }}
                      style={{ pointer: "cursor" }}
                      role="checkbox"
                      onClick={(event) => handleClick(event, row.id)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell
                        sx={{ paddingY: 1 }}
                        align="left"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        className="whitespace-nowrap capitalize"
                      >
                        {row.roomNo}
                      </TableCell>
                      <TableCell
                        sx={{ paddingY: 1 }}
                        align="left"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        className="whitespace-nowrap capitalize"
                      >
                        {row.patientName}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Root>
  );
}
