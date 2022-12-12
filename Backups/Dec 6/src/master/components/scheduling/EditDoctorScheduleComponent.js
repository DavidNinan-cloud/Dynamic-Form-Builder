import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { fetchDoctorScheduleSlotDetailsData, putSchedulingData } from '../../services/user.service';

import { BiMinusCircle } from "react-icons/bi";
import {
  MdDelete,
  MdAddCircleOutline,
  MdModeEditOutline,
} from "react-icons/md";

const EditDoctorScheduleComponent = (props) => {
  const {
    showEditSchedule,
    setShowEditSchedule,
    editScheduleObj,
    setEditScheduleObj,
    refetch,
    editScheduleArr,
    setEditScheduleArr,
    setLoading,
    setResponse,
    setError,
    setResponseMsg,
    handleAlertClick,
    setBackdropOpen,
  } = props;

  const [errorMsg, setErrorMsg] = useState("invisible");

  //const [slotDetails, setSlotDetails] = useState([]);

  // const [scheduleDetails, setScheduleDetails] = useState({});

  // useEffect(() => {
  //   let date;
  //   if (editScheduleObj) {
  //     date = new Date(`February 04, 2020 ${editScheduleObj.fromTime}`);
  //     let options = {
  //       hour: 'numeric',
  //       minute: 'numeric',
  //       hour12: true,
  //     };
  //     let dateString = date.toLocaleString('en-US', options);

  //     setEditScheduleObj({
  //       fromTime: `${dateString}`,
  //     });
  //   }
  // }, []);

  // const fetchSlotDetails = async (id) => {
  //   console.log('id', id);
  //   let res = await fetchDoctorScheduleSlotDetailsData(id);
  //   setSlotDetails(res.data.result.timeDtoList);
  //   setScheduleDetails(res.data.result);
  //   let myObj = { ...scheduleDetails };
  //   console.log('myObj', myObj);
  // };

  // useEffect(() => {
  //   if (dayId) {
  //     fetchSlotDetails(dayId);
  //   }

  //   console.log('dayId', dayId);
  //   console.log('hi');
  //   console.log('slotDetails', slotDetails);
  //   console.log('scheduleDetails', scheduleDetails);
  // }, []);

  const formOptions = {
    //resolver: yupResolver(patientHistoryMedicalSchema),
    mode: "onChange",
    defaultValues: {
      // startDate: new Date(editScheduleObj.fromDate),
      maxBooking: editScheduleObj.maxBooking,
      overBooking: editScheduleObj.overBooking,
      //endDate: new Date(editScheduleObj.toDate),
      // startTime: new Date(editScheduleObj.fromTime).toLocaleString('en-US', {
      //   hour: '2-digit',
      //   minute: '2-digit',

      //   hour12: true,
      // }),
      //startTime: editScheduleObj.fromTime,
      startTime: new Date(
        0,
        0,
        0,
        editScheduleObj.fromTime.substring(0, 2),
        editScheduleObj.fromTime.substring(3, 5)
      ),
      endTime: new Date(
        0,
        0,
        0,
        editScheduleObj.toTime.substring(0, 2),
        editScheduleObj.toTime.substring(3, 5)
      ),
      slotInMins: editScheduleObj.slotsPerMinutes,

      // toggleSlot: !editScheduleObj.isDayDisable,
    },
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  // const handleScheduleDelete = (itemIndex) => {
  //   setSlotDetails((slotItem) => slotItem.filter((item, index) => index !== itemIndex));
  //   console.log('Filtered slotDetails', slotDetails);
  // };

  const onSubmit = (data) => {
    let slotDetailsObj;
    let slotArrDetails = [];

    const { startDate, endDate } = data;
    // let fromDateString = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
    //   .toString()
    //   .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    // let toDateString = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate
    //   .getDate()
    //   .toString()
    //   .padStart(2, '0')}`;

    // data.consultationTime.map((item) => {
    //   slotDetails.map((slot) => {
    //     slotDetailsObj = {
    //       fromTime:
    //         String(item.endTime.getHours()).padStart(2, '0') +
    //         ':' +
    //         String(item.startTime.getMinutes()).padStart(2, '0') +
    //         ':' +
    //         String(item.startTime.getSeconds()).padStart(2, '0'),
    //       toTime:
    //         String(item.endTime.getHours()).padStart(2, '0') +
    //         ':' +
    //         String(item.endTime.getMinutes()).padStart(2, '0') +
    //         ':' +
    //         String(item.endTime.getSeconds()).padStart(2, '0'),
    //       slotsPerMinutes: item.slotInMins,
    //       dayOfWeek: slot.dayOfWeek,
    //       appointmentSlotScheduleId: '',
    //       isDisableSlot: slot.isDisableSlot,
    //       isRemoved: slot.isRemoved,
    //     };
    //   });

    //   slotArrDetails.push(slotDetailsObj);
    // });

    //slotArrDetails = consultationTime;
    console.log("data", data);
    //let scheduleArr = [];
    let scheduleObj;

    let finalArr = editScheduleArr.filter(
      (schedule) =>
        schedule.appointmentSlotScheduleId !==
        editScheduleObj.appointmentSlotScheduleId
    );

    scheduleObj = {
      fromTime:
        String(data.startTime.getHours()).padStart(2, "0") +
        ":" +
        String(data.startTime.getMinutes()).padStart(2, "0") +
        ":" +
        String(data.startTime.getSeconds()).padStart(2, "0"),
      toTime:
        String(data.endTime.getHours()).padStart(2, "0") +
        ":" +
        String(data.endTime.getMinutes()).padStart(2, "0") +
        ":" +
        String(data.endTime.getSeconds()).padStart(2, "0"),
      slotsPerMinutes: data.slotInMins,
      dayOfWeek: editScheduleObj.dayOfWeek,
      appointmentSlotScheduleId: editScheduleObj.appointmentSlotScheduleId,
      isDisableSlot: false,
      isRemoved: false,
      maxBooking: data.maxBooking,
      overBooking: data.overBooking,
    };
    finalArr.push(scheduleObj);

    console.log("finalArr", finalArr);

    //console.log('final', final);

    let submitObj = {
      dayOfWeek: editScheduleObj.dayOfWeek,
      dayValue: editScheduleObj.dayValue,
      dsId: editScheduleObj.dsId,
      fromDate: editScheduleObj.fromDate,
      toDate: editScheduleObj.toDate,
      isDayDisable: false,
      timeDtoList: finalArr,
    };
    console.log("submitObj", submitObj);
    console.log("editScheduleArr", editScheduleArr);

    // let submitObj = {
    //   dayOfWeek: scheduleDetails.dayOfWeek,
    //   dayValue: scheduleDetails.dayValue,
    //   isDayDisable: scheduleDetails.isDayDisable,
    //   dsId: scheduleDetails.dsId,
    //   fromDate: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate
    //     .getDate()
    //     .toString()
    //     .padStart(2, '0')}`,
    //   toDate: `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate
    //     .getDate()
    //     .toString()
    //     .padStart(2, '0')}`,
    //   maxBooking: data.maxBooking,
    //   overBooking: data.overBooking,
    //   timeDtoList: slotArrDetails,
    // };
    // console.log('submitObj', submitObj);
    //  handleUpdateDoctorSchedule(submitObj);

    reset();

    setShowEditSchedule(false);
  };

  // const handleUpdateDoctorSchedule = async (dataStore) => {
  //   console.log("dataStore", dataStore);
  //   setLoading(true);
  //   try {
  //     let res = await putSchedulingData(dataStore);
  //     console.log("res put", res);
  //     if (res.status === 200) {
  //       refetch();
  //       setResponse(res.status);
  //       setResponseMsg("Edit Schedule");
  //       handleAlertClick({
  //         vertical: "top",
  //         horizontal: "right",
  //       });
  //     }
  //     //setResponse(res.status);
  //     //console.log('res.dataStore', res.dataStore);

  //     //console.log('response', response);
  //     setError(null);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //     console.log("After successful put", dataStore);
  //   }
  // };

  return (
    <div className="flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border border-gray-200 bg-white rounded-md p-4 shadow-lg">
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-6 pt-2">
              <div className="text-lg text-customBlue">
                Edit Schedule Details
              </div>
              <RiCloseCircleFill
                onClick={() => {
                  setShowEditSchedule(false);
                  setBackdropOpen(false);
                }}
                title="Close "
                color="#0B83A5"
                size={28}
                className="cursor-pointer"
              />
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <span className="col-start-1 col-span-2 text-gray-700 mb-2">
                  Day of the week : {editScheduleObj.dayValue}
                </span>
                <TextField
                  size="small"
                  name="maxBooking"
                  type="number"
                  //defaultValue={editScheduleObj.maxBooking}
                  {...register("maxBooking")}
                  className="col-start-1"
                  label="Max Booking"
                />

                <TextField
                  size="small"
                  //defaultValue={editScheduleObj.overBooking}
                  name="overBooking"
                  {...register("overBooking")}
                  className="col-start-2"
                  label="Over Booking"
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="col-start-1 col-span-1 w-full">
                    <Controller
                      fullWidth
                      control={control}
                      name={`startTime`}
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                        <TimePicker
                          {...field}
                          label="Start Time"
                          //defaultValue={editScheduleObj.fromTime}
                          // onChange={handleChange}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <Controller
                      fullWidth
                      control={control}
                      name={`endTime`}
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                        <TimePicker
                          {...field}
                          // defaultValue={editScheduleObj.toTime}
                          label="End Time"
                          // value={value}
                          // onChange={handleChange}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      )}
                    />
                  </div>
                  <FormControl fullWidth>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Slot in minutes
                    </InputLabel>
                    <Controller
                      control={control}
                      name="slotInMins"
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            label="Slot in minutes"
                            size="small"
                          >
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>45</MenuItem>
                            <MenuItem value={60}>60</MenuItem>
                          </Select>
                        );
                      }}
                    />
                  </FormControl>
                </LocalizationProvider>
              </div>
              <div className="border mx-2 my-5" />

              {/* <div className="flex-col col-span-2">
                {slotDetails &&
                  slotDetails.map((item, index) => {
                    return (
                      <div className="flex items-center space-x-4 my-2">
                        <span>Slot in Minutes: {item.slotsPerMinutes}</span>
                        <span className="border border-themeBlue text-themeBlue rounded-md p-0.5">{item.fromTime}</span>
                        <span>To</span>
                        <span className="border border-themeBlue text-themeBlue rounded-md p-0.5">{item.toTime}</span>
                        <BiMinusCircle
                          title="Delete schedule"
                          size={20}
                          className="cursor-pointer"
                          onClick={(scheduleItem) => handleScheduleDelete(index)}
                        />
                        <Switch
                          name="toggleSlot"
                          size="small"
                          defaultChecked={!item.isDisableSlot}
                          {...register('toggleSlot')}
                        />
                      </div>
                    );
                  })}
              </div> */}
              {/* <div className="border mx-2 my-5" /> */}
              <div className="flex justify-end space-x-4">
                {" "}
                <button
                  type="button"
                  onClick={() => {
                    setShowEditSchedule(false);
                    setBackdropOpen(false);
                  }}
                  className="border border-customBlue py-1 px-6 rounded-md text-customBlue"
                >
                  Close
                </button>
                <button
                  className="py-1 px-6 rounded-md bg-customBlue text-white"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDoctorScheduleComponent;
