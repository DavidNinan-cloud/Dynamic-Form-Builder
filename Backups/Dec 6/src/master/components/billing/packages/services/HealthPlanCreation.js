import apiClient from '../../.././../http-common'
import authHeader from "../../../../../authentication/authservices/auth-header";

export const fetchServiceSearch = (input) => {
    return apiClient.get(`/package/serviceAutocompleteHealthPlan`,input  ,{headers:authHeader()});
  };
  // export const fetchServiceSearch = (input) => {
  //   return apiClient.get(`/package/serviceAutocompleteHealthPlan?searchString=${input.searchString}&tariffId=${input.tariffId}&unitId=${input.unitId}`  ,{headers:authHeader()});
  // };