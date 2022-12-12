import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
// import EnquiryModal from "./EnquiryModal";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import CreatePO from "../../../Common Components/Buttons/CreatePO";
import ModalPurchaseOrder from "./ModalPurchaseOrder";
import { getUnitlist } from "../services/purchaseorder/PurchaseOrderServices";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
import {
  getAllItemCategory,
  getAllSupplier,
  getItemType,
} from "../../commonservices/CommonService";

const purchaseOrderData = {
  message: "Purchase Order list found ",
  result: [
    {
      Unit: "City Hospital",
      "PO Number": 1,
      "PO Date & Time": "2220/30/01 11.00AM",
      "Supplier Name": "Abhay Shrivastav",
      "PO Amount": "1400",
      "GST Amount": "1000",
      "Total  Amount": "1500",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "DD",
      Store: "lorem",
    },
    {
      Unit: "Deenanath Hospital",
      "PO Number": 2,
      "PO Date & Time": "2219/03/22 1.00PM",
      "Supplier Name": "Raju dhavde",
      "PO Amount": "4500",
      "GST Amount": "500",
      "Total  Amount": "5000",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "Check",
      Store: "lorem",
    },
    {
      Unit: "Sassoon Hospital",
      "PO Number": 3,
      "PO Date & Time": "2007/11/05 05.00AM",
      "Supplier Name": "Jitendra Reddy",
      "PO Amount": "8000",
      "GST Amount": "600",
      "Total  Amount": "8600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "Cash",
      Store: "lorem",
    },
    {
      Unit: "Siddhivinayak Nursing Home",
      "PO Number": 4,
      "PO Date & Time": "1980/80/01 11.00AM",
      "Supplier Name": "Abhay Shrivastav",
      "PO Amount": "1400",
      "GST Amount": "1000",
      "Total  Amount": "1500",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "DD",
      Store: "lorem",
    },
    {
      Unit: "Pawar Hospital",
      "PO Number": 5,
      "PO Date & Time": "2007/11/05 05.00AM",
      "Supplier Name": "Jitendra Reddy",
      "PO Amount": "4500",
      "GST Amount": "500",
      "Total  Amount": "5000",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "Check",
      Store: "lorem",
    },
    {
      Unit: "Sassoon Hospital",
      "PO Number": 6,
      "PO Date & Time": "1980/10/01 11.00AM",
      "Supplier Name": "Abhay Shrivastav",
      "PO Amount": "8000",
      "GST Amount": "600",
      "Total  Amount": "8600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "Cash",
      Store: "lorem",
    },
    {
      Unit: "Pawar Hospital",
      "PO Number": 7,
      "PO Date & Time": "1765/08/11 11.00AM",
      "Supplier Name": "Raju dhavde",
      "PO Amount": "1400",
      "GST Amount": "1000",
      "Total  Amount": "1500",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "Card",
      Store: "lorem",
    },
    {
      Unit: "Sassoon Hospital",
      "PO Number": 8,
      "PO Date & Time": "1980/50/01 11.00AM",
      "Supplier Name": "Jitendra Reddy",
      "PO Amount": "4500",
      "GST Amount": "500",
      "Total  Amount": "5000",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "lorem",
      Store: "lorem",
    },
    {
      Unit: "Pawar Hospital",
      "PO Number": 9,
      "PO Date & Time": "1980/50/01 11.00AM",
      "Supplier Name": "Abhay Shrivastav",
      "PO Amount": "8000",
      "GST Amount": "600",
      "Total  Amount": "8600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "lorem",
      Store: "lorem",
    },
    {
      Unit: "Deenanath Hospital",
      "PO Number": 10,
      "PO Date & Time": "1980/50/01 11.00AM",
      "Supplier Name": "Jitendra Reddy",
      "PO Amount": "8000",
      "GST Amount": "600",
      "Total  Amount": "8600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "lorem",
      Store: "lorem",
    },
    {
      Unit: "City Hospital",
      "PO Number": 11,
      "PO Date & Time": "1980/50/01 11.00AM",
      "Supplier Name": "Abhay Shrivastav",
      "PO Amount": "5000",
      "GST Amount": "600",
      "Total  Amount": "5600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "lorem",
      Store: "lorem",
    },
    {
      Unit: "Pawar Hospital",
      "PO Number": 12,
      "PO Date & Time": "1980/50/01 11.00AM",
      "Supplier Name": "Raju dhavde",
      "PO Amount": "8000",
      "GST Amount": "600",
      "Total  Amount": "8600",
      "Bill To": "lorem ipsum",
      "Ship To": "ipsub ty",
      "Payment Mode": "lorem",
      Store: "lorem",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const stores = [
  "Pathology",
  "10 TH FLOOR",
  "7 TH FLOOR",
  "ETU",
  "BioMedical NIBM",
  "Ambulance",
];

export default function PurchasOrder() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [unit, setUnit] = React.useState([]);
  const [itemTypeOptions, setItemTypeOptions] = React.useState();
  const [itemsTypeId, setItemsTypeId] = React.useState(null);
  const [itemCategory, setItemCategory] = React.useState();
  const [suppliers, setSuppliers] = React.useState([]);

  const defaultValues = {
    SearchPONumber: "",
    unit: [],
    store: [],
    supplier: [],
    fromDate: "",
    toDate: "",
  };

  const schema = yup.object().shape({
    departmentCode: yup.string().required("Required"),
    departmentName: yup.string().required("Required"),

    supplier: yup
      .array()
      .required("Required")
      .nullable(false, "Required")
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Required"),
  });

  useEffect(() => {
    setData(purchaseOrderData);
    setDataResult(purchaseOrderData.result);
  }, []);

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  // //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
    //API For unit dropdown list
    getAllSupplier(suppliers)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setSuppliers(res.result);
      });

    //API For Item Type dropdown list
    getItemType()
      .then((response) => response.data)
      .then((res) => {
        console.log("Item Type ressult is", res);
        setItemTypeOptions(res.result);
      });
  }, []);

  //API For unit dropdown list
  useEffect(() => {
    if (itemsTypeId !== null) {
      getAllItemCategory(itemsTypeId)
        .then((response) => response.data)
        .then((res) => {
          console.log(res);
          setItemCategory(res.result);
        })
        .catch((error) => {
          console.log("Error Response of Item Category is :", error);
        });
    }
  }, [itemsTypeId]);

  const [unitName, setUnitName] = React.useState([]);
  const handleUnitChange = (event) => {
    const {
      target: { value },
    } = event;
    setUnitName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [storeName, setStoreName] = React.useState([]);
  const handleStoreChange = (event) => {
    const {
      target: { value },
    } = event;
    setStoreName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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

  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      console.log("handleChange has been invoked n You can type : ");
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  //event listener function for edit icon
  function editRow() {
    setEdit(true);
    console.log("edit function Called!!");
    // setIdValue(gender.Id);
    handleOpen();
  }

  return (
    <>
      <div className="m-8">
        <div className="text-center text-2xl py-2 mt-16 text-black  font-Poppins">
          Purchase Order
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full gap-3 pb-2 ">
          <div className="col-span-3 lg:col-span-1">
            <FormControl>
              <div className=" flex space-x-3 items-center">
                <label className="font-semibold text-lg ">
                  P.O. Type &nbsp;:
                </label>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <div className="flex space-x-3 items-center">
                    <FormControlLabel
                      value="single"
                      control={<Radio />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="multiple"
                      control={<Radio />}
                      label="Multiple"
                    />
                  </div>
                </RadioGroup>
              </div>
            </FormControl>
          </div>
          {/* <div className="w-full">
            <SearchBar
              control={control}
              searchIcon={true}
              name="SearchPONumber"
              placeholder="Search PO Number"
              label="Search PO Number"
              isSearchable={true}
              isClearable={false}
              // dataArray={options}
              handleInputChange={handleChange}
              onChange={autoSelectedValue}
              // inputRef={{
              //   ...register("patientInfo", {
              //     onChange: (e) => {
              //       console.log(
              //         "The selected PatientName object is" +
              //           JSON.stringify(e)
              //       );

              //       setPatientInfo(true);
              //       setPatientData(e);

              //       if (e.target.value !== null) {
              //         console.log(
              //           "target value in the patientInfo",
              //           e.target.value
              //         );
              //         let PatientData = e.target.value;

              //         console.log("patient data", PatientData);
              //         setPatientData(e.target.value);
              //         setPatientInfoId(e.target.value.id);
              //       }
              //     },
              //   }),
              // }}
            />
          </div> */}

          <FormControl className="w-full" size="small">
            <InputLabel>Unit</InputLabel>
            <Select
              labelId="unit"
              id="unit"
              multiple
              value={unitName}
              onChange={handleUnitChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {unit.map((units) => (
                <MenuItem
                  key={units.label}
                  value={units.label}
                  sx={{ height: "30px" }}
                >
                  <Checkbox checked={unitName.indexOf(units.label) > -1} />
                  <ListItemText primary={units.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full" size="small">
            <InputLabel>Store</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={storeName}
              onChange={handleStoreChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {stores.map((store) => (
                <MenuItem key={store} value={store} sx={{ height: "30px" }}>
                  <Checkbox checked={storeName.indexOf(store) > -1} />
                  <ListItemText primary={store} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full" size="small">
            <InputLabel>Suppliers</InputLabel>
            <Select
              labelId="supplier"
              id="supplier"
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

          {/* Show Tab Screen DatePicker */}
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disablePast
                label="Delivery Date"
                // value={selectedFromDate}
                name="deliveryDate"
                // onChange={(newValue) => {
                //   setSelectedFromDate(newValue);
                // }}
                renderInput={(params) => (
                  <TextField
                    className="bg-white"
                    fullWidth
                    name="deliveryDate"
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
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.paymentMode}
              name="paymentMode"
              label="Payment Mode"
              // dataArray={patientSource}
              isSearchable={false}
              placeholder="Payment Mode"
              isClearable={false}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.termOfPayment}
              name="termOfPayment"
              label="Term Of Payment"
              // dataArray={patientSource}
              isSearchable={false}
              placeholder="Term Of Payment"
              isClearable={false}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.billTo}
              name="billTo"
              label="Bill To"
              // dataArray={patientSource}
              isSearchable={false}
              placeholder="Bill To"
              isClearable={false}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.shipTo}
              name="shipTo"
              label="Ship To"
              // dataArray={patientSource}
              isSearchable={false}
              placeholder="Ship To"
              isClearable={false}
            />
          </div>
          <Divider 
            sx={{
              "&::before, &::after": {
                borderColor: "#0B83A5",
              },
            }}
          />
        </div>

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <>
            <CommonMasterTable
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
              editRow={editRow}
              setOpen={setOpen}
              //   deleteRow={deleteRow}
              //   displayView={displayView}
            />
          </>
        ) : null}

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

        <ModalPurchaseOrder
          //  populateTable={populateTable}
          //  edit={edit}
          //  setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          //  idValue={idValue}
          handleOpen={handleOpen}
          handleClose={handleClose}
          //  openBackdrop={openBackdrop}
          //  setOpenBackdrop={setOpenBackdrop}
        />
      </div>
    </>
  );
}
