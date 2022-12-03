import apiClient, { limsApiClient } from "../../../http-common";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllParameterUnits = async (searchParameterUnitObj) => {
  console.log("Search obj for ParameterUnit is " + searchParameterUnitObj);

  return await limsApiClient.post(
    "labunits/labunitslist",
    searchParameterUnitObj,
    {
      headers: authHeader(),
    }
  );
};

export const addNewParameterUnit = async (createParameterUnit) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createParameterUnit)
  );
  return await limsApiClient.post(`/labunits`, createParameterUnit, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getParameterUnitById = async (id) => {
  return await limsApiClient.get(`/labunits/${id}`, {
    headers: authHeader(),
  });
};

//Get request to fetch the autocomplete options. This is to be calle  d on each key press.
export const autoSearchParameterUnit = async (searchString) => {
  return await limsApiClient.get(`labunits/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateParameterUnit = async (updateParameterUnitObj) => {
  return await limsApiClient.put(`/labunits`, updateParameterUnitObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteParameterUnitById = async (id) => {
  return await limsApiClient.delete(`/labunits/${id}`, {
    headers: authHeader(),
  });
};
