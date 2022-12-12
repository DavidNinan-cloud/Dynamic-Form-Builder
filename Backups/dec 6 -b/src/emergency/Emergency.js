import * as React from "react";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
//internal project functions and componants import
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm } from "react-hook-form";
import SearchBar from "../Common Components/FormFields/SearchBar";
import ConfirmationModal from "../Common Components/ConfirmationModal";
//LodingSpinner
import LoadingSpinner from "../Common Components/loadingspinner/loadingSpinner";
import EmergencyModal from "./EmergencyModal";
import AddNewButton from "../Common Components/Buttons/AddNewButton";
import EmergencyTable from "./EmergencyTable";
import {
  fetchAllEmergency,
  autoSearchEmeregncy,
} from "./services/emergencyservice/EmergencyServices";
import CommonBackDrop from "../Common Components/CommonBackDrop/CommonBackDrop";
import SearchIconButton from "../Common Components/Buttons/SearchIconButton";
import TransferToWardModal from "./TransferToWardModal";
import DenailAdmissionModal from "./DenailAdmissionModal";

//function start
export default function Emergency() {
  const {
    control,
    // handleSubmit,
    // reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let fromData = watch("fromDate");

  useEffect(() => {
    console.log(fromData);
  }, [fromData]);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchId, setSearchId] = React.useState(null);

  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setidValue] = useState("");

  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  // const validateDate = (value) => {
  //   let dobGivenYear = value.getFullYear();
  //   let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
  //   let dobGivenDay = String(value.getDate()).padStart(2, "0");
  //   let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
  //   return fullDOB
  // }
  //OPEN Emergency Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //OPEN Transfer To Ward Modal
  const [openTransferToWard, setOpenTransferToWard] = React.useState(false);
  const handleOpenTransferToWard = () => setOpenTransferToWard(true);
  const handleCloseTransferToWard = () => setOpenTransferToWard(false);

  //OPEN Denial Admission Modal
  const [
    openDenialAdmissionModal,
    setOpenDenialAdmissionModal,
  ] = React.useState(false);
  const handleOpenDenialAdmissionModal = () =>
    setOpenDenialAdmissionModal(true);
  const handleCloseDenialAdmissionModal = () =>
    setOpenDenialAdmissionModal(false);

  let todaysDate = new Date();
  // const [selectedFromDate, setSelectedFromDate] = React.useState(todaysDate);
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);

  // const [selectedToDate, setSelectedToDate] = React.useState(todaysDate);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const checkboxVisible = false; // for table checkbox

  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  useEffect(() => {
    if (searchString === "" && searchId === null) {
      callApiFunc();
    }
  }, [searchString, searchId]);

  const callApiFunc = () => {
    showSpinner(true);
    showRecordWarning(false);
    // let fromDateI = validateDate(selectedFromDate)
    // let toDateI = validateDate(selectedToDate)
    let defaultParams = {
      // fromDate: fromDateI,
      fromDate: selectedFromDate,
      page: 0,
      size: rowsPerPage,
      // toDate: toDateI,
      toDate: selectedToDate,
      searchId: searchId,
      searchString: searchString,
    };
    fetchAllEmergency(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        console.log(
          "in the serach result 1st record is " +
            JSON.stringify(response.data.result[0])
        );
        return response.data;
      })
      .then((res) => {
        // console.log("The input for setData function is " + JSON.stringify(res));
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
  }, [selectedFromDate, selectedToDate]);

  //populate the CommonMasterTable using the function populateTable
  const populateTable = () => {
    console.log("populateTable has been called");
    let obj = {
      fromDate: null,
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
      searchId: searchId,
      toDate: null,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllEmergency(obj)
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
    callApiFunc();
  };

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("The value typed by the user is " + autoSearchString);
    if (autoSearchString !== "") {
      console.log(autoSearchString);
      setSearchString(autoSearchString);
      if (searchId !== null) {
        setSearchId(null);
      }
      autoSearchEmeregncy(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          // console.log( "The response of auto-complete / auto-search is " + JSON.stringify(res) );
          setOptions(res.result);
        });
    }
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    if (value === null) {
      setSearchString("");
      setSearchId(null);
    } else {
      setSearchString(value.label);
      setSearchId(value.value);
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
    console.log("editRow was called");
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {}

  //start JSX Elements
  return (
    <>
      <div className="grid items-center pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className="text-black font-Poppins  whitespace-nowrap">
            Emergency Details
          </h1>
        </div>

        {/*searchable dropdown */}
        <div className="grid gap-2 w-full items-center mt-2">
          <div className="grid grid-cols-3 lg:grid-cols-5 w-full gap-2 items-center">
            <div className="w-full col-span-3 lg:col-span-2">
              <SearchBar
                // type="button"
                name="SearchableSelect"
                placeholder="Search by Patient Name / Mob No."
                dataArray={options}
                handleInputChange={handleChange} //searchString
                onChange={autoSelectedValue} // serachId
                searchIcon={true}
              />
            </div>
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
            <div className="flex justify-between">
              <SearchIconButton onClick={filterData} />
              <AddNewButton
                onClick={() => {
                  handleOpen();
                }}
              />
            </div>
          </div>
          <CommonBackDrop openBackdrop={openBackdrop} />
        </div>

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {/* CommonMasterTable Component */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        spinner === false ? (
          <>
            <EmergencyTable
              tableApiFunc={fetchAllEmergency}
              searchString={searchString}
              searchId={searchId}
              dataResult={dataResult}
              setDataResult={setDataResult}
              data={data}
              page={page}
              setData={setData}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}
              editRow={editRow}
              setOpen={setOpen}
              deleteRow={deleteRow}
              displayView={displayView}
              selectedFromDate={selectedFromDate}
              setSelectedFromDate={setSelectedFromDate}
              selectedToDate={selectedToDate}
              setSelectedToDate={setSelectedToDate}
              //Use For Open Transfer to Ward Modal
              setOpenTransferToWard={setOpenTransferToWard}
              //Use For Open Denial Admission Modal
              setOpenDenialAdmissionModal={setOpenDenialAdmissionModal}
            />
          </>
        ) : null}

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

        <div className="flex justify-end">
          {open ? (
            <EmergencyModal
              populateTable={populateTable}
              edit={edit}
              setEdit={setEdit}
              open={open}
              setOpen={setOpen}
              idValue={idValue}
              handleOpen={handleOpen}
              handleClose={handleClose}
              checkboxVisible={checkboxVisible}
              openBackdrop={openBackdrop}
              setOpenBackdrop={setOpenBackdrop}
            />
          ) : null}
        </div>

        {openTransferToWard ? (
          <TransferToWardModal
            openTransferToWard={openTransferToWard}
            // setOpenTransferToWard={setOpenTransferToWard}
            // handleOpenTransferToWard={handleOpenTransferToWard}
            handleCloseTransferToWard={handleCloseTransferToWard}
          />
        ) : null}

        {openDenialAdmissionModal ? (
          <DenailAdmissionModal
            openDenialAdmissionModal={openDenialAdmissionModal}
            // setOpenDenialAdmissionModal={setOpenDenialAdmissionModal}
            // handleOpenDenialAdmissionModal={handleOpenDenialAdmissionModal}
            handleCloseDenialAdmissionModal={handleCloseDenialAdmissionModal}
          />
        ) : null}

        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure want to delete this record ?"
          confirmationButtonMsg="Delete"
        />
      </div>
    </>
  );
}
