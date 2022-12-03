import apiClient from '../../.././../http-common'
import authHeader from "../../../../../authentication/authservices/auth-header";

export const fetchServiceSearch = (input) => {
    return apiClient.get(`/package/serviceAutocompleteHealthPlan?searchString=${input}`  ,{headers:authHeader()});
  };
