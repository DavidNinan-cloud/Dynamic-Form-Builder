import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";


export const getAllNursingNote = (filter,visitId) => {
    console.log("fetch all nursing note visitid is " + visitId);
    return ipdApi.get(`/patientassessment/getNursingNotes?filter=${filter}&visitId=${visitId}`,{
      headers: authHeader(),
    });
  };

//   http://192.168.0.124:8097/ipd/patientassessment/getNursingNotes?filter=All&visitId=1222

