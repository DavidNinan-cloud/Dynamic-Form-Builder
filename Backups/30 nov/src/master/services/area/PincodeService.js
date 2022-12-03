import apiClient from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of cities from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllPincodes = async (searchPincodeObj) => {
  console.log(searchPincodeObj);

  return await apiClient.post("pinCode/pincodelist", searchPincodeObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewPincode = async (createPincode) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createPincode)
  );
  return await apiClient.post(`/pinCode`, createPincode, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getPincodeById = async (id) => {
  return await apiClient.get(`pinCode/${id}`, {
    headers: authHeader(),
  });
};

//Delete request to delete the data
export const deletePincodeById = async (id) => {
  return await apiClient.delete(`/pinCode/${id}`, {
    headers: authHeader(),
  });
};

//Put request to update the data
export const updatePincode = async (updatePincodeObj) => {
  return await apiClient.put(`/pinCode`, updatePincodeObj, {
    headers: authHeader(),
  });
};

// //GET request to fetch the pincode dropdown
export const getPincodeDropdown = async (districtId, talukaId, cityId) => {
  return await apiClient.get(
    `/pinCode/dropdown/${districtId}/${talukaId}/${cityId}`,
    {
      headers: authHeader(),
    }
  );
};

//auto search the city
export const autoSearchPincode = async (searchDigit) => {
  return await apiClient.get(`pinCode/search/${searchDigit}`, {
    headers: authHeader(),
  });
};
