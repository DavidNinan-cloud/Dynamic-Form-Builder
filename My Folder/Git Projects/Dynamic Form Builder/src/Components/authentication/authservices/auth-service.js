import apiClient, { baseUrl } from "../../DashBoard/http-common";

const login = async (username, password, unitId, subunitId, storeId) => {
  const response = await apiClient.post(baseUrl + `/auth/login`, {
    username,
    password,
    unitId,
    subunitId,
    storeId,
  });
  if (response.data.result.token) {
    console.log("Checking token");
    localStorage.setItem("loggedUser", JSON.stringify(response.data.result));
  }
  return response.data.result;
};

const logout = () => {
  console.log("Logging out!!!");
  localStorage.removeItem("loggedUser");
};

const authService = {
  login,
  logout,
};

export default authService;
