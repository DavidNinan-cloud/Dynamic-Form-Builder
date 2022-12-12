import axios from "axios";
export const baseUrl = "http://192.168.0.124:8090/masters";
export default axios.create({
  // baseURL: "http://192.168.0.116:8095/masters",
  // baseURL: "http://192.168.0.110:8095/masters",
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
