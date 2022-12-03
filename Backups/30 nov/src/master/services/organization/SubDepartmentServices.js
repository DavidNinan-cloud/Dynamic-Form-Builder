import apiClient from "../../http-common";
import { subdepartmentUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllSubDepartments = async (searchOrgObj) => {
  console.log("org data from post");
  return await apiClient.post(
    `/${subdepartmentUrl}/subdepartmentlist`,
    searchOrgObj,
    { headers: authHeader() }
  );
};

export const autoSearchSubDepartments = (searchString) => {
  return apiClient.get(`/${subdepartmentUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewSubDepartment = async (createSubDepartment) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createSubDepartment)
  );
  return await apiClient.post(`/subdepartments `, createSubDepartment, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getSubDepartmentById = (id) => {
  return apiClient.get(`/subdepartments/${id}`, { headers: authHeader() });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteSubDepartmentById = async (id) => {
  return await apiClient.delete(`/subdepartments/${id}`, {
    headers: authHeader(),
  });
};

//update api

export const updateSubDepartment = async (subDepartmentUpdate) => {
  return await apiClient.put(`subdepartments`, subDepartmentUpdate, {
    headers: authHeader(),
  });
};
//get countrry
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//get countrry
export const getDepartmentList = () => {
  return apiClient.get("/departments/dropdown", { headers: authHeader() });
};
