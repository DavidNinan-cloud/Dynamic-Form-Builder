import { mastersApiClient, limsApiClient } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchWorkOrdersStatusList = async (workOrderStatusListObj) => {
  console.log(
    "Search obj for work order status list is " + workOrderStatusListObj
  );

  return await limsApiClient.post(
    "/workorderstatus/workorderstatuslist",
    workOrderStatusListObj,
    {
      headers: authHeader(),
    }
  );
};

export const getPaitentInfoByNo = (searchObj) => {
  return limsApiClient.get(`/patientInfo/patientAutocomplete/${searchObj}`, {
    headers: authHeader(),
  });
};
