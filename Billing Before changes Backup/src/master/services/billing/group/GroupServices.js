import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllGroup = (searchGroupObj)=>{
    return apiClient.post("/groups/grouplist",searchGroupObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewGroup = async (createGroup) => {
    return await apiClient.post(`/groups`, createGroup,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchGroup = (searchString) => {
    return apiClient.get(`/groups/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getGroupById = (id) => {
    return apiClient.get(`/groups/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteGroupById = async (id) => {
    return await apiClient.delete(`/groups/${id}`,{headers:authHeader()});
  }

  //Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
  export const getGroupList = () => {
    return apiClient.get(`/groups/dropdown`,{headers:authHeader()});
  };

  //Put request update the data
export const updateGroup = async (updateGroups) => {
    return await apiClient.put(`/groups`, updateGroups,{headers:authHeader()});
  };

