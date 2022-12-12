import apiClient from "../../http-common";
import { apptBookingSourceUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllApptBookingSource = (searchApptBookingSource) => {
  return apiClient.post(
    `/${apptBookingSourceUrl}/appointmentbookinglist`,
    searchApptBookingSource,
    { headers: authHeader() }
  );
};
//autocomplte search bar api
export const autoSearchApptBookingSource = (searchString) => {
  return apiClient.get(`/${apptBookingSourceUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//get country
export const getUnitList = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Post request to save the modal form data into the database.
export const addNewAppointmentBookingSource = async (
  createAppointmentBookingSource
) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createAppointmentBookingSource)
  );
  return await apiClient.post(
    `/appointmentbooking`,
    createAppointmentBookingSource,
    { headers: authHeader() }
  );
};

//edit by id api
export const getAppointmentBookingSourceById = (id) => {
  return apiClient.get(`/appointmentbooking/${id}`, { headers: authHeader() });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteAppointmentBookingSourceById = async (id) => {
  return await apiClient.delete(`/appointmentbooking/${id}`, {
    headers: authHeader(),
  });
};

//update request
export const updateAppointmentBookingSource = async (
  updateAppoinmentBooking
) => {
  return await apiClient.put(`appointmentbooking`, updateAppoinmentBooking, {
    headers: authHeader(),
  });
};
