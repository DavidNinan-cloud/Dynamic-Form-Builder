import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllGender = async (searchGenderObj) => {
  console.log("fetch all gender OBJ " + JSON.stringify(searchGenderObj));
  return await apiClient.post(`/genders/genderlist`, searchGenderObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewGender = async (createGender) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createGender)
  );
  return await apiClient.post(`/genders`, createGender, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchGender = (searchString) => {
  return apiClient.get(`genders/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getGenderById = async (id) => {
  return await apiClient.get(`/genders/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteGenderById = async (id) => {
  return await apiClient.delete(`/genders/${id}`, { headers: authHeader() });
};

//Put request update the data
export const updateGender = async (UpdateGender) => {
  return await apiClient.put(`/genders`, UpdateGender, {
    headers: authHeader(),
  });
};
