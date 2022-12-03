import React from "react";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../Common Components/Buttons/ApplyButton";
import NewIndentButton from "../../../Common Components/Buttons/NewIndentButton";
import CommonTable from "../../../IPD/nursing/common/CommonTable";
import NewIndentModal from './NewIndentModal'
const storeData = {
  message: "storeData list found ",
  result: [
    {
      Id: 1,
      ItemCode: 5,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS1555",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 60",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1-1-1",
    },

    {
      Id: 29,
      ItemCode: 3,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS1565",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 450",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1-0-0",
    },
    {
      Id: 28,
      ItemCode: 7,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS1555",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 320",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1-0-1",
    },
    {
      Id: 16,
      ItemCode: 5,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS15455",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 220",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "0-1-1",
    },
    {
      Id: 1,
      ItemCode: 5,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS1555",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 300",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1-1-1-1",
    },
    {
      Id: 3,
      ItemCode: 5,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BR1255",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 410",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1/2-1/2-1",
    },
    {
      Id: 4,
      ItemCode: 5,
      PharamcyName: "Anesthesiologists",
      BatchNo: "BS1555",
      Quantity: "",
      ExpiryDate: "05/12/2023",
      "MRP.": 2,
      Amount: "₹ 210",
      "Disc %": 0,
      "Disc.Amt": 0,
      "GST%": "10 %",
      "GST.Amt": "₹ 11",
      Rack: 87,
      Shelf: 2,
      Schedule: "1-1-1",
    },
  ],
  statusCode: 200,

  count: 5,
};

function StoreIndent(props) {
  const schema = yup.object().shape({
    fromStore: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
  });

const [fromDate,setFromDate] = React.useState(null);
const [toDate,setToDate] = React.useState(null);

  const defaultValues = {
    firstName: "",
    searchItems: null,
    tax: null,
  };
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  // indent modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    //to set the form fields as blank
    reset(defaultValues);
  };
  const handleChangeSearchBar = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value typed by the user is " + autoSearchString);
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  return (
    <div className="mt-20 px-6">
        <h1 className="text-gray-700 text-xl my-1 font-semibold">Store Indent</h1>
      <form   onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          <div className="col-span-2">
            <SearchBar
              control={control}
              sx={{ overflow: "hidden" }}
              name="searchItem"
              label="Search By Indent Number"
              searchIcon={true}
              // dataArray={itemsData}
              handleInputChange={handleChangeSearchBar}
              onChange={autoSelectedValue}
              placeholder="Search By Indent Number"
              isSearchable={true}
              isClearable={false}
            />
          </div>
          <DropdownField
            control={control}
            error={errors.fromStore}
            name="fromStore"
            placeholder="From Store*"
            //   dataArray={groupOptions}
            isDisabled={props.edit}
          />
          <DropdownField
            control={control}
            error={errors.toStore}
            name="toStore"
            placeholder="To Store*"
            //   dataArray={groupOptions}
            isDisabled={props.edit}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="From Date"
              name="fromDate"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  className="bg-white"
                  fullWidth
                  size="small"
                  {...params}
                  sx={{
                    svg: { color: "#0B83A5" },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="To Date"
              name="toDate"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  className="bg-white"
                  fullWidth
                  size="small"
                  {...params}
                  sx={{
                    svg: { color: "#0B83A5" },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <DropdownField
            control={control}
            error={errors.itemClass}
            name="itemClass"
            placeholder="Item Class*"
            //   dataArray={groupOptions}
            isDisabled={props.edit}
          />
          <DropdownField
            control={control}
            error={errors.itemKit}
            name="itemKit"
            placeholder="Item Kit*"
            //   dataArray={groupOptions}
            isDisabled={props.edit}
          />
          <div className="flex space-x-2 ">
          <ResetButton />
            <ApplyButton />
          </div>
          <div className="col-span-3 lg:col-span-3 justify-end xl:col-span-3 flex space-x-3">
           
            <NewIndentButton
              onClick={() => {
                handleOpen();
              }}
            />
          </div>
        </div>
      </form>
      <CommonTable data={storeData} />
      <div>
        <NewIndentModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}

export default StoreIndent;
