import { TextField } from "@mui/material";
import React, { useState } from "react";
import { AddButton } from "../../../../Common Components/Buttons/CommonButtons";
import FileUploadTable from "../common/FileUploadTable";

const FileUploadName = {
    result: [
      {
        "File Name":"Lorem ipsum dolor sit amet Lorem",
      },
      {
        "File Name":"Lorem ipsum dolor sit amet Lorem",
      },
      {
        "File Name":"Lorem ipsum dolor sit amet Lorem",
      },
      {
        "File Name":"Lorem ipsum dolor sit amet Lorem",
      },
    ],
    statusCode: 200,
    actions: ["ViewFile","Delete"],
    count: 3,
  };

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
    console.log(res.data);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center">
            <TextField name="fileUpload" type="file" onChange={handleImageUpload}/>
            <AddButton/>
          </div>
        </form>
        <div>
            <FileUploadTable data={FileUploadName}/>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
