import {
  getUnitDropdown,
  getDepartmentDropdown,
  getDays,
  getDaysWithoutId,
  getDoctors,
  getSlotInMins,
  postSchedulingData,
} from "../../services/scheduling/SchedulingServices";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  Alert,
  Snackbar,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FcCalendar } from "react-icons/fc";
import {
  MdDelete,
  MdAddCircleOutline,
  MdAddCircle,
  MdModeEditOutline,
} from "react-icons/md";
import { styled } from "@mui/material/styles";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { BiMinusCircle } from "react-icons/bi";
import * as Yup from "yup";
import {
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";
import { useLocation, useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import CloseButton from "../../../Common Components/Buttons/CloseButton";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";

let daysArr = [];
let temp1 = [];
let myObj;
let roleObj = {};
// let myArr = [],
//   myObj;
let current = new Date();

let firstElement;

const Scheduling = (props) => {
  const {
    showCreateSchedule,
    setShowCreateSchedule,
    setBackdropOpen,
    scheduleData,
    fetchScheduleList,
    fetchScheduleListWithoutId,
  } = props;

  const [unitOptions, setUnitOptions] = React.useState([]);
  const [openPost, setOpenPost] = React.useState(false);
  const [myArr, setMyArr] = React.useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [slotInMinsArr, setSlotInMinsArr] = React.useState([]);
  const [finalData, setFinalData] = React.useState({});
  const [doctorNameOptions, setDoctorNameOptions] = React.useState([]);

  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [role, setRole] = React.useState([{}]);

  const [dayCount, setDayCount] = React.useState(0);
  const [totalDayCount, setTotalDayCount] = React.useState();

  const [active, setActive] = React.useState(false);

  const [count, setCount] = React.useState(0);

  const [errorMsg, setErrorMsg] = useState("invisible");

  const [loading, setLoading] = useState();
  const [loadingDays, setLoadingDays] = useState();
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState(null);

  // let roleObj;

  useEffect(() => {
    roleObj = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("roleObj", roleObj);
  }, []);

  useEffect(() => {
    console.log("scheduleData scheduling", scheduleData);
    if (scheduleData) {
      console.log("scheduleData.units", scheduleData.units);

      scheduleData.units.map((unit) => {
        let myObj = {
          id: unit.id,
          name: unit.name,
        };
        unitOptions.push(myObj);
      });

      console.log("...scheduleData.units", ...scheduleData.units);
      console.log("scheduleData.units", scheduleData.units);
      console.log("unitOptions", unitOptions);
    } else {
      roleObj.units.map((unit) => {
        let myObj = {
          id: unit.id,
          name: unit.label,
        };
        unitOptions.push(myObj);
      });
      console.log("not schedule data");
    }

    firstElement = unitOptions
      .filter((unit, index) => index === 0)
      .map((unit) => unit.id);
    console.log("firstElement", Number(firstElement.toString()));
  }, []);

  const [dayList, setDayList] = useState([]);

  const [weekDay, setWeekDay] = useState([]);

  const consultationTimeSchema = Yup.object().shape(
    unitOptions.length > 1
      ? {
          startDate: Yup.date().required("Required").nullable(),
          endDate: Yup.date().required("Required").nullable(),
          unit: Yup.number().required("Required").nullable(),
          //department: Yup.string().required("Required"),
          // doctorName: Yup.string().required("Required").nullable(),
          consultationTime: Yup.array().of(
            Yup.object().shape({
              startTime: Yup.date().required("Required").nullable(),
              endTime: Yup.date().required("Required").nullable(),
              slotInMins: Yup.string().required("Required"),
              maxBooking: Yup.string().required("Required").nullable(),
              overBooking: Yup.string().required("Required").nullable(),
            })
          ),
        }
      : {
          startDate: Yup.date().required("Required").nullable(),
          endDate: Yup.date().required("Required").nullable(),
          //unit: Yup.string().required("Required"),
          //department: Yup.string().required("Required"),
          // doctorName: Yup.string().required("Required").nullable(),
          consultationTime: Yup.array().of(
            Yup.object().shape({
              startTime: Yup.date().required("Required").nullable(),
              endTime: Yup.date().required("Required").nullable(),
              slotInMins: Yup.string().required("Required"),
              maxBooking: Yup.string().required("Required").nullable(),
              overBooking: Yup.string().required("Required").nullable(),
            })
          ),
        }
  );

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const addRecord = () => {
    console.log("A new record has been added");
    postScheduling(finalData);
    // saveTestEntryDetailsData(finalData);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openAlert, setOpenAlert] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = openAlert;

  const handleAlertClick = (newState) => {
    setOpenAlert({ open: true, ...newState });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({ ...openAlert, open: false });
  };

  const formOptions = {
    resolver: yupResolver(consultationTimeSchema),
    defaultValues: {
      //slotInMins: null,
      unit: "",
      startDate: null,
      endDate: null,
      consultationTime: [
        {
          maxBooking: null,
          overBooking: null,
          startTime: null,
          endTime: null,
          slotInMins: "",
        },
      ],
    },
    mode: "onChange",
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "consultationTime",
  });

  let startTime, endTime, slotInMins, maxBooking, overBooking;

  let consultationTime = watch("consultationTime");

  consultationTime.map((item) => {
    startTime = item.startTime;
    endTime = item.endTime;
    slotInMins = item.slotInMins;
    maxBooking = item.maxBooking;
    overBooking = item.overBooking;
  });

  let fromDate = watch("startDate");
  // let fromTime, toTime;
  let fromTimeArr = [];
  let toTimeArr = [];
  let fromTimeInMinsArr = [];
  let toTimeInMinsArr = [];

  fields.map((item, index) => {
    fromTimeArr[index] = watch(`consultationTime[${index}].startTime`);
    toTimeArr[index] = watch(`consultationTime[${index}].endTime`);
    fromTimeInMinsArr[index] = new Date(fromTimeArr[index]).getMinutes();
    toTimeInMinsArr[index] = new Date(toTimeArr[index]).getMinutes();
  });
  console.log("fromTimeInMinsArr[0]", fromTimeInMinsArr[0]);
  console.log("toTimeInMinsArr[0]", toTimeInMinsArr[0]);
  console.log(toTimeInMinsArr[0] - fromTimeInMinsArr[0]);

  // let watchDepartment = watch("department");

  // console.log("department", watchDepartment);

  //const daysHandler = () => {};

  let watchUnit = watch("unit");

  // console.log("watchUnit", watchUnit);

  // useEffect(() => {
  //   reset({ unit: 1 });
  // }, []);

  useEffect(() => {
    getSlotInMinutes();

    getDepartmentList();
    if (dayList) {
      console.log("Days");
      let weekOfDayArr = [];
      let weekOfDayObj;
      dayList.map((week) => {
        weekOfDayObj = {
          dayId: week.dayId,
          dayValue: week.dayValue,
          isActive: false,
        };
        weekOfDayArr.push(weekOfDayObj);
      });

      setWeekDay([...weekOfDayArr]);
      console.log("weekDay", weekDay);
      setTotalDayCount(dayList.length);
      console.log("totalDayCount", totalDayCount);
    } else {
      console.log("No Days");
      setWeekDay([]);
      setTotalDayCount(null);
    }

    // if (scheduleData) {
    //   getDaysList(scheduleData.doctorId, watchUnit);
    //   console.log("watchUnit", watchUnit);
    // } else {
    //   getDaysListWithoutId();
    //   console.log("watchUnit", watchUnit);
    // }
  }, [temp1, dayList]);

  useEffect(() => {
    if (unitOptions.length === 1) {
      if (scheduleData) {
        console.log("schedule data if", scheduleData);
        getDaysList(
          scheduleData.doctorId,
          unitOptions.map((unit) => unit.id)
        );
      } else {
        console.log(
          "unitOptions.map((unit) => unit.id)",
          unitOptions.map((unit) => unit.id)
        );
        getDaysListWithoutId(unitOptions.map((unit) => unit.id));
      }
    }
  }, []);

  // useEffect(() => {
  //   if (watchDepartment) {
  //     getDoctorNamesList(watchDepartment);
  //   }
  // }, [watchDepartment]);

  // useEffect(() => {
  //   getDoctorNamesList(departmentId);
  // }, []);

  useEffect(() => {
    console.log("watchUnit scheduling", watchUnit);

    var time = new Date();
    console.log(
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }, []);

  const getUnitList = () => {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSlotInMinutes = () => {
    getSlotInMins()
      .then((response) => {
        console.log("The list of slot in mins" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setSlotInMinsArr(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDoctorNamesList = (id) => {
    getDoctors(id)
      .then((response) => {
        console.log(
          "The list of all the doctor names are as follows" + response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setDoctorNameOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDepartmentList = () => {
    getDepartmentDropdown()
      .then((response) => {
        console.log(
          "The list of all the departments are as follows" + response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setDepartmentOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDaysList = (doctorId, unitId) => {
    getDays(doctorId, unitId)
      .then((response) => {
        setLoadingDays(true);
        console.log("The list of all the days are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setDayList(response.data.result);
        console.log("days response", response.data.result);
        setLoadingDays(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDaysListWithoutId = (unitId) => {
    getDaysWithoutId(unitId)
      .then((response) => {
        console.log("The list of all the days are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setDayList(response.data.result);
        console.log("days response", response.data.result);
        setLoadingDays(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { mutate: postScheduling } = useMutation(postSchedulingData, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      successAlert();
      setCount(0);
      reset();
      temp1 = [...weekDay];
      console.log("temp", temp1);
      setWeekDay(temp1);
      setDayCount(0);
      daysArr = [];
      if (scheduleData) {
        console.log("if scheduling");
        fetchScheduleList(
          scheduleData.doctorId,
          unitOptions.length > 1
            ? watchUnit
            : unitOptions.map((unit) => unit.id)
        );
        getDaysList(scheduleData.doctorId, watchUnit);
      } else {
        console.log("not scheduling");
        console.log("watchUnit", watchUnit);
        console.log(
          "unitOptions.map((unit) => unit.id)",
          unitOptions.map((unit) => unit.id)
        );
        fetchScheduleListWithoutId(
          unitOptions.length > 1
            ? watchUnit
            : unitOptions.map((unit) => unit.id)
        );
        getDaysListWithoutId(
          unitOptions.length > 1
            ? watchUnit
            : unitOptions.map((unit) => unit.id)
        );
        // fetchScheduleListWithoutId(watchUnit.value);
        //getDaysListWithoutId(unitOptions.map((unit) => unit.id));
      }
      setBackdropOpen(false);
      setShowCreateSchedule(false);
    },
    onError: (error) => {
      console.log(error);
      errorAlert();
      setCount(0);
      //Code for React toast
    },
  });

  const handleSunday = (temp, day) => {
    let sundayArr = temp.filter((item) => item.dayId === 1);
    if (day.isActive === false) {
      if (!daysArr.includes(1)) {
        daysArr.push(1);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      sundayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(1), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      sundayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleMonday = (temp, day) => {
    let mondayArr = temp.filter((item) => item.dayId === 2);
    if (day.isActive === false) {
      if (!daysArr.includes(2)) {
        daysArr.push(2);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      mondayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(2), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      mondayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleTuesday = (temp, day) => {
    let tuesdayArr = temp.filter((item) => item.dayId === 3);
    if (day.isActive === false) {
      if (!daysArr.includes(3)) {
        daysArr.push(3);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      tuesdayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(3), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      tuesdayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleWednesday = (temp, day) => {
    let wednesdayArr = temp.filter((item) => item.dayId === 4);
    if (day.isActive === false) {
      if (!daysArr.includes(4)) {
        daysArr.push(4);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      wednesdayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(4), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      wednesdayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleThursday = (temp, day) => {
    let thursdayArr = temp.filter((item) => item.dayId === 5);
    if (day.isActive === false) {
      if (!daysArr.includes(5)) {
        daysArr.push(5);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      thursdayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(5), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      thursdayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleFriday = (temp, day) => {
    let fridayArr = temp.filter((item) => item.dayId === 6);
    if (day.isActive === false) {
      if (!daysArr.includes(6)) {
        daysArr.push(6);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      fridayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(6), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      fridayArr.map((item) => (item.isActive = false));
      console.log("day", day);
    }
  };

  const handleSaturday = (temp, day) => {
    let saturdayArr = temp.filter((item) => item.dayId === 7);
    if (day.isActive === false) {
      if (!daysArr.includes(7)) {
        daysArr.push(7);
      }
      console.log("daysArr", daysArr);
      setDayCount(dayCount + 1);
      saturdayArr.map((item) => (item.isActive = true));
      console.log("day", day);
    } else if (day.isActive === true) {
      daysArr.splice(daysArr.indexOf(7), 1);
      console.log("daysArr", daysArr);
      setDayCount(dayCount - 1);
      saturdayArr.map((item) => (item.isActive = false));

      console.log("day", day);
    }
  };

  const handleAllDays = () => {
    let temp = [...weekDay];
    if (dayCount === totalDayCount) {
      temp.map((item) => (item.isActive = false));
      setDayCount(0);
      daysArr = [];
      console.log(daysArr);
      console.log("totalDayCount", totalDayCount);
      console.log("dayCount", dayCount);
    } else if (dayCount !== totalDayCount) {
      temp.map((item) => (item.isActive = true));
      setDayCount(totalDayCount);
      let days;
      days = temp.map((item) => Number(item.dayId));
      console.log("days", days);
      //console.log('days', days.includes((5, 6, 7)));
      //daysArr.push(days);
      console.log("totalDayCount", totalDayCount);
      console.log("dayCount", dayCount);
      daysArr.push(...days);
      //  daysArr.push(5, 6, 7);
      console.log("daysArr", daysArr);

      //daysArr.splice(daysArr.indexOf(5), 1);
      //console.log('daysArr', daysArr);
      // if (days.includes(5, 6, 7)) {
      //   daysArr.push(days);
      // }
      //daysArr.push(5, 6, 7);

      //daysArr.push(temp.map((item) => item.dayId));
    }
  };

  const handleDayChange = (day) => {
    let temp = [...weekDay];

    if (day.dayId === 1) {
      handleSunday(temp, { ...day });
    } else if (day.dayId === 2) {
      handleMonday(temp, { ...day });
    } else if (day.dayId === 3) {
      handleTuesday(temp, { ...day });
    } else if (day.dayId === 4) {
      handleWednesday(temp, { ...day });
    } else if (day.dayId === 5) {
      handleThursday(temp, { ...day });
    } else if (day.dayId === 6) {
      handleFriday(temp, { ...day });
    } else if (day.dayId === 7) {
      handleSaturday(temp, { ...day });
    } else {
      console.log("invalid day");
    }
    setWeekDay(temp);
    console.log("temp", temp);
  };

  const onSubmit = (data) => {
    console.log("data schedule", data);
    const { startDate, endDate } = data;
    let fromDateString = `${startDate.getFullYear()}-${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
    let toDateString = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;

    let weekDaysArr = [];
    let weekDaysObj;
    daysArr.map((item) => {
      weekDaysObj = {
        id: item,
      };
      weekDaysArr.push(weekDaysObj);
    });

    console.log("weekDaysArr", weekDaysArr);

    let appointmentSlotsArr = [];
    let appointmentSlotsObj;
    data.consultationTime.map((item) => {
      appointmentSlotsObj = {
        maxBooking: Number(item.maxBooking),
        overBooking: Number(item.overBooking),
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
        slotInMinutes: item.slotInMins,
      };
      appointmentSlotsArr.push(appointmentSlotsObj);
    });

    console.log("appointmentSlotsArr", appointmentSlotsArr);

    //  let change0to12 = appointmentSlotsArr.map((item) => item.fromTime);

    appointmentSlotsArr.map((item) => {
      // let zeroTo12HoursfromTime = item.fromTime.split(":")[0];
      // let zeroTo12MinutesfromTime = item.fromTime.split(":")[1];
      // let zeroTo12SecondsfromTime = item.fromTime.split(":")[2];
      // console.log("zeroTo12", zeroTo12HoursfromTime);
      // if (zeroTo12HoursfromTime === "00") {
      //   zeroTo12HoursfromTime = "12";
      //   item.fromTime =
      //     zeroTo12HoursfromTime +
      //     ":" +
      //     zeroTo12MinutesfromTime +
      //     ":" +
      //     zeroTo12SecondsfromTime;
      // }
      let zeroTo12HoursToTime = item.toTime.split(":")[0];
      let zeroTo12MinutesToTime = item.toTime.split(":")[1];
      let zeroTo12SecondsToTime = item.toTime.split(":")[2];
      console.log("zeroTo12", zeroTo12HoursToTime);
      if (zeroTo12HoursToTime === "00") {
        zeroTo12HoursToTime = "12";
        item.toTime =
          zeroTo12HoursToTime +
          ":" +
          zeroTo12MinutesToTime +
          ":" +
          zeroTo12SecondsToTime;
      }
    });

    // change0to12.map((item) => {
    //   if (item === "00:00:00") {
    //     item = "12:00:00";
    //   }
    // });
    //  console.log("change0to12", change0to12);

    let myObj = {
      appointmentSlotsSchedule: appointmentSlotsArr,
      dayList: weekDaysArr,
      fromDate: fromDateString,
      toDate: toDateString,
      unit: {
        id: Number(
          scheduleData
            ? unitOptions.length > 1
              ? data.unit
              : unitOptions.map((unit) => unit.id)
            : unitOptions.length > 1
            ? data.unit
            : unitOptions.map((unit) => unit.id)
        ),
      },
      employee: {
        id: Number(scheduleData && scheduleData.doctorId),
      },
    };
    !scheduleData && delete myObj.employee;

    console.log("myObj", myObj);
    //setDayCount(0);

    //setScheduleDetails(myObj);

    // reset();
    // let temp = [...weekDay];
    // temp.map((temp1) => (temp1.isChipActive = false));
    // setWeekDay(temp);

    setOpenPost(true);
    setFinalData(myObj);

    // handleSchedulingPost(myObj);
  };

  return (
    <div className="flex flex-col items-center">
      <Box
        className="absolute top-1/2 left-1/2 w-4/5 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4"
        //className="absolute top-28 left-10 right-10 mx-72 border border-gray-100 bg-white rounded-md p-4 shadow-xl translate-y-6 translate-x-6 min-w-fit"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 p-2">
              <div className="text-lg text-customBlue">
                Create Doctor Schedule
              </div>
              {/* <RiCloseCircleFill
                onClick={() => {
                  setShowCreateSchedule(false);
                  setBackdropOpen(false);
                }}
                title="Close "
                color="#0B83A5"
                size={28}
                className="cursor-pointer"
              /> */}
              <CancelPresentationIcon
                onClick={() => {
                  setShowCreateSchedule(false);
                  setBackdropOpen(false);
                }}
                className="cursor-pointer text-red-500"
              />
            </div>
            <div className="py-2 px-4">
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-6 gap-4 p-2 justify-center rounded-md  bg-white">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div
                      className={`flex items-center ${
                        scheduleData ? `col-span-6` : `col-span-2`
                      } gap-4`}
                    >
                      {unitOptions.length > 1 && (
                        <FormControl fullWidth error={Boolean(errors?.unit)}>
                          <InputLabel
                            size="small"
                            id="demo-simple-select-label"
                          >
                            Unit
                          </InputLabel>
                          <Controller
                            control={control}
                            defaultValue=""
                            name={`unit`}
                            render={({ field: { ref, ...field } }) => {
                              return (
                                <Select
                                  {...field}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Unit"
                                  size="small"
                                  {...register("unit", {
                                    onChange: (e) => {
                                      console.log("e", e.target.value);
                                      if (scheduleData) {
                                        getDaysList(
                                          scheduleData.doctorId,
                                          e.target.value
                                        );
                                      } else {
                                        getDaysListWithoutId(e.target.value);
                                      }

                                      // setSelectVal(e.target.value);
                                      // fetchIcpc(e.target.value);
                                    },
                                  })}
                                >
                                  {unitOptions &&
                                    unitOptions.map((unit) => {
                                      return (
                                        <MenuItem value={unit.id}>
                                          {unit.name}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              );
                            }}
                          />
                          <FormHelperText>
                            {errors?.unit?.message}
                          </FormHelperText>
                        </FormControl>
                      )}

                      {unitOptions && unitOptions.length === 1 && (
                        <div className="w-full space-x-2">
                          <span className="text-black">Unit :</span>
                          <span className="text-gray-500">
                            {unitOptions &&
                              unitOptions.map((unit) => unit.name)}
                          </span>
                        </div>
                      )}

                      {scheduleData && (
                        <div className="w-full space-x-2">
                          <span className="text-black">Department :</span>
                          <span className="text-gray-500">
                            {scheduleData && scheduleData.departmentName}
                          </span>
                        </div>
                      )}

                      {/* <FormControl fullWidth error={Boolean(errors?.department)}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name={`department`}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Department"
                          size="small"
                        >
                          {departmentOptions.map((unit) => {
                            return (
                              <MenuItem value={unit.value}>
                                {unit.label}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                  <FormHelperText fullWidth>
                    {errors?.department?.message}
                  </FormHelperText>
                </FormControl> */}

                      {scheduleData && (
                        <div className="w-full space-x-2">
                          <span className="text-black">Doctor Name :</span>
                          <span className="text-gray-500">
                            {scheduleData && scheduleData.doctorName}
                          </span>
                        </div>
                      )}

                      {/* <FormControl fullWidth error={Boolean(errors?.doctorName)}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Doctor Name
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name={`doctorName`}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Doctor Name"
                          size="small"
                        >
                          {doctorNameOptions.map((unit) => {
                            return (
                              <MenuItem value={unit.value}>
                                {unit.label}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                  <FormHelperText>{errors?.doctorName?.message}</FormHelperText>
                </FormControl> */}

                      {/* <div className="w-full space-x-2">
                  <span>Doctor Name :</span>
                  {doctorNameOptions
                    .map(
                      (docName) => docName.value === doctorId && docName.label
                    )
                    .filter((item1) => item1 !== false)
                    .toString()}
                </div> */}
                    </div>

                    {/* {role === "doctor" && (
              <div className="flex items-center col-span-1">
                <FormControl fullWidth error={Boolean(errors?.unit)}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Unit
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name={`unit`}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Unit"
                          size="small"
                        >
                          {unitOptions.map((unit) => {
                            return (
                              <MenuItem value={unit.id}>{unit.name}</MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                  <FormHelperText>{errors?.unit?.message}</FormHelperText>
                </FormControl>
              </div>
            )} */}
                    <div className="flex flex-col space-y-2 col-span-6 p-1">
                      <span className="text-gray-500">Day of Week</span>

                      <div className="flex items-center space-x-2">
                        {weekDay.length !== 0 ? (
                          <button
                            type="button"
                            //disabled={day.isChipActive}
                            className={`${
                              dayCount === totalDayCount
                                ? `bg-cyan-600 text-white px-4 py-1 rounded-md shadow-md`
                                : `shadow-md text-cyan-600 px-4 py-1 rounded-md`
                            }`}
                            //   onClick={() => allDays()}
                            onClick={handleAllDays}
                          >
                            All
                          </button>
                        ) : (
                          <div className="text-gray-400 animate-pulse py-1">
                            No Days Available
                          </div>
                        )}
                        {weekDay &&
                          weekDay.length > 0 &&
                          weekDay.map((day, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`${
                                day.isActive === true
                                  ? `bg-cyan-600 text-white px-4 py-1 rounded-md shadow-md`
                                  : `shadow-md text-cyan-600 px-4 py-1 rounded-md`
                              }`}
                              onClick={() => handleDayChange({ ...day })}
                            >
                              {day.dayValue}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="col-span-1 col-start-1">
                      <FormControl fullWidth error={Boolean(errors?.startDate)}>
                        <Controller
                          control={control}
                          name="startDate"
                          //rules={{ required: true }}
                          render={({ field: { ref, ...field } }) => (
                            <DatePicker
                              open={openDate}
                              onOpen={() => setOpenDate(true)}
                              onClose={() => setOpenDate(false)}
                              {...field}
                              label="Start Date"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="date"
                                  size="small"
                                  fullWidth
                                  onClick={(e) => setOpenDate(true)}
                                  error={Boolean(errors?.startDate)}
                                />
                              )}
                              minDate={current}
                              inputProps={{ readOnly: true }}
                              // mask="____/__/__"
                              inputFormat="dd/MM/yyyy"
                            />
                          )}
                        />
                        <FormHelperText>
                          {errors?.startDate?.message}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="col-span-1">
                      <FormControl fullWidth error={Boolean(errors?.endDate)}>
                        <Controller
                          control={control}
                          name="endDate"
                          // rules={{ required: true }}
                          render={({ field: { ref, ...field } }) => (
                            <DatePicker
                              {...field}
                              label="End Date"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  fullWidth
                                  error={Boolean(errors?.endDate)}
                                />
                              )}
                              minDate={fromDate}
                              inputProps={{ readOnly: true }}
                              //mask="____/__/__"
                              inputFormat="dd/MM/yyyy"
                            />
                          )}
                        />
                        <FormHelperText>
                          {errors?.endDate?.message}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    {/* <div className="col-span-1"></div> */}

                    <div className="col-start-1 col-span-6 space-y-4">
                      {fields.map((item, index) => {
                        return (
                          <div key={index} className="flex items-center gap-4">
                            <div className="col-span-1 w-full">
                              <FormControl
                                error={Boolean(
                                  errors?.consultationTime?.[index]?.startTime
                                )}
                              >
                                <Controller
                                  control={control}
                                  name={`consultationTime[${index}].startTime`}
                                  rules={{ required: true }}
                                  render={({ field: { ref, ...field } }) => (
                                    <TimePicker
                                      {...field}
                                      label="Start Time"
                                      inputProps={{ readOnly: true }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          fullWidth
                                          error={Boolean(
                                            errors?.consultationTime?.[index]
                                              ?.startTime
                                          )}
                                        />
                                      )}
                                    />
                                  )}
                                />
                                <FormHelperText>
                                  {
                                    errors?.consultationTime?.[index]?.startTime
                                      ?.message
                                  }
                                </FormHelperText>
                              </FormControl>
                            </div>
                            <div className="col-span-1 w-full">
                              <FormControl
                                error={Boolean(
                                  errors?.consultationTime?.[index]?.endTime
                                )}
                              >
                                <Controller
                                  control={control}
                                  name={`consultationTime[${index}].endTime`}
                                  rules={{ required: true }}
                                  render={({ field: { ref, ...field } }) => (
                                    <TimePicker
                                      {...field}
                                      label="End Time"
                                      inputProps={{ readOnly: true }}
                                      //minTime={new Date(fromTimeArr[index])}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          fullWidth
                                          error={Boolean(
                                            errors?.consultationTime?.[index]
                                              ?.endTime
                                          )}
                                        />
                                      )}
                                    />
                                  )}
                                />
                                <FormHelperText>
                                  {
                                    errors?.consultationTime?.[index]?.endTime
                                      ?.message
                                  }
                                </FormHelperText>
                              </FormControl>
                            </div>

                            <FormControl
                              fullWidth
                              error={Boolean(
                                errors?.consultationTime?.[index]?.slotInMins
                              )}
                            >
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
                                      label="Slot in minutes"
                                      size="small"
                                    >
                                      {slotInMinsArr &&
                                        slotInMinsArr.map((mins) => {
                                          return (
                                            <MenuItem
                                              value={mins.slotinminutes}
                                            >
                                              {mins.slotinminutes}
                                            </MenuItem>
                                          );
                                        })}
                                      {/* {slotInMinsData?.data.result
                                .filter(
                                  (filterItem) =>
                                    filterItem.slots_in_minutes <=
                                    toTimeInMinsArr[index] -
                                      fromTimeInMinsArr[index]
                                )
                                .map((mins) => {
                                  return (
                                    <MenuItem value={mins.slots_in_minutes}>
                                      {mins.slots_in_minutes}
                                    </MenuItem>
                                  );
                                })} */}
                                      {/* <MenuItem value={20}>20</MenuItem>
                              <MenuItem value={30}>30</MenuItem>
                              <MenuItem value={40}>45</MenuItem>
                              <MenuItem value={60}>60</MenuItem> */}
                                    </Select>
                                  );
                                }}
                              />
                              <FormHelperText>
                                {
                                  errors?.consultationTime?.[index]?.slotInMins
                                    ?.message
                                }
                              </FormHelperText>
                            </FormControl>

                            <FormControl fullWidth>
                              <TextField
                                fullWidth
                                size="small"
                                label="Max Booking"
                                type="number"
                                className="col-span-1"
                                name={`consultationTime[${index}].maxBooking`}
                                {...register(
                                  `consultationTime[${index}].maxBooking`
                                )}
                                error={Boolean(
                                  errors?.consultationTime?.[index]?.maxBooking
                                )}
                                helperText={
                                  errors?.consultationTime?.[index]?.maxBooking
                                    ?.message
                                }
                              />
                              <FormHelperText></FormHelperText>
                            </FormControl>

                            <FormControl fullWidth>
                              <TextField
                                fullWidth
                                size="small"
                                label="Over Booking"
                                type="number"
                                className="col-span-1"
                                name={`consultationTime[${index}].overBooking`}
                                {...register(
                                  `consultationTime[${index}].overBooking`
                                )}
                                error={Boolean(
                                  errors?.consultationTime?.[index]?.overBooking
                                )}
                                helperText={
                                  errors?.consultationTime?.[index]?.overBooking
                                    ?.message
                                }
                              />
                              <FormHelperText></FormHelperText>
                            </FormControl>

                            <div className="flex items-center space-x-4 w-full col-span-1">
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
                                    if (
                                      maxBooking === "" &&
                                      overBooking === "" &&
                                      startTime === "" &&
                                      endTime === "" &&
                                      slotInMins === ""
                                    ) {
                                      setErrorMsg(
                                        "visible text-red-600 text-sm ml-2"
                                      );
                                    } else {
                                      append({
                                        maxBooking: null,
                                        overBooking: null,
                                        startTime: null,
                                        endTime: null,
                                        slotInMins: "",
                                      });
                                      setErrorMsg("invisible");
                                    }
                                  }}
                                  title="Add"
                                  className="cursor-pointer mt-1"
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <p className={errorMsg}>
                        Please Add Consultation Details
                      </p>

                      {/* <button
                type="button"
                onClick={() => {
                  temp1 = [...weekDay];
                  console.log("temp", temp1);
                  setWeekDay(temp1);
                }}
              >
                Change
              </button> */}
                    </div>

                    {/* <button
                    type="submit"
                    className="col-span-6 px-2 py-1 text-cyan-600 border border-cyan-600 rounded-md w-20 mx-auto -mt-8"
                  >
                    Submit
                  </button> */}
                  </LocalizationProvider>
                </div>

                {loading ? (
                  <Backdrop
                    sx={{
                      color: "white",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4">
              {" "}
              {/* <button
                type="button"
                onClick={() => {
                  setShowCreateSchedule(false);
                  setBackdropOpen(false);
                }}
                className="border border-customBlue py-2 px-4 rounded-md text-customBlue"
              >
                Close
              </button> */}
              <CloseButton
                onClick={() => {
                  setShowCreateSchedule(false);
                  setBackdropOpen(false);
                }}
              />
              <button
                disabled={weekDay.length === 0 ? true : false}
                // className="py-2 px-4 rounded-md bg-customBlue text-white"
                className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
                type="submit"
                // h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Box>
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to create this schedule?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
};

export default Scheduling;
