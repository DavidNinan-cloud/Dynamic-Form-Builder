import { useState, useEffect } from "react";
import * as React from "react";
import { Button, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import AddIssueButton from "../../../Common Components/Buttons/AddIssueButton";
import CommonTable from "../../../IPD/nursing/common/CommonTable";
import IssueReturnModal from "./IssueReturnModal";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReactSelect from "react-select";

const storeData = {
  message: "storeData list found ",
  result: [
    {
      Id: 1,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: true,
    },

    {
      Id: 29,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: false,
    },
    {
      Id: 28,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: false,
    },
    {
      Id: 16,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: true,
    },
    {
      Id: 1,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: true,
    },
    {
      Id: 3,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: true,
    },
    {
      Id: 4,
      "Indent No": "3228",
      "Indent Date": "05/12/2023",
      "Issue No": "BS1555",
      Status: true,
    },
  ],
  statusCode: 200,
  count: 5,
};

//body of IssueReturnIndent component
function IssueReturnIndent() {
  const [recordWarning, showRecordWarning] = React.useState(false);
  //date
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  //state varible for modal open and close
  const [open, setOpen] = useState(true);
  //handleOpen function opens the modal form
  const handleOpen = () => setOpen(true);
  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const handleChangeSearchBar = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value typed by the user is " + autoSearchString);
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex space-x-3">
          {/* search dropdown */}
          <div className=" flex flex-wrap   w-full gap-2 ">
            {/* searchable */}
            <div className=" w-8/12 lg:w-[36%] xl:w-[27%] flex space-x-2 ">
              <SearchBar
                //   control={control}
                sx={{ overflow: "hidden" }}
                name="searchItem"
                label="Search By Indent Number"
                searchIcon={true}
                // dataArray={itemsData}
                handleInputChange={handleChangeSearchBar}
                onChange={autoSelectedValue}
                placeholder="Search By Indent Number"
                isSearchable={true}
                isClearable={false}
              />
            </div>
            {/* <div className="flex space-x-2 border p-2 rounded text-sm whitespace-nowrap w-[36%] md:w-[32%] lg:w-auto overflow-hidden">
              <div className="flex space-x-2">
                <input className="h-5 w-5" type="radio" value="Yes" />
                <label>Issue</label>
              </div>
              <div className="flex space-x-2">
                <input className="h-5 w-5" type="radio" value="No" />
                <label>Issue Return</label>
              </div>
            </div> */}
            <div className="flex space-x-2 w-6/12 lg:w-[36%] xl:w[26%] ">
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
                      {...params}
                      sx={{
                        svg: { color: "#0B83A5" },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
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

            <div className="flex gap-2 w-5/12 lg:w-3/12 xl:w-[22%] ">
              <div className="w-full">
                <ReactSelect label="Store" placeholder="Store" />
              </div>
              <Button
                className=" h-10  px-2 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                // onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
            </div>
            <div className="w-full flex justify-between ">
              <h1 className="text-base font-semibold xl:text-lg text-gray-700 whitespace-nowrap mt-2 xl:mt-1">
                Issue/Return Indent
              </h1>
              <AddIssueButton
                onClick={() => {
                  handleOpen();
                }}
              />
            </div>
          </div>
        </div>

        <IssueReturnModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        {/* CommonTable Component */}
        {storeData.hasOwnProperty("result") &&
        storeData.result.length > 0 &&
        storeData.statusCode === 200 ? (
          <CommonTable data={storeData} />
        ) : null}

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default IssueReturnIndent;
