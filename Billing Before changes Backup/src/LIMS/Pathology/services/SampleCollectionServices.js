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

export const getTechnicianDropdown = () => {
  return mastersApiClient.get(`/employees/employeeForPathology`, {
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

// export const putSampleCollection = async (workOrderListObj) => {
//   console.log("Search obj for work order is " + workOrderListObj);

//   return await mastersApiClient.put(
//     "/workorders/filterwiseworkorderslist",
//     workOrderListObj,
//     {
//       headers: authHeader(),
//     }
//   );
// };

export const saveSampleCollection = async (sampleCollectionObj) => {
  return await limsApiClient.put(
    `/patientinvestigations`,
    sampleCollectionObj,
    {
      headers: authHeader(),
    }
  );
};

// export const fetchWorkOrderWiseTestsList = (orderId) => {
//   return limsApiClient.get(`labordertestmapping/${orderId}`, {
//     headers: authHeader(),
//   });
// };

export const fetchWorkOrderWiseTestsList = (orderId) => {
  return limsApiClient.get(`patientinvestigations/${orderId}`, {
    headers: authHeader(),
  });
};

export const getPaitentInfoByNo = (searchObj) => {
  return limsApiClient.get(`/patientInfo/patientAutocomplete/${searchObj}`, {
    headers: authHeader(),
  });
};

export const getAgencyDropdown = () => {
  return limsApiClient.get(`patientinvestigations/agencydropdown`, {
    headers: authHeader(),
  });
};
