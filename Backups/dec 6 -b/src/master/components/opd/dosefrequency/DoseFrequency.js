import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/Toasts";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import {
  autoSearchDoseFrequency,
  fetchAllDoseFrequency,
  deleteDoseFrequencyById,
} from "../../../services/opd/DoseFrequencyService";

import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";
import FrequencyTable from "../dosefrequency/FrequencyTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import DoeseFrequencyModal from "../dosefrequency/DoseFrequencyModal";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

export default function Department() {
  let searchValue = "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  //add edit update and cancel button
  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

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
  const [idValue, setIdValue] = React.useState("");
  let frequencyList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  //event listener function for edit icon
  function editRow(dosefrequency) {
    setEdit(true);
    console.log("dosefrequency object is " + JSON.stringify(dosefrequency));
    console.log("Required id is deptId" + dosefrequency.id);
    setIdValue(dosefrequency.id);
    //open the modal form
    handleOpen();
  }

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  // function to delete the table data
  function deleteRow(row) {
    handelOpenChild();
    console.log(row.id);
    setDeleteId(row.id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
    deleteDoseFrequencyById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }

        //Close the confirmation modal
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        setOpenBackdrop(false);
        errdeleteAlert(error.message);
      });
  }

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchDoseFrequency(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(value);
    if (value !== null) {
      searchValue = value.frequency;
    } else {
      searchValue = "";
      setPage(0);
      setSearchString(searchValue);
    }
  };
  //populate the CommonMasterTable using the function populateTable
  function populateTable() {
    let obj = {
      page: page,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllDoseFrequency(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          frequencyList.result.push(jsonObject);
        });

        frequencyList.actions = [...res.actions];
        frequencyList.statusCode = res.statusCode;
        console.log(frequencyList);
        setData(frequencyList);

        setDataResult(frequencyList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }

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
    fetchAllDoseFrequency(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          frequencyList.result.push(jsonObject);
        });

        frequencyList.actions = [...res.actions];
        frequencyList.statusCode = res.statusCode;
        console.log(frequencyList);
        setData(frequencyList);

        setDataResult(frequencyList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  return (
    <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
      <div className="flex justify-center text-xl">
        <h1 className=" text-gray-700 font-Poppins lg:hidden ">
          {" "}
          Dose Frequency
        </h1>
      </div>

      {/*searchable dropdown */}
      <div className="flex gap-2 w-full items-center mt-2">
        {/* <div className=" flex items-center w-full gap-14"> */}
        <h1 className="lg:w-[25%] text-xl text-gray-700 font-Poppins hidden lg:block">
          Dose Frequency
        </h1>

        <div className="flex w-full lg:grid grid-cols-2 gap-2 items-center ">
          <div className="grid w-full grid-cols-1">
            <SearchBar
              name="SearchableSelect"
              placeholder="Search by Dose Frequency Code / Name"
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
        <FrequencyTable
          tableApiFunc={fetchAllDoseFrequency}
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

      {/* edit */}

      <DoeseFrequencyModal
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
      {/* delete */}
      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        confirmationSubmitFunc={deleteRecord}
        confirmationLabel="Confirmation "
        confirmationMsg="Are you sure want to delete this record ?"
        confirmationButtonMsg="Delete"
      />
    </div>
  );
}
