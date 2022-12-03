import axios from "axios";

export const baseUrl = "http://192.168.0.124:8090/api/user-service";
// export const baseUrl = "http://192.168.0.133:8090/api/user-service";

export default axios.create({
  //Base URL For Dashboard Sidebar Menu
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
