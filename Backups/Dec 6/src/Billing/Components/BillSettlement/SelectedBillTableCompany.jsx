import React from 'react'
import { Box, Button, Divider, Grid, Modal, Tooltip } from "@mui/material";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InputField from '../../../Common Components/FormFields/InputField';
import SubmitModal from './Common Components/SubmitModal';
import ConfirmationModal from '../../../Common Components/ConfirmationModal';
import CommonBackDrop from '../../../Common Components/CommonBackDrop/CommonBackDrop';
import { getPaymentTypes, saveSettlementDetails } from '../../services/BillSettlement/BillSettlementServices';
import { useMutation } from '@tanstack/react-query';


export default function SelectedBillTableCompany({
  ledgerData,
  selectedCompany,
  isSelfSettlement, 
  postApiCall,   
  setPostApiCall,
  unitId}) {
    const [showMin,setShowMin] = useState(0)
    let schema = yup.object().shape({
      tdsAmount: yup.number('Invalid').typeError('Invalid')
      // .string("string").matches(/^[0-9]+$/, "Invalid")
      .min(0, "required").max(ledgerData.totalSelfBalance, "Invalid").required("required"),

      concessionAmt: yup.number('Invalid').typeError('Invalid')
            // .string("string").matches(/^[0-9]+$/, "Invalid")
            .min(0, "required").max(ledgerData.totalSelfBalance, "Invalid").required("required"),

      netSettlementAmount: yup.number('Invalid').typeError('Invalid')
            // .string("string").matches(/^[0-9]+$/, "Invalid")
            .min(0, "Invalid").required("required"),
      
      
      // netPayAmount: yup.number('Invalid').typeError('Invalid')
      //       // .string("string").matches(/^[0-9]+$/, "Invalid")
      //       .required("required")
      //       .min(1, "required").max(yup.ref('netSettlementAmount'), "invalid"),

      netPayAmount: yup.number('Invalid').typeError('Invalid')
            .required("required")
            .min(1, "required").when("multipleBill", (multipleBill) => {
              if (multipleBill) {
                  return yup.number().typeError('Invalid')
                  .min(yup.ref('netSettlementAmount'), `minimum ${showMin}`).max(yup.ref('netSettlementAmount'), `maximum ${showMin}`)
                  .required("required")
              }else{
                return yup.number().typeError('Invalid')
                  .min(1, "invalid").max(yup.ref('netSettlementAmount'), "invalid")
                  .required("required")
              }
          }),

  }).required();

    const headers = ['Bill Amount','Company Balance','TDS Amount','Concession %', 'Concession Amount', 'Net Settlement Amount', 'Net Pay Amount', 'Net Company Balance']

    const methods = useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues:{
          tdsAmount:0,
          concessionAmt:0,
          concessionPercent:0,
          netSettlementAmount:0,
          netPayAmount:0,
          netSelfBalance:0,
          multipleBill:false
      } 
  });
  const {clearErrors, register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;
  
  const { isLoading, isError, error, isSuccess, mutate } = useMutation(saveSettlementDetails);

  const netSettlementAmount = watch('netSettlementAmount')
  useEffect(()=>{
    setShowMin(netSettlementAmount)
  },[netSettlementAmount])
  const concessionPercent = watch('concessionPercent')
  const concessionAmt = watch('concessionAmt')
  const netSelfBalance = watch('netSelfBalance')
  const netPayAmount = watch('netPayAmount')
  const tdsAmount = watch('tdsAmount')
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
      setOpen(true)
  }
  const handleClose = () => {
      setOpen(false)
  }

  const [invalidForm,setInvalidForm] = useState()
  useEffect(()=>{
    if(ledgerData.totalSelfBalance >= (Number(concessionAmt) - Number(tdsAmount))){
      setValue('netSettlementAmount',ledgerData.totalSelfBalance - Number(concessionAmt) - Number(tdsAmount), {
        shouldValidate: true,
      })
      clearErrors('netPayAmount')
    }
  },[concessionAmt,tdsAmount])
  useEffect(()=>{
    if(ledgerData !== null){
      console.log('ledgerData',ledgerData)
      setValue("multipleBill",ledgerData.multipleBill)
      setValue('tdsAmount',0)
      setValue('concessionAmt',0)
      setValue('concessionPercent',0)
      setValue('netPayAmount',0)
      setValue('netSettlementAmount',ledgerData.totalSelfBalance)
    }else{
      reset()
    }
  },[ledgerData])

  useEffect(()=>{
    if(netPayAmount <= netSettlementAmount){
      setValue('netSelfBalance',Number(netSettlementAmount) - Number(netPayAmount), {
        shouldValidate: true,
      })
    }
  },[netSettlementAmount,netPayAmount])


  const [billObj, setBillObj] = useState(null)
  const onSubmit = (data) => {
    console.log("data",data)
    setBillObj(data)
    handleOpen()
  }
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

  // billIds , selectedCompany

  const [ openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
      setOpenModal(true)
  }
  const handleCloseModal = () => {
      setOpenModal(false)
  }   

  const [openBackdrop,setOpenBackdrop] = useState(false)
  const [finalData,setFinalData] = useState(null)

  const [defaultPaymentType,setDefaultPaymentType] = useState()
  useEffect(()=>{
    getPaymentTypes()
        .then(response=>response.data)
        .then(res=>{
            let gotPaymentTypes = res.result
            let defaultCash = gotPaymentTypes.find(o => o.default === true);
            setDefaultPaymentType(defaultCash)
        })
  },[])
  const fnFullConcessionsubmit = () => {
    let postObj = {}
    // 
    postObj.tdsAmount = Number(tdsAmount)
    postObj.companyId = Number(selectedCompany)
    // 
    postObj.bill = ledgerData.billIds
    postObj.balanceAmount = ledgerData.totalBillAmount
    postObj.concessionAmount = Number(concessionAmt)
    postObj.concessionPercent = Number(concessionPercent)
    postObj.netPayAmount = Number(netPayAmount)
    postObj.netSettlementAmount = Number(netSettlementAmount)
    postObj.unit = {id :Number(unitId)}

    postObj.paymentInfoRequest = [{
        paymentType : {id : Number(defaultPaymentType.value)},
        amount: 0
    }]
    console.log('postObj',postObj)
    setFinalData(postObj)
    handleOpenModal()

  }
  const fnModalSubmit = (data) => {
    console.log('data',data)
    let postObj = {}
    // 
    postObj.tdsAmount = Number(tdsAmount)
    postObj.companyId = Number(selectedCompany)
    // 
    postObj.bill = ledgerData.billIds
    postObj.balanceAmount = ledgerData.totalBillAmount
    postObj.concessionAmount = Number(concessionAmt)
    postObj.concessionPercent = Number(concessionPercent)
    postObj.netPayAmount = Number(netPayAmount)
    postObj.netSettlementAmount = Number(netSettlementAmount)
    postObj.unit = {id :Number(unitId)}

    let DataTable = data.paymentDetails
    let TotalAmt = 0 ;
    let payments = []
    for(let i=0; i<DataTable.length;i++){
      let obj={};
      console.log("DataTable[i].type",DataTable[i].type)
      if(DataTable[i].type.label !=="Cash"){
        obj.referenceNumber = DataTable[i].referrenceNo;
      }else{
        if(data.showPanCard){
          obj.panNumber = data.panNumber
        }
      }
      obj.paymentType = { id: parseInt(DataTable[i].type.value)};
      obj.amount = Number(DataTable[i].amount);
      TotalAmt = TotalAmt + Number(DataTable[i].amount)
      payments=[...payments,obj]
    }

    postObj.paymentInfoRequest = payments
    console.log('postObj',postObj)
    setFinalData(postObj)
    handleOpenModal()
  }
  const submitDataApit = () => {
    setOpenBackdrop(true)
    mutate(finalData, {onSuccess: (data, variables, context) => {
      handleCloseModal()
      handleClose()
      setOpenBackdrop(false)
      successAlert(data.data.message)
      setPostApiCall(!postApiCall)   
      },
      onError:(data)=>{
        errorAlert(data.message)    
        handleCloseModal()
        setOpenBackdrop(false)    
    }});
  }

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}  >
        <TableContainer stickyheader={true} sx={{ marginTop: "1rem" ,position:"relative",zIndex:0}} className="rounded  border ">
            <Table
                            size="small"
                            stickyHeader
                            aria-label="sticky table">
                <TableHead>
                        <TableRow
                                sx={{
                                    "& th": {
                                    paddingY: 0.5,
                                    backgroundColor: "#F1F1F1",
                                    },
                                }}
                        >

                    {headers && headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                      >
                          <span className="text-gray-600 font-bold">
                              {header}
                          </span>
                      </TableCell>
                    ))}
                        </TableRow>
                </TableHead>
                <TableBody>
                      <TableCell className="text-gray-600 font-bold">
                            {ledgerData.totalBillAmount}
                      </TableCell>
                      <TableCell className="text-gray-600 font-bold">
                            {ledgerData.totalSelfBalance}
                      </TableCell>

                      {/* Tds amount */}
                    <TableCell>
                      <InputField
                          name="tdsAmount"
                          // label="Other Reason"
                          error={errors.tdsAmount}
                          control={control}
                          inputRef={{
                            ...register(`tdsAmount`, {
                                onChange: (e) => {
                                },
                            })
                        }}
                      />
                    </TableCell>

                      {/* Concession percent */}
                    <TableCell>
                      <InputField
                          name="concessionPercent"
                          // label="Other Reason"
                          error={errors.concessionPercent}
                          control={control}
                          inputRef={{
                            ...register(`concessionPercent`, {
                                onChange: (e) => {
                                  // if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value > 0) {
                                                                                                         
                                    let percent = e.target.value
                                    percent = Number(percent)
                                    console.log('isNaN(percent)',typeof percent)
                                    console.log('isNaN(percent)',isNaN(percent))
                                    if(!isNaN(percent)){
                                      let total = ledgerData.totalBillAmount
                                      let amount = (Number(total) * percent) / 100
                                      setValue('concessionAmt',amount, {
                                        shouldValidate: true,
                                      })
                                    }
                                },
                            })
                        }}
                      />
                    </TableCell>

                      {/* Concession Amount */}
                    <TableCell>
                      <InputField
                          name="concessionAmt"
                          // label="Other Reason"
                          error={errors.concessionAmt}
                          control={control}
                          inputRef={{
                            ...register(`concessionAmt`, {
                                onChange: (e) => {
                                  let amount = e.target.value
                                  amount = Number(amount)
                                  if(!isNaN(amount)){
                                    let total = ledgerData.totalBillAmount
                                    let percent = (amount / Number(total)) * 100
                                    setValue('concessionPercent',roundToTwo(percent), {
                                      shouldValidate: true,
                                    })
                                  }
                                },
                            })
                        }}
                      />
                    </TableCell>
                        {/* netSettlementAmount */}
                      <TableCell className="text-gray-600 font-bold">
                            {netSettlementAmount}
                      </TableCell>
                        {/* netPayAmount */}
                      <TableCell className="text-gray-600 font-bold"> 
                          <InputField
                              name="netPayAmount"
                              // label="Other Reason"
                              error={errors.netPayAmount}
                              control={control}
                              inputRef={{
                                ...register(`netPayAmount`, {
                                    onChange: (e) => {
                                      
                                    },
                                })
                            }}
                          />
                      </TableCell>
                        {/* netSelfBalance */}
                      <TableCell className="text-gray-600 font-bold">
                            {netSelfBalance}
                      </TableCell>
                </TableBody>
    
            </Table>
        </TableContainer>
        
        <span className='text-red-500 text-center w-full'>{errors.netSettlementAmount?.message}</span>    
        <div className='w-full flex justify-end mt-3'>
          {
            netSettlementAmount > 0 ?(
              <Button 
                type='submit'
                variant='contained'
                color='success'>
                        Settle Bill
              </Button>
            ):(
              <Button 
                onClick={fnFullConcessionsubmit}
                variant='contained'
                color='success'
                >
                        Settle Bill
              </Button>
              )
          }
        </div>
    </form>

    <SubmitModal 
        open={open}
        handleClose={handleClose}
        fnModalSubmit={fnModalSubmit}
        isSelfSettlement={isSelfSettlement}
        netPayAmount={netPayAmount}
    />
        <ConfirmationModal
          confirmationOpen={openModal}
          confirmationHandleClose={handleCloseModal}
          confirmationSubmitFunc={()=>{
            handleCloseModal()
            submitDataApit()
        }}
        confirmationLabel="Confirmation "
        confirmationMsg="Confirm Settlement Details?"
        confirmationButtonMsg="Settle Bill"
    />

            
      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
    </div>
  )
}