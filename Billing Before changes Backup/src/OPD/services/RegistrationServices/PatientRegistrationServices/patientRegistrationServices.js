import apiClient from "../../../http-common";
import apiClient1 from "../../../http-common-billing";
import apiClient2 from "../../../http-common-opd";
import apiClient3 from "../../../http-common-precription"
import authHeader from "../../../../authentication/authservices/auth-header";
//Patient Mobile No. APIs
export const getMobileNo = (searchkey) => {
  return apiClient2.get(`/patientInfo/patientAutocomplete/${searchkey}`, {
    headers: authHeader(),
  });
};

//ISD Code API
export const getIsdNo = () => {
  return apiClient.get(`/isd/dropdown`, { headers: authHeader() });
};

//Patient Basic Info based on Mobile No. APIs
export const getDetailsBasedOnMobileNo = (mobileId) => {
  return apiClient2.get(`/patientInfo/patientInfoById/${mobileId}`, {
    headers: authHeader(),
  });
};

//Patient Basic Info APIs
export const getPrefix = () => {
  return apiClient.get(`/prefix/dropdown`, { headers: authHeader() });
};

export const getSystemDate = () => {
  return apiClient.get(`/api/getDate`, { headers: authHeader() });
};

export const getAgeonDOB = (dob) => {
  //   console.log(dob);
  return apiClient.get(`/calculateAge/${dob}`, { headers: authHeader() });
};

export const getDOBonAge = (age) => {
  //   console.log(dob);
  return apiClient.get(`/calculateAge/getDob/${age}`, {
    headers: authHeader(),
  });
};

export const getBloodGroup = () => {
  return apiClient.get(`/bloodgroups/dropdown`, { headers: authHeader() });
};

export const getMaritalStatus = () => {
  return apiClient.get(`/maritalstatus/dropdown`, { headers: authHeader() });
};

export const getGenders = () => {
  return apiClient.get(`/genders/dropdown`, { headers: authHeader() });
};

export const getNationality = () => {
  return apiClient.get(`/nationality/dropdown`, { headers: authHeader() });
};

export const getIdentificationDoc = () => {
  return apiClient.get(`/citizenidproofs/dropdown`, { headers: authHeader() });
};
// Address Info APIs
export const getCountry = () => {
  return apiClient.get(`/countries/dropdown`, { headers: authHeader() });
};

export const getState = (countryId) => {
  // console.log(countryId);
  return apiClient.get(`/state/dropdown/${countryId}`, {
    headers: authHeader(),
  });
};

export const getDistrict = (stateId) => {
  return apiClient.get(`/districts/dropdown/${stateId}`, {
    headers: authHeader(),
  });
};

export const getArea = (pincodeId) => {
  return apiClient.get(`/area/dropdown/${pincodeId}`, {
    headers: authHeader(),
  });
};

export const getTahshil = (districtId) => {
  return apiClient.get(`/talukas/dropdown/${districtId}`, {
    headers: authHeader(),
  });
};

export const getCity = (tehshilId) => {
  return apiClient.get(`/cities/dropdown/${tehshilId}`, {
    headers: authHeader(),
  });
};

export const getPincodeBySearchId = (searchKey) => {
  return apiClient.get(`/pinCode/search/${searchKey}`, {
    headers: authHeader(),
  });
};

export const getDetailsonPincodeId = (pincodeId) => {
  // console.log(pincodeId);
  return apiClient.get(`/pinCode/${pincodeId}`, { headers: authHeader() });
};

//Refferal Doctor Details

export const getReferralType = () => {
  return apiClient.get(`/refertype/dropdown`, { headers: authHeader() });
};

export const getReferralDoctor = () => {
  return apiClient.get(`/referraldoctors/dropdown`, { headers: authHeader() });
};

//Visit Details

export const getPatientType = () => {
  return apiClient.get(`/patienttype/dropdown`, { headers: authHeader() });
};

export const getPatientSource = () => {
  return apiClient.get(`/patientsource/dropdown`, { headers: authHeader() });
};

export const getVisitType = () => {
  return apiClient.get(`/visittype/dropdown`, { headers: authHeader() });
};

export const getPatientCategory = () => {
  return apiClient.get(`/patientCategory/dropdown`, { headers: authHeader() });
};

export const getCompanyName = (patientCategory) => {
  console.log("patientCategory", patientCategory);
  return apiClient.get(`/company/dropdown/${patientCategory}`, {
    headers: authHeader(),
  });
};

export const getTariff = () => {
  return apiClient.get(`/tariffs/dropdown`, { headers: authHeader() });
};

export const getDepartment = (unitId) => {
  return apiClient.get(`/departments/departmentdropdown/${unitId}`, {
    headers: authHeader(),
  });
};

export const getCabin = () => {
  return apiClient.get(`/cabins/dropdown`, { headers: authHeader() });
};

export const getSubDepartment = (departmentId) => {
  // console.log(departmentId);
  return apiClient.get(`/subdepartments/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

export const getDoctors = (departmentId) => {
  // console.log(departmentId);
  return apiClient.get(`/employees/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

// export const getDoctorList = () => {
//   return apiClient.get(``);
// };

//Representative Details
export const getRelationship = () => {
  return apiClient.get(`/patientrelationship/dropdown`, {
    headers: authHeader(),
  });
};

//Post API to Register Patient
export const registerPatient = (patientDetails) => {
  // console.log(patientDetails);
  return apiClient2.post(`/patientInfo`, patientDetails, {
    headers: authHeader(),
  });
};

//Post API to Register Patient Visit
export const registerPatientVisit = (patientVisitDetails) => {
  // console.log(patientVisitDetails);
  return apiClient2.post(`/patientVisit`, patientVisitDetails, {
    headers: authHeader(),
  });
};

//API to Get Register Patient List

export const getRegisteredPatientList = (details) => {
  // console.log(details);
  return apiClient2.post(`/patientInfo/patientlist`, details, {
    headers: authHeader(),
  });
};

export const getSearchOptionRegistrationList = (enteredData) => {
  // console.log(enteredData);
  return apiClient2.get(
    `/patientInfo/patientAutocompleteOnList?searchString=${enteredData}`,
    { headers: authHeader() }
  );
};

export const updatePatientData = (details) => {
  console.log("UpdateDetails", details);
  return apiClient2.put(`/patientInfo`, details, { headers: authHeader() });
};

export const getVisitPatientList = (details) => {
  // console.log(details);
  return apiClient2.post(`/patientVisit/patientVisitList`, details, {
    headers: authHeader(),
  });
};

export const getSearchOptionVisitList = (enteredData) => {
  // console.log(enteredData);
  return apiClient2.get(
    `/patientVisit/PatientAutocompleteOnVisitList/${enteredData}`,
    { headers: authHeader() }
  );
};

// Apis to fill data on PatientId or AppointmentId

export const getpatientInfoById = (patientId) => {
  // console.log("patientId",patientId);
  return apiClient2.get(`/patientInfo/patientInfoById/${patientId}`, {
    headers: authHeader(),
  });
};

export const getpatientInfoByApptId = (appointmentId) => {
  // console.log("appointmentId",appointmentId);
  return apiClient2.get(`/appointment/getAppointmentDetails/${appointmentId}`, {
    headers: authHeader(),
  });
};

//Visit List APIs

export const callPatient = (patientVisitId) => {
  return apiClient2.get(`/patientVisit/call/${patientVisitId}`, {
    headers: authHeader(),
  });
};

// units
export const getUnitsDropDown = () => {
  return apiClient.get(`/units/dropdown`, { headers: authHeader() });
};

//get prescription Api
export const getPrescription = (visitId) => {
  return apiClient3.get(`/reports/generatePdf/prescription?visitId=${visitId}`);
};
