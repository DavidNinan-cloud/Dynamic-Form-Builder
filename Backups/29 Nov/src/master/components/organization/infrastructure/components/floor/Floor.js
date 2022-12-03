//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";
import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";

//importing the FloorModal form
import FloorModal from "./FloorModal";

//import the CommonMasterTable component
import CommonMasterTable from "../../../../../../Common Components/CommonTable/CommonMasterTable";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";

//importing the asynchronous function from FloorService file
import {
  fetchAllFloor,
  autoSearchFloor,
  deleteFloorById,
} from "../../../../../services/infrastructure/floor/FloorServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import { useForm } from "react-hook-form";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

//body of Floor Component
function Floor() {
  let unitIdValue = null;
  let blockIdValue = null;

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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

  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
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

  const [unitId, setUnitId] = useState(null);

  const [blockId, setBlockId] = useState(null);

  const [recordWarning, showRecordWarning] = React.useState(false);

  //Current option displayed on the "Select Unit" dropdown
  const [currentUnitOption, setCurrentUnitOption] = useState({});

  //Current option displayed on the "Select Block" dropdown
  const [currentBlockOption, setCurrentBlockOption] = useState({});

  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [floorId, setFloorId] = useState("");

  const [autoCompleteObj, setAutoCompleteObj] = useState("");

  const defaultValues = {
    unit: null,
    block: null,
  };
  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  const resetAllDropdown = {
    unit: defaultAllDropdown,
    block: defaultAllDropdown,
  };

  const {
    control,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  //Before the component gets mounted , call the asynchronous function fetchAllFloor(). And resolve the promise returned by that function.
  // useEffect(() => {
  //   populateTable();
  // }, []);

  //populate the table upon chnages in the rowsPerPage and page state variable
  useEffect(() => {
    console.log("useEffect was called");
    console.log("filter data");
    console.log("searchString in useEffect is " + searchString);
    console.log("unitId in useEffect is " + unitId);
    console.log("blockid in useEffect is " + blockId);
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
      unit: unitId,
      block: blockId,
    };

    console.log("defaultParams are");
    console.log(defaultParams);

    fetchAllFloor(defaultParams)
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
  }, [searchString, unitId, blockId]);



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
    fetchAllFloor(obj)
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

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    console.log("filter");

    if (autoCompleteObj !== "") {
      setSearchString(autoCompleteObj.floor);
      console.log("The search value is " + autoCompleteObj.floor);
    } else if (autoCompleteObj === "") {
      setSearchString("");
      console.log("The search value is empty");
    }

    console.log("The current unit dropdown option is");
    console.log(JSON.stringify(getValues("unit")));
    setUnitId(getValues("unit").id);
    console.log("The current block dropdown option is");
    console.log(JSON.stringify(getValues("block")));
    setBlockId(getValues("block").id);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);
    if (autoSearchString !== "") {
      autoSearchFloor(autoSearchString)
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
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    if (value === null) {
      setAutoCompleteObj("");
    } else {
      setAutoCompleteObj(value);
      console.log(JSON.stringify(value));
      blockIdValue = getValues("block").id;
      console.log("The block id is " + blockIdValue);
      unitIdValue = getValues("unit").id;
      console.log("The unit id is " + unitIdValue);
    }
  };

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
  //handleClose function closes the modal form
  const handleClose = () => setOpen(false);

  //event listener function for edit icon
  function editRow(floorInfo) {
    setEdit(true);
    console.log(floorInfo);
    console.log("The id for updating is " + JSON.stringify(floorInfo.Id));
    setIdValue(floorInfo.Id);
    //When we click on edit pencil ; show Cancel and Update button
    //open the modal form
    handleOpen();

    setCurrentUnitOption(getValues("unit"));
    setCurrentBlockOption(getValues("block"));
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    console.log("Delete confirmed", row.Id);
    setFloorId(row.Id);

    setUnitId(getValues("unit").id);
    setBlockId(getValues("block").id);

    if (
      getValues("unit").label === "All" &&
      getValues("block").label === "All"
    ) {
      setDeleteConfirmation(
        "Are you sure you want to delete this record from 'All' blocks ?"
      );
    } else if (
      getValues("unit").label !== "All" &&
      getValues("block").label !== "All"
    ) {
      setDeleteConfirmation(
        `Are you sure you want to delete this record from ${
          getValues("block").label
        } block ?`
      );
      populateTable();
    }
  }
  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
      deleteFloorById(floorId, blockId, unitId)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            populateTable();
            deleteAlert(response.data.message);
            setOpenBackdrop(false);
          }
        })
        .catch((error) => {
          setOpenBackdrop(false);
          errdeleteAlert(error.message);
        });
  }

  // Get request to have all the list of countries. This request belongs to the Floor-controller on swagger
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Store all the options of the unit Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
    setValue("unit", defaultAllDropdown);
  }, []);

  function updateBlockOptions(unitId) {
    console.log("The unit id is " + unitId);

    getBlockDropdown(unitId).then((response) => {
      console.log("The response for unitId is " + unitId);

      console.log(JSON.stringify(response));

      //response.data.result

      setBlockOptions(response.data.result);
      response.data.result.unshift(defaultAllDropdown);
    });
  }

  useEffect(() => {
    console.log("getBlockList() is going to be executed");
    getBlockDropdown();
    setValue("block", defaultAllDropdown);
  }, []);

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700 lg:hidden">Floor</h1>
        </div>
        {/* search dropdown */}
        <div className="flex gap-4 w-full">
          <h1 className="text-xl text-gray-700 hidden lg:block">Floor</h1>
          {/* searchable */}
          <div className="gap-2 w-full grid grid-cols-3 xl:grid-cols-6 gap-y-5">
            <div className="col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by Floor"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.unit}
                name="unit"
                placeholder="Select Unit"
                dataArray={unitOptions}
                inputRef={{
                  ...register("unit", {
                    onChange: (e) => {
                      console.log(
                        "Selected unit obj is " + JSON.stringify(e.target.value)
                      );
                      updateBlockOptions(e.target.value.id);
                    },
                  }),
                }}
              />
            </div>
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.block}
                name="block"
                placeholder="Select Block"
                dataArray={blockOptions}
                //isDisabled={props.edit}
              />
            </div>
            <div className="flex justify-between gap-4 w-full col-span-2">
              <div className="flex justify-between">
                <Button
                  className="h-10 w-9 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
              </div>
              <div className="flex justify-center gap-3">
                <div>
                  <ResetButton onClick={() => reset(resetAllDropdown)} />
                </div>
                <div className="justify-end">
                  {/* Modal for Add */}
                  <AddNewButton
                    onClick={() => {
                      handleOpen();
                    }}
                  />
                </div>
                <CommonBackDrop openBackdrop={openBackdrop} />
              </div>
            </div>
          </div>
        </div>
        {/* Body of Floor Modal form */}
        {open ? (
          <FloorModal
            handleClose={handleClose}
            edit={edit}
            setEdit={setEdit}
            setOpen={setOpen}
            open={open}
            handleOpen={handleOpen}
            idValue={idValue}
            populateTable={populateTable}
            currentUnitOption={currentUnitOption}
            currentBlockOption={currentBlockOption}
            openBackdrop={openBackdrop}
            setOpenBackdrop={setOpenBackdrop}
          />
        ) : null}

        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg={deleteConfirmation}
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
            tableApiFunc={fetchAllFloor}
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
export default Floor;
