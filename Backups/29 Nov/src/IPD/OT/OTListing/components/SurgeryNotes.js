import React from "react";
import { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddButton } from "../../../../Common Components/Buttons/CommonButtons";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import SurgeryTable from "../../OTBooking/SurgeryTable";
import { useEffect } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import JoditEditor from "jodit-react";
const SurgeryNotes = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [content, setContent] = React.useState("");
  const [contentError, setContentError] = React.useState("");
  let writerContent = "";
  const editorOne = useRef(null);

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
      "image",
    ],
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const tempalate =
    "Tempalate Discription \n Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum";

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  return (
    <div>
      <div>
        <div className="flex gap-2">
          <div className="w-96">
            <DropdownField name="temaplate" placeholder="Search Tempalate" />
          </div>
          <AddButton />
        </div>
        <div className="my-2">
          <span>Tempalate</span>
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
      </div>
    </div>
  );
};

export default SurgeryNotes;
