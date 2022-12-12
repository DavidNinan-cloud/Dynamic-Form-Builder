import React from 'react'
import { useEffect, useState } from "react";
import {Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton } from '@mui/material'

import {Edit, CalendarMonthOutlined} from '@mui/icons-material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

import { useForm, Controller } from "react-hook-form";
import InputField from '../../../Common Components/FormFieldsDavid/InputField';
// const [apDate, setApDate] = useState("");
  
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';

import {getTimeSlotsApi} from '../../services/AppointmentPageServices/AppointmentListServices'

import {cancelAppointment} from '../../services/AppointmentPageServices/AppointmentListServices'

import { useQuery, useMutation } from "@tanstack/react-query";

import { successAlert, errorAlert } from '../../../Common Components/Toasts/CustomToasts'

  let initialSchema = {

    reason: yup
        .string()
        .required("Please Mention Your reason for Cancellation"),
  
    };
    const defaultValues = 
    {
      reason:"",
    }
export default function CancelAppointment({
    openCancel,
setOpenCancel,
    handelOpenCancel,
handleCloseCancel,
AppointmentId,
callTableDataApi
}) {

    
    const AppointValidation = yup.object().shape(
      initialSchema
      ).required();
    const schema = AppointValidation
        const methods = useForm({
            mode: "onChange",
            resolver: yupResolver(schema),
            defaultValues, 
          });
        const {watch, trigger, register, handleSubmit, reset,formState:{errors}, control, setValue, clearErrors  } = methods;
        
        const submitForm = (data) => {
            console.log("data",data)
            console.log("AppointmentId",AppointmentId)
            let appointmentId=AppointmentId
            let reason=data.reason
            console.log("reason",reason)
            cancelAppointment(appointmentId,reason)
              .then(response=>response.data)
              .then(res=>{
                successAlert(res.message)
                console.log("Cancelled Appointment",res)
                handleCloseCancel()
                callTableDataApi()
              }).catch((response) => {
                {errorAlert(response.message)}
                console.log("Cancelled Appointment Failed",response);
              });
          };

          useEffect(() => {
            clearErrors();
        }, []);
        
  return (
    <>
        <Modal
                open={openCancel}
                onClose={handleCloseCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
    <Box sx={{position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '60%',
              maxWidth: '70%',
              height: 'auto',
              minHeight: '30%',
              bgcolor: 'background.paper',
              overflow:'hidden',
              borderRadius: "0.7rem",
              boxShadow: 24,
              p: 4,}}>
<div className=''>
    <div className="flex py-4 mt-3 mb-6 space-x-10 w-full mx-auto border-b">
        <div className="w-full flex ">
            <h1 className='text-xl font-semibold mr-2'> Cancel Appointment  </h1> 
        </div>
    </div>
    <Divider light sx={{marginBottom:'1rem'}}/>
    <form onSubmit={handleSubmit(submitForm)} className='py-1 md:py-0 top-0  mx-auto lg:px-[4%] px-[0%] w-full'>
          
        {/* reason for Cancellation */}
    <div className='mt-2'>
    <Grid container spacing={1} className="w-full">
      <Grid item lg={8} sm={8}>
        <InputField
                          name="reason"
                          label="Reason for Cancellation"
                          error={errors.reason}
                          control={control}
              />
      </Grid> 
    </Grid>
            
    </div>
    {/* </div> */}
    <div className='flex justify-center w-full my-4'>
    <Button
                variant="text"
                color="info"
                sx={{ width:'19%',  mt:2 }}
                fullWidth
                onClick={handleCloseCancel}
                
            >
                Cancel
            </Button>
            <Button
                variant="outlined"
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
    </>
  )
}
