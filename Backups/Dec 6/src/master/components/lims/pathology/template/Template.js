//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";

//importing the RadioTemplateModal form
import TemplateModal from "./TemplateModal";

//import the Commonmastertable component
import CommonMasterTable from "../../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

//importing the asynchronous functions from services
import {
  fetchAllTemplates,
  deleteTemplateById,
  autoSearchTemplate,
} from "../../../../services/lims/pathology/TemplateCreationServices";

import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";

//body of Radiology component
function Template() {
  console.log("The component was re-rendered");

  let searchValue = "";

  //state variable to indicate the page number
  const [page, setPage] = useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

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
  const [dataResult, setDataResult] = useState([]);

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = useState(false);

  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false);

  const [searchString, setSearchString] = useState("");

  const [options, setOptions] = React.useState([]);

  //To execute the function only once
  const [countClick, setCountClick] = React.useState(0);

  //populate the table upon chnages in the rowsPerPage and page state variable
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
    fetchAllTemplates(defaultParams)
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

    fetchAllTemplates(obj)
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

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchTemplate(autoSearchString)
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
      searchValue = value.Template;
      console.log("The value is ");
      console.log(value);
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

  //edit icon's event listener function
  function editRow(templateInfo) {
    setEdit(true);
    console.log("templateInfo object is ");
    console.log(templateInfo);
    console.log(templateInfo.Id);
    setIdValue(templateInfo.Id);

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
    if (countClick === 0) {
      setCountClick(countClick + 1);
      deleteTemplateById(deleteId)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            populateTable();
            deleteAlert(response.data.message);
            setCountClick(0);
          }

          //Close the confirmation modal for delete
          handleCloseChild();
        })
        .catch((error) => {
          setCountClick(0);
          errdeleteAlert(error.message);
          handleCloseChild();
        });
    }
  }

  return (
    <>
      {/* <div className="w-full "> */}
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-black font-Poppins lg:hidden ">
            Pathology Department
          </h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex justify-between w-full items-center mt-2">
          <div className=" flex items-center w-full gap-2">
            <h1 className="text-xl text-black font-Poppins whitespace-nowrap hidden lg:block">
              Pathology Department
            </h1>

            <div className="flex gap-2 items-center w-full xl:w-4/5">
              <SearchBar
                type="button"
                name="SearchableSelect"
                placeholder="Search By Template Name"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />

              <Button
                className=" h-10 w-10 px-2 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
              <Button
                className=" h-9 w-10 px-2 rounded-md text-gray-500"
                type="button"
              >
                <TuneIcon className="cursor-pointer" />
              </Button>
            </div>
          </div>

          {/* Modal and table name start */}
          <div className="flex w-full justify-end">
            <AddNewButton
              onClick={() => {
                handelOpen();
              }}
            />
          </div>
        </div>

        {open ? (
          <TemplateModal
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
          <div className="grid justify-center">{<LoadingSpinner />}</div>
        ) : null}

        {/* CommonMasterTable Component */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            dataResult={dataResult}
            tableApiFunc={fetchAllTemplates}
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

export default Template;
