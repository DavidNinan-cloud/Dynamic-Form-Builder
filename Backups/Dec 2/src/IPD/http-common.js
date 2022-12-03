import axios from "axios";
export const baseUrl = "http://192.168.0.124:8090/masters";
export const baseUrl1 = "http://192.168.0.124:8090/opd";
export const baseUrl2 = "http://192.168.0.124:8090/ipd";
// export const baseUrl2 = "http://192.168.0.141:8097/ipd";

export const mastersApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const opdApi = axios.create({
  baseURL: baseUrl1,
  headers: {
    "Content-type": "application/json",
  },
});

export const ipdApi = axios.create({
  baseURL: baseUrl2,
  headers: {
    "Content-type": "application/json",
  },
});
