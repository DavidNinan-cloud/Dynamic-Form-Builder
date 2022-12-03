import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling, { billing } from '../../http-common-billing'

export const autoSearchPatientInfo = (searchString) => {
    return apiClientBilling.get(`/bill/patientSearchOnRefund?searchString=${searchString}`,{headers:authHeader()});
  };

// bill
export const billInfo = (searchString) => {
    return apiClientBilling.get(`/bill/BillListConsolidateReport/${searchString}`,{headers:authHeader()});
  };

// service
export const serviceInfo = (searchString) => {
    return apiClientBilling.get(`/billInfo/serviceListConsolidateReport/${searchString}`,{headers:authHeader()});
  };
// payment
export const paymentInfo = (searchString) => {
    return apiClientBilling.get(`/payment/paymentConsolidateReport/${searchString}`,{headers:authHeader()});
  };
// advance
export const refundInfo = (searchString) => {
    return apiClientBilling.get(`/advanceRefund/refundListConsolidateReport/${searchString}`,{headers:authHeader()});
};
// advance
export const advanceInfo = (searchString) => {
    return apiClientBilling.get(`/payment/advanceHistoryConsolidateReport/${searchString}`,{headers:authHeader()});
};