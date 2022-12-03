import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of cities from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllCities = async (searchCityObj) => {
  console.log("Search obj for city is " + searchCityObj);

  return await apiClient.post("/cities/citilist", searchCityObj, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getCityById = async (id) => {
  return await apiClient.get(`/cities/${id}`, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewCity = async (createCity) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createCity)
  );
  return await apiClient.post(`/cities`, createCity, {
    headers: authHeader(),
  });
};

//Put request to update the data
export const updateCity = async (updateCityObj) => {
  console.log("updateCityObj is " + JSON.stringify(updateCityObj));

  return await apiClient.put(`/cities`, updateCityObj, {
    headers: authHeader(),
  });
};

//Delete request to delete the data
export const deleteCityById = async (id) => {
  return await apiClient.delete(`/cities/${id}`, {
    headers: authHeader(),
  });
};

//GET request to get the city dropdown
export const getCityDropdown = async (cityId) => {
  return await apiClient.get(`/cities/dropdown/${cityId}`, {
    headers: authHeader(),
  });
};

//auto search the city
export const autoSearchCity = async (searchString) => {
  return await apiClient.get(`cities/search/${searchString}`, {
    headers: authHeader(),
  });
};
