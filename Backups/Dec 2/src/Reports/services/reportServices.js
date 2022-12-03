import apiClient from '../http-common'
import authHeader from "../../authentication/authservices/auth-header";
import {baseUrl} from '../http-common'
export const getreportsfilter = (functionalityId) => {
    return apiClient.get(`getreportsfilter/${functionalityId}` , {headers:authHeader()});
};

export const getDropdownApi = async (url) => {
    const response = await apiClient.get( baseUrl + url , {headers:authHeader()});
    return response
};

export const getSearchBarApi = async (url,value) => {
    const response = await apiClient.get( baseUrl + url + value , {headers:authHeader()});
    return response
};

export const getDependentDropdownApi = async (url,value) => {
    console.log('api value',baseUrl + url + value)
    const response = await apiClient.get( baseUrl + url + value, {headers:authHeader()});
    return response
};
// export const postApi = async (url,value) => {
//     const response = await apiClient.get( baseUrl + url + value , {headers:authHeader()});
//     return response
// };
export const postApi = (url,searchAppObj) => {
    console.log('postApi',baseUrl + url)
    return apiClient.post( baseUrl + "/reports"+ url, searchAppObj , {headers:authHeader()});
  };