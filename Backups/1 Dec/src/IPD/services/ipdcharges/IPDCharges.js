import { ipdApi, mastersApi } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const getPatientData = (admissionId) => {
  return ipdApi.get(`/admission/chargesDetails?admissionId=${admissionId}`, {
    headers: authHeader(),
  });
};

export const getSearchServiceList = (searchkey, bedCategory, tariffId) => {
  return mastersApi.get(
    `/services/serviceAutocompleteOnIpdCharges?bedCategory=${bedCategory}&searchString=${searchkey}&tariff=${tariffId}`,
    {
      headers: authHeader(),
    }
  );
};

export const getSearchPatient = (searchkey) => {
  return ipdApi.get(
    `/admission/searchAdmittedPatient?searchString=${searchkey}`,
    {
      headers: authHeader(),
    }
  );
};

export const saveServices = (serviceList) => {
  console.log("Service List", serviceList);
  return ipdApi.post(
    `/admission/saveCharges

  `,
    serviceList,
    {
      headers: authHeader(),
    }
  );
};
