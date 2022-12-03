import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import RefundMode from "./RefundMode";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import { fetchRefundReceipt, saveRefundAdvanceDetails } from "../../services/RefundServices/RefundServices";
import InputField from "../../../Common Components/FormFields/InputField";
import { Grid } from "@mui/material";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { errorAlert, successAlert } from "../../../Common Components/Toasts/Toasts";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import { baseUrl } from "../../http-common-reports";
import ConfirmationModalTwoButton from "../../../Common Components/ConfirmationModalTwoButton";

export default function RefundAdvance ({searchString,setComingData,
    comingData,
    billId,
    afterSubmit}) {

        
    const [ open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
        let Schema =  yup.object().shape({

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


            payingTotal : yup.number().typeError('You Must Specify A Number').min(1, `Minimum value ${1}.`).max(comingData.cashBalance, `Maximum value ${comingData.cashBalance}.`).required("Required")
    
          }).required();
        const methods = useForm({
            mode: "onChange",
            resolver: yupResolver(Schema),
            defaultValues:{
                refundAgainst:0,
                other:'',
                reason:'',
                cancelType:'',
                paymentDetails:[
                    {
                        type:"", amount: "", referrenceNo:""
                    }
                ]
            } 
        });
        const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods; 
        const { isLoading, isError, error, isSuccess, mutate } = useMutation(saveRefundAdvanceDetails);

        const [openBackdrop,setOpenBackdrop] = useState(false)
        const [finalData,setFinalData] = useState(null)
        const onSubmit = (data) => {

        let finalObj = {}
        let DataTable = data.paymentDetails
        let TotalAmt = 0 ;
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
        finalObj.detailsRequestDto = payments
        finalObj.amount = TotalAmt
        finalObj.patientInfo = {id:Number(searchString)}
        finalObj.mobileNumber = comingData.MoblieNo
        finalObj.bill = {id:billId}
        finalObj.reason = data.reason
        console.log("final obj",finalObj)
        setFinalData(finalObj)
        handleOpen()
        }
        const submitDataApitPrint = () => {
            
            setOpenBackdrop(true)
            mutate(finalData, {onSuccess: (data, variables, context) => {
                successAlert(data.data.message)
                console.log('data',data)
                let obj = data.data.result
                let newCashBalance = obj.cashBalance
                let newDataObj = comingData
                newDataObj.cashBalance = newCashBalance
                setComingData(newDataObj)
                console.log('obj',obj)
                PrintFunc(obj.patientId,obj.refundId)
                afterSubmit()
                handleClose()
                setOpenBackdrop(false)   
            },
            onError:(data)=>{
                errorAlert(data.message)
                handleClose()
                setOpenBackdrop(false)   
            }});
        }
        
        const PrintFunc = (patientId,refundId) => {
            fetchRefundReceipt(patientId,refundId).then((response) => {
              if (response.status === 200) {
                  let w = window.innerWidth;
                  let h = window.innerHeight;
                  window.open(`${baseUrl}/generatePdf/refundReceipt?patientId=${patientId}&refundId=${refundId}`,'myWindow', `height=${h},width=${w},scrollbars=1,menubar=no'`); 
                  
                }
              })
              .catch((response) => {
                  console.log(response);
              });
        
          }
        const submitDataApit = () => {
            
            setOpenBackdrop(true)
            mutate(finalData, {onSuccess: (data, variables, context) => {
                successAlert(data.data.message)
                afterSubmit()
                handleClose()
                setOpenBackdrop(false)   
            },
            onError:(data)=>{
                errorAlert(data.message)
                handleClose()
                setOpenBackdrop(false)   
            }});
        }
    return(
        <>
        {
            comingData.cashBalance > 0 ? (
                <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="px-5 py-2">
                                        <RefundMode 
                                        />
                </div>
                <div className="px-5 ">
                <Grid container spacing={2} >
                                                    
                        <Grid item lg={5} sm={6}>
                            <InputField
                                // sx={{width:'40rem',marginLeft:'0.5rem',}}
                                variant="outlined"
                                // disabled={true}
                                // inputProps={{ readOnly: true }}
                                name="reason"
                                label="Reason"
                                error={errors.reason}
                                control={control}
                            />
                            </Grid>
                </Grid>
                </div>
                <div className="w-full flex justify-end">
                                        <SubmitButton />
                    </div>
                </form>
                </FormProvider>

            ):''
        }
        {/* <ConfirmationModal
                  confirmationOpen={open}
                  confirmationHandleClose={handleClose}
                  confirmationSubmitFunc={()=>{
                  handleClose()
                  submitDataApit()
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Save Refund Details?"
                confirmationButtonMsg="Save"
            /> */}
            <ConfirmationModalTwoButton
                  confirmationOpen={open}
                  confirmationHandleClose={handleClose}
                  firstSubmitFunc={()=>{
                    handleClose()
                    submitDataApit()
                  }}
                  firstButtonMsg="Save"
                  secondSubmitFunc={()=>{
                    handleClose()
                    submitDataApitPrint()
                  }}
                  secondButtonMsg="Save And Print"
                  confirmationLabel="Confirmation "
                  confirmationMsg="Save Refund Details?"
        />
      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
        </>
    )
}