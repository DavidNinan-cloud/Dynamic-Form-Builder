import { useState, useEffect } from "react";
import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { errorAlert, successAlert } from "../../../Common Components/Toasts/Toasts";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import PatientAdvanceTable from "./PatientAdvanceTable";
import { useNavigate , Navigate} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormContext, useFieldArray } from "react-hook-form";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {useLocation} from 'react-router-dom';
import Divider from "@mui/material/Divider";
import {fetchPatientAdvanceDetails, savePaymentAdvance, autoSearchPatientAdvance, getPaymentTypes, fetchAdvanceReceipt } from '../../services/patientAdvance/PatientAdvanceServices'
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import useDidMountEffect from '../../../Common Components/Custom Hooks/useDidMountEffect';
import { useRef } from "react";
// import { SubmitButton } from "../../../Common Components/Buttons/CommonButtons";

import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import PatientInfo from "../../Common-Components/PatientInfo";
import ConfirmationModalTwoButton from "../../../Common Components/ConfirmationModalTwoButton";
import { baseUrl, pdfUrl } from "../../http-common-reports";

let inputSearchid = ''
// let amountDetails 
// let paymentTypeDetails
// let paymentRef
const incomingTableData = [{
  amount:"",
  paymentMethod:'',
}]
export default function PatientAdvance() {

const [ open, setOpen] = useState(false)
const handleOpen = () => {
    setOpen(true)
}
const handleClose = () => {
    setOpen(false)
}
const [showPanCard,setShowPanCard] = useState(false) 
const [inputSearchArr, setInputSearchArr] = useState([])
const [searchString, setSearchString] = useState('')
const [dataArr,setDataArr] = useState([])
const [comingData,setComingData] = useState({}) 
const [showPage,setShowPage] = useState(false)

const { isLoading, isError, error, isSuccess, mutate } = useMutation(savePaymentAdvance);
let paymentSchema = {

  paymentDetails: yup
  .array()
  .of(
    yup.object().shape({
      amount: yup.number().typeError('You Must Specify A Number').min(1, 'Min value 1.').required("Please Add This Field"),

      type:  yup.object().nullable().shape({
          value: yup.string().required("Please Mention Your Payment type"),
          label: yup.string().required("Please Mention Your Payment type")
      }).required("Please Mention Your Payment type"),
      
      referrenceNo: yup.string().when("type", (type) => {
        if (type !== null) {
          if (type.label !== "Cash"){
              return yup.string().required("Required");
          }
        }
      }),

    }),
    
  )
  .min(1, "Please Add amount Details"),

  mobileNumber: yup
          .string()
              .matches(/^[0-9]+$/, "Please Provide Valid number")
              .required("Please Add This Field")
              .min(10, "Add Aleast 10 Characters")
              .max(14, "Add Aleast 10 Characters"),
    
  panNumber: yup.string().when("showPanCard", (showPanCard) => {
    if (showPanCard) {
      return yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/,"Please Provide Valid Pan No. ").min(10, "Please Provide Valid Pan No.").max(10, "Please Provide Valid Pan No.").required("Please Provide Valid Pan No.")
  }
  }),
  // remarks: yup
  //     .string()
  //     .required("Please Add this field")
};
const paymentAppointValidation = yup.object().shape(
    paymentSchema
  ).required();
const paymentSchemaObj = paymentAppointValidation
const methods = useForm({
  mode: "onChange",
  resolver: yupResolver(paymentSchemaObj),
  defaultValues:{
    showPanCard:false,
    payeeSelf:false,
    panNumber:'',
    mobileNumber:'',
    remarks:'',
    paymentDetails: [{ type:"", amount: "", referrenceNo:""}],
  } 
});
const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch  } = methods;

const { fields:paymentFields, append:append, remove:remove } = useFieldArray({
    control:control,
    name: "paymentDetails",
  });
let paymentDetails = watch("paymentDetails");

const [paymentTypes, setPaymentTypes] = useState([])
const [filterdPaymentTypes, setFilterdPaymentTypes] = useState([])
const [paymentTableData,setPaymentTableData]=useState(incomingTableData)
const [savePayment, setSavePayment] = useState()
const [verfiedFilteredPayments,setVerfiedFilteredPayments] = useState([])
// 

  useEffect(()=>{
      getPaymentTypes()
      .then(response=>response.data)
      .then(res=>{
          console.log("PaymentTypes",res.result) 
          setPaymentTypes(res.result)
          let gotPaymentTypes = res.result
          let newData = [...paymentTableData];
          console.log('gotPaymentTypes obj',gotPaymentTypes)
          let obj = gotPaymentTypes.find(o => o.default === true);
          console.log('default obj',obj)
          newData[0].paymentMethod =  obj;
          setPaymentTableData(newData)
          setValue(`paymentDetails[${0}].type`,obj)
          PaymentTypeResult(res.result)
      })
    },[])
  
  const settingPaymentDefault = () =>{
        let gotPaymentTypes = [...paymentTypes]
        let newData = [...incomingTableData];
        console.log('gotPaymentTypes obj',gotPaymentTypes)
        let obj = gotPaymentTypes.find(o => o.default === true);
        console.log('default obj',obj)
        newData[0].paymentMethod =  obj;
        setPaymentTableData(newData)
        setValue(`paymentDetails[${0}].type`,obj)
        PaymentTypeResult(gotPaymentTypes)
  }
  const PaymentTypeResult = (allPaymentTypes) =>{
    let object = []
    for (let i = 0; i< paymentTableData.length;i++){
      let innerObj = paymentTableData[i].paymentMethod;
      object = [...object,innerObj]
    }
    let uniqueResultOne = allPaymentTypes.filter(function(obj) {
      return !object.some(function(obj2) {
          return obj == obj2;
      });
    });

    // let difference = paymentTypes.filter(x => !paymentTableData.types.includes(x));
    // console.log("object",uniqueResultOne)
    setFilterdPaymentTypes(uniqueResultOne)
  }
  const AddRefferenceNo = (index,PaymentTypeIs) =>{
    let newData = [...paymentTableData];
    newData[index].referrenceNo ="";
    newData[index].paymentMethod =  PaymentTypeIs;
    setPaymentTableData(newData)
  }
  const RemoveRefferenceNo = (index,PaymentTypeIs) =>{
    let newData = [...paymentTableData];
    delete newData[index].referrenceNo
    newData[index].paymentMethod =  PaymentTypeIs;
    setPaymentTableData(newData)
  }
  const AddRowPayment = () =>{
    setPaymentTableData([
          ...paymentTableData,
          {
            paymentMethod:"",
            referrenceNo:"",
            amount:""
          }
          ])
  } 

  const onSubmitPayment = (data) => {
    console.log("data",data)
    console.log("Payment",data.paymentDetails)
    console.log("table Data",paymentTableData)
    let DataTable = data.paymentDetails
    let finalData = {}
    let TotalAmt = 0 ;
    let payments = []
    for(let i=0; i<DataTable.length;i++){
      let obj={};
      console.log("DataTable[i].type",DataTable[i].type)
      if(DataTable[i].type.label !=="Cash"){
        obj.referenceNumber = DataTable[i].referrenceNo;
      }
      obj.paymentType = { id: parseInt(DataTable[i].type.value)};
      // pan number
      if(showPanCard){
        obj.panNumber = data.panNumber
      }
      // Above or this -- both works--pan number
      // if(DataTable[i].type.label.toLowerCase() === 'cash' && Number(DataTable[i].amount) >= 10000){
      //   obj.panNumber = data.panNumber
      // }
      obj.amount = Number(DataTable[i].amount);
      TotalAmt = TotalAmt + Number(DataTable[i].amount)
      payments=[...payments,obj]
    }
    finalData.paymentInfoList = payments
    finalData.patientInfo = { id : comingData.patientId}
    finalData.isCancelled = false,
    finalData.totalAmount= TotalAmt
    finalData.isAdvancePayment = true
    finalData.isCancelled = false
    finalData.mobileNumber = data.mobileNumber
    if(data.remarks){
      finalData.remarks = data.remarks
    }
    console.log("Final Data",finalData)
    setSavePayment(finalData)
    handleOpen()
  };
  const submitDataApit = () =>{
    mutate(savePayment, {onSuccess: (data, variables, context) => {
      console.log('data',data)
      let obj = data.data.result
      console.log('obj',obj)
      // fetchAdvanceReceipt()
      successAlert(data.data.message)
      resetForm()
      fetchPatientDetails()
    },
    onError:(data)=>{
      errorAlert(data.message)
    }});
  }
  const submitDataApitPrint = () =>{
    mutate(savePayment, {onSuccess: (data, variables, context) => {
      console.log('data',data)
      let obj = data.data.result
      console.log('obj',obj)
      PrintFunc(obj.patientId,obj.paymentId)
      successAlert(data.data.message)
      resetForm()
      fetchPatientDetails()
    },
    onError:(data)=>{
      errorAlert(data.message)
    }});
  }

  const PrintFunc = (patientId,paymentId) => {
    fetchAdvanceReceipt(patientId,paymentId).then((response) => {
      if (response.status === 200) {
          let w = window.innerWidth;
          let h = window.innerHeight;
          window.open(`${baseUrl}/generatePdf/advanceReceipt?patientId=${patientId}&paymentId=${paymentId}`,'myWindow', `height=${h},width=${w},scrollbars=1,menubar=no'`); 
          
        }
      })
      .catch((response) => {
          console.log(response);
      });

  }
  const payeeSelf = watch("payeeSelf");

  useDidMountEffect(()=>{
    console.log("payeeSelf",payeeSelf)
    if(payeeSelf){
      setValue('mobileNumber',comingData.MoblieNo, {
        shouldValidate: true,
      } )
      if(comingData.panNumber){
      setValue('panNumber',comingData.panNumber, {
        shouldValidate: true,
      })}else{
        setValue('panNumber','')
      }
    }else{
      setValue('mobileNumber','')
      setValue('panNumber','')
    }
  },[payeeSelf])

  useDidMountEffect(()=>{
      fetchPatientDetails()
  },[searchString])

  const fetchPatientDetails = () =>{
    fetchPatientAdvanceDetails(searchString).then((response) => {
      console.log("Patient details result",response.data.result);
      let receivedData = response.data.result
      let obj = {
        patientId : receivedData.id,
        PatientName : receivedData.patientName,
        MoblieNo : receivedData.mobileNumber,
        Age : receivedData.age,
        UHID : receivedData.uhid,
        cashBalance : receivedData.cashBalance,
        panNumber : receivedData.panNumber
      }
      console.log("advance history",receivedData.paymentResponseDto);
      if(!showPage){
        setShowPage(true)
      }
      setDataArr(receivedData.paymentResponseDto)
      setComingData(obj)
        });
  }

  const resetForm = () => {
    reset()
    setPaymentTableData(incomingTableData)
    setShowPanCard(false)
    settingPaymentDefault()
  }
  const clearPage = () => {
    setFilterdPaymentTypes(paymentTypes)
    setPaymentTableData(incomingTableData)
    setShowPanCard(false)
    setDataArr([])
    setComingData({})
    setShowPage(false)
    settingPaymentDefault()
  }

  const validData = useRef(true)
  const addToPaymentArr = () => {

      console.log('paymentDetails',paymentDetails)
      let amountDetails, paymentTypeDetails, paymentRef
      validData.current = true
      let newTemplateData = [...paymentTableData];
      for( let item of paymentDetails){
          // amountDetails = item.amount;
          // paymentTypeDetails = item.paymentMethod
          if(item.type.label !== "Cash"){
              paymentRef = item.referrenceNo
          }else{
              paymentRef = "notValidforCash"
          }

          console.log("paymentTypeDetails",item.paymentMethod)
          console.log("amountDetails",item.amount)
          console.log("paymentRef",paymentRef)
          if ( item.paymentMethod !==null && item.paymentMethod !=="" && item.amount !==null && item.amount !=='' && paymentRef !=="")
          { 
          }else{
              validData.current = false
          }
      }
      if(validData.current) 
      {   
          console.log("adding to arr",validData.current)
          append({ type:"", amount: ""})
          AddRowPayment();
      } else {
          console.log("should not add to arr",validData.current)
          trigger(["paymentDetails"])
      }
  }

  const deleteTableRow = (index,rowPaymentType) => {

    remove(index)

    if(index !== paymentDetails.length-1){
        for(let i=index;i<paymentTableData.length-1;i++){
        setValue(`paymentDetails[${i}].type`,paymentDetails[i + 1].type)
        setValue(`paymentDetails[${i}].amount`,paymentDetails[i + 1].amount)

        
        if("referrenceNo" in paymentTableData[i+1]){
        console.log("refNo +1",paymentTableData[i+1].referrenceNo)
        if(paymentTableData[i+1].referrenceNo!== ""){
            setValue(`paymentDetails[${i}].referrenceNo`,paymentTableData[i+1].referrenceNo)
        }else{
            setValue(`paymentDetails[${i}].referrenceNo`,"")
        }
        }else{
        RemoveRefferenceNo(i, paymentDetails[i + 1].type)
        }
        }
    }
    deleteRowPayment(index)
    // setFilteredData
    
    let paymentFiltered = [...filterdPaymentTypes]
    let addType = rowPaymentType
    setFilterdPaymentTypes([...paymentFiltered,addType])
  }
    
  const deleteRowPayment = (index) => {
    let newTemplateData = [...paymentTableData];
    newTemplateData.splice(index, 1);
    setPaymentTableData(newTemplateData)
  } 

  function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
  }
  useDidMountEffect(()=>{
      if(filterdPaymentTypes.length > 0 && paymentTypes.length > 0 && paymentDetails.length > 0){
          let arr = [...filterdPaymentTypes]
          let arrLength = arr.length
          let tableLength = paymentTableData.length
          let paymentTypesLength = paymentTypes.length

          if(arrLength !== paymentTypesLength - tableLength){
              console.log("filter Error")

          }
          let AvailablePaymentTypes = []
          let duplicates = hasDuplicates(arr)
          // 
          let tableArr = [...paymentDetails]
          let usedTypes = []
          for ( let obj of tableArr){
              let type = obj.type.label
              if(type == "Cash"){
                usedTypes.push(type)
            }
          }
          let paymentTypesArr = [...paymentTypes]
          let typesArr = []
          for (let obj of paymentTypesArr){
              let exists = usedTypes.find(o => { 
                  if(o == obj.label){
                      return true
                  }else{
                      return false
                  }});
              if(!exists){
                  typesArr.push(obj)
              }
          }
          setVerfiedFilteredPayments(typesArr)
      }
  },[filterdPaymentTypes])

  return (
    <>
      <div className="mt-14 text-center text-gray-700 text-2xl font-Poppins py-4">Patient Advance</div>
      <div className=" bg-white mx-4 px-4 min-h-screen">
            <Grid container spacing={1}>
                <Grid item lg={4} sm={6} className='z-50'>
                <SearchBar
                    control={control}
                    error={errors.inputSearch}
                    type="button"
                    name="inputSearch"
                    placeholder="Search by Patient Name/ UHID/ Mobile No."
                    dataArray={inputSearchArr}
                    isSearchable={true}
                    handleInputChange={(e)=>{
                      console.log("searchinput",e)
                      if(e == null)
                      {
                        console.log('clear 1')
                      }else{
                        if (e.length > 0) {
                          autoSearchPatientAdvance(e).then((response) => {
                            console.log("response result",response.data.result);
                            setInputSearchArr(response.data.result);
                              });
                            }
                          }
                      }}
                    //after search user get specific value
                    onChange={(e)=>{
                      console.log("searchinput selected",e)
                      if(e == null){
                        console.log('clear 2')
                        resetForm()
                        clearPage()
                        setSearchString("")
                      }
                      else{
                        resetForm()
                        clearPage()
                        setSearchString("")
                        inputSearchid = e.value
                      }
                    }}
                    />
                </Grid>
                <Grid item lg={3} sm={3} className="flex space-x-2 shrink" >
                    <Button
                      className=" h-10 w-10 rounded-md text-gray-500"
                      type="button"
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: "grey.500", color: "gray",height:'40px' }}
                      onClick={()=>{
                                let searchInputValue = inputSearchid
                                if(searchInputValue==undefined)
                                {
                                  searchInputValue = ""
                                }else{
                                  console.log("searchInputValue",searchInputValue)
                                  setSearchString(searchInputValue)
                                }
                      }}
                    >
                      <SearchIcon className="cursor-pointer" />
                    </Button>
                </Grid>
            </Grid>
            {showPage ? (
                <>
                  {/* Paitent Inf0 */}
                  <div className='mx-auto w-full'>
                            {/* Paitent Inf0 */}
                          {/* <PatientInfo comingData={comingData}/> */}
                          <>
          <div className='mx-auto border w-full  my-4 bg-gray-100'>
                            {
                                comingData? (
                                <Grid container spacing={1} className='py-4 mx-5 mb-2 mt-6  px-5'>
                                    <Grid item  md={1.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                  <span className="tracking-wide font-semibold">
                                                      Patient Name
                                                  </span>
                                              </Grid>
                                              <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                  :
                                              </Grid>
                                              <Grid item  md={2.3} sm={3} className="pt-6 text-left" sx={{text:'left',overflowWrap:'break-word'}}>
                                                  <span className=''>{`  ${comingData.PatientName}`} </span> 
                                              </Grid>
                                              {/* UHID */}
                                              <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                  <span className="tracking-wide font-semibold">
                                                      UHID   
                                                  </span> 
                                              </Grid>
                                              <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                  :
                                              </Grid>
                                              <Grid item md={2} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                  <span className=''>{`  ${comingData.UHID}`} </span>
                                              </Grid>
                                              {/* Mobile No */}
                                              <Grid item  md={1.3} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                  <span className="tracking-wide font-semibold">
                                                      Mobile No.   
                                                  </span>  
                                              </Grid>
                                              <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                  :
                                              </Grid>
                                              <Grid item  md={1.5} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                  <span className=''>{`  ${comingData.MoblieNo}`} </span>
                                              </Grid>
                                              {/* Age */}
                                              <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                  <span className="tracking-wide font-semibold">
                                                      Age   
                                                  </span> 
                                              </Grid>
                                              <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                  :
                                              </Grid>
                                              <Grid item  md={1} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                  <span className=''>{`  ${comingData.Age}`} </span>
                                              </Grid>
                                              {/* cashBalance */}
                                              <Grid item  md={1.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                  <span className="tracking-wide font-semibold">
                                                    Cash Balance   
                                                  </span> 
                                              </Grid>
                                              <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                  :
                                              </Grid>
                                              <Grid item  md={2.3} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                  <span className=''>{`  ${comingData.cashBalance}`} </span>
                                              </Grid>
                                    {/* cashBalance */}
                                    {/* <Grid item lg={0.8} md={1.5} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                        <span className="tracking-wide font-semibold">
                                          Cash Balance   
                                        </span> 
                                    </Grid>
                                    <Grid item lg={0.1} md={0.5} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                        :
                                    </Grid>
                                    <Grid item lg={1.5} md={2} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                        <span className=''>{`  ${comingData.cashBalance}`} </span>
                                    </Grid> */}
                                </Grid>
                                ):(<p className='mx-auto'>"Data Not Found"</p>)
                            }
                    </div>
                            
                            
                  <Divider sx={{
                      "&::before, &::after": {
                        borderColor: "secondary.light",
                      },
                    }}/>
          </>
                  </div>

                  {/* Payment Form */}
                  <div className="w-full">
                  {/* Payment Inf0 */}
                  
                  <form onSubmit={handleSubmit(onSubmitPayment)} className="" >
                  <fieldset className='mx-auto border w-full rounded-xl mt-4'>
                      <legend className='ml-6 my-2 rounded-xl'>
                          <p className="text-xl font-semibold tracking-wide mx-4">Payment Details 
                          </p>
                      </legend>
                      <div className="mx-auto px-10 py-2" >
                          
                          {paymentTableData.map((item, index) =>{
                          return(
                              <Grid container spacing={2} key={item.id}>
                                  
                                  <Grid item lg={3} sm={4} sx={{marginY:'0.5rem'}}>
                                  <DropdownField 
                                      isSearchable={false}
                                      control={control} error={errors.paymentDetails?.[index]?.type}
                                      name={`paymentDetails[${index}].type`} 
                                      dataArray={verfiedFilteredPayments}
                                      placeholder="Payment Type *"
                                      inputRef={{...register(`paymentDetails[${index}].type`,
                                      {       onChange: (e) => {
                                                  console.log(e.target.value)
                                                  let PaymentTypeIs = e.target.value
                                                  let newData = [...paymentTableData];
                                                  
                                                  if(newData[index].amount>=10000 && e.target.value.label.toLowerCase() === 'cash'){
                                                    console.log('pancard needed')
                                                    setShowPanCard(true)
                                                    setValue('showPanCard',true)
                                                  }else if(showPanCard && newData[index].paymentMethod.label === 'Cash'){
                                                          setShowPanCard(false)
                                                          setValue('showPanCard',false)
                                                  }
                                                  
                                                  newData[index].paymentMethod =  e.target.value;
                                                  setPaymentTableData(newData)
                                                  PaymentTypeResult(paymentTypes)
                                                          if(e.target.value.label!=="Cash"){
                                                          if("referrenceNo" in paymentTableData[index]){

                                                          }else{
                                                              AddRefferenceNo(index, PaymentTypeIs)
                                                          }
                                                          }else{
                                                          if("referrenceNo" in paymentTableData[index]){
                                                              RemoveRefferenceNo(index, PaymentTypeIs)
                                                          }
                                                          }
                                            },
                                      })}}
                                      />
                                  </Grid>
                                  <Grid item lg={2} sm={3} sx={{marginY:'0.5rem'}}>
                                      <InputField
                                                  name={`paymentDetails[${index}].amount`}
                                                  variant="outlined"
                                                  label="Amount *"
                                                  inputRef={{...register(`paymentDetails[${index}].amount`,{
                                                  
                                                  onChange: (e) => {
                                                      if(e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value > 0  )
                                                      {
                                                        let amountValue = e.target.value
                                                        let newData = [...paymentTableData];
                                                        newData[index].amount =  amountValue;

                                                        if(newData[index].paymentMethod.label.toLowerCase() === 'cash'){
                                                            if(amountValue>=10000){
                                                                console.log('pancard needed')
                                                                setShowPanCard(true)
                                                                setValue('showPanCard',true)
                                                            }else if(showPanCard){
                                                                setShowPanCard(false)
                                                                setValue('showPanCard',false)
                                                            }
                                                        }
                                                        setPaymentTableData(newData)
                                                      }
                                                  },
                                                  })}}
                                                  error={errors.paymentDetails?.[index]?.amount}
                                                  control={control}
                                              />
                                          
                                  </Grid>
                                  {/* { "referrenceNo" in  item ? ( */}
                                  { paymentDetails[index].type && paymentDetails[index].type.label !== 'Cash' ? (
                                  <Grid item lg={3} sm={3} sx={{marginY:'0.5rem'}}>
                                          <InputField
                                          // type="number"
                                          name={`paymentDetails[${index}].referrenceNo`}
                                          error={errors.paymentDetails?.[index]?.referrenceNo}
                                          control={control}
                                          label="Referrence Number *"
                                          inputRef={{...register(`paymentDetails[${index}].referrenceNo`,{
                                                  
                                          onChange: (e) => {
                                              if(e.target.value !== "")
                                              {
                                              let newData = [...paymentTableData];
                                              newData[index].referrenceNo =  e.target.value;
                                              setPaymentTableData(newData)
                                              }
                                          },
                                          })}}
                                          />
                                  </Grid>):""}

                                
                                        <Grid item md={2} sm={2} sx={{marginY:'0.5rem'}}>
                                            <div className="flex">
                                                {paymentTableData.length !== 1 && (
                                                <RemoveOutlinedIcon
                                                    className="mt-2 rounded-full border-2 border-red-600"
                                                    onClick={() => {
                                                      deleteTableRow(index,paymentDetails[index].type)
                                                    }
                                                    }
                                                />
                                                )}
                                                {
                                      paymentTableData.length !== paymentTypes.length ? (
                                        <>
                                                {paymentTableData.length - 1 === index && (
                                                <AddOutlinedIcon
                                                    className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                                                    onClick={addToPaymentArr}
                                                />
                                                )}
                                        </>):""}
                                            </div>
                                          </Grid>
                                  
                              </Grid>
                          )})}
                          
                      </div>
                  </fieldset>              
                  <div className="pl-10 py-4">
                      <Grid container spacing={2} >
                              {/* Payee Self */}
                              <Grid item lg={1.5} md={1.5} >
                                  <CheckBoxField
                                      control={control}
                                      name="payeeSelf"
                                      label="Payee Self"
                                  />
                              </Grid>
                              {/* Mobile N0 */}
                              <Grid item lg={3} md={3} >
                                          <InputField
                                              name='mobileNumber'
                                              variant="outlined"
                                              label="Mobile Number *"
                                              error={errors.mobileNumber}
                                              control={control}
                                          />
                              </Grid>

                              {/* Pan N0 */}
                              { showPanCard ? (
                                <Grid item lg={3} md={3} >
                                            <InputField
                                                name='panNumber'
                                                variant="outlined"
                                                label="Pan Number *"
                                                error={errors.panNumber}
                                                control={control}
                                            />
                                </Grid>):''
                              }
                              {/* Remarks */}
                              <Grid item lg={3} md={3} >
                                          <InputField
                                              name='remarks'
                                              variant="outlined"
                                              label="Remarks"
                                              error={errors.remarks}
                                              control={control}
                                          />
                              </Grid>
                              
                              {!showPanCard ? (<Grid item lg={3} md={3} ></Grid>):""}
                              <Grid item lg={1.5} md={1.5} className='flex justify-end'>
                                    <SubmitButton />
                                    {/* <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                        className="my-auto text-lg font-bold "
                                        fullWidth
                                        // sx={{width:'2.5rem'}}
                                    >
                                      Pay
                                    </Button> */}
                                  
                              </Grid>
                      </Grid>
                      {/* <div className='justify-center w-fit mx-auto mt-6 space-x-6'>
                                  <Button
                                      type="submit"
                                      variant="outlined"
                                      color="success"
                                      size="small"
                                      sx={{border: "2px solid" }}
                                  >
                                      Pay Now
                                  </Button>
                      </div> */}
                  </div>
                  </form>
                  </div>

                            
                  <Divider sx={{
                      "&::before, &::after": {
                        borderColor: "secondary.light",
                      },
                    }}/>
                  {/* Advance Payment History  */}

                  { dataArr && dataArr.length > 0 ? (
                  <div className='mx-auto my-4'>
                      <div className='ml-6 my-2 rounded-xl'>
                          <p className="text-xl font-semibold tracking-wide mx-4">Advance Payment History 
                          </p>
                      </div>
                      <div className="px-5 overflow-x-hidden">
                          <PatientAdvanceTable data={dataArr}/>
                      </div>
                  </div>
                  ):""}
                </>):''}
                <ConfirmationModalTwoButton
                    confirmationOpen={open}
                    confirmationHandleClose={handleClose}
                    firstSubmitFunc={()=>{
                      handleClose()
                      submitDataApit()
                    }}
                    firstButtonMsg="Save Payment"
                    secondSubmitFunc={()=>{
                      handleClose()
                      submitDataApitPrint()
                    }}
                    secondButtonMsg="Save And Print"
                    confirmationLabel="Confirmation "
                    confirmationMsg="Save Payment Details?"
          />
      </div>
    </>
  )
}
