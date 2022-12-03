import { ipdApi } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const getPatientData = (admissionId) => {
  return ipdApi.get(`/admission/chargesDetails?admissionId=${admissionId}`, {
    headers: authHeader(),
  });
};

export const getSearchServiceList = (searchkey) => {
  return ipdApi.get(`/services/getServiceByName/${searchkey}`, {
    headers: authHeader(),
  });
};
