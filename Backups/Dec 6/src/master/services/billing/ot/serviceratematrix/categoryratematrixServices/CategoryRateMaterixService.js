
import authHeader from '../../../../../../authentication/authservices/auth-header';
import apiClient from '../../../../../http-common'

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
  

  // search data , Get request to fetch the autocomplete options
export const autoSearchService = (searchString) => {
  return apiClient.get(`/services/serviceAutocompleteOnEmergency/${searchString}`, {
    headers: authHeader(),
  });
};