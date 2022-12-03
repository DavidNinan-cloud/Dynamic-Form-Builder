
import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllRoom = (searchGroupObj)=>{
    return apiClient.post("/rooms/roomlist",searchGroupObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewRoom = async (createRoom) => {
    return await apiClient.post(`/rooms`, createRoom,{headers:authHeader()});
  };

//get all room facility get request
export const getAllRoomFacility =async () => {
  return await apiClient.get(`/rooms/facilitydropdown`,{headers:authHeader()});
};

//Search ICon API
export const autoSearchRoom = (searchString) => {
    return apiClient.get(`/rooms/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getRoomById = (id) => {
    return apiClient.get(`/rooms/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteRoomById = async (id) => {
    return await apiClient.delete(`/rooms/${id}`,{headers:authHeader()});
  }

  //Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
  export const getRoomList = () => {
    return apiClient.post(`/rooms/roomlist`,{headers:authHeader()});
  };

  export const getUnitList = () => {
    return apiClient.get(`/units/dropdown`, { headers: authHeader() });
  };

  //Put request update the data
export const updateRoom = async (updateGroups) => {
    return await apiClient.put(`/rooms`, updateGroups,{headers:authHeader()});
  };

  export const getRoomDropdown =async () => {
    return await apiClient.get(`/rooms/dropdown`,{headers:authHeader()});
  }

