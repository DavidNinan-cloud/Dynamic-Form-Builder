//base url for api
import apiClient from "../../http-common-userservice";
import authHeader from "../../../../../authentication/authservices/auth-header";

export const fetchAllRoles = async (searchObj) => {
  console.log("org data from post");
  return apiClient.post(`role/rolelist`, searchObj, { headers: authHeader() });
};
//autocomplte search bar api
export const autoSearchRoles = (searchString) => {
  console.log("search string", searchString);
  return apiClient.get(`role/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewRole = async (createRole) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createRole)
  );
  return await apiClient.post(`/role`, createRole, {
    headers: authHeader(),
  });
};

//get record by id
export const getRoleById = async (id) => {
  return await apiClient.get(`role/${id}`, { headers: authHeader() });
};

//update request role by
export const updateRoleById = async (upateRole) => {
  return await apiClient.put(`role/`, upateRole, {
    headers: authHeader(),
  });
};

//delete api call for delete
export const deleteRoleById = async (id) => {
  return await apiClient.delete(`/role/${id}`, {
    headers: authHeader(),
  });
};

//get country
export const getRoleList = () => {
  return apiClient.get(`role/dropdown`, { headers: authHeader() });
};
