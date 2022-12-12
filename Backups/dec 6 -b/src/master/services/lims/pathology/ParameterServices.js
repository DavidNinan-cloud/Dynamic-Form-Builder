import apiClient, { limsApiClient } from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllParameters = async (searchParameterObj) => {
  console.log("Search obj for Parameter is " + searchParameterObj);

  return await apiClient.post("parameters/parameterlist", searchParameterObj, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchParameter = async (searchString) => {
  return await apiClient.get(`parameters/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getParameterById = async (id) => {
  return await apiClient.get(`/parameters/${id}`, {
    headers: authHeader(),
  });
};

export const getUnitDropdown = async () => {
  return await apiClient.get(`labunits/dropdown`, {
    headers: authHeader(),
  });
};

export const getGenderDropdown = async () => {
  return await apiClient.get(`genders/dropdown`, {
    headers: authHeader(),
  });
};

export const getAgeTypeDropdown = async () => {
  return await apiClient.get(`agetypes/dropdown`, {
    headers: authHeader(),
  });
};

export const addNewParameter = async (parameterObj) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(parameterObj)
  );
  return await apiClient.post(`/parameters`, parameterObj, {
    headers: authHeader(),
  });
};

export const updateParameter = async (updateParameterObj) => {
  return await apiClient.put(`/parameters`, updateParameterObj, {
    headers: authHeader(),
  });
};

export const deleteParameterById = async (id) => {
  return await apiClient.delete(`/parameters/${id}`, {
    headers: authHeader(),
  });
};
