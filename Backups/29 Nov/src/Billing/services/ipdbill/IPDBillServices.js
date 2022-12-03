
import apiClientBilling from '../../http-common-billing'
import authHeader from "../../../authentication/authservices/auth-header";


//Post request to recieve all the list of ipdBill from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllIPDBill = async (searchBillObj) => {
  console.log("fetch all ipdbill OBJ " + JSON.stringify(searchBillObj));
  return await apiClientBilling.post(`/genders/genderlist`, searchBillObj, {
    headers: authHeader(),
  });
};

//Post request to save the modal form data into the database.
export const addNewIPDBill = async (createBill) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createBill)
  );
  return await apiClientBilling.post(`/genders`, createBill, {
    headers: authHeader(),
  });
};

// search data , Get request to fetch the autocomplete options
export const autoSearchIPDBill = (searchString) => {
  return apiClientBilling.get(`genders/search/${searchString}`, {
    headers: authHeader(),
  });
};

//Get request by id to fetch the data upon clicking of edit icon
export const getIPDBillById = async (id) => {
  return await apiClientBilling.get(`/genders/${id}`, { headers: authHeader() });
};

//Delete Api
export const deleteIPDBillById = async (id) => {
  return await apiClientBilling.delete(`/genders/${id}`, { headers: authHeader() });
};

//Put request update the data
export const updateIPDBill = async (UpdateIPDBill) => {
  return await apiClientBilling.put(`/genders`, UpdateIPDBill, {
    headers: authHeader(),
  });
};
