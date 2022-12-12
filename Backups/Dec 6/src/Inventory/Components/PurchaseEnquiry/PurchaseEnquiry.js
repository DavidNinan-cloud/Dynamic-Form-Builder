import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import NewEnquiryButton from "../../../Common Components/Buttons/NewEnquiryButton";
import PurchaseEnquiryTable from "../Common/PurchaseTable";
import PurchaseEnquiryModal from "./PurchaseEnquiryModal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
import {
  getUnitlist,
  getItemType,
  getAllSupplier,
  getAllItemCategory,
} from "../../commonservices/CommonService";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { fetchAllEnquiry } from "../../services/enquiry/EnquiryServices";

export default function PurchaseEnquiry() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);

  const [unit, setUnit] = React.useState([]);
  const [itemsTypeId, setItemsTypeId] = useState(null);
  const [itemTypeOptions, setItemTypeOptions] = React.useState([]);
  const [itemsCategoryeId, setItemsCategoryId] = useState(null);
  const [itemCategory, setItemCategory] = React.useState();
  const [suppliers, setSuppliers] = React.useState([]);
 
  let suppliersId = "";
  const unitId = "";
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [enquiryNo, setEnquiryNo] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [itemName, setItemName] = React.useState();

  let enquiryList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  const defaultValues = {
    unit: null,
    itemType: null,
    itemCategory: null,
    supplierMasters: null,
    itemSearch: null,
    quotationReceived: null,
    fromDate: "",
    toDate: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
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

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        // console.log(res);
        setUnit(res.result);
      });

    //API For Item Type dropdown list
    getItemType()
      .then((response) => response.data)
      .then((res) => {
        // console.log("Item Type ressult is", res);
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

  useEffect(() => {
    if (itemsTypeId !== null) {
      getAllItemCategory(itemsTypeId)
        .then((response) => response.data)
        .then((res) => {
          // console.log(res);
          setItemCategory(res.result);
        })
        .catch((error) => {
          console.log("Error Response of Item Category is :", error);
        });
    }
    console.log("Form is Valid", isValid);
  }, [itemsTypeId, isValid]);

  const populateTable = () => {

    // {"enquiryNo":"","fromDate":null,"itemCategoryId":null,"itemTypeId":null,"page":0,"size":10,"suppliersId":"","toDate":null,"unitId":""}

    let obj = {
      fromDate: null,
      enquiryNo: enquiryNo,
      itemCategoryId: itemsCategoryeId,
      itemName: itemName,
      itemTypeId: itemsTypeId,
      page: 0,
      size: rowsPerPage,
      suppliersId: suppliersId,
      toDate: null,
      unitId: unitId,
    };
    setPage(0);
    showSpinner(true); // fetching data from server that time spinner show / loading
    showRecordWarning(false);
    fetchAllEnquiry(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          enquiryList.result.push(jsonObject);
        });
console.log("jsonObject is ",jsonObject);
        enquiryList.actions = [...res.actions];
        enquiryList.statusCode = res.statusCode;
        console.log("Enquiry List here : ", enquiryList);
        setData(enquiryList);
        setDataResult(enquiryList.result);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
      })
      .catch(() => {
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
        showRecordWarning(true);
      });
  };

  const stringSearchObj = {
    enquiryNo: enquiryNo,
    fromDate: null,
    itemCategoryId: itemsCategoryeId,
    itemName: itemName,
    itemTypeId: itemsTypeId,
    page: 0,
    size: rowsPerPage,
    suppliersId: suppliersId,
    toDate: null,
    unitId: unitId,
  };

  useEffect(() => {
    callTableDataApi();
  }, []);

  const callTableDataApi = () => {
    showSpinner(true);
    showRecordWarning(false);
    fetchAllEnquiry(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          enquiryList.result.push(jsonObject);
        });

        enquiryList.actions = [...res.actions];
        enquiryList.statusCode = res.statusCode;
        console.log(enquiryList);
        setData(enquiryList);
        setDataResult(enquiryList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  return (
    <>
      <div className="m-8">
        <div className="text-xl text-center text-gray-700 mt-16 mb-2">
          Enquiry
        </div>

        {/* <div className="grid md:grid-cols-2 xl:flex gap-2">
          <div className="w-full col-span-2 xl:w-2/5">
            <SearchBar
              searchIcon={true}
              name="itemSearch"
              control={control}
              placeholder="Search by Item Name/Enquiry No."
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
        </div> */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          <div className="w-full col-span-2">
            <SearchBar
              searchIcon={true}
              name="itemSearch"
              control={control}
              placeholder="Search by Item Name/Enquiry No."
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
              handleChange={handleChange}
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
          <DropdownField
            control={control}
            name="itemCategory"
            dataArray={itemCategory}
            placeholder="Item Category"
            inputRef={{
              ...register("itemCategory", {
                onChange: (e) => {
                  setItemsCategoryId(e.target.value.id);
                  console.log("Item Category id is", e.target.value.id);
                },
              }),
            }}
            isMulti={false}
            isClearable={false}
            isSearchable={false}
          />
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

          <DropdownField
            control={control}
            //handleChange={handleChange}
            error={errors.quotationReceived}
            name="quotationReceived"
            // dataArray={suppliers}
            placeholder="Quotation Received"
            isMulti={false}
            isSearchable={false}
            isClearable={false}
          />
          <div className="flex gap-2 xl:col-span-2">
            <div className="">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // disablePast
                  label="From Date"
                  value={selectedFromDate}
                  name="fromDate"
                  onChange={(newValue) => {
                    setSelectedFromDate(newValue);
                  }}
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
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disableFuture
                  label="To Date"
                  value={selectedToDate}
                  onChange={(newValue) => {
                    setSelectedToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="bg-white"
                      name="toDate"
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
            </div>
          </div>
          <div className="flex gap-2 justify-end lg:justify-start">
            <ResetButton
              onClick={() => {
                reset(defaultValues);
              }}
            />
            <SearchIconButton
              onClick={() => {
                console.log("Click SearchIcon Button");
                // onClick={filterData}
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-between col-span-4 py-1 lg:col-span-1 xl:col-span-4 2xl:col-span-1">
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
                tableApiFunc={fetchAllEnquiry}
                dataResult={dataResult}
                setDataResult={setDataResult}
                data={data}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={count}
                enquiryNo={enquiryNo}
                itemCategoryId={itemsCategoryeId}
                itemName={itemName}
                itemTypeId={itemsTypeId}
                selectedFromDate={selectedFromDate}
                suppliersId={suppliersId}
                unitId={unitId}
                setSelectedFromDate={setSelectedFromDate}
                selectedToDate={selectedToDate}
                setSelectedToDate={setSelectedToDate}
              />
            </>
          ) : null}
        </div>
        <PurchaseEnquiryModal
          populateTable={populateTable}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
