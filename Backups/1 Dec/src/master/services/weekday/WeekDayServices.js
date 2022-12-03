import apiClient from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllWeekDay = (searchWeekDayObj) => {
  //console.log(searchWeekDayObj);
  return apiClient.post("/weekday/weekdaylist", searchWeekDayObj, {
    headers: authHeader(),
  }); 
}; 

//Post request to save the modal form data into the database.
export const addNewWeekDay = (createWeekDay) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createWeekDay)
  );
  return apiClient.post(`/weekday`, createWeekDay, { headers: authHeader() });
};

export const autoSearchWeekDay = (searchString) => {
  return apiClient.get(`/weekday/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getWeekDayById = (id) => {
  return apiClient.get(`/weekday/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteWeekDayById = async (id) => {
  return await apiClient.delete(`/weekday/${id}`, { headers: authHeader() });
};

//Put request update the data
export const updateWeekDay = async (UpdateWeekDay) => {
  return await apiClient.put(`/weekday`, UpdateWeekDay, {
    headers: authHeader(),
  });
};
