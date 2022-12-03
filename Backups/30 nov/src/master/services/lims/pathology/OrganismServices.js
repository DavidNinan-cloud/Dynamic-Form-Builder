import apiClient, { limsApiClient } from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllOrganisms = async (searchOrganismObj) => {
  console.log("Search obj for Organism is " + searchOrganismObj);

  return await apiClient.post("organisms/organismlist", searchOrganismObj, {
    headers: authHeader(),
  });
};

export const updateOrganism = async (updateOrganismObj) => {
  return await apiClient.put(`/organisms`, updateOrganismObj, {
    headers: authHeader(),
  });
};

export const autoSearchOrganism = async (searchString) => {
  return await apiClient.get(`organisms/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const deleteOrganismById = async (id) => {
  return await apiClient.delete(`/organisms/${id}`, {
    headers: authHeader(),
  });
};

export const addNewOrganism = async (createOrganism) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createOrganism)
  );
  return await apiClient.post(`/organisms`, createOrganism, {
    headers: authHeader(),
  });
};

export const getAntibiotics = async () => {
  return await apiClient.get(`/antibiotics/dropdown`, {
    headers: authHeader(),
  });
};

export const getOrganismById = async (id) => {
  return await apiClient.get(`/organisms/${id}`, {
    headers: authHeader(),
  });
};
