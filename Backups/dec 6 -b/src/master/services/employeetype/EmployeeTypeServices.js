import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//Post request to recieve all the list of gender frotypem the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllEmployeeType = async (searchEmpObj) => {
  console.log(searchEmpObj);
  return await apiClient.post("/employeeType/employeetypelist", searchEmpObj, {
    headers: authHeader(),
  });
}; 
 
//Post request to save the modal form data into the database.
export const addNewEmployeeType = async (createEmpType) => {
  // console.log(
  //   "Object sent for data record creation is " + JSON.stringify(createEmployeeType)
  // );
  return await apiClient.post(`/employeeType`, createEmpType, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchEmployeeType = (searchString) => {
  return apiClient.get(`employeeType/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getEmployeeTypeById = async (id) => {
  return await apiClient.get(`/employeeType/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteEmployeeTypeById = async (id) => {
  return await apiClient.delete(`/employeeType/${id}`, {
    headers: authHeader(),
  });
};

//PUT Api
export const updateEmployyeType = async (updateEmployeeType) => {
  return await apiClient.put(`/employeeType`, updateEmployeeType, {
    headers: authHeader(),
  });
};
