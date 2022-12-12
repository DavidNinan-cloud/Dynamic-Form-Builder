import React from 'react'

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function PackageTotal(props) {

    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };
    const allHeaders = Object.keys(props.data[0]);
  
    const headers = removeHeaders(allHeaders, ["Classes","tariffId"]);
  return (
    <TableContainer sx={{ marginTop: "0.8rem" }} className="rounded w-full">
    <Table>
      <TableHead>
        <TableRow
        sx={{
          "& th": {
            paddingY: 1,
            backgroundColor: "#F1F1F1",
          },
        }}
        >
          {headers.map((header, index) => (
            <TableCell
              className="whitespace-nowrap"
              key={index}
            >
                <span className="text-gray-600 font-bold">
                  {header}
                </span>
            </TableCell>
          ))}

                {
                    props.classList && props.classList.length > 0 && props.classList.map((classlistValue,classIndex)=>{

                        return(
                            <TableCell
                                className="whitespace-nowrap"
                                key={classIndex}
                            >       
                                {classlistValue.classType}                         
                            </TableCell>
                        )
                    })
                }
        </TableRow>
      </TableHead>

      <TableBody>
        
        {
            props.data.map((row, index) => {
            return (
              <TableRow key={index}
              sx={{
                "& td": {
                  paddingY: 1,
                },
              }}
              >
                {headers &&
                  headers.map((header, index) => (
                    <TableCell
                      className="whitespace-nowrap"
                      key={index}
                    >
                      {row[header]}
                    </TableCell>
                  ))}

                {
                    props.classList && props.classList.length > 0 && props.classList.map((classlistValue,classIndex)=>{
                        return(
                            <>
                            {
                                row.Classes && row.Classes.length > 0 && row.Classes.map((classValue,innerIndex)=>{
                                    return(
                                        <>
                                        {
                                                classValue.classId == classlistValue.classId ? (
                                                <TableCell
                                                    className="whitespace-nowrap"
                                                    key={innerIndex}
                                                >
                                                    {classValue.classRate}
                                                    
                                                </TableCell>
                                                ):''
                                        }
                                        </>
                                    )
                                })
                              }
                            </>
                        )
                    })
                }
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
