//imports from react library
import * as React from "react";
import { useEffect } from "react";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddNewButton from "../../../Common Components/Buttons/AddNewButton";
//LodingSpinner
import LoadingSpinner from "../../components/common/loadingspinner/loadingSpinner";

//internal project functions and componants import
import {
  autoSearchReferBy,
  fetchAllReferBy,
  deleteReferById,
} from "../../services/referal/ReferByServices";
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
//fromfield control liberary componant import
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import ReferByModal from "./ReferByModal";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
//function start
export default function ReferBy() {
  let searchValue = "";

  const [searchString, setSearchString] = React.useState("");

  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = React.useState();

  

  const [options, setOptions] = React.useState([]);
  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);
  //add edit update and cancel button
  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");
  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idValue, setidValue] = React.useState("");

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllReferBy(defaultParams)
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
    fetchAllReferBy(obj)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
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
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
        showRecordWarning(true);
      });
  };

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchReferBy(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
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
      searchValue = value.ReferBy;
    }
  };

  //event listener function for edit icon
  function editRow(referby) {
    setEdit(true);
    console.log("Refer by object is " + JSON.stringify(referby));
    console.log("Required id is Refer by" + referby.Id);
    setidValue(referby.Id);
    handleOpen();
  }

  //VIEW Functionaity
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  // function to delete the table data
  function deleteRow(row) {
    handelOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
    deleteReferById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }

        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        setOpenBackdrop(false);
        errdeleteAlert(error.message);
      });
  } //start JSX Elements
  return (
    <>
      {/* <div className="w-full "> */}
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-gray-700 font-Poppins lg:hidden ">Refer By</h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex gap-2 w-full items-center mt-2 ">
          {/* <div className=" flex items-center w-full gap-14"> */}
          <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block w-[15%]">
            Refer By
          </h1>
          <div className="flex w-full lg:grid grid-cols-2 gap-2 items-center ">
            <div className="grid w-full grid-cols-1">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by Refer By Code/Name"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex  gap-2">
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
              <Button
                className=" h-9 w-10 px-2 rounded-md text-gray-500"
                type="button"
              >
                <TuneIcon className="cursor-pointer" />
              </Button>
            </div>
          </div>
          {/* </div> */}

          <div className="grid justify-end xl:col-span-3 w-1/3">
            {/* Modal for Add */}
            <AddNewButton
              onClick={() => {
                handleOpen();
              }}
            />
          </div>
          <CommonBackDrop openBackdrop={openBackdrop} />
        </div>

        {spinner ? (
          <div className="grid justify-center pt-28">
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
            tableApiFunc={fetchAllReferBy}
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
            <h3 className="flex justify-center mt-28 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

        {open ? (
          <ReferByModal
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
      {/* </div> */}
    </>
  );
}
