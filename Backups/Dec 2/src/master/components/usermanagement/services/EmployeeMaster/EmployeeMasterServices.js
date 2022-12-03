import apiClient from '../../../../http-common'

import authHeader from "../../../../../authentication/authservices/auth-header";

// 
export const editEmployeeMaster = (EmployeeDetails) => {
  console.log(EmployeeDetails);
  return apiClient.put(`/employees`, EmployeeDetails , {headers:authHeader()});
};
// 
export const registerEmployeeMaster = (EmployeeDetails) => {
  console.log(EmployeeDetails);
  return apiClient.post(`/employees`, EmployeeDetails , {headers:authHeader()});
};


export const getGendersDropDown = () => {
  return apiClient.get(`/genders/dropdown` ,{headers:authHeader()});
};

// PreFix
export const getPrefixDropDown = () => {
    return apiClient.get(`/prefix/dropdown` ,{headers:authHeader()});
  };

//   Marital Status
export const maritalStatusDropDown = () => {
    return apiClient.get(`/maritalstatus/dropdown` ,{headers:authHeader()});
  };

//   Blood Group
export const bloodGroupDropDown = () => {
    return apiClient.get(`/bloodgroups/dropdown` ,{headers:authHeader()});
  };

//   Nationality
export const nationalityDropDown = () => {
    return apiClient.get(`/nationality/dropdown` ,{headers:authHeader()});
  };

export const designationDropDown = () => {
    return apiClient.get(`/designation/dropdown` ,{headers:authHeader()});
  };

  export const qualificationsDropDown = () => {
    return apiClient.get(`/qualification/dropdown` ,{headers:authHeader()});
  };
  
//   Employee Type
export const employeeTypeDropDown = (type) => {
    return apiClient.get(`/employeeType/dropdown/${type}` ,{headers:authHeader()});
  };

// Calculat Age based on DOB
export const getAge = (dob) => {
    return apiClient.get(`/calculateAge/${dob}` ,{headers:authHeader()});
};
// // Calculat DOB based on Age
export const getDateOfBirth = (age) => {
    return apiClient.get(`/calculateAge/getDob/${age}` ,{headers:authHeader()});
};

// department
export const getDepartmentDropDown = (unitId,isClinical,department) => {
    return apiClient.get(`departments/search/${unitId}/${isClinical}/${department}` ,{headers:authHeader()});
};
// units
export const getUnitsDropDown = () => {
  return apiClient.get(`/units/dropdown` ,{headers:authHeader()});
};


// start here

// Address Info APIs
export const getCountry = () => {
  return apiClient.get(`/countries/dropdown`, { headers: authHeader() });
};

export const getState = (countryId) => {
  // console.log(countryId);
  return apiClient.get(`/state/dropdown/${countryId}`, {
    headers: authHeader(),
  });
};

export const getDistrict = (stateId) => {
  return apiClient.get(`/districts/dropdown/${stateId}`, {
    headers: authHeader(),
  });
};

export const getArea = (pincodeId) => {
  return apiClient.get(`/area/dropdown/${pincodeId}`, {
    headers: authHeader(),
  });
};

export const getTahshil = (districtId) => {
  return apiClient.get(`/talukas/dropdown/${districtId}`, {
    headers: authHeader(),
  });
};

export const getCity = (tehshilId) => {
  return apiClient.get(`/cities/dropdown/${tehshilId}`, {
    headers: authHeader(),
  });
};

export const getPincodeBySearchId = (searchKey) => {
  return apiClient.get(`/pinCode/search/${searchKey}`, {
    headers: authHeader(),
  });
};

export const getDetailsonPincodeId = (pincodeId) => {
  // console.log(pincodeId);
  return apiClient.get(`/pinCode/${pincodeId}`, { headers: authHeader() });
};

export const getBanksDropDown = () => {
  return apiClient.get(`/bank/dropdown` ,{headers:authHeader()});
};