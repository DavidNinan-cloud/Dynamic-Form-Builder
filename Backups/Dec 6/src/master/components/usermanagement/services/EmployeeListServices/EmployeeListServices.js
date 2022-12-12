import apiClient from '../../../../http-common'
import authHeader from "../../../../../authentication/authservices/auth-header";
// /masters/appointment/autocompleteMobileNumber/{mobileNumber}
export const fetchAppointmentsSearch = (input) => {
  return apiClient.get(`/employees/search/${input}` , {headers:authHeader()});
};

export const fetchAllAppointments = (searchAppObj) => {
    return apiClient.post(`/employees/employeelistwithunit`, searchAppObj ,{headers:authHeader()});
  };


//delete employee
export const deleteEmployee = async (employeeId) => {
  console.log("employeeId",employeeId)
  return await apiClient.delete(`/employees/${employeeId}`, {headers:authHeader()});
};

//edit employee
export const editEmployee = async (employeeId) => {
  console.log("employeeId",employeeId)
  return await apiClient.get(`/employees/${employeeId}`, {headers:authHeader()});
};