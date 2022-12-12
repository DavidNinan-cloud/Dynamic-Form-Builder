import React, { useState, useEffect } from "react";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PainAssessment from "./painassessment/PainAssessment";
import CommonSelectableTable from "../common/CommonSelectableTable";
import OrderSheetModal from "./OrderSheetModal";
import Vitals from "./vitals/Vital";
import SugarLevel from "./SugarLevel/SugarLevel";
import OxygenVentilation from "./oxygenventilation/OxygenVentilation";
import InputOutput from "./inputoutput/InputOutput";
import Pews from "./pews/Pews";
import NursingNote from "./nursingNote/NursingNote";
import SuccionSaturation from "./succionSaturation/SuccionSaturation";
import Charges from "./Charges/Charges";
import ApacheScore from "./apacheScore/ApacheScore";
import PrintButton from "../../../Common Components/Buttons/PrintButton";
import OrderSheetButton from "../../../Common Components/Buttons/OrderSheetButton";
import HumanBody from "./HumanBody/HumanBody";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import {
  getBlock,
  getFloor,
  getWard,
  getBedCategory,
} from "../../commonservices/bedModalServices";
import { useForm } from "react-hook-form";
import { fetchClinicalChartPatient } from "../services/clinicalchart/ClinicalCareChartservice";

import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import { createContext } from "react";
const current = new Date();
const time = current.toLocaleTimeString("en-US");

function TabPanel(props) {
  const {
    control,
    // handleSubmit,
    // reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const VisitContext = createContext();

function PatientPainAssessment({ drawerOpen }) {
  // const defaultValues={
  //   blocks:null,
  // }
  const checkboxVisible = false; //checkboxvisible fro shown common table or not
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [fromTime, setFromTime] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Course Creation Preview

  //1 . get units id using LocalStorage
  const userObj = JSON.parse(localStorage.getItem("loggedUser"));
  let units = userObj.units;
  let unitObj = units[0];
  let unitidVal = unitObj.id;

  // 2. add this id in the state variable n call block api
  const unitId = unitidVal;
  const [blocks, setBlocks] = useState();
  const [blockId, setBlockId] = useState(null);
  const [floors, setFloors] = useState();
  const [floorId, setFloorId] = useState(null);
  const [wards, setWards] = useState();
  const [wardId, setWardId] = useState(null);
  const [bedCategorys, setBedCategorys] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [uhid, setuhid] = useState(null);
  const [options, setOptions] = React.useState([]);
  const [data, setData] = useState({ message: "", result: [], statusCode: "" });
  const [dataResult, setDataResult] = React.useState([]);
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [patientInformation, setPatientInformation] = React.useState("");

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    mode: "onChange",
    // defaultValues,
  });

  // For Block id , floor id , ward id
  useEffect(() => {
    // 1. Block List API
    if (unitId !== null) {
      getBlock(unitId)
        .then((response) => {
          setBlocks(response.data.result);
        })
        .catch((error) => {
          console.log("Error Response of Block is :", error);
        });
    }
    // 2. Floor List API
    if (unitId !== null && blockId !== null) {
      getFloor(unitId, blockId)
        .then((response) => {
          setFloors(response.data.result);
        })
        .catch((error) => {
          console.log("Error Response of Floor is :", error);
        });
    }
    // 3. Ward List API
    if (unitId !== null && blockId !== null && floorId !== null) {
      getWard(unitId, blockId, floorId)
        .then((response) => {
          setWards(response.data.result);
        })
        .catch((error) => {
          console.log("Error Response of Ward is :", error);
        });
    }
    // 4. Bed Category List API
    if (
      unitId !== null &&
      blockId !== null &&
      floorId !== null &&
      wardId !== null
    ) {
      getBedCategory(unitId, blockId, floorId, wardId)
        .then((response) => {
          setBedCategorys(response.data.result);
        })
        .catch((error) => {
          console.log("Error Response of Bed Category is :", error);
        });
    }
  }, [unitId, blockId, floorId, wardId]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const callApiFunc = () => {
    showSpinner(true);
    showRecordWarning(false);

    let defaultParams = {
      blockId: blockId,
      categoryId: categoryId,
      floorId: floorId,
      uhid: uhid,
      wardId: wardId,
    };
    fetchClinicalChartPatient(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response));
        return response.data;
      })
      .then((res) => {
        setData(res);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    callApiFunc();
  };
  // for tabs
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("The value typed by the user is" + autoSearchString);
    // if (autoSearchString !== "") {
    //   console.log(autoSearchString);
    //   setSearchString(autoSearchString);
    //   if (searchId !== null) {
    //     setSearchId(null);
    //   }
    //   autoSearchEmeregncy(autoSearchString)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       // console.log( "The response of auto-complete / auto-search is " + JSON.stringify(res) );
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
    //   setSearchString("");
    //   setSearchId("");
    // } else {
    //   setSearchString(value.label);
    //   setSearchId(value.value);
    // }
  };

  useEffect(() => {
    if (
      blockId !== null ||
      (blockId !== null && floorId !== null) ||
      (blockId !== null && floorId !== null && wardId !== null) ||
      (blockId !== null &&
        floorId !== null &&
        wardId !== null &&
        categoryId !== null)
    ) {
      callApiFunc();
    }
  }, [blockId, floorId, wardId, categoryId]);

  return (
    <VisitContext.Provider value={patientInformation.patientVisitId}>
      <div className="mt-20 px-2 w-full">
        <div className="lg:flex lg:space-x-3 w-full">
          <form
            className="lg:w-[30%] xl:w-[27%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="md:grid-cols-3 lg:grid-cols-1 grid gap-2 w-full my-2 lg:my-0">
              <div className=" w-full grid-cols-4 grid lg:grid-cols-2 gap-2 col-span-3 lg:col-span-1">
                <div className="w-full">
                  <DropdownField
                    control={control}
                    name="block"
                    placeholder="Block"
                    dataArray={blocks}
                    inputRef={{
                      ...register("block", {
                        onChange: (e) => {
                          console.log("Get Block Id is", e.target.value.id);
                          setBlockId(e.target.value.id);
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-full">
                  <DropdownField
                    control={control}
                    name="floor"
                    placeholder="Floor"
                    dataArray={floors}
                    inputRef={{
                      ...register("floor", {
                        onChange: (e) => {
                          setFloorId(e.target.value.id);
                          console.log("Floor id is", e.target.value.id);
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-full hidden lg:block">
                  <DropdownField
                    control={control}
                    name="wardId"
                    placeholder="Ward"
                    dataArray={wards}
                    inputRef={{
                      ...register("wardId", {
                        onChange: (e) => {
                          setWardId(e.target.value.id);
                          console.log("Ward id is", e.target.value.id);
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-full lg:hidden">
                  <DropdownField
                    control={control}
                    name="wardId"
                    placeholder="Ward"
                    dataArray={wards}
                    inputRef={{
                      ...register("wardId", {
                        onChange: (e) => {
                          console.log(e.target.value.id);
                          setWardId(e.target.value.id);
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-full">
                  <DropdownField
                    control={control}
                    isMulti={false}
                    isDisabled={false}
                    name="categoryId"
                    placeholder="Bed C"
                    dataArray={bedCategorys}
                    inputRef={{
                      ...register("categoryId", {
                        onChange: (e) => {
                          setCategoryId(e.target.value.id);
                          console.log("Bed Category id is", e.target.value.id);
                        },
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 lg:col-span-1">
                {/* searchable */}
                <div className="w-full">
                  <SearchBar
                    type="button"
                    name="uhid"
                    placeholder="Search By UHID"
                    dataArray={options}
                    isSearchable={true}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                    // selectedObj={selectedObj}
                  />
                </div>
                <div className=" ">
                  <SearchIconButton onClick={filterData} />
                </div>
              </div>
            </div>

            {spinner ? (
              <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : null}

            <div className="mt-2">
              {data.result.length > 0 && spinner === false ? (
                <>
                  <CommonSelectableTable
                    data={data}
                    dataResult={dataResult}
                    checkboxVisible={checkboxVisible}
                    setPatientInformation={setPatientInformation}
                  />
                </>
              ) : null}
              <div className="flex space-x-2 mt-2 w-full">
                <div className="w-full ">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date"
                      name="date"
                      value={new Date()}
                      onChange={(newValue) => {
                        setFromDate(newValue);
                      }}
                      // readOnly={true}
                      renderInput={(params) => (
                        <TextField
                          className="bg-white"
                          fullWidth
                          size="small"
                          {...params}
                          sx={{
                            svg: { color: "#0B83A5" },
                          }}
                          isDisabled
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                      label=" Time"
                      name="time"
                      value={new Date().toJSON()}
                      onChange={(newValue) => {
                        setToTime(newValue);
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
                          isDisabled
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
            {recordWarning === true && spinner === false ? (
              <div className="flex justify-center">
                <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                  No Records Found...
                </h3>
              </div>
            ) : null}
          </form>

          <div className="bg-gray-100 lg:border-l-2 w-full lg:grid  lg:grid-cols-3 xl:gap-2 md:mt-2 lg:mt-0">
            <div className="bg- p-2 shadow-md rounded-md lg:ml-2 border w-full  lg:col-span-3 xl:col-span-2">
              <div className="grid  text-gray-500  lg:mx-5  text-sm items-center gap-1 w-full py-3">
                {/* {"uhid":"VR/2022/000771","bedCategory":"OPD","gender":"Male","department":"Critical Care","age":"27 years 6 days","patientId":875,"patientName":"Vijay Rahne","patientVisitId":871,"doctor":"Atharva Palkar","bedNo":117} */}
                <div className="grid grid-cols-2 text-black gap-2 w-10/12 lg:w-8/12">
                  <h1 className=" font-semibold">UHID </h1>
                  <div className="flex space-x-2 items-center">
                    <span className="">:</span>
                    <span className=" font-normal">
                      {patientInformation.uhid}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 text-black  gap-2 w-10/12 lg:w-8/12">
                  <h1 className="font-semibold">Patient Name </h1>
                  <div className="flex space-x-2 items-center">
                    <span className="">:</span>
                    <span className="font-normal">
                      {patientInformation.patientName}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 text-black  w-10/12 lg:w-8/12 ">
                  <h1 className="font-semibold">Dr. Name </h1>
                  <div className="flex space-x-2 items-center ml-1 ">
                    <span>:</span>
                    <span className="font-normal">
                      {patientInformation.doctor}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 text-black  w-10/12 lg:w-8/12 ">
                  <h1 className="font-semibold">Department</h1>
                  <div className="flex space-x-2 items-center ml-1 ">
                    <span>:</span>
                    <span className="font-normal">
                      {patientInformation.department}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 text-black  w-10/12 lg:w-8/12 ">
                  <h1 className="font-semibold">Age</h1>
                  <div className="flex space-x-2 items-center ml-1 ">
                    <span>:</span>
                    <span className="font-normal">
                      {patientInformation.age}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block p-3 w-full lg:col-span-3 xl:col-span-1 ">
              <div className="lg:grid lg:grid-cols-3 xl:grid-cols-2 gap-2 items-center w-full ml-2">
                <div className="w-full">
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
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                      label="From Time"
                      name="fromTime"
                      value={fromTime}
                      onChange={(newValue) => {
                        setFromTime(newValue);
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
                </div>

                <div className="w-full">
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
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                      label=" To Time"
                      name="toTime"
                      value={toTime}
                      onChange={(newValue) => {
                        setToTime(newValue);
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
                </div>
                <div className="w-full">
                  <PrintButton />
                </div>
                <div className="w-full">
                  <OrderSheetButton
                    className="w-full"
                    onClick={() => {
                      handleOpen();
                    }}
                  />
                </div>
              </div>
            </div>
            <Box className="  text-left w-full md:text-xl col-span-3 px-2 mt-2 lg:mt-1">
              <div className="  rounded-md " style={{ background: "#F1F1F1" }}>
                <Tabs
                  className="text-left  font-semibold "
                  onChange={handleChangeTabs}
                  value={value}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#0B83A5",
                      color: "#0B83A5",
                    },
                  }}
                  // textColor="#0B83A5"
                  textColor="#0B83A5"
                  indicatorColor="#0B83A5"
                  variant="scrollable"
                  scrollButtons
                >
                  <Tab
                    label="Pain Assessment"
                    className="PainAssessment"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Vitals"
                    className="Vitals"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Sugar Level"
                    className="SugarLevel"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="Oxygen / Ventilation"
                    className="Oxygen/Ventilation"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label="Succion / Saturation"
                    className="Succion/Saturation"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(4)}
                  />
                  <Tab
                    label="Input / Output"
                    className="Input/Output"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(5)}
                  />
                  <Tab
                    label="Human Body"
                    className="humanBody"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(6)}
                  />
                  <Tab
                    label="Nursing Note"
                    className="nursingNote"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(7)}
                  />
                  <Tab
                    label="Charges"
                    className="charges"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(8)}
                  />
                  <Tab
                    label="Apache Score"
                    className="human"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(9)}
                  />
                  <Tab
                    label="Pews"
                    className="Pews"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(10)}
                  />
                </Tabs>
              </div>
              <div className="">
                <div className=" ">
                  <div className="">
                    <TabPanel value={value} index={0}>
                      <PainAssessment patientInformation={patientInformation} />
                    </TabPanel>
                  </div>
                  <TabPanel value={value} index={1}>
                    <Vitals />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <SugarLevel />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <OxygenVentilation />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <SuccionSaturation />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <InputOutput />
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    <HumanBody drawerOpen={drawerOpen} />
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                    <NursingNote />
                  </TabPanel>
                  <TabPanel value={value} index={8}>
                    <Charges />
                  </TabPanel>
                  <TabPanel value={value} index={9}>
                    <ApacheScore />
                  </TabPanel>
                  <TabPanel value={value} index={10}>
                    <Pews />
                  </TabPanel>
                  <OrderSheetModal
                    open={open}
                    setOpen={setOpen}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                  />
                  {/* <PewsModal
                  open={open}
                  setOpen={setOpen}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                /> */}
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </VisitContext.Provider>
  );
}

export default PatientPainAssessment;
