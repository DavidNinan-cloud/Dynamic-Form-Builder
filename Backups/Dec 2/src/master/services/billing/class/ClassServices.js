import authHeader from "../../../../authentication/authservices/auth-header";
import apiClient from "../../../http-common";

export const fetchAllClass = (searchClassObj) => {
  console.log("class listing" + searchClassObj);
  return apiClient.post("/classtype/classtypelist", searchClassObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewClass = async (createClass) => {
  return await apiClient.post(`/classtype`, createClass, {
    headers: authHeader(),
  });
};

//Search ICon API
export const autoSearchClass = (searchString) => {
  return apiClient.get(`/classtype/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getClassById = (id) => {
  return apiClient.get(`/classtype/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteClassById = async (id) => {
  return await apiClient.delete(`/classtype/${id}`, { headers: authHeader() });
};

//Put request update the data
export const updateClass = async (updateClassType) => {
  return await apiClient.put(`/classtype`, updateClassType, {
    headers: authHeader(),
  });
};

export const getClassCategoryDropdown = async () => {
  return await apiClient.get(`/classtype/dropdown`,{ headers:authHeader()})
}
