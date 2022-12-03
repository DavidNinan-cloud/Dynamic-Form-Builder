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
import { MdDelete } from "react-icons/md";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const AddRangeTable = (props) => {
  const { rows, handleAgeRangeEdit } = props;
  return (
    <div>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ height: "100%" }} aria-label="simple table" size="small">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>Age Type</TableCell>
              <TableCell>Age From</TableCell>
              <TableCell>Age To</TableCell>
              <TableCell>Lower</TableCell>
              <TableCell>Upper</TableCell>
              <TableCell>Critical Lower</TableCell>
              <TableCell>Critical Upper</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell>{row.gender.label}</TableCell>
                <TableCell>{row.ageType.label}</TableCell>
                <TableCell>{row.ageFrom}</TableCell>
                <TableCell>{row.ageTo}</TableCell>
                <TableCell>{row.lower}</TableCell>
                <TableCell>{row.upper}</TableCell>
                <TableCell>{row.criticalLower}</TableCell>
                <TableCell>{row.criticalUpper}</TableCell>
                <TableCell>
                  <DriveFileRenameOutlineIcon
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleAgeRangeEdit(row, index)}
                  />
                  <DeleteOutlineOutlinedIcon className="text-red-500 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddRangeTable;
