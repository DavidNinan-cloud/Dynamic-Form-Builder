import React from 'react'
import { Box, Button, Divider, Grid, Modal, Tooltip } from "@mui/material";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm, useFormContext } from "react-hook-form";
// import useDidMountEffect from "../Common Components/Custom Hooks/useDidMountEffect";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from '../../../../../Common Components/FormFields/InputField';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


export default function HealthPlanTotalServices({
    selectedServices, setSelectedServices
    }) {

    const deleteService = (index,row ) =>  {
        let arr = [...selectedServices]
        arr.splice(index, 1);
        setSelectedServices(arr)
    }
  return (
    <div>
      
      <TableContainer stickyHeader sx={{ marginTop: "0rem" , maxHeight:"28rem", position:"relative",zIndex:0}} className="rounded  border overflow-y-scroll ">
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

                                        <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                                <span className="text-gray-600 font-semibold">
                                                        Action
                                                </span>     
                                        </TableCell>
                                        <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                                <span className="text-gray-600 font-semibold">
                                                        Service Code
                                                </span>     
                                        </TableCell>
                                        <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                                <span className="text-gray-600 font-semibold">
                                                        Service Name
                                                </span>     
                                        </TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                        {
                            selectedServices && selectedServices.length > 0 && selectedServices.map((row, index) => {
                           
                            return (    
                                <TableRow  key={index}
                                    sx={{
                                        "& td": {
                                        paddingY: 0.5,
                                        },
                                    }}
                                >
                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                            <div className="flex items-center space-x-1 w-full text-center">
                                                <Tooltip title="Delete Service">
                                                <a
                                                    href="##"
                                                    className="text-red-400 mr-3 mb-2"
                                                    onClick={() => deleteService(index,row)}
                                                >
                                                    <DeleteOutlineOutlinedIcon />
                                                </a>
                                                </Tooltip>
                                            </div>  
                                </TableCell>
                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                                <span className="text-gray-600 font-semibold">
                                                {row.serviceCode}
                                                </span>     
                                </TableCell>
                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                        <span className="text-gray-600 font-semibold">
                                                {row.serviceName}
                                        </span>     
                                </TableCell>
                                </TableRow>
                            );
                            })}
                            </TableBody>
                
                        </Table>
    </TableContainer>
    </div>
  )
}
