import { mastersApi } from "../../http-common";
import authHeader from "../../../authentication/authservices/auth-header";

//Allergies
//Allergies Types
export const getAllergies = (searchkey) => {
  return mastersApi.get(`/allergy/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Complaints
//Complaint List
export const getComplaints = (searchkey) => {
  return mastersApi.get(`/complaints/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Diagnosis
//ICD code List
export const getICDCode = (searchkey) => {
  return mastersApi.get(`/icdCode/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Prescription
//Drug Name List
export const getDrugName = (prescriptionName, searchkey) => {
  return mastersApi.get(`/drugmaster/search/${prescriptionName}/${searchkey}`, {
    headers: authHeader(),
  });
};

//Instruction List
export const getInstruction = (searchkey) => {
  return mastersApi.get(`/instructions/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Frequency List
export const getFrequency = () => {
  return mastersApi.get(`/frequency/dropdown`, {
    headers: authHeader(),
  });
};

//Doses
export const getDoses = () => {
  return mastersApi.get(`/dose/dropdown`, { headers: authHeader() });
};

//Route List
export const getRoute = () => {
  return mastersApi.get(`/route/dropdown`, {
    headers: authHeader(),
  });
};
