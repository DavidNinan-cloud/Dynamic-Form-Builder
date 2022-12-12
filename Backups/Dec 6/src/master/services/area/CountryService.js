import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of countries from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllCountries = async (searchCountryObj) => {
  console.log(searchCountryObj);

  return await apiClient.post("/countries/countrylist", searchCountryObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewCountry = async (createCountry) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createCountry)
  );
  return await apiClient.post(`/countries`, createCountry, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchCountry = async (searchString) => {
  return await apiClient.get(`countries/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getCountryById = async (id) => {
  return await apiClient.get(`/countries/${id}`, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteCountryById = async (id) => {
  return await apiClient.delete(`/countries/${id}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateCountry = async (updateCountryObj) => {
  return await apiClient.put(`/countries`, updateCountryObj, {
    headers: authHeader(),
  });
};

//GET request to get the country dropdown
export const getCountryDropdown = async () => {
  return await apiClient.get(`/countries/dropdown`, {
    headers: authHeader(),
  });
};
