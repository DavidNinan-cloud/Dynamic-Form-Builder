import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

//Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllPayment = async (searchPaymentType) => {
  console.log(searchPaymentType);
    return await apiClient.post("/paymentType/paymentTypelist",searchPaymentType,{headers:authHeader()});
};

//Post request to save the modal form data into the database.
export const addNewPayment = async (createPaymentType) => {
  console.log( 
    "Object sent for data record creation is " + JSON.stringify(createPaymentType)
  );
  return await apiClient.post(`/paymentType`, createPaymentType, {headers:authHeader()});
};

// search data , Get request to fetch the autocomplete options
export const autoSearchPayment = (searchString) => {
    return apiClient.get(`paymentType/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getPaymentTypeById = async (id) => {
    return await apiClient.get(`/paymentType/${id}`,{headers:authHeader()});
  };

//Delete Api
  export const deletePaymentById = async (id) => {
    return await apiClient.delete(`/paymentType/${id}`,{headers:authHeader()});
  }
      //Put request update the data
export const updatePayment = async (updateGroup) => {
  return await apiClient.put(`/paymentType`, updateGroup,{headers:authHeader()});
};
