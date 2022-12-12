import apiClient from "../http-common";
import authHeader from "../../authentication/authservices/auth-header";

export const loginservice = (loginDetails) => {
  console.log(loginDetails);
  return apiClient.post(`/auth/login`, loginDetails);
};

export const logoutservice = () => {
  return apiClient.get(`/auth/logout`,authHeader());
};
