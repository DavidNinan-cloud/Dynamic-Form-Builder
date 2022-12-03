import apiClient, { limsApiClient } from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllTests = async (searchTestsObj) => {
  console.log("Search obj for Tests is " + searchTestsObj);

  return await apiClient.post("tests/testslist", searchTestsObj, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchTests = async (searchString) => {
  return await apiClient.get(`tests/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const autoSearchServices = async (searchString) => {
  return await apiClient.get(`tests/service/${searchString}`, {
    headers: authHeader(),
  });
};

export const autoSearchParameters = async (searchString) => {
  return await apiClient.get(`parameters/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const autoSearchTemplates = async (searchString) => {
  return await apiClient.get(`templates/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const getMachineNameDropdown = async () => {
  return await apiClient.get(`machines/dropdown`, {
    headers: authHeader(),
  });
};

export const getAuthorizationDropdown = async () => {
  return await apiClient.get(`tests/authorization/dropdown`, {
    headers: authHeader(),
  });
};

export const getCategoryDropdown = async () => {
  return await apiClient.get(`categories/dropdown`, {
    headers: authHeader(),
  });
};

export const getTemplateDropdown = () => {
  return apiClient.get(`templates/dropdown`, {
    headers: authHeader(),
  });
};

export const addNewTest = async (testObj) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(testObj)
  );
  return await apiClient.post(`/tests`, testObj, {
    headers: authHeader(),
  });
};

export const updateTest = async (updateTestObj) => {
  return await apiClient.put(`/tests`, updateTestObj, {
    headers: authHeader(),
  });
};

export const getTestById = async (id) => {
  return await apiClient.get(`/tests/${id}`, {
    headers: authHeader(),
  });
};

export const deleteTestById = async (id) => {
  return await apiClient.delete(`/tests/${id}`, {
    headers: authHeader(),
  });
};
