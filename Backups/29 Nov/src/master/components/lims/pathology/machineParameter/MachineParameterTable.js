import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function MachineParameterTable(props) {
  const { rows } = props;
  return (
    <TableContainer component={Paper} elevation={1}>
      {rows.length > 0 && (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Machine Name</TableCell>
              <TableCell>Parameter Code</TableCell>
              <TableCell>Parameter Description</TableCell>
              <TableCell>Status</TableCell>
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
                  <TableCell>{row.machine.name}</TableCell>
                  <TableCell>{row.parameterCode}</TableCell>
                  <TableCell>{row.parameterDescription}</TableCell>
                  <TableCell>
                    {row.status.toString() === "true" ? (
                      <button className="border border-green-800 text-center rounded px-2 text-green-800">
                        Active
                      </button>
                    ) : (
                      <button className="border border-red-500 text-center rounded px-2 text-red-500">
                        InActive
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <DeleteOutlineOutlinedIcon
                      className="text-red-500 cursor-pointer"
                      onClick={() => props.handleDelete(row, index)}
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
