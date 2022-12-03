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

const HelpValuesTable = (props) => {
  const { rows, handleHelpValuesEdit } = props;
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ height: "100%" }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F1F1F1" }}>
            <TableCell>Help Values</TableCell>

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
              <TableCell>{row.value || row.addHelpValues}</TableCell>

              <TableCell>
                <DriveFileRenameOutlineIcon
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleHelpValuesEdit(row, index)}
                />
                <DeleteOutlineOutlinedIcon className="text-red-500 cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HelpValuesTable;
