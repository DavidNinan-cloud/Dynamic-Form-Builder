//imports from react library
import * as React from "react";
import { useState, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//internal project functions and componants import
import { fetchAllTypeOfAppointment } from "../../../master/services/appointment/TypeOfAppointmentServices";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//fromfield control liberary componant import
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import EmergencyPatientModel from "../emergency/EmergencyPatientModel";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
//LodingSpinner
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
//function start
export default function TypeOfAppointment() {
  let searchValue = "";

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  const [date, setDate] = React.useState(null);
  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });

  const [dataResult, setDataResult] = useState([]);

  const [searchString, setSearchString] = useState("");

  //To execute the function only once
  const [countClick, setCountClick] = React.useState(0);

  const [options, setOptions] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setidValue] = useState("");

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  const [selectedObj, setSelectedObj] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  console.log({ selectedFromDate });

  const [selectedToDate, setSelectedToDate] = React.useState(null);
  console.log({ selectedToDate });

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  useEffect(() => {
    console.log("useEffect was called");
    console.log("filter data");
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllTypeOfAppointment(defaultParams)
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
  }, [searchString]);

  //populate the CommonMasterTable using the function populateTable
  const populateTable = () => {
    console.log("populateTable has been called");
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllTypeOfAppointment(obj)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
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
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    setSearchString(searchValue);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchTypeOfAppointment(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setOptions(res.result);
        });
    }
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    // if (value === null) {
    //   setSearchString("");
    // } else {
    //   console.log("value.area is " + value.area);
    //   searchValue = value.area;
    // }
  };

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  function deleteRow(row) {
    //open the confirmation modal
    handelOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }

  //event listener function for edit icon
  function editRow(Info) {
    setEdit(true);
    console.log(Info);
    console.log(Info.Id);
    setidValue(Info.Id);

    //When we click on edit pencil ; show Cancel and Update button

    //open the modal form
    handleOpen();
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    deleteTypeOfAppointmentById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert();
        }

        //Close the confirmation modal
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        errdeleteAlert();
        //Close the confirmation modal
        handleCloseChild();
      });
  }

  //start JSX Elements
  return (
    <>
      {/* <div className="w-full "> */}
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-gray-700 font-Poppins lg:hidden ">
            Emergency Patient
          </h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex justify-between w-full items-center mt-2">
          <div className=" flex items-center w-full gap-14">
            <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
              Emergency Patient
            </h1>
            <div className="flex flex-row flex-nowrap  gap-2 items-center">
              {/* <div className="grid lg:grid-cols-2  gap-2 items-center  xl:w-3/5"> */}
              <div className="col-span-3 w-full">
                <SearchBar
                  type="button"
                  name="SearchableSelect"
                  placeholder="Search by Patient Code/Name"
                  dataArray={options}
                  handleInputChange={handleChange}
                  onChange={autoSelectedValue}
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
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
                  <DatePicker
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
              <div>
                <Button
                  className=" h-9 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
              </div>
              <div>
                <Button
                  className=" h-9 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>
              <div>
                {/* Modal for Add */}
                <Button
                  type="button"
                  variant="outlined"
                  size="small"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "35px",
                    minWidth: "120px",
                    minHeight: "35px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  + Add New
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {open ? (
              <EmergencyPatientModel
                handleOpen={handleOpen}
                handleClose={handleClose}
                edit={edit}
                setEdit={setEdit}
                open={open}
                setOpen={setOpen}
                idValue={idValue}
                populateTable={populateTable}
                // searchObj={searchObj}
                countClick={countClick}
                setCountClick={setCountClick}
              />
            ) : null}
          </div>
        </div>

        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure want to delete this record ?"
          confirmationButtonMsg="Delete"
        />

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {/* CommonMasterTable Component */}
        {/* {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            //data to be displayed
            dataResult={dataResult}
            tableApiFunc={fetchAllTypeOfAppointment}
            setDataResult={setDataResult}
            searchString={searchString}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
            editRow={editRow}
            setOpen={setOpen}
            deleteRow={deleteRow}
            displayView={displayView}
          />
        ) : null} */}

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}
        {/* </div> */}
      </div>
      {/* <div className="flex flex-row flex-wrap gap-2">
        <div>
          <Button type="button" variant="outlined" size="small">
            MLC Print
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            Transfer To Ward
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            OPD Treatment Record
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            ETU Case Sheet
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            Print
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            Reset
          </Button>
        </div>
        <div>
          {" "}
          <Button type="button" variant="outlined" size="small">
            View
          </Button>
        </div>
        <div>
          <Button type="button" variant="outlined" size="small">
            Cancel
          </Button>
        </div>
      </div> */}
    </>
  );
}
// end JSX

// end Organization function
