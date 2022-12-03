import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

//Post request to recieve all the list of countries from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllSubGroup = async (searchSubGroupObj) => {
  console.log(searchSubGroupObj);

  return await apiClient.post("/subgroups/subgrouplist", searchSubGroupObj,{headers:authHeader()});
};

//Post request to save the modal form data into the database.
export const addNewSubGroup = async (createSubGroup) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createSubGroup)
  );
  return await apiClient.post(`/subgroups`, createSubGroup,{headers:authHeader()});
};

// search data , Get request to fetch the autocomplete options
export const autoSearchSubGroup = (searchString) => {
  return apiClient.get(`/subgroups/search/${searchString}`,{headers:authHeader()});
};

//Get request by id to fetch the data upon clicking of edit icon
export const getSubGroupById= async (id) => {
  console.log("this is id", + id);
  return await apiClient.get(`/subgroups/${id}`,{headers:authHeader()});
};

//Delete request by id to delete the data belonging to a particular id
export const deleteSubGroupById = async (id) => {
  return await apiClient.delete(`/subgroups/${id}`,{headers:authHeader()});
};


export const updateSubGroup = async (updateSubGroupObj) => {
  return await apiClient.put(`/subgroups`, updateSubGroupObj,{headers:authHeader()});
};
