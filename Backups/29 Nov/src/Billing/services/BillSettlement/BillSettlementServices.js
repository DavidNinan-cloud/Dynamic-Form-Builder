import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling from '../../http-common-billing'
import apiClientOpd from '../../http-common-opd'
import apiClientMaster from '../../http-common-masters'

export const fetchPatientBillCancelDetails = (searchId)=>{
  return apiClientBilling.get(`/bill/billListOnCancellation/${searchId}`,{headers:authHeader()});
}


export const saveSettlementDetails = async (obj) => {
    return await apiClientBilling.post(`/billSettlement`, obj,{headers:authHeader()});
  };

export const callSelfList = async (obj) => {
    return await apiClientBilling.post(`/bill/BillListSettlement`, obj,{headers:authHeader()});
  };

export const callCompanyList = ()=>{
  return apiClientMaster.get(`/company/dropdown/`,{headers:authHeader()});
}

  //Get payment
  export const getPaymentTypes = () => {
    return apiClientMaster.get(`/paymentType/dropdown`,{headers:authHeader()});
    };