import authHeader from "../../../../authentication/authservices/auth-header";
import apiClient from "../../../http-common";

export const fetchAllBlock = (searchGroupObj) => {
  return apiClient.post("/blocks/blocklist", searchGroupObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewBlock = async (createGroup) => {
  return await apiClient.post(`/blocks`, createGroup, {
    headers: authHeader(),
  });
};

//Search ICon API
export const autoSearchBlock = (searchString) => {
  console.log("searchString", searchString);
  return apiClient.get(`/blocks/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getBlockById = (id) => {
  return apiClient.get(`/blocks/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteBlockById = async (blockid, unitid) => {
  console.log(blockid);
  console.log(unitid);

  if (unitid !== null) {
    return await apiClient.delete(
      `/blocks?blockId=${blockid}&unitId=${unitid}`,
      { headers: authHeader() }
    );
  } else if (unitid === null) {
    return await apiClient.delete(`/blocks?blockId=${blockid}`, {
      headers: authHeader(),
    });
  }
};

//Fill all Fields Then Click On ADD POST API    //getGroupList or addGroupData
export const getUnitList = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};

//Put request update the data
export const updateBlock = async (updateGroups) => {
  return await apiClient.put(`/blocks`, updateGroups, {
    headers: authHeader(),
  });
};

export const getBlockDropdown = async (unitid) => {
  return await apiClient.get(`blocks/dropdown/${unitid}`, {
    headers: authHeader(),
  });
};

// ​/masters​/blocks​/search​/{searchString}
