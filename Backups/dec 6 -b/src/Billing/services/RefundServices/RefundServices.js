
import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling, { billing } from '../../http-common-billing'
import apiClientOpd from '../../http-common-opd'
import apiClientMaster from '../../http-common-masters'
import { pdfUrl } from '../../http-common-reports';

export const fetchRefundReceipt = (patientId,refundId)=>{
  return pdfUrl.get(`/generatePdf/refundReceipt?patientId=${patientId}&refundId=${refundId}`,{headers:authHeader()});
}

  //Get payment
export const getPaymentTypes = () => {
  return apiClientMaster.get(`/paymentType/dropdown`,{headers:authHeader()});
  };
export const fetchPatientBillRefundDetails = (searchId)=>{
  return apiClientBilling.get(`/bill/billListCancelled/${searchId}`,{headers:authHeader()});
}

export const fetchBillServiceDetails = (billId)=>{
  return apiClientBilling.get(`/bill/serviceListByBillId/${billId}`,{headers:authHeader()});
}

//Post request to save the modal form data into the database.
export const saveRefundDetails = async (saveCancelObj) => {
    return await billing.post(`/advanceRefund`, saveCancelObj,{headers:authHeader()});
  };

export const saveRefundAdvanceDetails = async (saveCancelObj) => {
  return await billing.post(`/advanceRefund/advance`, saveCancelObj,{headers:authHeader()});
};

//Search ICon API
export const autoSearchPatientRefund = (searchString) => {
    return apiClientBilling.get(`/bill/patientSearchOnRefund?searchString=${searchString}`,{headers:authHeader()});
  };

  //Get payment
export const getCancellationReason = () => {
  return apiClientMaster.get(`/cancelBill/dropdown`,{headers:authHeader()});
  };