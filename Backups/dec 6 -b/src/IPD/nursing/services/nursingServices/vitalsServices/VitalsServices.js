import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

// Get Service
export const getAllVitals = (id) => {
  console.log("Fetch all vitals" + id);
  return ipdApi.get(`/patientassessment/getPatientVitals?visitId=${id}`, {
    headers: authHeader(),
  });
};

export const savePatientVitals = async (createVital) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createVital)
  );
  return await ipdApi.post(
    `/patientassessment/savePatientVitals`,
    createVital,
    {
      headers: authHeader(),
    }
  );
};
