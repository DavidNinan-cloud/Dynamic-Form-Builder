import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function MachineParameterLinkingTable(props) {
  const { rows, handleDelete } = props;
  return (
    <TableContainer component={Paper} elevation={1}>
      {rows.length > 0 && (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Parameter Code</TableCell>
              <TableCell>Parameter Name</TableCell>
              <TableCell>Machine Code</TableCell>
              <TableCell>Machine Name</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row?.parameter?.code}</TableCell>
                  <TableCell>{row?.parameter?.name}</TableCell>
                  <TableCell>{row?.machineParameter?.code}</TableCell>
                  <TableCell>{row?.machineParameter?.name}</TableCell>

                  <TableCell>
                    <DeleteOutlineOutlinedIcon
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(row, index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
