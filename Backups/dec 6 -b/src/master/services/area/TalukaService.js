import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of districts from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllTalukas = async (searchTalukaObj) => {
  console.log(searchTalukaObj);

  return await apiClient.post("/talukas/talukalist", searchTalukaObj, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getTalukaById = async (id) => {
  return await apiClient.get(`/talukas/${id}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewTaluka = async (createTaluka) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createTaluka)
  );
  return await apiClient.post(`/talukas`, createTaluka, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteTalukaById = async (id) => {
  return await apiClient.delete(`/talukas/${id}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateTaluka = async (updateTalukaObj) => {
  return await apiClient.put(`/talukas`, updateTalukaObj, {
    headers: authHeader(),
  });
};

//GET request to get the taluka dropdown
export const getTalukaDropdown = async (districtId) => {
  return await apiClient.get(`/talukas/dropdown/${districtId}`, {
    headers: authHeader(),
  });
};

//auto search the district
export const autoSearchTaluka = async (searchString) => {
  return await apiClient.get(`talukas/search/${searchString}`, {
    headers: authHeader(),
  });
};
