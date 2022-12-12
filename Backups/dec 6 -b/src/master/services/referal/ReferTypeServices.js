//base url for api
import apiClient from "../../http-common";
import { referTypeUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllReferType = (searchReferTypeObj) => {
  return apiClient.post(`/${referTypeUrl}/refertypelist`, searchReferTypeObj, {
    headers: authHeader(),
  });
};

//autocomplte search bar api
export const autoSearchReferType = (searchString) => {
  console.log("search string", searchString);
  return apiClient.get(`${referTypeUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewReferType = async (createReferType) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createReferType)
  );
  return await apiClient.post(`/refertype`, createReferType, {
    headers: authHeader(),
  });
};
export const getReferTypeById = (id) => {
  return apiClient.get(`/refertype/${id}`, { headers: authHeader() });
};

//update request
export const updateReferType = async (updateReferType) => {
  return await apiClient.put(`/refertype`, updateReferType, {
    headers: authHeader(),
  });
};

//delete request
export const deleteRferTypeById = async (id) => {
  return await apiClient.delete(`/refertype/${id}`, { headers: authHeader() });
};

//get Refer type dropdown
export const getReferTypeList = () => {
  console.log("call refer type");
  return apiClient.get("/refertype/dropdown", { headers: authHeader() });
};
