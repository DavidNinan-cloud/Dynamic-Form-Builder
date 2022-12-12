import React, { useReducer } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const data = [
  {
    id: 1,
    name: "ACTIVATED CLOTTING TIME (ACT)",
    service: "Select"
  },
  {
    id: 2,
    name: "PACKAGE FOR NORMAL DELIVERY (PN)",
    service: "Service"
  }
];
const reducer = (state, action) => {
  return { checkedId: action.id };
};

export default function StickyHeadTable() {
  const [selected, setSelected] = React.useState([]);
  const [state, dispatch] = useReducer(reducer, {});
  const handleClick = (event, data) => {
    let newSelected = [data.name];
    setSelected(newSelected);
    console.log(data.name);
  };
  const isSelected = (row) => selected.indexOf(row.name) !== -1;
  const CheckBox = ({ id }) => (
    <input 
      id={id}
      onClick={() => dispatch({ id })}
      // checked={state.checkedId === id}
      type="checkbox"
    />
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{
                    "& th": {
                      paddingY: 0.8,
                      backgroundColor: "#F1F1F1"
                    },
                  }}
                  >
              {data.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.service}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow
                sx={{
                  "& td": {
                    paddingY: 0.8,
                  },
                }}
                  hover
                  tabIndex={-1}
                  key={row.name}
                  onClick={(event) => handleClick(event, row)}
                  selected={isItemSelected}
                >
                  <TableCell sx={{ pl:3 }} padding="checkbox" align="left">
                    <CheckBox id={row.id} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
