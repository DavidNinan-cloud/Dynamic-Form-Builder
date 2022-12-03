import React from "react";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
// import CommonSelectableTable from "../common/CommonSelectableTable";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import OrderDrugButton from "../../../Common Components/Buttons/OrderDrugButton";
import AddIVButton from "../../../Common Components/Buttons/AddIVButton";
import LogFileButton from "../../../Common Components/Buttons/LogFileButton";
import IVFlowButton from "../../../Common Components/Buttons/IVFlowButton";
import DrugAdministrationOrderListTable from "./DrugAdministrationOrderListTable";
import SpecialInstructionTable from "./SpecialInstructionTable";

import AdministrationDrugListTable from "./AdministrationDrugListTable";
import DrugAdministratorOrderModal from "./DrugAdministratorOrderModal";

const orderListData = {
  message: "Apache Score list found ",
  result: [
    {
      Id: 30,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "STAT",
      Duration: 41,
    },
    {
      Id: 29,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "0-1-0",
      Duration: 41,
    },
    {
      Id: 28,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-0",
      Duration: 41,
    },
    {
      Id: 16,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-1",
      Duration: 41,
    },
    {
      Id: 1,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "0-1-0",
      Duration: 41,
    },
    {
      Id: 3,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-1-0",
      Duration: 41,
    },
    {
      Id: 4,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-1",
      Duration: 41,
    },
    {
      Id: 12,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-0",
      Duration: 41,
    },
    {
      Id: 22,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-1-1",
      Duration: 41,
    },
    {
      Id: 44,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "STAT",
      Duration: 41,
    },
    {
      Id: 42,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "1-0-1",
      Duration: 41,
    },
    {
      Id: 56,
      DateTime: "01/02/2022,11:30Am",
      Dose: "High concentration",
      Route: "01/02/2022, 11:30AM",
      Frequency: "0-0-1",
      Duration: 41,
    },
  ],
  statusCode: 200,
  count: 5,
};
const SpecialInstructionData = {
  message: "Special Instruction list found",
  result: [
    {
      Id: 3,
      DateTime: "01/02/2022,11:30Am",
      Instruction: "High concentration",
      "Added CMO": "Lorem ipsum dolor sit",
    },
    {
      Id: 2,
      DateTime: "01/02/2022,11:30Am",
      Instruction: "High concentration",
      "Added CMO": "Lorem ipsum dolor sit",
    },
    {
      Id: 1,
      DateTime: "01/02/2022,11:30Am",
      Instruction: "High concentration",
      "Added CMO": "Lorem ipsum dolor sit",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};


const DrugListData = {
  message: "Drug Schedule list found",
  result: [
    {
      Id: 3,
      PerHourDrug: false,
      OutsideMedicines: true,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "5 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 2,
      PerHourDrug: true,
      OutsideMedicines: false,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "28 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 1,
      PerHourDrug: false,
      OutsideMedicines: false,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: true,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "3 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 6,
      PerHourDrug: false,
      OutsideMedicines: false,
      AlternativeDayDrug: true,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "10 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 12,
      PerHourDrug: false,
      OutsideMedicines: false,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "15 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 31,
      PerHourDrug: true,
      OutsideMedicines: false,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: true,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "20 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 98,
      PerHourDrug: false,
      OutsideMedicines: true,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "26 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 101,
      PerHourDrug: false,
      OutsideMedicines: false,
      AlternativeDayDrug: true,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "60 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
    {
      Id: 92,
      PerHourDrug: false,
      OutsideMedicines: false,
      AlternativeDayDrug: false,
      OnceInaWeekDrug: false,
      StopDrug: false,
      "Item Name": "High concentration",
      Dose: "Lorem ipsum dolor sit",
      Route: "Orel",
      Frequency: "Lorem ipsum dolor sit",
      "Start Date": "01/02/2022",
      Duration: "30 Days",
      "End Date": "01/02/2022",
      "Stop Date Time": "-",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "ReSchedule", "Stop"],
  count: 3,
};
function DrugAdmisitrationChart() {
  const [drugData, setDrugData] = React.useState(DrugListData);
  //drug order list Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    console.log("drugData is ");
    console.log(drugData);
  }, [drugData]);

  //event listener function for dnd icon
  const printRow = (row) => {
    console.log("The row is");
    console.log(row);
    console.log("Id is " + row.Id);
    drugData.result.find(editRow);

    let requiredObj;

    function editRow(singleRow, index) {
      if (singleRow.Id === row.Id) {
        console.log("index is " + index);
        requiredObj = singleRow;
        requiredObj.StopDrug = true;

        //iteration on the object requiredObj
        for (let propertyName in requiredObj) {
          console.log("Properties in requiredObj are");
          console.log(propertyName);

          if (
            propertyName === "PerHourDrug" &&
            requiredObj[propertyName] === true
          ) {
            requiredObj[propertyName] = false;
          } else if (
            propertyName === "OutsideMedicines" &&
            requiredObj[propertyName] === true
          ) {
            requiredObj[propertyName] = false;
          } else if (
            propertyName === "AlternativeDayDrug" &&
            requiredObj[propertyName] === true
          ) {
            requiredObj[propertyName] = false;
          } else if (
            propertyName === "OnceInaWeekDrug" &&
            requiredObj[propertyName] === true
          ) {
            requiredObj[propertyName] = false;
          }
        }

        console.log("requiredObj after editing is ");
        console.log(requiredObj);

        let resultArray = drugData.result;

        resultArray[index] = requiredObj;
        // setStopAction(false);
        setDrugData((previousState) => {
          return { ...previousState, result: resultArray };
        });
      }
    }
  };

  const checkboxVisible = false; //checkboxvisible fro shown common table or not
  const [fromDate, setFromDate] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [value, setValue] = React.useState(0);

  // Course Creation Preview


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <div className="mt-20 px-2 w-full">
      <div className="lg:flex lg:space-x-3 w-full">
        <form className="lg:w-[30%] xl:w-[22%]">
          <div className="md:grid-cols-3 lg:grid-cols-1 grid gap-2 w-full my-2 lg:my-0">
            <div className=" w-full lg:grid lg:grid-cols-2 gap-2">
              <div className="w-full">
                <ReactSelect placeholder="Floor*" />
              </div>
              <div className="w-full hidden lg:block">
                <ReactSelect placeholder="Ward*" />
              </div>
            </div>
            <div className="w-full lg:hidden">
              <ReactSelect placeholder="Ward*" />
            </div>

            <div className="w-full">
              <ReactSelect placeholder="Bed *" />
            </div>
            <div className="flex items-center gap-2 w-full col-span-2 lg:col-span-1">
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
            {/* <CommonSelectableTable
              data={orderListData}
              checkboxVisible={checkboxVisible}
            /> */}
            <div className="flex space-x-2 mt-2 w-full">
              <div className="w-full ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date"
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
                  <DesktopTimePicker
                    label=" Time"
                    name="time"
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
            </div>
          </div>
        </form>
        <div className="lg:border-l-2 w-full l md:mt-2 lg:mt-0 ">
          <div className="bg-white p-2 shadow-md rounded-md lg:ml-2 border w-full">
            <div className="grid  text-gray-500 grid-cols-2  xl:grid-cols-3  lg:mx-2  text-sm items-center gap-1 w-full py-3">
              <div className="flex items-center gap-2 w-10/12 lg:w-6/12">
                <h1 className="text-black font-semibold">UHID </h1>
                <div className="flex ml-7 space-x-2  items-center">
                  <span className="">:</span>
                  <span className="text-black font-normal">ABC </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-10/12 lg:w-8/12 xl:border-l-2  pl-4">
                <h1 className="text-black font-semibold">Patient Name </h1>
                <div className="flex space-x-2 items-center">
                  <span className="">:</span>
                  <span className="text-black font-normal">ABC </span>
                </div>
              </div>
              <div className="flex items-center w-10/12 lg:w-6/12 xl:border-l-2 xl:pl-4">
                <h1 className="text-black font-semibold">Dr. Name </h1>
                <div className="flex space-x-2 items-center ml-1 ">
                  <span>:</span>
                  <span className="text-black font-normal">ABC </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-semibold text-lg">
                Drug Admisitration Order List
              </h1>
              <FormGroup>
                <div className="w-full flex items-center space-x-3">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="State Medicines"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="SOS Medicines"
                  />
                </div>
              </FormGroup>
            </div>
            <DrugAdministrationOrderListTable data={orderListData} />
          </div>
          <div className=" px-2">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-semibold text-lg">Special Instructions</h1>
              <FormGroup>
                <div className="w-full flex items-center space-x-3">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Closed Instruction"
                  />
                </div>
              </FormGroup>
            </div>
            <SpecialInstructionTable data={SpecialInstructionData} />
            <div className="my-5">
              <div className="flex justify-between items-center my-1">
                <h1 className="text-lg font-semibold">
                  Administrator Drug List
                </h1>
                <div className="flex items-center space-x-3 text-xs">
                  <h1 className="flex items-center space-x-2">
                    <span
                      className="h-5 w-5  rounded"
                      style={{ backgroundColor: "#007EA9" }}
                    ></span>
                    <span>Outside medicines</span>
                  </h1>
                  <h1 className="flex items-center space-x-2">
                    <span
                      className="h-5 w-5 rounded"
                      style={{ backgroundColor: "#008000" }}
                    ></span>
                    <span>Once in a week drug</span>
                  </h1>
                  <h1 className="flex items-center space-x-2">
                    <span
                      className="h-5 w-5  rounded"
                      style={{ backgroundColor: "#0000C0" }}
                    ></span>
                    <span>Alternative day drug</span>
                  </h1>
                  <h1 className="flex items-center space-x-2">
                    <span
                      className="h-5 w-5  rounded"
                      style={{ backgroundColor: "#FF00FF" }}
                    ></span>
                    <span>Per hour drug</span>
                  </h1>
                  <h1 className="flex items-center space-x-2">
                    <span
                      className="h-5 w-5  rounded"
                      style={{ backgroundColor: "#C00000" }}
                    ></span>
                    <span>Stopped drug</span>
                  </h1>
                </div>
              </div>

              <AdministrationDrugListTable
                data={drugData}
                // stopAction={setStopAction(false)}
                printRow={printRow}
                displayView={displayView}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 items-center justify-end w-full mb-2">
        <OrderDrugButton
          onClick={() => {
            handleOpen();
          }}
        />
        <AddIVButton />
        <IVFlowButton />
        <LogFileButton />
        <SaveButton />
      </div>
      <DrugAdministratorOrderModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default DrugAdmisitrationChart;
