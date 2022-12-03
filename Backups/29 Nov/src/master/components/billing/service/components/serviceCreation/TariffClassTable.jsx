import React ,{useEffect, useState} from 'react'
import {Controller, useForm, useFormContext, } from "react-hook-form";
import {Button, Box, Grid, Card, Input, Typography} from '@mui/material'
import DropdownField from '../../../../../../Common Components/FormFields/DropdownField';
import InputField from '../../../../../../Common Components/FormFields/InputField';
import CheckBoxField from '../../../../../../Common Components/FormFields/CheckBoxField';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'

import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import RadioField from '../../../../../../Common Components/FormFields/RadioField';

import {getGroupDropdown ,getSubGroupDropdown ,getUnitDropdown ,getTariffDropdown} from '../../services-services/BillingServices-services/ServiceCreationServices'

export default function TariffClassTable({changeRateValue, changeCheckBoxValue, tableId,tableData,tariffName, }) {

    const {
        control,
        watch,
        register,
        formState: { errors },
      } = useFormContext();

    const [outputExcel,setOutputExcel] = useState()
const [showExcel,setShowExcel] = useState(false)

const fileHandler = (event) => {
  let fileObj = event.target.files[0];
  
  //just pass the fileObj as parameter
  ExcelRenderer(fileObj, (err, resp) => {
    if(err){
      console.log(err);            
    }
    else{
      VerifyData(resp)
    }
  });               

  
  }

  const VerifyData = (inputExcel) => {
    console.log(inputExcel)
    let rowValue = inputExcel
    let excelError = false;
    if(rowValue.cols.length === 3){
        // console.log("Excel verified")
        let row1 = rowValue.rows[0]
        for(let i=0;i<=row1.length-1;i++){
          if (typeof row1[i] === 'string' || row1[i] instanceof String){
            // console.log(row1[i],"is String")
          }else{ 
            // console.log(row1[i],"is not String");
            sendExcelError()
            excelError = true;
            break; }
          console.log("Excel row1",i)
        }
        if(!excelError){
          rowValue.rows.shift();
          let rows= rowValue.rows
          let rowI;
          console.log("rows length",rows.length)
          for(let i=0;i<=rows.length-1;i++){
            rowI = rows[i];
            for(let j=0;j<=rowI.length-1;j++){
              // first column - String
              if (typeof rowI[0] === 'string' || rowI[0] instanceof String){
                // console.log(rowI[0],"is String")
              }else{ 
                console.log(rowI[0],"is not String");
                sendExcelError()
                excelError = true;
                break; }
                
              // Second column - Number
              if (typeof rowI[1] === 'number' || rowI[1] instanceof Number){
                // console.log(rowI[0],"is String")
              }else{ 
                console.log(rowI[1],"is not number");
                sendExcelError()
                excelError = true;
                break; }

              // Third Column - y / n
              if ( rowI[2] === 'y' || rowI[2] === 'n' || rowI[2] === 'Y' || rowI[2] === 'N'){
                // console.log(rowI[0],"is String")
              }else{ 
                console.log(rowI[2],"is not Y/N");
                sendExcelError()
                excelError = true;
                break; }
            }
          }
        }
        if(!excelError){
          setData(rowValue)
        }
    }else{
      sendExcelError()
    }
  }

  const sendExcelError = () => {
    alert("Excel format Error");
  }
  const setData=(rowValue)=>{
    setOutputExcel(rowValue)
    setShowExcel(true)
  }
  return (
    <Grid container spacing={1}>
        <Grid item lg={12} sm={12} >
              <div className="flex flex-row justify-between">
                <div className="text-xl font-semibold tracking-wide">{tariffName}</div>
                <div></div>
                <div className="flex space-x-4 justify-end">
                </div>
              </div>
                
            </Grid>
            <Box width="100%"/>
            <Grid item lg={12} sm={12} className="" 
            >
            <TableContainer stickyHeader sx={{ marginTop: "0rem" , maxHeight:"28rem", position:"relative",zIndex:0}} className="rounded  border overflow-y-scroll ">
            { 
                showExcel ? (
                <Table sx={{zIndex:0}} className="" stickyHeader>
                    <TableHead sx={{zIndex:0}} className="sticky" stickyHeader>
                    
                    <TableRow>
                      {/* heading of table */}
                        <TableCell >
                            <span className="text-gray-600 text-lg tracking-wide font-bold whitespace-nowrap ">Class</span>
                        </TableCell>
                        <TableCell className="w-[25%]">
                            <span className="text-gray-600 text-lg tracking-wide font-bold whitespace-nowrap ">Rate in (INR)</span>
                        </TableCell>
                        <TableCell className="" sx={{ textAlign:'center' }}>
                            <span className="text-gray-600 font-bold whitespace-nowrap  mx-auto text-lg tracking-wide">GST</span>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                                    {outputExcel.rows.map((r,i) => 
                                      <TableRow key={i}>
                                        {outputExcel.cols.map((c,cIndex)  => 
                                        <TableCell className="whitespace-nowrap  " key={c.key}>
                                          
                                                <>
                                                {
                                                  cIndex === 0 ? (
                                                    r[c.key]

                                                  ): cIndex === 1 ?(
                                                    <FormControl   
                                                        fullWidth
                                                        size="small"
                                                        >
                                                          <Controller
                                                              render={({ field }) => (
                                                                <TextField
                                                                    type="number"
                                                                    inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                                                    name={`[${cIndex}].[${i}].rate`}
                                                                    label=""
                                                                    minLength="1"
                                                                    control={control}
                                                                    variant="outlined"           
                                                                    fullWidth
                                                                    {...field}
                                                                    size="small" 
                                                                />
                                                              )}
                                                              name={`[${cIndex}].[${i}].rate`}
                                                              control={control}
                                                              defaultValue={r[c.key]}
                                                            />
                                                    </FormControl>
                                                  ): cIndex === 2 ?(
                                                    <div className="w-fit  mx-auto pl-5">
                                                      <FormControl >
                                    <Controller
                                        render={({ field }) => (
                                          <FormControlLabel
                                            control={<Checkbox
                                              defaultChecked={r[c.key] === "y" ? true:false} 
                                            />}
                                            
                                            {...field}
                                            type="checkbox"
                                            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                                            className="w-full items-center pl-20 md:pl-0 text-gray-800 font-semibold tracking-wider mr-2"
                                          />
                                        )}
                                        name={`[${cIndex}].[${i}].rate`}
                                        control={control}
                                        defaultValue=""
                                    />
                                                      </FormControl>
                                                    </div>
                                                  ):""
                                                }
                                                </>
                                        </TableCell>
                                        )}
                                    </TableRow>)}

                    </TableBody>
                </Table>
                ):(
                  <Table >
                      <TableHead>
                      
                      <TableRow>
                        {/* heading of table */}
                          <TableCell >
                              <span className="text-gray-600 text-lg tracking-wide font-bold whitespace-nowrap ">Class</span>
                          </TableCell>
                          <TableCell className="w-[25%]">
                              <span className="text-gray-600 text-lg tracking-wide font-bold whitespace-nowrap ">Rate in (INR)</span>
                          </TableCell>
                          <TableCell className="" sx={{ textAlign:'center' }}>
                              <span className="text-gray-600 font-bold whitespace-nowrap  mx-auto text-lg tracking-wide">GST</span>
                          </TableCell>
                      </TableRow>
                      </TableHead>
          
              <TableBody>
                      {
                        tableData.map((row, indexT) => {
                          return (    
                              <TableRow  key={indexT}>
                                  <TableCell className="whitespace-nowrap  ">
                                          {row.className}
                                  </TableCell>
                                  <TableCell className="whitespace-nowrap w-[25%]"  >
                                      <InputField
                                          type="number"
                                          name={`tariffs[${tableId}].tariffClassRequestDto[${indexT}].rate`}
                                          inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                          defaultValue={row.rate}
                                          error={errors.tariffs?.[tableId]?.tariffClassRequestDto?.[indexT]?.rate}
                                          control={control}
                                          inputRef={{...register(`tariffs[${tableId}].tariffClassRequestDto[${indexT}].rate`,{
                                            required: "This is required.",
                                            minLength: 1,min:1,
                                            })}}
                                      />
                                  </TableCell>
                                  <TableCell className="px-4 py-1 flex whitespace-nowrap " sx={{ textAlign:'center' }}>
                                    <div className='pl-5 '>
                                          <CheckBoxField 
                                              defaultValue={row.gstApplicable}
                                              control={control} 
                                              name={`tariffs[${tableId}].tariffClassRequestDto[${indexT}].gstApplicable`} 
                                              label=""
                                          />
                                    </div>
                                  </TableCell>
                              </TableRow>
                          );
                        })}
              </TableBody>
          
                  </Table>
                )
                }
            {/* {errors.tariffs && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.notRegisteredInput.message}</p>} */}
            {!errors.tariffs ? errors.tariffs && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>Please Enter Correct Entries</p> : ""}
            
            </TableContainer>
            
            </Grid>
            <Box width="100%"/> 
    </Grid>
  )
}
