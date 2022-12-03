import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllDischargeType = (searchGroupObj)=>{
    return apiClient.post("/dischargetypes/dischargetypelist",searchGroupObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewDischargeType = async (createGroup) => {
    return await apiClient.post(`/dischargetypes`, createGroup,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchDischargeType = (searchString) => {
    return apiClient.get(`/dischargetypes/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getDischargeTypeById = (id) => {
    return apiClient.get(`/dischargetypes/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteDischargeTypeById = async (id) => {
    return await apiClient.delete(`/dischargetypes/${id}`,{headers:authHeader()});
  }

  //Put request update the data
export const updateDischargeType = async (updateGroups) => {
    return await apiClient.put(`/dischargetypes`, updateGroups,{headers:authHeader()});
  };

