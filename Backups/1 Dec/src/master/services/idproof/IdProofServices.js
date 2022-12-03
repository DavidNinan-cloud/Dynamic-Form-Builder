import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllIdProof = (searchIdProofObj) => {
  console.log(searchIdProofObj);
  return apiClient.post(
    "/citizenidproofs/citizenidprooflist",
    searchIdProofObj,
    { headers: authHeader() }
  );
};
 
//Post request to save the modal form data into the database.
export const addNewIdProof = async (createIdProof) => {
  return await apiClient.post(`/citizenidproofs`, createIdProof, {
    headers: authHeader(),
  });
};

export const autoSearchIdProof = (searchString) => {
  return apiClient.get(`/citizenidproofs/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getIdProofById = (id) => {
  return apiClient.get(`/citizenidproofs/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteIdProofById = async (id) => {
  return await apiClient.delete(`/citizenidproofs/${id}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateIdProof = async (updateIdProof) => {
  return await apiClient.put(`/citizenidproofs`, updateIdProof, {
    headers: authHeader(),
  });
};
