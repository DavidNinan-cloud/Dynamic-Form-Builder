import apiClient from "../../http-common-lims";
import authHeader from "../../../../../authentication/authservices/auth-header";

export const fetchAllModalityMaster = (searchModalityObj) => {
  //console.log(searchPrefixObj);
  return apiClient.post("/modality/modalitylist", searchModalityObj, {
    headers: authHeader(),
  });
}; 

// new Data Add into Table
export const addNewModalityMaster = async (createModality) => {
  return await apiClient.post(`/modality`, createModality, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchModalityMaster = (searchString) => {
  return apiClient.get(`/modality/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getModalityMasterById = (id) => {
  return apiClient.get(`/modality/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteModalityMasterById = async (id) => {
  return await apiClient.delete(`/modality/${id}`, { headers: authHeader() });
};

//Put request update the data
export const updateModalityMaster = async (updateModalityMaster) => {
  return await apiClient.put(`/modality`, updateModalityMaster, {
    headers: authHeader(),
  });
};
