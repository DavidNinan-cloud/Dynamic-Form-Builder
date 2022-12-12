import apiClient from "../../http-common";
import apiClient1 from "../../http-common-appointment";
import authHeader from "../../../authentication/authservices/auth-header";

//Dashboard Card
export const getDashboardCardDetails = () => {
  return apiClient.get(`/dashboard/getDashboardCount`, {
    headers: authHeader(),
  });
};

//Patient Servey Chart
export const getPatientServey = () => {
  return apiClient.get(`/dashboard/getPatientSurvey`, {
    headers: authHeader(),
  });
};

//Booked Appointment
export const getBookedAppointment = (details) => {
  return apiClient1.post(`/appointment/appointmentList`, details, {
    headers: authHeader(),
  });
};

//Doctor List

export const getDoctorList = () => {
  return apiClient.get(`/dashboard/getDoctorStatusList`, {
    headers: authHeader(),
  });
};
