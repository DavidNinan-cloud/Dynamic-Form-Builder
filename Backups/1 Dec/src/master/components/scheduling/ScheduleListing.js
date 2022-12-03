import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Switch } from "@mui/material";
import {
  MdDelete,
  MdAddCircleOutline,
  MdModeEditOutline,
  MdOutlineAddCircle,
  MdAddCircle,
  MdDeleteOutline,
} from "react-icons/md";
import { styled } from "@mui/material/styles";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  getScheduleListing,
  getScheduleListingWithoutId,
} from "../../services/scheduling/SchedulingServices";
import { disableSlot } from "../../services/scheduling/SchedulingServices";
import {
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";
import {
  useLocation,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

// import {
//   useDayOfWeek,
//   useDoctorScheduleList,
// } from "../../services/useReactQueryData";

// import {
//   postSchedulingData,
//   disableDay,
//   disableSlot,
// } from "../../services/user.service";

// import EditDoctorScheduleModal from "../modals/EditDoctorScheduleModal";
import EditDoctorScheduleComponent from "./EditDoctorScheduleComponent";
import EditScheduleDateComponent from "./EditScheduleDateComponent";
import AddDoctorScheduleComponent from "./AddDoctorScheduleComponent";
import DeleteScheduleComponent from "./DeleteScheduleComponent";

import { Link } from "react-router-dom";
import Scheduling from "./Scheduling";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

let scheduleData;
let roleObj = {};

const ScheduleListing = () => {
  const [unitArr2, setUnitArr2] = React.useState([]);

  const formOptions = {
    mode: "onChange",
    defaultValues: {
      unit1: {
        label: "",
        value: "",
      },
    },
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  let watchUnit = watch("unit1");

  console.log("watchUnit", watchUnit);

  const [spinner, showSpinner] = useState(false);

  const [recordWarning, showRecordWarning] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const [unitArr, setUnitArr] = React.useState([]);

  scheduleData = location.state;

  let paramsData;

  useEffect(() => {
    roleObj = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("roleObj", roleObj);
  }, []);

  useEffect(() => {
    if (scheduleData) {
      console.log("scheduleData", scheduleData);
      console.log("paramsData", paramsData);
      console.log("units", scheduleData.units);
      fetchScheduleList(scheduleData.doctorId, watchUnit.value);
      //console.log("unitArr2[0]", unitArr2 && unitArr2[0]);
    } else {
      console.log("not scheduleData", scheduleData);
      console.log("watchUnit.value", watchUnit.value);
      fetchScheduleListWithoutId(watchUnit.value);
    }
  }, [watchUnit, unitArr2]);

  useEffect(() => {
    if (scheduleData) {
      console.log("scheduleData.units", scheduleData.units);

      // scheduleData.units.map((unit) => {
      //   let myObj = {
      //     id: unit.id,
      //     name: unit.name,
      //   };
      //   unitArr.push(myObj);
      // });

      scheduleData.units.map((unit) => {
        let myObj = {
          value: unit.id,
          label: unit.name,
        };
        unitArr2.push(myObj);
      });

      reset({
        unit1: {
          label: unitArr2[0].label,
          value: unitArr2[0].value,
        },
      });

      console.log("unitArr2", unitArr2[0].label);
      console.log("...scheduleData.units", ...scheduleData.units);
      console.log("scheduleData.units", scheduleData.units);
      console.log("unitArr", unitArr);
    } else {
      // roleObj.units.map((unit) => {
      //   let myObj = {
      //     id: unit.id,
      //     name: unit.label,
      //   };
      //   unitArr.push(myObj);
      // });

      roleObj.units.map((unit) => {
        let myObj = {
          value: unit.id,
          label: unit.label,
        };
        unitArr2.push(myObj);
      });

      reset({
        unit1: {
          label: unitArr2[0].label,
          value: unitArr2[0].value,
        },
      });
      console.log("unitArr2[0].label", unitArr2[0].label);
      console.log("not schedule data");
    }
  }, [unitArr2]);

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

  const [loading, setLoading] = React.useState();

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState();
  const [responseMsg, setResponseMsg] = React.useState();

  // const handleChange = (e, dayOfWeek, slotId) => {
  //   setChecked(e.target.checked);
  //   handleSlotToggle(checked, dayOfWeek, slotId);
  // };

  const [editDateObj, setEditDateObj] = useState({});

  //   const {
  //     data: doctorScheduleList,
  //     isLoading: isDoctorScheduleLoading,
  //     isFetching,
  //     refetch,
  //   } = useDoctorScheduleList();
  const [dayId, setDayId] = useState(null);

  const [daytoggle, setDayToggle] = useState();
  const [toggle, setToggle] = useState();

  const [scheduleDetails, setScheduleDetails] = useState([]);

  //   const handleDayToggle = async (e, dayOfWeek) => {
  //     console.log("dayOfWeek", dayOfWeek);
  //     // disableDay(dayOfWeek, !e.target.checked);
  //     //refetch();
  //     setLoading(true);
  //     try {
  //       let res = await disableDay(dayOfWeek, !e.target.checked);
  //       console.log("res", res);
  //       if (res.status === 200) {
  //         refetch();
  //         setResponse(res.status);
  //         setResponseMsg("Day Disable");
  //         handleAlertClick({
  //           vertical: "top",
  //           horizontal: "right",
  //         });
  //       }
  //       setError(null);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //       console.log("After successful day disable");
  //     }
  //   };

  // const handleSlotToggle = (e, dayOfWeek, slotId) => {
  //   console.log("dayOfWeek", dayOfWeek);
  //   disableSlot(dayOfWeek, slotId);
  //   successAlert();
  //   fetchScheduleList();
  //   //refetch();
  // };

  const handleSlotToggle = async (e, dayOfWeek, slotId) => {
    try {
      let res1 = await disableSlot(dayOfWeek, slotId);
      console.log("res1", res1);
      if (res1.status === 200) {
        successAlert();
        fetchScheduleList(scheduleData.doctorId, watchUnit.value);
        setResponseMsg("Slot Disable");
        handleAlertClick({
          vertical: "top",
          horizontal: "right",
        });
      }
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      console.log("After successful slot disable");
    }
  };

  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [showDeleteSchedule, setShowDeleteSchedule] = useState(false);

  const [showEditScheduleDate, setShowEditScheduleDate] = useState(false);

  const [editScheduleObj, setEditScheduleObj] = useState({});

  const [scheduleListing, setScheduleListing] = useState([]);

  const [loadingScheduleListing, setLoadingScheduleListing] = useState();

  const [removeSlotObj, setRemoveSlotObj] = useState({});

  const [editScheduleArr, setEditScheduleArr] = useState([]);
  const [addScheduleArr, setAddScheduleArr] = useState([]);

  const handleScheduleDelete = (item, itemIndex) => {
    setScheduleDetails((schedule) =>
      schedule.filter((scheduleItem, index) => index !== itemIndex)
    );
  };

  const handleEditSchedule = (
    schedule,
    fromDate,
    toDate,
    dayValue,
    dsId,
    timeDtoList
  ) => {
    console.log("schedule", schedule);
    console.log("timeDtoList", timeDtoList);
    setEditScheduleArr(timeDtoList);
    console.log("editScheduleArr", editScheduleArr);
    console.log("timeDtoList", timeDtoList);
    setEditScheduleObj({
      ...schedule,
      fromDate: fromDate,
      toDate: toDate,
      dayValue: dayValue,
      dsId: dsId,
    });
    setBackdropOpen(true);
    setShowEditSchedule(true);
    // editScheduleObj.fromDate = fromDate;
    // editScheduleObj.toDate = toDate;
    console.log("editScheduleObj", editScheduleObj);

    //console.log('editScheduleObj', editScheduleObj);
    //setEditScheduleObj = { schedule };
  };

  const handleAddSchedule = (slotDetails, schedule) => {
    setBackdropOpen(true);
    setShowAddSchedule(true);
    console.log(slotDetails);
    console.log("schedule", schedule);
    setEditScheduleObj(schedule);
    setAddScheduleArr([slotDetails]);
    console.log("addScheduleArr", addScheduleArr);
  };

  const handleEditScheduleDate = (fromDate, toDate, dayOfWeek) => {
    setEditDateObj({ fromDate, toDate, dayOfWeek });
    console.log("editDateObj", editDateObj);
    setBackdropOpen(true);
    setShowEditScheduleDate(true);

    console.log(fromDate, toDate);
  };

  const handleRemoveSlot = (schedule) => {
    console.log(schedule);
    const { dayOfWeek, appointmentSlotScheduleId } = schedule;
    setRemoveSlotObj({ dayOfWeek, appointmentSlotScheduleId });
    console.log("removeSlotObj", removeSlotObj);
    setBackdropOpen(true);
    setShowDeleteSchedule(true);
  };

  // useEffect(() => {
  //   fetchScheduleList();
  // }, []);

  const handleCreateSchedule = () => {
    setBackdropOpen(true);
    setShowCreateSchedule(true);
    console.log("scheduleData create schedule", scheduleData);
  };

  const fetchScheduleList = (doctorId, unitId) => {
    showSpinner(true);
    showRecordWarning(false);
    getScheduleListing(doctorId, unitId)
      .then((response) => {
        console.log("The list of schedule listing" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setScheduleListing(response.data.result);
        console.log("days response", response.data.result);
        //setLoadingScheduleListing(false);
        showSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  const fetchScheduleListWithoutId = (unitId) => {
    showSpinner(true);
    showRecordWarning(false);
    getScheduleListingWithoutId(unitId)
      .then((response) => {
        console.log("The list of schedule listing" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setScheduleListing(response.data.result);
        console.log("days response", response.data.result);
        //setLoadingScheduleListing(false);
        showSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //   useEffect(() => {
  //     refetch();
  //     console.log("use-effect executed");
  //   }, [doctorScheduleList?.data.result, response, error, loading, responseMsg]);

  let slotToggle = watch("slotToggle");

  console.log("slotToggle", slotToggle);

  const onSubmit = (data) => {
    console.log(data);
  };

  //   if (isDoctorScheduleLoading) {
  //     return <h2>Loading...</h2>;
  //   }
  return (
    <div className="flex flex-col mt-20 mx-10">
      <form>
        {/* <FormControl className="w-1/4 my-4" size="small">
          <InputLabel id="demo-simple-select-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unit}
            label="Unit"
            onChange={handleUnitChange}
            size="small"
          >
            {unitArr &&
              unitArr.map((unit) => {
                return <MenuItem value={unit.id}>{unit.name}</MenuItem>;
              })}
          </Select>
        </FormControl> */}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl text-gray-700 font-Poppins">Schedule</span>
            {unitArr2 && unitArr2.length > 1 && (
              <div className="w-full">
                <DropdownField
                  control={control}
                  name="unit1"
                  label="Unit"
                  dataArray={unitArr2 && unitArr2}
                  isSearchable={false}
                  placeholder="Unit"
                  isClearable={false}
                />
              </div>
            )}
          </div>
          {scheduleData ? (
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleCreateSchedule}
            >
              <AddIcon />
            </Fab>
          ) : (
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleCreateSchedule}
            >
              <AddIcon />
            </Fab>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 my-4">
          {scheduleListing &&
          scheduleListing.length > 0 &&
          spinner === false ? (
            scheduleListing.map((schedule) => {
              return (
                <div className="flex flex-col shadow-md rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div>
                        <span className="text-lg font-semibold">
                          {schedule.dayValue}
                        </span>
                      </div>
                      <div>
                        {/* <Switch
                          checked={!schedule.isDayDisable}
                          // onChange={(e) =>
                          //   handleDayToggle(e, schedule.dayOfWeek)
                          // }
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                        /> */}
                        {/* <IOSSwitch
                          sx={{ m: 1 }}
                          defaultChecked={!schedule.isDayDisable}
                          size="small"
                        /> */}
                        <AntSwitch
                          defaultChecked={!schedule.isDayDisable}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <MdAddCircleOutline
                        color="#0B83A5"
                        size={24}
                        className="cursor-pointer"
                        title="Add"
                        onClick={() => {
                          handleAddSchedule(schedule.timeDtoList, {
                            ...schedule,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between my-2">
                    <div className="space-x-2">
                      <span className="text-sm font-semibold">
                        {schedule.fromDate}
                      </span>
                      <span className="text-sm">to</span>
                      <span className="text-sm font-semibold">
                        {schedule.toDate}
                      </span>
                    </div>
                    {!schedule.isDayDisable && (
                      <MdModeEditOutline
                        size={22}
                        color="#0B83A5"
                        className="cursor-pointer mb-1"
                        title="Edit date"
                        onClick={() => {
                          handleEditScheduleDate(
                            schedule.fromDate,
                            schedule.toDate,
                            schedule.dayOfWeek
                          );
                        }}
                      />
                    )}
                  </div>
                  {schedule.timeDtoList.map((time) => {
                    return (
                      <div className="flex flex-col space-y-1 my-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="space-x-2">
                              <span className="font-semibold text-md">
                                Slot Duration
                              </span>
                              <span>-</span>
                              <span className="text-md">
                                {time.slotsPerMinutes} mins
                              </span>
                            </div>
                            <AntSwitch
                              checked={!time.isDisableSlot}
                              // defaultChecked={!time.isDisableSlot}
                              inputProps={{ "aria-label": "ant design" }}
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            {!time.isDisableSlot && (
                              <div className="flex items-center">
                                <MdModeEditOutline
                                  size={20}
                                  color="#0B83A5"
                                  className="cursor-pointer"
                                  title="Edit "
                                  onClick={() => {
                                    handleEditSchedule(
                                      time,
                                      schedule.fromDate,
                                      schedule.toDate,
                                      schedule.dayValue,
                                      schedule.dsId,
                                      schedule.timeDtoList
                                    );
                                  }}
                                />

                                {/* <Switch defaultChecked={!time.isDisableSlot} size="small" /> */}
                              </div>
                            )}

                            {/* <Switch
                              checked={!time.isDisableSlot}
                              onChange={(e) =>
                                handleSlotToggle(
                                  e,
                                  time.dayOfWeek,
                                  time.appointmentSlotScheduleId
                                )
                              }
                              inputProps={{ "aria-label": "controlled" }}
                              size="small"
                            /> */}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <span className="text-sm">{time.fromTime}</span>
                          <span>To</span>
                          <span className="text-sm">{time.toTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="space-x-2">
                            <span>Max Booking : {time.maxBooking}</span>

                            <span>Over Booking : {time.overBooking}</span>
                          </div>
                          <div>
                            <MdDeleteOutline
                              size={22}
                              color="red"
                              className="cursor-pointer self-end"
                              title="Delete"
                              onClick={() => {
                                handleRemoveSlot({ ...time });
                              }}
                            />
                          </div>
                        </div>
                        {schedule.timeDtoList.length > 1 && (
                          <div className="border" />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="text-gray-600">
              Please create your schedule first !
            </div>
          )}
        </div>
      </form>
      <div className="flex flex-col">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
          //onClick={() => setBackdropOpen(false)}
        >
          {showEditScheduleDate && (
            <EditScheduleDateComponent
              showEditScheduleDate={showEditScheduleDate}
              setShowEditScheduleDate={setShowEditScheduleDate}
              editDateObj={editDateObj}
              // refetch={refetch}
              setLoading={setLoading}
              setResponse={setResponse}
              setError={setError}
              setResponseMsg={setResponseMsg}
              handleAlertClick={handleAlertClick}
              setBackdropOpen={setBackdropOpen}
              fetchScheduleList={fetchScheduleList}
            />
          )}
          {showAddSchedule && (
            <AddDoctorScheduleComponent
              showAddSchedule={showAddSchedule}
              setShowAddSchedule={setShowAddSchedule}
              editScheduleObj={editScheduleObj}
              setEditScheduleObj={setEditScheduleObj}
              addScheduleArr={addScheduleArr}
              //refetch={refetch}
              setLoading={setLoading}
              setResponse={setResponse}
              setError={setError}
              setResponseMsg={setResponseMsg}
              handleAlertClick={handleAlertClick}
              setBackdropOpen={setBackdropOpen}
            />
          )}
          {showEditSchedule && (
            <EditDoctorScheduleComponent
              showEditSchedule={showEditSchedule}
              setShowEditSchedule={setShowEditSchedule}
              editScheduleObj={editScheduleObj}
              setEditScheduleObj={setEditScheduleObj}
              //refetch={refetch}
              editScheduleArr={editScheduleArr}
              setEditScheduleArr={setEditScheduleArr}
              setLoading={setLoading}
              setResponse={setResponse}
              setError={setError}
              setResponseMsg={setResponseMsg}
              handleAlertClick={handleAlertClick}
              setBackdropOpen={setBackdropOpen}
            />
          )}
          {showDeleteSchedule && (
            <DeleteScheduleComponent
              showDeleteSchedule={showDeleteSchedule}
              setShowDeleteSchedule={setShowDeleteSchedule}
              removeSlotObj={removeSlotObj}
              setRemoveSlotObj={setRemoveSlotObj}
              // refetch={refetch}
              setLoading={setLoading}
              setResponse={setResponse}
              setError={setError}
              setResponseMsg={setResponseMsg}
              handleAlertClick={handleAlertClick}
              setBackdropOpen={setBackdropOpen}
              fetchScheduleList={fetchScheduleList}
            />
          )}
          {showCreateSchedule && (
            <Scheduling
              showCreateSchedule={showCreateSchedule}
              setShowCreateSchedule={setShowCreateSchedule}
              setBackdropOpen={setBackdropOpen}
              scheduleData={scheduleData}
              fetchScheduleList={fetchScheduleList}
              fetchScheduleListWithoutId={fetchScheduleListWithoutId}
            />
          )}
        </Backdrop>
      </div>
      {/* {response === 200 && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={12000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: "100%", marginTop: "50px" }}
          >
            {responseMsg === "Add Schedule" && "Schedule Added Successfully!"}
            {responseMsg === "Edit Schedule" &&
              "Schedule Edited Successfully !"}
            {responseMsg === "Delete Schedule" &&
              "Schedule Deleted Successfully !"}
            {responseMsg === "EditDate Schedule" &&
              "Schedule Dated Edited Successfully !"}
            {responseMsg === "Day Disable" && "Day Toggeled Successfully !"}
            {responseMsg === "Slot Disable" && "Slot Toggeled Successfully !"}
          </Alert>
        </Snackbar>
      )} */}
      {/* {loading ? (
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )} */}
      {/* {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : null} */}
    </div>
  );
};

export default ScheduleListing;
