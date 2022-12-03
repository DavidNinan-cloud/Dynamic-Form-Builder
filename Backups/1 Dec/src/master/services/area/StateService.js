import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of countries from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllStates = async (searchStateObj) => {
  console.log(searchStateObj);

  return await apiClient.post("/state/statelist", searchStateObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewState = async (createState) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createState)
  );
  return await apiClient.post(`/state`, createState, {
    headers: authHeader(),
  });
};

//auto search the state
export const autoSearchState = async (searchString) => {
  return await apiClient.get(`state/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getStateById = async (id) => {
  return await apiClient.get(`state/${id}`, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteStateById = async (id) => {
  return await apiClient.delete(`/state/${id}`, {
    headers: authHeader(),
  });
};

//Update the record of the state component using PUT request
export const updateState = async (updateStateObj) => {
  return await apiClient.put(`/state`, updateStateObj, {
    headers: authHeader(),
  });
};

//GET request to get the state dropdown
export const getStateDropdown = async (countryId) => {
  return await apiClient.get(`/state/dropdown/${countryId}`, {
    headers: authHeader(),
  });
};
