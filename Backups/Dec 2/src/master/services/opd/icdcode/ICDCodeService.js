import apiClient from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllICDCode = async (searchICDCodeObj) => {
  // console.log(searchICDCodeObj);
  return await apiClient.post("/icdCode/icdcodelist", searchICDCodeObj , {headers: authHeader(),});
};

//Post request to save the modal form data into the database.
export const addNewICDCode = async (createICDCode) => {
  return await apiClient.post(`/icdCode`, createICDCode ,  {headers: authHeader(),});
}; 

//Search ICon API
export const autoSearchICDCode = (searchString) => {
  return apiClient.get(`/icdCode/search/${searchString}` ,  {headers: authHeader(),});
};

//Get request by id to fetch the data upon clicking of edit icon
export const getICDCodeById = (id) => {
  return apiClient.get(`/icdCode/${id}` ,  {headers: authHeader(),});
};

//Delete Api
export const deleteICDCodeById = async (id) => {
  return await apiClient.delete(`/icdCode/${id}` ,  {headers: authHeader(),});
};

//Fill all Fields Then Click On ADD POST API    //getCountryList or addOrganizationData
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown` ,  {headers: authHeader(),});
};

//Put request update the data
export const updateICDCode = async (UpdateICDCode) => {
  return await apiClient.put(`/icdCode`, UpdateICDCode, { headers: authHeader() });
};