//base url for api
import apiClient from "../../http-common";
import { doseFrequencyUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllDoseFrequency = async (searchDoseFrequencyObj) => {
  console.log("org data from post");
  return apiClient.post(
    `/${doseFrequencyUrl}/frequencylist`,
    searchDoseFrequencyObj,
    { headers: authHeader() }
  );
};

//autocomplte search bar api
export const autoSearchDoseFrequency = (searchString) => {
  return apiClient.get(`/${doseFrequencyUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewDoseFrequency = async (createDoseFrequency) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createDoseFrequency)
  );
  return await apiClient.post(`/frequency`, createDoseFrequency, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getDoseFrequencyById = (frequencyid) => {
  console.log("in servi c e " + frequencyid + "id");
  return apiClient.get(`/frequency/${frequencyid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteDoseFrequencyById = async (id) => {
  return await apiClient.delete(`/frequency/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateDoseFrequency = async (doseFrequencyUpdate) => {
  return await apiClient.put(`/frequency`, doseFrequencyUpdate, {
    headers: authHeader(),
  });
};

//get department
export const getDoseFrequencyDropdown = () => {
  return apiClient.get("/frequency/dropdown", { headers: authHeader() });
};
