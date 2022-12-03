import authHeader from "../../authentication/authservices/auth-header";
import { mastersApi } from "../http-common";

// Unit Dropdown API
export const getUnits = () => {
  return mastersApi.get(`/units/dropdown`, {
    headers: authHeader(),
  });
};

//Block Dropdown API
export const 
getBlock = (unitId) => {
  return mastersApi.get(`/blocks/dropdown/${unitId}`, {
    headers: authHeader(),
  });
};

//Floor Dropdown API
export const getFloor = (unitId, blockId) => {
  return mastersApi.get(`/floors/dropdown/${unitId}/${blockId}`, {
    headers: authHeader(),
  });
};

//Ward Dropdown API
export const getWard = (unitId, blockId, floorId) => {
  return mastersApi.get(`/wards/dropdown/${unitId}/${blockId}/${floorId}`, {
    headers: authHeader(),
  });
};

// Bed Category Dropdown API
export const getBedCategory = () => {
  return mastersApi.get(`/classtype/dropdown`, {
    headers: authHeader(),
  });
};

// Bed Category Dropdown API
export const getBedList = (details) => {
  return mastersApi.post(`/beds/bedlistforallocation`, details, {
    headers: authHeader(),
  });
};
