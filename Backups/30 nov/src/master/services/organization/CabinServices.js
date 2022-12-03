import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllCabin = (searchCabinObj) => {
  //console.log(searchCabinObj);
  return apiClient.post("/cabins/cabinlist", searchCabinObj, {
    headers: authHeader(),
  });
}; 

//Post request to save the modal form data into the database.
export const addNewCabin = async (createCabin) => {
  return await apiClient.post(`/cabins`, createCabin, {
    headers: authHeader(),
  });
};

//Search ICon API
export const autoSearchCabin = (searchString) => {
  return apiClient.get(`/cabins/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getCabinById = (cid) => {
  // console.log("in service " + cid + "id");
  return apiClient.get(`/cabins/${cid}`, { headers: authHeader() });
};

//Delete Api
export const deleteCabinById = async (id) => {
  return await apiClient.delete(`/cabins/${id}`, { headers: authHeader() });
};

//For Geder Unit Dropdown
export const getUnitDropdown = async () => {
  return await apiClient.get(`/units/dropdown`, { headers: authHeader() });
};

//Put request update the data
export const updateCabin = async (UpdateCabin) => {
  return await apiClient.put(`/cabins`, UpdateCabin, { headers: authHeader() });
};

//Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
export const getUnitList = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};
