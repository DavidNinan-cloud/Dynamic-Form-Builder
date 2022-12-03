//base url for api
import apiClient from "../../http-common";
import { vitalUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllVital = async (searchVitalObj) => {
  console.log("org data from post");
  return apiClient.post(
    `/${vitalUrl}/vitallist`,
    searchVitalObj,
    { headers: authHeader() }
  );
};
//autocomplte search bar api
export const autoSearchVital = (searchString) => {
  return apiClient.get(`/${vitalUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewVital = async (createVital) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createVital)
  );
  return await apiClient.post(`/vital`, createVital, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getVitalById = (vitalid) => {
  console.log("in service " + vitalid + "id");
  return apiClient.get(`/vital/${devitalidptid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteVitalById = async (id) => {
  return await apiClient.delete(`/vital/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateVital = async (vitalUpdate) => {
  return await apiClient.put(`/vital`, vitalUpdate, {
    headers: authHeader(),
  });
};

//get department
export const getVitalDropdown = () => {
  return apiClient.get("/vital/dropdown", { headers: authHeader() });
};
