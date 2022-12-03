import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import CloseButton from "../../../../Common Components/Buttons/CloseButton";
import {
  getTemplateDropdown,
  getTemplatesById,
} from "../../services/ReportDetailsServices";
import AuthorizationTable from "./AuthorizationTable";

const IsTemplate = (props) => {
  const {
    reportEntryDetails,
    scheduleData,
    patientDetails,
    setOpenPost,
    setFinalData,
    onSubmit,
    writerContent,
    setWriterContent,
    contentError,
    authArr,
    setAuthArr,
    initiateAuth,
    setInitiateAuth,

    authObj,
  } = props;
  const [templateData, setTemplateData] = useState([]);
  const [templateContent, setTemplateContent] = useState([]);
  const editor = useRef(null);

  const [content, setContent] = useState("");
  // const [contentError, setContentError] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    //resolver: yupResolver(schema),
    // defaultValues,
  });

  useEffect(() => {
    getTemplateDropdownList();
  }, []);

  const config = {
    readonly: false,
    height: 100,
    statusbar: false,
    allowResizeY: false,
    allowResizeZ: false,
    buttons: [
      "bold",
      "underline",
      "strikethrough",
      "italic",
      "indent",
      "outdent",
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
  };

  const getTemplateDropdownList = () => {
    getTemplateDropdown()
      .then((response) => {
        console.log("template dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setTemplateData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTemplateContentById = (id) => {
    getTemplatesById(id)
      .then((response) => {
        console.log("template content" + response);
        console.log(JSON.stringify(response));
        console.log("TemplateData", response.data.result.TemplateData);
        setTemplateContent(response.data.result.TemplateData);
        let currentContent = response.data.result.TemplateData;

        //replace single quote with double quotes
        currentContent = currentContent.replaceAll("'", '"');

        setContent(currentContent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white space-y-2 flex flex-col">
      <fieldset
        disabled={
          reportEntryDetails &&
          reportEntryDetails?.authorizationLevel &&
          reportEntryDetails?.authorizationLevel === authObj.authLevel
            ? false
            : true
        }
      >
        <form>
          <div className="w-1/4 mb-1">
            <DropdownField
              control={control}
              error={errors.selectTemplate}
              name="selectTemplate"
              label="Select Template"
              dataArray={templateData}
              isSearchable={false}
              placeholder="Select Template"
              isClearable={false}
              inputRef={{
                ...register("selectTemplate", {
                  onChange: (e) => {
                    console.log("e", e.target);
                    getTemplateContentById(e.target.value.id);
                    console.log("templateContent", templateContent);
                  },
                }),
              }}
            />
          </div>

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => {
              setWriterContent(newContent);
              // writerContent = newContent;
              // console.log("writerContent", writerContent);
            }}
          />

          <p style={{ color: "red" }}>{contentError}</p>
          <div className="flex flex-col">
            {scheduleData &&
              !scheduleData.isCultureTest &&
              !scheduleData.isTemplate && (
                <div className="flex items-center space-x-2 my-2 ">
                  <TextField
                    name="suggestionNote"
                    {...register("suggestionNote")}
                    size="small"
                    label="Suggestion/Note"
                    placeholder="Suggestion/Note"
                    multiline
                    fullWidth
                    rows={2}
                    className="bg-white"
                  />
                  <TextField
                    name="footNote"
                    {...register("footNote")}
                    size="small"
                    label="Foot Note"
                    placeholder="Foot Note"
                    multiline
                    fullWidth
                    rows={2}
                    className="bg-white"
                  />
                </div>
              )}
          </div>

          {/* <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
          >
            Save
          </button>
        </div> */}

          {scheduleData &&
            !scheduleData.isCultureTest &&
            scheduleData.isTemplate && (
              <div className="flex justify-end space-x-2 mt-2">
                <CloseButton />
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
                >
                  Save
                </button>
              </div>
            )}
        </form>
      </fieldset>
    </div>
  );
};

export default IsTemplate;
