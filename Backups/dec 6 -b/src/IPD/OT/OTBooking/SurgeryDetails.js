import React from "react";
import { useState, useEffect } from "react";
import {
  useForm,
  useFormContext,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import AddConsentButton from "../../../Common Components/Buttons/AddConsentButton";
import NextButton from "../../../Common Components/Buttons/NextButton";
import { TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import OTConsentModal from "./OTConsentModal";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import SurgeryTable from "./SurgeryTable";

const surgeryProcedureData = {
  message: "Order Drug Details list found ",
  result: [
    {
      "Surgery Procedure": "Appendectomy",
      "DR. Type": "Dermatologists",
      "DR. Name": "Stephen Strange",
      "Employee Name": "Vishal Pawar",
    },
    {
      "Surgery Procedure": "Appendectomy",
      "DR. Type": "Dermatologists",
      "DR. Name": "Stephen Strange",
      "Employee Name": "Vishal Pawar",
    },
    {
      "Surgery Procedure": "Appendectomy",
      "DR. Type": "Dermatologists",
      "DR. Name": "Stephen Strange",
      "Employee Name": "Vishal Pawar",
    },
    {
      "Surgery Procedure": "Appendectomy",
      "DR. Type": "Dermatologists",
      "DR. Name": "Stephen Strange",
      "Employee Name": "Vishal Pawar",
    },
    {
      "Surgery Procedure": "Appendectomy",
      "DR. Type": "Dermatologists",
      "DR. Name": "Stephen Strange",
      "Employee Name": "Vishal Pawar",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const options = [
  {
    label: "ABC",
    value: "ABC",
  },
  {
    label: "DEF",
    value: "DEF",
  },
  {
    label: "GHI",
    value: "GHI",
  },
  {
    label: "JKL",
    value: "JKL",
  },
  {
    label: "MNO",
    value: "MNO",
  },
];

const SurgeryDetails = (props) => {
  //state varible for modal open and close
  const [open, setOpen] = useState(false);

  //handleOpen function opens the modal form
  const handleOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);

  const defaultValues = {
    group: null,
    subGroup: null,
    surgeryProcedure: null,
    drName: null,
    drType: null,
    employeeName: null,
  };
  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(),
    defaultValues,
  });

  const schema = yup.object().shape({
    group: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
  });

  const onSubmit = (data) => {
    console.log("Data", data);
  };

  useEffect(() => {
    setData(surgeryProcedureData);
    setDataResult(surgeryProcedureData.data);
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="text xl font-bold my-2">Operation Details</div>
          <div>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full my-2">
              <div className="w-full">
                <DropdownField
                  control={control}
                  // error={errors.unit}
                  name="group"
                  placeholder="Group*"
                  dataArray={options}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  // error={errors.unit}
                  name="subGroup"
                  placeholder="Sub-Group*"
                  dataArray={options}
                  //isDisabled={props.edit}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full gap-3">
          <div className="text xl font-bold my-2">Surgery Procedures</div>
          <div className="grid grid-cols-2 xl:grid-cols-3 w-full gap-4 border border-gray-300 rounded p-3">
            <div className="w-full">
              <DropdownField
                // error={errors.unit}
                name="surgeryProcedure"
                placeholder="Surgery Procedure*"
                control={control}
                dataArray={options}
                //isDisabled={props.edit}
              />
            </div>
            <div className="w-full">
              <DropdownField
                // error={errors.unit}
                name="drType"
                placeholder="Dr. Type*"
                control={control}
                dataArray={options}
                //isDisabled={props.edit}
              />
            </div>
            <div className="w-full">
              <DropdownField
                // error={errors.unit}
                name="drName"
                placeholder="Dr. Name*"
                control={control}
                dataArray={options}
                //isDisabled={props.edit}
              />
            </div>
            <div className="w-full">
              <DropdownField
                // error={errors.unit}
                name="employeeName"
                placeholder="Employee Name*"
                control={control}
                dataArray={options}
                isMulti={true}
                //isDisabled={props.edit}
              />
            </div>
            <div className="col-span-2 flex justify-end gap-2 xl:justify-start">
              <ResetButton
                onClick={() => {
                  reset(defaultValues);
                }}
              />
              <AddButton />
            </div>
          </div>
          <div className="w-full">
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <SurgeryTable
                //  tableApiFunc={fetchAllGender}
                searchString={searchString}
                dataResult={dataResult}
                setDataResult={setDataResult}
                data={data}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={count}
                //   editRow={editRow}
                //   setOpen={setOpen}
                //   deleteRow={deleteRow}
                //   displayView={displayView}
              />
            ) : null}
          </div>
        </div>
        <div>
          <div className="w-full my-2">
            <TextField
              label="Operation Instructions"
              fullWidth
              multiline
              minRows={2}
            />
          </div>
          <div className="w-full flex justify-end gap-4">
            <AddConsentButton
              onClick={() => {
                handleOpen();
              }}
            />
            <NextButton />
          </div>
        </div>
        <OTConsentModal
          handleClose={handleClose}
          setOpen={setOpen}
          open={open}
          handleOpen={handleOpen}
        />
      </div>
    </>
  );
};

export default SurgeryDetails;
