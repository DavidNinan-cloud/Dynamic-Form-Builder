import * as React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import CommonMasterTable from "../../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import {
  fetchAllDrAdvice,
  autoSearchDoctorAdvice,
  deleteDrAdviceById,
} from "../../../services/opd/dradvice/DrAdviceService";
import TuneIcon from "@mui/icons-material/Tune";
import ModalDoctorAdvice from "./ModalDoctorAdvice";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";
import SearchIconButton from "../../../../Common Components/Buttons/SearchIconButton";

export default function DoctorAdvice() {
  let searchValue = "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  //for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false); //EditBtn and SaveBtn
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setIdValue] = React.useState("");
  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };
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
    fetchAllDrAdvice(defaultParams)
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

  const populateTable = () => {
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllDrAdvice(obj)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
        setDataResult(res.result);
      })
      .catch(() => {
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
        showRecordWarning(true);
      });
  };

  //event listener for search icon
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchDoctorAdvice(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };

  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    if (value === null) {
      setSearchString("");
    } else {
      searchValue = value.dradvice;
    }
  };

  //event listener function for edit icon
  function editRow(dradvice) {
    setEdit(true);
    console.log("dradvice object is " + JSON.stringify(dradvice));
    console.log("Required id is genderId" + dradvice.Id);
    setIdValue(dradvice.Id);
    handleOpen();
  }

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
    if (countClick === 0) {
      setCountClick(countClick + 1);
      deleteDrAdviceById(deleteId)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            populateTable();
            deleteAlert(response.data.message);
            setCountClick(0);
          }
          handleCloseChild();
        })
        .catch((error) => {
          setCountClick(0);
          errdeleteAlert(error.message);
          handleCloseChild();
        });
    }
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-black font-Poppins lg:hidden whitespace-nowrap">
            Doctor Advice
          </h1>
        </div>

        {/*searchable dropdown */}
        <div className="flex gap-2 w-full items-center mt-2">
          <h1 className="text-xl text-black font-Poppins hidden whitespace-nowrap lg:block">
            Doctor Advice
          </h1>

          <div className="grid grid-cols-4 w-full gap-2 items-center  ">
            <div className="w-full col-span-4 xl:col-span-3">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by DrAdvice Code"
                dataArray={options}
                handleInputChange={handleChange}
                selectedValue={autoSelectedValue}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center"></div>
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
          {/* </div> */}
        </div>

        {spinner ? (
          <div className="grid justify-center">{/* <LoadingSpinner /> */}</div>
        ) : null}

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

        <ModalDoctorAdvice
          populateTable={populateTable}
          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          idValue={idValue}
          countClick={countClick}
          setCountClick={setCountClick}
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
