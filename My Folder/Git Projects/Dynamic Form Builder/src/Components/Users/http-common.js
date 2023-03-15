import axios from "axios";

export const baseUrl = "http://localhost:3000/";
// export const baseUrl = "http://192.168.0.127:8095/masters";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
