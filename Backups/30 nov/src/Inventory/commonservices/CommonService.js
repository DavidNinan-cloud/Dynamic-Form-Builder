import apiClient from "../http-common";
import authHeader from "../../authentication/authservices/auth-header";

//Get Unit Dropdown List
export const getUnitlist = () => {
  return apiClient.get("/units/dropdown", { headers: authHeader() });
};
//Get Item Type Dropdown List
export const getItemType = () => {
  return apiClient.get("/itemtype", { headers: authHeader() });
}
//Get Supplier Dropdown List
export const getAllSupplier = () => {
  return apiClient.get("/supplier", { headers: authHeader() });
}

//Get Supplier Dropdown List
export const getAllItemCategory = (id) => {
  console.log("Get All Item Category Options",id);
  return apiClient.get(`/itemcategory/${id}`, { headers: authHeader() });
}
