import apiClientMaster from '../http-common-masters'
import apiClientBilling from '../http-common-billing'
import authHeader from "../../authentication/authservices/auth-header";


export const getDoctorServicesDropDown = (visitId) => {
  return apiClientBilling.get(`/billInfo?visitId=${visitId}` , {headers:authHeader()});
};

// put services
export const putServices = async (updateServices) => {
  return await apiClientBilling.put(`/billInfo/updateBillInfo`, updateServices, { headers: authHeader(),});
};

export const getServicesInfo = (serviceName) => {
    return apiClientMaster.get(`/services/getServiceByName/${serviceName}` , {headers:authHeader()});
};


export const getPreviousBill = (BillingDetails) => {
  console.log(BillingDetails);
  return apiClientBilling.get(`/billInfo?visitId=${BillingDetails}`,  {headers:authHeader()});
};

export const saveServicePage = (BillingDetails) => {
    console.log(BillingDetails);
    return apiClientBilling.post(`/billInfo`, BillingDetails , {headers:authHeader()});
  };


export const generateBillingPage = (BillingDetails) => {
    console.log("BillingDetails",BillingDetails);
    return apiClientBilling.post(`/bill`, BillingDetails , {headers:authHeader()});
  };
    
  // direct opd patient search
export const getPatientBill = (string) => {
    return apiClientBilling.get(`/bill/patientSearch?searchString=${string}`,  {headers:authHeader()});
};

// export const getPatientBill = (string) => {
//   let stringObj = {
//     searchString:string
//   }
//     return apiClientBilling.get(`/bill/patientSearch`, {params:stringObj}, {headers:authHeader()});
// };