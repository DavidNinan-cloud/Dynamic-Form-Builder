//imports from react library
import { useState, useEffect } from "react";
import * as React from "react";
//imports from material ui library
import { Button } from "@mui/material";
import DischargeTypeModal from "./DischargeTypeModal";
//import the CommonMasterTable component
import CommonMasterTable from "../../../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";

import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";
//importing the asynchronous function from dischargeService file
import {
  fetchAllDischargeType,
  autoSearchDischargeType,
  deleteDischargeTypeById,
} from "../../../../../services/infrastructure/dischargeType/DischrageTypeServices";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/Toasts";

//body of discharge Component
function DischargeType() {
  let searchValue = "";

  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  //state varible 'open' for modal open and close
  const [open, setOpen] = useState(false);
  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);
  //for create suggestion object
  const [selectedObj, setSelectedObj] = React.useState("");
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

   //Before the component gets mounted , call the asynchronous function fetchAllGroup(). And resolve the promise returned by that function.
  //  useEffect(() => {
  //   populateTable(searchObj);
  // }, []);
  
  useEffect(() => {
    console.log("useeffect call");

    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllDischargeType(defaultParams)
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
      page:0,
      size:rowsPerPage,
      searchString:searchString
    }
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllDischargeType(obj)
      .then((response) => {
        console.log("the serch result is" + JSON.stringify(response.data));
        setCount(response.data.count);
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
  }
  //matched string
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchDischargeType(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
           setOptions(res.result);
        });
    }
  };
  //selected value set to  setSelected state
  const autoSelectedValue = (value) => {
    console.log(value);
    if (value === null) {
      setSearchString("");
    } else {
      searchValue = value.dischargeType;
    }
  };
  //event listener function for edit icon
  function editRow(dischargeTypeInfo) {
    setEdit(true);
    console.log(dischargeTypeInfo);
    console.log(dischargeTypeInfo.Id);
    setIdValue(dischargeTypeInfo.Id);
    //When we click on edit pencil ; show Cancel and Update button
    //open the modal form
    handelOpen();
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
    deleteDischargeTypeById(deleteId)
      .then((response) => {
        console.log(response);
        console.log(typeof response.data.statusCode);
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

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700 font-Poppins lg:hidden">Discharge</h1>
        </div>
        <div className="flex justify-between w-full mt-2">
          {/* search TextField */}
          <div className="flex items-center gap-4 w-full lg:w-4/6 xl:w-3/6">
            <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
              Discharge
            </h1>
            <div className="flex w-full gap-2">
              {/* searchable */}
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by Discharge Type"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
              <div className="flex gap-2 ">
                <Button
                  className="h-9 w-9 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
              </div>
            </div>
          </div>
          {/* Add button to open the Modal Form and table name start */}
          <div className="flex justify-end pl-2">
            {/* When the Add button is clicked ; the modal form opens */}
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
            {/* Body of Block Modal form */}
            
          </div>
        </div>
       
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
            tableApiFunc={fetchAllDischargeType}
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

        {/* Do not show "No Records Found" when data is loading ; AND when the data is arrived successfully */}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

              <DischargeTypeModal
                populateTable={populateTable}
                handleClose={handleClose}
                edit={edit}
                setEdit={setEdit}
                setOpen={setOpen}
                open={open}
                handelOpen={handelOpen}
                idValue={idValue}
              />
            
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
export default DischargeType;
