import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import { getDepartmentlist } from "../../../services/consentmaster/ConsentMasterService";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import JoditEditor from "jodit-react";

let templatename = [
  {
    value: "EXPLORATORY TYMPANOTO",
    label: "EXPLORATORY TYMPANOTO",
  },
  {
    value: "SEPTOPLASTY",
    label: "SEPTOPLASTY",
  },
  {
    value: "MYRINGOTOMY AND / OR GRAMMET",
    label: "MYRINGOTOMY AND / OR GRAMMET",
  },
];

export default function ModalConsentMaster(props) {
  //[YUP SCHEMA] Schema validation form fields
  const schema = yup.object().shape({
    genderCode: yup
      .string()
      .required("Required")
      .min(2, "Add Gender Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Characters Not Allow"),
    genderName: yup
      .string()
      .required("Required")
      .min(2, "Add Gender Name")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Characters Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    department: null,
    templateName: null,
    active: true,
  };
  const [department, setDepartment] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [contentError, setContentError] = React.useState("");
  let writerContent = "";
  const editorOne = useRef(null);
  const editorTwo = useRef(null);
  const editorThree = useRef(null);
  const editorFour = useRef(null);

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
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleCloePut has been called");
    if (openPut) {
      setOpenPut(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log(data);

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);

      writerContent = writerContent.replaceAll('"', "'");

      //Setting the error message for the jodit tag
      if (editor.current.value.length === 0) {
        console.log("The writer content should not be empty");
        setContentError("The content cannot be empty");
      } else if (editor.current.value.length !== 0) {
        setContentError("");
        let updateObj = {
          active: data.active,
          templateData: writerContent,
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
      writerContent = writerContent.replaceAll('"', "'");

      //Setting the error message for the jodit tag
      if (editor.current.value.length === 0) {
        console.log("The writer content should not be empty");
        setContentError("The content cannot be empty");
      } else if (editor.current.value.length !== 0) {
        setContentError("");
        let postObj = {
          active: data.active,
          templateCode: data.templateCode,
          templateData: writerContent,
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

  //API For department dropdown list
  useEffect(() => {
    getDepartmentlist(department)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setDepartment(res.result);
      });
  }, []);

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postGender(finalData);
  }

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    borderRadius: 1,
    boxShadow: 20,
    py: 4,
    px: 2,
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={() => {
          // props.handleClose();
          props.setEdit(false);
          reset(defaultValues);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[80%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
              props.setEdit(false);
              reset(defaultValues);
            }}
          />

          <div className="row px-3">
            <fieldset className="border border-gray-300 text-left rounded ">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                Consent Master
              </legend>
              <form
                className="grid grid-cols-1 w-full gap-x-2 py-2"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-2 md:px-4 px-2  gap-3">
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      name="department"
                      dataArray={department}
                      placeholder="Department"
                      isSearchable={false}
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <DropdownField
                      control={control}
                      name="templateName"
                      dataArray={templatename}
                      placeholder="Template Name"
                      isSearchable={false}
                    />
                    <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                      />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-3 md:px-4 px-2 pt-2">
                  <div className="grid gap-2">
                    <div className="grid ">
                      <span className="font-semibold text-sm  text-black">
                        Description (English)
                      </span>
                      <JoditEditor
                        name="joditone"
                        ref={editorOne}
                        value={content}
                        config={config}
                        onChange={(newContent) => {
                          writerContent = newContent;
                        }}
                      />
                    </div>
                    <div className="grid ">
                      <span className="font-semibold text-sm  text-black">
                        Consent (English)
                      </span>
                      <JoditEditor
                        ref={editorTwo}
                        value={content}
                        config={config}
                        onChange={(newContent) => {
                          writerContent = newContent;
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="grid ">
                      <span className="font-semibold text-sm  text-black">
                        Description (Marathi)
                      </span>
                      <JoditEditor
                        ref={editorThree}
                        value={content}
                        config={config}
                        onChange={(newContent) => {
                          writerContent = newContent;
                        }}
                      />
                    </div>
                    <div className="grid ">
                      <span className="font-semibold text-sm  text-black">
                        Consent (Marathi)
                      </span>
                      <JoditEditor
                        ref={editorFour}
                        value={content}
                        config={config}
                        onChange={(newContent) => {
                          writerContent = newContent;
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2 items-center justify-end pr-2">
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
                        {
                          reset(defaultValues);
                        }
                        (editorOne.current.value = ""),
                          (editorTwo.current.value = "");
                        editorThree.current.value = "";
                        editorFour.current.value = "";
                      }}
                    />
                  )}
                  {props.edit ? <UpdateButton /> : <AddButton />}
                </div>
              </form>
            </fieldset>
            {/* Backdrop */}
            <CommonBackDrop openBackdrop={props.openBackdrop} />
          </div>
        </Box>
      </Modal>
    </>
  );
}
