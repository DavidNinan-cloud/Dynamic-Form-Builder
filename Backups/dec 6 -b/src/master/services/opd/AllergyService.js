//base url for api
import apiClient from "../../http-common";
import { allergyUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllAllergy = async (searchAllergyObj) => {
  console.log("org data from post");
  return apiClient.post(
    `/${allergyUrl}/allergylist`,
    searchAllergyObj,
    { headers: authHeader() }
  );
};
//autocomplte search bar api
export const autoSearchAllergy = (searchString) => {
  return apiClient.get(`/${allergyUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewAllergy = async (createAllergy) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createAllergy)
  );
  return await apiClient.post(`/allergy`, createAllergy, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getAllergyById = (deptid) => {
  console.log("in servi c e " + deptid + "id");
  return apiClient.get(`/allergy/${deptid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteAllergyById = async (id) => {
  return await apiClient.delete(`/allergy/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateAllergy = async (allergyUpdate) => {
  return await apiClient.put(`/allergy`, allergyUpdate, {
    headers: authHeader(),
  });
};

//get department
export const getDepartmentDropdown = () => {
  return apiClient.get("/allergy/dropdown", { headers: authHeader() });
};
