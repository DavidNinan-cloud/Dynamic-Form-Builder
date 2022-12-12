import apiClient from "../../../http-common";

//get countrry
export const getUnitList = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};
