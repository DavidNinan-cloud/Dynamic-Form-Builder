import apiClient from '../../http-common'
import apiClientOpd from '../../http-common-opd'
import authHeader from "../../../authentication/authservices/auth-header";

// referby
export const getReferByDropDown = () => {
    return apiClient.get(`/referraldoctors/dropdown` ,{headers:authHeader()});
  };
// genders
export const getGendersDropDown = () => {
    return apiClient.get(`/genders/dropdown` ,{headers:authHeader()});
  };
// units
export const getUnitsDropDown = () => {
    return apiClient.get(`/units/dropdown` ,{headers:authHeader()});
  };

// get TimeSlots
export const getTimeSlotsApi = (appointmentDate,doctorId) => {
    console.log("doctorId",doctorId)
    console.log("appointmentDate",appointmentDate)
    return apiClient.get(`/api/doctorSchedule/getSlotsDetails?appointmentDate=${appointmentDate}&doctorId=${doctorId}` ,
    //{params:{appointmentDate:appointmentDate,doctorId:doctorId}} 
    {headers:authHeader()}
    );
};
// mobile input
export const getPaitentInfoByNo = (mobileNumber) => {
    // console.log("departmentId",mobileNumber)
    return apiClientOpd.get(`/patientInfo/patientAutocomplete/${mobileNumber}` , {headers:authHeader()});
};
// get info by id
export const getPaitentInfoByID = (id) => {
    // console.log("id",id)
    return apiClientOpd.get(`/patientInfo/patientInfoById/${id}` , {headers:authHeader()});
};
// post
export const registerAppointmentPage = (AppointmentDetails) => {
    console.log(AppointmentDetails);
    return apiClientOpd.post(`/appointment`, AppointmentDetails , {headers:authHeader()});
  };
// PreFix
export const getPrefixDropDown = () => {
    return apiClient.get(`/prefix/dropdown` , {headers:authHeader()});
  };

// ISD
export const getISDDropDown = () => {
    return apiClient.get(`/isd/dropdown` , {headers:authHeader()});
};

// Calculat Age based on DOB
export const getAge = (dob) => {
    return apiClient.get(`/calculateAge/${dob}` , {headers:authHeader()});
};
// Calculat DOB based on Age
export const getDateOfBirth = (age) => {
    return apiClient.get(`/calculateAge/getDob/${age}` , {headers:authHeader()});
};

// IdentificationDoc
export const getCitizenIdProofDropDown = () => {
    return apiClient.get(`/citizenidproofs/dropdown` , {headers:authHeader()});
};

// Paitent Type
export const getPatientTypeDropDown = () => {
    return apiClient.get(`/patientCategory/dropdown` , {headers:authHeader()});
};

// Booking Source
export const getAppointmentBookingDropDown = () => {
    return apiClient.get(`/appointmentbooking/dropdown` , {headers:authHeader()});
};

// Type Of Appointment
export const getAppointmentTypeDropDown = () => {
    return apiClient.get(`/appointmenttype/dropdown` , {headers:authHeader()});
};

// Referral Type
export const getReferTypeDropDown = () => {
    return apiClient.get(`/refertype/dropdown` , {headers:authHeader()});
};

// Refferal Doctor
export const getreferralDoctorsDropDown = () => {
    return apiClient.get(`/referraldoctors/dropdown` , {headers:authHeader()});
};

// Department
export const getDepartmentDropDown = (unitId) => {
    return apiClientOpd.get(`/appointment/getDepartmentsByUnit/${unitId}` , {headers:authHeader()});
};

// Subdepartment
export const getSubDepartmentDropDown = (departmentId) => {
    console.log("departmentId",departmentId)
    return apiClient.get(`/subdepartments/dropdown/${departmentId}` , {headers:authHeader()});
};

// Doctor
export const getEmployeeDropDown = (departmentId) => {
    console.log("departmentId",departmentId)
    return apiClient.get(`/employees/dropdown/${departmentId}` , {headers:authHeader()});
};

// TimeSlot
// export const getPatientTypeDropDown = () => {
//     return apiClient.get(`/patienttype/dropdown`);
// };
