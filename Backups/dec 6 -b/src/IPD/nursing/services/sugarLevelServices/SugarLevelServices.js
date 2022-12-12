import { ipdApi } from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

// Get Service
export const getSugarLevels = (id) => {
  console.log("Fetch all sugar levels" + id);
  return ipdApi.get(`/patientassessment/getSugarLevel?visitId=${id}`, {
    headers: authHeader(),
  });
};

export const saveSugarLevel = async (createSugarLevel) => {
  console.log(
    "Object sent for save record creation is " +
      JSON.stringify(createSugarLevel)
  );
  return await ipdApi.post(
    `/patientassessment/saveSugarLevel`,
    createSugarLevel,
    {
      headers: authHeader(),
    }
  );
};

export const updateSugarLevelByRmo = async (updateSugarLevelRmo) => {
  console.log(
    "Object sent for update record creation is " +
      JSON.stringify(updateSugarLevelRmo)
  );
  return await ipdApi.put(
    `/patientassessment/updateSugarLevelByRmo`,
    updateSugarLevelRmo,
    {
      headers: authHeader(),
    }
  );
};

export const updateSugarLevelByNurse = async (updateSugarLevelNurse) => {
  console.log(
    "Object sent for update record creation is " +
      JSON.stringify(updateSugarLevelNurse)
  );
  return await ipdApi.put(
    `/patientassessment/updateSugarLevelByNurse`,
    updateSugarLevelNurse,
    {
      headers: authHeader(),
    }
  );
};

export const getConsultantList = () => {
  return ipdApi.get(`/employees/getDoctorList`, {
    headers: authHeader(),
  });
};

export const getRmoDoctorList = () => {
  return ipdApi.get(`/employees/getRmoDoctorList`, {
    headers: authHeader(),
  });
};

export const getIntakeModeList = () => {
  return ipdApi.get(`/intakemode`, {
    headers: authHeader(),
  });
};

export const getDrugList = async (searchString) => {
  return await ipdApi.get(`/drugmaster/search/Brand/${searchString}`, {
    headers: authHeader(),
  });
};
