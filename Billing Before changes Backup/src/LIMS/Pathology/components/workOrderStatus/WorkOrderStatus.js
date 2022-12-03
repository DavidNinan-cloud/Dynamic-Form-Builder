import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Checkbox, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../../Common Components/Buttons/ApplyButton";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";

import { yupResolver } from "@hookform/resolvers/yup";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";

import ListOfOrdersWorkStatusTable from "./ListOfOrdersWorkStatusTable";
import JoditEditor from "jodit-react";
import {
  fetchWorkOrdersStatusList,
  getPaitentInfoByNo,
} from "../../services/WorkOrderStatusServices";
import OrderStatusTable from "./OrderStatusTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";

const reportOptions = [
  { value: "pendingReports", id: "pendingReports", label: "Pending Reports" },
  {
    value: "completedReports",
    id: "completedReports",
    label: "Completed Reports",
  },
  {
    value: "collectedReports",
    id: "collectedReports",
    label: "Collected Reports",
  },
];

const WorkOrderStatus = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    //resolver: yupResolver(schema),
    defaultValues: {
      fromDate: null,
      toDate: null,
      reportOptions: "",
    },
  });

  const [finalData, setFinalData] = React.useState({});
  const [openPost, setOpenPost] = React.useState(false);
  const [count, setCount] = useState();
  const [recordWarning, showRecordWarning] = useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchString, setSearchString] = useState(null);
  const [searchValue, setSearchValue] = useState(false);
  const [searchOptions, setSearchOptions] = React.useState([]);

  const [open, setOpen] = useState(false);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);
  const [spinner, showSpinner] = useState(false);
  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  const fetchWorkOrdersStatusListData = (defaultParams) => {
    showSpinner(true);
    showRecordWarning(false);
    fetchWorkOrdersStatusList(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        console.log("res", res);
        let orderStatusList = [];
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          orderStatusList.push(jsonObject);
        });
        console.log("orderStatusList", orderStatusList);
        setData(res);
        setCount(res.count);
        setDataResult([...orderStatusList]);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  useEffect(() => {
    let defaultParams = {
      categoryId: null,
      fromDate: null,
      fromOrderNo: null,
      opdIpd: null,
      page: page,
      patientId: searchString,
      reportStatus: null,
      sampleStatus: null,
      searchString: "",
      size: rowsPerPage,
      testTypeId: null,
      toDate: null,
      toOrderNo: null,
      uhidCode: null,
      unitId: null,
    };
    fetchWorkOrdersStatusListData(defaultParams);
  }, [searchString]);

  const handleInputChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log("autoSearchString", autoSearchString);

      setSearchValue(autoSearchString);
      getPaitentInfoByNo(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setSearchOptions(res.result);
        });
    }
  };

  const autoSelectedValue = (value) => {
    console.log("auto value", value);
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    if (value === null) {
      setSearchString(null);
      setToggle(false);
    } else {
      setToggle(true);
      console.log("value", value);
      setSearchValue(value.value);

      console.log("searchValue", searchValue);
    }
  };

  const filterData = () => {
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    setSearchString(searchValue);
    console.log("searchString", searchString);
  };

  const onSubmit = (data) => {
    console.log("data", data);
    let fromDateString = `${data.fromDate.getFullYear()}-${(
      data.fromDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${data.fromDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    let toDateString = `${data.toDate.getFullYear()}-${(
      data.toDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${data.toDate.getDate().toString().padStart(2, "0")}`;
    console.log("fromDateString", fromDateString, "toDateString", toDateString);
    let defaultParams = {
      categoryId: null,
      fromDate: fromDateString,
      fromOrderNo: null,
      opdIpd: null,
      page: 0,
      patientId: searchString,
      reportStatus: data.reportOptions,
      sampleStatus: null,
      searchString: "",
      size: 10,
      testTypeId: null,
      toDate: toDateString,
      toOrderNo: null,
      uhidCode: null,
      unitId: null,
    };
    fetchWorkOrdersStatusListData(defaultParams);
  };

  return (
    <div className="w-full px-6 mb-4">
      <form>
        <div className="container  w-[100%] grid px-2 lg:px-5  pt-20  mt-8 md:rounded-md">
          <div className="space-y-2">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-2 border bg-white rounded-md p-2">
              <span className="text-md font-bold lg:col-span-5 md:col-span-3">
                Patient Details
              </span>
              <div className="lg:col-span-3 md:col-span-3">
                <SearchBar
                  type="button"
                  name="uhidCode"
                  placeholder="UHID/Patient Name/Mobile"
                  searchIcon={true}
                  dataArray={searchOptions}
                  handleInputChange={handleInputChange}
                  onChange={autoSelectedValue}
                />
              </div>
              <div className="lg:col-span-1 md:col-span-1">
                <Controller
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // disablePast
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            type="date"
                            variant="outlined"
                            label="From Date"
                            name="fromDate"
                            //   InputLabelProps={{ shrink: true }}
                            fullWidth
                            size="small"
                          />
                        )}
                        inputFormat="dd/MM/yyyy"
                        //disablePast
                        {...field}
                        // onAccept={(e) => {
                        //   getNewRegDate(e);
                        // }}
                        error={Boolean(errors.fromDate)}
                        helperText={errors.fromDate?.message}
                      />
                    </LocalizationProvider>
                  )}
                  name="fromDate"
                />
              </div>
              <div className="lg:col-span-1">
                <Controller
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // disablePast
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            type="date"
                            variant="outlined"
                            label="To Date"
                            name="toDate"
                            //   InputLabelProps={{ shrink: true }}
                            fullWidth
                            size="small"
                          />
                        )}
                        inputFormat="dd/MM/yyyy"
                        //disablePast
                        {...field}
                        // onAccept={(e) => {
                        //   getNewRegDate(e);
                        // }}
                        error={Boolean(errors.toDate)}
                        helperText={errors.toDate?.message}
                      />
                    </LocalizationProvider>
                  )}
                  name="toDate"
                />
              </div>
              <div className="lg:col-span-3 md:col-span-3">
                {" "}
                <RadioField
                  name="reportOptions"
                  control={control}
                  dataArray={reportOptions}
                />
              </div>
              <div className="flex items-center space-x-2 lg:col-start-4">
                {toggle === false ? (
                  <ApplyButton onClick={handleSubmit(onSubmit)} />
                ) : (
                  <ApplyButton onClick={filterData} />
                )}
                <ResetButton onClick={() => reset()} />
              </div>
              {/* <button className="border border-green-500 text-green-500 rounded-md lg:col-start-5 w-1/2">
              Apply
            </button> */}
              <div className="rounded-md p-2 space-y-2 lg:col-span-5 md:col-span-3">
                <span className="text-md font-bold">List Of Orders</span>
                {spinner ? (
                  <div className="grid justify-center">
                    <LoadingSpinner />
                  </div>
                ) : null}
                <OrderStatusTable
                  rows={dataResult}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  count={count}
                  setCount={setCount}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 justify-end">
              <button className="border border-orange-500 text-orange-500 px-2 py-1 rounded-md">
                PRINT BARCODE
              </button>
              <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded-md">
                PRINT TESTS
              </button>
              <button className="border border-red-500 text-red-500 px-2 py-1 rounded-md">
                CLOSE
              </button>
              <button className="border border-green-500 text-green-500 px-2 py-1 rounded-md">
                SAVE
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderStatus;
