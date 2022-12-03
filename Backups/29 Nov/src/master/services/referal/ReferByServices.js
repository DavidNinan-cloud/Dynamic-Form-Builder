//base url for api
import apiClient from "../../http-common";
import { referByUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllReferBy = (searchReferByObj) => {
  return apiClient.post(`/${referByUrl}/referbylist`, searchReferByObj, {
    headers: authHeader(),
  });
};

//autocomplte search bar api
export const autoSearchReferBy = (searchString) => {
  console.log("search string", searchString);
  return apiClient.get(`${referByUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewReferBy = async (createReferBy) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createReferBy)
  );
  return await apiClient.post(`/referby`, createReferBy, {
    headers: authHeader(),
  });
};

//get record by id
export const getReferById = (id) => {
  return apiClient.get(`/referby/${id}`, { headers: authHeader() });
};

//update request refer by
export const updateReferBy = async (upateReferBy) => {
  return await apiClient.put(`/referby`, upateReferBy, {
    headers: authHeader(),
  });
};

//delete api call for delete
export const deleteReferById = async (id) => {
  return await apiClient.delete(`/referby/${id}`, { headers: authHeader() });
};

//get Refer type dropdown
export const getReferTypeList = () => {
  console.log("call refer type");
  return apiClient.get(`/reftertype/dropdown`, { headers: authHeader() });
};
