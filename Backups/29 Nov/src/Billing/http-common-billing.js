import axios from "axios";

export const baseUrl = "http://192.168.0.141:8096/billing";
export default axios.create({
  // baseURL: "http://192.168.0.116:8095/masters",

  baseURL: baseUrl,

  headers: {
    "Content-type": "application/json",
  },
});

export const billing =  axios.create({
  // baseURL: "http://192.168.0.116:8095/masters",

  baseURL: "http://192.168.0.141:8090/billing",

  headers: {
    "Content-type": "application/json",
  },
});