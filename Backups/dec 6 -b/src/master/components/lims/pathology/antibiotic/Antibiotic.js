import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CommonMasterTable from "../../../../components/../../Common Components/CommonTable/CommonMasterTable";

import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AntibioticModal from "../antibiotic/AntibioticModal";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  fetchAllAntibiotics,
  deleteAntibioticById,
  autoSearchAntibiotic,
} from "../../../../services/lims/pathology/AntibioticServices";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";

const Antibiotic = () => {
  const [open, setOpen] = useState(false);
  let searchValue = "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState();
  const [spinner, showSpinner] = useState(false);
  const [options, setOptions] = React.useState([]);
  const [countClick, setCountClick] = React.useState(0);

  const [recordWarning, showRecordWarning] = useState(false);

  const [searchString, setSearchString] = useState("");

  const [idValue, setIdValue] = useState("");
  const [dataResult, setDataResult] = useState([]);

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);

  const [data, setData] = useState({ result: [], actions: [] });

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

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  function editRow(antibiotic) {
    setEdit(true);
    console.log("antibiotic", antibiotic);
    console.log(antibiotic.Id);
    setIdValue(antibiotic.Id);

    //When we click on edit pencil ; show Cancel and Update button

    //open the modal form
    handelOpen();
  }

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

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

    deleteAntibioticById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
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

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllAntibiotics(defaultParams)
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
    fetchAllAntibiotics(obj)
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
      autoSearchAntibiotic(autoSearchString)
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
      searchValue = value.AntibioticName;
    }
  };
  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="">
          <div className="row ">
            {/* search TextField */}

            {/* Add button to open the Modal Form and table name start */}
            <div className="flex justify-between items-center w-full  mt-4 rounded">
              <div className="flex items-center space-x-4 w-full">
                <h1 className="text-xl text-gray-700 font-Poppins ">
                  Antibiotic
                </h1>
                <div className="flex items-center gap-x-2 w-full xl:w-3/5">
                  <SearchBar
                    type="button"
                    name="SearchableSelect"
                    placeholder="Search by Antibiotic Code/Name"
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
                    className=" h-11 w-10 px-2 rounded-md text-gray-500"
                    type="button"
                  >
                    <TuneIcon className="cursor-pointer" />
                  </Button>
                </div>
              </div>
              <div className="grid justify-end">
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
                  Add
                </Button>

                {/* Body of country Modal form */}
                {open ? (
                  <AntibioticModal
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
              </div>
            </div>
          </div>

          <ConfirmationModal
            confirmationOpen={openChild}
            confirmationHandleClose={handleCloseChild}
            confirmationSubmitFunc={deleteRecord}
            confirmationLabel="Confirmation "
            confirmationMsg="Are You Sure you want to delete the record?"
            confirmationButtonMsg="Delete"
          />

          {/* CommonMasterTable Component */}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <CommonMasterTable
              //data to be displayed
              dataResult={dataResult}
              tableApiFunc={fetchAllAntibiotics}
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
              // DownloadTableData={DownloadTableData}
            />
          ) : null}
          {recordWarning === true && spinner === false ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Antibiotic;
