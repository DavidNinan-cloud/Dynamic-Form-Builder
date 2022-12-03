import apiClientMaster from '../http-common-masters'
import apiClientBilling from '../http-common-billing'
import authHeader from "../../authentication/authservices/auth-header";
export const getPaymentTypes = () => {
    return apiClientMaster.get(`/paymentType/dropdown`,{headers:authHeader()});
};

export const savePayment = (BillingDetails) => {
    console.log(BillingDetails);
    return apiClientBilling.post(`/payment`, BillingDetails,{headers:authHeader()});
};