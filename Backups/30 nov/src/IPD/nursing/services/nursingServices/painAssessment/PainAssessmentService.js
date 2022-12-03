import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

//GET Service API For Pain Assessment  tab 1st Table
export const getAllPainAssessment = (id) => {
  // /ipd/patientassessment/getPatientPainAssessment?visitId=1122
  // console.log("fetch all Pain Assessment id is " + id);
  // console.log('--------',typeof(id));
  return ipdApi.get(
    `patientassessment/getPatientPainAssessment?visitId=${id}`,
    {
      headers: authHeader(),
    }
  );
};

//POST service for savng the patient fall assessment
export const addNewPatientAssessment = (createPatientAssessment) => {
  return ipdApi.post(
    `patientassessment/savePatientFallAssessment/`,
    createPatientAssessment,
    {
      headers: authHeader(),
    }
  );
};

//GET service for getting the patient fall assessment
export const getPatientFallAssessment = (id) => {
  return ipdApi.get(
    `patientassessment/getPatientFallAssessment?visitId=${id}`,
    {
      headers: authHeader(),
    }
  );
};

//GET Service API For Dailt Weight  tab 1st Table
export const getAllDailyWeight = (id) => {
  // /ipd/patientassessment/getDailyWeight?visitId=1122
  console.log("fetch all Daily Weight id is " + id);
  console.log("--------", typeof id);
  return ipdApi.get(`patientassessment/getDailyWeight?visitId=${id}`, {
    headers: authHeader(),
  });
};

//POST SERVICES For Save Weight
export const addNewWeight = async (createWeight) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createWeight)
  );
  return await ipdApi.post(
    `/patientassessment/savePatientDailyWeight`,
    createWeight,
    {
      headers: authHeader(),
    }
  );
};

export const addNewPatientPainScore = async (createPatientPainScore) => {
  // 192.168.0.124:8097/ipd/patientassessment/savePatientPainAssessment
  console.log(
    "Object sent for data record creation is " +
      JSON.stringify(createPatientPainScore)
  );
  return await ipdApi.post(
    `/patientassessment/savePatientPainAssessment`,
    createPatientPainScore,
    {
      headers: authHeader(),
    }
  );
};
