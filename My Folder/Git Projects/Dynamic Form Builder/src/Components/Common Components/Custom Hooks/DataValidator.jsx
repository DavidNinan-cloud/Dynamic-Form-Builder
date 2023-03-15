export const dateIsValid = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (dateStr.match(regex) === null) {
      return false;
    }
  
    const date = new Date(dateStr);
  
    const timestamp = date.getTime();
  
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }
  
    return date.toISOString().startsWith(dateStr);
  }
export const validateDate = (value) => {
let dobGivenYear = value.getFullYear();
let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
let dobGivenDay = String(value.getDate()).padStart(2, "0");
let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
let isValidDate = dateIsValid(fullDOB)
return isValidDate
}
export const setdateFormat = (value) => {
let dobGivenYear = value.getFullYear();
let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
let dobGivenDay = String(value.getDate()).padStart(2, "0");
let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
return fullDOB
}


export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
}