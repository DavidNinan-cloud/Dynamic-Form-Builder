import authHeader from '../authentication/authservices/auth-header';
import apiClient from './http-common'

export const fetchAllUsers = (searchUsersObj)=>{
    return apiClient.get("/users")
}

//Post request to save the modal form data into the database.
  export const addNewUsers = async (createUsers) => {
    return await apiClient.post(`/users`, createUsers,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchUsers = (searchString) => {
    return apiClient.get(`/users/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getUsersById = (id) => {
    return apiClient.get(`/users/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteUsersById = async (id) => {
    return await apiClient.delete(`/users/${id}`,{headers:authHeader()});
  }

  //Fill all Fields Then Click On ADD POST API    //getUsersList or addUsersData
  export const getUsersList = () => {
    return apiClient.get(`/users/dropdown`,{headers:authHeader()});
  };

  //Put request update the data
export const updateUsers = async (updateUserss) => {
    return await apiClient.put(`/users/${updateUserss.id}`, updateUserss,{headers:authHeader()});
  };

