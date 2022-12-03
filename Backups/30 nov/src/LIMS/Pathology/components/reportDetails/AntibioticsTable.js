import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  List,
} from "@mui/material";

const AntibioticsTable = (props) => {
  const { rows } = props;
  return (
    <div>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ height: "100%" }} aria-label="simple table" size="small">
          <TableHead sx={{ backgroundColor: "lightgrey" }}>
            <TableRow>
              <TableCell>Antibiotics</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.testName}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.testName}
                </TableCell>
                <TableCell>{row.subTestName}</TableCell>
                <TableCell>{row.parameter}</TableCell>
                {/* <TableCell
                  className={`${
                    row.reportValues === 600 ? "bg-green-300" : "bg-orange-300"
                  }`}
                >
                  {row.reportValues}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AntibioticsTable;
