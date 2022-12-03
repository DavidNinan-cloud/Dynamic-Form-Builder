//imports from react library
import { useState, useEffect } from "react";
import * as React from "react";
//imports from material ui library
import { Button } from "@mui/material";
import RoomModal from "./RoomModal";
//import the CommonMasterTable component
import CommonMasterTable from "../../../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";

import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";
//importing the asynchronous function from roomService file
import {
  fetchAllRoom,
  autoSearchRoom,
  deleteRoomById,
} from "../../../../../services/infrastructure/room/RoomServices";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";

import { useForm } from "react-hook-form";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";


//body of room Component
function Room() {
  let searchValue = "";

  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm("");

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const[facilityOptions,setFacilityOptions]=React.useState([]);
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

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllRoom(defaultParams)
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
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllRoom(obj)
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
  };
  //matched string
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
    // try {
    //   if (
    //     typeof selectedObj !== "string" &&
    //     selectedObj.hasOwnProperty("room") &&
    //     selectedObj.room !== ""
    //   ) {
    //     searchRoom.searchString = selectedObj.room;
    //     console.log("if room's populateTable");
    //     populateTable(searchRoom);
    //   }
    // } catch (err) {
    //   errorAlert();
    //   console.log("Selected object has empty or no search string");
    // }
  };
  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchRoom(autoSearchString)
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
  //selected value set to  setSelected state
  const autoSelectedValue = (value) => {
    console.log(value);
    if (value === null) {
      setSearchString("");
    } else {
      searchValue = value.room;
    }
  };
  //event listener function for edit icon
  function editRow(RoomInfo) {
    setEdit(true);
    console.log(RoomInfo);
    console.log(RoomInfo.Id);
    setIdValue(RoomInfo.Id);
    handleOpen();
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }
  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
      deleteRoomById(deleteId)
      .then((response) => {
        console.log(response);
        console.log(typeof response.data.statusCode);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }
        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch((error) => {
        errdeleteAlert(error.message);
        setOpenBackdrop(false);
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
          <h1 className="text-gray-700  lg:hidden">Room</h1>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-gray-700  hidden lg:block">Room</h1>
          {/* searchable */}
          <div className="grid grid-cols-2 xl:grid-cols-3 w-full gap-2">
            <div className="w-full">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by Room"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex justify-between xl:col-span-2">
              <div>
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
              <div>
                {/* When the Add button is clicked ; the modal form opens */}
                {/* Modal for Add */}
                <AddNewButton
                  onClick={() => {
                    handleOpen();
                  }}
                />
              </div>
            </div>
              <CommonBackDrop openBackdrop={openBackdrop} />
          </div>
        </div>
        {/* Add buttBlockon to open the Modal Form and table name start */}

        {/* Body of Block Modal form */}
        <RoomModal
          populateTable={populateTable}
          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          idValue={idValue}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
          handleOpen={handleOpen}
          handleClose={handleClose}
          facilityOptions={facilityOptions}
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
            tableApiFunc={fetchAllRoom}
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
      </div>
    </>
  );
}
export default Room;
