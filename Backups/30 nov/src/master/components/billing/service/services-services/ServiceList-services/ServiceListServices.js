import apiClient,{ serviceListPost } from '../../../../../http-common'
import authHeader from "../../../../../../authentication/authservices/auth-header";

export const getPackageDetails = (input) => {
  return apiClient.get(`/package/getPackageById/${input}` , {headers:authHeader()});
};

export const fetchServiceSearch = (input) => {
  return apiClient.get(`/package/serviceAutocompleteHealthPlan?searchString=${input}` , {headers:authHeader()});
};

export const fetchAllServices = (searchAppObj) => {
    return apiClient.post(`/services/serviceList`, searchAppObj , {headers:authHeader()});
  };

export const editService = (serviceId) => {
  return apiClient.get(`/services/getService/${serviceId}`, {headers:authHeader()});
};

export const postExcel = (excel) => {
  return serviceListPost.post(`/excelTemplate/uploadExcelService`, excel , {headers:authHeader()});
};

export const getExcel = () => {
return apiClient.get(`/excelTemplate/downloadExcel/service`, {headers:authHeader()});
};
