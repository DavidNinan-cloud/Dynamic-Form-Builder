//base url for api
import authHeader from "../../../authentication/authservices/auth-header";
import apiClient from "../../http-common";
import { companyUrl } from "./constant";


//get list of record from api and show in table
export const fetchAllCompany = (searchOrgObj) => {
  return apiClient.post(`/${companyUrl}/companylist`, searchOrgObj, {
    headers: authHeader(),
  });
};

//searchbar
export const autoSearchCompany = async (searchString) => {
  return apiClient.get(`${companyUrl}/search/${searchString}`, {
    headers: authHeader(),
  });
};

//add new record to table api
export const addNewCompany = (createCompany) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createCompany)
  );
  return apiClient.post(`/company`, createCompany, {
    headers: authHeader(),
  });
};



