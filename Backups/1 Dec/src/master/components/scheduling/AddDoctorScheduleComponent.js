import React, { useEffect, useState } from "react";
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
// import {
//   fetchDoctorScheduleSlotDetailsData,
//   putSchedulingData,
// } from "../../services/user.service";

import { BiMinusCircle } from "react-icons/bi";
import {
  MdDelete,
  MdAddCircleOutline,
  MdModeEditOutline,
} from "react-icons/md";

const AddDoctorScheduleComponent = (props) => {
  const {
    showAddSchedule,
    setShowAddSchedule,
    editScheduleObj,
    setEditScheduleObj,
    refetch,
    addScheduleArr,
    setLoading,
    setResponse,
    setError,
    setResponseMsg,
    handleAlertClick,
    setBackdropOpen,
  } = props;

  const [errorMsg, setErrorMsg] = useState("invisible");

  useEffect(() => {
    console.log("hi");
  }, []);

  const formOptions = {
    //resolver: yupResolver(patientHistoryMedicalSchema),
    mode: "onChange",
    defaultValues: {
      //  startDate: new Date(editScheduleObj.fromDate),
      // maxBooking: editScheduleObj.maxBooking,
      //  overBooking: editScheduleObj.overBooking,
      //  endDate: new Date(editScheduleObj.toDate),
      consultationTime: [{ startTime: null, endTime: null, slotInMins: null }],
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

  let toggleSlot = watch("toggleSlot");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "consultationTime",
  });

  let consultationTime = watch("consultationTime");
  let startTime, endTime, slotInMins;

  consultationTime.map((item) => {
    startTime = item.startTime;
    endTime = item.endTime;
    slotInMins = item.slotInMins;
  });

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

    data.consultationTime.map((item) => {
      slotDetailsObj = {
        fromTime:
          String(item.startTime.getHours()).padStart(2, "0") +
          ":" +
          String(item.startTime.getMinutes()).padStart(2, "0") +
          ":" +
          String(item.startTime.getSeconds()).padStart(2, "0"),
        toTime:
          String(item.endTime.getHours()).padStart(2, "0") +
          ":" +
          String(item.endTime.getMinutes()).padStart(2, "0") +
          ":" +
          String(item.endTime.getSeconds()).padStart(2, "0"),
        slotsPerMinutes: item.slotInMins,
        dayOfWeek: editScheduleObj.dayOfWeek,
        appointmentSlotScheduleId: "",
        isDisableSlot: false,
        isRemoved: false,
        maxBooking: Number(data.maxBooking),
        overBooking: Number(data.overBooking),
      };

      slotArrDetails.push(slotDetailsObj);
    });

    //slotArrDetails = consultationTime;
    console.log("data", data);
    let submitObj = {
      dayOfWeek: editScheduleObj.dayOfWeek,
      dayValue: editScheduleObj.dayValue,
      isDayDisable: editScheduleObj.isDayDisable,
      dsId: editScheduleObj.dsId,
      fromDate: editScheduleObj.fromDate,
      toDate: editScheduleObj.toDate,
      //maxBooking: data.maxBooking,
      //overBooking: data.overBooking,
      timeDtoList: slotArrDetails,

      // timeDtoList: [
      //   {
      //     appointmentSlotScheduleId: 0,
      //     dayOfWeek: 0,
      //     fromTime: 'string',
      //     isDisableSlot: true,
      //     isRemoved: true,
      //     slotsPerMinutes: 0,
      //     toTime: 'string',
      //   },
      // ],
    };
    console.log("submitObj", submitObj);
    // handleUpdateDoctorSchede(submitObj);
    reset();
    setShowAddSchedule(false);
  };

  // const handleUpdateDoctorSchede = async (dataStore) => {
  //   console.log("dataStore", dataStore);
  //   setLoading(true);
  //   try {
  //     let res = await putSchedulingData(dataStore);
  //     console.log("res", res);
  //     if (res.status === 200) {
  //       refetch();
  //       setResponse(res.status);

  //       setResponseMsg("Add Schedule");
  //       handleAlertClick({
  //         vertical: "top",
  //         horizontal: "right",
  //       });
  //     }
  //     console.log("res", res);

  //     setError(null);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);

  //     console.log("After successful put", dataStore);
  //   }
  // };

  return (
    <div className="flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border border-gray-200 bg-white rounded-md p-4 shadow-lg min-w-fit">
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-6 pt-2">
              <div className="text-lg text-customBlue">
                Add Schedule Details
              </div>
              <RiCloseCircleFill
                onClick={() => {
                  setShowAddSchedule(false);
                  setBackdropOpen(false);
                }}
                title="Close "
                color="#0B83A5"
                size={28}
                className="cursor-pointer"
              />
            </div>
            <div className="p-4">
              <div className="grid grid-cols-4 gap-2">
                <span className="col-start-1 col-span-2 text-gray-700">
                  Day of the week : {editScheduleObj.dayValue}
                </span>

                <TextField
                  size="small"
                  name="maxBooking"
                  type="number"
                  {...register("maxBooking")}
                  className="col-start-1"
                  label="Max Booking"
                />

                <TextField
                  size="small"
                  name="overBooking"
                  {...register("overBooking")}
                  className="col-start-2"
                  label="Over Booking"
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {fields.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="inline-grid grid-cols-4  col-span-4 gap-2"
                      >
                        <div className="col-span-1 w-full">
                          <Controller
                            fullWidth
                            control={control}
                            name={`consultationTime[${index}].startTime`}
                            rules={{ required: true }}
                            render={({ field: { ref, ...field } }) => (
                              <TimePicker
                                {...field}
                                label="Start Time"
                                // value={new Date().getTime()}
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
                            name={`consultationTime[${index}].endTime`}
                            rules={{ required: true }}
                            render={({ field: { ref, ...field } }) => (
                              <TimePicker
                                {...field}
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

                        <div className="col-span-1 w-full">
                          <FormControl fullWidth>
                            <InputLabel
                              size="small"
                              id="demo-simple-select-label"
                            >
                              Slot in minutes
                            </InputLabel>
                            <Controller
                              control={control}
                              defaultValue=""
                              name={`consultationTime[${index}].slotInMins`}
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
                        </div>

                        {/* <div className="flex items-center space-x-2 w-full">
                          {fields.length !== 1 && (
                            <BiMinusCircle
                              title="Remove"
                              size={26}
                              color="grey"
                              className="cursor-pointer mt-1"
                              onClick={() => remove(index)}
                            />
                          )}
                          {fields.length - 1 === index && (
                            <MdAddCircleOutline
                              size={26}
                              color="grey"
                              onClick={() => {
                                if (startTime !== "" && endTime !== "") {
                                  append({
                                    startTime: new Date().getTime(),
                                    endTime: new Date().getTime(),
                                  });
                                  setErrorMsg("invisible");
                                } else {
                                  setErrorMsg("visible text-red-500");
                                }
                              }}
                              title="Add"
                              className="cursor-pointer mt-1"
                            />
                          )}
                        </div> */}
                      </div>
                    );
                  })}
                </LocalizationProvider>
              </div>
              <div className="border mx-2 my-5" />

              <div className="flex justify-end space-x-4">
                {" "}
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSchedule(false);
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
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorScheduleComponent;
