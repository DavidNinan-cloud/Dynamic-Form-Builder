import axios from "axios";

export const mastersApiClient = axios.create({
  baseURL: "http://192.168.0.124:8095/masters",
  //baseURL: "http://192.168.0.124:8090/masters",
  headers: {
    "Content-type": "application/json",
  },
});

export const limsApiClient = axios.create({
  baseURL: "http://192.168.0.124:8098/lims",
  //baseURL: "http://192.168.0.124:8098/lims",
  headers: {
    "Content-type": "application/json",
  },
});
