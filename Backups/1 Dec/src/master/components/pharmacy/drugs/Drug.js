//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";

//importing the DrugModal form
import DrugModal from "./DrugModal";

//import the Commonmastertable component
import CommonMasterTable from "../../common/CommonMasterTable";
import SearchBar from "../../common/formfields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import LoadingSpinner from "../../common/loadingspinner/loadingSpinner";

//importing the asynchronous function from AreaService file
import {
  fetchAllDrug,
  deleteDrugById,
  autoSearchDrug,
} from "../../../services/pharmacy/drug/DrugService";

import ConfirmationModal from "../../common/formfields/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/Toasts";

//searchObj is sent with the POST request to get all the list of countries
const searchObj = {
  page: 0,
  size: 10,
  searchString: "",
};

//body of Area component
export default function Drug() {
  //For search POST Request , set the searchObj into the following variable
  let searchDrug = {
    page: 0,
    size: 10,
    searchString: "",
  };

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

  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  useEffect(() => {
    populateTable(searchObj);
  }, []);

  //populate the CommonMasterTable using the function populateTable
  function populateTable(searchParameter) {
    fetchAllDrug(searchParameter)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
      });
  }

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    console.log("Search icon has been clicked");

    console.log(
      "selected obj in filterData function is " + JSON.stringify(selectedObj)
    );

    console.log(typeof selectedObj);

    try {
      if (
        typeof selectedObj !== "string" &&
        selectedObj.hasOwnProperty("drug") &&
        selectedObj.searchDrug !== ""
      ) {
        searchDrug.searchString = selectedObj.searchDrug;
        console.log("if block's populateTable");
        populateTable(searchDrug);
      }
    } catch (err) {
      console.log("Selected object has empty or no search string");
    }
  };

  //This function is props to the Searchbar component
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      autoSearchArea(autoSearchString)
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
    setSelectedObj(value);
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
  function editRow(drug) {
    setEdit(true);
    console.log(drug);
    console.log(drug.Id);
    setIdValue(drug.Id);

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

    deleteDrugById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable(searchObj);
          deleteAlert();
        }

        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        errdeleteAlert();
        //Close the confirmation modal for delete
        handleCloseChild();
      });
  }

  return (
    <>
      <div className="w-full px-6">
        <div className="w-full grid px-2 lg:px-5  pt-20  mt-8 md:rounded-md">
          <div className="">
            <div className="row">
              {/* search dropdown */}
              <div className="flex lg:grid lg:grid-cols-2 gap-4">
                {/* searchable */}
                <SearchBar
                  type="button"
                  name="SearchableSelect"
                  placeholder="Search By Drug Name / Code"
                  dataArray={options}
                  isSearchable={true}
                  handleInputChange={handleChange}
                  selectedValue={autoSelectedValue}
                  selectedObj={selectedObj}
                />

                <div className="flex gap-2 ">
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
                    className="h-11 w-10 px-2 rounded-md text-gray-500"
                    type="button"
                  >
                    <TuneIcon className="cursor-pointer" />
                  </Button>
                </div>
              </div>

              {/* Modal and table name start */}
              <div className="flex justify-between items-center w-full  mt-4 rounded">
                <div className="text-gray-500 font-bold text-left text-base">
                  Drugs
                </div>

                <div className="grid justify-end">
                  <Button
                    type="button"
                    variant="outlined"
                    size="small"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "35px",
                      minWidth: "120px",
                      minHeight: "35px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      handelOpen();
                      setEdit(false);
                    }}
                  >
                    + Add New
                  </Button>

                  {/* Modal and table name start */}

                  {open ? (
                    <DrugModal
                      handleClose={handleClose}
                      edit={edit}
                      setEdit={setEdit}
                      setOpen={setOpen}
                      open={open}
                      handelOpen={handelOpen}
                      idValue={idValue}
                      populateTable={populateTable}
                      searchObj={searchObj}
                    />
                  ) : null}
                </div>
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

            {/* CommonMasterTable Component */}
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 ? (
              <CommonMasterTable
                //data to be displayed
                data={data}
                editRow={editRow}
                setOpen={setOpen}
                deleteRow={deleteRow}
                displayView={displayView}
              />
            ) : (
              <div className="grid justify-center items-center w-full">
                <div className="flex mt-5 justify-center w-full">
                  <button className="">
                    <LoadingSpinner className="" />
                  </button>
                </div>
                <div className="flex justify-center w-full">
                  <h3 className="mt-5 font-bold text-gray-600">
                    No Records Found...
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
