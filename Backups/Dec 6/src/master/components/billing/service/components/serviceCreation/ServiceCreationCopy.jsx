import React ,{useEffect, useState} from 'react'
import {Controller, useForm, useFieldArray } from "react-hook-form";
import {Button, Box, Grid, Card, Input, Typography} from '@mui/material'
import DropdownField from '../../../../Common Components/FormFields/DropdownField';
import InputField from '../../../../Common Components/FormFields/InputField';
import CheckBoxField from '../../../../Common Components/FormFields/CheckBoxField';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import TablePagination from "@mui/material/TablePagination";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'

import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import RadioField from '../../../../Common Components/FormFields/RadioField';

import {getGroupDropdown ,getSubGroupDropdown ,getUnitDropdown ,getTariffDropdown} from './BillingServices-services/ServiceCreationServices'
const adminChargeIn = [
  {
      id: 0,
      label: "Rupees",
      value: 0
  },
  {
      id: 1,
      label: "Percent",
      value: 1
  },

]
const Group = [
  {
      id: 0,
      label: "Free Text",
      value: "freeText"
  },
  {
      id: 1,
      label: "Radio Button",
      value: "radioButton"
  },
  {
      id: 2,
      label: "Dropdown",
      value: "dropDown"
  },
  {
      "id": 3,
      "label": "Checkbox",
      "value": "checkBox"
  }
]

const SubGroup = [
  {
      id: 0,
      label: "Free Text",
      value: "freeText"
  },
  {
      id: 1,
      label: "Radio Button",
      value: "radioButton"
  },
  {
      id: 2,
      label: "Dropdown",
      value: "dropDown"
  },
  {
      "id": 3,
      "label": "Checkbox",
      "value": "checkBox"
  }
]

const Tariffs = [
  {
      id: 0,
      label: "Free Text",
      value: "freeText"
  },
  {
      id: 1,
      label: "Radio Button",
      value: "radioButton"
  },
  {
      id: 2,
      label: "Dropdown",
      value: "dropDown"
  },
  {
      id: 3,
      label: "Checkbox",
      value: "checkBox"
  },{
    id: 4,
    label: "asd Text",
    value: "asd"
},
{
    id: 5,
    label: "aaad Button",
    value: "aasd"
},
{
    id: 6,
    label: "3ad",
    value: "21dad"
},
{
    id: 7,
    label: "Chqeeckbox",
    value: "chdaeckBox"
},{
  id: 8,
  label: "Frdaee Textq",
  value: "freeasqText"
},
{
  id: 9,
  label: "Rsdddadio Button",
  value: "raa2adioButton"
},
{
  id: 10,
  label: "Dropadadown",
  value: "dropasDown"
},
{
  id: 12,
  label: "Chaaeckbox",
  value: "chaaeckBox"
}
]

const Units = [
  {
      id: 0,
      label: "Free Text",
      value: "freeText"
  },
  {
      id: 1,
      label: "Radio Button",
      value: "radioButton"
  },
  {
      id: 2,
      label: "Dropdown",
      value: "dropDown"
  },
  {
      "id": 3,
      "label": "Checkbox",
      "value": "checkBox"
  }
]
const ApplicableTo = [
  {
      id: 0,
      label: "OPD",
      value: "OPD"
  },
  {
      id: 1,
      label: "IPD",
      value: "IPD"
  },
  {
      id: 2,
      label: "Both",
      value: "Both"
  },
]

const TableData = [{
  id : 0,
  class : "OPD"
},{
  id : 1,
  class : "IPD"
},{
  id : 2,
  class : "OT"
},{
  id : 3,
  class : "General"
},{
  id : 4,
  class : "Delux Room"
},]
let finalSchema;
let initialSchema = {
    group: yup.object().nullable().shape({
        value: yup.string().required("Please Mention Your group"),
        label: yup.string().required("Please Mention Your group")
    }).required("Please Mention Your group"),

    subGroup: yup.object().nullable().shape({
        value: yup.string().required("Please Mention Your Sub Group"),
        label: yup.string().required("Please Mention Your Sub Group")
    }).required("Please Mention Your Sub Group"),

    tariff: yup.array().nullable()
        .min(1, 'Pick at least 1 tag')
        .of(
        yup.object().nullable().shape({
        label: yup.string().required("Pick at least 1 tag"),
        value: yup.string().required("Pick at least 1 tag"),
        }).required("Pick at least 1 tag"),
    ).required("Pick at least 1 tag"),

    unit: yup.array().nullable()
        .min(1, 'Pick at least 1 tag')
        .of(
        yup.object().nullable().shape({
        label: yup.string().required("Please Mention Your category"),
        value: yup.string().required("Please Mention Your category"),
        }).required("Pick at least 1 tag"),
    ).required("Pick at least 1 tag"),

    ServiceName:yup
      .string()
      .required("Please Mention Your Service Name"),

      ServiceCode:yup
      .string()
      .required("Please Mention Your Service Code"),

    TDSPercent: yup
    .number()
    .nullable()
    .when("DoctorShare", (DoctorShare) => {
      if (DoctorShare) {
          return yup
            .number()
            .moreThan(0, 'Enter valid Amount')
            .typeError("Vaild No. is required");
        
      } else {
        return yup.string()
      }
    }),

    adminAmount:yup
    .number()
    .nullable()
    .when("AdminCharges", (AdminCharges) => {
      if (AdminCharges) {
          return yup
            .number()
            .moreThan(0, 'Enter valid Amount')
            .typeError("Vaild No. is required");
        
      } else {
        return yup.string()
      }
    }),
}
export default function ServiceCreationCopy() {
  const defaultValues = {
    ServiceName:"",
    ServiceCode:"",
    tariff:null,
    subGroup:null,
    group:null,
    ApplicableTo:"OPD",
    DoctorShare:false,
    AdminCharges:false,
    TDSPercent:"",
    adminAmount:"",
    adminChargeIn:{
      id: 0,
      label: "Rupees",
      value: 0
  },
  } 

  
  finalSchema = { ...initialSchema };
  const AppointValidation = yup.object().shape( 
    finalSchema
    ).required();
const schema = AppointValidation

 
const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues 
});
const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch  } = methods;

const showAdminCharges = watch("AdminCharges")


const showTDS = watch("DoctorShare")
// if (showTDS){
//   finalSchema = {
//     ...initialSchema,
//     TDSPercent:yup
// .number("Please Mention Number").typeError('Please Mention a number')
// .required("Please Mention Number"),
//   }
// }else {
//   finalSchema = { ...initialSchema };
// }

const [groups,setGroups] = useState()
const [subGroups,setSubGroups] = useState()
const [units,setUnits] = useState()
const [tariffs,setTariffs] = useState()

const [finalData,setFinalData]=useState()

useEffect(()=>
{
  getGroupDropdown()
  .then(response=>response.data)
  .then(res=>{
      setGroups(res.result)
  })

  getSubGroupDropdown()
  .then(response=>response.data)
  .then(res=>{
      setSubGroups(res.result)
  })
  getUnitDropdown()
  .then(response=>response.data)
  .then(res=>{
    setUnits(res.result)
  })

  getTariffDropdown()
  .then(response=>response.data)
  .then(res=>{
    setTariffs(res.result)
  })
},[])


const onSubmit = (data) => {
  console.log("data",data)
  let finalDataObj = {}
  finalDataObj.adminChargesApplicable = data.AdminCharges
  finalDataObj.serviceCode = data.ServiceCode
  finalDataObj.serviceName = data.ServiceName
  finalDataObj.tdsPercent = Number(data.TDSPercent)
  finalDataObj.group = { id:parseInt(data.subGroup.value)}
  finalDataObj.subGroup = { id:parseInt(data.subGroup.value)}

  let objTariff = []
  for(let i = 0; i<data.tariff.length;i++){
    objTariff = [...objTariff,
      {
        id : parseInt(data.tariff[i].value)
      }
    ]
  }
  finalDataObj.tariff = objTariff
  let objUnits = []
  for(let i = 0; i<data.unit.length;i++){
    objUnits = [...objUnits,
      {
        id : parseInt(data.unit[i].value)
      }
    ]
  }
  finalDataObj.units = objUnits

  
  finalDataObj.classTypeList = data
  finalDataObj.discountApplicable = data
  finalDataObj.doctorShareApplicable = data.DoctorShare
  finalDataObj.isOutSourced = data
  finalDataObj.isPackage = data
  finalDataObj.odpApplicableTo = data
  finalDataObj.rateEditAllowed = data.RateEdit

  console.log("final data",finalDataObj)
  setFinalData(finalDataObj)

  // reset()
}
// const { fields, append, remove } = useFieldArray(
//   {
//   control,
//   name: 'fieldValues',
//   }
// );

const [outputExcel,setOutputExcel] = useState()
const [showExcel,setShowExcel] = useState(false)
// const [showTDS,setShowTDS] = useState(false)

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
    <div className='min-h-screen py-4 px-8 mt-16 '>
      
      <div className="mx-auto p-4 pt-6 bg-white w-full">
              {/* <p className="text-4xl text-cyan-700 font-semibold tracking-wide text-center mb-4">Service Creation
              </p> */}
          <div className="my-2 text-2xl text-center py-6">
              <Typography variant="h4" sx={{marginY:"1"}}>
                  Service Creation
              </Typography>
          </div>
      <form onSubmit={handleSubmit(onSubmit)} className="" >

      <div className='w-full'>
      <Grid container spacing={2} className='px-6 mx-auto'  >
        {/* form */}
          <Grid item lg={6} sm={12} >
              <Grid container spacing={1}>
                
                  <Grid item lg={6} sm={6} >
                    <DropdownField
                        control={control} 
                        error={errors.group}
                        name="group" 
                        dataArray={groups}
                        placeholder="Group"
                        isSearchable={false}
                        isClearable={false}
                    />
                  </Grid>
                  <Grid item lg={6} sm={6} >
                  <DropdownField
                      control={control} 
                      error={errors.subGroup}
                      name="subGroup" 
                      dataArray={subGroups}
                      placeholder="Sub Group"
                      isSearchable={false}
                      isClearable={false}
                  />
                  </Grid>
                  <Grid item lg={6} sm={6} >
                      <InputField
                          name="ServiceName"
                          label="Service Name"
                          error={errors.ServiceName}
                          control={control}
                      />
                  </Grid>
                  <Grid item lg={6} sm={6} >
                      <InputField
                          name="ServiceCode"
                          label="Service Code"
                          error={errors.ServiceCode}
                          control={control}
                      />
                  </Grid>

                  <Grid item lg={6} sm={6} >
              <div className=" z-50 ">
                <DropdownField 
                        control={control} error={errors.unit}
                        name="unit" label="Units" dataArray={units}
                        placeholder="Unit" isMulti={true}
                        isSearchable={true}
                />
                </div>
                  </Grid>
            <Grid item lg={6} sm={6} >
                <DropdownField 
                        control={control} error={errors.tariff}
                        name="tariff" label="Tariff" dataArray={tariffs}
                        placeholder="Tariff" isMulti={true}
                        isSearchable={true}
                />
            </Grid>

            <Grid item lg={8} sm={8} >
                  <RadioField
                      label="Applicable To"
                      name="ApplicableTo"
                      control={control}
                      dataArray={ApplicableTo}
                  />
            </Grid>
            <Box width="100%"/>
            
            
            <Grid item lg={4} sm={4} >
                <CheckBoxField 
                    control={control} 
                    name="AdminCharges" 
                    label="Admin Charges Applicable"
                />
            </Grid>
            {
              showAdminCharges ? (
                <>
                
                <Grid item lg={4} sm={4} >
                    <DropdownField
                        control={control} 
                        error={errors.adminChargeIn}
                        name="adminChargeIn" 
                        dataArray={adminChargeIn}
                        placeholder="Charge In"
                        isSearchable={false}
                        isClearable={false}
                    />
                </Grid>
                <Grid item lg={4} sm={4} >
                    <InputField
                        type="number"
                        inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}
                        name="adminAmount"
                        label="Charge"
                        error={errors.adminAmount}
                        control={control}
                    />
                </Grid>
            </>
                
              ):""
            }
            <Box width="100%"/>

            <Grid item lg={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="Outsource" 
                    label="Outsource"
                />
            </Grid>
            <Box width="100%"/>
            <Grid item lg={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="RateEdit" 
                    label="Rate Edit Allowed"
                />
            </Grid>
            <Box width="100%"/>
            
            <Grid item lg={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="DiscountApplicable" 
                    label="Discount Applicable"
                />
            </Grid>
            <Box width="100%"/>
            {/* <Box width="100%"/>  */}
            <Grid item lg={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="DoctorShare" 
                    label="Doctor Share Applicable"
                />
            </Grid>

            {
              showTDS? (<>
            <Grid item lg={6} sm={6} sx={{zIndex:0}}>
                <InputField
                    type="number"
                    inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}
                    // inputRef={{...register("TDSPercent", {
                    //   minLength: 1,min:0,
                    //   required: "This is required.",
                    // })}}
                    name="TDSPercent"
                    label="TDS Percent"
                    error={errors.TDSPercent}
                    control={control}
                />
                {/* <InputField
                                          type="number"
                                          name="TDSPercent"
                                          label=""
                                          error={errors?.[row.class]?.Rate}
                                          control={control}
                                          inputRef={register(`${row.class}.Rate`,{
                                            required: "This is required.",
                                            minLength: 1
                                          })}
                                      /> */}
            </Grid>
              </>):""
            }
            <Box width="100%"/> 

            </Grid>
          </Grid> 
          {/* table */}
          <Grid item lg={6} sm={12} >
          <Grid container spacing={1}>
            <Grid item lg={12} sm={12} >
              <div className="flex flex-row justify-between">
                <div className="text-xl font-semibold tracking-wide">Classes :</div>
              <div></div>
                <div className="flex space-x-4 justify-end">
                    <div className="border-r border-blue-500 px-2">
                          <a
                            // href="##"
                            // value="click"
                            className="text-blue-500 mr-1 underline"
                            >Download Template
                          </a>
                    </div>
                    <div className="border-r-blue-500">
                      <label>
                        <input type="file" onChange={fileHandler.bind(this)} style={{"display": "none"}}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                        <a className="text-blue-500 mr-1 underline" >
                          Upload Data
                        </a>
                      </label>
                    </div>
                </div>
              </div>
                
            </Grid>
            {/* <Box width="100%"/> */}
            
            <Box width="100%"/>  
            {/* <Grid item lg={1} sm={1} ></Grid> */}
            {/* <Grid item lg={6} sm={6} >
            
          
          </Grid>
            <Box width="100%"/>  */}
            
            <Grid item lg={12} sm={12} className="" 
            // sx={{ heigth: "65rem" }}
            >
            <TableContainer sx={{ marginTop: "0rem" , maxHeight:"28rem", position:"relative",zIndex:0}} className="rounded  border overflow-y-scroll ">
            { 
          showExcel ? (<>
            
            <Table sx={{zIndex:0}} className="">
                <TableHead sx={{zIndex:0}} className="">
                
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
                                  {/* ) : (<></>)
                              } */}
                            </TableCell>
                            )}
                        </TableRow>)}

        </TableBody>
    
    </Table>
          </>
          ):(<>
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
                  TableData.map((row, index) => {
                    return (    
                        <TableRow  key={index}>
                            <TableCell className="whitespace-nowrap  ">
                                    {row.class}
                            </TableCell>
                            <TableCell className="whitespace-nowrap w-[25%]"  >
                                      
                                      <FormControl   
                                            fullWidth
                                            size="small"
                                            >
                                              <Controller
                                                  render={({ field }) => (
                                                    <TextField
                                                        type="number"
                                                        name={`${row.class}.Rate`}
                                                        inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                                        label=""
                                                        minLength="1"
                                                        // required="required"
                                                        error={errors?.[row.class]?.Rate}
                                                        control={control}

                                                        // value={r[c.key]}
                                                        variant="outlined"           
                                                        fullWidth
                                                        {...field}
                                                        size="small" 
                                                    />
                                                  )}
                                                  name={`${row.class}.Rate`}
                                                  control={control}
                                                  defaultValue=""
                                                />
                                                  {/* <FormHelperText style={{color:'#d32f2f'}}>
                                                    {errors?.message}
                                                  </FormHelperText> */}
                                        </FormControl>
                                      {errors.test && <p>{errors?.[row.class]?.Rate?.message}</p>}

                            </TableCell>
                            <TableCell className="px-4 py-1 flex whitespace-nowrap " sx={{ textAlign:'center' }}>
                              <div className='pl-5 '>
                                    <CheckBoxField 
                                                
                                                control={control} 
                                                name={`[${row.class}].GST`} 
                                                label=""
                                    />
                                    {/* <div className="w-fit  mx-auto pl-5">
                                         {/* checkbox */}
                    {/* <FormControl >
                        <Controller
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox
                                  defaultChecked={false} 
                                />}
                                
                                {...field}
                                type="checkbox"
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                                className="w-full items-center pl-20 md:pl-0 text-gray-800 font-semibold tracking-wider mr-2"
                              />
                            )}
                            name={`[${row.class}].GST`}
                            control={control}
                            defaultValue=""
                        />
    </FormControl>
                                        </div> */} 
                              </div>
                            </TableCell>
                        </TableRow>
                    );
                  })}
        </TableBody>
    
            </Table>
          </>)
                }

            </TableContainer>
            
            </Grid>
            <Box width="100%"/> 
            </Grid>
          </Grid>
            

      </Grid>
      </div>
      
        <div className='justify-center w-fit mx-auto mt-6 py-6'>
                      {/* <Button
                              variant="text"
                              color="info"
                              
                              onClick={VerifyData}
                          >
                              Check
                          </Button> */}

                        <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                        >
                            Submit
                        </Button>
        </div>
        
        </form>

        {/* { 
          showExcel ? (
            <table className={inputExcel.tableClassName}  >
                    <tbody>
                        {/* <tr>
                            
                            {
                                inputExcel.cols.map((c) =>
                                    <th key={c.key} >
                                      {console.log(c)}
                                      {c.key === -1 ? "" : c.name}
                                    </th>
                                )

                            }
                        </tr> */}
                        {/* {inputExcel.rows.map((r,i) => 
                          <tr key={i}>
                            
                            {inputExcel.cols.map((c)  => 
                            <td key={c.key}>
                              {
                                  i === 0 ? "" : 
                                  (
                                    <>
                                    { r[c.key] }
                                    </>
                                  )
                              }
                            </td>
                            )}
                        </tr>)}
                    </tbody>
                </table>
          ):""
        }
         */}
      </div>
    </div>
  )
}
