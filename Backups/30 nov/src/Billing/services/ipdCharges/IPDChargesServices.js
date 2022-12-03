import apiClientBilling from "../../http-common-billing";
import { ipdApi } from "../../http-common-ipd";
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllIPDCharges = async (searchGenderObj) => {
  console.log("fetch all ipdcharges OBJ " + JSON.stringify(searchGenderObj));
  return await apiClientBilling.post(`/genders/genderlist`, searchGenderObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewIPDCharges = async (createGender) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createGender)
  );
  return await apiClientBilling.post(`/genders`, createGender, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchIPDCharges = (searchString) => {
  return apiClientBilling.get(`genders/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getIPDChargesById = async (id) => {
  return await apiClientBilling.get(`/genders/${id}`, {
    headers: authHeader(),
  });
};

//Delete Api
export const deleteIPDChargesById = async (id) => {
  return await apiClientBilling.delete(`/genders/${id}`, {
    headers: authHeader(),
  });
};

//Put request update the data
export const updateIPDCharges = async (UpdateIPDCharges) => {
  return await apiClientBilling.put(`/genders`, UpdateIPDCharges, {
    headers: authHeader(),
  });
};

//IPD Services
export const getPatientData = (admissionId) => {
  return ipdApi.get(`/admission/chargesDetails?admissionId=${admissionId}`, {
    headers: authHeader(),
  });
};

export const getSearchServiceList = (searchkey) => {
  return ipdApi.get(`/services/getServiceByName/${searchkey}`, {
    headers: authHeader(),
  });
};
