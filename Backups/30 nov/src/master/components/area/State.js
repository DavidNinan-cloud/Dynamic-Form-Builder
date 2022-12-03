//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

//importing the StateModal form
import StateModal from "./StateModal";

//import the Commonmastertable component
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

//importing the asynchronous function from CountryService file
import {
  fetchAllStates,
  deleteStateById,
  autoSearchState,
} from "./../../services/area/StateService";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import AddNewButton from "../../../Common Components/Buttons/AddNewButton";

//body of State component
export default function State() {
  let searchValue = "";

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  const [dataResult, setDataResult] = useState([]);

  const [searchString, setSearchString] = useState("");

  //To execute the function only once
  const [countClick, setCountClick] = useState(0);

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //state variable for modal open and close
  const [open, setOpen] = useState(false);

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setIdValue] = useState("");

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = useState("");

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = useState(false);

  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false);

  //populate the table upon chnages in the rowsPerPage and page state variable
  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllStates(defaultParams)
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
    fetchAllStates(obj)
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

  //This function is props to the Searchbar component
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchState(autoSearchString)
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

    if (value === null) {
      setSearchString("");
    } else {
      console.log("value.area is " + value.state);
      searchValue = value.state;
    }
  };

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

  //event listener function for edit icon
  function editRow(stateInfo) {
    setEdit(true);
    console.log(stateInfo);
    console.log(stateInfo.Id);
    setIdValue(stateInfo.Id);

    //When we click on edit pencil ; show Cancel and Update button

    //open the modal form
    handelOpen();
  }

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handelOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    //Close the confirmation modal for delete
    handleCloseChild();
    setOpenBackdrop(true);

    deleteStateById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }
      })
      .catch((error) => {
        //Code for React Toast
        setOpenBackdrop(false);
        errdeleteAlert(error.message);
      });
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className="text-black font-Poppins lg:hidden ">State</h1>
        </div>

        {/* searchable dropdown */}
        <div className="flex justify-between w-full items-center mt-2">
          <div className="flex items-center w-full gap-2">
            <h1 className="text-xl text-black font-Poppins hidden lg:block">
              State
            </h1>

            <div className="flex gap-2 items-center w-full xl:w-3/5">
              <SearchBar
                type="button"
                name="SearchableSelect"
                placeholder="Search by State Code/State"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />

              <Button
                className="h-9 w-10 px-2 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
              <Button
                className="h-9 w-10 px-2 rounded-md text-gray-500"
                type="button"
              >
                <TuneIcon className="cursor-pointer" />
              </Button>
            </div>
          </div>

          <div className="flex w-full justify-end">
            {/* Modal for Add */}
            <AddNewButton
              onClick={() => {
                handelOpen();
              }}
            />

            {/* Backdrop component to disable the screen after submitting the form */}
            <CommonBackDrop openBackdrop={openBackdrop} />
          </div>
        </div>

        {/* Modal and table name start */}
        {open ? (
          <StateModal
            handleClose={handleClose}
            edit={edit}
            setEdit={setEdit}
            setOpen={setOpen}
            open={open}
            handelOpen={handelOpen}
            idValue={idValue}
            populateTable={populateTable}
            countClick={countClick}
            setCountClick={setCountClick}
            setOpenBackdrop={setOpenBackdrop}
          />
        ) : null}

        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure you want to delete this record ?"
          confirmationButtonMsg="Delete"
        />

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {/* CommonMasterTable Component */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            //data to be displayed
            dataResult={dataResult}
            tableApiFunc={fetchAllStates}
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
