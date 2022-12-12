//imports from react library
import { useState, useEffect } from "react";
import * as React from "react";
//imports from material ui library
import { Button } from "@mui/material";
import WardModal from "./WardModal";
//import the CommonMasterTable component
import CommonMasterTable from "../../../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import SearchIcon from "@mui/icons-material/Search";

import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";
//importing the asynchronous function from wardService file
import {
  fetchAllWard,
  autoSearchWard,
  deleteWardById,
} from "../../../../../services/infrastructure/ward/WardServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

import { getFloorDropdown } from "../../../../../services/infrastructure/floor/FloorServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";

import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";

import { useForm } from "react-hook-form";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

//searchObj is sent with the POST request to get all the list of countries

//body of ward Component
function Ward() {
  let searchValue = "";
  let unitIdValue = null;
  let blockIdValue = null;
  let floorIdValue = null;

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [unitId, setUnitId] = useState(null);
  const [blockId, setBlockId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

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

  //Current option displayed on the "Select Unit" dropdown
  const [currentUnitOption, setCurrentUnitOption] = useState({});

  //Current option displayed on the "Select Block" dropdown
  const [currentBlockOption, setCurrentBlockOption] = useState({});

  //Current option displayed on the "Select Floor" dropdown
  const [currentFloorOption, setCurrentFloorOption] = useState({});

  const [autoCompleteObj, setAutoCompleteObj] = useState("");

  const defaultValues = {
    unit: null,
    block: null,
    floor: null,
  };
  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  const resetAllDropdown = {
    unit: defaultAllDropdown,
    block: defaultAllDropdown,
    floor: defaultAllDropdown,
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
  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("useEffect was called");
    console.log("filter data");
    console.log("searchString in useEffect is " + searchString);
    console.log("unitId in useEffect is " + unitId);
    console.log("blockid in useEffect is " + blockId);
    console.log("floorid in useEffect is " + floorId);
    // showSpinner(true);
    // showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
      unit: unitId,
      block: blockId,
      floor: floorId,
    };
    fetchAllWard(defaultParams)
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
  }, [searchString, unitId, blockId, floorId]);

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
    fetchAllWard(obj)
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
    console.log("filter");

    if (autoCompleteObj !== "") {
      setSearchString(autoCompleteObj.ward);
      console.log("The search value is " + autoCompleteObj.ward);
    } else if (autoCompleteObj === "") {
      setSearchString("");
      console.log("The search value is empty");
    }

    // console.log("The search value is " + searchValue);
    // setSearchString(searchValue);
    console.log("The current unit dropdown option is");
    console.log(JSON.stringify(getValues("unit")));
    setUnitId(getValues("unit").id);
    console.log("The current block dropdown option is");
    console.log(JSON.stringify(getValues("block")));
    setBlockId(getValues("block").id);
    console.log("The current floor dropdown option is");
    console.log(JSON.stringify(getValues("floor")));
    setFloorId(getValues("floor").id);
  };
  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchWard(autoSearchString)
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
      floorIdValue = getValues("floor").id;
      console.log("The floor id is " + floorIdValue);
      blockIdValue = getValues("block").id;
      console.log("The block id is " + blockIdValue);
      unitIdValue = getValues("unit").id;
      console.log("The unit id is " + unitIdValue);
    }
  };
  //event listener function for edit icon
  function editRow(WardInfo) {
    setEdit(true);
    console.log(WardInfo);
    console.log(WardInfo.Id);
    setIdValue(WardInfo.Id);
    //When we click on edit pencil ; show Cancel and Update button
    //open the modal form
    handleOpen();
    setCurrentUnitOption(getValues("unit"));
    setCurrentBlockOption(getValues("block"));
    setCurrentFloorOption(getValues("floor"));
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    console.log(row.Id);
    setWardId(row.Id);

    setUnitId(getValues("unit").id);
    setBlockId(getValues("block").id);
    setFloorId(getValues("floor").id);

    if (
      getValues("unit").label === "All" &&
      getValues("block").label === "All" &&
      getValues("floor").label === "All"
    ) {
      setDeleteConfirmation(
        "Are you sure you want to delete this record from 'All' floors ?"
      );
    } else if (
      getValues("unit").label !== "All" &&
      getValues("block").label !== "All" &&
      getValues("floor").label !== "All"
    ) {
      setDeleteConfirmation(
        `Are you sure you want to delete this record from ${
          getValues("floor").label
        } floor ?`
      );
      populateTable();
    }
  }
  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    handleCloseChild();
    setOpenBackdrop(true);
      deleteWardById(wardId, floorId, blockId, unitId)
        .then((response) => {
          console.log(response);
          console.log(typeof response.data.statusCode);
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

  //Getting Unit List grom API
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        // getBlockList(response.data.result.id);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
    setValue("unit", defaultAllDropdown);
  }, []);

  function updateBlockOptions(unitId) {
    getBlockDropdown(unitId).then((response) => {
      setValue("block", null);
      setBlockOptions(response.data.result);
      response.data.result.unshift(defaultAllDropdown);
      // setValue("floor", null);
      // setFloorOptions([]);
    });
  }
  useEffect(() => {
    if (unitId !== null) {
      //call the dropdown service for block
      updateBlockOptions(unitId);
    }
  }, [unitId]);
  useEffect(() => {
    // getBlockDropdown();
    setValue("block", defaultAllDropdown);
    setValue("floor", defaultAllDropdown);
  }, []);

  function updateFloorOptions(unitId, blockId) {
    getFloorDropdown(unitId, blockId)
      .then((response) => {
        setValue("floor", null);
        setFloorOptions(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // useEffect(() => {
  //   // getFloorDropdown();

  // }, []);

  useEffect(() => {
    if (unitId !== null && blockId !== null) {
      //call the dropdown service for floor
      updateFloorOptions(unitId, blockId);
    }
  }, [unitId, blockId]);

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl mb-4">
          <h1 className="text-gray-700 font-Poppins lg:hidden">Ward</h1>
        </div>
        <div className="w-full grid mt-2 md:rounded-md">
          {/* search TextField */}
          <div className="gap-4 w-full flex">
            <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
              Ward
            </h1>
            <div className="grid grid-cols-3 xl:grid-cols-8 w-full gap-2 gap-y-5">
              {/* searchable */}
              <div className="w-full col-span-2">
                <SearchBar
                  name="SearchableSelect"
                  placeholder="Search by Ward"
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
                        console.log("unit id is ");
                        console.log(e.target.value.id);
                        setUnitId(e.target.value.id);
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
                  inputRef={{
                    ...register("block", {
                      onChange: (e) => {
                        console.log("block id is ");
                        console.log(e.target.value.id);
                        setBlockId(e.target.value.id);
                      },
                    }),
                  }}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.floor}
                  name="floor"
                  placeholder="Select Floor"
                  dataArray={floorOptions}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="flex justify-end xl:justify-start col">
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
              <div className="flex justify-end gap-3 col-span-3 xl:col-span-2">
                <ResetButton onClick={() => reset(resetAllDropdown)} />
                {/* When the Add button is clicked ; the modal form opens */}
                <AddNewButton
                  onClick={() => {
                    handleOpen();
                  }}
                />
              </div>
              <CommonBackDrop openBackdrop={openBackdrop} />
            </div>
          </div>
          {/* Body of Block Modal form */}
          <WardModal
            populateTable={populateTable}
            edit={edit}
            setEdit={setEdit}
            open={open}
            setOpen={setOpen}
            idValue={idValue}
            handleOpen={handleOpen}
            handleClose={handleClose}
            currentUnitOption={currentUnitOption}
            currentBlockOption={currentBlockOption}
            currentFloorOption={currentFloorOption}
            openBackdrop={openBackdrop}
            setOpenBackdrop={setOpenBackdrop}
          />

          {/* Add button to open the Modal Form and table name start */}

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
              tableApiFunc={fetchAllWard}
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
      </div>
    </>
  );
}
export default Ward;
