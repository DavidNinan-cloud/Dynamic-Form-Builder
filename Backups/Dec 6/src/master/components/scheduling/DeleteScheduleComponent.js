import React, { useEffect, useState, useContext } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import { removeSlot } from "../../services/scheduling/SchedulingServices";
// import { removeScheduleSlot } from '../../services/user.service';

const DeleteScheduleComponent = (props) => {
  const {
    showDeleteSchedule,
    setShowDeleteSchedule,
    removeSlotObj,
    setRemoveSlotObj,
    refetch,
    setLoading,
    setResponse,
    setError,
    setResponseMsg,
    handleAlertClick,
    setBackdropOpen,
    fetchScheduleList,
  } = props;

  const formOptions = {
    mode: "onChange",
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  // handleUpdateScheduleDate(mySubmitObj.dayId, mySubmitObj.fromDate, mySubmitObj.toDate);

  const onSubmit = () => {
    handleRemoveSlot();
    reset();
    setShowDeleteSchedule(false);
  };

  const handleRemoveSlot = async () => {
    try {
      let res = await removeSlot(
        removeSlotObj.dayOfWeek,
        removeSlotObj.appointmentSlotScheduleId
      );
      console.log("res", res);
      if (res.status === 200) {
        fetchScheduleList();

        // refetch();
        // setResponse(res.status);
        // setResponseMsg("Delete Schedule");
        // handleAlertClick({
        //   vertical: "top",
        //   horizontal: "right",
        // });
      }

      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setBackdropOpen();
      // setLoading(false);
      console.log("After successful delete");
    }
  };

  return (
    <div className="flex-col items-center justify-center ">
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border border-gray-100 bg-white rounded-md p-4 shadow-xl">
        <div className="-mt-3">
          <div className="flex items-center justify-between border-b-2 p-2">
            <div className="text-lg text-customBlue">
              Do you really want to delete ?
            </div>
            <RiCloseCircleFill
              onClick={() => {
                setShowDeleteSchedule(false);
                setBackdropOpen(false);
              }}
              title="Close "
              color="#0B83A5"
              size={28}
              className="cursor-pointer"
            />
          </div>
          <div className="p-2">
            <div className="grid grid-cols-2 gap-4"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mx-5">
            {" "}
            <button
              type="button"
              onClick={() => {
                setShowDeleteSchedule(false);
                setBackdropOpen(false);
              }}
              className="border border-customBlue text-customBlue border-themeBlue py-1 px-4 rounded-md"
            >
              No
            </button>
            <button
              className="py-1 px-4 rounded-md bg-customBlue text-white border border-customBlue"
              type="submit"
            >
              Yes
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default DeleteScheduleComponent;
