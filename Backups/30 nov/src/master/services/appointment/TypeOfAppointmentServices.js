import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";
import { typeofappointementUrl } from "../../services/appointment/constant";

//get list of record from api and show in table
export const fetchAllTypeOfAppointment = (searchtypeofappointment) => {
  return apiClient.post(
    `${typeofappointementUrl}/appointmenttypelist`,
    searchtypeofappointment,
    { headers: authHeader() }
  );
};
//Post request to save the modal form data into the database.
export const addNewTypeOfAppointment = async (createTypeOfAppointment) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createTypeOfAppointment)
  );
  return await apiClient.post("/appointmenttype", createTypeOfAppointment, {
    headers: authHeader(),
  });
};

//autocomplte search bar api
export const autoSearchTypeOfAppointment = (searchString) => {
  return apiClient.get(`${typeofappointementUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getTypeOfAppoinmentById = (id) => {
  return apiClient.get(`/appointmenttype/${id}`, { headers: authHeader() });
};

//DELETE country
export const deleteTypeOfAppointmentById = async (id) => {
  return await apiClient.delete(`/appointmenttype/${id}`, {
    headers: authHeader(),
  });
};

//update request
export const updateTypeOfAppointment = async (typeOfAppointment) => {
  return await apiClient.put(`appointmenttype`, typeOfAppointment, {
    headers: authHeader(),
  });
};
