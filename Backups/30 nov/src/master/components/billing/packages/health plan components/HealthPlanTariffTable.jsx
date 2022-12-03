import React from 'react'
import { Box, Button, Divider, Grid, Modal } from "@mui/material";
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

export default function HealthPlanTariffTable({
    selectedServices,
    calculateTotalServices,
    classList,
    startIndex, 
    tariffId}) {
        const {
            getValues,
            setValue,
            control,
            watch,
            register,
            formState: { errors },
          } = useFormContext();
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
                                                        Service Code
                                                </span>     
                                        </TableCell>
                                        <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                                <span className="text-gray-600 font-semibold">
                                                        Service Name
                                                </span>     
                                        </TableCell>
                                        {
                                            classList.length > 0 && classList.map((classHeader,index)=>{
                                                return(
                                                    <TableCell key={index} sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                        <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{classHeader.classType}</span>
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                        selectedServices && selectedServices.length > 0 && selectedServices.map((row, index) => {
                                        return (    
                                            <TableRow  key={index}
                                                sx={{
                                                    "& th": {
                                                    paddingY: 0.5,
                                                    },
                                                }}
                                            >
                                                <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                        <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{row.serviceCode}</span>
                                                                    
                                                </TableCell>
                                                <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                        <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{row.serviceName}</span>                   
                                                </TableCell>
                                                {
                                                    classList.length > 0 && classList.map((classHeader,classindex)=>{
                                                        startIndex = startIndex + 1

                                                        {
                                                            setValue(`packageServicesRequestDtoList[${startIndex}].classType`,{id:Number(classHeader.classId)})
                                                          }
                                                          {
                                                            setValue(`packageServicesRequestDtoList[${startIndex}].services`,{id:Number(row.value)})
                                                          }
                                                          {
                                                            setValue(`packageServicesRequestDtoList[${startIndex}].tariff`,{id:tariffId})
                                                          }
                                                        return(
                                                            <React.Fragment key={classindex}>
                                                            {
                                                                row.classRates && row.classRates.length > 0 && row.classRates.map((classRate,classRateIndex)=>{
                                                                    return(
                                                                    
                                                                        <React.Fragment key={classRateIndex} >
                                                                        {
                                                                            classHeader.classId == classRate.classId ? (
                                                                                <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                                                    <InputField
                                                                                        type="number"
                                                                                        name={`packageServicesRequestDtoList[${startIndex}].rate`}
                                                                                        inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                                                                        defaultValue={classRate.rate}
                                                                                        error={errors.group?.[index]?.rate}
                                                                                        control={control} //calculateTotalServices
                                                                                        inputRef={{
                                                                                            ...register(`packageServicesRequestDtoList[${startIndex}].rate`, {
                                                                                              onChange: (e) => {
                                                                                                let value = e.target.value.value
                                                                                                calculateTotalServices()
                                                                                              },
                                                                                            }),
                                                                                          }}
                                                                                    />
                                                                                </TableCell>
                                                                            ):''
                                                                        }
                                                                        </React.Fragment>
                                                                    )
                                                                }) 
                                                            }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                                
                                            </TableRow>
                                        );
                                        })}
                            </TableBody>
                
                        </Table>
                    </TableContainer>
    </div>
  )
}
