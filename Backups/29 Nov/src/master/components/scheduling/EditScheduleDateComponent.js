import React, { useEffect, useState, useContext } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  TextField,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { updateScheduleDate } from "../../services/scheduling/SchedulingServices";
import {
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

// import { updateScheduleData } from "../../services/user.service";

const EditScheduleDateComponent = (props) => {
  const {
    showEditScheduleDate,
    setShowEditScheduleDate,
    editDateObj,
    refetch,
    setLoading,
    setResponse,
    setError,
    setResponseMsg,
    handleAlertClick,
    setBackdropOpen,
    fetchScheduleList,
  } = props;

  useEffect(() => {
    console.log("hi");
  }, [editDateObj]);

  const formOptions = {
    // resolver: yupResolver(validationSchemaPatientDetails, validationSchemaContactDetails),
    mode: "onChange",
    defaultValues: {
      startDate: new Date(editDateObj.fromDate),
      endDate: new Date(editDateObj.toDate),
    },
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  let watchStartDate = watch("startDate");

  console.log("watchStartDate", watchStartDate);

  const onSubmit = (data, e) => {
    console.log("Data", data);
    const { startDate, endDate } = data;
    let mySubmitObj = {
      fromDate: `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
      toDate: `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`,

      dayId: editDateObj.dayOfWeek,
    };

    console.log("mySubmitObj", mySubmitObj);
    setShowEditScheduleDate(false);
    handleUpdateScheduleDate(
      mySubmitObj.dayId,
      mySubmitObj.fromDate,
      mySubmitObj.toDate
    );
  };

  const handleUpdateScheduleDate = async (dayId, fromDate, toDate) => {
    setLoading(true);
    try {
      let res = await updateScheduleDate(dayId, fromDate, toDate);
      console.log("res", res);
      if (res.status === 200) {
        successAlert();
        fetchScheduleList();
        setResponse(res.status);
        setResponseMsg("EditDate Schedule");
      }

      setError(null);
      errorAlert();
    } catch (err) {
      setError(err);
    } finally {
      setBackdropOpen(false);
      // setBackdropOpen(false);
      setLoading(false);
      console.log("After successful put");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-100 bg-white rounded-md p-4 shadow-xl"
          //className="absolute top-28 left-10 right-10 mx-72 border border-gray-100 bg-white rounded-md p-4 shadow-xl translate-y-6 translate-x-6 min-w-fit"
        >
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-6 pt-2">
              <div className="text-lg text-customBlue">
                Update Schedule Date
              </div>
              <RiCloseCircleFill
                onClick={() => {
                  setShowEditScheduleDate(false);
                  setBackdropOpen(false);
                }}
                title="Close "
                color="#0B83A5"
                size={28}
                className="cursor-pointer"
              />
            </div>
            <div className="py-4 px-4">
              <div className="grid grid-cols-2 gap-4">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    control={control}
                    name="startDate"
                    //rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                        //  mask="____/__/__"
                        // inputFormat="yyyy/MM/dd"
                      />
                    )}
                    className="col-span-1"
                  />
                  <Controller
                    control={control}
                    name="endDate"
                    //rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <DatePicker
                        {...field}
                        label="End Date"
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                        //  mask="____/__/__"
                        // inputFormat="yyyy/MM/dd"
                        minDate={watchStartDate}
                        // inputFormat="dd/MM/yyyy"
                      />
                    )}
                    className="col-span-1"
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4">
            {" "}
            <button
              type="button"
              onClick={() => {
                setShowEditScheduleDate(false);
                setBackdropOpen(false);
              }}
              className="border text-customBlue border-customBlue py-2 px-4 rounded-md"
            >
              Close
            </button>
            <button
              className="py-2 px-4 rounded-md bg-customBlue text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default EditScheduleDateComponent;
