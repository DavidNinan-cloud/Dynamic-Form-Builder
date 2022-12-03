import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of districts from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllDistricts = async (searchDistrictObj) => {
  console.log(searchDistrictObj);

  return await apiClient.post("/districts/districtlist", searchDistrictObj, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getDistrictById = async (id) => {
  return await apiClient.get(`/districts/${id}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewDistrict = async (createDistrict) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createDistrict)
  );
  return await apiClient.post(`/districts`, createDistrict, {
    headers: authHeader(),
  });
};

//Delete request to delete data from the database
export const deleteDistrictById = async (id) => {
  return await apiClient.delete(`/districts/${id}`, {
    headers: authHeader(),
  });
};

//Update the record of the state component using PUT request
export const updateDistrict = async (updateDistrictObj) => {
  return await apiClient.put(`/districts`, updateDistrictObj, {
    headers: authHeader(),
  });
};

//GET request to get the district dropdown
export const getDistrictDropdown = async (stateId) => {
  return await apiClient.get(`/districts/dropdown/${stateId}`, {
    headers: authHeader(),
  });
};

//auto search the district
export const autoSearchDistrict = async (searchString) => {
  return await apiClient.get(`districts/search/${searchString}`, {
    headers: authHeader(),
  });
};
