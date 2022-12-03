//base url for api
import apiClient from "../../http-common";
import { symptomsUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllSymptoms = async (searchSymptomsObj) => {
  console.log("org data from post");
  return apiClient.post(`/${symptomsUrl}/symptomslist`, searchSymptomsObj, {
    headers: authHeader(),
  });
};

//autocomplte search bar api
export const autoSearchSymptoms = (searchString) => {
  return apiClient.get(`/${symptomsUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewSymptoms = async (createSymptoms) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createSymptoms)
  );
  return await apiClient.post(`/symptoms`, createSymptoms, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getSymptomsById = (symptomsid) => {
  console.log("in servi c e " + symptomsid + "id");
  return apiClient.get(`/symptoms/${symptomsid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteSymptomsById = async (id) => {
  return await apiClient.delete(`/symptoms/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateSymptoms = async (symptomsUpdate) => {
  return await apiClient.put(`/symptoms`, symptomsUpdate, {
    headers: authHeader(),
  });
};

//get department
export const getSymptomsDropdown = () => {
  return apiClient.get("/symptoms/dropdown", { headers: authHeader() });
};
