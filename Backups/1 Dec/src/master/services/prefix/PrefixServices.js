import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllPrefix = (searchPrefixObj) => {
  //console.log(searchPrefixObj);
  return apiClient.post("/prefix/prefixlist", searchPrefixObj, {
    headers: authHeader(),
  });
}; 

// new Data Add into Table
export const addNewPrefix = async () => {
  return await apiClient.post(`/prefix`, createPrefix, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchPrefix = (searchString) => {
  return apiClient.get(`/prefix/search/${searchString}`, {
    headers: authHeader(),
  });
};

// /masters/prefix/search/{searchString}

//Get request by id to fetch the data upon clicking of edit icon
export const getPrefixById = (id) => {
  return apiClient.get(`/prefix/${id}`, { headers: authHeader() });
};

//Delete Api
export const deletePrefixById = async (id) => {
  return await apiClient.delete(`/prefix/${id}`, { headers: authHeader() });
};

//For Geder Prefix Dropdown
export const getGenderDropdown = async () => {
  return await apiClient.get(`/genders/dropdown`, { headers: authHeader() });
};

//Put request update the data
export const updatePrefix = async (UpdatePrefix) => {
  return await apiClient.put(`/prefix`, UpdatePrefix, {
    headers: authHeader(),
  });
};
