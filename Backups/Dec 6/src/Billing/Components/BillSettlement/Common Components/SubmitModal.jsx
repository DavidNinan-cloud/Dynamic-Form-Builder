import React from "react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPaymentTypes } from "../../../services/BillSettlement/BillSettlementServices";
import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function SubmitModal ({
    open,
    handleClose,
    fnModalSubmit,
    isSelfSettlement,
    netPayAmount
    }){
    // const {
    //     getFieldState,
    //     clearErrors,
    //     trigger,
    //     register,
    //     control,
    //     formState: { errors },
    //     watch,
    //     setValue,
    //   } = useFormContext();

    let schema =  yup.object().shape({

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

        payingTotal : yup.number().typeError('You Must Specify A Number').min(netPayAmount, `Minimum value ${netPayAmount}.`).max(netPayAmount, `Maximum value ${netPayAmount}.`).required("Required"),

        panNumber: yup.string().when("showPanCard", (showPanCard) => {
            if (showPanCard) {
              return yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/,"Please Provide Valid Pan No. ").min(10, "Please Provide Valid Pan No.").max(10, "Please Provide Valid Pan No.").required("Please Provide Valid Pan No.")
          }
          }),

      }).required();
      const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues:{
            panNumber:'',
            showPanCard:false,
            reason:'',
            other:'',
            cancelType:'',
            paidAmount:0,
            paymentDetails:[
                {
                    type:"", amount: "", referrenceNo:""
                }
            ],
            refund:[ {amount:0,maxAmount:0}],
            payingTotal:0
        } 
    });
    const {getFieldState, clearErrors ,register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;
    
      const { fields, append, remove } = useFieldArray({
        control:control,
        name: "paymentDetails",
      });
    let showPanCard = watch("showPanCard");
    let paymentDetails = watch("paymentDetails");

    const [paymentTypes, setPaymentTypes] = useState([])
    const [verfiedFilteredPayments,setVerfiedFilteredPayments] = useState([])

    useEffect(()=>{
        getPaymentTypes()
        .then(response=>response.data)
        .then(res=>{
            console.log("PaymentTypes",res.result) 
            setPaymentTypes(res.result)
            let gotPaymentTypes = res.result
            let obj = gotPaymentTypes.find(o => o.default === true);
            setValue(`paymentDetails[${0}].type`,obj)
            let tableArr = [...paymentDetails]
            let usedTypes = [obj]
            let paymentTypesArr = [...gotPaymentTypes]
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
        })
      },[])

    useEffect(()=>{
        let tableArr = [...paymentDetails]
        let usedTypes = []
        let payingTotalAmt = 0
        for ( let obj of tableArr){
            let amountIs = Number(obj.amount)
            if(obj.amount !== '' && obj.amount !== undefined && typeof amountIs == 'number' ){
                payingTotalAmt = payingTotalAmt + Number(obj.amount)
            }
            if(obj.type){
                let type = obj.type.label
                if(type == "Cash"){
                    usedTypes.push(type)
                }
            }
        }
        console.log('payingTotalAmt',payingTotalAmt)
        setValue('payingTotal',payingTotalAmt)
        let paymentTypesArr = [...paymentTypes]
        let typesArr = []

        for (let obj of paymentTypesArr){
            if(obj.amount !== ''){
                payingTotalAmt = payingTotalAmt + obj.amount
            }

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

        settypeArrFunc()
    },[paymentDetails])

    const PaymentTotalFunc = () => {
        let arr = [paymentDetails]
    }
    const validData = useRef(true)
    const addToPaymentArr = () => {
        let paymentRef
        validData.current = true
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
        } else {
            console.log("should not add to arr",validData.current)
            trigger(["paymentDetails"])
        }
    }
    const deleteTableRow = (index) => {

      remove(index)

      if(index !== paymentDetails.length-1){
          for(let i=index;i<paymentDetails.length-1;i++){
          setValue(`paymentDetails[${i}].type`,paymentDetails[i + 1].type)
          setValue(`paymentDetails[${i}].amount`,paymentDetails[i + 1].amount)

          if(paymentDetails[i+1].type && paymentDetails[i+1].type.label !== "Cash"){
              setValue(`paymentDetails[${i}].referrenceNo`,paymentDetails[i+1].referrenceNo)
          }else{
              setValue(`paymentDetails[${i}].referrenceNo`,"")
          }
          }
        }
    }
    useEffect(()=>{
        console.log("changes")
    },[fields])

    
    const fieldState = getFieldState("payingTotal");
    const setpayablevalue = () => {
        
        let tableArr = [...paymentDetails]
        let payingTotalAmt = 0
        for ( let obj of tableArr){
            let amountIs = Number(obj.amount)
            if(obj.amount !== '' && obj.amount !== undefined && typeof amountIs == 'number' ){
                payingTotalAmt = payingTotalAmt + Number(obj.amount)
            }
        }
        console.log('payingTotalAmt',payingTotalAmt)
        setValue('payingTotal',payingTotalAmt)

        if(fieldState.error){
            console.log("fieldState",fieldState.error.ref.value)
            let value = fieldState.error.ref.value
            if(payingTotalAmt == value){
                clearErrors('payingTotal')
            }
        }
    }

    const [typeArr,setTypeArr] = useState([])
    const settypeArrFunc = () =>{
        let tableArr = [...paymentDetails]
        let payingArr = []
        for ( let obj of tableArr){
            if(obj.type !== '' && obj.type !== undefined ){
                payingArr.push(obj.type)
            }
        }
        console.log("payingArr",payingArr)
        setTypeArr(payingArr)
        
    }

    const [ openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }   

    const [openBackdrop,setOpenBackdrop] = useState(false)

    useEffect(()=>{
        console.log('pay errors',errors)
    },[errors])
    
    useEffect(()=>{
        fnShouldShowPanCard()
    },[paymentDetails])
    
    const fnShouldShowPanCard = () => {
        let arr = [...paymentDetails]
        for (let item of arr){
            if(item.type){
                if(item.type.label == 'Cash'){
                    if(isSelfSettlement){
                        if(Number(item.amount) >= 10000 ){
                            setValue('showPanCard',true)
                        }else{
                            setValue('showPanCard',false)
                        }
                    }
                }
            }
        }
    }
    return(        <>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '80%',
                    height: 'auto',
                    minHeight: '30%',
                    bgcolor: 'background.paper',
                    overflow:'visible',
                    borderRadius: "0.7rem",
                    boxShadow: 24,
                    paddingX: 4,
                    paddingBottom: 4,
                    paddingBottom: 4,
                }}
                    className="">
                <div className=''>
                    <div className="flex py-4 mt-3 mb-6 justfy-between w-full mx-auto border-b">
                        <div className="w-full flex ">
                            <h1 className='text-xl font-semibold mr-2'>{isSelfSettlement ? 'Self Settlement' : 'Company Settlement'}</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>
    <div className="w-full flex ">
            <h1 className=' font-semibold mr-2'> Net Payable Amount : {netPayAmount}</h1> 
    </div>
    <form onSubmit={handleSubmit(fnModalSubmit)}  >
        <div>
            {fields.map((item, index) =>{
                                    return(
                                        <Grid container spacing={2} key={item.id}>
                                            
                                            <Grid item lg={3} sm={4} sx={{marginY:'0.5rem'}}>
                                                <DropdownField 
                                                    control={control} error={errors.paymentDetails?.[index]?.type}
                                                    name={`paymentDetails[${index}].type`} dataArray={verfiedFilteredPayments} isSearchable={false}
                                                    placeholder="Payment Type *"                                                    
                                                    inputRef={{...register(`paymentDetails[${index}].type`,
                                                    {       onChange: (e) => {
                                                                settypeArrFunc()
                                                                fnShouldShowPanCard()
                                                            },
                                                    })}}
                                                />
                                            </Grid>
                                            <Grid item lg={2} sm={3} sx={{marginY:'0.5rem'}}>
                                                <InputField
                                                    name={`paymentDetails[${index}].amount`}
                                                    variant="outlined"
                                                    label="Amount *"
                                                    error={errors.paymentDetails?.[index]?.amount}
                                                    control={control}
                                                    
                                                    inputRef={{...register(`paymentDetails[${index}].amount`,
                                                    {       onChange: (e) => {
                                                                setpayablevalue()
                                                                fnShouldShowPanCard()
                                                            },
                                                    })}}
                                                />  
                                            </Grid>
                                            {/* { "referrenceNo" in  item ? ( */}
                                            { typeArr[index] && typeArr[index].label !== 'Cash' ? (
                                            <Grid item lg={3} sm={3} sx={{marginY:'0.5rem'}}>
                                                <InputField
                                                    // type="number"
                                                    name={`paymentDetails[${index}].referrenceNo`}
                                                    error={errors.paymentDetails?.[index]?.referrenceNo}
                                                    control={control}
                                                    label="Referrence Number *"
                                                />
                                            </Grid>):""}

                                        
                                                <Grid item md={2} sm={2} sx={{marginY:'0.5rem'}}>
                                                    <div className="flex">
                                                        {paymentDetails.length !== 1 && (
                                                        <RemoveOutlinedIcon
                                                            className="mt-2 rounded-full border-2 border-red-600"
                                                            onClick={() => {
                                                                deleteTableRow(index)
                                                            }
                                                            }
                                                        />
                                                        )}
                                                        
                                                        {paymentDetails.length - 1 === index && (
                                                        <AddOutlinedIcon
                                                            className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                                                            onClick={addToPaymentArr}
                                                        />
                                                        )}
                                                    </div>
                                                    </Grid>
                                            
                                        </Grid>
            )})}
            <div className="flex justify-end">
                            <div>
                                <p className='mt-2 text-right'>Amount Payable :  </p>
                            </div>
                            <div item lg={2} sm={4} sx={{marginY:'0.5rem'}}>
                                <fieldset disabled={true}>
                                    <InputField
                                        sx={{width:'10rem',marginLeft:'0.5rem',}}
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                        name="payingTotal"
                                        label=""
                                        error={errors.payingTotal}
                                        control={control}
                                    />
                                </fieldset>
                            </div>
            </div>
            {errors.payingTotal && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.payingTotal.message}</p>}
        </div>

        <div className="w-full flex justify-between mt-3">
            <div>
                {
                    showPanCard ? (
                        <InputField
                            name='panNumber'
                            variant="outlined"
                            label="Pan Number *"
                            error={errors.panNumber}
                            control={control}
                        />  
                    ):''
                }
                
            </div>
            <Button color="success" variant="contained" type='submit'>
                Submit
            </Button>

        </div>
    </form>
        </div>
            </Box>
        </Modal>


        </>
    )
}

