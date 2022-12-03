import { ipdApi, mastersApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

// /ipd/admission/getadmittedpatients

//Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const saveHumanBodyApplied = async (finalObj) => {
    return await ipdApi.post(`/patientassessment/savePatientEquipment`, finalObj, {
      headers: authHeader(),
    });
  };

export const getHumanBodyDetails = async (visitId) => {
return await ipdApi.get(`/patientassessment/getPatientEquipment?visitId=${visitId}`, {
    headers: authHeader(),
});
};


export const nurseListApi = async () => {
    return await mastersApi.get(`/employees/getNurseList`, {
      headers: authHeader(),
    });
  };
