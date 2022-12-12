import apiClient from '../../../http-common'
import authHeader from "../../../../authentication/authservices/auth-header";

export const fetchAllInstruction = (searchInstructionObj)=>{
    //  console.log(searchInstructionObj);
    return apiClient.post("/instructions/instructionslist",searchInstructionObj  , {headers: authHeader(),})
} 

//Post request to save the modal form data into the database.
  export const addNewInstruction = async (createInstruction) => {
    return await apiClient.post(`/instructions`, createInstruction , {headers: authHeader(),});
  };

//Search ICon API
export const autoSearchInstruction = (searchString) => {
    return apiClient.get(`/instructions/search/${searchString}` , {headers: authHeader(),});
  };
  // /masters/instructions/search/{searchString}
//Get request by id to fetch the data upon clicking of edit icon
export const getInstructionById = (id) => {
    return apiClient.get(`/instructions/${id}` , {headers: authHeader(),});
  };
  //Delete Api
  export const deleteInstructionById = async (id) => {
    return await apiClient.delete(`/instructions/${id}` , {headers: authHeader(),});
  }

//Fill all Fields Then Click On ADD POST API    //getCountryList or addOrganizationData
export const getUnitDropdown = () => {
  return apiClient.get(`/units/dropdown` , {headers: authHeader(),});
};

//Put request update the data
export const updateInstruction = async (UpdateInstruction) => {
  return await apiClient.put(`/instructions`, UpdateInstruction, { headers: authHeader() });
};