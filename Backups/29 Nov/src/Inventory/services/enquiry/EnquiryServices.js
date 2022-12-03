import apiClientInventory from "../../http-common-inventory";
import apiClient from "../../http-common";
import apiClientOPD from "../../../OPD/http-common-opd";
import authHeader from "../../../authentication/authservices/auth-header";

// // POST List
// export const fetchAllEmergency = async (searchEmergencyObj) => {
//   console.log("fetch all emergency OBJ " + JSON.stringify(searchEmergencyObj));
//   return await apiClientIPD.post(`/emergency/list`, searchEmergencyObj, {
//     headers: authHeader(),
//   });
// };

// // PreFix
// export const getPrefixDropDown = () => {
//   return apiClient.get(`/prefix/dropdown`, { headers: authHeader() });
// };

// // Genders
// export const getGenders = () => {
//   return apiClient.get(`/genders/dropdown`, { headers: authHeader() });
// };

// // Age
// export const getAgeonDOB = (dob) => {
//   return apiClient.get(`/calculateAge/${dob}`, { headers: authHeader() });
// };

// // BirthOFDate
// export const getDOBonAge = (age) => {
//   return apiClient.get(`/calculateAge/getDob/${age}`, {
//     headers: authHeader(),
//   });
// };

// // Patient Source
// export const getpatientSource = () => {
//   return apiClient.get(`/patientsource/dropdown`, { headers: authHeader() });
// };

// //Refferal Type Doctor Details
// export const getreferType = () => {
//   return apiClient.get(`/refertype/dropdown`, { headers: authHeader() });
// };

// //Refferal By Doctor Details
// export const getreferBy = () => {
//   return apiClient.get(`/referby/dropdown`, { headers: authHeader() });
// };

// // Referral Doctor
// export const getDoctor = () => {
//   return apiClient.get(`/employees/getDoctorList`, { headers: authHeader() });
// };

// // getDoctore department Id service
// export const getDoctorDropdown = (unitId) => {
//   console.log("Get Doctor Dropdown options is : ", unitId);
//   return apiClient.get(`/employees/doctorDropdown?unitId=${unitId}`, {
//     headers: authHeader(),
//   });
// };

// //Bed Category
// export const getClassCategoryDropdown = async () => {
//   return await apiClient.get(`/classtype/dropdown`, { headers: authHeader() });
// };

// //Department Dropdown
// export const getDepartmentDropdown = async () => {
//   return await apiClient.get(`/departments/dropdown`, {
//     headers: authHeader(),
//   });
// };

// //Post request to save the modal form data into the database.
// export const addNewEmergency = async (createEmergency) => {
//   console.log(
//     "Object sent for data record creation is " + JSON.stringify(createEmergency)
//   );
//   return await apiClientIPD.post(`/emergency`, createEmergency, {
//     headers: authHeader(),
//   });
// };

// // search data , Get request to fetch the autocomplete options
// export const autoSearchService = (searchString) => {
//   return apiClient.get(
//     `/services/serviceAutocompleteOnEmergency/${searchString}`,
//     {
//       headers: authHeader(),
//     }
//   );
// };

// //search by Patient UHID/ Name Number
// export const autoSerachPatient = (searchInfo) => {
//   return apiClientOPD.get(
//     `patientInfo/patientAutocompleteEmergency?searchString=${searchInfo}`,
//     {
//       headers: authHeader(),
//     }
//   );
// };

// // search data ,Get request to fetch the autocomplete options
// export const autoSearchEmeregncy = (searchString) => {
//   console.log("Search patient is " + JSON.stringify(searchString));
//   return apiClientIPD.get(
//     `/emergency/searchPatient?searchString=${searchString}`,
//     {
//       headers: authHeader(),
//     }
//   );
// };
