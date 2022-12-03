//authentication token for all the api requests
import authHeader from "../../../authentication/authservices/auth-header";

//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

import axios from "axios";

//imports from material ui library
import { Button } from "@mui/material";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

//importing the CountryModal form
import CountryModal from "./CountryModal";

//import the Commonmastertable component
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

//importing the asynchronous function from CountryService file
import {
  fetchAllCountries,
  deleteCountryById,
  autoSearchCountry,
} from "./../../services/area/CountryService";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import AddNewButton from "../../../Common Components/Buttons/AddNewButton";

//body of Country Component
export default function Country() {
  console.log("The component was re-rendered");

  let searchValue = "";

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //state varible 'open' for modal open and close
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

  //Grey colored hint below the mobile length input field
  const [mobileLengthHint, setMobileLengthHint] = useState("Example : 10");

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable to open and close the confirmation modal for uploading data
  const [uploadConfirm, setUploadConfirm] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = useState(false);

  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false);

  const [searchString, setSearchString] = useState("");

  //To execute the function only once
  const [countClick, setCountClick] = React.useState(0);

  const [excelData, setExcelData] = React.useState();

  //function to download the table data
  function DownloadTableData() {
    console.log("DownloadTableData function is called");

    axios({
      url: "http://192.168.0.124:8090/masters/excelTemplate/country",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "country.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  }

  //onChange event handler function for input tag of 'import data'
  function uploadExcelData(e) {
    let files = e.target.files;
    console.warn("data file", files);

    let reader = new FileReader();

    reader.readAsDataURL(files[0]);

    //continuously check if the file is loaded ; and do the specific operation that it has to do
    reader.onload = (e) => {
      console.warn("excel data ", files[0]);

      console.log(typeof files[0]);

      let formData = { countryExcel: files[0] };

      console.log("The formData is ");
      console.log(formData);

      reader.onloadend = () => {
        console.log("DONE", reader.readyState); // readyState will be 2

        setExcelData(formData);
        uploadConfirmOpen();
      };
    };
  }

  // Event listener function that invokes after clicking on the Upload button of
  const submitExcelData = (e) => {
    console.log("The excel sheet is going to be uploaded");

    console.log("The form data in submitExcelData function is ");

    console.log(excelData);

    const url =
      "http://192.168.0.124:8090/masters/excelTemplate/uploadExcelCountry";

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: authHeader().Authorization,
      },
    };

    console.log("The config obj is ");
    console.log(config);

    axios
      .post(url, excelData, config)
      .then((response) => {
        console.log("The response after submitting the data is ");
        console.log(response);
        populateTable();
      })
      .catch((error) => {
        console.log(error);
      });

    uploadConfirmClose();
  };

  //populate the table upon chnages in the rowsPerPage and page state variable
  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllCountries(defaultParams)
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
    fetchAllCountries(obj)
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
      autoSearchCountry(autoSearchString)
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
      searchValue = value.country;
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

  //function to open the confirmation modal for
  //uploading the excel sheet
  const uploadConfirmOpen = () => setUploadConfirm(true);

  //function to close the confirmation modal
  const uploadConfirmClose = () => {
    if (uploadConfirm) {
      setUploadConfirm(false);
    }
  };

  //event listener function for edit icon
  function editRow(countryInfo) {
    setEdit(true);
    console.log(countryInfo);
    console.log(countryInfo.Id);
    setIdValue(countryInfo.Id);

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

  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    //Close the confirmation modal for delete
    handleCloseChild();
    setOpenBackdrop(true);

    deleteCountryById(deleteId)
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
          <h1 className="text-black font-Poppins lg:hidden ">Country</h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex justify-between w-full items-center mt-2">
          <div className=" flex items-center w-full gap-2">
            <h1 className="text-xl text-black font-Poppins hidden lg:block">
              Country
            </h1>

            <div className="flex gap-2 items-center w-full xl:w-4/5">
              <SearchBar
                type="button"
                name="SearchableSelect"
                placeholder="Search by Code/Country/ISD Code"
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

            <div className="flex w-full justify-end">
              {/* Modal for Add */}
              <AddNewButton
                onClick={() => {
                  handelOpen();
                }}
              />
            </div>

            {/* Backdrop component to disable the screen after submitting the form */}
            <CommonBackDrop openBackdrop={openBackdrop} />
          </div>
        </div>

        {/* Body of country Modal form */}
        {open ? (
          <CountryModal
            handleClose={handleClose}
            edit={edit}
            setEdit={setEdit}
            setOpen={setOpen}
            open={open}
            handelOpen={handelOpen}
            mobileLengthHint={mobileLengthHint}
            setMobileLengthHint={setMobileLengthHint}
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

        <ConfirmationModal
          confirmationOpen={uploadConfirm}
          confirmationHandleClose={uploadConfirmClose}
          confirmationSubmitFunc={submitExcelData}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure you want to upload this excel sheet?"
          confirmationButtonMsg="Upload"
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
            tableApiFunc={fetchAllCountries}
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
            DownloadTableData={DownloadTableData}
            uploadExcelData={uploadExcelData}
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
