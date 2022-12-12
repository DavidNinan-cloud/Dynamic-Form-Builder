import apiClient, { limsApiClient } from "../../../http-common";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllMachineParameters = async (searchMachineParameterObj) => {
  console.log(
    "Search obj for MachineParameter is " + searchMachineParameterObj
  );

  return await apiClient.post(
    "machineparameters/machineparameterlist",
    searchMachineParameterObj,
    {
      headers: authHeader(),
    }
  );
};

export const fetchAllParameters = async (searchParameterObj) => {
  console.log("Search obj for Parameter is " + searchParameterObj);

  return await apiClient.post("parameters/parameterlist", searchParameterObj, {
    headers: authHeader(),
  });
};

export const addNewMachineParameter = async (createMachineParameter) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createMachineParameter)
  );
  return await apiClient.post(`/machineparameters`, createMachineParameter, {
    headers: authHeader(),
  });
};

export const getMachineParameterById = async (id) => {
  return await apiClient.get(`/machineparameters/${id}`, {
    headers: authHeader(),
  });
};

export const getMachineDropdown = async () => {
  return await apiClient.get(`/machines/dropdown`, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchMachineParameter = async (searchString) => {
  return await apiClient.get(`machineparameters/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateMachineParameter = async (updateMachineParameterObj) => {
  return await apiClient.put(`/machineparameters`, updateMachineParameterObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteMachineParameterById = async (id) => {
  return await apiClient.delete(`/machineparameters/${id}`, {
    headers: authHeader(),
  });
};

export const getUnitDropdown = async () => {
  return await apiClient.get(`/units/dropdown`, { headers: authHeader() });
};
