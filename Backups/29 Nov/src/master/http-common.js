import axios from "axios";

export const baseUrl = "http://192.168.0.124:8090/masters";
//export const baseUrl = "http://192.168.0.113:8095/masters";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const serviceListPost = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const limsApiClient = axios.create({
  //baseURL: "http://192.168.0.113:8098/lims",
  baseURL: "http://192.168.0.124:8098/lims",
  headers: {
    "Content-type": "application/json",
  },
});
