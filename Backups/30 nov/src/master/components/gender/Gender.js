import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import {
  fetchAllGender,
  autoSearchGender,
  deleteGenderById,
} from "../../services/gender/GenderServices";
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import ModalGender from "./ModalGender";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import AddNewButton from "../../../Common Components/Buttons/AddNewButton";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";

export default function PatientGender() {
  let searchValue = "";
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [options, setOptions] = React.useState([]);
  //Add Edit Update Cancel Button
  const [edit, setEdit] = React.useState(false);
  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");
  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setIdValue] = React.useState("");
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
  //useState and handle Methods for Modal Open & Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllGender(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        console.log(
          "1st record is : " + JSON.stringify(response.data.result[0])
        );
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
    fetchAllGender(obj)
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
      autoSearchGender(autoSearchString)
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
      searchValue = value.gender;
    }
  };

  //event listener function for edit icon
  function editRow(gender) {
    setEdit(true);
    console.log("gender object is " + JSON.stringify(gender));
    console.log("Required id is genderId" + gender.Id);
    setIdValue(gender.Id);
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
    deleteGenderById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }
        handleCloseChild();
      })
      .catch((error) => {
        setOpenBackdrop(false);
        errdeleteAlert(error.message);
      });
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className="text-black font-Poppins lg:hidden ">Gender</h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex gap-2 w-full items-center mt-2">
          <h1 className="text-xl text-black font-Poppins hidden lg:block">
            Gender
          </h1>

          <div className="grid grid-cols-6 w-full gap-2 items-center ">
            <div className="w-full col-span-3 xl:col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by GenderCode/Name"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <SearchIconButton onClick={filterData} />
                <Button
                  className=" h-9 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="grid justify-end col-span-2 xl:col-span-3 w-full">
              {/* Modal for Add */}
              <AddNewButton
                onClick={() => {
                  handleOpen();
                }}
              />
            </div>
          </div>
          {/* Backdrop component to disable the screen after submitting the form */}
          <CommonBackDrop openBackdrop={openBackdrop} />
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
            tableApiFunc={fetchAllGender}
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

        <ModalGender
          populateTable={populateTable}
          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          idValue={idValue}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />

        {/* DELETE Confirmation  */}
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
