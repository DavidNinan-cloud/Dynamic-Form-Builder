import apiClient from "../../http-common";
import apiClient1 from "../../http-common-appointment"
import authHeader from "../../../authentication/authservices/auth-header";

// Sidebar Menu API
export const getSidebarMenus = () => {
  return apiClient.get(`/functionality/getDrawerMenu`, {
    headers: authHeader(),
  });
};

export const getSidebarIcon = (path) => {
  path.map((row, index) => {
    return apiClient.get(`/file/${row.drawerMenuPath}`, {
      headers: authHeader(),
    });
  });
};

export const getGlobalSearchOption = (enteredData) => {
  // console.log(enteredData);
  return apiClient1.get(
    `/patientInfo/patientAutocompleteOnList?searchString=${enteredData}`,
    { headers: authHeader() }
  );
};
