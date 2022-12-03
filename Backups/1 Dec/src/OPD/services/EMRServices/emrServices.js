import apiClient from "../../http-common";
import apiClient1 from "../../http-common-emr";
import authHeader from "../../../authentication/authservices/auth-header";

//Patient Info
export const getPatient = (patientId, visitId, visitNumber) => {
  return apiClient1.get(
    `/patientemr/getPatientInfoForEmr?patientId=${patientId}&visitId=${visitId}&visitNumber=${visitNumber}`,
    {
      headers: authHeader(),
    }
  );
};

//Vital
//Vital Charts Data
export const getChartDetails = (patientId) => {
  return apiClient1.get(`patientemr/getPatientVitals?patientId=${patientId}`, {
    headers: authHeader(),
  });
};

//Complaints
//Complaint List
export const getComplaints = (searchkey) => {
  return apiClient.get(`/complaints/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Documents
//Document Types
export const getDocumentType = () => {
  return apiClient.get(`/documenttype/dropdown`, {
    headers: authHeader(),
  });
};

//Diagnosis
//ICD code List
export const getICDCode = (searchkey) => {
  return apiClient.get(`/icdCode/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Allergies
//Allergies Types
export const getAllergies = (searchkey) => {
  return apiClient.get(`/allergy/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Investigation
//Test Type
export const getTestType = () => {
  return apiClient.get(`/tests/testtypedropdown`, { headers: authHeader() });
};

//Investigation Dropdown List
export const getInvestigationList = (testId) => {
  return apiClient.get(`/tests/investigation/${testId}`, {
    headers: authHeader(),
  });
};

// Symptoms
//Symptoms List
export const getSymptoms = (searchkey) => {
  return apiClient.get(`/symptoms/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Services
export const getService = (searchkey) => {
  return apiClient.get(`/services/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Prescription
//Drug Name List
export const getDrugName = (prescriptionName, searchkey) => {
  return apiClient.get(`/drugmaster/search/${prescriptionName}/${searchkey}`, {
    headers: authHeader(),
  });
};

//Instruction List
export const getInstruction = (searchkey) => {
  return apiClient.get(`/instructions/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Frequency List
export const getFrequency = () => {
  return apiClient.get(`/frequency/dropdown`, {
    headers: authHeader(),
  });
};

//Doses
export const getDoses = () => {
  return apiClient.get(`/dose/dropdown`, { headers: authHeader() });
};

//Route List
export const getRoute = () => {
  return apiClient.get(`/route/dropdown`, {
    headers: authHeader(),
  });
};

//Department
export const getDepartment = () => {
  return apiClient.get(`/departments/dropdown`, { headers: authHeader() });
};

//Doctors List
export const getDoctors = (departmentId) => {
  // console.log(departmentId);
  return apiClient.get(`/employees/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

//Copy Prescription
export const copyPrescription = (patientId) => {
  return apiClient1.get(
    `/patientemr/getPreviousPrescription?patientId=${patientId}`,
    {
      headers: authHeader(),
    }
  );
};

//POST EMR Data
export const saveEMRData = (details) => {
  // console.log(departmentId);
  return apiClient1.post(`/patientemr`, details, {
    headers: authHeader(),
  });
};

//Get EMR Details Based of Patient Info Id
export const getPatientInfoById = (patientInfoId) => {
  return apiClient1.post(
    `/patientemr/getPatientAssessmentDetails`,
    patientInfoId,
    { headers: authHeader() }
  );
};

//Get  Details Based on Visit Number
export const getDetailsByVisitNumber = (visitNumber) => {
  return apiClient1.post(
    `/patientemr/getPatientAssessmentDetails`,
    visitNumber,
    { headers: authHeader() }
  );
};
