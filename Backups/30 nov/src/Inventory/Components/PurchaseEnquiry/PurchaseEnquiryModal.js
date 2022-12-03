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
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import PurchaseEnquiryTable from "./PurchaseEnquiryTable";
import HeaderModal from "./HeaderModal";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
// import { ModalStyle } from "../../../Common Components/ModalStyle";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import {
  getAllSupplier,
  getItemType,
  getUnitlist,
  getAllItemCategory,
} from "../../commonservices/CommonService";

const orderdDrugDetailsData = {
  message: "Order Drug Details list found ",
  result: [
    {
      "Item Code": 1,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 2,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 3,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 4,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 5,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 6,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 7,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 8,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 9,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
    {
      "Item Code": 10,
      "Item Name": "Tab Wysolon 40mg",
      "U.O.M.": "Lorem ipsum dolor ",
      Quantity: 10,
      Remark: "Item Supplied",
      "Package Size": 50,
    },
  ],
  statusCode: 200,
  actions: ["Delete"],
  count: 3,
};

const suppliers = ["Babu", "Sakshi", "Shubham Enterprises", "Shivam"];

const PurchaseEnquiryModal = (props) => {
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
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
    quantity: "",
    packSize: "",
    remarks: "",
    note: "",
    termsCondition: "",
    itemSearch: null,
  };

  const schema = yup.object().shape({
    supplier: yup
      .array()
      .nullable()
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Select atleast 1 supplier"),

    itemSearch: yup.string().required("Required"),

    quantity: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    packSize: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),
  });

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
    resolver: yupResolver(schema),
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
    // }ModalStyle
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
      <div className="m-2">
        <Modal open={props.openModal}>
          <Box sx={ModalStyle} className="h-[80%] max-h-[80%]">
            <div className="grid grid-cols-1 md:grid-cols-1  w-full ">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="text-xl text-center text-gray-700 mb-4">
              Add Enquiry
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full gap-2">
              <div className="w-full">
                <DropdownField
                  error={errors.unit}
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
                  placeholder="Suppliers*"
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
                  // dataArray={itemOptions}
                  placeholder="Store"
                  isMulti={true}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
              <div className="w-full underline text-customBlue text-base pt-4">
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
              <div className="gap-2  grid grid-cols-3 xl:grid-cols-6 2xl:grid-cols-9">
                <div className="flex gap-2 w-full col-span-3">
                  <div className="text-lg text-gray-700 text-center md:whitespace-nowrap lg:whitespace-normal ">
                    Item Information
                  </div>
                  <div className="flex w-full gap-2 z-10">
                    <SearchBar
                      name="itemSearch"
                      placeholder="Search Item"
                      // dataArray={itemOptions}
                      handleInputChange={handleChange}
                      onChange={autoSelectedValue}
                      searchIcon={true}
                      error={errors.itemSearch}
                      control={control}
                    />
                    <div className="w-full hidden xl:block                                                    ">
                      <InputField
                        // sx={{background:"white"}}
                        name="uom"
                        variant="outlined"
                        label="U.O.M"
                        disabled={true}
                        // error={errors.uom}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full xl:hidden">
                  <InputField
                    // sx={{background:"white"}}
                    name="uom"
                    variant="outlined"
                    label="U.O.M"
                    disabled={true}
                    // error={errors.uom}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full grid gap-2 grid-cols-3">
                  <div>
                    <InputField
                      name="quantity"
                      variant="outlined"
                      label="Qty"
                      // type="number"
                      error={errors.quantity}
                      control={control}
                    />
                  </div>
                  {/* </div>
                <div className="w-full"> */}
                  <div className="col-span-2">
                    <InputField
                      name="packSize"
                      variant="outlined"
                      label="Pack Size"
                      error={errors.packSize}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-2 col-span-2">
                  <InputField
                    name="remarks"
                    variant="outlined"
                    label="Remark"
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                  <AddButton />
                </div>
                {/* <div className="flex justify-end xl:justify-start">
                 
                </div> */}
              </div>
            </form>
            <div>
              {/* CommonMasterTable Component */}
              {/* {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 ? ( */}
              {/* ) : null} */}
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
            <div className="my-2">
              <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                <div className="xl:col-span-2">
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
                <div className="xl:col-span-2">
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
                <div className="flex justify-end gap-2 col-span-2 xl:col-span-1">
                  <ResetButton
                    onClick={() => {
                      setNewHeader("");
                      reset(defaultValues);
                    }}
                  />
                  <SubmitButton />
                </div>
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

export default PurchaseEnquiryModal;
