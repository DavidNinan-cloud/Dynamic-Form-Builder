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
import NewQuotationButton from "../../../Common Components/Buttons/NewQuotationButton";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import PurchaseQuotationTable from "../Common/PurchaseTable";
import PurchaseQuotationModal from "./PurchaseQuotationModal";
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
import {
  getAllItemCategory,
  getAllSupplier,
  getItemType,
  getUnitlist,
} from "../../commonservices/CommonService";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";

const orderdDrugDetailsData = {
  message: "Order Drug Details list found ",
  result: [
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
    },
    {
      "Quotation No.": 101,
      "Quotation Date": "30/10/2022",
      "Enquiry No.": 1001,
      "Supplier Name": "Lorem ipsum dolor",
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

export default function PurchaseQuotation() {
  const [newHeader, setNewHeader] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
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
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
    itemSearch: null,
  };

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
    resolver: yupResolver(),
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

  useEffect(() => {
    setData(orderdDrugDetailsData);
    setDataResult(orderdDrugDetailsData.result);

    //API For unit dropdown list
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });

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

  return (
    <>
      <div className="m-4">
        <div className="text-xl text-center text-gray-700 mt-16 mb-4">
          Quotation
        </div>
        <div className="w-full grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          <div className="w-full col-span-3 xl:col-span-2 ">
            <SearchBar
              name="itemSearch"
              control={control}
              placeholder="Search by Item Name/Enquiry No./Supplier"
              handleInputChange={handleChange}
            />
          </div>
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
              isMulti={false}
              isClearable={false}
              isSearchable={false}
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
              isMulti={false}
              isClearable={false}
              isSearchable={false}
            />
          </div>
          <div className="w-full">
            <DropdownField
              control={control}
              //handleChange={handleChange}
              error={errors.supplierMasters}
              name="supplierMasters"
              dataArray={suppliers}
              placeholder="Suppliers*"
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
              // dataArray={storeOptions}
              placeholder="Store"
              isMulti={true}
              isSearchable={false}
              isClearable={false}
            />
          </div>
          <SearchIconButton
            onClick={() => {
              console.log("Click SearchIcon Button");
              onClick = { filterData };
            }}
          />
          <div className="flex gap-2 justify-end col-span-3 xl:col-span-2 2xl:col-span-4">
            <ResetButton onClick={() => reset(defaultValues)} />
            <NewQuotationButton
              onClick={() => {
                handleOpen();
              }}
            />
          </div>
        </div>
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
        <PurchaseQuotationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
