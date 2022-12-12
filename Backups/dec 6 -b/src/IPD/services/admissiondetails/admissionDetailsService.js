import { mastersApi, ipdApi } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

export const getPatientType = () => {
  return mastersApi.get(`/patienttype/dropdown`, { headers: authHeader() });
};

export const getPatientSource = () => {
  return mastersApi.get(`/patientsource/dropdown`, { headers: authHeader() });
};

export const getCamp = () => {
  return mastersApi.get(`/camp`, { headers: authHeader() });
};

export const getVisitType = () => {
  return mastersApi.get(`/visittype/dropdown`, { headers: authHeader() });
};

export const getPatientCategory = () => {
  return mastersApi.get(`/patientCategory/dropdown`, { headers: authHeader() });
};

export const getTariff = () => {
  return mastersApi.get(`/tariffs/dropdown`, { headers: authHeader() });
};

export const getCompanyName = (patientCategory) => {
  console.log("patientCategory", patientCategory);
  return mastersApi.get(`/company/dropdown/${patientCategory}`, {
    headers: authHeader(),
  });
};

// units
export const getUnitsDropDown = () => {
  return mastersApi.get(`/units/dropdown`, { headers: authHeader() });
};

export const getDepartment = (unitId) => {
  return mastersApi.get(`/departments/departmentdropdown/${unitId}`, {
    headers: authHeader(),
  });
};

export const getSubDepartment = (departmentId) => {
  // console.log(departmentId);
  return mastersApi.get(`/subdepartments/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

export const getDoctors = (departmentId) => {
  // console.log(departmentId);
  return mastersApi.get(`/employees/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

//Refferal Doctor Details

export const getReferralType = () => {
  return mastersApi.get(`/refertype/dropdown`, { headers: authHeader() });
};

export const getReferralDoctor = () => {
  return mastersApi.get(`/referraldoctors/dropdown`, { headers: authHeader() });
};

//Internal Doctor API

//Post API for Admission Details
export const saveAdmissionData = (admissionDetails) => {
  console.log(admissionDetails);
  return ipdApi.post(`/admission`, admissionDetails, {
    headers: authHeader(),
  });
};

// **** API FOR ADMISSION LIST ****

//Post API for Admission List
export const getAdmissionList = (admissionDetails) => {
  console.log(admissionDetails);
  return ipdApi.post(`/admission/admissionList`, admissionDetails, {
    headers: authHeader(),
  });
};

//Filter Related API's
// 1.Units
export const getUnitList = () => {
  return mastersApi.get(`/units/dropdown`, {
    headers: authHeader(),
  });
};
// 2.Floor
export const getFloor = () => {
  return mastersApi.get(`/units/dropdown`, {
    headers: authHeader(),
  });
};

// Nurse List API
export const getNurseList = () => {
  return ipdApi.get(`/employees/getNurseList`, {
    headers: authHeader(),
  });
};

//Receive Patient API
export const receivedPatient = (receiverInfo) => {
  return ipdApi.post(`/admission/receivedBy`, receiverInfo, {
    headers: authHeader(),
  });
};

//Medicliam Amount API
export const addMediclaimAmount = (amount, visitId) => {
  return ipdApi.get(`/admission/updateMadiClaimAmount/${amount}/${visitId}`, {
    headers: authHeader(),
  });
};
