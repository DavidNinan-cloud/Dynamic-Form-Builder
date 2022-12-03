import apiClient from '../../../http-common'
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllComplaint = async (searchComplaintObj)=>{
    // console.log(searchComplaintObj);
    return await apiClient.post("/complaints/complaintlist",searchComplaintObj , {headers: authHeader(),})
};

//Post request to save the modal form data into the database.
  export const addNewComplaint = async (createComplaint) => {
    return await apiClient.post(`/complaints`, createComplaint , {headers: authHeader(),});
  };

//Search ICon API
export const autoSearchComplaint = (searchString) => {
    return apiClient.get(`/complaints/search/${searchString}` , {headers: authHeader(),});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getComplaintById = (id) => {
    return apiClient.get(`/complaints/${id}` , {headers: authHeader(),});
  };
  
  //Delete Api
  export const deleteComplaintById = async (id) => {
    return await apiClient.delete(`/complaints/${id}` , {headers: authHeader(),});
  }

//Fill all Fields Then Click On ADD POST API    //getCountryList or addOrganizationData
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown` , {headers: authHeader(),});
};

//Put request update the data
export const updateComplaint = async (UpdateComplaint) => {
  return await apiClient.put(`/complaints`, UpdateComplaint, { headers: authHeader() });
};