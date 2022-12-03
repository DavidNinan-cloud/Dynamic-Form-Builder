import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllPatientType = (searchTypePatientObj) => {
  return apiClient.post("/patientCategory/patientcategorylist", searchTypePatientObj, {
    headers: authHeader(),
  });
}; 

//Post request to save the modal form data into the database.
export const addNewTypeOfPatient = async (createTypeofPatient) => {
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createTypeofPatient)
  );
  return await apiClient.post(`/patientCategory`, createTypeofPatient, {
    headers: authHeader(),
  });
};

//Autocomplete Search Data
export const autoSearchTypeOfPatient = (searchString) => {
  return apiClient.get(`/patientCategory/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getTypeOfPatientById = async (id) => {
  return await apiClient.get(`/patientCategory/${id}`, { headers: authHeader() });
};

//Delete Api
export const deletePatientCategoryById = async (id) => {
  return await apiClient.delete(`/patientCategory/${id}`, {
    headers: authHeader(),
  });
};

//Fill all Fields Then Click On ADD POST API    //getCountryList or addOrganizationData
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};

//Put request update the data
export const updatePatientCategory = async (UpdatePatientCategory) => {
  return await apiClient.put(`/patientCategory`, UpdatePatientCategory, {
    headers: authHeader(),
  });
};
