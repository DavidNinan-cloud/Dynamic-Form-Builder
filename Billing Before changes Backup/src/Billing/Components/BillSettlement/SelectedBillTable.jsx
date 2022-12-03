import React from 'react'
import { Box, Button, Divider, Grid, Modal, Tooltip } from "@mui/material";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


export default function SelectedBillTable({ledgerData}) {
    const allHeaders = Object.keys(ledgerData[0]);
    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };

    const headers = removeHeaders(allHeaders, []);
    

  return (
    <div>
        <TableContainer stickyheader={true} sx={{ marginTop: "1rem" ,position:"relative",zIndex:0}} className="rounded  border ">
            <Table
                            size="small"
                            stickyHeader
                            aria-label="sticky table">
                <TableHead>
                        <TableRow
                                sx={{
                                    "& th": {
                                    paddingY: 0.5,
                                    backgroundColor: "#F1F1F1",
                                    },
                                }}
                        >

                    {headers && headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                      >
                          <span className="text-gray-600 font-bold">
                              {header}
                          </span>
                      </TableCell>
                    ))}
                        </TableRow>
                </TableHead>
                <TableBody>
                { 
                    ledgerData && ledgerData.map((row, index) => {
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
                              <>

                              <TableCell
                                className="whitespace-nowrap"
                                key={index}
                              >
                                {row[header]}
                              </TableCell>
                              
                              </>
                            ))}
                        </TableRow>
                      );
                    })}
                </TableBody>
    
            </Table>
        </TableContainer>


    </div>
  )
}