import axios from "axios";

export default axios.create({

  baseURL: "http://192.168.0.124:8090/opd",
  // baseURL: "http://ec2-3-93-66-50.compute-1.amazonaws.com:8090/masters",
  headers: {
    "Content-type": "application/json",
  },
});
