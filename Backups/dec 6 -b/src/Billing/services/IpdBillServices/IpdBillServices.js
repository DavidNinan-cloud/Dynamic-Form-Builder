import { ipdApi } from "../../http-common-ipd";
import mastersApi from "../../http-common-masters";
import authHeader from "../../../authentication/authservices/auth-header";
import apiClientBilling from '../../http-common-billing'
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

export const getDoctorList = (unitId) => {
  return mastersApi.get(
    `/employees/getDoctorListShareApplicable/${unitId}`,
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
export const searchPatient = (searchkey) => {
  return apiClientBilling.get(
    `/bill/patientSearchOnRefund?searchString=${searchkey}`,
    {
      headers: authHeader(),
    }
  );
};
export const apiBillServiceList = (searchkey,billType) => {
  return apiClientBilling.get(
    `/bill/ipdBillingList/${searchkey}/${billType}`,
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
