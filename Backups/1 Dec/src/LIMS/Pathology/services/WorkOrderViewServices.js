import { mastersApiClient, limsApiClient } from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

export const getUnitList = () => {
  return mastersApiClient.get(`/units/dropdown`, { headers: authHeader() });
};

export const getCategoryDropdown = () => {
  return mastersApiClient.get(`/categories/dropdown`, {
    headers: authHeader(),
  });
};

export const getTestTypeDropdown = () => {
  return mastersApiClient.get(`/tests/testtypedropdown`, {
    headers: authHeader(),
  });
};

export const fetchWorkOrdersList = async (workOrderListObj) => {
  console.log("Search obj for work order is " + workOrderListObj);

  return await limsApiClient.post(
    "/workorders/filterwiseworkorderslist",
    workOrderListObj,
    {
      headers: authHeader(),
    }
  );
};

// export const fetchWorkOrderWiseTestsList = async (orderId) => {
//   console.log("orderId " + orderId);

//   return await limsApiClient.post(`tests/workorderwisetestslist/${orderId}`, {
//     headers: authHeader(),
//   });
// };

export const fetchWorkOrderWiseTestsList = (orderId) => {
  return limsApiClient.get(`tests/workorderwisetestslist/${orderId}`, {
    headers: authHeader(),
  });
};

export const getPaitentInfoByNo = (searchObj) => {
  return limsApiClient.get(`/patientInfo/patientAutocomplete/${searchObj}`, {
    headers: authHeader(),
  });
};
