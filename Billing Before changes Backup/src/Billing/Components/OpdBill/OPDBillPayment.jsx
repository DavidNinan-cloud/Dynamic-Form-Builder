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
import LoadingSpinner from '../../../Common Components/loadingspinner/loadingSpinner';


export default function OPDBillPayment ({
    TableData,setPaymentErrorsState,
    showPayNow, setShowPayNow,incomingTableData,defaultPaymentType,
    paymentTypes, payableTotal, paymentTableData, setPaymentTableData, onSubmitPayment, advanceAvailable, setFilterdPaymentTypes, filterdPaymentTypes, showPanCard,
    setShowPanCard, showPaymentArr, setShowPaymentArr
})
{
    let paymentSchema = {

        paymentDetails: yup.array().when('showPaymentArr',(showPaymentArrValue)=>{
            if(showPaymentArrValue){
                return yup.array()
                .of(
                  yup.object().shape({
                    amount: yup.number().typeError('You Must Specify A Number').min(0, 'Min value 0.').required("Please Add This Field"),
          
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
        payingTotal: yup.number().typeError('you must specify a number').max(payableTotal, `Cannot Exceed ${payableTotal} Rupees`)
    
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

    const [loadingArray, showLoadingArray] = React.useState(false);
    useEffect(()=>{
        if(payingTotal>0){
            setShowPayNow(true)
        }else{
            setShowPayNow(false)
        }
    },[payingTotal]) 


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
    
    useEffect(()=>{
        let gotPaymentTypes = [...paymentTypes]
        let newData = [...paymentTableData];
        console.log('gotPaymentTypes obj',gotPaymentTypes)
        let obj = gotPaymentTypes.find(o => o.default === true);
        console.log('default obj',obj)
        newData[0].paymentMethod =  obj;
        setPaymentTableData(newData)
        paymentsetValue(`paymentDetails[${0}].type`,obj)
        PaymentTypeResultFirstTime(gotPaymentTypes,obj)
    },[paymentTypes])
    const PaymentTypeResultFirstTime = (allPaymentTypes,cashObj) =>{
        let object = []
        object.push(cashObj)
        let uniqueResultOne = allPaymentTypes.filter(function(obj) {
            return !object.some(function(obj2) {
                return obj == obj2;
            });
        });
    
        setFilterdPaymentTypes(uniqueResultOne)
    }
    
    // useDidMountEffect(()=>{
    //     PaymentTypeResult(paymentTypes)
    // },[paymentDetails])
    const PaymentTypeResult = (allPaymentTypes) =>{
        let object = []
        let arr = [...paymentDetails]
        for (let i = 0; i< arr.length;i++){
            let innerObj = arr[i].type;
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
    useEffect(()=>{
        console.log('payingTotal',payingTotal)
        if(payingTotal>payableTotal){
            paymentsetError('payingTotal', { type: 'custom', message: 'Amount exceeds current bill total' });
        }else{
            paymentclearErrors('payingTotal')
        }
    },[payingTotal,payableTotal])

    // total posible to pay changes
    useEffect(()=>{
        console.log('payableTotal',payableTotal)
        paymentsetValue("payableTotal",payableTotal)
    },[payableTotal])



    // setting values onChange true/false - 
    useEffect(()=>{
        if(consumeAdvance){
            if(advanceAvailable < payableTotal){
                paymentsetValue("amountToConsume",advanceAvailable)
            }else {
                paymentsetValue("amountToConsume",payableTotal)
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
        if(consumeAMT==payableTotal && consumeAdvance){
            paymentclearErrors('payingTotal')
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
        if(consumeAMT !== payableTotal ){
            for(let val of paymentTableData){
                totalPayment = totalPayment + Number(val.amount)
            }
        }
        console.log("totalPayment now",totalPayment)
        paymentsetValue("payingTotal",totalPayment)
    },[paymentTableData,consumeAMT,consumeAdvance])

    useDidMountEffect(()=>{
        paymentsetValue("advanceAvailableField",advanceAvailable)
    },[advanceAvailable])
    useEffect(()=>{
        console.log('paymentErrors',paymentErrors)
        setPaymentErrorsState(paymentErrors)
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

    const paymentresetFunc = () => {
        paymentreset()
    // defaultPaymentType
        let arr = [];
        let obj = defaultPaymentType

        let tableObj = {
            paymentMethod : obj,
            amount : 0
        }
        // newData[0].paymentMethod =  obj;
        // newData[0].amount =  0;
        arr.push(tableObj)
        console.log("reset arr",arr)
        setPaymentTableData(arr)
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

    useDidMountEffect(()=>{
        console.log("paymentDetails reset",paymentDetails)
        if(TableData.length == 0 ){
            paymentresetFunc()
            console.log("paymentDetails",paymentDetails)
        }
    },[TableData])


    const deleteTableRow = (index,rowPaymentType) => {

        paymentRemove(index)
        
        if(index !== paymentDetails.length-1){
            for(let i=index;i<paymentTableData.length-1;i++){
                // console.log("paymentDetails[i + 1].type",paymentDetails[i + 1].type)
                paymentsetValue(`paymentDetails[${i}].type`,paymentDetails[i + 1].type)
                paymentsetValue(`paymentDetails[${i}].amount`,paymentDetails[i + 1].amount)
                if("referrenceNo" in paymentTableData[i+1]){
                    console.log("refNo +1",paymentTableData[i+1].referrenceNo)
                    if(paymentTableData[i+1].referrenceNo!== ""){
                        paymentsetValue(`paymentDetails[${i}].referrenceNo`,paymentTableData[i+1].referrenceNo)
                    }else{
                        paymentsetValue(`paymentDetails[${i}].referrenceNo`,"")
                    }
                }else{
                    RemoveRefferenceNo(i, paymentDetails[i + 1].type)
                }
            }
        }
        
        let paymentFiltered = [...filterdPaymentTypes]
        paymentFiltered.push(rowPaymentType)
        setFilterdPaymentTypes(paymentFiltered)
        deleteRowPayment(index)
    }
    
    const deleteRowPayment = (index) => {
        let newTemplateData = [...paymentTableData];
        
        newTemplateData.splice(index, 1);
        setPaymentTableData(newTemplateData)
        
        showLoadingArray(false)
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
                if(obj.type){
                    let type = obj.type.label
                    if(type == "Cash"){
                        usedTypes.push(type)
                    }
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
    <>
    { 
        TableData.length == 0 ?  '':(
        <>
    <form id='paymentForm' onSubmit={paymenthandleSubmit(onSubmitPayment)}>
        
        {/* Advance Info */}
        { advanceAvailable > 0 ?
                (
        <fieldset className='mx-auto border w-full rounded-xl my-1'>
            <legend className='ml-6  rounded-xl'>
                <p className="font-semibold tracking-wide mx-4">Advance Available 
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
                <p className="font-semibold tracking-wide mx-4">Payment Details 
                </p>
            </legend>
            <div className="mb-2 w-[96%] mx-auto border-t p-2" >
                
        { showPaymentArr ? (
                <>
                    {paymentTableData.map((row, index) =>{
                // console.log("item",item)
                return(
            <Grid container spacing={2} key={row.id}>
                
                <Grid item lg={3} sm={4} sx={{marginY:'0.5rem'}}>
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
                                    if(e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value > 0  )
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
                {/* { "referrenceNo" in  row ? ( */}
                <>{console.log(`paymentDetails[${index}]`,paymentDetails[index])}</>
                { paymentDetails &&  paymentDetails[index].type && paymentDetails[index].type.label !== 'Cash' ? (
                <Grid item lg={3} sm={3} sx={{marginY:'0.5rem'}}>
                        <InputField
                        // type="number"
                        name={`paymentDetails[${index}].referrenceNo`}
                        error={paymentErrors.paymentDetails?.[index]?.referrenceNo}
                        control={paymentcontrol}
                        label="Reference  Number"
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
                </Grid>):''}
                
                        <Grid item md={2} sm={2} sx={{marginY:'0.5rem'}}>
                        <div className="flex">
                            {paymentTableData.length !== 1 && (
                            <RemoveOutlinedIcon
                                className="mt-2 rounded-full border-2 border-red-600"
                                onClick={() => {
                                    // showLoadingArray(true)
                                    deleteTableRow(index,paymentDetails[index].type)
                                }
                                }
                            />
                            )}

                            {/* {
                                    paymentTableData.length !== paymentTypes.length ? ( */}

                            <>
                            {paymentTableData.length - 1 === index && (
                            <AddOutlinedIcon
                                className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                                onClick={addToPaymentArr}
                            />
                            )}
                            </>
                             {/* ) : ''  */}
                             {/* } */}
                        </div>
                        </Grid>
            </Grid>
                )})}
                </>
        )
        :''
        }
                { showPayNow ? (
                        <Grid container spacing={2}>
                            
                {
                    showPanCard && showPaymentArr ? (
                            <Grid item lg={3} sm={4} sx={{marginY:'0.5rem'}}>
                            <InputField
                                name='panNumber'
                                error={paymentErrors.panNumber}
                                control={paymentcontrol}
                                label="Pan Number"
                            />
                            </Grid>
                    ):''
                }
                            <Grid item lg={!showPanCard ? 7:4} sm={6} sx={{marginY:'0.5rem'}}>
                            <InputField
                                name='remarks'
                                error={paymentErrors.remarks}
                                control={paymentcontrol}
                                label="Remarks"
                            />
                            </Grid>
                {/* // {
                //     !showPanCard ? (
                //             <Grid item lg={3.5} sm={4} sx={{marginY:'0.5rem'}}>
                //             </Grid>
                //     ):''
                // } */}
                            <Grid item lg={1} sm={2} sx={{marginY:'0.5rem',paddingRight:'0.5rem'}}>
                                { showPayNow ? (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={()=>{
                                            paymentresetFunc()
                                        }}              
                                    >
                                        Clear
                                    </Button>):''} 
                            </Grid>

                            <Grid item lg={1.5} sm={4} className='flex text-right font-semibold' sx={{marginY:'0.5rem'}}>
                                <p className='mt-2 text-right'>Amount Payable :  </p>
                            </Grid>
                            <Grid item lg={2} sm={4} sx={{marginY:'0.5rem'}}>
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
                    ):""
                }
                   
                <div>
                    </div> 
                {paymentErrors.payingTotal && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{paymentErrors.payingTotal.message}</p>}
                  
            </div>  
        </fieldset>

        {/* <button onClick={()=>{console.log("paymentTableData",paymentTableData)}}>

        </button> */}
    </form>
        </>
        )
    }
    
    </>
    )
}