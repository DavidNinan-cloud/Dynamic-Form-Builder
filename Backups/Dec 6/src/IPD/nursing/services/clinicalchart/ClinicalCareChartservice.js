import { ipdApi } from "../../../http-common";
import authHeader from "../../../../authentication/authservices/auth-header";

// /ipd/admission/getadmittedpatients

//Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchClinicalChartPatient = async (searchClinicalChartPatientObj) => {
    console.log("fetch all Clinical Chart Patient OBJ " + JSON.stringify(searchClinicalChartPatientObj));
    return await ipdApi.post(`/admission/getadmittedpatients`, searchClinicalChartPatientObj, {
      headers: authHeader(),
    });
  };