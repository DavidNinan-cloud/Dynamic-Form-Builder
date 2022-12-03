import React from "react";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    TextField,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import { useForm } from "react-hook-form";
  import { styled } from "@mui/material/styles";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";


const DrugAdministratorDetailsData = {
    message: "Drug Administrator Details list found ",
    result: [
      {
        Id: 30,
        Date: "01/02/2022",
        PatientDrugDetails: [
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
        ],
      },
      {
        Id: 56,
        Date: "03/02/2022",
        PatientDrugDetails: [
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
        ],
      },
    ],
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#F1F1F1",
      position: "sticky",
      top: "0px",
      left: "0px",
      zIndex: 50,
    },
  }));
export default function OTSchedualing({}){
    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };
    
      //set rows object to table
      const allHeaders = Object.keys(
        DrugAdministratorDetailsData.result[0].PatientDrugDetails[0]
      );
    
      const headers = removeHeaders(allHeaders, ["Id"]);
    return(
        <>
        {/* table */}
        
        <div className="mt-2 bg-white ">
                  <Box sx={{ width: "100%", overflow: "hidden" }}>
                    <Paper sx={{ width: "100%", my: 2, display: "flex" }}>
                      <TableContainer
                        sx={{
                          "&::-webkit-scrollbar": {
                            width: 7,
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#7393B3",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "lightBlue",
                          },
                        }}
                        className="rounded  border-gray-300 py-2"
                      >
                        <Table
                          size="small"
                          stickyHeader
                          aria-label="sticky table"
                        >
                          <TableBody>
                            <TableRow>
                              <StyledTableCell className="whitespace-nowrap border border-gray-300">
                                <span className="text-gray-600 font-semibold">
                                  Date
                                </span>
                              </StyledTableCell>
                              {DrugAdministratorDetailsData.result.map(
                                (row, index) => {
                                  return (
                                    <TableCell
                                      key={index}
                                      className="whitespace-nowrap border border-gray-300 "
                                      sx={{ background: "#F1F1F1" }}
                                      colSpan={row.PatientDrugDetails.length}
                                      align="justify"
                                    >
                                      <div className="flex justify-center text-gray-700 font-semibold">
                                        {row.Date}
                                      </div>
                                    </TableCell>
                                  );
                                }
                              )}
                            </TableRow>


                            
                            {headers &&
                              headers.map((header, i) => (
                                <TableRow key={i}>
                                  <StyledTableCell className="whitespace-nowrap border border-gray-300">
                                    <span className="text-gray-600 font-semibold">
                                      {header}
                                    </span>
                                  </StyledTableCell>
                                  {DrugAdministratorDetailsData.result.map(
                                    (row, index) => {
                                      return (
                                        <>
                                          {row.PatientDrugDetails.map(
                                            (
                                              PatientDrugDetails,
                                              innerIndex
                                            ) => {
                                              return (
                                                <TableCell
                                                  onClick={()=>{console.log("clicked",PatientDrugDetails[header])}}
                                                  key={innerIndex}
                                                  className="whitespace-nowrap flex justify-center border border-gray-300  "
                                                  sx={
                                                    i == 0
                                                      ? {
                                                          background: "#F1F1F1",
                                                        }
                                                      : {
                                                          background: "#ffffff",
                                                        }
                                                  }
                                                >

                                                    <div className="flex justify-center text-gray-500 font-semibold">
                                                      {
                                                        PatientDrugDetails[header]
                                                      }
                                                    </div>
                                                </TableCell>
                                              );
                                            }
                                          )}
                                        </>
                                      );
                                    }
                                  )}
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Box>
        </div>
        </>
    )
}