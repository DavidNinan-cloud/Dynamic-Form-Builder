import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import CommonSelectableTable from "../../nursing/common/CommonSelectableTable";
import SurgeryDetails from "./SurgeryDetails";
import CheckList from "./CheckList";
import { useForm, FormProvider } from "react-hook-form";
import OTSchedualing from "./components/Schedualing/OTSchedualing";

const data = {
  message: "country list found ",
  result: [
    {
      Id: 30,
      UHID: "201/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 29,
      UHID: "202/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 28,
      UHID: "203/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 16,
      UHID: "204/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 1,
      UHID: "205/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 3,
      UHID: "206/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 4,
      UHID: "207/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 12,
      UHID: "208/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 22,
      UHID: "209/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
    {
      Id: 44,
      UHID: "210/ ABC",
      patientName: "Lorem ipsum dolor sit Lorem",
    },
  ],
  statusCode: 200,
  count: 5,
};

const patientInfo = {
  patientName: "Venkata Narasimha Rajuvaripet",
  uhid: "123-000-3210",
  ipdNo: "IP/135433",
  gender: "Male",
  age: 45,
  admDate: "01/02/2022",
  ward: "General Ward",
  bedCategory: "Semi Pvt. A/C",
  bedNo: 202,
  doctor: "Dr.Stephen Strange",
  opDate: "01/02/2022",
  opTime: "12.00 PM To 02.00 PM",
  opEstTime: "02.00 Hour",
  otTable: "Table No. 5",
};

function TabPanel(props) {
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

function OTBooking() {
  const checkboxVisible = false; //checkboxvisible fro shown common table or not
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [searchOption, setSearchOption] = React.useState();
  const [searchValue, setSearchValue] = React.useState(false);
  const [searchString, setSearchString] = React.useState(null);
  const [dataResult, setDataResult] = useState([]);
  const [value, setValue] = React.useState(0);

  // React.useEffect(() => {
  //   let result = [
  //     { value: "Babu", label: "Babu" },
  //     { value: "Babu", label: "Babu" },
  //     { value: "Babu", label: "Babu" },
  //   ];
  //   setSearchOptions(result);
  // }, []);
  // Course Creation Preview
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-14 px-2 w-full relative">
      <div className="text-xl text-center w-full my-2">OT Booking</div>
      <div className="lg:flex lg:space-x-3 w-full">
        <form className="lg:w-[42%] xl:w-[26%]">
          <div className="grid-cols-3 lg:grid-cols-1 grid gap-2 w-full my-2 lg:my-0">
            <div className="flex space-x-2 w-full col-span-2 lg:col-span-1 items-center">
              <div className="w-full ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="From Date"
                    name="date"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
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
            <div className="flex items-center gap-2 w-full">
              {/* searchable */}
              <div className="w-full">
                <SearchBar
                  type="button"
                  name="SearchableSelect"
                  placeholder="Search By UHID"
                  // dataArray={options}
                  isSearchable={true}
                  // handleInputChange={handleChange}
                  // selectedValue={autoSelectedValue}
                  // selectedObj={selectedObj}
                />
              </div>
              <div className="flex gap-2 ">
                <button
                  className="h-9 px-3 border border-blue-500 rounded-md text-blue-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  // onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <CommonSelectableTable
              data={data}
              checkboxVisible={checkboxVisible}
              dataResult={dataResult}
              setDataResult={setDataResult}
            />
          </div>
        </form>
        <div className="lg:border-l-2 w-full  xl:gap-2 md:mt-2 lg:mt-0 px-2">
          <div className="border bg-gray-100 border-gray-300 text-left w-full rounded-md mb-2 px-2 mt-1">
            <div className="py-2 grid grid-cols-2 2xl:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1">
                <span className="font-semibold w-28">Patient Name</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.patientName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">UHID</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.uhid}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28 2xl:w-24">IPD No.</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.ipdNo}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Gender</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.gender}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Age</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.age}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28 2xl:w-24">ADM. Date</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.admDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Ward</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.ward}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Bed Category</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.bedCategory}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28 2xl:w-24">Bed No.</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.bedNo}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Doctor</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.doctor}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Op. Date</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.opDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28 2xl:w-24">Op. Time</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.opTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Op. Est. Time</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.opEstTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-semibold w-28">Ot Table</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {patientInfo.otTable}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Box className="  text-left w-full md:text-xl col-span-3 mt-2 lg:mt-1">
            <div className="rounded-md" style={{ background: "#F1F1F1" }}>
              <Tabs
                className="text-left  font-semibold pb-1 "
                onChange={handleChange}
                value={value}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#0B83A5",
                    color: "#0B83A5",
                    height: "3px",
                  },
                }}
                // textColor="#0B83A5"
                textColor="#0B83A5"
                indicatorColor="#0B83A5"
                variant="scrollable"
                scrollButtons
              >
                <Tab
                  tabIndex={0}
                  label="Schedule  OT"
                  className="Schedule OT"
                  style={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(0)}
                />
                <Tab
                  tabIndex={1}
                  label="Surgery Details"
                  className="Surgery Details"
                  style={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(1)}
                  defaultChecked={true}
                />
                <Tab
                  tabIndex={2}
                  label="Check List"
                  className="Check List"
                  style={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(2)}
                />
              </Tabs>
            </div>
            <div className="">
              <TabPanel value={value} index={0}>
                <OTSchedualing />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SurgeryDetails />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <CheckList />
              </TabPanel>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default OTBooking;
