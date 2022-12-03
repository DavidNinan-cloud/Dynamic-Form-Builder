import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of cities from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllAreas = async (searchAreaObj) => {
  console.log(
    "Fetch all areas has the parameter " + JSON.stringify(searchAreaObj)
  );

  return await apiClient.post("area/arealist", searchAreaObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewArea = async (createArea) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createArea)
  );
  return await apiClient.post(`/area`, createArea, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getAreaById = async (id) => {
  return await apiClient.get(`area/${id}`, {
    headers: authHeader(),
  });
};

//Delete request to delete the data
export const deleteAreaById = async (id) => {
  return await apiClient.delete(`/area/${id}`, {
    headers: authHeader(),
  });
};

//Put request to update the data
export const updateArea = async (updateAreaObj) => {
  return await apiClient.put(`/area`, updateAreaObj, {
    headers: authHeader(),
  });
};

//auto search the area
export const autoSearchArea = async (searchString) => {
  return await apiClient.get(`area/search/${searchString}`, {
    headers: authHeader(),
  });
};

//get area dropdown
export const getAreaDropDown = async (pincodeId) => {
  return await apiClient.get(`area/dropdown/${pincodeId}`, {
    headers: authHeader(),
  });
};
