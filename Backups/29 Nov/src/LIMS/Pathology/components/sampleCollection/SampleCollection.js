import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  getUnitList,
  fetchWorkOrdersList,
  getPaitentInfoByNo,
  fetchWorkOrderWiseTestsList,
  getAgencyDropdown,
  getTechnicianDropdown,
  saveSampleCollection,
} from "../../services/SampleCollectionServices.js";
import CommonMasterTable from "./SelectionCommonMasterTable";
// import SearchableDropdown from "../../formfields"
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputField from "../../../../Common Components/FormFields/InputField";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as yup from "yup";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../../Common Components/Buttons/ApplyButton";
import SearchIconButton from "../../../../Common Components/Buttons/SearchIconButton";
import CommonSelectionTable2 from "../../../Common/CommonSelectedTable2";
import ListOfOrdersTable from "../../../Common/ListOfOrdersTable";
import FiltersModal from "../workOrderView/FiltersModal";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tooltip from "@mui/material/Tooltip";
import PathologyTestDetailsTable from "./PathologyTestDetailsTable";
import CollectedTimeModal from "./CollectedTimeModal.js";
import { useMutation } from "@tanstack/react-query";
import {
  warningAlert,
  successAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

let rowsTest = [];
let current = new Date();
let myObj;
let finalArr = [];

// const rows = [createData("Cupcake", 305, 3.7, 67, 4.3)];

const SampleCollection = () => {
  const [finalData, setFinalData] = React.useState({});
  const [countClick, setCountClick] = React.useState(0);
  const [openPost, setOpenPost] = React.useState(false);

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
  const [unitOptions, setUnitOptions] = React.useState([]);

  const [agencyOptions, setAgencyOptions] = React.useState([]);

  const [technicianOptions, setTechnicianOptions] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);

  const [searchOptions, setSearchOptions] = React.useState([]);

  // let searchValue = "";

  const [searchValue, setSearchValue] = useState(false);

  const [spinner, showSpinner] = useState(false);
  const [orderID, setOrderID] = useState();
  const [recordWarning, showRecordWarning] = useState(false);

  const [spinnerTest, showSpinnerTest] = useState(false);
  const [recordWarningTest, showRecordWarningTest] = useState(false);

  const [searchString, setSearchString] = useState(null);

  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState();

  const [selectedTest, setSelectedTest] = React.useState([]);
  const [selectedObjTest, setSelectedObjTest] = React.useState();

  const [count, setCount] = useState();
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = useState([]);

  const [countTest, setCountTest] = useState();
  const [dataTest, setDataTest] = useState({ result: [], actions: [] });
  const [dataResultTest, setDataResultTest] = useState([]);

  const [order, setOrder] = React.useState("");
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);
  const [showCollectedTimeModal, setShowCollectedTimeModal] =
    React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");

  const [searchVal, setSearchVal] = useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  React.useState(5);

  const defaultValues = {
    fromDate: null,
    toDate: null,
    hospitalUnit: "",
    fromOrderNo: "",
    toOrderNo: "",
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });
  const [toggleOptions, setToggleOptions] = useState("OPD");

  const handleChange = (event, newToggleOptions) => {
    setToggleOptions(newToggleOptions);
  };

  const [open, setOpen] = useState(false);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);

  //The state variable to store the data coming from the api

  const fetchWorkOrderWiseTestsListData = (orderId) => {
    showSpinnerTest(true);
    showRecordWarningTest(false);
    fetchWorkOrderWiseTestsList(orderId)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setDataTest(res);
        setCountTest(res.count);
        setDataResultTest(res.result);
        showSpinnerTest(false);
      })
      .catch(() => {
        showSpinnerTest(false);
        showRecordWarningTest(true);
      });
  };
  const addRecord = () => {
    console.log("A new record has been added");
    if (countClick === 0) {
      setCountClick(countClick + 1);
      saveSampleCollectonData(finalData);
    }
  };

  const onSubmitTableData = (data) => {
    let arrId = [];
    let myObjId = {};
    let filteredArr = [];
    let filteredArr2 = [];

    console.log("Data", data);
    console.log("dataResultTest", dataResultTest);

    dataResultTest.map((item) => {
      myObjId = {
        id: item.testId,
      };
      arrId.push(myObjId);
    });

    console.log("arrId", arrId);

    filteredArr = data.orderDetails.filter(
      (item) => item.IsCollected !== false
    );
    filteredArr2 = dataResultTest.filter((item) => item.IsCollected !== false);

    console.log("filteredArr", filteredArr);
    console.log("filteredArr2", filteredArr2);
    console.log("orderID", orderID);

    console.log("technicianOptions", technicianOptions);

    let techId;
    filteredArr2.map((item) => {
      techId = technicianOptions
        .map((tech) => tech.label === item.TechnicianName && tech.id)
        .filter((tech) => tech !== false)
        .toString();
    });

    if (filteredArr2.length > 0) {
      filteredArr2.map((item, index) => {
        myObj = {
          agencyName: {
            id: Number(
              agencyOptions
                .map((agency) => agency.label === item.AgencyName && agency.id)
                .filter((agency) => agency !== false)
                .toString()
            ),
          },
          // barCode: Number(item.Barcode),
          collectedTime: new Date(item.CollectedTime),
          //collectedTime: item.collectedTime,
          isCollected: item.IsCollected,
          isOutSourced: item.IsOutSourced,
          technician: {
            id: Number(
              technicianOptions
                .map((tech) => tech.label === item.TechnicianName && tech.id)
                .filter((tech) => tech !== false)
                .toString()
            ),
          },
          // test: {
          //   id: arrId[index],
          // },
          test: arrId[index],
        };
        finalArr.push(myObj);
      });

      filteredArr.map((item, index) => {
        myObj = {
          agencyName: item.AgencyName
            ? {
                id: item.AgencyName.id,
              }
            : null,
          // barCode: Number(item.Barcode),
          //collectedTime: current,
          collectedTime: new Date(item.CollectedTime),
          isCollected: item.IsCollected,
          isOutSourced: item.IsOutSourced,
          technician: item.TechnicianName
            ? {
                id: item.TechnicianName.id,
              }
            : null,
          test: arrId[index + 1],
          // test: {
          //   id: arrId[index + 1],
          // },
        };
        finalArr.push(myObj);
      });
    } else if (filteredArr2.length === 0) {
      data.orderDetails.map((item, index) => {
        myObj = {
          agencyName: item.AgencyName
            ? {
                id: item.AgencyName.id,
              }
            : null,
          //    barCode: item.Barcode ? Number(item.Barcode) : null,
          collectedTime: item.CollectedTime
            ? new Date(item.CollectedTime)
            : null,
          // collectedTime: current,
          isCollected: item.IsCollected,
          isOutSourced: item.IsOutSourced,
          technician: item.TechnicianName
            ? {
                id: item.TechnicianName.id,
              }
            : null,
          // test: {
          //   id: arrId[index],
          // },
          test: arrId[index],
        };

        finalArr.push(myObj);
      });
    }
    // else {
    //   filteredArr.map((item, index) => {
    //     myObj = {
    //       agencyName: {
    //         id: item.AgencyName.id,
    //       },
    //       barCode: item.Barcode,
    //       collectedTime: item.collectedTime,
    //       isCollected: item.IsCollected,
    //       isOutSourced: true,
    //       technician: {
    //         id: item.TechnicianName.id,
    //       },
    //       test: {
    //         id: arrId[index],
    //       },
    //     };
    //     finalArr.push(myObj);
    //   });
    // }

    console.log("finalArr", finalArr);

    let myobj = {
      order: {
        id: orderID,
      },
      samplesList: [...finalArr],
    };
    console.log("myobj", myobj);
    setOpenPost(true);
    setFinalData(myobj);
  };

  const { mutate: saveSampleCollectonData } = useMutation(
    saveSampleCollection,
    {
      onSuccess: (response) => {
        console.log("RESP", response.data.statusCode);
        if (response.data.statusCode === 302) {
          warningAlert(response.data.message);
          myObj = {};
          finalArr = [];
        } else if (response.status === 200) {
          setCountClick(0);
          handleClosePost();
          myObj = {};
          finalArr = [];
          successAlert(response.data.message);
          let defaultParams = {
            category: null,
            fromDate: null,
            fromOrderNo: null,
            page: page,
            // patientType: null,
            opdIpd: null,
            sampleStatus: null,
            searchString: "",
            patientId: searchString,
            size: rowsPerPage,
            testTypeId: null,
            toDate: null,
            toOrderNo: null,
            unitId: null,
          };
          fetchWorkOrdersListData(defaultParams);
          fetchWorkOrderWiseTestsListData(selectedObj.OrderId);
        }
      },
    },
    {
      onError: (err) => {
        setCountClick(0);
        handleClosePost();
        myObj = {};
        finalArr = [];
        errorAlert(err.data.message);
      },
    }
  );

  const fetchWorkOrdersListData = (defaultParams) => {
    showSpinner(true);
    showRecordWarning(false);
    fetchWorkOrdersList(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        setCount(res.count);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  useEffect(() => {
    let defaultParams = {
      category: null,
      fromDate: null,
      fromOrderNo: null,
      page: page,
      // patientType: null,
      opdIpd: null,
      sampleStatus: null,
      searchString: "",
      patientId: searchString,
      size: rowsPerPage,
      testTypeId: null,
      toDate: null,
      toOrderNo: null,
      unitId: null,
    };
    fetchWorkOrdersListData(defaultParams);
  }, [page, rowsPerPage, searchString]);

  useEffect(() => {
    console.log("selected", selected);
    if (selectedObj) {
      fetchWorkOrderWiseTestsListData(selectedObj.OrderId);
      setOrderID(selectedObj.OrderId);
    }
    console.log("selected obj", selectedObj);
  }, [selectedObj, selected]);

  useEffect(() => {
    console.log("selectedTest", selectedTest);
    if (selectedObjTest) {
    }
    console.log("selected obj test", selectedObjTest);
  }, [selectedObjTest]);

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

  // useEffect(() => {
  //   console.log("searchString", searchString);
  // }, [searchString]);

  const handleInputChangeHandler = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log("autoSearchString", autoSearchString);
      // searchValue = autoSearchString;
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

  // useEffect(() => {
  //   console.log("searchOptions", searchOptions);
  // }, [searchOptions]);

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
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
      // searchValue = value.value;
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
      category: null,
      fromDate: fromDateString,
      fromOrderNo: Number(data.fromOrderNo),
      opdIpd: null,
      page: page,
      patientId: null,
      // patientType: null,
      sampleStatus: null,
      searchString: "",
      size: rowsPerPage,
      testTypeId: null,
      toDate: toDateString,
      toOrderNo: Number(data.toOrderNo),
      unitId: null,
      // data.hospitalUnit.id,
    };
    fetchWorkOrdersListData(defaultParams);
  };

  useEffect(() => {
    getUnitDropDown();
    getAgencyDropDownList();
    getTechnicianDropDownList();
  }, []);

  const getUnitDropDown = () => {
    getUnitList()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAgencyDropDownList = () => {
    getAgencyDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setAgencyOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTechnicianDropDownList = () => {
    getTechnicianDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setTechnicianOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-2 my-2">
            <form className="col-span-2">
              <div className="grid grid-cols-8 gap-2 col-span-2 border bg-white rounded-md p-2">
                <span className="text-xl text-gray-700 col-span-8">
                  Sample Collection
                </span>
                <div className="flex items-center col-span-2">
                  <div className="z-10 w-full">
                    <SearchBar
                      type="button"
                      name="uhidCode"
                      placeholder="UHID/Patient Name/Mobile"
                      searchIcon={true}
                      dataArray={searchOptions}
                      handleInputChange={handleInputChangeHandler}
                      onChange={autoSelectedValue}
                    />
                  </div>
                </div>

                <div className="col-span-2">
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
                              label="Collected From Date"
                              name="fromDate"
                              //InputLabelProps={{ shrink: true }}
                              fullWidth
                              size="small"
                            />
                          )}
                          inputFormat="dd/MM/yyyy"
                          // disableFuture
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
                <div className="col-span-2">
                  <Controller
                    control={control}
                    defaultValue={null}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          fullWidth
                          // disablePast
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              type="date"
                              variant="outlined"
                              label="Collected To Date"
                              name="toDate"
                              //InputLabelProps={{ shrink: true }}
                              fullWidth
                              size="small"
                            />
                          )}
                          inputFormat="dd/MM/yyyy"
                          //disableFuture
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
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <DropdownField
                      control={control}
                      error={errors.hospitalUnit}
                      name="hospitalUnit"
                      label="Hospital Unit"
                      dataArray={unitOptions}
                      isSearchable={false}
                      placeholder="Hospital Unit"
                      isClearable={false}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <InputField
                    name="fromOrderNo"
                    variant="outlined"
                    label="From Order No."
                    error={errors.fromOrderNo}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <InputField
                    name="toOrderNo"
                    variant="outlined"
                    label="To Order No."
                    error={errors.toOrderNo}
                    control={control}
                  />
                </div>

                <div className="flex items-center space-x-2 col-start-5">
                  <TuneIcon
                    className="cursor-pointer text-customBlue mx-1"
                    onClick={() => {
                      setBackdropOpen(true);
                      setShowFiltersModal(true);
                      console.log("open");
                    }}
                  />

                  {toggle === false ? (
                    <SearchIconButton onClick={handleSubmit(onSubmit)} />
                  ) : (
                    <SearchIconButton onClick={filterData} />
                  )}
                  <ResetButton onClick={() => reset(defaultValues)} />
                </div>
              </div>
            </form>
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <div className="col-span-2 rounded-md p-0.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2"></div>
                  {/* <button className="border border-gray-500 text-gray-500 px-2 py-1 rounded-md">
                  PRINT LIST OF ORDERS
                </button> */}
                  <div className="flex items-center space-x-1 cursor-pointer"></div>
                </div>
                {spinner ? (
                  <div className="grid justify-center">
                    <LoadingSpinner />
                  </div>
                ) : null}

                <CommonMasterTable
                  //data to be displayed
                  dataResult={dataResult}
                  tableApiFunc={fetchWorkOrdersList}
                  setDataResult={setDataResult}
                  searchString={searchString}
                  data={data}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  count={count}
                  //editRow={editRow}
                  setOpen={setOpen}
                  // deleteRow={deleteRow}
                  displayView={displayView}
                  // DownloadTableData={DownloadTableData}
                  selected={selected}
                  setSelected={setSelected}
                  selectedObj={selectedObj}
                  setSelectedObj={setSelectedObj}
                />
              </div>
            ) : null}
            {dataResultTest && dataResultTest.length > 0 && (
              <div className="col-span-2 p-2 border bg-white rounded-md h-72">
                {/* {spinnerTest ? (
                  <div className="grid justify-center">
                    <LoadingSpinner />
                  </div>
                ) : null} */}
                <span className="text-md font-bold">Tests</span>
                <div className="my-2">
                  <PathologyTestDetailsTable
                    rows={dataResultTest}
                    onSubmitTableData={onSubmitTableData}
                    agencyOptions={agencyOptions}
                    selectedTest={selectedTest}
                    setSelectedTest={setSelectedTest}
                    selectedObjTest={selectedObjTest}
                    setSelectedObjTest={setSelectedObjTest}
                    showCollectedTimeModal={showCollectedTimeModal}
                    setShowCollectedTimeModal={setShowCollectedTimeModal}
                    setBackdropOpen={setBackdropOpen}
                    technicianOptions={technicianOptions}
                  />
                </div>
                {/* <div className="my-2">
                  {dataTest.hasOwnProperty("result") &&
                  dataTest.result.length > 0 &&
                  dataTest.statusCode === 200 &&
                  spinnerTest === false ? (
                    <PathologyTestDetailsTable
                      //data to be displayed
                      dataResult={dataResultTest}
                      tableApiFunc={fetchWorkOrderWiseTestsListData}
                      setDataResult={setDataResultTest}
                      // searchString={searchString}
                      data={dataTest}
                      page={page}
                      setPage={setPage}
                      rowsPerPage={rowsPerPage}
                      setRowsPerPage={setRowsPerPage}
                      count={count}
                      //editRow={editRow}
                      setOpen={setOpen}
                      // deleteRow={deleteRow}
                      displayView={displayView}
                      // DownloadTableData={DownloadTableData}
                      // selected={selected}
                      // setSelected={setSelected}
                      // selectedObj={selectedObj}
                      // setSelectedObj={setSelectedObj}
                    />
                  ) : null}
                </div> */}

                {/* <div className="grid grid-cols-6 gap-2 col-span-2">
                  <div className="flex items-center justify-evenly space-x-4 col-span-2">
                    <button className="border border-red-500 text-red-500 p-1 rounded-md">
                      CANCEL TEST
                    </button>
                    <button className="border border-green-500 text-green-500 p-1 rounded-md">
                      PRINT
                    </button>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        //onClick={() => setBackdropOpen(false)}
      >
        {showFiltersModal && (
          <FiltersModal
            showFiltersModal={showFiltersModal}
            setShowFiltersModal={setShowFiltersModal}
            setBackdropOpen={setBackdropOpen}
            fetchWorkOrdersListData={fetchWorkOrdersListData}
            rowsPerPage={rowsPerPage}
          />
        )}
        {showCollectedTimeModal && (
          <CollectedTimeModal
            showCollectedTimeModal={showCollectedTimeModal}
            setShowCollectedTimeModal={setShowCollectedTimeModal}
            setBackdropOpen={setBackdropOpen}
          />
        )}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </Backdrop>
    </div>
  );
};

export default SampleCollection;
