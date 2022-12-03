import apiClientMaster from '../../http-common-masters'
import apiClientBilling from '../../http-common-billing'
import apiClientReports, { pdfUrl } from '../../http-common-reports'
import authHeader from "../../../authentication/authservices/auth-header";

export const fetchAllPayments = async (billId) => {
      return apiClientBilling.get(`/payment/paymentHistory/${billId}` , {headers:authHeader()});
  };

  // /generatePdf/getBillPrint?billId=92&visitId=206
export const getPayments = (billId,visitId,paymentId) => {
return pdfUrl.get(`/generatePdf/billReceipt?billId=${billId}&paymentId=${paymentId}&visitId=${visitId}` , {headers:authHeader()});
};