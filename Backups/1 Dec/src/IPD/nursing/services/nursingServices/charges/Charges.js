import { ipdApi } from "../../../../http-common";
import apiClient from "../../../../../emergency/http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

// search data , Get request to fetch the autocomplete options
export const autoSearchService = (searchString) => {
  // http://192.168.0.124:8095/masters/services/search/f
  console.log(
    "Search Service is " + JSON.stringify(searchString));
  return apiClient.get(`/services/search/${searchString}`, {
    headers: authHeader(),
  });
};

// getDoctore department Id service
export const getDoctorDropdown = () => {
  console.log(
    "Get Doctor Dropdown options is : ",getDoctorDropdown
  );
  return apiClient.get(`/employees/getDoctorList`, { headers: authHeader() });
};

//GET Service API For Charges tab 1st [Listing] Table
export const getAllCharges = (id) => {
    // /ipd/ipd/patientassessment/getCharges?visitId=1122
    console.log("fetch all Charges List :" + id);
    console.log('--------',typeof(id));
    return ipdApi.get(`/patientassessment/getCharges?visitId=${id}`,{
      headers: authHeader(),
    });
  };

//POST SERVICES For Save Weight
export const addNewCharges = async (createCharges) => {
  console.log(
    "Object sent for Charges data record creation is " + JSON.stringify(createCharges)
  );
  return await ipdApi.post(`/patientassessment/savePatientCharges`, createCharges, {
    headers: authHeader(),
  });
};

