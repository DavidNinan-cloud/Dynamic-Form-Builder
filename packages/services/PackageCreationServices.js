import apiClient from '../../.././../http-common'
import authHeader from "../../../../../authentication/authservices/auth-header";


export const saveService = (BillingDetails) => {
  return apiClient.post(`/services` ,BillingDetails, {headers:authHeader()});
};
export const editService = (BillingDetails) => {
  return apiClient.put(`/services` ,BillingDetails, {headers:authHeader()});
};

export const getGroupDropdown = () => {
  return apiClient.get(`/groups/dropdown` ,{headers:authHeader()});
};

export const getSubGroupDropdown = (groupId) => {
  return apiClient.get(`/subgroups/dropdown/${groupId}` ,{headers:authHeader()});
};
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown` ,{headers:authHeader()});
};
export const getTariffDropdown = () => {
  return apiClient.get(`/tariffs/dropdown` ,{headers:authHeader()});
};

export const getClassTable = (classNameN) => {
  return apiClient.get(`/classtype/getClass/${classNameN}` ,{headers:authHeader()});
};


export const getGroupList = () => {
  return apiClient.get(`/groups/groupListOnPackage/` ,{headers:authHeader()});
};

export const getServiceList = (obj) => {
  return apiClient.post(`/services/serviceListByGroup`,obj ,{headers:authHeader()});
};