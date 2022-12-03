import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Modal } from "@mui/material";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";

import DocumentTable from ".././emrtables/DocumentTable";
import InputField from "../../../../Common Components/FormFields/InputField";
import { getDocumentType } from "../../../services/EMRServices/emrServices";
import useFileUpload from "../../../Common Components/hooks/useFileUpload";

const AddDocuments = (props) => {
  const validationSchema = yup.object().shape({
    documentName: yup
      .string()
      .nullable()
      .required("Add Documents Name")
      .matches(/^[a-zA-Z\s]+$/, "Only Alphabets are Allowed"),
    documentType: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Document Type"),
  });

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [documentTypeList, setDocumentTypeList] = useState();
  const [docPic, setDocPic] = useState();
  const [docName, setDocName] = React.useState(null);

  const imgData = useFileUpload();

  // get functions to build form with useForm() hook
  const { handleSubmit, reset, formState, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      documentName: "",
      documentType: null,
    },
  });
  const { errors } = formState;

  function onSubmit(documentData) {
    // display form data on success

    let documentDetails = {
      documentName: documentData.documentName,
      documentType: documentData.documentType.label,
      documentPathBase64: docPic.toString().split(",")[1],
      filename: docName,
    };
    data.result.push(documentDetails);
    setDocName(null);
    console.log("FileName", docName);
    reset();
    //for closing the modal form
  }

  useEffect(() => {
    setDocName(null);
    console.log("File Name", docName);
  }, [docName, data.result]);

  useEffect(() => {
    console.log("editInfo", props.editInfo);
    if (props.editInfo !== null && props.dataId !== null) {
      let documentType = {
        value: 1,
        label: props.editInfo.documentType,
      };
      let myObj = {
        documentName: props.editInfo.documentName,
        documentType: documentType,
      };
      reset(myObj);
    }
  }, [props.editInfo]);

  //Document Type
  useEffect(() => {
    getDocumentType()
      .then((response) => {
        setDocumentTypeList(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  const handleDocChange = (target) => {
    const result = imgData.onProfilePicChange(target);
  };

  useEffect(() => {
    // console.log("Upload Data", data);
    imgData.fileName.length === 0 ? setDocPic("") : setDocPic(imgData.path);
    setDocName(imgData.fileName);
  }, [imgData]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };
  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedComplaints = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedComplaints.push(item);
      });
      console.log("Complaints Value", updatedComplaints);
      props.documents[props.dataId] = updatedComplaints[0];
    } else {
      data.result.map((item, index) => {
        props.documents.push(item);
      });
    }
    props.setOpen(false);
  };
  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-3">
          <h1>Documents</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full  gap-2">
          <div className="grid grid-cols-5 gap-x-2 ">
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <InputField
                name="documentName"
                variant="outlined"
                label="Document Name *"
                error={errors.documentName}
                control={control}
              />
            </div>
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <DropdownField
                control={control}
                error={errors.documentType}
                name="documentType"
                label="Document Type *"
                placeholder="Document Type *"
                dataArray={documentTypeList}
                isSearchable={false}
                isClearable={false}
              />
            </div>
            <div className="w-full flex sm:col-span-2 lg:col-span-1">
              <input
                type="file"
                accept="image/*, .pdf"
                style={{ display: "none" }}
                id="outlined-button-file"
                onChange={handleDocChange}
              />
              <label htmlFor="outlined-button-file" className="w-full">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    paddingY: "0.4rem",
                    color: "#636e72",
                    width: "100%",
                    borderColor: "#b2bec3",
                    "& MuiButton-outlined.mui-focused": {
                      borderColor: "#b2bec3",
                    },
                  }}
                >
                  Upload Docs
                </Button>
              </label>
            </div>
            <div className="overflow-hidden mx-4">
              {docName !== null ? (
                <p className="truncate text-ellipsis overflow-hidden ">
                  {docName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="w-full flex sm:justify-end lg:mx-auto sm:col-span-2 lg:col-span-1">
              <Button
                type="submit"
                variant="outlined"
                size="small"
                style={{
                  maxWidth: "10rem",
                  maxHeight: "35px",
                  minWidth: "10rem",
                  minHeight: "35px",
                  fontWeight: "bold",
                  textTransform: "none",
                  marginLeft: "1rem",
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </form>
        <div>
          {data.result.length > 0 ? (
            <div>
              {/* <div className="text-xl font-semibold">
                <h1>Documents Details</h1>
              </div> */}
              <div>
                <DocumentTable
                  //data to be displayed
                  data={data}
                  deleteRow={deleteRow}
                />
              </div>
            </div>
          ) : null}
        </div>
      </fieldset>
      {props.dataId !== null ? (
        <div className="flex justify-end">
          <>
            <div className="flex">
              <button
                className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                Close
              </button>
              <button
                className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                onClick={() => {
                  handleSave();
                }}
              >
                Update
              </button>
            </div>
          </>
        </div>
      ) : (
        <div className="flex justify-end">
          <>
            <div className="flex">
              <button
                className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                Close
              </button>
              <button
                className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default AddDocuments;
