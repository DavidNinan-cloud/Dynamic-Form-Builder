import apiClient from "../../../http-common";
import {drugUrl} from "./constant"

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

//Post request to recieve all the list of cities from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllDrug = async (searchDrugObj) => {
  console.log(searchDrugObj);

  return await apiClient.post(`/${drugUrl}/druglist`, searchDrugObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewDrug = async (createDrug) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createDrug)
  );
  return await apiClient.post(`/drug`, createDrug, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getDrugById = async (id) => {
  return await apiClient.get(`drug/${id}`, {
    headers: authHeader(),
  });
};

//Delete request to delete the data
export const deleteDrugById = async (id) => {
  return await apiClient.delete(`/drug/${id}`, {
    headers: authHeader(),
  });
};

//Put request to update the data
export const updateDrug = async (updateDrugObj) => {
  return await apiClient.put(`/area`, updateDrugObj, {
    headers: authHeader(),
  });
};

//auto search the area
export const autoSearchDrug = async (searchString) => {
  return await apiClient.get(`drug/search/${searchString}`, {
    headers: authHeader(),
  });
};
