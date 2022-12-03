import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";


//  GET SERVICES
export const getAllInput = async (visitId) => {
  console.log("fetch all Output id is" + visitId);
  console.log('--------',typeof(visitId));
  return await ipdApi.get(`/patientassessment/getPatientInputs?type=input&visitId=${visitId}`,{
    headers: authHeader(),
  });
};
//  GET SERVICES
export const getAllOutput = async (visitId) => {
  console.log("fetch all Output id is" + visitId);
  console.log('--------',typeof(visitId));
  return await ipdApi.get(`/patientassessment/getPatientOutputs?type=output&&visitId=${visitId}`,{
    headers: authHeader(),
  });
};




//POST SERVICES
export const saveInputOutput = async (saveInputOutput) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(saveInputOutput)
  );
  return await ipdApi.post(`/patientassessment/saveInputOutput`, saveInputOutput, {
    headers: authHeader(),
  });
};
// export const saveVentilationOxygenRecords = () => {
//   return ipdApi.post(`/ipd/patientassessment/saveVentilationOxygenRecords`, { headers: authHeader() });
// };





