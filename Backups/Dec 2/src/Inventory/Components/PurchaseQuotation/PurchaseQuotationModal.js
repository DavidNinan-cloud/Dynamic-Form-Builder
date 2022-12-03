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
import PurchaseQuotationTable from "./PurchaseQuotationTable";
import QuatationModal from "./HeaderModal";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Modal, OutlinedInput, Select, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import HeaderModal from "./HeaderModal";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { getAllItemCategory, getAllSupplier, getItemType, getUnitlist } from "../../commonservices/CommonService";

const orderdDrugDetailsData = {
  message: "Order Drug Details list found ",
  result: [
    {
      "Sr. No.": 1,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 2,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 3,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 4,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 5,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 6,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 7,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 8,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 9,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 10,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 11,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 12,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 13,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 14,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
    {
      "Sr. No.": 15,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: "Tab.",
      Rate: "0.000",
      Amount: "0.000",
      Concession: "0.000",
      Excise: "0.000",
      Tax: "0.00",
      "Net Amount": "0.000",
      Remark: "900 mg",
    },
  ],
  statusCode: 200,
  actions: ["Delete"],
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

const PurchaseQuotationModal = (props) => {
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    borderRadius: 1,
    boxShadow: 20,
    py: 2,
    px: 2,
  };

  const [newHeader, setNewHeader] = useState("");
  const [openHeader, setOpenHeader] = React.useState(false);
  const handleHeaderOpen = () => setOpenHeader(true);
  const handleHeaderClose = () => setOpenHeader(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [unit, setUnit] = React.useState([]);
  const [itemTypeOptions, setItemTypeOptions] = React.useState();
  const [itemsTypeId, setItemsTypeId] = useState(null);
  const [itemCategory, setItemCategory] = React.useState();
  const [suppliers, setSuppliers] = React.useState([]);

  const defaultValues = {
    unit: null,
    itemType: null,
    itemCategory: null,
    supplier: null,
    store: null,
    itemName: "",
    uom: "",
    rate: "",
    quantity: "",
    amount: "",
    excise: "",
    tax: "",
    concession: "",
    netAmount: "",
    remarks: "",
    termsConditions: "",
    other: "",
    totalAmount: "",
    finalAmount: "",
    itemSearch: "",
  };

  const schema = yup.object().shape({
    supplier: yup
      .array()
      .required("Select atleast 1 supplier")
      .nullable()
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      ),

    rate: yup
      .string()
      .required("Required")
      .min(0,"Required")
      .matches(/^[0-9]+$/, "Enter numeric value"),

    quantity: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    excise: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    tax: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    itemSearch: yup
      .object()
      .required("Search item")
      .nullable()
      .shape({
        value: yup.string().required("Search item"),
        label: yup.string().required("Search item"),
      }),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

 

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

  let rate = watch("rate");
  let quantity = watch("quantity");
  let amount = rate * quantity;
  setValue("amount", amount);

   //API For unit dropdown list
   useEffect(() => {
    setData(orderdDrugDetailsData);
    setDataResult(orderdDrugDetailsData.result);

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
      <div className="m-2 border">
        <Modal
          open={props.openModal}
          onClose={() => {
            props.handleClose();
          }}
        >
          <Box sx={ModalStyle} className="h-[80%] max-h-[80%]">
            <div className="grid grid-cols-1 md:grid-cols-1 w-full ">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>
            <div className="text-xl text-center text-gray-700 mb-1">
              Add Quotation
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full gap-2">
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
                  error={errors.itemType}
                  name="itemType"
                  dataArray={itemTypeOptions}
                  placeholder="Item Type"
                  inputRef={{
                    ...register("itemType", {
                      onChange: (e) => {
                        console.log("Get itemType Id is", e.target.value.id);
                        setItemsTypeId(e.target.value.id);
                      },
                    }),
                  }}
                />
              </div>
              <div className="w-full">
              <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  error={errors.itemCategory}
                  name="itemCategory"
                  dataArray={itemCategory}
                  placeholder="Item Category"
                />
              </div>
              <div className="w-full">
                {/* <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  error={errors.supplier}
                  name="supplier"
                  dataArray={itemOptions}
                  placeholder="Select Supplier*"
                  isMulti={true}
                  isSearchable={false}
                  isClearable={false}
                /> */}
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
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  name="store"
                  dataArray={itemOptions}
                  placeholder="Store"
                  isMulti={true}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
              <div className="w-full underline text-blue-500 text-base pt-4">
                <a
                  href="#"
                  onClick={() => {
                    handleHeaderOpen();
                  }}
                >
                  Show Header
                </a>
              </div>
            </div>

            <hr className="w-full my-2 border-t-2 border-customBlue" />

            <form onSubmit={handleSubmit(onSubmitDataHandler)}>
              <div className="gap-2 p-2 my-2 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
                <div className="text-xl text-gray-700 mb-1 text-center xl:text-left col-span-3 lg:col-span-4 xl:col-span-1 2xl:col-span-1">
                  Item Inform.
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <SearchBar
                    name="itemSearch"
                    placeholder="Item Search"
                    dataArray={itemOptions}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                    searchIcon={true}
                    error={errors.itemSearch}
                    control={control}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="uom"
                    variant="outlined"
                    label="U.O.M"
                    disabled={true}
                    // error={errors.uom}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="rate"
                    variant="outlined"
                    label="Rate(Rs.)"
                    error={errors.rate}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="quantity"
                    variant="outlined"
                    label="Quantity"
                    error={errors.quantity}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="amount"
                    variant="outlined"
                    label="Amount(Rs.)"
                    // error={errors.amount}
                    control={control}
                    disabled={true}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="excise"
                    variant="outlined"
                    label="Excise(Rs.)"
                    error={errors.excise}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="tax"
                    variant="outlined"
                    label="Tax(%)"
                    error={errors.tax}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="concession"
                    variant="outlined"
                    label="Concession(Rs.)"
                    // error={errors.concession}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="netAmount"
                    variant="outlined"
                    label="Net Amount(Rs.)"
                    // error={errors.amount}
                    control={control}
                    disabled={true}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div>
                  <AddButton />
                </div>
              </div>
            </form>
            <div className="w-full">
              {data.hasOwnProperty("result") &&
              data.result.length > 0 &&
              data.statusCode === 200 &&
              spinner === false ? (
                <>
                  <PurchaseQuotationTable
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
            <div className="my-2">
              <div className="flex gap-4 my-2 px-6 py-4 border border-slate-300 border-solid rounded">
                <div className="w-full">
                  <InputField
                    name="totalAmount"
                    variant="outlined"
                    label="Total Amount(Rs.)"
                    // error={errors.totalAmount}
                    control={control}
                    disabled={true}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="other"
                    variant="outlined"
                    label="Other(Rs.)"
                    // error={errors.other}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="finalAmount"
                    variant="outlined"
                    label="Final Amount(Rs.)"
                    // error={errors.finalAmount}
                    control={control}
                    disabled={true}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[70%]">
                  <TextareaAutosize
                    minRows={2}
                    placeholder="Note"
                    style={{
                      width: "100%",
                      border: "1px solid black",
                      padding: "1rem",
                    }}
                    name="note"
                    value={newHeader}
                    onChange={(e) => setNewHeader()}
                  />
                </div>
                <div className="w-[30%]">
                  <TextareaAutosize
                    minRows={2}
                    placeholder="Terms & Conditions"
                    style={{
                      width: "100%",
                      border: "1px solid black",
                      padding: "1rem",
                    }}
                    name="termsCondition"
                    value={newHeader}
                    onChange={(e) => setNewHeader()}
                  />
                </div>
              </div>
              <div className=" my-1 flex justify-end gap-2">
                <PrintButton />
                <ResetButton
                  onClick={() => {
                    setNewHeader("");
                    reset(defaultValues);
                  }}
                />
                <SubmitButton />
              </div>
            </div>
            <HeaderModal
              openHeader={openHeader}
              setOpenHeader={setOpenHeader}
              handleHeaderOpen={handleHeaderOpen}
              handleHeaderClose={handleHeaderClose}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default PurchaseQuotationModal;
