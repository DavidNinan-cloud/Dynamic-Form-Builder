import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import React from "react";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm } from "react-hook-form";
import useDidMountEffect from "../../../../../Common Components/Custom Hooks/useDidMountEffect";
import { useState } from "react";
import { useEffect } from "react";

export default function SchedualingModal({
    indexArr,
    allTimeArr,
    availableTime,
    open,
    handleClose,
    onSubmit
}){
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(schema),
        defaultValues:{
            fromTime:'',
            toTime:'',
        } 
    });
    const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;

    const [toTimeArr,setToTimeArr] = useState([])
    let fromTime = watch('fromTime')

    useEffect(()=>{
        if(open){
            reset()
        }
    },[open])
    useDidMountEffect(()=>{
        if(fromTime){
            let all = [...allTimeArr]
            let arr = []
            for (let timeSlot of all){
                console.log('timeSlot',timeSlot)
                if(!timeSlot.isBooked && timeSlot.timeHour > fromTime.timeHour){
                    // let obj = {
                    //     value:timeSlot.timeslotId,
                    //     label:timeSlot.timeDisplay
                    // }
                    arr.push(timeSlot)
                }
            }
            setToTimeArr(arr)
        }
    },[fromTime])
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
                    minWidth: {lg:'30%',md:'60%'},
                    maxWidth: '30%',
                    height: 'auto',
                    minHeight: '30%',
                    bgcolor: 'background.paper',
                    overflow:'hidden',
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
                            <h1 className='text-xl font-semibold mr-2'>Book Slot</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>

                    <form onSubmit={handleSubmit(onSubmit)} className='py-1 md:py-0 top-0  mx-auto lg:px-[4%] px-[0%] w-[96%]'>
                        <Grid container spacing={1} className="w-full mx-auto space-y-3">
                            <Grid item lg={10} md={10} sx={{marginY:'0.6rem'}}>
                                <DropdownField 
                                        control={control} error={errors.fromTime}
                                        name='fromTime' dataArray={availableTime} 
                                        placeholder="From Time"
                                />
                            </Grid>
                            <Grid item lg={1} md={1}>
                            </Grid>

                            <Grid item lg={1} md={1}>
                            </Grid>
                            <Grid item lg={10} md={10} >
                                <DropdownField 
                                        control={control} error={errors.toTime}
                                        name='toTime' dataArray={toTimeArr} 
                                        placeholder="To Time"
                                />
                                {/* <InputField
                                                name="remarks"
                                                label="Remarks"
                                                error={errors.remarks}
                                                control={control}
                                    /> */}
                            </Grid> 
                            <Grid item lg={1} md={1}>
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
        </>)
}