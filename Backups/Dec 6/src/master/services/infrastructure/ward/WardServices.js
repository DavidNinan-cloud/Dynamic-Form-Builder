import authHeader from "../../../../authentication/authservices/auth-header";
import apiClient from "../../../http-common";

export const fetchAllWard = (searchWardObj) => {
  return apiClient.post("/wards/wardlist", searchWardObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewWard = async (createWard) => {
  return await apiClient.post(`/wards`, createWard, { headers: authHeader() });
};

//Search ICon API
export const autoSearchWard = (searchString) => {
  return apiClient.get(`/wards/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getWardById = (id) => {
  return apiClient.get(`/wards/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteWardById = async (wardid, floorid, blockid, unitid) => {
  if (unitid !== null && blockid !== null && floorid !== null) {
    return await apiClient.delete(
      `/wards?wardId=${wardid}&floorId=${floorid}&blockId=${blockid}&unitId=${unitid}`,
      { headers: authHeader() }
    );
  } else if (unitid === null && blockid === null && floorid === null) {
    return await apiClient.delete(`/wards?wardId=${wardid}`, {
      headers: authHeader(),
    });
  }
};

//Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
// export const getWardList = () => {
//   return apiClient.get(`/wards/dropdown`, { headers: authHeader() });
// };
//Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData

//Put request update the data
export const updateWard = async (updateWards) => {
  return await apiClient.put(`/wards`, updateWards, { headers: authHeader() });
};

export const getWardDropdown = async (unitid, blockid, floorid) => {
  return await apiClient.get(
    `/wards/dropdown/${unitid}/${blockid}/${floorid}`,
    { headers: authHeader() }
  );
};
