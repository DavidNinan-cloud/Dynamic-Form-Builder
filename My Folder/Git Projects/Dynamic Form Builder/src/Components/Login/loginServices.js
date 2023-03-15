import authHeader from "../../authentication/authservices/auth-header";
import { userServiceApi, mastersApi } from "../http-common";

export const loginservice = (loginDetails) => {
  console.log(loginDetails);
  return userServiceApi.post(`/auth/login`, loginDetails);
};

export const logoutservice = () => {
  return userServiceApi.get(`/auth/logout`, authHeader());
};

export const getLoginUnits = (userName) => {
  return userServiceApi.get(`/auth/getUserUnits/${userName}`, authHeader());
};

export const getLoginStore = (username, unitId) => {
  return userServiceApi.get(
    `/auth/getUserStores/${username}/${unitId}`,
    authHeader()
  );
};

export const getLoginDepartment = (username, unitId) => {
  return userServiceApi.get(
    `/auth/getUserDepartments/${username}/${unitId}`,
    authHeader()
  );
};
