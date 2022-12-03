import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//Get Department List
export const getDepartmentlist = () => {
  console.log("getDepartmentlist call in otconsent");
    return apiClient.get("/departments/dropdown", { headers: authHeader() });
  };