//base url for api
import apiClient from "../../http-common";
import { unitUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";
export const fetchAllUnits = async (searchUnitObj) => {
  console.log(searchUnitObj);
  return await apiClient.post(`/${unitUrl}/unitlist`, searchUnitObj, {
    headers: authHeader(),
  });
};

//searchbar
export const autoSearchUnit = async (searchString) => {
  return apiClient.get(`${unitUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};
//add new unit post api
export const addNewUnit = async (createUnit) => {
  return await apiClient.post(`/units`, createUnit, { headers: authHeader() });
};
//Get request by id to fetch the data upon clicking of edit icon

export const getUnitById = (id) => {
  return apiClient.get(`/units/${id}`, { headers: authHeader() });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteUnitById = async (id) => {
  return await apiClient.delete(`/units/${id}`, { headers: authHeader() });
};
//update record api
export const updateUnit = async (unitUpdate) => {
  return await apiClient.put(`/units`, unitUpdate, { headers: authHeader() });
};

//get country
export const getUnitDropdown = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};
