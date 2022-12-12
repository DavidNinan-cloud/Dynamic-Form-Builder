import { mastersApiClient, limsApiClient } from "../../http-common";

//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

export const getTestEntryDetails = (investigationId) => {
  return limsApiClient.get(`labtestentry/${investigationId}`, {
    headers: authHeader(),
  });
};

export const getTemplateDropdown = () => {
  return mastersApiClient.get(`templates/dropdown`, {
    headers: authHeader(),
  });
};

export const getTemplateDropdownByIds = (
  radiologistId,
  genderId,
  reportTypeId
) => {
  return mastersApiClient.get(
    `templates/dropdown/{radiologistid}/{genderid}/{reporttypeid}?genderId=${genderId}&radiologistId=${radiologistId}&reportTypeId=${reportTypeId}`,
    {
      headers: authHeader(),
    }
  );
};

export const getFilmSizeDropdown = () => {
  return mastersApiClient.get(`templates/filmsizedropdown`, {
    headers: authHeader(),
  });
};

export const getRadiologistDropdown = () => {
  return mastersApiClient.get(`employees/radiologistDropDown`, {
    headers: authHeader(),
  });
};

export const getGenderDropdown = () => {
  return mastersApiClient.get(`genders/dropdown`, {
    headers: authHeader(),
  });
};

export const getResultTypeDropdown = () => {
  return mastersApiClient.get(`tests/testResultType/dropdown`, {
    headers: authHeader(),
  });
};

export const getTemplatesById = (id) => {
  return mastersApiClient.get(`templates/${id}`, {
    headers: authHeader(),
  });
};

export const saveTestEntryDetails = async (entryDetailsObj) => {
  console.log("entryDetailsObj" + entryDetailsObj);
  return await limsApiClient.put("labtestentry", entryDetailsObj, {
    headers: authHeader(),
  });
};

export const autoSearchOrganisms = (str) => {
  return mastersApiClient.get(`organisms/search/${str}`, {
    headers: authHeader(),
  });
};

export const getOrganisms = () => {
  return mastersApiClient.get(`organisms/dropdown`, {
    headers: authHeader(),
  });
};

export const getEmpForAuthorization = (level) => {
  return mastersApiClient.get(
    `employees/employeeForPathologyAuthentication/${level}`,
    {
      headers: authHeader(),
    }
  );
};

export const getAntibioticsByOrganismId = (id) => {
  return mastersApiClient.get(`antibiotics/dropdown/${id}`, {
    headers: authHeader(),
  });
};
