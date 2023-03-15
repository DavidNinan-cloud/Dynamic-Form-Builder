//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";

//importing the UsersModal form
import UsersModal from "./UsersModal";

//import the Commonmastertable component
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ConfirmationModal from "../Common Components/ConfirmationModal";
import LoadingSpinner from "../Common Components/loadingspinner/loadingSpinner";
import CommonMasterTable from "../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../Common Components/FormFields/SearchBar";


//importing the asynchronous function from UsersService file

import {
  fetchAllUsers,
  deleteUsersById,
  autoSearchUsers,
} from "./UsersServices";
import { deleteAlert, errdeleteAlert } from "../Common Components/Toasts/CustomToasts";
import AddNewButton from "../Common Components/Buttons/AddNewButton";
import { SearchRounded } from "@mui/icons-material";


function Users() {
  //For search POST Request , set the searchObj into the following variable
  let searchValue = "";

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();
  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //To store the single option of auto-complete selected by user
  const [selectedObj, setSelectedObj] = React.useState("");

  //state varible for modal open and close
  const [open, setOpen] = useState(false);

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setIdValue] = useState("");

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = useState("");

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);
  //function to open the confirmation modal
  const handleOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //handleOpen function opens the modal form
  const handleOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  //populate the table upon chnages in the rowsPerPage and page state variable
  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllUsers(defaultParams)
      .then((response) => {
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + res);
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
  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  // useEffect(() => {
  //   populateTable(searchObj);
  // }, []);

  //populate the CommonMasterTable using the function populateTable
  const populateTable = () => {
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    showSpinner(true);
    showRecordWarning(false);
    fetchAllUsers(obj)
      .then((response) => {
        // console.log("The search result is " + JSON.stringify(response.data));
        // setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + res);
        setData(res);
        showSpinner(false);
        setDataResult(res.result);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);

    // try {
    //   if (
    //     typeof selectedObj !== "string" &&
    //     selectedObj.hasOwnProperty("users") &&
    //     selectedObj.users !== ""
    //   ) {
    //     searchUsers.searchString = selectedObj.users;
    //     console.log("if block's populateTable");
    //     populateTable(searchUsers);
    //   }
    // } catch (err) {
    //   console.log("Selected object has empty or no search string");
    // }
  };

  //This function is props to the Searchbar component
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchUsers(autoSearchString)
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
      searchValue = value.UsersInfo;
    }
  };

  //event listener function for edit icon
  function editRow(UsersInfo) {
    setEdit(true);
    console.log("UsersInfo",UsersInfo);
    setIdValue(UsersInfo.id);
    handleOpen();
  }

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    setDeleteId(row.id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {

    deleteUsersById(deleteId)
      .then((response) => {
        console.log(response);
        populateTable();
        deleteAlert(" Record Deleted Successfully");
        handleCloseChild();
      })
      .catch((error) => {
        errdeleteAlert(error.message);
        handleCloseChild();
      });
  }

  return (
    <>
      
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700  lg:hidden">Users Master</h1>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="w-72 text-xl text-gray-700  hidden lg:block">Users Master</h1>
          {/* search dropdown */}
          <div className="grid grid-cols-5 xl:grid-cols-5 w-full gap-2 items-center">
            {/* searchable */}
            <div className="w-full col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search By User Name"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex gap-2 ">
              <button
                    className="h-10 w-14 px-2 ml-5 rounded-md bg-customBlue border-customBlue text-white cursor-pointer"
                    onclick={filterData} >
                    <SearchRounded  />
              </button>
            </div>
            <div className="grid justify-end col-span-2">
              <AddNewButton
                onClick={() => {
                  handleOpen();
                }}
              />
            </div>
          </div>
        </div>

        {/* Modal and table name start */}

        <UsersModal
            populateTable={populateTable}
            edit={edit}
            setEdit={setEdit}
            open={open}
            idValue={idValue}
            handleClose={handleClose}
        />

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
        { data.result.length > 0 && data.statusCode === 200 && spinner === false ? (
          <CommonMasterTable
            // tableApiFunc={fetchAllUsers}
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
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
        ) : (<>{console.log("no data",data)}</>)}

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

export default Users;
