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

export const autoSearchParameters = async (searchString) => {
  return await apiClient.get(`parameters/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const autoSearchMachineParameter = async (searchString) => {
  return await apiClient.get(`machineparameters/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const autoSearchMachine = async (searchString) => {
  return await apiClient.get(`machines/search/${searchString}`, {
    headers: authHeader(),
  });
};

export const addNewMachineParameterLinking = async (
  createMachineParameterLinking
) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createMachineParameterLinking)
  );
  return await apiClient.post(
    `/parameterslinking`,
    createMachineParameterLinking,
    {
      headers: authHeader(),
    }
  );
};

export const fetchAllMachineParameterLinking = async (
  searchMachineParameterLinkingObj
) => {
  console.log(
    "Search obj for Parameter is " + searchMachineParameterLinkingObj
  );

  return await apiClient.post(
    "parameterslinking/parameterslinkinglist",
    searchMachineParameterLinkingObj,
    {
      headers: authHeader(),
    }
  );
};

export const deleteMachineParameterLinkingById = async (
  machineId,
  parameterId,
  machineParameterId
) => {
  return await apiClient.delete(
    `/parameterslinking/${machineId}/${parameterId}/${machineParameterId}`,
    {
      headers: authHeader(),
    }
  );
};

export const getMachineList = () => {
  return apiClient.get(`/machines/dropdown`, { headers: authHeader() });
};
