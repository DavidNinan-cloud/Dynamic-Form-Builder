import axios from "axios";

export const baseUrl = "http://192.168.0.124:8099/reports";
 const baseUrlReport = "http://192.168.0.124:8096/reports";
export default axios.create({
  // baseURL: "http://192.168.0.116:8095/masters",

  baseURL: baseUrlReport,

  headers: {
    "Content-type": "application/json",
  },
});


export const pdfUrl =  axios.create({
  // baseURL: "http://192.168.0.116:8095/masters",

  baseURL: baseUrl,

  headers: {
    "Content-type": "application/json",
  },
});
