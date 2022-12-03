import apiClient from '../../../http-common'
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllDrAdvice = async (searchDrAdviceObj)=>{
    return await apiClient.post("/dradvice/dradvicelist",searchDrAdviceObj  , {headers: authHeader(),})
}  

//Post request to save the modal form data into the database.
  export const addNewDoctorAdvice = async (createDrAdvice) => {
    return await apiClient.post(`/dradvice`, createDrAdvice , {headers: authHeader(),});
  };

//Search ICon API
export const autoSearchDoctorAdvice = (searchString) => {
    return apiClient.get(`/dradvice/search/${searchString}` , {headers: authHeader(),});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getDoctorAdviceById = (id) => {
    return apiClient.get(`/dradvice/${id}` , {headers: authHeader(),});
  };
  
  //Delete Api
  export const deleteDrAdviceById = async (id) => {
    return await apiClient.delete(`/dradvice/${id}` , {headers: authHeader(),});
  }

//Fill all Fields Then Click On ADD POST API    
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown` , {headers: authHeader(),});
};

//Put request update the data
export const updateDrAdvice = async (UpdateDrAdvice) => {
  return await apiClient.put(`/dradvice`, UpdateDrAdvice, { headers: authHeader() });
};