import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.0.124:8090/api/user-service",
  headers: {
    "Content-type": "application/json",
  },
});
