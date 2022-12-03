
import id from 'date-fns/esm/locale/id/index.js';
import authHeader from '../../../../authentication/authservices/auth-header';
import apiClient from '../../../http-common'

export const fetchAllBed = (searchGroupObj)=>{
    return apiClient.post("/beds/bedlist",searchGroupObj,{headers:authHeader()})
}

//Post request to save the modal form data into the database.
  export const addNewBed = async (createGroup) => {
    return await apiClient.post(`/beds`, createGroup,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchBed = (searchString) => {
    return apiClient.get(`/beds/search/${searchString}`,{headers:authHeader()});
  };

//Get request by id to fetch the data upon clicking of edit icon
export const getBedById = (unitid,bedid) => {
    return apiClient.get(`/beds/${unitid}/${bedid}`,{headers:authHeader()});
  };
  
  //Delete Api
  export const deleteBedById = async (bedid,classid,roomid,wardid,floorid,blockid,unitid) => {
    if(unitid!==null && blockid!==null && floorid!==null &&wardid!==null && roomid!==null && classid!==null){
    return await apiClient.delete(`/beds?bedId=${bedid}&classId=${classid}&roomId=${roomid}&wardId=${wardid}&floorId=${floorid}&blockId=${blockid}&unitId=${unitid}`,{headers:authHeader()});
    }
    else if(unitid===null && blockid===null && floorid===null &&wardid===null && roomid===null && classid===null){
      return await apiClient.delete(`/beds?bedId=${bedid}`,{headers: authHeader()});
    }
  }

  //Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
  export const getBedDropdown = () => {
    return apiClient.get(`/beds/dropdown/${unitid}/${blockid}/${floorid}/${wardid}`,{headers:authHeader()});
  };

  export const getUnitList = () => {
    return apiClient.get(`/units/dropdown`, { headers: authHeader() });
  };

  //Put request update the data
export const updateBed = async (updateGroups) => {
    return await apiClient.put(`/beds`, updateGroups,{headers:authHeader()});
  };

