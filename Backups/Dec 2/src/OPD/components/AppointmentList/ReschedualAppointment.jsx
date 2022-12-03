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

import {rescheduleAppointment} from '../../services/AppointmentPageServices/AppointmentListServices'

import { useQuery, useMutation } from "@tanstack/react-query";

import { successAlert, errorAlert } from '../../../Common Components/Toasts/CustomToasts'
import LoadingSpinner from '../../../Common Components/loadingspinner/loadingSpinner';

  let initialSchema = {

        reason: yup
        .string()
        .required("Please mention your reason for reschedule"),
  
        timeError: yup.string().when("timeSelected", (type) => {
            if (!type) {
                return yup.string("").required("Please Select A Time Slot");
            }
          }),
    // // registrationNo: yup.string().when("isClinical", (type) => {
  // //   if (type !== tr) {
  // //     if (type) {
  // //       return yup.string().required("Required");
  // //     }
  // //   }
  // // }),
  
    };
    const defaultValues = 
    {
      timeSelected : false,
      reason:"",
      appointmentTime:""
    }
let timeNameGiven;

let fromTime;
let toTime


export default function ReschedualAppointment({
    openReschedule,
    setOpenReschedule,
    handelOpenReschedule,
    handleCloseReschedule,
timeSlotsArr,
setTimeSlotsArr,
doctorId,
AppointmentId,
departmentName,
doctorName,
callTableDataApi
}) {

    const [spinner, showSpinner] = React.useState(false);
    const [showTimeSlot, setShowTimeSlot] = React.useState(false);
    const [timeIndexGiven,setTimeIndexGiven] =React.useState();
    const [dateIs, setdateIs] = React.useState(new Date());
    let dateValue=dateIs
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
        
        const { isLoading, isError, error, isSuccess, mutate } =
        useMutation(rescheduleAppointment);
        // const[value,setValue]=useState("")
        // const handleSelect =(inVal) =>{
        //   setValue(inVal)
        // }
        const gettingTimeInfo = ()=>{
          
          let menuObj = timeSlotsArr[timeIndexGiven];
          
          timeNameGiven = menuObj.fromTimeDisplay;
          fromTime=menuObj.fromTime
          toTime=menuObj.toTime
          // setTimeNameGiven(menuObj.name)
          console.log(timeNameGiven)
      
          const fields = [
            "appointmentTime",
          ];
          fields.forEach((field) => setValue(field, timeNameGiven));
          setShowTimeSlot(true)
          setTimeSlotsArr([])
        }
        const changeCategory = (index ) => {
          setValue("timeSelected",true)
          clearErrors("timeError");
          if (timeIndexGiven == index){
           setTimeIndexGiven(null);
          }else {
           setTimeIndexGiven(index);
          }
        }
        const setDate = (value)=>{
            setdateIs(value);
            setShowTimeSlot(false)
            setValue("appointmentTime","")
            setTimeSlotsArr([{}])
            dateValue=value
            setTimeIndexGiven(null);
            
            let setDateValue = getDateModal(value)
            
            showSpinner(true)                    
            callApi(setDateValue)
        }


        const callApi = (setDateValue)=>{
          dateValue = setDateValue
          getTimeSlotsApi(dateValue, doctorId)
          .then((response) => {
            console.log(response.data.result);
            setTimeSlotsArr(response.data.result.slots); 
            showSpinner(false)                    
          })
          .catch((response) => {
            console.log(response);
            showSpinner(false)                    
          });
          setTimeIndexGiven(null)
        }
        const getDateModal = (dobValue) => {
            let dobGivenYear = dobValue.getFullYear();
            let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
            let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
            const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
            return fullDOB
          };
        const submitForm = (data) => {
            gettingTimeInfo()
            let finalData = {} 
            const finalDOA = getDateModal(dateIs)
            data.appointmentDate = finalDOA
            data.appointmentId = AppointmentId
            data.fromTime= fromTime
            data.toTime= toTime
            finalData.appointmentDate = finalDOA
            finalData.appointmentId = AppointmentId
            finalData.fromTime = fromTime
            finalData.toTime = toTime
            finalData.reason = data.reason

            console.log("data",finalData)
            
            showSpinner(true) 
            mutate(finalData, {onSuccess: (data, variables, context) => {
              handleCloseReschedule()
              showSpinner(false)
              successAlert(data.data.message)
              setTimeSlotsArr([{}])
              callTableDataApi()
            },
            onError:(data)=>{
              errorAlert(data.message)
              showSpinner(false)
            }
          });
          };
        
        
          useEffect(() => {
            
            console.log("departmentName",departmentName)
            console.log("doctorName",doctorName)
            console.log("openReschedule",openReschedule)
            if(openReschedule)
            {
              showSpinner(true)
              setTimeSlotsArr([{}])
              let today = getDateModal(new Date())
              callApi(today)
              setValue("timeSelected",false)
              clearErrors();
            }else{
              setdateIs(new Date())
              setShowTimeSlot(false)
              setValue("appointmentTime","")
              setValue("reason","")
              setValue("timeSelected",true)
            }
            
        }, [openReschedule]);
        
  return (
    <>
    
        <Modal
                open={openReschedule}
                onClose={handleCloseReschedule}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
    <Box sx={{position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // minWidth: '60%',
              minWidth: '94%',
              height: 'auto',
              minHeight: '30%',
              maxHeight: '90%',
              bgcolor: 'background.paper',
              overflowX:'hidden',
              overflowY:'scroll',
              borderRadius: "0.7rem",
              boxShadow: 24,
              p: 4,}}
className="">
<div className='w-full'>
    <div className="flex py-4 mt-3 mb-6 space-x-10 w-full mx-auto border-b">
        
        <div className="w-full flex justify-start space-x-6">
            <div className="flex  items-baseline space-x-3">
            <h1 className='text-xl font-semibold mr-2'> Department Name : </h1> 
            <h1 className='mt-1'>{departmentName}</h1>
            </div>
            <div  className="flex  items-baseline space-x-3">
            <h1 className='text-xl font-semibold mr-2'> Doctor Name : </h1> 
            <h1 className='mt-1'>{doctorName}</h1>
            </div>
        </div>
    </div>
    <Divider light sx={{marginBottom:'1rem'}}/>
    <form onSubmit={handleSubmit(submitForm)} className='py-1 md:py-0 top-0  mx-auto lg:px-8 px-[0%] w-full'>
          
    {/* input fields */}
    <div>
        {/* //Date of Appointment // */}
        {/* <div className='flex space-x-6'> */}
        <Grid container spacing={1} className="w-full">
            {/* <div className="w-[24%] lg:w-[19%] -z-0"> */}
            <Grid item lg={4} sm={4}>
                    <FormControl
                sx={{
                    // width: "19%",
                }}
                fullWidth
                size="small"
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disablePast
                        label="Appointment Date"
                        value={dateIs}
                        
                        inputProps={{ readOnly: true }}
                        onChange={(value) => setDate(value)}
                        renderInput={(props) => <TextField {...props} size="small" />}
                        name="appointmentDate"
                        defaultValue=""
                        inputFormat="dd/MM/yyyy"
                    />
                    </LocalizationProvider>
                    <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.appointmentDate?.message}
                </FormHelperText>
                    </FormControl>
            </Grid>
            
          </Grid>
    </div>
          
    {/* </div> */}
        {/* showing TimeSlots */}
      <div className='w-full mx-auto py-5 my-4 rounded-xl'>
          <div className="flex flex-nowrap justify-between mb-8 w-full ">
            <div className="w-full lg:w-1/6 translate-y-1">
            <Typography id="modal-modal-title" variant="h5" component="h3">
              Select Slot
            </Typography>
            </div>
            <div className="flex  lg:translate-y-0 justify-end  ml-2 lg:ml-0  w-4/6">
                    <div className="flex mx-4 space-x-2 mt-2">
                      <div className="rounded-full text-[#127C9E] w-6 h-6">
                              <CircleIcon color='#127C9E'
                              sx={{color:"#127C9E"}}
                              />
                      </div>
                      <h1>Selected</h1>
                    </div>
                    <div className="flex mx-4 space-x-2 mt-2">
                      <div className='rounded-full w-6 h-6'><RadioButtonUncheckedIcon color='#127C9E'
                              sx={{color:"#127C9E"}}
                              /></div>
                      <h1>Available</h1>
                    </div>
                    <div className="flex mx-4 space-x-2 mt-2">
                      <div className=''>
                      <CircleIcon color='#e2e8f0' className="rounded-full w-fit h-fit"
                              sx={{color:"#e2e8f0", border:"1 solid black", borderRadius: '9999px', padding:'1'}}
                              />
                      </div>
                      <h1>Booked</h1>
                    </div>
            </div>
          </div>
        
          <div className=" mx-auto p-4 gap-2 w-[98%] pr-10">
            <Grid
                container
                spacing={1}
                sx={{
                  maxHeight: '14rem',    
                  overflowY:'scroll',}}
                className="py-4  my-1 px-1 rounded-md flex flex-wrap "
              >
                  {spinner ? (
                        <div className=" flex mx-auto justify-center">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <>
                        {timeSlotsArr.length > 0 ? (
                        <> 
                              {timeSlotsArr.map((item, index) => {
                                return (
                                  <Grid key={index}
                                            item
                                            lg={2.4}
                                            sm={2.4}
                                            className="my-1 mx-auto px-1 rounded-md text-xl font-semibold"
                                            
                                          >
                                    {!item.isBooked ? (
                                      <>
                                          {timeIndexGiven === index ? (
                                            
                                            <Button
                                            fullWidth
                                            disableFocusRipple
                                            variant="contained"
                                            // color="#127C9E"
                                            onClick={() => changeCategory(index)}
                                            sx={{
                                              width:'90%',
                                              backgroundColor:'#127C9E',color:"white", 
                                            ':hover': {
                                              bgcolor: '#127C9E',
                                              color: 'white',
                                            },
                                          }}
                                          >
                                                {item.fromTimeDisplay}
                                              </Button>
                                          ) : (
                                              <Button
                                              fullWidth
                                              variant="outlined"
                                              // color="primary"
                                              onClick={() => changeCategory(index)}
                                              sx={{
                                                width:'90%', border: "2px solid #127C9E" }}
                                            >
                                              
                                              {item.fromTimeDisplay}
                                            </Button>
                                          )}
                                      </>
                                    ) : (
                                      
                                      <Button
                                            fullWidth
                                            disabled={true}
                                            disableFocusRipple
                                            variant="outlined"
                                            // color="#127C9E"
                                            onClick={() => changeCategory(index)}
                                            sx={{
                                              width:'90%', border: "2px solid #94a3b8", backgroundColor:'#f8fafc',color:"#94a3b8", 
                                            ':hover': {
                                              border: "2px solid #94a3b8",
                                              bgcolor: '#f8fafc',
                                              color: '#94a3b8',
                                            },
                                          }}
                                          >
                                                {item.fromTimeDisplay}
                                              </Button>
                                    )}
                                  </Grid>
                                );
                              })}
                        </>
                        ):(<div className="flex justify-center text-red-500 ">No Time Slot Is Available"</div>)
                    }
                        </>
                      )
                  }
              
            </Grid>
          </div>
          <span className='text-red-500'>{errors.timeError?.message}</span>    
          
      </div>
        {/* reason for reSchedual */}
    <div className='mt-2'>
    <Grid container spacing={1} className="w-full">
      <Grid item lg={8} sm={8}>
        <InputField
                          name="reason"
                          label="Reason"
                          error={errors.reason}
                          control={control}
              />
      </Grid> 
    </Grid>
            
    </div>
    {/* </div> */}
    <div className='flex justify-center w-full my-4 space-x-3'>
        <Button
                variant="text"
                color="info"
                sx={{ width:'19%',  mt:2 }}
                fullWidth
                onClick={()=>{
                  clearErrors()
                  handleCloseReschedule()}}
            >
                Cancel
            </Button>
            {
        timeSlotsArr.length > 0 ? (
            <Button
                variant="outlined"
                type="submit"
                color="success"
                sx={{ width:'19%',  mt:2 }}
                fullWidth
            >
                Submit
            </Button>):""
          }
    </div>
            
    </form>
</div>
    </Box>
        </Modal>
    </>
  )
}
