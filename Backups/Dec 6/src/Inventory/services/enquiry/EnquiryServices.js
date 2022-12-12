import apiClientInventory from "../../http-common-inventory";
import apiClient from "../../http-common";
import apiClientOPD from "../../../OPD/http-common-opd";
import authHeader from "../../../authentication/authservices/auth-header";

// search data , Get request to fetch the autocomplete options
export const autoItemService = (itemTypeId,itemCategoryId,searchString) => {
   // http://192.168.0.124:8090/masters/item/search/a
  //  /masters/item/search/{itemTypeId}/{itemCategoryId}/{searchString}
    console.log(
      "Search Service is " + JSON.stringify(searchString));
    return apiClient.get(`/item/search/${itemTypeId}/${itemCategoryId}/${searchString}`, {
      headers: authHeader(),
    });
  };
//   http://192.168.0.149:8094/inventory/enquiry
  export const addNewEnquiry = async (createEnquiry) => {
    console.log(
        "Object sent for NEW ENQUIRY data record creation is " + JSON.stringify(createEnquiry)
      );
    return await apiClientInventory.post(`/enquiry`, createEnquiry, {
        headers: authHeader(),
      });
  }

  //Post request to recieve all the list of gender from the server. This request is also going to be called after clicking on the magnifying glass icon of the search bar.
export const fetchAllEnquiry = async (searchEnquiryObj) => {
  console.log("fetch all enquiry List OBJ " + JSON.stringify(searchEnquiryObj));
  return await apiClientInventory.post(`/enquiry/enquirylist`, searchEnquiryObj, {
    headers: authHeader(),
  });
};
