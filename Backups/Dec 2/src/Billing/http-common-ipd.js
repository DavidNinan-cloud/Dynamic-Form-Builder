import axios from "axios";

export const baseUrl2 = "http://192.168.0.124:8090/ipd";
// export const baseUrl2 = "http://192.168.0.141:8097/ipd";

export const ipdApi = axios.create({
  baseURL: baseUrl2,
  headers: {
    "Content-type": "application/json",
  },
});
