import apiClientReports, { pdfUrl } from '../http-common-reports'
import apiClientBilling from '../http-common-billing'
import authHeader from "../../authentication/authservices/auth-header";
export  const fetchAllBills = async (visitId) => {
      return apiClientBilling.get(`/bill/billList/${visitId}` , {headers:authHeader()});
  };

  // /generatePdf/getBillPrint?billId=92&visitId=206
  export const getBill = (billId,visitId) => {
    return pdfUrl.get(`/generatePdf/getBillPrint?billId=${billId}&visitId=${visitId}` , {headers:authHeader()});
  };