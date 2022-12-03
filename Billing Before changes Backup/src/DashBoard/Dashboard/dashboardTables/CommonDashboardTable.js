import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";

const CommonDashboardTable = (props) => {
  console.log("Props", props);
  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  const allHeaders = Object.keys(props.data.result[0]);

  // Appointment Id
  // :
  // 266
  // Appointment Status

  // Department Name

  // Doctor Name

  // Mobile Number

  const headers = removeHeaders(allHeaders, [
    "id",
    "Sr No",
    "Department Id",
    "Created By",
    "Last Modified Date",
    "patientCategoryId",
    "doctorId",
    "Appointment Date",
    "patientVisitId",
    "patientId",
    "Appointment Status",
    "Appointment Id",
    "Appointment time",
    "Mobile Number",
    "patientCategory",
    "company",
    "patientAge",
    "cashBalance",
    // "Doctor Name"
  ]);
  return (
    <div>
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                backgroundColor: "#e2e8f0",
              },
            }}
          >
            {/* heading of table */}
            {headers.map((header, index) => (
              <TableCell className="whitespace-nowrap" key={index}>
                <TableSortLabel>
                  <span className="text-gray-600 font-bold text-sm text-center">
                    {header}
                  </span>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.result.map((row, index) => {
            return (
              <TableRow key={index}>
                {headers &&
                  headers.map((header, i) => (
                    <TableCell className=" text-sm text-center" key={i}>
                      {row[header]}
                    </TableCell>
                  ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonDashboardTable;
