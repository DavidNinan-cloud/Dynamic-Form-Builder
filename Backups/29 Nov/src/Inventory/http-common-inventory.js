import axios from "axios";
export const baseUrl = "http://192.168.0.124:8090/inventory";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
