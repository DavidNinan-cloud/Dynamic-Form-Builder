//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//importing the BedModal form
import BedModal from "./BedModal";

//import the Commonmastertable component
import BedMasterTable from "./BedMasterTable";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import SearchIcon from "@mui/icons-material/Search";

import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";

//importing the asynchronous function from BedService file
import {
  fetchAllBed,
  deleteBedById,
  autoSearchBed,
} from "../../../../../services/infrastructure/bed/BedServices";

import { getAllRoomFacility } from "../../../../../services/infrastructure/room/RoomServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

import { getFloorDropdown } from "../../../../../services/infrastructure/floor/FloorServices";

import { getWardDropdown } from "../../../../../services/infrastructure/ward/WardServices";

import { getRoomDropdown } from "../../../../../services/infrastructure/room/RoomServices";

import { getClassCategoryDropdown } from "../../../../../services/billing/class/ClassServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";

import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

//searchObj is sent with the POST request to get all the list of countries

//body of Bed component
function Bed(props) {
  let searchValue = "";
  let unitIdValue = null;
  let blockIdValue = null;
  let floorIdValue = null;
  let wardIdValue = null;
  let classtypeIdValue = null;
  let roomIdValue = null;
  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [classTypeOptions, setClasstypeOptions] = useState([]);
  const [unitId, setUnitId] = useState(null);
  const [blockId, setBlockId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [classtypeId, setClasstypeId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [bedId, setBedId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

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

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //state varible for modal open and close
  const [open, setOpen] = useState(false);

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [bedIdValue, setBedIdValue] = useState("");

  const [idUnitValue, setIdUnitValue] = useState("");

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  const [facilityOptions, setFacilityOptions] = React.useState([]);

  //Current option displayed on the "Select Unit" dropdown
  const [currentUnitOption, setCurrentUnitOption] = useState({});

  //Current option displayed on the "Select Block" dropdown
  const [currentBlockOption, setCurrentBlockOption] = useState({});

  //Current option displayed on the "Select Floor" dropdown
  const [currentFloorOption, setCurrentFloorOption] = useState({});

  //Current option displayed on the "Select Ward" dropdown
  const [currentWardOption, setCurrentWardOption] = useState({});

  //Current option displayed on the "Select Block" dropdown
  const [currentRoomOption, setCurrentRoomOption] = useState({});

  //Current option displayed on the "Select Floor" dropdown
  const [currentClasstypeOption, setCurrentClasstypeOption] = useState({});

  const [autoCompleteObj, setAutoCompleteObj] = useState("");

  const defaultValues = {
    unit: null,
    block: null,
    floor: null,
    ward: null,
    room: null,
    classType: null,
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
    ward: defaultAllDropdown,
    room: defaultAllDropdown,
    classType: defaultAllDropdown,
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
    console.log("wardid in useEffect is " + wardId);
    // showSpinner(true);
    // showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
      unit: unitId,
      block: blockId,
      floor: floorId,
      ward: wardId,
      classType: classtypeId,
      room: roomId,
    };
    fetchAllBed(defaultParams)
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
  }, [searchString, unitId, blockId, floorId, wardId, classtypeId, roomId]);

  // //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  // useEffect(() => {
  //   populateTable(searchObj);
  // }, []);

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
    fetchAllBed(obj)
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
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //event listener function for the magnifying glass icon of the search bar
  // const filterData = () => {
  //   setPage(0);
  //   setSearchString(searchValue);
  // };

  // event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    console.log("filter");

    if (autoCompleteObj !== "") {
      setSearchString(autoCompleteObj.bed);
      console.log("The search value is " + autoCompleteObj.bed);
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
    console.log("The current ward dropdown option is");
    console.log(JSON.stringify(getValues("ward")));
    setWardId(getValues("ward").id);
    console.log("The current category dropdown option is");
    console.log(JSON.stringify(getValues("classType")));
    setClasstypeId(getValues("classType").id);
    console.log("The current room dropdown option is");
    console.log(JSON.stringify(getValues("room")));
    setRoomId(getValues("room").id);
  };

  // searchValue = autoSearchString;
  //This function is props to the Searchbar component
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchBed(autoSearchString)
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
      setAutoCompleteObj("");
    } else {
      setAutoCompleteObj(value);
      console.log(JSON.stringify(value));
      wardIdValue = getValues("ward").id;
      console.log("The ward id is " + wardIdValue);
      floorIdValue = getValues("floor").id;
      console.log("The floor id is " + floorIdValue);
      blockIdValue = getValues("block").id;
      console.log("The block id is " + blockIdValue);
      unitIdValue = getValues("unit").id;
      console.log("The unit id is " + unitIdValue);
      classtypeIdValue = getValues("classType").id;
      console.log("The classType id is " + classtypeIdValue);
      roomIdValue = getValues("room").id;
      console.log("The room id is " + roomIdValue);
    }
  };

  //event listener function for edit icon
  function editRow(BedInfo) {
    setEdit(true);
    // console.log("Bedinfo obj is");
    // console.log(BedInfo);

    let unitIdVal = getValues("unit");
    setIdUnitValue(unitIdVal.id);
    setBedIdValue(BedInfo.Id);

    // console.log("BedInfo id is " + BedInfo.Id);
    // console.log("unit dropdown obj is " + JSON.stringify(unitIdVal));

    // console.log("unit object is");
    // console.log(getValues("unit"));

    //When we click on edit pencil ; show Cancel and Update button
    //open the modal form
    handleOpen();
    getAllRoomFacility()
      .then((response) => {
        console.log("The response of getAllFacility get request is ");
        console.log(response);
        console.log("The facilities are");
        console.log(response.data.result);
        setFacilityOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    setCurrentUnitOption(getValues("unit"));
    setCurrentBlockOption(getValues("block"));
    setCurrentFloorOption(getValues("floor"));
    setCurrentWardOption(getValues("ward"));
    setCurrentRoomOption(getValues("room"));
    setCurrentClasstypeOption(getValues("classType"));
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handleOpenChild();
    console.log(row.Id);
    setBedId(row.Id);

    setUnitId(getValues("unit").id);
    setBlockId(getValues("block").id);
    setFloorId(getValues("floor").id);
    setWardId(getValues("ward").id);
    setRoomId(getValues("room").id);
    setClasstypeId(getValues("classType").id);

    if (
      getValues("unit").label === "All" &&
      getValues("block").label === "All" &&
      getValues("floor").label === "All" &&
      getValues("ward").label === "All" &&
      getValues("room").label === "All" &&
      getValues("classType").label === "All"
    ) {
      setDeleteConfirmation(
        "Are you sure you want to delete this record from 'All' rooms ?"
      );
    } else if (
      getValues("unit").label !== "All" &&
      getValues("block").label !== "All" &&
      getValues("floor").label !== "All" &&
      getValues("ward").label !== "All" &&
      getValues("room").label !== "All" &&
      getValues("classType").label !== "All"
    ) {
      setDeleteConfirmation(
        `Are you sure you want to delete this record from ${
          getValues("room").label
        } room ?`
      );
      populateTable();
    }
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    handleCloseChild();
    setOpenBackdrop(true);
      deleteBedById(
        bedId,
        classtypeId,
        roomId,
        wardId,
        floorId,
        blockId,
        unitId
      )
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

  //Get request to have all the list of countries. This request belongs to the bed-controller on swagger
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

      // setValue("ward", null);
      // setWardOptions([]);
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
    setValue("ward", defaultAllDropdown);
  }, []);

  function updateFloorOptions(unitId, blockId) {
    getFloorDropdown(unitId, blockId)
      .then((response) => {
        setValue("floor", null);
        setFloorOptions(response.data.result);
        response.data.result.unshift(defaultAllDropdown);

        // setValue("ward", null);
        // setWardOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (unitId !== null && blockId !== null) {
      updateFloorOptions(unitId, blockId);
      // setValue("floor", defaultAllDropdown);
    }
  }, [unitId, blockId]);

  // useEffect(() => {
  //   console.log("getFloorList() is going to be executed");
  //   // getFloorDropdown();
  // }, []);

  function updateWardOptions(unitId, blockId, floorId) {
    getWardDropdown(unitId, blockId, floorId)
      .then((response) => {
        setValue("ward", null);
        setWardOptions(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (unitId !== null && blockId !== null && floorId !== null) {
      updateWardOptions(unitId, blockId, floorId);
    }
  }, [unitId, blockId, floorId]);

  // useEffect(() => {
  //   // console.log("getWardList() is going to be executed");
  //   // getWardDropdown();

  // }, []);

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  function getRoomList() {
    getRoomDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        setRoomOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getRoomList() is going to be executed");
    getRoomList();
    setValue("room", defaultAllDropdown);
  }, []);

  function getCategoryList() {
    getClassCategoryDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        setClasstypeOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getCategoryList() is going to be executed");
    getCategoryList();
    setValue("classType", defaultAllDropdown);
  }, []);

  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700  lg:hidden">Bed</h1>
        </div>
        <div className=" w-full">
          {/* search dropdown */}
          <div className="flex w-full  gap-2">
            <div>
              <h1 className="text-xl text-gray-700  hidden lg:block">Bed</h1>
            </div>
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 w-full">
              {/* searchable */}
              <div className="w-full col-span-3 xl:col-span-2">
                <SearchBar
                  name="SearchableSelect"
                  placeholder="Search By Bed"
                  dataArray={options}
                  handleInputChange={handleChange}
                  onChange={autoSelectedValue}
                  // selectedObj={selectedObj}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.unit}
                  name="unit"
                  placeholder="Unit"
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
                  placeholder="Block"
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
              <div className=" w-full">
                <DropdownField
                  control={control}
                  error={errors.classType}
                  name="classType"
                  placeholder="Category"
                  dataArray={classTypeOptions}
                  isDisabled={props.edit}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.floor}
                  name="floor"
                  placeholder="Floor"
                  dataArray={floorOptions}
                  inputRef={{
                    ...register("floor", {
                      onChange: (e) => {
                        console.log(e.target.value);
                        setFloorId(e.target.value.id);
                        // updateWardOptions(e.target.value);
                        console.log(e.target.value);
                      },
                    }),
                  }}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.ward}
                  name="ward"
                  placeholder="Ward"
                  dataArray={wardOptions}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.room}
                  name="room"
                  placeholder="Room"
                  dataArray={roomOptions}
                  //isDisabled={props.edit}
                />
              </div>
              <div className="flex justify-between col-span-3 xl:col-span-2">
                <div className="flex gap-4">
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
                <div className="flex gap-3 justify-end">
                  <ResetButton onClick={() => reset(resetAllDropdown)} />
                  <AddNewButton
                    onClick={() => {
                      handleOpen();
                      getAllRoomFacility()
                        .then((response) => {
                          console.log(
                            "The response of getAllFacility get request is "
                          );
                          console.log(response);
                          console.log("The facilities are");
                          console.log(response.data.result);
                          setFacilityOptions(response.data.result);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  />
                </div>
              </div>
                <CommonBackDrop openBackdrop={openBackdrop} />
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
            <BedMasterTable
              tableApiFunc={fetchAllBed}
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

          {/* Modal and table name start */}
        </div>

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

        <div>
          <BedModal
            populateTable={populateTable}
            edit={edit}
            setEdit={setEdit}
            open={open}
            setOpen={setOpen}
            bedIdValue={bedIdValue}
            idUnitValue={idUnitValue}
            openBackdrop={openBackdrop}
            setOpenBackdrop={setOpenBackdrop}
            handleOpen={handleOpen}
            handleClose={handleClose}
            facilityOptions={facilityOptions}
            currentUnitOption={currentUnitOption}
            currentBlockOption={currentBlockOption}
            currentFloorOption={currentFloorOption}
            currentWardOption={currentWardOption}
            currentRoomOption={currentRoomOption}
            currentClasstypeOption={currentClasstypeOption}
          />
        </div>
        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg={deleteConfirmation}
          confirmationButtonMsg="Delete"
        />
      </div>
    </>
  );
}

export default Bed;
