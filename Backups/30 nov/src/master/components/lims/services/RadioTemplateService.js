import apiClient from "../../../../master/services/lims/http-common-lims";

//authentication token for all the api requests
import authHeader from "../../../../authentication/authservices/auth-header";

//Post request to save the modal form data into the database.
export const addNewTemplate = async (createTemplate) => {
  console.log(
    "Object sent for data record creation is " + JSON.stringify(createTemplate)
  );
  return await apiClient.post(`/templates`, createTemplate, {
    headers: authHeader(),
  });
};

// post request to receive all the list of templates from the server
export const fetchAllTemplates = async (searchTemplateObj) => {
  console.log("The searchTemplateObj is ");
  console.log(searchTemplateObj);

  return await apiClient.post(`templates/templatelist`, searchTemplateObj, {
    headers: authHeader(),
  });
};

//get request to get the particular record from the server for updating
export const getTemplateById = async (id) => {
  console.log("The template id is ");
  console.log(id);
  return await apiClient.get(`templates/${id}`, {
    headers: authHeader(),
  });
};

//templates dropdown
export const getTemplateDropdown = async () => {
  return await apiClient.get(`templates/dropdown`, {
    headers: authHeader(),
  });
};

//template update
export const updateTemplate = async (updateTemplateObj) => {
  return await apiClient.put(`/templates`, updateTemplateObj, {
    headers: authHeader(),
  });
};

//Delete request by id to delete the data belonging to a particular id
export const deleteTemplateById = async (id) => {
  console.log("The id for deletion is ");

  return await apiClient.delete(`/templates/${id}`, {
    headers: authHeader(),
  });
};

//auto search the template
export const autoSearchTemplate = async (searchString) => {
  return await apiClient.get(`/templates/search/${searchString}`, {
    headers: authHeader(),
  });
};
