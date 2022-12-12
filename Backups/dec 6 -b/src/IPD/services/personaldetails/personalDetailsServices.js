import { mastersApi, opdApi } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//Patient Mobile No. APIs
export const getMobileNo = (searchkey) => {
  return opdApi.get(`/patientInfo/patientAutocomplete/${searchkey}`, {
    headers: authHeader(),
  });
};

//ISD Code API
export const getIsdNo = () => {
  return mastersApi.get(`/isd/dropdown`, { headers: authHeader() });
};

//Patient Basic Info based on Mobile No. APIs
export const getDetailsBasedOnMobileNo = (mobileId) => {
  return opdApi.get(`/patientInfo/patientInfoById/${mobileId}`, {
    headers: authHeader(),
  });
};

//Patient Basic Info APIs
export const getPrefix = () => {
  return mastersApi.get(`/prefix/dropdown`, { headers: authHeader() });
};

export const getSystemDate = () => {
  return mastersApi.get(`/api/getDate`, { headers: authHeader() });
};

export const getAgeonDOB = (dob) => {
  //   console.log(dob);
  return mastersApi.get(`/calculateAge/${dob}`, { headers: authHeader() });
};

export const getDOBonAge = (age) => {
  //   console.log(dob);
  return mastersApi.get(`/calculateAge/getDob/${age}`, {
    headers: authHeader(),
  });
};

export const getBloodGroup = () => {
  return mastersApi.get(`/bloodgroups/dropdown`, { headers: authHeader() });
};

export const getMaritalStatus = () => {
  return mastersApi.get(`/maritalstatus/dropdown`, { headers: authHeader() });
};

export const getGenders = () => {
  return mastersApi.get(`/genders/dropdown`, { headers: authHeader() });
};

export const getNationality = () => {
  return mastersApi.get(`/nationality/dropdown`, { headers: authHeader() });
};

export const getIdentificationDoc = () => {
  return mastersApi.get(`/citizenidproofs/dropdown`, { headers: authHeader() });
};
// Address Info APIs
export const getCountry = () => {
  return mastersApi.get(`/countries/dropdown`, { headers: authHeader() });
};

export const getState = (countryId) => {
  // console.log(countryId);
  return mastersApi.get(`/state/dropdown/${countryId}`, {
    headers: authHeader(),
  });
};

export const getDistrict = (stateId) => {
  return mastersApi.get(`/districts/dropdown/${stateId}`, {
    headers: authHeader(),
  });
};

export const getArea = (pincodeId) => {
  return mastersApi.get(`/area/dropdown/${pincodeId}`, {
    headers: authHeader(),
  });
};

export const getTahshil = (districtId) => {
  return mastersApi.get(`/talukas/dropdown/${districtId}`, {
    headers: authHeader(),
  });
};

export const getCity = (tehshilId) => {
  return mastersApi.get(`/cities/dropdown/${tehshilId}`, {
    headers: authHeader(),
  });
};

export const getPincodeBySearchId = (searchKey) => {
  return mastersApi.get(`/pinCode/search/${searchKey}`, {
    headers: authHeader(),
  });
};

export const getDetailsonPincodeId = (pincodeId) => {
  // console.log(pincodeId);
  return mastersApi.get(`/pinCode/${pincodeId}`, { headers: authHeader() });
};

//Income Range
export const getIncome = () => {
  return mastersApi.get(`/income`, { headers: authHeader() });
};

//Refferal Doctor Details

export const getReferralType = () => {
  return mastersApi.get(`/refertype/dropdown`, { headers: authHeader() });
};

export const getReferralDoctor = () => {
  return mastersApi.get(`/referraldoctors/dropdown`, { headers: authHeader() });
};

// export const getDoctorList = () => {
//   return apiClient.get(``);
// };

//Representative Details
export const getRelationship = () => {
  return mastersApi.get(`/patientrelationship/dropdown`, {
    headers: authHeader(),
  });
};
