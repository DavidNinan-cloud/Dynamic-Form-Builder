import apiClient from '../../http-common-userservice'

import authHeader from "../../../../../authentication/authservices/auth-header";


// // Calculat DOB based on Age
export const getFunctionalities = async (roleId) => {
    return await apiClient.get(`/functionality/getFunctionalities/${roleId}` ,{headers:authHeader()});
};

// department
export const getRoleDropdown = () => {
    return apiClient.get(`/role/dropdown` ,{headers:authHeader()});
};

export const registerAppointmentFunctionality = (functionalities) => {
    console.log(functionalities);
    return apiClient.post(`/functionality/assignFunctionalityToRole`, functionalities , {headers:authHeader()});
  };