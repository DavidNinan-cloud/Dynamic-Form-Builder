import authHeader from '../../../authentication/authservices/auth-header';
import apiClientBilling from '../../http-common-billing'
import apiClientOpd from '../../http-common-opd'
import apiClientMaster from '../../http-common-masters'

export const fetchPatientBillCancelDetails = (searchId)=>{
  return apiClientBilling.get(`/bill/billListOnCancellation/${searchId}`,{headers:authHeader()});
}

export const callSelfList = async (obj) => {
    return await apiClientBilling.post(`/bill/BillListSettlement`, obj,{headers:authHeader()});
  };
