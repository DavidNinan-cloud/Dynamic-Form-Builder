import React ,{useEffect, useState} from 'react'
import {Controller, FormProvider, useForm, } from "react-hook-form";
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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'

import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import RadioField from '../../../../../../Common Components/FormFields/RadioField';

import {saveService, getGroupDropdown ,getSubGroupDropdown ,getUnitDropdown ,getTariffDropdown,getClassTable, editService} from '../../services-services/BillingServices-services/ServiceCreationServices'
import TariffClassTable from './TariffClassTable';
import ConfirmationModal from '../../../../../../Common Components/ConfirmationModal';
import {  useMutation } from "@tanstack/react-query";

import {useNavigate,Navigate} from 'react-router-dom';
import { errorAlert, successAlert } from '../../../../../../Common Components/Toasts/CustomToasts';
// import { SubmitButton } from '../../../../../../Common Components/Buttons/CommonButtons';
import SubmitButton from "../../../../../../Common Components/Buttons/SubmitButton";

import useDidMountEffect from '../../../../../../Common Components/Custom Hooks/useDidMountEffect';
import {useLocation} from 'react-router-dom';

const adminChargeIn = [
  {
      id: 0,
      label: "Amount",
      value: 0
  },
  {
      id: 1,
      label: "Percent",
      value: 1
  },

]

const ApplicableToArr = [
  {
      id: 'OPD',
      label: "OPD",
      value: "OPD"
  },
  {
      id: 'IPD',
      label: "IPD",
      value: "IPD"
  },
  {
      id: 'Both',
      label: "Both",
      value: "Both"
  },
]

const tableDataArr = [
  {
    "classId": "20",
    "classType": "OPD"
  }
]
const tariffsT = [
  {value:1, label:"OPD"},{value:2, label:"IPD"},{value:3, label:"General"},{value:4, label:"Dulex Room"},
]

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

    units: yup.array().nullable()
        .min(1, 'Pick at least 1 tag')
        .of(
        yup.object().nullable().shape({
        label: yup.string().required("Please Mention Your category"),
        value: yup.string().required("Please Mention Your category"),
        }).required("Pick at least 1 tag"),
    ).required("Pick at least 1 tag"),

    serviceName:yup
      .string()
      .required("Please Mention Your Service Name"),

      serviceCode:yup
      .string()
      .required("Please Mention Your Service Code"),

      tdsPercent: yup
    .number()
    .nullable()
    .when("doctorShareApplicable", (doctorShareApplicable) => {
      if (doctorShareApplicable) {
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
    .when("adminChargesApplicable", (adminChargesApplicable) => {
      if (adminChargesApplicable) {
          return yup
            .number()
            .moreThan(0, 'Enter valid Amount')
            .typeError("Vaild No. is required");
        
      } else {
        return yup.string()
      }
    }),
    // tariffs
    // tariffClassRequestDto
    // rate
    tariffs:yup.array().of(
      yup.object().shape({
        tariffClassRequestDto:yup.array().of(
          yup.object().shape({
            rate: yup.number().typeError('you must specify a number').min(1, 'Min value 1.').required("Please Add this field"),
          })
        ).min(1, "Please Add amount Details")

      })
    ).min(1, "Please Add amount Details")
}

export default function ServiceCreation() {
  const defaultValues = {
    active:true,
    rateEditAllowed:false,
    discountApplicable:false,
    isOutSourced:false,
    isPackage:false,
    serviceName:"",
    serviceCode:"",
    tariff:null,
    subGroup:null,
    group:null,
    applicableTo:"OPD",
    doctorShareApplicable:false,
    adminChargesApplicable:false,
    tdsPercent:"",
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
const {clearErrors,register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;


const showAdminCharges = watch("adminChargesApplicable")


const showTDS = watch("doctorShareApplicable")


const navigate = useNavigate();
const {isSuccess,isError, mutate } =
useMutation(saveService);

const { mutate:mutateEdit } =
useMutation(editService);

const location = useLocation();
const [comingData, setComingData] = React.useState();



// tariffTable
const [tableData,setTableData]=useState([])
const [newTable,setNewTable]=useState([])
const [finalData,setFinalData]=useState()
const [edit,setEdit]=useState(false)


useEffect(() => {
  if(location.state!==undefined && location.state!==null){
    console.log("location is null",location.state)
    setComingData(location.state.serviceDetails)
    setServiceValues(location.state.serviceDetails)
    setEdit(true)
  }else{
    console.log("location is null",location.state)
  }
}, []);
const setServiceValues = (serviceDetails) => {
  const serviceDetailsArr = [
    "group",
    "subGroup",
    "serviceName",
    "serviceCode",
    "adminChargesApplicable",
    "isOutSourced",
    "rateEditAllowed",
    "discountApplicable",
    "doctorShareApplicable",
    "tdsPercent",
    "active",
    "isPackage",
    "adminChargesInAmount",
    "adminChargesInPercent",
    "units",
  ]
  serviceDetailsArr.forEach((field, i) => {
    setValue(field, serviceDetails[field], { shouldValidate: true,});
  });
  // admin charge percent / amount
  if(serviceDetails.adminChargesInAmount>0){
    setValue('adminAmount',serviceDetails.adminChargesInAmount, { shouldValidate: true,})
    setValue('adminChargeIn',{id: 0, label: "Rupees", value: 0}, { shouldValidate: true,})
  }else{
    setValue('adminAmount',serviceDetails.adminChargesInPercent, { shouldValidate: true,})
    setValue('adminChargeIn',{id: 1, label: "Percent", value: 1 }, { shouldValidate: true,})
  }
  
  // setting tariff arr
  let gotTariffArr = serviceDetails.tariffs
  let setTariffArr = []
  let arr = []
  for(let value of gotTariffArr){
      // set tariff
      setTariffArr.push(value.tariff)

      // set table
      let classArr = value.serviceTariffResponseDto
      let classObjPush = []
      for(let classValue of classArr){
        let classObj = {
          classType : { id: Number(classValue.classType.value)},
          className : classValue.classType.label,
          gstApplicable:classValue.gstApplicable,
          rate : classValue.rate,
        }
        classObjPush.push(classObj)
      }
      let obj = {
        tariffId : value.tariff.value,
        tariffName : value.tariff.label,
        tariffClassRequestDto : classObjPush
      }
      arr.push(obj)
  }
  setValue('tariff', setTariffArr, { shouldValidate: true,})

  // set table value
  for(let i=0;i<arr.length;i++){
    let arrClass = arr[i].tariffClassRequestDto
    for(let j=0;j<arrClass.length; j++){
      setValue(`tariffs[${i}].tariffClassRequestDto[${j}].gstApplicable`,arrClass[j].gstApplicable)
      setValue(`tariffs[${i}].tariffClassRequestDto[${j}].rate`,arrClass[j].rate)
    }
  }
  // tariffs[${tableId}].tariffClassRequestDto[${indexT}].gstApplicable
  setNewTable(arr)
}
const [openChild, setOpenChild] = React.useState(false);
    const handleOpenChild = () => setOpenChild(true);
    const handleCloseChild = () => {
        if(openChild){
            setOpenChild(false)
        }
    };

const [groups,setGroups] = useState()
const [subGroups,setSubGroups] = useState()
const [units,setUnits] = useState()
const [tariffs,setTariffs] = useState(tariffsT)

const classNameN = "OPD"




const createTariffTable = (tariffsValue) => {

  let arr = [...newTable]
  // remove non existing value
  if(tariffsValue.length == 0){
    arr = []
  }else if(tariffsValue.length !== newTable.length){
    for (let i=0; i< arr.length;i++) {
      let Matching = checkExistAlready(arr[i].tariffId , tariffsValue)
      if(!Matching){
        arr.splice(i, 1);
      }
    }
    console.log("not equal")
  }

  if(tariffsValue.length !== 0){
  
    for(let tariffsArr of tariffsValue){

      let value = tariffsArr.value
      // first time
      if(arr.length == 0){
        arr = addToTariffTable(tariffsArr, arr)
      }else{
        let Matching = checkDoesNotExist(value , arr)
        if(!Matching){
          arr = addToTariffTable(tariffsArr, arr)
        }
      }
    }
  }
  setNewTable(arr)
}



const addToTariffTable = (tariffsArr, arr) =>{
  // add value
  let tableDataArr = [...tableData]
  arr = [ ...arr, {
    tariffId : tariffsArr.value,
    tariffName : tariffsArr.label,
    tariffClassRequestDto : tableDataArr
  }]
  
  console.log("arr",arr)
  return arr;
}

const checkExistAlready = (ValueCheck,tariffsValue) => {
  let match=false
  
  for(let tariffsArr of tariffsValue)
  { 
      if(ValueCheck == tariffsArr.value){
        match=true
        break;
      }
  }
  return match;
}

const checkDoesNotExist = (ValueCheck,arrValue) => {
  let match=false
  
  for(let arrV of arrValue)
  { 
      if(ValueCheck == arrV.tariffId){
        match=true
        break;
      }
  }
  return match;
}



const applicableTo = watch('applicableTo')

useDidMountEffect(()=>{
  console.log("applicableTo",applicableTo)
  getClassTable(applicableTo)
  .then(response=>response.data)
  .then(res=>{
    console.log("Class Table",res.result)
    clearErrors('tariffs')
    setValue(`tariffs`,[{tariffClassRequestDto:[{
                              gstApplicable:false,
                              rate:0  }]}])
    setTableFormat(res.result)
    classChange(res.result)
  })
},[applicableTo])

// resetTableBecause Class change
const classChange = (newClassTable) =>{
  let finalObjTable = []
  for (let tableObj of newClassTable){
    finalObjTable = [...finalObjTable,{
      classType : { id: Number(tableObj.classId)},
      className : tableObj.classType,
      gstApplicable:false,
      rate : 0,
    }]
  }
  // got class table to format
  let arr = []
  const tariffsValue = getValues('tariff')
  console.log("tariffsValue",tariffsValue)
  if(tariffsValue){
      for(let tariffsArr of tariffsValue){
          arr = addTarrifAfterClassChange(tariffsArr,arr,finalObjTable)
      }
  }

  for(let i=0;i<arr.length;i++){
    let arrClass = arr[i].tariffClassRequestDto
    for(let j=0;j<arrClass.length; j++){
      setValue(`tariffs[${i}].tariffClassRequestDto[${j}].gstApplicable`,false)
      setValue(`tariffs[${i}].tariffClassRequestDto[${j}].rate`,'')
    }
  }
  setNewTable(arr)
}
const addTarrifAfterClassChange = (tariffsArr,arr,tableDataArr) => {
  arr = [ ...arr, {
    tariffId : tariffsArr.value,
    tariffName : tariffsArr.label,
    tariffClassRequestDto : tableDataArr
  }]
  console.log("arr",arr)
  return arr;
}
useEffect(()=>
{
  getGroupDropdown()
  .then(response=>response.data)
  .then(res=>{
      setGroups(res.result)
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
  
  getClassTable(applicableTo)
  .then(response=>response.data)
  .then(res=>{
    console.log("Class Table",res.result)
    setTableFormat(res.result)
  })
  
},[])


const setTableFormat = (tableDataIncoming) => {
  let finalObjTable = []
  for (let tableObj of tableDataIncoming){
    finalObjTable = [...finalObjTable,{
      classType : { id: Number(tableObj.classId)},
      className : tableObj.classType,
      gstApplicable:false,
      rate : 0,
    }]
  }
  setTableData(finalObjTable)
}


useEffect(()=>{
  console.log('errors',errors)
},[errors])
const onSubmit = (data) => {
  console.log("data",data)
  let finalDataObj = {}
  // Tariffs 
  let arr = [...newTable]
  console.log("arr",arr)
  let newRateGst = [...data.tariffs]
  let finalArr = []
  for(let i = 0; i<newRateGst.length; i++){
    let innerValues = newRateGst[i].tariffClassRequestDto
    
    let arrTariffID = arr[i].tariffId
    let setInnerValues = arr[i].tariffClassRequestDto

    for(let j = 0;j<innerValues.length;j++){
      console.log(`innerValues[${j}].gstApplicable`,innerValues[j].gstApplicable)
      console.log(`innerValues[${j}].rate`,innerValues[j].rate)
      innerValues[j].classType = setInnerValues[j].classType
      innerValues[j].rate = Number(innerValues[j].rate)
    }

    console.log("innerValues",innerValues)
    finalArr = [...finalArr, {
      tariff: { id : Number(arrTariffID)},
      tariffClassRequestDto:innerValues
    }]
  }
  console.log("finalArr",finalArr)
  console.log("newRateGst",newRateGst)
  console.log("arr",arr)
  finalDataObj.tariffs = finalArr
  // 
  finalDataObj.serviceCode = data.serviceCode
  finalDataObj.serviceName = data.serviceName

  finalDataObj.group = { id:Number(data.group.value)}
  finalDataObj.subGroup = { id:Number(data.subGroup.value)}
  finalDataObj.active = data.active
  // let objTariff = []
  // for(let i = 0; i<data.tariff.length;i++){
  //   objTariff = [...objTariff,
  //     {
  //       id : Number(data.tariff[i].value)
  //     }
  //   ]
  // }

  let objUnits = []
  for(let i = 0; i<data.units.length;i++){
    objUnits = [...objUnits,
      {
        id : Number(data.units[i].value)
      }
    ]
  }
  finalDataObj.units = objUnits

  // if admin charges applicable
  finalDataObj.adminChargesApplicable = data.adminChargesApplicable
  if(data.adminChargesApplicable){
  if(data.adminChargeIn.label == "Amount"){
    finalDataObj.adminChargesInAmount = data.adminAmount
    finalDataObj.adminChargesInPercent = 0
  }else{
    finalDataObj.adminChargesInPercent = data.adminAmount
    finalDataObj.adminChargesInAmount = 0
  }}
  // applicable to ?
  if(data.applicableTo == "IPD"){
    finalDataObj.odpApplicableTo = false
  }else{
    finalDataObj.odpApplicableTo = true
  }

  
  finalDataObj.doctorShareApplicable = data.doctorShareApplicable
  if(data.doctorShareApplicable){
  finalDataObj.tdsPercent = Number(data.tdsPercent)
}

  finalDataObj.isPackage = data.isPackage
  finalDataObj.discountApplicable = data.discountApplicable
  finalDataObj.isOutSourced = data.isOutSourced
  finalDataObj.rateEditAllowed = data.rateEditAllowed

  if(edit){
    finalDataObj.id = comingData.id
  }
  console.log("final data",finalDataObj)
  setFinalData(finalDataObj)
  handleOpenChild()
}

const postDataFinal= () =>{
  handleCloseChild()
  console.log("finalData",finalData)
  if(edit){
    mutateEdit(finalData, {
          onSuccess: (data, variables, context) => {
            
          successAlert(data.data.message)
          console.log("data",data)
          console.log("variables",variables)
          console.log("context",context)
          handleReset()
          navigate(`/masters/billing/servicelisting`)
        },
        onError:(data, variables, context)=>{
          errorAlert(data.message)
        },
        onSettled:()=>{
        }
      });
  }else{
    {
      mutate(finalData, {
        onSuccess: (data, variables, context) => {
          
        successAlert(data.data.message)
        console.log("data",data)
        console.log("variables",variables)
        console.log("context",context)
        handleReset()
        navigate(`/masters/billing/servicelisting`)
      },
      onError:(data, variables, context)=>{
        errorAlert(data.message)
      },
      onSettled:()=>{
      }
    });
}
  }
}
const handleReset = () => {
  setTableData([])
}

  return (
    <div className='min-h-screen py-4 px-8 mt-16 '>
      
      <div className="mx-auto p-4 pt-6 bg-white w-full">
          <div className="my-2 text-2xl text-center py-6">
              <Typography variant="h4" sx={{marginY:"1"}}>
                  Service Creation
              </Typography>
          </div>
          
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="" >

      <div className='w-full'>
      <Grid container spacing={2} className='px-6 mx-auto'  >
        {/* form */}
          <Grid item lg={12} sm={12} >
              <Grid container spacing={1}>
                
                  <Grid item xl={3} tab={6} sm={6} className='z-50'>
                    <DropdownField
                        control={control} 
                        error={errors.group}
                        name="group" 
                        dataArray={groups}
                        placeholder="Group"
                        isSearchable={false}
                        isClearable={false}
                        inputRef={{
                          ...register("group", {
                            onChange: (e) => {
                              let value = e.target.value.value
                              getSubGroupDropdown(value)
                              .then(response=>response.data)
                              .then(res=>{
                                  setValue('subGroup',null)
                                  setSubGroups(res.result)
                              })
                            },
                          }),
                        }}
                    />
                  </Grid>
                  <Grid item xl={3} tab={6} sm={6} >
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
                  <Grid item xl={3} tab={6} sm={6} >
                      <InputField
                          name="serviceName"
                          label="Service Name"
                          error={errors.serviceName}
                          control={control}
                      />
                  </Grid>
                  <Grid item xl={3} tab={6} sm={6} >
                      <InputField
                          name="serviceCode"
                          label="Service Code"
                          error={errors.serviceCode}
                          control={control}
                      />
                  </Grid>

                  <Grid item xl={3} tab={6} sm={6} className=" z-30 ">
                <DropdownField 
                        control={control} error={errors.units}
                        name="units" label="Units" dataArray={units}
                        placeholder="Units" isMulti={true}
                        isSearchable={true}
                />
                  </Grid>
                  <Grid item xl={3} tab={6} sm={6} >
                      <DropdownField 
                              control={control} error={errors.tariff}
                              name="tariff" dataArray={tariffs}
                              placeholder="Tariff" isMulti={true}
                              isSearchable={true}
                              inputRef={{
                                ...register("tariff", {
                                  onChange: (e) => {
                                    let tariffsValue = e.target.value
                                    console.log("tariffsValue",tariffsValue)
                                    createTariffTable(tariffsValue)
                                  },
                                }),
                              }}
                      />
                  </Grid>
                  <Grid item xl={1} tab={2} sm={3} >
                      <p className="mt-2  px-2">Applicable To </p>
                  </Grid>
                  <Grid item xl={5} tab={4} sm={9} sx={{marginTop:"0.4rem"}}>
                        <RadioField
                            label=""
                            name="applicableTo"
                            control={control}
                            dataArray={ApplicableToArr}
                        />
                  </Grid>
            <Box width="100%"/>
            
            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="active" 
                    label="Is Active"
                />
            </Grid>
            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="adminChargesApplicable" 
                    label="Admin Charges Applicable"
                />
            </Grid>
            {
              showAdminCharges ? (
                <>
                
                <Grid item xl={3} tab={6} sm={6} >
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
                <Grid item xl={3} tab={6} sm={6} >
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
            {/* <Box width="100%"/> */}

            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="isOutSourced" 
                    label="isOutSourced"
                />
            </Grid>
            {/* <Box width="100%"/> */}
            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="rateEditAllowed" 
                    label="Rate Edit Allowed"
                />
            </Grid>
            {/* <Box width="100%"/> */}
            
            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="discountApplicable" 
                    label="Discount Applicable"
                />
            </Grid>
            {/* <Box width="100%"/> */}
            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="doctorShareApplicable" 
                    label="Doctor Share Applicable"
                />
            </Grid>

            {
              showTDS? (<>
            <Grid item xl={3} tab={6} sm={6} sx={{zIndex:0}}>
                <InputField
                    type="number"
                    inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}
                    name="tdsPercent"
                    label="TDS Percent"
                    error={errors.tdsPercent}
                    control={control}
                />
            </Grid>
              </>):""
            }

            <Grid item xl={3} tab={6} sm={6} >
                <CheckBoxField 
                    control={control} 
                    name="isPackage" 
                    label="Is Packaged"
                />
            </Grid>
            {/* <Box width="100%"/> */}
            <Box width="100%"/> 

            </Grid>
          </Grid> 
          {/* table */}
          
          {
             newTable && newTable.map(( array, index)=>
            {
              return(
                <Grid item lg={6} sm={12} key={index}>
                  <TariffClassTable 
                      tariffName={array.tariffName} 
                      tableData={array.tariffClassRequestDto}
                      tableId={index}
                      newTable={newTable}
                      />
                </Grid>
              )
            }
            )
          }
            

      </Grid>
      </div>
      
        <div className='justify-center w-fit mx-auto mt-6 py-6'>
                   <SubmitButton/>
        </div>
        
        </form>
        </FormProvider>
      </div>
        <ConfirmationModal
            confirmationOpen={openChild}
            confirmationHandleClose={handleCloseChild}
            confirmationSubmitFunc={(e)=>{
              postDataFinal()
            }}
            confirmationLabel="Confirmation "
            confirmationMsg="Click on Proceed to Employee List ?"
            confirmationButtonMsg="Proceed"
        />
    </div>
  )
}
