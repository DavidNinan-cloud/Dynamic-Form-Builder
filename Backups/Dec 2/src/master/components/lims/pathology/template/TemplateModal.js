//imports from material ui library
import { Box, Modal } from "@mui/material";

import * as React from "react";

import { useState, useRef } from "react";

//icon for closing the modal form
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";

//imports from react hook form
import { useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../../Common Components/ModalStyle";

//imports from the common FormControl folder
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";

//The functions for calling the services
import {
  addNewTemplate,
  getTemplateById,
  updateTemplate,
} from "../../../../services/lims/pathology/TemplateCreationServices";

import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";

import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";

import JoditEditor from "jodit-react";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

//body of RadiologyModal component
function TemplateModal(props) {
  console.log("This is Radiology Modal Component");

  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  const [testResultType, setTestResultType] = React.useState([]);
  const [radiologistList, setRadiologistList] = React.useState([]);
  let writerContent = "";

  let editor = useRef(null);

  const config = {
    readonly: false,
    height: 100,
    allowResizeY: false,
    statusbar: false,
    buttons: [
      "bold",
      "underline",
      "strikethrough",
      "italic",
      "indent",
      "outdent",
      "image",
      "fontsize",
      "paragraph",
      "brush",
      "|",
      "align",
      "ul",
      "ol",
      "table",
      "hr",
      "symbol",
      "eraser",
      "copyformat",
      "superscript",
      "subscript",
      "undo",
      "redo",
      "find",
      "preview",
      "print",
    ],
    imageDefaultWidth: 100,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  //validation start
  //form validation
  const schema = yup.object().shape({
    templateCode: yup
      .string()
      .required("Template Code required")
      .matches(/^[+1-9]+[0-9]*$/, "Only numbers are allowed"),
    templateName: yup
      .string()
      .required("Add Country Code")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    templateCode: "",
    templateName: "",
    templateData: "",

    active: true,
  };

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    props.setCountClick(0);
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    console.log("handleCloePut has been called");
    props.setCountClick(0);
    if (openPut) {
      setOpenPut(false);
    }
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("updateRecord function has been called");
    handleClosePut();
    if (props.countClick === 0) {
      console.log("The final data sent is ");
      console.log(finalData);
      updateTemplate(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert(response.data.message);
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setCountClick(props.countClick + 1);
            props.setEdit(false);
            reset(defaultValues);
            handleClosePut();
            props.setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setCountClick(props.countClick + 1);
          errorAlert(error.message);
          handleClosePut();
        });
    }
  }

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postTemplate(finalData);
    }
  }

  //onSubmitDataHandler function is passed as argument to the
  //built in handleSubmit() function of react hook forms.
  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);

      console.log("Writer content after editing is ");
      console.log(writerContent);

      //Setting the error message for the jodit tag
      if (editor.current.value.length === 0) {
        console.log("The writer content should not be empty");
        setContentError("The content cannot be empty");
      } else if (editor.current.value.length !== 0) {
        console.log("editor.current.value is ", editor.current.value);
        let requiredString = editor.current.value;
        requiredString = requiredString.replaceAll("<br>", "<br/>");
        console.log("The requiredString for editing is ", requiredString);
        setContentError("");
        let updateObj = {
          active: data.active,
          templateData: requiredString,
          templateCode: data.templateCode,
          templateName: data.templateName,
          id: data.id,
        };

        setOpenPut(true);
        setFinalData(updateObj);
      }

      console.log("Editor content is");
      console.log(editor.current.value);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);
      console.log("writerContent is " + writerContent);
      console.log(
        "The length of writerContent string is " + writerContent.length
      );

      //Setting the error message for the jodit tag
      if (editor.current.value.length === 0) {
        console.log("The writer content should not be empty");
        setContentError("The content cannot be empty");
      } else if (editor.current.value.length !== 0) {
        let requiredString = editor.current.value;
        requiredString = requiredString.replaceAll("<br>", "<br/>");
        console.log("The requiredString for posting is ", requiredString);
        setContentError("");
        let postObj = {
          active: data.active,
          templateCode: data.templateCode,
          templateData: requiredString,
          templateName: data.templateName,
        };

        console.log("The postObj is " + JSON.stringify(postObj));
        console.log(postObj);
        setOpenPost(true);
        setFinalData(postObj);
      }

      console.log("Editor content is");
      console.log(editor.current.value);
    }
  };

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["TemplateInfo", props.idValue],

    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        return getTemplateById(props.idValue);
      }
    },

    {
      enabled: props.edit,

      staleTime: 0,

      cacheTime: 0,

      refetchOnWindowFocus: false,

      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        console.log(status);

        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        if (data) {
          console.log("The data coming from get response by id request is ");
          console.log(JSON.stringify(data));

          let currentContent = data.data.result.TemplateData;

          // //replace single quote with double quotes
          currentContent = currentContent.replaceAll("'", '"');

          setContent(currentContent);

          let resetObj = {
            id: data.data.result.Id,
            templateCode: data.data.result.TemplateCode,
            templateName: data.data.result.TemplateName,
            active: data.data.result.Status,
          };

          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  //useMutation hook for the implementation of post request data saving
  const { mutate: postTemplate } = useMutation(addNewTemplate, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setCountClick(0);
      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();
      console.log("Data has been recorded successfully");
      successAlert();
      props.populateTable({ page: 0, size: 10, searchString: "" });

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset(defaultValues);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      props.setCountClick(0);
      //Code for React toast
      errorAlert();

      //When the request is not successfull ; close the confirmation modal for POST
      handleClosePost();
    },
  });

  return (
    <>
      <div className="w-[100%] grid items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>

            <div className="row">
              <fieldset className="grid border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-1 rounded mt-8 lg:m-2">
                <legend className="px-2 font-bold text-gray-700">
                  Pathology Department
                </legend>

                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid justify-center px-2 grid-cols-1 md:grid-cols-1 w-full  gap-2"
                >
                  <div className="grid justify-center grid-cols-2 lg:grid-cols-3 gap-2">
                    {/*Template Code*/}
                    <div className="w-full">
                      {/* Template code input field */}
                      <InputField
                        name="templateCode"
                        variant="outlined"
                        label="Template Code"
                        error={errors.templateCode}
                        control={control}
                      />
                    </div>

                    {/*Template Name input field*/}
                    <div className="w-full">
                      {/* Template Name input field */}
                      <InputField
                        name="templateName"
                        variant="outlined"
                        label="Template Name"
                        error={errors.templateName}
                        control={control}
                      />
                    </div>

                    {/* Checkbox field */}
                    <div className="w-full">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={(newContent) => {
                      writerContent = newContent;
                    }}
                  />
                  <p style={{ color: "red" }}>{contentError}</p>

                  <div className="flex gap-4 space-x-3 md:px-3 lg:px-0 justify-end">
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton
                        onClick={() => {
                          reset(defaultValues);
                          editor.current.value = "";
                        }}
                      />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </form>
              </fieldset>
            </div>
          </Box>
        </Modal>

        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
    </>
  );
}

export default TemplateModal;
