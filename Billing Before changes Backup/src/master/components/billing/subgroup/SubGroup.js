//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";

//importing the SubGroupModal form
import SubGroupModal from "./SubGroupModal";

//import the Commonmastertable component
import CommonMasterTable from "../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";

//importing the asynchronous function from SubGroupService file
import {
  fetchAllSubGroup,
  deleteSubGroupById,
  autoSearchSubGroup,
} from "../../../services/billing/subgroup/SubGroupServices";

import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";

//body of SubGroup component
function SubGroup() {
  //For search POST Request , set the searchObj into the following variable
  let searchValue = "";

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //To store the single option of auto-complete selected by user
  const [selectedObj, setSelectedObj] = React.useState("");

  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);

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

  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllSubGroup(defaultParams)
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
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    showSpinner(true);
    showRecordWarning(false);
    fetchAllSubGroup(obj)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
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
    //     selectedObj.hasOwnProperty("subgroup") &&
    //     selectedObj.subgroup !== ""
    //   ) {
    //     searchSubGroup.searchString = selectedObj.subgroup;
    //     console.log("if block's populateTable");
    //     populateTable(searchSubGroup);
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
      autoSearchSubGroup(autoSearchString)
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
      searchValue = value.SubGroupInfo;
    }
  };

  //event listener function for edit icon
  function editRow(SubGroupInfo) {
    setEdit(true);
    console.log(SubGroupInfo);
    console.log(SubGroupInfo.Id);
    setIdValue(SubGroupInfo.Id);

    //When we click on edit pencil ; show Cancel and Update button

    //open the modal form
    handleOpen();
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    deleteSubGroupById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
        }

        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch((error) => {
        //Code for React Toast
        errdeleteAlert(error.message);
        //Close the confirmation modal for delete
        handleCloseChild();
      });
  }
  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700  lg:hidden">Sub-Group</h1>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="w-40 text-xl text-gray-700  hidden lg:block">
            Sub-Group
          </h1>
          {/* search dropdown */}
          <div className="grid grid-cols-5 xl:grid-cols-5 w-full gap-2 items-center">
            <div className="w-full col-span-2">
              {/* searchable */}
              <SearchBar
                name="SearchableSelect"
                placeholder="Search By SubGroup"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex gap-2 ">
              <Button
                className=" h-9 w-9 px-2 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
              <Button
                className="h-9 w-9 px-2 rounded-md text-gray-500"
                type="button"
              >
                <TuneIcon className="cursor-pointer" />
              </Button>
            </div>

            {/* Modal and table name start */}

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

        <SubGroupModal
          populateTable={populateTable}
          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          idValue={idValue}
          countClick={countClick}
          setCountClick={setCountClick}
          handleOpen={handleOpen}
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
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            tableApiFunc={fetchAllSubGroup}
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

export default SubGroup;
