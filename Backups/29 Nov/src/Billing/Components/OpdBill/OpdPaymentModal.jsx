import React, {useLayoutEffect, useRef, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton } from '@mui/material'
import { Controller, useForm, useFieldArray } from "react-hook-form";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchBar from '../../../Common Components/FormFields/SearchBar';
import InputField from '../../../Common Components/FormFields/InputField';
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import CheckBoxField from '../../../Common Components/FormFields/CheckBoxField';
import useDidMountEffect from '../../../Common Components/Custom Hooks/useDidMountEffect';
import { AddAlarmRounded } from '@mui/icons-material';
import ConfirmationModal from '../../../Common Components/ConfirmationModal';
import { successAlert } from '../../../Common Components/Toasts/CustomToasts';
import CloseIcon from '@mui/icons-material/Close';
// import React, {useEffect, useState } from 'react'
// import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useFormContext, useFieldArray } from "react-hook-form";
// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import InputField from '../../../Common Components/FormFields/InputField';
// import DropdownField from '../../../Common Components/FormFields/DropdownField';
// import {Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton } from '@mui/material'
import {savePayment } from "../../services/PaymentPageServices"
// import { successAlert, errorAlert } from '../../../Common Components/Toasts/CustomToasts'
// import { useNavigate , Navigate} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
// import {useLocation} from 'react-router-dom';
// import CloseIcon from '@mui/icons-material/Close';
const incomingTableData = [{
    amount:"",
    paymentMethod:'',//SAVE DEFAULT PAYMENT TYPE 
  }]
export default function OpdPaymentModal({
        visitId,
        defaultPaymentType,
        callTableDataApi,
        comingData,
        paymentBillId, 
        openPayment, 
        handleClosePayment , 
        paymentTypes, 
        payableTotalModal, 
        advanceAvailable,
    })
    {
        
        const [finalData, setFinalData] = React.useState();
        const [paymentTableData,setPaymentTableData]=useState(incomingTableData)
        const [filterdPaymentTypes, setFilterdPaymentTypes] = useState([])
        const [showPanCard,setShowPanCard] = useState(false) 
        const [showPaymentArr, setShowPaymentArr] = useState(true)
        
        
        const { isLoading, isError, error, isSuccess, mutate } = useMutation(savePayment);
        let paymentSchema = {
    
            paymentDetails: yup.array().when('showPaymentArr',(showPaymentArrValue)=>{
                if(showPaymentArrValue){
                    return yup.array()
                    .of(
                      yup.object().shape({
                        amount: yup.number().typeError('you must specify a number').min(0, 'Min value 0.').required("Please Add this field"),
              
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
              
                      })
                    ).min(1, "Please Add amount Details")
                }
            }),
      
            panNumber: yup.string().when("showPanCard", (showPanCard) => {
                  if (showPanCard) {
                    return yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/,"Please Provide Valid Pan No. ").min(10, "Please Provide Valid Pan No.").max(10, "Please Provide Valid Pan No.").required("Please Provide Valid Pan No.")
                }
            }),
    
            amountToConsume: yup.string().when("consumeAdvance", (type) => {
                if (type) {
                    return yup.number().typeError('you must specify a number').min(0, 'Min value 0.').required("Please Add this field").max(advanceAvailable, `Cannot Exceed ${advanceAvailable} Rupees`);
                }else {
                    return yup.string()
                }
            }),
    
            payingTotal: yup.number().typeError('you must specify a number').max(payableTotalModal, `Cannot Exceed ${payableTotalModal} Rupees`)
        };
        
        const paymentAppointValidation = yup.object().shape(
            paymentSchema
        ).required();
        const paymentSchemaObj = paymentAppointValidation
        const paymentMethods = useForm({
            mode: "onChange",
            resolver: yupResolver(paymentSchemaObj),
            defaultValues:{
                advanceAvailableField:advanceAvailable,
                showPaymentArr:true,
                payableTotal:0,
                payingTotal:0,
                consumeAdvance:false,
                amountToConsume:0,
                panNumber:'',
                showPanCard:false,
                paymentDetails: [{ type:"", amount: "", referrenceNo:""}],
                } 
            });
        const {getFieldState ,watch:paymentwatch, register:paymentregister, handleSubmit:paymenthandleSubmit, reset:paymentreset, trigger:paymenttrigger, formState:{errors:paymentErrors}, control:paymentcontrol, setValue:paymentsetValue,setError:paymentsetError, clearErrors:paymentclearErrors  } = paymentMethods;   
        
        const { fields:paymentFields, append:paymentAppend, remove:paymentRemove } = useFieldArray({
            control:paymentcontrol,
            name: "paymentDetails",
          });
        const paymentDetails = paymentwatch("paymentDetails");
        const consumeAdvance = paymentwatch("consumeAdvance");
        const consumeAMT = paymentwatch("amountToConsume");
        const payingTotal = paymentwatch("payingTotal");
    
                
        const AddRefferenceNo = (index,PaymentTypeIs) =>{
            let newData = [...paymentTableData];
            newData[index].referrenceNo ="";
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
        
        
        useEffect(()=>{
            if(!openPayment){
                paymentresetFunc()
            }
        },[openPayment])

        const paymentresetFunc = () => {
            paymentreset()
            
            // paymentsetValue(`payingTotal`,0)
        // defaultPaymentType
            let newData = [...incomingTableData];
            let obj = defaultPaymentType
            newData[0].paymentMethod =  obj;
            newData[0].amount =  0;
            setPaymentTableData(newData)
            paymentsetValue(`paymentDetails[${0}].type`,obj)
            
            PaymentTypeResultForReset(paymentTypes)
            // setPaymentTableData(incomingTableData)
        }

        const PaymentTypeResultForReset = (allPaymentTypes) =>{
            let object = []
            for (let i = 0; i< incomingTableData.length;i++){
                let innerObj = incomingTableData[i].paymentMethod;
                object = [...object,innerObj]
            }
            let uniqueResultOne = allPaymentTypes.filter(function(obj) {
                return !object.some(function(obj2) {
                    return obj == obj2;
                });
            });
        
            setFilterdPaymentTypes(uniqueResultOne)
        }
        useEffect(()=>{
            let gotPaymentTypes = [...paymentTypes]
            let newData = [...paymentTableData];
            console.log('gotPaymentTypes obj',gotPaymentTypes)
            let obj = gotPaymentTypes.find(o => o.default === true);
            console.log('default obj',obj)
            newData[0].paymentMethod =  obj;
            setPaymentTableData(newData)
            paymentsetValue(`paymentDetails[${0}].type`,obj)
            PaymentTypeResult(gotPaymentTypes)
        },[paymentTypes])
    
        
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
        
            setFilterdPaymentTypes(uniqueResultOne)
        }
        // paying exceeds limit error
        // working here
        useEffect(()=>{
            console.log('payingTotal',payingTotal)
            if(payingTotal>payableTotalModal){
                paymentsetError('payingTotal', { type: 'custom', message: 'Amount exceeds current bill total' });
            }else{
                paymentclearErrors('payingTotal')
            }
        },[payingTotal,payableTotalModal])
    
        // total posible to pay changes
        useEffect(()=>{
            console.log('payableTotal',payableTotalModal)
            paymentsetValue("payableTotal",payableTotalModal)
        },[payableTotalModal])
    
    
    
        // setting values onChange true/false - 
        useEffect(()=>{
            if(consumeAdvance){
                if(advanceAvailable < payableTotalModal){
                    paymentsetValue("amountToConsume",advanceAvailable)
                }else {
                    paymentsetValue("amountToConsume",payableTotalModal)
                }
                // paying total calculation
    
            }else {
                // hide cash arr
                if(!showPaymentArr){
                    paymentsetValue('showPaymentArr',true) 
                    setShowPaymentArr(true)
                }
            }
        },[consumeAdvance])
    
        useEffect(()=>{
            // hide cash arr 
            if(consumeAMT==payableTotalModal && consumeAdvance){
                paymentsetValue('showPaymentArr',false) 
                setShowPaymentArr(false)
            }else if(!showPaymentArr){
                paymentsetValue('showPaymentArr',true) 
                setShowPaymentArr(true)
            }
            // error
            if(consumeAMT>advanceAvailable){
                paymentsetError('amountToConsume', { type: 'custom', message: `Amount exceeds` });
            }else{
                paymentclearErrors('amountToConsume')
            }
    
    
            let totalPayment = 0
            if(consumeAdvance && consumeAMT && consumeAMT> 0){
                totalPayment = totalPayment + Number(consumeAMT)
            }else{
    
            }

            
            // console.log("this is messing value before",totalPayment)
            for(let val of paymentTableData){
                totalPayment = totalPayment + Number(val.amount)
            }
            // console.log("this is messing value",totalPayment)
            paymentsetValue("payingTotal",totalPayment)
            
        },[paymentTableData,consumeAMT,consumeAdvance])
    
        useDidMountEffect(()=>{
            paymentsetValue("advanceAvailableField",advanceAvailable)
        },[advanceAvailable])
        useEffect(()=>{
            if(!openPayment){
                paymentsetValue("advanceAvailableField",advanceAvailable)
            }
        },[openPayment])
        useEffect(()=>{
            console.log('paymentErrors',paymentErrors)
        },[paymentErrors])
    
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
                paymentAppend({ type:"", amount: ""})
                AddRowPayment();
            } else {
                console.log("should not add to arr",validData.current)
                paymenttrigger(["paymentDetails"])
            }
        }


        const [openPayNow, setOpenPayNow] = React.useState(false);
        const handelOpenPayNow = () => setOpenPayNow(true);
        const handleClosePayNow = () => {
            if(openPayNow){
                setOpenPayNow(false)
            }
        };
        // const onSubmitPayment = (data) =>{

        //     finalData.bill = { id : Number(paymentBillId)}
        // }
        const onSubmitPayment = (data) => {
                console.log("payment data",data)
                // service page
                let finalSubmit = {}
                // finalSubmit.patientVisit ={ id: Number(comingData.visitId) }
                // 
                console.log("Payment",data.paymentDetails)
                console.log("table Data",paymentTableData)
                let DataTable = data.paymentDetails
                let TotalAmt = 0 ;

                // consume advance
                if(showPaymentArr){
                    let payments = []
                    for(let i=0; i<DataTable.length;i++){
                        let obj={};
                        console.log("DataTable[i].type",DataTable[i].type)
                        if(DataTable[i].type.label !=="Cash"){
                        obj.referenceNumber = DataTable[i].referrenceNo;
                        }
                        obj.paymentType = { id: parseInt(DataTable[i].type.value)};
                        obj.amount = Number(DataTable[i].amount);
                        TotalAmt = TotalAmt + Number(DataTable[i].amount)
                        payments=[...payments,obj]
                    }
                    finalSubmit.paymentInfoList = payments
                    if(showPanCard){
                        finalSubmit.panNumber = data.panNumber
                    }else{
                        finalSubmit.panNumber = null
                    }

                    if(data.consumeAdvance){
                        finalSubmit.consumeAdvance = data.consumeAdvance;
                        finalSubmit.consumeAmount = data.amountToConsume;
                    }
                }else{
                    finalSubmit.consumeAdvance = data.consumeAdvance;
                    finalSubmit.consumeAmount = data.amountToConsume;
                }
                
                finalSubmit.bill = { id : Number(paymentBillId)}
                finalSubmit.isCancelled = false,
                finalSubmit.totalAmount= data.payingTotal
                console.log("Final Data payment",finalSubmit)
                setFinalData(finalSubmit)
                handelOpenPayNow()
    };

    // const callAgainTableApi = () => {
    //     console.log("defaultParams", defaultParams);
        
    //     showSpinner(true);
    //     tableApiFunc(defaultParams)
    //       .then((response) => response.data)
    //       .then((res) => {
    //         showSpinner(false);
    //         let incomingData = res.result
    //         setDataResult(incomingData)
    //       })
    //       .catch(() => {
    //         showSpinner(false);
    //       })
    //   }


    const deleteTableRow = (index,rowPaymentType) => {
        paymentRemove(index)
        
        let paymentArr = [...paymentTableData]
        if(index !== paymentDetails.length-1){


            for(let i=index;i<paymentArr.length-1;i++){
                paymentsetValue(`paymentDetails[${i}].type`,paymentDetails[i + 1].type)
                paymentsetValue(`paymentDetails[${i}].amount`,paymentDetails[i + 1].amount)

                

                if("referrenceNo" in paymentArr[i+1]){
                    if(paymentArr[i+1].referrenceNo!== ""){
                        paymentsetValue(`paymentDetails[${i}].referrenceNo`,paymentArr[i+1].referrenceNo)
                    }else{
                        paymentsetValue(`paymentDetails[${i}].referrenceNo`,"")
                    }
                }else{
                    paymentArr = RemoveRefferenceNoNew(i, paymentDetails[i + 1].type)
                }
            }
        }
        
        let paymentFiltered = [...filterdPaymentTypes]
        let addType = rowPaymentType
        setFilterdPaymentTypes([...paymentFiltered,addType])
        deleteRowPayment(index, paymentArr)
    }
    
    const deleteRowPayment = (index, paymentArr) => {
        let newTemplateData = [...paymentArr];
        newTemplateData.splice(index, 1);
        setPaymentTableData(newTemplateData)
    }  

    const RemoveRefferenceNoNew = (index,PaymentTypeIs) =>{
        let newData = [...paymentTableData];
        console.log("Cash",newData[index])
        console.log("typeisInstead",PaymentTypeIs)
        delete newData[index].referrenceNo
        newData[index].paymentMethod =  PaymentTypeIs;
        // setPaymentTableData(newData)
        return newData
    }


    const RemoveRefferenceNo = (index,PaymentTypeIs) =>{
        let newData = [...paymentTableData];
        delete newData[index].referrenceNo
        newData[index].paymentMethod =  PaymentTypeIs;
        setPaymentTableData(newData)
    }

    const [verfiedFilteredPayments,setVerfiedFilteredPayments] = useState()

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
            console.log("typesArr",typesArr)
            setVerfiedFilteredPayments(typesArr)
        }
    },[filterdPaymentTypes])
    return(
        <Modal
            open={openPayment}
            onClose={handleClosePayment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={{position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '80%',
            maxWidth: '90%',
            height: 'auto',
            minHeight: '30%',
            bgcolor: 'background.paper',
            overflow:'hidden',
            borderRadius: "0.7rem",
            boxShadow: 24,
            paddingX: 4,}}
            className="">

    <div className="flex w-full justify-between my-2">
        <div className="w-full flex ">
            <h1 className='text-xl font-semibold mr-2'>Amount Pending :  {payableTotalModal} </h1> 
        </div>
        <div className='text-red-600'><CloseIcon onClick={handleClosePayment}/></div>
    </div>
    <Divider light sx={{marginBottom:'1rem'}}/>        
        <form onSubmit={paymenthandleSubmit(onSubmitPayment)}>
            
            {/* Advance Info */}
            { advanceAvailable > 0 ?
                    (
            <fieldset className='mx-auto border w-full rounded-xl my-1'>
                <legend className='ml-6  rounded-xl'>
                    <p className="text-xl font-semibold tracking-wide mx-4">Advance Available 
                    </p>
                </legend>
                <div className="my-2 w-[95%] mx-auto p-2" >
                    <Grid container spacing={2} >
                                <Grid item lg={2.5} sm={4.5} className='flex lg:text-lg text-base  font-semibold'>
                                    {/* <p className='mt-2'> :  {advanceAvailable}</p> */}
                                    <fieldset disabled={true} className='w-full'>
                                        <InputField
                                            sx={{width:'100%'}}
                                            variant="outlined"
                                            // disabled={true}
                                            inputProps={{ readOnly: true }}
                                            name="advanceAvailableField"
                                            label=""
                                            error={paymentErrors.advanceAvailableField}
                                            control={paymentcontrol}
                                        />
                                    </fieldset>
                                </Grid>
                                <Grid item lg={0.5} sm={1} className="tracking-wide font-medium ">
                                            <span className="text-xl -translate-x-2 mt-2 ">
                                                INR
                                            </span>
                                </Grid>
                                <Grid item lg={3} sm={4.5}  sx={{marginLeft:'0.5rem'}}>
                                    <CheckBoxField
                                        control={paymentcontrol}
                                        name="consumeAdvance"
                                        label="Consume Advance"
                                    />
                                </Grid>
                                {   consumeAdvance ? (
                                    <Grid item lg={3} sm={4.5}>
                                        <InputField
                                            name='amountToConsume'
                                            error={paymentErrors.amountToConsume}
                                            control={paymentcontrol}
                                            label="Amount To Consume"
                                        />
                                    </Grid>
                                    ):''
                                }
                    </Grid>
                </div>
            </fieldset>):""}
            {/* Payment Info */}
            <fieldset className='mx-auto border w-full rounded-xl my-1'>
                <legend className='ml-6  rounded-xl'>
                    <p className="text-xl font-semibold tracking-wide mx-4">Payment Details 
                    </p>
                </legend>
                <div className="mb-2 w-[96%] mx-auto border-t p-2" >
                    
                    { showPaymentArr ? (<>
                        {paymentTableData.map((item, index) =>{
                    // console.log("item",item)
                    return(
                <Grid container spacing={2} key={item.id}>
                    
                    <Grid item lg={4} sm={4} sx={{marginY:'0.5rem'}}>
                    <DropdownField 
                        control={paymentcontrol} error={paymentErrors.paymentDetails?.[index]?.type}
                        name={`paymentDetails[${index}].type`} label="Qualification" dataArray={verfiedFilteredPayments} isSearchable={false}
                        placeholder="Payment Type"
                        // defaultValue={item.paymentMethod}
                        inputRef={{...paymentregister(`paymentDetails[${index}].type`,
                        {       onChange: (e) => {
                        console.log(e.target.value)
                        let PaymentTypeIs = e.target.value
                        let newData = [...paymentTableData];
    
                        if(newData[index].amount>=10000 && e.target.value.label.toLowerCase() === 'cash'){
                            console.log('pancard needed')
                            setShowPanCard(true)
                            paymentsetValue('showPanCard',true)
                        }else if(showPanCard && newData[index].paymentMethod.label.toLowerCase() === 'cash'){
                                setShowPanCard(false)
                                paymentsetValue('showPanCard',false)
                        }
                        
                        newData[index].paymentMethod =  e.target.value;
                        setPaymentTableData(newData)
                        PaymentTypeResult(paymentTypes)
                                if(e.target.value.label.toLowerCase()!=="cash"){
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
                    <Grid item lg={3} sm={3} sx={{marginY:'0.5rem'}}>
                                {/* ///amount/// */}
                                    <InputField
                                    name={`paymentDetails[${index}].amount`}
                                    variant="outlined"
                                    label="Amount"
                                    inputRef={{...paymentregister(`paymentDetails[${index}].amount`,{
                                    
                                    onChange: (e) => {
                                        if(e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value >= 0  )
                                        {
                                        let amountValue = e.target.value
                                        let newData = [...paymentTableData];
                                        newData[index].amount =  amountValue;
                                        if(newData[index].paymentMethod && newData[index].paymentMethod.label.toLowerCase() === 'cash'){
                                            if(amountValue>=10000){
                                                console.log('pancard needed')
                                                setShowPanCard(true)
                                                paymentsetValue('showPanCard',true)
                                            }else if(showPanCard){
                                                setShowPanCard(false)
                                                paymentsetValue('showPanCard',false)
                                            }
                                        }
                                        setPaymentTableData(newData)
                                        }
                                    },
                                    })}}
                                    error={paymentErrors.paymentDetails?.[index]?.amount}
                                    control={paymentcontrol}
                                />
                            
                    </Grid>
                    {/* { "referrenceNo" in  item ? ( */}
                    { paymentDetails[index].type && paymentDetails[index].type.label !== 'Cash' ? (
                    <Grid item lg={3} sm={3} sx={{marginY:'0.5rem'}}>
                            <InputField
                            // type="number"
                            name={`paymentDetails[${index}].referrenceNo`}
                            error={paymentErrors.paymentDetails?.[index]?.referrenceNo}
                            control={paymentcontrol}
                            label="Referrence Number"
                            inputRef={{...paymentregister(`paymentDetails[${index}].referrenceNo`,{
                                    
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
                                deleteTableRow(index,paymentDetails[index].type )
                            }
                            }
                        />
                        )}
                        {paymentTableData.length - 1 === index && (
                        <AddOutlinedIcon
                            className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                            onClick={addToPaymentArr}
                        />
                        )}
                    </div>
                    </Grid>
                </Grid>
                    )})}
                            <Grid container spacing={2}>
                                
                    {
                        showPanCard ? (
                                <Grid item lg={4} sm={4} sx={{marginY:'0.5rem'}}>
                                <InputField
                                    name='panNumber'
                                    error={paymentErrors.panNumber}
                                    control={paymentcontrol}
                                    label="Pan Number"
                                />
                                </Grid>
                        ):''
                    }
                                <Grid item lg={6} sm={8} sx={{marginY:'0.5rem'}}>
                                <InputField
                                    name='remarks'
                                    error={paymentErrors.remarks}
                                    control={paymentcontrol}
                                    label="Remarks"
                                />
                                </Grid>
                            </Grid>
                
                        </>)
                        :''
                    }
                    
                    <Grid container spacing={1} >
                        
                        <Grid item lg={6.5} sm={3.5}></Grid>
                        <Grid item lg={3} sm={4} className='flex justify-end lg:text-lg text-base text-right font-semibold'>
                            <p className='mt-2 text-right text-base w-fit'>Amount Payable :  </p>
                        </Grid>
                        <Grid item lg={2} sm={4} >
                            <fieldset disabled={true}>
                                <InputField
                                    sx={{width:'10rem',marginLeft:'0.5rem',}}
                                    variant="outlined"
                                    // disabled={true}
                                    inputProps={{ readOnly: true }}
                                    name="payingTotal"
                                    label=""
                                    error={paymentErrors.payingTotal}
                                    control={paymentcontrol}
                                />
                            </fieldset>
                        </Grid>
                    </Grid>
                    {paymentErrors.payingTotal && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{paymentErrors.payingTotal.message}</p>}
                    
                </div>  
            </fieldset>
            <div className='w-full flex justify-end my-4'>
                <Button
                        type="submit"
                        variant="contained"
                        color="success"            
                    >
                                Pay Now
                </Button> 
            </div>
        </form>
        {/* Paynow */}
        <ConfirmationModal
            confirmationOpen={openPayNow}
            confirmationHandleClose={handleClosePayNow}
            confirmationSubmitFunc={()=>{
                handleClosePayNow()
                console.log("final Payment",finalData)
                mutate(finalData, {onSuccess: (data, variables, context) => {
                    successAlert(data.data.message)
                    paymentsetValue(`payingTotal`,0)
                    handleClosePayment()
                    callTableDataApi(visitId)
                },
                onError:(data)=>{
                    errorAlert(data.message)
                }});
                
            }}
            confirmationLabel="Confirmation "
            confirmationMsg="Save Payment Details ?"
            confirmationButtonMsg="Submit"
        />
        </Box>
    </Modal>
        )
    }