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
import { TextareaAutosize } from "@mui/material";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
// import { ModalStyle } from "../../../Common Components/ModalStyle";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

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
    console.log(errors);
  }, [errors]);

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
                  control={control}
                  //handleChange={handleChange}
                  error={errors.unit}
                  name="unit"
                  dataArray={itemOptions}
                  placeholder="Select Unit"
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  error={errors.itemType}
                  name="itemType"
                  dataArray={itemOptions}
                  placeholder="Item Type"
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  error={errors.itemCategory}
                  name="itemCategory"
                  dataArray={itemOptions}
                  placeholder="Item Category"
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  error={errors.supplier}
                  name="supplier"
                  dataArray={itemOptions}
                  placeholder="Select Supplier*"
                  isMulti={true}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  //handleChange={handleChange}
                  name="store"
                  dataArray={itemOptions}
                  placeholder="Store"
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
            <hr className="w-full my-2 border-t-2 border-sky-100" />
            <form onSubmit={handleSubmit(onSubmitDataHandler)}>
              <div className="gap-2 items-center grid grid-cols-3 xl:grid-cols-6 2xl:grid-cols-9">
                <div className="flex gap-2 w-full items-center col-span-3">
                  <div className="text-xl text-gray-700 text-center w-60 2xl:w-64">
                    Item Information
                  </div>
                  <div className="w-full z-10">
                    <SearchBar
                      name="itemSearch"
                      placeholder="Search Item"
                      dataArray={itemOptions}
                      handleInputChange={handleChange}
                      onChange={autoSelectedValue}
                      searchIcon={true}
                      error={errors.itemSearch}
                      control={control}
                    />
                  </div>
                </div>
                <div className="w-full">
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
                <div className="w-full">
                  <InputField
                    name="quantity"
                    variant="outlined"
                    label="Qty"
                    // type="number"
                    error={errors.quantity}
                    control={control}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="packSize"
                    variant="outlined"
                    label="Pack Size"
                    error={errors.packSize}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full col-span-2">
                  <InputField
                    name="remark"
                    variant="outlined"
                    label="Remark"
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="flex justify-end xl:justify-start">
                  <AddButton />
                </div>
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
