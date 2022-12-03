import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import AddButton from "../../../Common Components/Buttons/AddButton";
import CssdPrintButton from "../../../Common Components/Buttons/CssdPrintButton";
import AddIndentButton from "../../../Common Components/Buttons/AddIndentButton";
import PharmacyPrintButton from "../../../Common Components/Buttons/PharmacyPrintButton";
import RemoveKitButton from "../../../Common Components/Buttons/RemoveKitButton";
import SelectBedButton from "../../../Common Components/Buttons/SelectBedButton";
import OTBookingTable from "./Common/OTBookingTable"
import NextButton from "../../../Common Components/Buttons/NextButton";

const cssdItemKit = {
  message: "Order Drug Details list found ",
  result: [
    {
      "CSSD Item Kit": "Anesthesiologists",
      Quantity: 5,
    },
    {
      "CSSD Item Kit": "Colon and Rectal Surgeons",
      Quantity: 4,
    },
    {
      "CSSD Item Kit": "Critical Care Medicine Specialists",
      Quantity: 3,
    },
    {
      "CSSD Item Kit": "Emergency Medicine Specialists",
      Quantity: 2,
    },
    {
      "CSSD Item Kit": "Anesthesiologists",
      Quantity: 1,
    },
  ],
  statusCode: 200,
  actions: ["Delete"],
  count: 3,
};

const CheckList = () => {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schema = yup.object().shape({
    cssdItemKit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
  });

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
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setData(cssdItemKit);
    setDataResult(cssdItemKit.result);
  }, []);
  return (
    <>
      <div>
        <div>
          <div className="text-xl font-bold">CSSD Item Kit</div>
          <div className="xl:flex justify-between">
            <div className="grid grid-cols-4 gap-4 my-2">
              <div className="w-full col-span-2">
                <DropdownField
                  control={control}
                  // error={errors.unit}
                  name="cssdItemKit"
                  placeholder="CSSD Item Kit"
                  // dataArray={unitOptions}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="w-full">
                <InputField
                  name="quantity"
                  label="Quantity"
                  control={control}
                />
              </div>
              <AddButton />
            </div>
            <div className="flex gap-4 justify-end my-2">
              <div>
                <CssdPrintButton />
              </div>
              <div>
                <AddIndentButton />
              </div>
            </div>
          </div>
          <div className="w-full">
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <OTBookingTable
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
        </div>
        <hr className="my-2 border-t-2 border-sky-300"/>
        <div>
          <div className="text-xl font-bold">Pre Operative Instructions</div>
          <div className="grid grid-cols-4 gap-4 my-2">
            <div className="w-full col-span-2">
              <DropdownField
                control={control}
                // error={errors.unit}
                name="instructions"
                placeholder="Pre Operative Instructions"
                // dataArray={unitOptions}
                //isDisabled={props.edit}
              />
            </div>
            <AddButton />
          </div>
          <div className="w-full">
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <OTBookingTable
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
        </div>
        <hr className="my-2 border-t-2 border-sky-300"/>
        <div>
          <div className="text-xl font-bold">Pharmacy Item Kit</div>
          <div className="xl:flex justify-between">
            <div className="grid grid-cols-4 gap-4 my-2">
              <div className="w-full col-span-2">
                <DropdownField
                  control={control}
                  // error={errors.unit}
                  name="pharmacyItemKit"
                  placeholder="Item"
                  // dataArray={unitOptions}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="w-full">
                <InputField
                  name="quantity"
                  label="Quantity"
                  control={control}
                />
              </div>
              <AddButton />
            </div>
            <div className="flex gap-4 justify-end my-2">
              <div>
                <PharmacyPrintButton />
              </div>
              <div>
                <RemoveKitButton />
              </div>
            </div>
          </div>
          <div className="w-full">
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <OTBookingTable
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
        </div>
        <hr className="my-2 border-t-2 border-sky-300"/>
        <div>
          <div className="text-xl font-bold">Equipments</div>
          <div className="xl:flex justify-between">
            <div className="grid grid-cols-5 gap-4 my-2">
              <div className="w-full col-span-2">
                <DropdownField
                  control={control}
                  // error={errors.unit}
                  name="equipments"
                  placeholder="Equipments"
                  // dataArray={unitOptions}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="w-full">
                <InputField
                  name="quantity"
                  label="Quantity"
                  control={control}
                />
              </div>
              <AddButton />
            </div>
          </div>
          <div className="w-full">
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <OTBookingTable
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
        </div>
        <hr className="my-2 border-t-2 border-sky-300"/>
        <div className="flex items-center my-2">
          <div className="text-xl font-bold w-96 xl:w-80">
            Bed Reservation Details
          </div>
          <div className="w-full justify-between flex">
            <SelectBedButton />
            <NextButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckList;
