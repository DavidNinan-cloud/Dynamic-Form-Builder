import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";


//  GET SERVICES
export const getAllOxygenVantilation = async (id) => {
  console.log("fetch all oxygen id is" + id);
  console.log('--------',typeof(id));
  return await ipdApi.get(`/patientassessment/getVentilation?visitId=${id}`,{
    headers: authHeader(),
  });
};

//http://192.168.0.124:8097/ipd/patientassessment/saveVentilationOxygenRecords

//POST SERVICES
export const saveVentilationOxygenRecords = async (createOxygen) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createOxygen)
  );
  return await ipdApi.post(`/patientassessment/saveVentilationOxygenRecords`, createOxygen, {
    headers: authHeader(),
  });
};
// export const saveVentilationOxygenRecords = () => {
//   return ipdApi.post(`/ipd/patientassessment/saveVentilationOxygenRecords`, { headers: authHeader() });
// };





