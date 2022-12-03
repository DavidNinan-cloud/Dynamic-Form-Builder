import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

//GET Service API For Pain Assessment  tab 1st Table
export const getAllCareNPosition = (id) => {
  // /ipd/patientassessment/getCareAndPosition?visitId=1123
  console.log("fetch all Pain Assessment id is " + id);
  // console.log('--------',typeof(id));
  return ipdApi.get(`/patientassessment/getCareAndPosition?visitId=${id}`, {
    headers: authHeader(),
  });
};

export const addNewcareNPosition = async (createCarenPosition) => {
  // ​/ipd​/patientassessment​/saveCareAndPosition
  console.log(
    "Object sent for CarePosition data record creation is" +
      JSON.stringify(createCarenPosition)
  );
  return await ipdApi.post(
    `/patientassessment/saveCareAndPosition`,
    createCarenPosition,
    { headers: authHeader() }
  );
};
