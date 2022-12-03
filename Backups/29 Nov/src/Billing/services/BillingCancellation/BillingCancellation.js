
import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling from '../../http-common-billing'
import apiClientOpd from '../../http-common-opd'
import apiClientMaster from '../../http-common-masters'

export const fetchPatientBillCancelDetails = (searchId)=>{
  return apiClientBilling.get(`/bill/billListOnCancellation/${searchId}`,{headers:authHeader()});
}

//Post request to save the modal form data into the database.
export const saveCancelDetails = async (saveCancelObj) => {
    return await apiClientBilling.post(`/bill/cancel`, saveCancelObj,{headers:authHeader()});
  };

//Search ICon API
export const autoSearchPatientBillCancellations = (searchString) => {
    return apiClientBilling.get(`/bill/patientSearchOnCancel?searchString=${searchString}`,{headers:authHeader()});
  };

  //Get payment
export const getCancellationReason = () => {
  return apiClientMaster.get(`/cancelBill/dropdown`,{headers:authHeader()});
  };