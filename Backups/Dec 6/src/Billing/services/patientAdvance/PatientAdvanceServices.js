
import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling from '../../http-common-billing'
import apiClientOpd from '../../http-common-opd'
import apiClientMaster from '../../http-common-masters'
import { pdfUrl } from '../../http-common-reports';

export const fetchAdvanceReceipt = (patientId,paymentId)=>{
  return pdfUrl.get(`/generatePdf/advanceReceipt?patientId=${patientId}&paymentId=${paymentId}`,{headers:authHeader()});
}

export const fetchPatientAdvanceDetails = (searchString)=>{
  return apiClientBilling.get(`/payment/patientDetails/${searchString}`,{headers:authHeader()});
}

//Post request to save the modal form data into the database.
export const savePaymentAdvance = async (savePaymentAdvanceObj) => {
    return await apiClientBilling.post(`/payment`, savePaymentAdvanceObj,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchPatientAdvance = (searchString) => {
    return apiClientOpd.get(`/patientInfo/patientAutocomplete/${searchString}`,{headers:authHeader()});
  };

  //Get payment
export const getPaymentTypes = () => {
  return apiClientMaster.get(`/paymentType/dropdown`,{headers:authHeader()});
  };