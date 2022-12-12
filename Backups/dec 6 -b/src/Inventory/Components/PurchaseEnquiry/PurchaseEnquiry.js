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
import {
  fetchAllEnquiry,
  autoSearchEnquiry,
} from "../../services/enquiry/EnquiryServices";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

export default function PurchaseEnquiry() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [enquiryOptions, setEnquiryOptions] = React.useState([]);
  const [unit, setUnit] = React.useState([]);
  const [unitId, setUnitId] = React.useState(null);
  const [itemsTypeId, setItemsTypeId] = useState(null);
  const [itemTypeOptions, setItemTypeOptions] = React.useState([]);
  const [itemsCategoryeId, setItemsCategoryId] = useState(null);
  const [itemCategory, setItemCategory] = React.useState();
  const [suppliers, setSuppliers] = React.useState([]);
  const [suppliersId, setSupplierId] = React.useState(null);
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();

  const [searchString, setSearchString] = React.useState("");
  const [enquiryId, setEnquiryId] = React.useState(null);

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

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    callTableDataApi();

    console.log("The current unit dropdown option is");
    console.log(JSON.stringify(getValues("unit")));
    setUnitId(getValues("unit").id);

    // console.log("The current itemType dropdown option is");
    // console.log(JSON.stringify(getValues("itemType")));
    // setItemsTypeId(getValues("itemType").id);

    // console.log("The current supplierMasters dropdown option is");
    // console.log(JSON.stringify(getValues("supplierMasters")));
    // setSupplierId(getValues("supplierMasters").id);
  };

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      console.log("Auto search String Is", autoSearchString);
      setSearchString(autoSearchString);
      if (enquiryId !== null) {
        setEnquiryId(null);
      }
      autoSearchEnquiry(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setEnquiryOptions(res.result);
        });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
      // =>{"id":2,"label":"CALCIGARD CAP 5MG. | ENQ/22-23/1669816732883","value":2}
    );
    if (value === null) {
      setSearchString("");
      setEnquiryId(null);
    } else {
      setSearchString(value.label);
      setEnquiryId(value.value);
    }
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
        console.log("Supplier", res);
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
    let obj = {
      enquiryId: enquiryId,
      fromDate: null,
      itemCategoryId: itemsCategoryeId,
      itemTypeId: itemsTypeId,
      page: 0,
      size: rowsPerPage,
      suppliersId: suppliersId,
      toDate: null,
      unitId: unitId,
      // searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllEnquiry(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        let enquiryList = {
          statusCode: "",
          result: [],
          actions: [],
        };
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          enquiryList.result.push(jsonObject);
        });
        enquiryList.actions = [...res.actions];
        enquiryList.statusCode = res.statusCode;
        console.log("Enquiry List here : ", enquiryList);
        setData(enquiryList);
        setDataResult(enquiryList.result);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }; 

  useEffect(() => {
    console.log("selectedFromDate is");
    if (selectedFromDate !== null && selectedToDate === null) {
      // console.log("select From Date Automaticaly set Todays Date / new Date()")
      let todaysDate = new Date();
      setSelectedToDate(todaysDate);
    } else if (selectedFromDate !== null && selectedToDate !== null) {
      const d = new Date(selectedFromDate);
      const dTwo = new Date(selectedToDate);
      console.log("d is " + d);
      console.log("dTwo is " + dTwo);
      let fromDate = d.toLocaleDateString();
      let toDate = dTwo.toLocaleDateString();

      fromDate = fromDate
        .split("/")
        .reverse()
        .join("/");

      toDate = toDate
        .split("/")
        .reverse()
        .join("/");

      fromDate = fromDate.replaceAll("/", "-");
      toDate = toDate.replaceAll("/", "-");

      console.log("selectedFromDate is ");
      console.log(fromDate);
      console.log("selectedToDate is");
      console.log(toDate);
    }

    if(enquiryId === null){
      callTableDataApi();
      }
  }, [selectedFromDate, selectedToDate , enquiryId]);

  const callTableDataApi = () => {
    showSpinner(true);
    showRecordWarning(false);
    let stringSearchObj = {
      enquiryId: enquiryId,
      fromDate: selectedFromDate,
      itemCategoryId: itemsCategoryeId,
      itemTypeId: itemsTypeId,
      page: 0,
      size: rowsPerPage,
      suppliersId: suppliersId,
      toDate: selectedToDate,
      unitId: unitId,
      // searchString: searchString,
    };
    fetchAllEnquiry(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        let enquiryList = {
          statusCode: "",
          result: [],
          actions: [],
        };
        console.log(
          "The input for setData function is " + JSON.stringify(response.data)
        );

        response.data.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          enquiryList.result.push(jsonObject);
        });

        enquiryList.statusCode = response.data.statusCode;
        console.log("Enquiry List here : ", enquiryList);
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          <div className="w-full col-span-2">
            <SearchBar
              searchIcon={true}
              name="itemSearch"
              control={control}
              placeholder="Search by Item Name/Enquiry No."
              handleInputChange={handleChange}
              onChange={autoSelectedValue} // serachId
              dataArray={enquiryOptions}
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
              inputRef={{
                ...register("unit", {
                  onChange: (e) => {
                    console.log("unit id is");
                    console.log(e.target.value.id);
                    setUnitId(e.target.value.id);
                  },
                }),
              }}
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
            inputRef={{
              ...register("supplierMasters", {
                onChange: (e) => {
                  let supp = getValues("supplierMasters");
                  console.log("Supplier id is ", e.target.value.id);
                  setSupplierId(e.target.value.id);
                },
              }),
            }}
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
            <SearchIconButton onClick={filterData} />
            <ResetButton
              onClick={() => {
                reset(defaultValues);
              }}
            />
          </div>
          <CommonBackDrop openBackdrop={openBackdrop} />
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

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

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
                enquiryId={enquiryId}
                setSelectedFromDate={setSelectedFromDate}
                selectedFromDate={selectedFromDate}
                itemCategoryId={itemsCategoryeId}
                itemTypeId={itemsTypeId}
                suppliersId={suppliersId}
                unitId={unitId}
                selectedToDate={selectedToDate}
                setSelectedToDate={setSelectedToDate}
                searchString={searchString}
              />
            </>
          ) : null}
          {recordWarning === true && spinner === false ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null}
        </div>
        <PurchaseEnquiryModal
          populateTable={populateTable}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />
      </div>
    </>
  );
}
