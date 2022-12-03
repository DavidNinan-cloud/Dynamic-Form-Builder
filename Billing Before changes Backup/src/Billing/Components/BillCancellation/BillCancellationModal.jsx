import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import React from "react";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm } from "react-hook-form";
// import useDidMountEffect from "../Common Components/Custom Hooks/useDidMountEffect";
import { useState } from "react";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import { saveCancelDetails } from "../../services/BillingCancellation/BillingCancellation";
import { errorAlert, successAlert } from "../../../Common Components/Toasts/Toasts";
import { useEffect } from "react";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function BillCancellationModal({
    fetchNewList,
    billId,
    cancelReasonTypes,
    open,
    handleClose
}){
    const [ openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }   

    
    let Schema =  yup.object().shape({
        cancelType:  yup.object().nullable().shape({
            value: yup.string().required("Please Mention Your Cancellation Reason"),
            label: yup.string().required("Please Mention Your Cancellation Reason")
        }).required("Please Mention Your Cancellation Reason"),
        
      }).required();
    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(Schema),
        defaultValues:{
            other:'',
            cancelType:''
        } 
    });
    const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;

    const { isLoading, isError, error, isSuccess, mutate } = useMutation(saveCancelDetails);

    const selectedReason = watch("cancelType")
    const [showOther,setShowOther] = useState(false)
    const [finalData,setFinalData] = useState(null)
    const [reasonInstruction,setReasonInstruction] = useState(null)
    const [openBackdrop,setOpenBackdrop] = useState(false)
    useDidMountEffect(()=>{
        if(selectedReason && selectedReason.label.toLowerCase() == 'other'){
            setShowOther(true)
        }else{ 
            if(selectedReason.instruction){
                setReasonInstruction(selectedReason.instruction)
            }else if(reasonInstruction !== null){
                    setReasonInstruction(selectedReason.instruction)
                }
            console.log("selectedReason",selectedReason)
            if(showOther){
            setShowOther(false)
            }
    }
    },[selectedReason])

    const onSubmit = (data) =>{
        let finalObj = {
            "billId" : billId,
            'cancellationReason' : {id : Number(data.cancelType.value)}
        }
        if(showOther){
            finalObj.reason = data.other
        }
        setFinalData(finalObj)
        handleOpenModal()
    }

    const submitDataApit = () => {
        setOpenBackdrop(true)
        mutate(finalData, {onSuccess: (data, variables, context) => {
            successAlert(data.data.message)
            // resetForm()
            fetchNewList()      
            handleCloseModal()
            handleClose()
            setOpenBackdrop(false)
            // navigate(`/appointment/appointmentlist` )
          },
          onError:(data)=>{
            errorAlert(data.message)    
            handleCloseModal()
            setOpenBackdrop(false)    
        }});
    }

    useEffect(()=>{
        if(open){
        reset()
        }
    },[open])
    return(
        <>
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
                            <h1 className='text-xl font-semibold mr-2'>Cancel Bill</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>

                    <form onSubmit={handleSubmit(onSubmit)} className='py-1 lg:px-[4%]'>
                        <Grid container spacing={1} className="w-full mx-auto space-y-3">
                            <Grid item lg={4} md={4} sx={{marginY:'0.6rem'}}>
                                <DropdownField 
                                        control={control} error={errors.cancelType}
                                        name='cancelType' dataArray={cancelReasonTypes} 
                                        placeholder="Cancellation Reason"
                                        isSearchable={false}
                                />
                            </Grid>
                            {
                                showOther ? (
                                    <Grid item lg={4} md={4} sx={{marginY:'0.6rem'}}>
                                        <InputField
                                                        name="other"
                                                        label="Other Reason"
                                                        error={errors.other}
                                                        control={control}
                                            />
                                    </Grid> 
                                ):''
                            }
                            <Grid item lg={6} md={6} >
                                    <p className="text-sm font-semibold tracking-wide mx-4 my-4">{reasonInstruction  ? reasonInstruction: ''}
                                    </p>
                            </Grid> 
                        </Grid>
                    <div className='flex justify-end w-full my-4 space-x-4'>
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                                onClick={handleClose}
                                
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                            >
                                Submit
                            </Button>
                    </div> 
                    </form>
                </div>
            </Box>
        </Modal>

        <ConfirmationModal
                  confirmationOpen={openModal}
                  confirmationHandleClose={handleCloseModal}
                  confirmationSubmitFunc={()=>{
                    handleCloseModal()
                    submitDataApit()
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Confirm Bill Cancel?"
                confirmationButtonMsg="Cancel Bill"
            />

            
      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
        </>)
}