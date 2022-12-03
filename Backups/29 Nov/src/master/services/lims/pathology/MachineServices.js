import apiClient, { limsApiClient } from "../../../http-common";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllMachines = async (searchMachineObj) => {
  console.log("Search obj for Machine is " + searchMachineObj);

  return await limsApiClient.post("machines/machinelist", searchMachineObj, {
    headers: authHeader(),
  });
};

export const addNewMachine = async (createMachine) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createMachine)
  );
  return await limsApiClient.post(`/machines`, createMachine, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getMachineById = async (id) => {
  return await limsApiClient.get(`/machines/${id}`, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchMachine = async (searchString) => {
  return await limsApiClient.get(`machines/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateMachine = async (updateMachineObj) => {
  return await limsApiClient.put(`/machines`, updateMachineObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteMachineById = async (id) => {
  return await limsApiClient.delete(`/machines/${id}`, {
    headers: authHeader(),
  });
};
