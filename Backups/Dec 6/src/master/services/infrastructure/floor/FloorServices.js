
import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllFloor = (searchFloorObj)=>{
    return apiClient.post("/floors/floorlist",searchFloorObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewFloor = async (createFloor) => {
    return await apiClient.post(`/floors`, createFloor,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchFloor = (searchString) => {
    return apiClient.get(`/floors/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getFloorById = async (id) => {
    return apiClient.get(`/floors/${id}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteFloorById = async (floorid,blockid,unitid) => {
    if(unitid!==null && blockid!==null){
      return await apiClient.delete(`/floors?floorId=${floorid}&blockId=${blockid}&unitId=${unitid}`,{headers:authHeader()});
    }
    else if(unitid===null && blockid===null){
      return await apiClient.delete(`/floors?floorId=${floorid}`, {headers: authHeader()});
    }
  }

  //Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
  export const getUnitList = () => {
    return apiClient.get(`/units/dropdown`,{headers:authHeader()});
  };

  //Put request update the data
export const updateFloor = async (updatefloors) => {
    return await apiClient.put(`/floors`, updatefloors,{headers:authHeader()});
  };

  export const getFloorDropdown = async (unitid,blockid) => {
    console.log("unitid and blockid is");
    console.log(unitid);
    console.log(blockid);
    return await apiClient.get (`floors/dropdown/${unitid}/${blockid}`,{headers:authHeader()});
  };

