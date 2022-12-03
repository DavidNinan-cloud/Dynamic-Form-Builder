import apiClient, { limsApiClient } from "../../../http-common";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllCategories = async (searchCategoryObj) => {
  console.log("Search obj for category is " + searchCategoryObj);

  return await apiClient.post("categories/categorylist", searchCategoryObj, {
    headers: authHeader(),
  });
};

export const addNewCategory = async (createCategory) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createCategory)
  );
  return await apiClient.post(`/categories`, createCategory, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getCategoryById = async (id) => {
  return await apiClient.get(`/categories/${id}`, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchCategory = async (searchString) => {
  return await apiClient.get(`categories/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateCategory = async (updateCategoryObj) => {
  return await apiClient.put(`/categories`, updateCategoryObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteCategoryById = async (id) => {
  return await apiClient.delete(`/categories/${id}`, {
    headers: authHeader(),
  });
};
