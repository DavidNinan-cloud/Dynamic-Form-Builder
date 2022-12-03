//base url for api
import apiClient from "../../http-common";
import { departmentUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllDepartments = async (searchDepartmentObj) => {
  console.log("org data from post");
  return apiClient.post(
    `/${departmentUrl}/departmentlist`,
    searchDepartmentObj,
    { headers: authHeader() }
  );
};
//autocomplte search bar api
export const autoSearchDepartments = (searchString) => {
  return apiClient.get(`/${departmentUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewDepartment = async (createDepartment) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createDepartment)
  );
  return await apiClient.post(`/departments`, createDepartment, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getDepartmentById = (deptid) => {
  console.log("in servi c e " + deptid + "id");
  return apiClient.get(`/departments/${deptid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteDepartmentById = async (id) => {
  return await apiClient.delete(`/departments/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateDepartment = async (departmentUpdate) => {
  return await apiClient.put(`/departments`, departmentUpdate, {
    headers: authHeader(),
  });
};

//get department
export const getDepartmentDropdown = () => {
  return apiClient.get("/departments/dropdown", { headers: authHeader() });
};
