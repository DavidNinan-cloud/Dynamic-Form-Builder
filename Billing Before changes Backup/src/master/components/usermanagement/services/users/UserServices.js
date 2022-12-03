//base url for api
import apiClientUser from "../../http-common-userservice";
import apiClientMaster from "../../../../http-common";
import authHeader from "../../../../../authentication/authservices/auth-header";

// // // Calculat DOB based on Age
export const getFunctionalities = async (roleId) => {
  return await apiClientUser.post(
    `/functionality/getassignedfunctionalities`,
    roleId,
    { headers: authHeader() }
  );
};
//autocomplte search bar api
export const autoSearchUsers = (searchString) => {
  console.log("search string", searchString);
  return apiClientUser.get(`auth/search/${searchString}`, {
    headers: authHeader(),
  });
};
//get list of record from api and show in table
export const fetchAllUsers = (searchUser) => {
  return apiClientUser.post(`/auth/userlist`, searchUser, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewUsers = async (createUser) => {
  console.log(
    "Object sent for data record creation is ",
    JSON.stringify(createUser)
  );
  return await apiClientUser.post(`/auth/saveUser`, createUser, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getUserById = (userid) => {
  console.log("in api  service " + userid + "id");
  return apiClientUser.get(`/auth/${userid}`, {
    headers: authHeader(),
  });
};

export const deleteUserById = async (id) => {
  return await apiClientUser.delete(`/auth/${id}`, { headers: authHeader() });
};

export const updateUserById = async (updateUser) => {
  return await apiClientUser.put(`auth/`, updateUser, {
    headers: authHeader(),
  });
};

export const getDepartmentListByUnitId = (unitId) => {
  console.log("emp dept by id", unitId);
  return apiClientMaster.get(`/departments/departmentdropdown/${unitId}`, {
    headers: authHeader(),
  });
};

export const getRolesDropdown = () => {
  return apiClientUser.get(`role/dropdown`, { headers: authHeader() });
};

export const getEmployeeDropdown = (departmentId, unitId) => {
  console.log("emp service call", departmentId, unitId);
  return apiClientUser.get(
    `employees/employeedropdown/${departmentId}/${unitId}`,
    { headers: authHeader() }
  );
};

export const autoSearchEmployee = (searchString) => {
  return apiClientMaster.get(
    `employees/searchEmployeeForUser/${searchString}`,
    {
      headers: authHeader(),
    }
  );
};
