import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Divider,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  FormControl,
  FormHelperText,
  IconButton,
} from "@mui/material";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../Common Components/FormFields/InputField";
import AddButton from "../../../Common Components/Buttons/AddButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PurchaseOrderTable from "./PurchaseOrderTable";
import { getUnitlist } from "../services/purchaseorder/PurchaseOrderServices";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const modalPurchaseOrderData = {
  message: "Modal Purchase Order list found ",
  result: [
    {
      "Item Code": 1,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 2,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 3,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 4,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 5,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 6,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 7,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 8,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 9,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 10,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 11,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
    {
      "Item Code": 12,
      "Item Name": "lorem ipsum",
      "PO Qty": "1400",
      UOM: "1000",
      "Pur. Rate": "1500",
      "Total Amt": "1500",
      "Disc %": "20%",
      "Disc Amt": "120",
      "GST %": "10%",
      "GST Amt": "400",
      "Other Tax": "100",
      "Net Amt": "2000",
      Specification: "Lorem ipsum",
      MRP: "770",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 20,
  py: 4,
  px: 2,
};

export default function ModalPurchaseOrder(props) {
  const schema = yup.object().shape({
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
    // store: yup
    // .string()
    // .required("Required")
    // .min(2, "Add Gender Code")
    // .matches(/^[a-zA-Z0-9]+$/, "Space & Special Characters Not Allow"),
    // supplier: yup
    // .string()
    // .required("Required")

    terms: yup.array().of(
      yup.object().shape({
        termsnconditions: yup
          .string()
          .required("Please Add Terms & Conditions")
          .min(1, "Add Aleast 1 Characters"),
      })
    ),
    // .min(1, "Please Add Education Details"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    poDate: "",
    unit: null,
    store: null,
    supplier: null,
    deliveryDate: null,
    paymentMode: null,
    termsOfPayment: null,
    billTo: null,
    shipTo: null,

    remarks: "",
    gantywarnty: "",
    schedule: null,
    tax: null,

    terms: [{ termsnconditions: "" }],
    quantity:"",
  };

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

  const [unit, setUnit] = React.useState([]);

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

  useEffect(() => {
    setData(modalPurchaseOrderData);
    setDataResult(modalPurchaseOrderData.result);
  }, []);

  const {
    setValue,
    trigger,
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "terms",
  });

  let termsDetails = watch("terms");

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
  }, []);

  let url = "#";


  return (
    <>
      {/* Modal for Gender (textField)*/}
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

          <div className="row">
            <fieldset className="border border-gray-300 text-left lg:px-4 py-2 rounded mt-1 lg:m-2 ">
              <legend className="px-2 ml-2 lg:ml-0 font-bold text-gray-800">
                Create Purchase Order
              </legend>
              <form
                className="grid grid-cols-1 w-full md:px-3 lg:px-0 py-2"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-3 w-full gap-2 pb-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      disablePast
                      label="PO Date"
                      // value={selectedFromDate}
                      name="poDate"
                      // onChange={(newValue) => {
                      // setSelectedFromDate(newValue);
                      // }}
                      renderInput={(params) => (
                        <TextField
                          className="bg-white"
                          fullWidth
                          name="fromDate"
                          size="small"
                          defaultValue=""
                          inputFormat="dd/MM/yyyy"
                          {...params}
                          sx={{
                            svg: { color: "#0B83A5" },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      error={errors.unit}
                      name="unit"
                      dataArray={unit}
                      placeholder="Unit *"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="store"
                      // dataArray={store}
                      placeholder="Store *"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="supplier"
                      // dataArray={store}
                      placeholder="Supplier *"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="deliveryDate"
                      // dataArray={store}
                      placeholder="Delivery Date"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="paymentMode"
                      // dataArray={store}
                      placeholder="Payment Mode"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="termsOfPayment"
                      // dataArray={store}
                      placeholder="Payment Terms"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="billTo"
                      // dataArray={store}
                      placeholder="Bill To"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="shipTo"
                      // dataArray={store}
                      placeholder="Ship To"
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                </div>

                <div className="border border-b border-gray-400 "> </div>

                <div className="grid xl:flex w-full gap-2 pt-2 items-center">
                  <p className="text-lg text-black font-Poppins whitespace-nowrap">
                    Item Details
                  </p>
                  <div className="grid grid-cols-5 xl:grid-cols-7 gap-2 items-center w-full">
                    <div className="col-span-2 xl:col-span-3">
                      <SearchDropdown
                        control={control}
                        searchIcon={true}
                        name="SearchPOItems"
                        placeholder="Search Items"
                        label="Search PO Number"
                        isSearchable={true}
                        isClearable={false}
                        // dataArray={options}
                        // handleInputChange={handleChange}
                        // onChange={autoSelectedValue}
                        // inputRef={{
                        // ...register("patientInfo", {
                        // onChange: (e) => {
                        // console.log(
                        // "The selected PatientName object is" +
                        // JSON.stringify(e)
                        // );

                        // setPatientInfo(true);
                        // setPatientData(e);

                        // if (e.target.value !== null) {
                        // console.log(
                        // "target value in the patientInfo",
                        // e.target.value
                        // );
                        // let PatientData = e.target.value;

                        // console.log("patient data", PatientData);
                        // setPatientData(e.target.value);
                        // setPatientInfoId(e.target.value.id);
                        // }
                        // },
                        // }),
                        // }}
                      />
                    </div>

                    <div className="col-span-2 xl:col-span-3 flex gap-2">
                      <div className="w-44">
                        <InputField
                          name="quantity"
                          type="number"
                          variant="outlined"
                          label="Qty"
                          error={errors.quantity}
                          control={control}
                        />
                      </div>
                      <span>
                        <AddButton />
                      </span>
                    </div>

                    <div className="flex items-center justify-end text-blue-700 underline whitespace-nowrap">
                      <a href={url}>Import Excel</a>
                    </div>
                  </div>
                </div>

                {data.hasOwnProperty("result") &&
                data.result.length > 0 &&
                data.statusCode === 200 &&
                spinner === false ? (
                  <>
                    <PurchaseOrderTable
                      // tableApiFunc={fetchAllGender}
                      searchString={searchString}
                      dataResult={dataResult}
                      setDataResult={setDataResult}
                      data={data}
                      page={page}
                      setPage={setPage}
                      rowsPerPage={rowsPerPage}
                      setRowsPerPage={setRowsPerPage}
                      count={count}
                      // editRow={editRow}
                      // setOpen={setOpen}
                      // deleteRow={deleteRow}
                      // displayView={displayView}
                    />
                  </>
                ) : null}

                <div className="w-full">
                  <InputField
                    name="remarks"
                    variant="outlined"
                    label="remarks"
                    control={control}
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }} // use inputProps props for return 1st letter in upper case
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 py-2">
                  <InputField
                    name="gantywarnty"
                    variant="outlined"
                    label="Guarantee Warranty"
                    control={control}
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }} // use inputProps props for return 1st letter in upper case
                    required
                  />

                  <DropdownField
                    control={control}
                    //handleChange={handleChange}
                    name="schedule"
                    // dataArray={store}
                    placeholder="Schedule"
                    isMulti={false}
                    isSearchable={false}
                  />

                  <DropdownField
                    control={control}
                    //handleChange={handleChange}
                    name="tax"
                    // dataArray={store}
                    placeholder="Tax"
                    isMulti={false}
                    isSearchable={false}
                  />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4">
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-4">
                      <span className="text-sm">Disc Amount </span>
                      <span className=""> :</span>
                    </h1>
                    {/* <h1 className="font-normal">Ram Sham Rao</h1> */}
                    <h1 className="font-normal">
                      {/* {props.patientData.patientName} */}
                    </h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-1">
                      <span className="text-sm">GST Amount </span>
                      <span className=""> :</span>
                    </h1>
                    {/* <h1 className="font-normal">Ram Sham Rao</h1> */}
                    <h1 className="font-normal">
                      {/* {props.patientData.patientName} */}
                    </h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-2">
                      <span className="text-sm">Other Amount </span>
                      <span className=""> :</span>
                    </h1>
                    {/* <h1 className="font-normal">Ram Sham Rao</h1> */}
                    <h1 className="font-normal">
                      {/* {props.patientData.patientName} */}
                    </h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-2 lg:space-x-5">
                      <span className="text-sm">Net Amount </span>
                      <span className=""> :</span>
                    </h1>
                    {/* <h1 className="font-normal">Ram Sham Rao</h1> */}
                    <h1 className="font-normal">
                      {/* {props.patientData.patientName} */}
                    </h1>
                  </div>
                </div>

                <div className="grid   w-full pt-3">
                  {/* Terms & Condtions */}
                  {fields.map((item, index) => (
                    <div className="grid py-2 w-full  gap-2 ">
                      <div className="flex  w-full gap-4">
                         <div className="w-8/12">
                          <InputField
                            name={`terms[${index}].termsnconditions`}
                            variant="outlined"
                            label="Terms & Conditions"
                            error={errors.terms?.[index]?.termsnconditions}
                            control={control}
                          />
                        </div>

                        <div className="flex gap-2">
                          {fields.length !== 1 && (
                            <RemoveOutlinedIcon
                              className="mt-2 rounded-full border-2 border-red-600"
                              onClick={() => {
                                remove(index);
                                if (index !== termsDetails.length - 1) {
                                  for (
                                    let i = index;
                                    i < termsDetails.length - 1;
                                    i++
                                  ) {
                                    setValue(
                                      `terms[${i}].termsnconditions`,
                                      termsDetails[i + 1].termsnconditions
                                    );
                                  }
                                }
                              }}
                            />
                          )}
                          {fields.length - 1 === index && (
                            <AddOutlinedIcon
                              className="mt-2 mx-1 rounded-full border-2 border-cyan-600"
                              onClick={(index) => {
                                console.log("terms error", !errors.terms);
                                let terms = "";
                                termsDetails.map((item) => {
                                  terms = item.termsnconditions;
                                });
                                if (terms !== "" && !errors.terms) {
                                  append({
                                    termsnconditions: "",
                                  });
                                } else {
                                  trigger("terms");
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </fieldset>
            {/* Backdrop */}
            {/* <CommonBackDrop openBackdrop={props.openBackdrop} /> */}
          </div>
        </Box>
      </Modal>
    </>
  );
}
