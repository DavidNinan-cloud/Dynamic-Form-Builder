import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllTariff = (searchTariffObj)=>{
  console.log(fetchAllTariff);
    return apiClient.post("/tariffs/tarifflist",searchTariffObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewTariff = async (createTariff) => {
    return await apiClient.post(`/tariffs`, createTariff,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchTariff = (searchString) => {
    return apiClient.get(`/tariffs/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getTariffById = (id) => {
    return apiClient.get(`/tariffs/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteTariffById = async (id) => {
    return await apiClient.delete(`/tariffs/${id}`,{headers:authHeader()});
  }

    //Put request update the data
export const updateTariff = async (updateTariffs) => {
  return await apiClient.put(`/tariffs`, updateTariffs,{headers:authHeader()});
};