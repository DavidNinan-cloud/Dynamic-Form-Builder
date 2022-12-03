import { Grid } from "@mui/material";
import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRef } from "react";
import { useEffect } from "react";
import { getPaymentTypes } from "../../services/RefundServices/RefundServices";
import { useState } from "react";


export default function RefundMode ({
    }){
    const {
        getFieldState,
        clearErrors,
        trigger,
        register,
        control,
        formState: { errors },
        watch,
        setValue,
      } = useFormContext();
      const { fields, append, remove } = useFieldArray({
        control:control,
        name: "paymentDetails",
      });
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
    return(
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
    )
}

