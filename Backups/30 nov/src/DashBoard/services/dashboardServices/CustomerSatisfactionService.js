import authHeader from "../../../authentication/authservices/auth-header";
import apiClient from "../../http-common";

export const getCustomerSatisfactionCount = () => {
    return apiClient.get(`dashboard/getCustomerSatisfactionCount`, {
      headers: authHeader(),
    });
  };