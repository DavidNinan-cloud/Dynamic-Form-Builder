//base url for api
import apiClient from "../../http-common";
import { routeUrl } from "./constant";
import authHeader from "../../../authentication/authservices/auth-header";

//get list of record from api and show in table
export const fetchAllRoute = async (searchRouteObj) => {
  console.log("org data from post");
  return apiClient.post(`/${routeUrl}/routelist`, searchRouteObj, {
    headers: authHeader(),
  });
};
//autocomplte search bar api
export const autoSearchRoute = (searchString) => {
  return apiClient.get(`/${routeUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
export const getUnitList = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};

//Post request to save the modal form data into the database.
export const addNewRoute = async (createRoute) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createRoute)
  );
  return await apiClient.post(`/route`, createRoute, {
    headers: authHeader(),
  });
};

//get country
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getRouteById = (routeid) => {
  console.log("in servi c e " + routeid + "id");
  return apiClient.get(`/route/${routeid}`, {
    headers: authHeader(),
  });
};

//DELETE country
export const deleteRouteById = async (id) => {
  return await apiClient.delete(`/route/${id}`, {
    headers: authHeader(),
  });
};

//put request api
export const updateRoute = async (routeUpdate) => {
  return await apiClient.put(`/route`, routeUpdate, {
    headers: authHeader(),
  });
};

//get Route
export const getRouteDropdown = () => {
  return apiClient.get("/route/dropdown", { headers: authHeader() });
};
export const getRouteUnitDropdown = async (unitid) => {
  return await apiClient.get(`route/dropdown/${unitid}`, {
    headers: authHeader(),
  });
};
