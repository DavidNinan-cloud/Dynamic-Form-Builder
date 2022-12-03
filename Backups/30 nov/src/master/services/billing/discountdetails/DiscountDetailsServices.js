import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllDiscountDetails = (searchDiscountObj)=>{
    return apiClient.post("/discountdetails/discountdetails",searchDiscountObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewDiscountDetails = async (createDiscount) => {
    return await apiClient.post(`/discountdetails`, createDiscount,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchDiscountDetails = (searchString) => {
    return apiClient.get(`/discountdetails/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getDiscountDetailsById = (id) => {
    return apiClient.get(`/discountdetails/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteDiscountDetailsById = async (id) => {
    return await apiClient.delete(`/discountdetails/${id}`,{headers:authHeader()});
  }

  //Put request update the data
export const updateDiscountDetails = async (updateDiscountDetail) => {
    return await apiClient.put(`/discountdetails`, updateDiscountDetail,{headers:authHeader()});
  };

