import React from "react";
import { Box, Modal, Button, TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import ConsentModalTable from "../otconsent/common/OTConsentTable";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import AddButton from "../../../Common Components/Buttons/AddButton";

const OTConsent = {
  message: "Order Drug Details list found ",
  result: [
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      "Consent Tempalate":
        "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      "Consent Tempalate":
        "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      "Consent Tempalate":
        "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      "Consent Tempalate":
        "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const OTConsentModal = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setidValue] = React.useState("");

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(),
  });

  const tempalate =
    "Tempalate Description \n Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.";

  useEffect(() => {
    setData(OTConsent);
    setDataResult(OTConsent.result);
  }, []);

  return (
    <>
      <div>
        <Modal
          open={props.open}
          onClose={() => {
            props.handleClose();
          }}
        >
          <Box sx={ModalStyle}>
            <div className="flex">
              <div className="text-xl font-bold w-full my-2">OT Consent</div>
              <div className="w-full">
                <CancelPresentationIcon
                  className="absolute top-3 right-9 text-red-600 rounded cursor-pointer"
                  onClick={() => {
                    props.handleClose();
                  }}
                />
              </div>
            </div>
            <div className="bg-gray-100 border border-gray-300 px-1 mt-1 rounded">
              <div className="p-2 grid lg:grid-cols-2 2xl:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 w-full">
                  <span className="font-bold w-28">Patient Name</span>
                  <div className="flex space-x-2">
                    <span>:</span>
                    <span className="text-gray-700">
                      Mr.Suresh Subhash Patil
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <span className="font-bold w-28 lg:w-16 xl:w-16 2xl:w-10">UHID</span>
                  <div className="flex space-x-2">
                    <span>:</span>
                    <span className="text-gray-700">1-23155455</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <span className="font-bold w-28 2xl:w-14">
                    Doctor
                  </span>
                  <div className="flex space-x-2">
                    <span>:</span>
                    <span className="text-gray-700">Dr.Suraj Subhash Dandekar</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <span className="font-bold w-28 lg:w-16 xl:w-16 2xl:w-28">Gender</span>
                  <div className="flex space-x-2">
                    <span>:</span>
                    <span className="text-gray-700">Male</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <span className="font-bold w-28 2xl:w-10">Age</span>
                  <div className="flex space-x-2">
                    <span>:</span>
                    <span className="text-gray-700">23 Y 02 M 04 D</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded my-2">
              {data.hasOwnProperty("result") &&
              data.result.length > 0 &&
              data.statusCode === 200 &&
              spinner === false ? (
                <ConsentModalTable
                  searchString={searchString}
                  dataResult={dataResult}
                  setDataResult={setDataResult}
                  data={data}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  count={count}
                />
              ) : null}
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <DropdownField
                  control={control}
                  placeholder="Department"
                  name="department"
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  placeholder="Consent Tempalate"
                  name="consentTempalate"
                />
              </div>
            </div>
            <div className="w-full my-2">
              <TextareaAutosize
                defaultValue={tempalate}
                disabled={true}
                multiline
                maxRows={12}
                className="w-full border border-gray-300 rounded-lg px-2"
              />
            </div>
            <div className="w-full flex gap-4 justify-end">
              <ResetButton/>
              <AddButton/>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default OTConsentModal;
