import apiClient from '../../http-common'
import apiClientOpd from '../../http-common-opd'
import authHeader from "../../../authentication/authservices/auth-header";
// /masters/appointment/autocompleteMobileNumber/{mobileNumber}
export const fetchAppointmentsSearch = (input) => {
  return apiClientOpd.post(`/appointment/autocompleteMobileNumber/${input}`,input , {headers:authHeader()});
};

export const fetchAllAppointments = (searchAppObj) => {
    return apiClientOpd.post(`/appointment/appointmentList`, searchAppObj , {headers:authHeader()});
  };

// get TimeSlots
export const getTimeSlotsApi = (appointmentDate,doctorId) => {
  // console.log("departmentId",mobileNumber)
  return apiClient.get(`/api/doctorSchedule/getSlotsDetails?appointmentDate=${appointmentDate}&doctorId=${doctorId}`
  , {headers:authHeader()}
  );
};

// Post reschedual
export const rescheduleAppointment = (reschedualAppObj) => {
  console.log(reschedualAppObj);
  return apiClientOpd.post(`/appointment/reschedule`, reschedualAppObj , {headers:authHeader()});
};

// cancel Appointment
export const cancelAppointment = (appointmentId , reason) => {
  // console.log("departmentId",mobileNumber)
  return apiClientOpd.get(`/appointment/cancel/${appointmentId}/${reason}`, {headers:authHeader()});
};