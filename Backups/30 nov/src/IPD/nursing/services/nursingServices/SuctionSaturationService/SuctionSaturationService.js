import { ipdApi } from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

//  GET SERVICES
export const getAllSuctionSaturation = async (id) => {
  console.log("fetch all succion Saturation id is" + id);
  console.log('--------',typeof(id));
  return await ipdApi.get(`/patientassessment/getSuctionSaturation?visitId=${id}`,{
    headers: authHeader(),
  });
};





