import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import CabinTable from "./CabinTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { 
  fetchAllCabin,
  autoSearchCabin, 
  deleteCabinById,
} from "../../services/organization/CabinServices";
import ModalCabin from "./ModalCabin";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../Common Components/Buttons/AddNewButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";

export default function Cabin() {
  let searchValue = "";
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);

  const [options, setOptions] = React.useState([]);

  const [edit, setEdit] = React.useState(false); //EditBtn and SaveBtn

  const [deleteId, setDeleteId] = React.useState("");

  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  const [openChild, setOpenChild] = React.useState(false);
  const [idValue, setIdValue] = React.useState("");

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };
  //useState and handle Methods for Fiter Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let cabinList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  const editRow = (cabin) => {
    setEdit(true);
    console.log("cabn object is " + JSON.stringify(cabin));
    console.log("Required id is cabinId" + cabin.id);
    setIdValue(cabin.id);
    handleOpen();
  };

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handelOpenChild();
    console.log(row.id);
    setDeleteId(row.id);
  }

  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    handleCloseChild();
    setOpenBackdrop(true);
    deleteCabinById(deleteId)
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

  //event listener for search icon
  const filterData = () => {
    console.log("filterData call");
    setPage(0);
    setSearchString(searchValue);
  };

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchCabin(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };

  const autoSelectedValue = (value) => {
    // console.log(
    //   "The auto-complete object clicked by user is " + JSON.stringify(value)
    // );
    // if (value === null) {
    //   setSearchString("");
    // } else {
    //   searchValue = value.weekday;
    // }

    if (value !== null) {
      searchValue = value.cabin;
    } else {
      console.log("value", value);
      searchValue = "";
      setPage(0);
      setSearchString(searchValue);
    }
  };

  const populateTable = () => {
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true); // fetching data from server that time spinner show / loading
    showRecordWarning(false);
    fetchAllCabin(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          cabinList.result.push(jsonObject);
        });

        cabinList.actions = [...res.actions];
        cabinList.statusCode = res.statusCode;
        console.log(cabinList);
        setData(cabinList);
        setDataResult(cabinList.result);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
      })
      .catch(() => {
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
        showRecordWarning(true);
      });
  };

  const stringSearchObj = {
    page: 0,
    size: rowsPerPage,
    searchString: searchString,
  };

  useEffect(() => {
    callTableDataApi();
  }, [searchString]);

  const callTableDataApi = () => {
    showSpinner(true);
    showRecordWarning(false);
    fetchAllCabin(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          cabinList.result.push(jsonObject);
        });

        cabinList.actions = [...res.actions];
        cabinList.statusCode = res.statusCode;
        console.log(cabinList);
        setData(cabinList);
        setDataResult(cabinList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-black font-Poppins lg:hidden ">Cabin</h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex gap-2 w-full items-center mt-2">
          <h1 className="text-xl text-black font-Poppins hidden lg:block">
            Cabin
          </h1>

          <div className="grid grid-cols-6 xl:grid-cols-6 w-full gap-2 items-center ">
            <div className="w-full col-span-3 xl:col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by CabinCode/CabinName"
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
          <CommonBackDrop openBackdrop={openBackdrop} />
        </div>

        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CabinTable
            tableApiFunc={fetchAllCabin}
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

        <ModalCabin
          populateTable={populateTable}
          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          idValue={idValue}
          countClick={countClick}
          setCountClick={setCountClick}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
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