import { toast } from "react-toastify";

export const successAlert = () => {
  // window.alert("Invalid Credentials");
  toast.success("Data Added successfully", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const errorAlert = () => {
  // window.alert("Invalid Credentials");
  toast.error("Unable to Add Data", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const infoAlert = () => {
  // window.alert("Invalid Credentials");
  toast.info("Data Added successfully", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const warningAlert = () => {
  // window.alert("Invalid Credentials");
  toast.warn("Data Added successfully", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

