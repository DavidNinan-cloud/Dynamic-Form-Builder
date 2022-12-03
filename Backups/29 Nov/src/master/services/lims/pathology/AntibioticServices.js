import apiClient, { limsApiClient } from "../../../http-common";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllAntibiotics = async (searchAntibioticObj) => {
  console.log("Search obj for Antibiotic is " + searchAntibioticObj);

  return await limsApiClient.post(
    "antibiotics/antiBioticlist",
    searchAntibioticObj,
    {
      headers: authHeader(),
    }
  );
};

export const addNewAntibiotic = async (createAntibiotic) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createAntibiotic)
  );
  return await apiClient.post(`/antibiotics`, createAntibiotic, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getAntibioticById = async (id) => {
  return await apiClient.get(`/antibiotics/${id}`, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchAntibiotic = async (searchString) => {
  return await apiClient.get(`antibiotics/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateAntibiotic = async (updateAntibioticObj) => {
  return await apiClient.put(`/antibiotics`, updateAntibioticObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteAntibioticById = async (id) => {
  return await apiClient.delete(`/antibiotics/${id}`, {
    headers: authHeader(),
  });
};
