import axios from "axios";

export const baseUrl = "http://192.168.0.124:8098/lims";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
