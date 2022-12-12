//imports from react library
import { useState, useEffect } from "react";

import * as React from "react";

//imports from material ui library
import { Button } from "@mui/material";
import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";

//importing the BlockModal form
import BlockModal from "./BlockModal";

//import the Commonmastertable component
import CommonMasterTable from "../../../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import SearchIcon from "@mui/icons-material/Search";

//importing the asynchronous function from BlockService file
import {
  fetchAllBlock,
  autoSearchBlock,
  deleteBlockById,
} from "../../../../../services/infrastructure/block/BlockServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";

import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";
//imports from react hook form
import { useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

//body of Block component
function Block() {
  let unitIdValue = null;

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
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

  //Select unit dropdown
  const [unitOptions, setUnitOptions] = useState([]);

  //Current option displayed on the "Select Unit" dropdown
  const [currentUnitOption, setCurrentUnitOption] = useState({});

  //Current id of the selected unit
  const [unitId, setUnitId] = useState(null);

  const [blockId, setBlockId] = useState(null);

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setIdValue] = useState("");

  //The state variable to store the id for delete operation
  const [deleteFlag, setDeleteFlag] = useState(false);

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  //for recalling api
  const [searchString, setSearchString] = React.useState("");

  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [autoCompleteObj, setAutoCompleteObj] = useState("");

  //populate the table upon chnages in the rowsPerPage and page state variable

  //yup schema
  const schema = yup.object().shape({
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    unit: null,
  };

  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  const resetAllDropdown = {
    unit: defaultAllDropdown,
  };

  //For search POST Request , set the searchObj into the following variable
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //populate the table upon chnages in the rowsPerPage and page state variable
  useEffect(() => {
    console.log("useEffect was called");
    console.log("filter data");
    console.log("searchString in useEffect is " + searchString);
    console.log("unitId in useEffect is " + unitId);
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
      unit: unitId,
    };

    console.log("defaultParams are");
    console.log(defaultParams);
    fetchAllBlock(defaultParams)
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
  }, [searchString, unitId]);

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
    fetchAllBlock(obj)
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

    if (autoCompleteObj !== "") {
      setSearchString(autoCompleteObj.block);
      console.log("The search value is " + autoCompleteObj.block);
    } else if (autoCompleteObj === "") {
      setSearchString("");
      console.log("The search value is empty");
    }
    console.log("The current unit dropdown option is");
    console.log(JSON.stringify(getValues("unit")));
    setUnitId(getValues("unit").id);
  };

  //This function is props to the Searchbar component
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);
    if (autoSearchString !== "") {
      autoSearchBlock(autoSearchString)
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

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);
  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.

  //event listener function for edit icon
  function editRow(blockInfo) {
    setEdit(true);
    console.log(blockInfo);
    console.log(blockInfo.Id);
    setIdValue(blockInfo.Id);

    //open the modal form
    handleOpen();

    //the current displayed value of the Select Unit dropdown
    console.log(
      "Current option in the Dropdown field is " +
        JSON.stringify(getValues("unit"))
    );
    setCurrentUnitOption(getValues("unit"));
  }

  //event listener function for view functionalitbedsy
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    handleOpenChild(); //open the confirmation modal
    console.log("The row to be deleted is " + JSON.stringify(row));
    setBlockId(row.Id);

    //the current value in the unit dropdown is
    console.log("The unit dropdown value is ");
    console.log(getValues("unit"));

    setUnitId(getValues("unit").id);

    if (getValues("unit").label === "All") {
      setDeleteConfirmation(
        "Are you sure you want to delete this record from 'All' units ?"
      );
    } else if (getValues("unit").label !== "All") {
      setDeleteConfirmation(
        `Are you sure you want to delete this record from ${
          getValues("unit").label
        } unit ?`
      );
      populateTable();
    }
  }

  function deleteRecord() {
    handleCloseChild();
    setOpenBackdrop(true);
    deleteBlockById(blockId, unitId)
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

  // Get request to have all the list of countries. This request belongs to the block-controller on swagger
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);

        //storing the option at the beginnning of the array
        response.data.result.unshift(defaultAllDropdown);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    populateTable();
    console.log("getUnitList() is going to be executed");
    getUnitList();

    setValue("unit", defaultAllDropdown);
  }, []);

  const onSubmitDataHandler = (formData) => {
    console.log("onSubmitDataHandler function has been invoked");

    console.log(formData);
  };

  return (
    <>
      <div className="w-full grid pt-10 mt-8 md:rounded-md px-6">
        <div className="flex justify-center text-xl">
          <h1 className="text-gray-700 font-Poppins lg:hidden">Block</h1>
        </div>
        {/* search dropdown */}
        <div className="flex gap-5 w-full">
          <h1 className="text-xl items-center text-gray-700 font-Poppins hidden lg:block">
            Block
          </h1>
          {/* searchable */}
          <div className="grid grid-cols-3 xl:grid-cols-5 gap-2 w-full">
            <div className="col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search By Block"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmitDataHandler)}>
              <div className="w-full">
                <DropdownField
                  control={control}
                  error={errors.unit}
                  name="unit"
                  placeholder="Select unit"
                  dataArray={unitOptions}
                />
              </div>
            </form>
            <div className="flex justify-between col-span-3 xl:col-span-2">
              <Button
                className=" h-9 w-9 px-2 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
              <div className="flex justify-between gap-3">
                <div>
                  <ResetButton onClick={() => reset(resetAllDropdown)} />
                </div>
                {/* Modal and table name start */}
                <div className="justify-end">
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
        {/* Modal and table name start */}

        <BlockModal
          handleClose={handleClose}
          deleteFlag={deleteFlag}
          setDeleteFlag={setDeleteFlag}
          edit={edit}
          setEdit={setEdit}
          setOpen={setOpen}
          open={open}
          handleOpen={handleOpen}
          idValue={idValue}
          populateTable={populateTable}
          data={data}
          currentUnitOption={currentUnitOption}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />

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
            tableApiFunc={fetchAllBlock}
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
        {//  data.statusCode !== undefined &&
        //   data.statusCode !== 200 &&
        recordWarning === true && spinner === false ? (
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

export default Block;
