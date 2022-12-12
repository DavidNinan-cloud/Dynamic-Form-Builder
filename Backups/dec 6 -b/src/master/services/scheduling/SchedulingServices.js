import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//get country
export const getUnitDropdown = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//get department
export const getDepartmentDropdown = () => {
  return apiClient.get("/departments/dropdown", { headers: authHeader() });
};

//get days
export const getDays = (doctorId, unitId) => {
  return apiClient.get(
    `/api/doctorSchedule/getDoctorDayList/${doctorId}/${unitId}`,
    {
      headers: authHeader(),
    }
  );
};

export const getDaysWithoutId = (unitId) => {
  return apiClient.get(`/api/doctorSchedule/getDoctorDayList/${unitId}`, {
    headers: authHeader(),
  });
};

// get doctor names
export const getDoctors = (departmentId) => {
  return apiClient.get(`/employees/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

// //get schedule listing
// export const getScheduleListing = () => {
//   return apiClient.get("/api/doctorSchedule/scheduleList", {
//     headers: authHeader(),
//   });
// };

//get schedule listing
export const getScheduleListing = (drId, unitId) => {
  return apiClient.get(`/api/doctorSchedule/scheduleList/${drId}/${unitId}`, {
    headers: authHeader(),
  });
};

export const getScheduleListingWithoutId = (unitId) => {
  return apiClient.get(`/api/doctorSchedule/scheduleList/${unitId}`, {
    headers: authHeader(),
  });
};

//get slot in mins
export const getSlotInMins = () => {
  return apiClient.get("/api/doctorSchedule/slotsInMinutes", {
    headers: authHeader(),
  });
};

//save scheduling
export const postSchedulingData = (schedulingData) => {
  console.log(
    "Object sent for scheduling creation is " + JSON.stringify(schedulingData)
  );
  return apiClient.post(
    "/api/doctorSchedule/saveDoctorSchedule",
    schedulingData,
    {
      headers: authHeader(),
    }
  );
};

//get doctor list
export const fetchDoctorList = (listObject) => {
  return apiClient.post("/api/doctorSchedule/doctorList", listObject, {
    headers: authHeader(),
  });
};

// edit schedule date
export const updateScheduleDate = (dayId, fromDate, toDate) => {
  return apiClient.get(
    `/api/doctorSchedule/updateDate?dayId=${dayId}&fromDate=${fromDate}&toDate=${toDate}`,
    {
      headers: authHeader(),
    }
  );
};

// remove slot
export const removeSlot = (dayId, slotId) => {
  return apiClient.get(
    `/api/doctorSchedule/removeSlot?dayId=${dayId}&slotId=${slotId}`,
    {
      headers: authHeader(),
    }
  );
};

// disable slot
export const disableSlot = (dayId, slotId) => {
  return apiClient.get(
    `/api/doctorSchedule/disableSlot?dayId=${dayId}&slotId=${slotId}`,
    {
      headers: authHeader(),
    }
  );
};
