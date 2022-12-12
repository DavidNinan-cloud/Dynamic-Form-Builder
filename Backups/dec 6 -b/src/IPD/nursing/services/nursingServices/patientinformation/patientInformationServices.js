import apiClient from "./http-common-ipd";
import apiClientTwo from "./http-common-masters";

//authentication header for all the api requests
import authHeader from "../../../../../../src/authentication/authservices/auth-header";

//Post request to save the modal's data
export const addNewPatient = async (patientInfoObj) => {
  return await apiClient.post(
    `/patientassessment/saveInitialAssessment`,
    patientInfoObj,
    {
      headers: authHeader(),
    }
  );
};

//get the nurse list
export const getNurseList = async () => {
  return await apiClientTwo.get(`employees/getNurseList`, {
    headers: authHeader(),
  });
};

//get the patient information through visitId
export const getPatientInformation = async (visitId) => {
  console.log("visitId is ", visitId);

  return await apiClient.get(
    `/patientassessment/getPatientInitialAssessment?visitId=${visitId}`,
    {
      headers: authHeader(),
    }
  );
};
