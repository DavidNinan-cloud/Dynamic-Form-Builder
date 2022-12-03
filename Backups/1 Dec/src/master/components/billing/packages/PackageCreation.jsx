import React ,{useEffect, useState} from 'react'
import {Controller, FormProvider, useForm, } from "react-hook-form";
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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'

import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import RadioField from '../../../../Common Components/FormFields/RadioField';

import {saveService, getGroupDropdown ,getSubGroupDropdown ,getUnitDropdown ,getTariffDropdown,getClassTable, editService, getGroupList} from './services/PackageCreationServices'
import ConfirmationModal from '../../../../Common Components/ConfirmationModal';
import {  useMutation } from "@tanstack/react-query";

import {useNavigate,Navigate} from 'react-router-dom';
import { errorAlert, successAlert } from '../../../../Common Components/Toasts/CustomToasts';
// import { SubmitButton } from '../../../../Common Components/Buttons/CommonButtons';
import SubmitButton from "../../../../Common Components/Buttons/SubmitButton";

import useDidMountEffect from '../../../../Common Components/Custom Hooks/useDidMountEffect';
import {useLocation} from 'react-router-dom';
import SearchBar from '../../../../Common Components/FormFields/SearchBar';
import PackageComponent from './package components/PackageComponent';
import HealthPlan from './health plan components/HealthPlan';
import { getPackageDetails } from '../service/services-services/ServiceList-services/ServiceListServices';

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
const setPriceType = [
  {
      id: 0,
      label: "Self",
      value:0
  },
  {
      id: 1,
      label: "Auto",
      value:1
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
      .required("Please Mention Your Group Name"),

      serviceCode:yup
      .string()
      .required("Please Mention Your Group Code"),

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

function dateIsValid(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateStr);
}
const validateDate = (value) => {
  let dobGivenYear = value.getFullYear();
  let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
  let dobGivenDay = String(value.getDate()).padStart(2, "0");
  let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
  let isValidDate = dateIsValid(fullDOB)
  return isValidDate
}
const setdateFormat = (value) => {
  let dobGivenYear = value.getFullYear();
  let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
  let dobGivenDay = String(value.getDate()).padStart(2, "0");
  let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
  return fullDOB
}
export default function PackageCreation (){
      const [classList, setClassList] = useState([]);
      const [groups,setGroups] = useState()
      const [subGroups,setSubGroups] = useState()
      const [units,setUnits] = useState()
      const [tariffs,setTariffs] = useState(tariffsT)
      const [schemaObject, setSchemaObject] = useState({});

      useEffect(()=>{
        getClassTable(applicableTo)
        .then(response=>response.data)
        .then(res=>{
          console.log("Class Table",res.result)
          setClassList(res.result)
        })
      },[])
      const defaultValues = {
          active:true,
          rateEditAllowed:false,
          discountApplicable:false,
          isOutSourced:false,
          isPackage:true,
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
          
          isPackageHealthPlan:true,//changes start here
          packageRateAuto:1,
          activityDays:1,
          packageRateType:0,
          packageGroups:[],
          packageServicesRequestDtoList:[
            {    "classType": {
              "id": null,
              },
              "tariff": {
                  "id": null,
              },
              "rate": 0,
            }
          ],
          groupRates:[
            {    "classType": {
                  "id": null,
                  },
                  "group": {
                      "id": null,
                  },
                  "tariff": {
                      "id": null,
                  },
                  "rate": null,
            }],
        } 
    
      
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
          .required("Please Mention Your Group Name"),

          serviceCode:yup
          .string()
          .required("Please Mention Your Group Code"),

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
      finalSchema = { ...initialSchema };
      const AppointValidation = yup.object().shape( 
        finalSchema
        ).required();
    const schema = AppointValidation
    
     
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(schema),
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

    const [finalData,setFinalData]=useState()
    const [edit,setEdit]=useState(false)
    
  const [dateValue1, setDateValue1] = React.useState(new Date());
  const [dateValue2, setDateValue2] = React.useState(new Date());
  const [selectedServices, setSelectedServices] = useState([]);
    // on edit code 
    // useEffect(() => {
    //   if(location.state!==undefined && location.state!==null){
    //     console.log("location is null",location.state)
    //     setComingData(location.state.serviceDetails)
    //     setServiceValues(location.state.serviceDetails)
    //     setEdit(true)
    //   }else{
    //     console.log("location is null",location.state)
    //   }
    // }, []);
    
    useEffect(()=>{
      setEdit(true)
      // healthplan - 80
      getPackageDetails(71).then((response) => response.data).then((res) => {

        console.log("res",res);
        let resultList = [];
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          resultList.push(jsonObject);
        });

        
        console.log("coming data",resultList[0]);
        if(resultList[0].isPackageHealthPlan){
          onEditHealthPlan(resultList[0])
        }
        setComingData(resultList[0]);
      });
    },[])

    const onEditHealthPlan = (data) => {
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
        "adminChargesInAmount",
        "adminChargesInPercent",
        "isPackageHealthPlan",
        "activityDays",
        "units",
        "tariff"
      ]
      serviceDetailsArr.forEach((field, i) => {
        if(field == 'group'){
            console.log('set group',data[field])
        }
        setValue(field, data[field], { shouldValidate: true,});
      });

      if(data.isAuto){
        setValue('packageRateAuto',1)
      }else{
        setValue('packageRateAuto',0)
      }

      setDateValue1(data.packageStartDate)
      setDateValue2(data.packageEndDate)

      // set services arr
      healthplanserviceEdit(data.packageServicesList)
    }

    const healthplanserviceEdit = (packageServicesList) => {
      let arr = []
      for (let value of packageServicesList){
        let existsIndex = arr.findIndex(o => o.serviceId == value.serviceId && o.tariffId == value.tariffId);
        let obj = {}
        if(existsIndex !== -1){
            console.log("exists",arr[existsIndex])            
            
            arr[existsIndex].Classes = [...arr[existsIndex].Classes,{
              className : value.className,
              classRate : value.rate,
              classId : value.classType
            }]
        }else{
            obj.serviceId = value.serviceId
            obj.serviceName = value.serviceName
            obj.serviceCode = value.serviceCode
            obj.tariffId = value.tariffId
            obj.Tariff = value.tariffName
            obj.Classes = [{
              className : value.className,
              classRate : value.rate,
              classId : value.classType
            }]
        }
        arr.push(obj)
      }
      console.log("selectedServices",arr)
      setSelectedServices(arr)

    }
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
    }
    // on edit code


    const [openChild, setOpenChild] = React.useState(false);
        const handleOpenChild = () => setOpenChild(true);
        const handleCloseChild = () => {
            if(openChild){
                setOpenChild(false)
            }
        };
    


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
      
      
      
    },[])
    
    const applicableTo = watch('applicableTo')
    
    useDidMountEffect(()=>{
      console.log("applicableTo",applicableTo)
      getClassTable(applicableTo)
      .then(response=>response.data)
      .then(res=>{
        console.log("Class Table",res.result)
        clearErrors('tariffs')
        setClassList(res.result)
      })
    },[applicableTo])
    
    // changing code here
      const [groupList, setGroupList] = useState([]);

      useEffect(()=>{
        getGroupList()
        .then(response=>response.data)
        .then(res=>{
          console.log("group list",res.result)
          setGroupList(res.result)
        })
      },[])


    const isPackageHealthPlan = watch('isPackageHealthPlan')
    const packageRateAuto = watch('packageRateAuto')


    const [isAuto,setisAuto] = useState(true)
    useEffect(()=>{
      if(packageRateAuto == 1){
        if(!isAuto){
          setisAuto(true)
        }
      }else{
        setisAuto(false)
      }
    },[packageRateAuto])
    const selectedTariffs = watch('tariff')
    const selectedUnits = watch('units')
    
    // changing code here
    
    useEffect(()=>{
      console.log('errors',errors)
    },[errors])



    const [packageTotalRates,setPackageTotalRates] = useState([])



    const onSubmit = (data) => {
      console.log("data",data)
      let finalDataObj = {}
      // Tariffs -- change here
      // for - package rate auto
        let packageRateArr = []
        let newarr = [...packageTotalRates]
        for(let value of newarr){
          let innerArr = value.Classes
          for(let innerValue of innerArr){
            let obj = {
              classType:{id:Number(innerValue.classId)},
              rate:Number(innerValue.classRate),
              tariff:{id:Number(value.tariffId)}
            }
            packageRateArr.push(obj)
          }
        }
        finalDataObj.packageRateRequestDtoList = packageRateArr  

        if(isPackageHealthPlan){
          finalDataObj.packageServicesRequestDtoList = healthPlanServices(data)
        }else{
          // for - healthplan -false 
          // groupwise
          finalDataObj = groupwiseSubmit(data,finalDataObj)

        }
      finalDataObj.activityDays = data.activityDays
      finalDataObj.isAuto = isAuto
      finalDataObj.isPackageHealthPlan = data.isPackageHealthPlan
      finalDataObj.packageStartDate = setdateFormat(dateValue1)
      finalDataObj.packageEndDate = setdateFormat(dateValue2)
      // 
      finalDataObj.serviceCode = data.serviceCode
      finalDataObj.serviceName = data.serviceName
    
      finalDataObj.group = { id:Number(data.group.value)}
      finalDataObj.subGroup = { id:Number(data.subGroup.value)}
      finalDataObj.active = data.active
    
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
    
      finalDataObj.isPackage = true
      finalDataObj.discountApplicable = data.discountApplicable
      finalDataObj.isOutSourced = data.isOutSourced
      finalDataObj.rateEditAllowed = data.rateEditAllowed

      console.log("final data",finalDataObj)
      setFinalData(finalDataObj)
      handleOpenChild()
    }
    
    const healthPlanServices = (data) => {
      let servicerateArr = []
      for (let serviceValue of data.packageServicesRequestDtoList){
        let obj = serviceValue
        if(obj.rate == null){
          obj.rate = 0
        }else{
          obj.rate = Number(serviceValue.rate)
        }
        servicerateArr.push(obj)
      }
      return servicerateArr
    }
    const groupwiseSubmit = (data,finalDataObj) => {

      let arr = data.groupRates
      let groupRatesArr = []
      for(let value of arr){
        console.log('groupRatesArr value',value)
        let obj = value
        obj.rate = Number(value.rate)
        groupRatesArr.push(obj)
      }
      finalDataObj.packageGroupRequestDtoList = groupRatesArr

      return finalDataObj
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

    const handleReset = () => {
      // reset
    }
    

    const [packageServiceArray,setPackageServiceArray] = useState([])
    return(

        <div className='min-h-screen py-4 px-8 mt-16 '>
      
        <div className="mx-auto p-4 pt-6 bg-white w-full">
            <div className="my-2 text-2xl text-center py-6">
                <Typography variant="h4" sx={{marginY:"1"}}>
                    Package Creation
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
                            label="Package Name"
                            error={errors.serviceName}
                            control={control}
                        />
                    </Grid>
                    <Grid item xl={3} tab={6} sm={6} >
                        <InputField
                            name="serviceCode"
                            label="Package Code"
                            error={errors.serviceCode}
                            control={control}
                        />
                    </Grid>
  
                    <Grid item xl={3} tab={6} sm={6} className=" z-30 h-fit">
                  <DropdownField 
                          control={control} error={errors.units}
                          name="units" label="Units" dataArray={units}
                          placeholder="Units" isMulti={true}
                          isSearchable={true}
                  />
                    </Grid>
                    <Grid item xl={3} tab={6} sm={6} className='h-fit/'>
                        <DropdownField 
                                control={control} error={errors.tariff}
                                name="tariff" dataArray={tariffs}
                                placeholder="Tariff" isMulti={true}
                                isSearchable={true}
                        />
                    </Grid>
                    <Grid item xl={1} tab={2} sm={3} >
                        <p className="mt-2  px-2">Applicable To </p>
                    </Grid>
                    <Grid item xl={5} tab={4} sm={9} sx={{marginTop:"0.4rem",position:'relative'}}>
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
  

              {/* <Box width="100%"/> */}
              <Box width="100%"/> 
  
              </Grid>
            </Grid>


            {/* start here */}
             
            <Grid item lg={12} sm={12}>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} >
                        <CheckBoxField 
                          control={control} 
                          name="isPackageHealthPlan" 
                          label="Health Plan"
                      />
                    </Grid> 
                    <Grid item lg={6} sm={6} className='flex'>
                        <div className="mx-2 px-2">Set Package Rate  : </div>
                        <RadioField
                            label=""
                            name="packageRateAuto"
                            control={control}
                            dataArray={setPriceType}
                        />
                    </Grid>

                    {
                      isPackageHealthPlan ? (
                        <>
                        {/* health plan component */}
                        <HealthPlan 
                        validateDate={validateDate}
                        dateValue1={dateValue1}
                        setDateValue1={setDateValue1}
                        dateValue2={dateValue2}
                        setDateValue2={setDateValue2}
                          selectedUnits={selectedUnits}
                          selectedTariffs={selectedTariffs}
                          applicableTo={applicableTo}
                          classList={classList}
                          packageTotalRates={packageTotalRates}
                          setPackageTotalRates={setPackageTotalRates}
                          selectedServices={selectedServices}
                          setSelectedServices={setSelectedServices}
                        />
                        </>
                      ):(
                        <>
                        {/* package component */}
                        <PackageComponent 
                        validateDate={validateDate}
                        dateValue1={dateValue1}
                        setDateValue1={setDateValue1}
                        dateValue2={dateValue2}
                        setDateValue2={setDateValue2}
                            applicableTo={applicableTo}
                            classList={classList}
                            groupList={groupList}
                            isAuto={isAuto} 
                            selectedTariffs={selectedTariffs}
                            selectedUnits={selectedUnits}
                            packageServiceArray={packageServiceArray}
                            setPackageServiceArray={setPackageServiceArray}
                            packageTotalRates={packageTotalRates}
                            setPackageTotalRates={setPackageTotalRates}
                         />
                        </>
                      )
                    }
                </Grid> 
            </Grid> 
  
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