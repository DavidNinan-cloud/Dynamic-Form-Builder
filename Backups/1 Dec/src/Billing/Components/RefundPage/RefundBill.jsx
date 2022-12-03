import { useState, useEffect } from "react";
import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import RadioField from "../../../Common Components/FormFields/RadioField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    deleteAlert,
    errdeleteAlert,
    errorAlert,successAlert
  } from "../../../Common Components/Toasts/Toasts";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { autoSearchPatientRefund, fetchBillServiceDetails, fetchPatientBillRefundDetails, fetchRefundReceipt, saveRefundDetails } from "../../services/RefundServices/RefundServices";
import RefundBillListTable from './RefundBillListTable'
import ServiceListTable from './ServiceListTable'
import InputField from "../../../Common Components/FormFields/InputField";
import RefundMode from "./RefundMode";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RefundAdvance from "./RefundAdvance";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import ConfirmationModalTwoButton from "../../../Common Components/ConfirmationModalTwoButton";
import { baseUrl } from "../../http-common-reports";


export default function RefundBill({
    dataArr,
    setDataArr,
    dataResult,
    setDataResult,
    drawerOpen,
    searchString,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
    setCount,
    comingData,
    afterSubmit,
    billId,
    setBillId
}){
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

        refund: yup
        .array()
        .of(
          yup.object().shape({
            // maxAmount: yup.number().typeError('you must specify a number').min(1, 'Min value 1.').required("Please Add this field"),
    
            amount: yup.string().when("maxAmount", (maxAmount) => {
              if (maxAmount !== null) {
                    return yup.number().typeError('You Must Specify A Number').max(maxAmount, `Max value ${maxAmount}.`)
              }
            }),
      
          }),
          
        ),
        
        refundTotal: yup.number().typeError('You Must Specify A Number').min(1, `Min refund is ${1}.`).when("paidAmount", (paidAmount) => {
            if (paidAmount !== 0) {
                  return yup.number().typeError('You Must Specify A Number').min(1, `Min refund is ${1}.`).max(paidAmount, `Maximum value is ${paidAmount}.`).required("Required")
            }
          }).required("Required"),

        payingTotal : yup.string().when("refundTotal", (maxAmount) => {
            if (maxAmount !== null) {
                  return yup.number().typeError('You Must Specify A Number').min(maxAmount, `Minimum value ${maxAmount}.`).max(maxAmount, `Maximum value ${maxAmount}.`).required("Required")
            }
          }),

      }).required();

      const [openBackdrop,setOpenBackdrop] = useState(false)
    const [ open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const [serviceList, setServiceList] = useState([]) 

    
    const callServiceList = (row,index) => {
        setValue('paidAmount',row['Paid Amount'])
        console.log("row",row)
        callServiceApi(row['billId'])
        setBillId(row['billId'])
    }
    const resetServiceList = (row,index) => {
        setValue('paidAmount',0)
        console.log("row",row)
        setServiceList([])
        setBillId(null)
    }
    const callServiceApi = (rowBillId) => {
        fetchBillServiceDetails(rowBillId).then((response) => {
            console.log("response",response.data.result)
            let arr = [...response.data.result]
            let finalArr = []
            for(let obj of arr){
                obj.Refund = 0
                finalArr.push(obj)
            }
            setServiceList(finalArr)
        })
    }
    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(Schema),
        defaultValues:{
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
    const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues, clearErrors  } = methods; 
    const { isLoading, isError, error, isSuccess, mutate } = useMutation(saveRefundDetails);
    
    const refundArray = watch('refund')
    useEffect(()=>{
        if(serviceList.length > 0){
            let refundTotal = 0
            for (let obj of serviceList){
                refundTotal = refundTotal + Number(obj.Refund)
            }
            setValue('refundTotal',refundTotal)
            if(!!errors.refundTotal){
                clearErrors('refundTotal');
            }
        }
        
    },[serviceList])

    const [finalData,setFinalData] = useState(null)
    const onSubmit = (data) => {
        let finalObj = {}
        let serviceArr = [...serviceList]
        let submitService = []
        for ( let value of serviceArr){
            let obj = {
                "billInfoId":value.billInfoId,
                "refundAmount":Number(value.Refund)
            }
            submitService.push(obj)
        }
        finalObj.amount = data.refundTotal
        finalObj.refundAgainstServiceRequestDtoList = submitService
        finalObj.patientInfo = {id:Number(searchString)}
        finalObj.mobileNumber = comingData.MoblieNo
        finalObj.bill = {id:billId}
        

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
        finalObj.reason = data.reason

        console.log("finalObj",finalObj)
        setFinalData(finalObj)
        handleOpen()
    }

    const submitDataApitPrint = () => {
        setOpenBackdrop(true)
        mutate(finalData, {onSuccess: (data, variables, context) => {
            successAlert(data.data.message)
            console.log('data',data)
            let obj = data.data.result
            console.log('obj',obj)
            PrintFunc(obj.patientId,obj.refundId)
            // resetForm()
            afterSubmit()
            handleClose()
            setOpenBackdrop(false)   
            // navigate(`/appointment/appointmentlist` )
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
            // resetForm()
            afterSubmit()
            handleClose()
            setOpenBackdrop(false)   
            // navigate(`/appointment/appointmentlist` )
        },
        onError:(data)=>{
            errorAlert(data.message)
            handleClose()
            setOpenBackdrop(false)   
        }});
    }
    return(
        <>
                            
                          {/* Advance Payment History  */}
          
                            { dataArr && dataArr.result && dataArr.result.length > 0 ? (
                            <div className='mx-auto w-full my-4'>
                                
                                <p className="text-xl font-semibold tracking-wide mx-4">List of Bills
                                </p>
                                
                                <div className="px-5">
                                    {
                                        dataResult.length > 0 ? (
                                            <RefundBillListTable 
                                                drawerOpen={drawerOpen}
                                                callServiceList={callServiceList}
                                                resetServiceList={resetServiceList}
                                                patientId={searchString}
                                                tableApiFunc={fetchPatientBillRefundDetails}
                                                dataResult={dataResult}
                                                setDataResult={setDataResult}
                                                data={dataArr}
                                                page={page}
                                                setPage={setPage}
                                                rowsPerPage={rowsPerPage}
                                                setRowsPerPage={setRowsPerPage}
                                                count={count}
                                            />
                                        ) : ''
                                    }
                                </div>
                            </div>):""}
            
                            {/* serviceList */}
                            { serviceList && serviceList.length > 0 ? (
                            <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className='mx-auto w-full my-4'>
                                
                                <p className="text-xl font-semibold tracking-wide mx-4">Service List 
                                </p>
                                
                                <div className="">
                                    {
                                        dataResult.length > 0 ? (
                                            <>
                                                <ServiceListTable 
                                                    refundArray={refundArray}
                                                    drawerOpen={drawerOpen}
                                                    patientId={searchString}
                                                    serviceList={serviceList}
                                                    setServiceList={setServiceList}
                                                />
                                                <div className="w-full flex justify-end">
                                                    <span className="tracking-wide capitalize text-right font-bold mt-4">
                                                        Refund Total :
                                                    </span>
                                                    <fieldset disabled={true}>
                                                        <InputField
                                                            sx={{width:'10rem',marginLeft:'0.5rem',}}
                                                            variant="outlined"
                                                            // disabled={true}
                                                            inputProps={{ readOnly: true }}
                                                            name="refundTotal"
                                                            label=""
                                                            error={errors.refundTotal}
                                                            control={control}
                                                        />
                                                    </fieldset>
                                                </div>
                                            {errors.refundTotal && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.refundTotal.message}</p>}
                                            </>
                                        ) : ''
                                    }
                                </div>
                            </div>
                            <div className='mx-auto w-full my-4'>
                                
                            <p className="text-xl font-semibold tracking-wide mx-4">Refund Mode
                            </p>
                            
                            <div className="px-5">
                                <RefundMode 
                                />
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
                            </div>
                            </form>
                            </FormProvider>
                            ):""}
          
            
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