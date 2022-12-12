// /masters/tariffs/dropdown

import authHeader from '../../../../../authentication/authservices/auth-header';
import apiClient from '../../../../http-common'

export const getTariffDropdown = async ()=>{
  console.log(getTariffDropdown);
    return await apiClient.get(`tariffs/dropdown`,{headers:authHeader()})
}

export const getGroupDropdown = async ()=>{
  console.log(getGroupDropdown);
    return await apiClient.get(`groups/dropdown`,{headers:authHeader()})
}

export const getSubGroupDropdown = async ()=>{
  console.log(getSubGroupDropdown);
    return await apiClient.get(`subgroups/dropdown`,{headers:authHeader()})
}

export const getClassCategoryDropdown = async () => {
  return await apiClient.get(`/classtype/dropdown`,{ headers:authHeader()})
}