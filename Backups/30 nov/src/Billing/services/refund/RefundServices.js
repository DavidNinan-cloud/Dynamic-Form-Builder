

import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling from '../../http-common-billing'

export const fetchAllRefund = (searchGroupObj)=>{
    return apiClientBilling.post("/group/grouplist",searchGroupObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewRefund = async (createGroup) => {
    return await apiClientBilling.post(`/groups`, createGroup,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchRefund = (searchString) => {
    return apiClientBilling.get(`/groups/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getRefundById = (id) => {
    return apiClientBilling.get(`/groups/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteRefundById = async (id) => {
    return await apiClientBilling.delete(`/groups/${id}`,{headers:authHeader()});
  }

  //Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
  export const getRefundList = () => {
    return apiClientBilling.get(`/groups/dropdown`,{headers:authHeader()});
  };

  //Put request update the data
export const updateRefund = async (updateGroups) => {
    return await apiClientBilling.put(`/groups`, updateGroups,{headers:authHeader()});
  };

