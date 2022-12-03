import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";

const BedTransferHistory = () => {
  const [value, setValue] = React.useState(null);
  const [openDate, setOpenDate] = useState(false);
  return (
    <div className="mt-2 ml-8 mr-6">
      <div className="flex my-4">
        <p className="font-bold my-auto ml-4">List of Bed Transfer</p>
        <div className="mx-8">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              open={openDate}
              onOpen={() => setOpenDate(true)}
              onClose={() => setOpenDate(false)}
              defaultValue={new Date()}
              label="Find By Date"
              inputProps={{ readOnly: true }}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Find By Date"
                  onClick={(e) => setOpenDate(true)}
                  sx={{ backgroundColor: "white" }}
                />
              )}
              PopperProps={{ placement: "auto-end" }}
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
        </div>
      </div>

      {/* //Table// */}
      <TableContainer style={{ height: "12rem", backgroundColor: "white" }}>
        <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  paddingY: 0.5,
                  backgroundColor: "#F1F1F1",
                },
              }}
            >
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Date
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Service Code
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Description
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Quantity
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02-11-2022</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>05</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BedTransferHistory;
