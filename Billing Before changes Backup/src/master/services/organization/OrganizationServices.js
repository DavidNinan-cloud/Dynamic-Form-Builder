//base url for api
import authHeader from "../../../authentication/authservices/auth-header";
import apiClient from "../../http-common";
import { orgUrl } from "./constant";

//get list of record from api and show in table
export const fetchAllOrganizations = (searchOrgObj) => {
  return apiClient.post(`/${orgUrl}/organizationlist`, searchOrgObj, {
    headers: authHeader(),
  });
};



//searchbar
export const autoSearchOrganisations = async (searchString) => {
  return apiClient.get(`${orgUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//get a
//Get request by id to fetch the data upon clicking of edit icon
export const getOrganizationById = (id) => {
  return apiClient.get(`/organizations/${id}`, { headers: authHeader() });
};

//add new record to table api
export const addNewOrganization = (createOrganization) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createOrganization)
  );
  return apiClient.post(`/organizations`, createOrganization, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteOrganizationById = async (id) => {
  return await apiClient.delete(`/organizations/${id}`, {
    headers: authHeader(),
  });
};

//update request api
export const updateOrganizations = async (OrganizationUpdate) => {
  return await apiClient.put(`/organizations`, OrganizationUpdate, {
    headers: authHeader(),
  });
};

//get country
export const getOrganizationDropdown = () => {
  return apiClient.get("/organizations/dropdown", { headers: authHeader() });
};
