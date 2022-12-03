import apiClient from "../../../../master/http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

//Get Unit List
export const getUnitlist = () => {
    return apiClient.get("/units/dropdown", { headers: authHeader() });
  };