import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../Common Components/FormFields/InputField";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import PrintButton from "../../../Common Components/Buttons/PrintButton";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import NewEnquiryButton from "../../../Common Components/Buttons/NewEnquiryButton";
import PurchaseEnquiryTable from "../Common/PurchaseTable";
import PurchaseEnquiryModal from "./PurchaseEnquiryModal";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
import {
  getUnitlist,
  getItemType,
  getAllSupplier,
} from "../../commonservices/CommonService";

const orderdDrugDetailsData = {
  message: "Order Drug Details list found ",
  result: [
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "No",
    },
    {
      "Enquiry  No.": "1001",
      "Enquiry  Date": "30/10/2022",
      "Supplier Name": "Medicare",
      "Quotation Received": "Yes",
    },
  ],
  statusCode: 200,
  actions: ["ViewFile"],
  count: 3,
};

const itemOptions = [
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

const suppliers = ["Babu", "Sakshi", "Shubham Enterprises", "Shivam"];

export default function PurchaseEnquiry() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
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

  const [unit, setUnit] = React.useState([]);
  const [itemTypeOptions, setItemTypeOptions] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  const defaultValues = {
    unit: null,
    itemType: null,
    supplier: null,
    itemSearch: null,
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

  useEffect(() => {
    setData(orderdDrugDetailsData);
    setDataResult(orderdDrugDetailsData.result);
  }, []);

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);
    // if (autoSearchString !== "") {
    //   autoSearchBlock(autoSearchString)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       console.log(
    //         "The response of auto-complete / auto-search is " +
    //           JSON.stringify(res)
    //       );
    //       setOptions(res.result);
    //     });
    // }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    // if (value === null) {
    //   setAutoCompleteObj("");
    // } else {
    //   setAutoCompleteObj(value);
    //   console.log(JSON.stringify(value));
    //   unitIdValue = getValues("unit").id;
    //   console.log("The unit id is " + unitIdValue);
    // }
  };

  const onSubmitDataHandler = (data) => {
    console.log("The Value is" + JSON.stringify(data));
  };

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });

    //API For Item Type dropdown list
    getItemType()
      .then((response) => response.data)
      .then((res) => {
        console.log("Item Type ressult is", res);
        setItemTypeOptions(res.result);
      });
  //API For Supplier dropdown list
    getAllSupplier(suppliers)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setSuppliers(res.result);
      });
  }, []);

  const [supplierName, setSupplierName] = React.useState([]);
  const handleSupplierChange = (event) => {
    const {
      target: { value },
    } = event;
    setSupplierName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <div className="m-8">
        <div className="text-xl text-center text-gray-700 mt-16 mb-4">
          Enquiry
        </div>

        <div className="grid md:grid-cols-2 xl:flex gap-2">
          <div className="w-full col-span-2 xl:w-2/5">
            <SearchBar
              searchIcon={true}
              name="itemSearch"
              control={control}
              placeholder="Search by Item Name / No."
              handleInputChange={handleChange}
            />
          </div>
          <div className="flex gap-2 md:col-span-3 xl:col-span-1 w-full">
          <div className="w-full">
          <DropdownField
              control={control}
              //handleChange={handleChange}
              name="unit"
              dataArray={unit}
              placeholder="Unit"
              isMulti={false}
              isSearchable={false}
              isClearable={false}
            />
          </div>
            <div className="w-full">
            <DropdownField
              control={control}
              //handleChange={handleChange}
              name="itemType"
              dataArray={itemTypeOptions}
              placeholder="Item Type"
              isMulti={false}
              isSearchable={false}
              isClearable={false}
            />
            </div>
            <FormControl className="w-full" size="small">
              <InputLabel>Suppliers</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={supplierName}
                onChange={handleSupplierChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {suppliers.map((suppliers) => (
                  <MenuItem
                    key={suppliers.label}
                    value={suppliers.label}
                    sx={{ height: "30px", width: "30px" }}
                  >
                    <Checkbox
                      checked={supplierName.indexOf(suppliers.label) > -1}
                    />
                    <ListItemText primary={suppliers.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SearchIconButton
              onClick={() => {
                console.log("Click SearchIcon Button");
                // onClick={filterData}
              }}
            />
          </div>
          <ResetButton
            onClick={() => {
              reset(defaultValues);
            }}
          />
        </div>

        <div className="flex gap-2 justify-between col-span-4 py-2 lg:col-span-1 xl:col-span-4 2xl:col-span-1">
        <p className="text-lg text-black items-end font-Poppins">
        Enquiry List Details
        </p>
          <NewEnquiryButton
            onClick={() => {
              handleOpen();
            }}
          />
        </div>


        <div className="w-full">
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <>
              <PurchaseEnquiryTable
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
            </>
          ) : null}
        </div>
        <PurchaseEnquiryModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
