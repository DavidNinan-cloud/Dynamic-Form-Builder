import React, { useState, useEffect } from "react";
import { Button, Box, Checkbox, Paper } from "@mui/material";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import CommonMasterTable from "./CommonMasterTable";

import {
  fetchAllMachineParameterLinking,
  autoSearchMachine,
  deleteMachineParameterLinkingById,
} from "../../../../services/lims/pathology/MachineParameterLinkingServices";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";

import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";
import MachineParameterLinkingModal from "./MachineParameterLinkingModal";

const PathologyMachineParameterLinking = () => {
  let machineDeleteId,
    parameterDeleteId,
    machineParameterDeleteId = "";
  const [countClick, setCountClick] = React.useState(0);
  let searchValue = "";

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    //resolver: yupResolver(schema),
    // defaultValues,
  });

  //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState();
  const [spinner, showSpinner] = useState(false);
  const [recordWarning, showRecordWarning] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [data, setData] = useState({ result: [], actions: [] });
  const [edit, setEdit] = useState(false);
  const [machineId, setMachineId] = useState(null);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [idValue, setIdValue] = useState("");

  const [deleteMachineId, setDeleteMachineId] = useState("");
  const [deleteParameterId, setDeleteParameterId] = useState("");
  const [deleteMachineParameterId, setDeleteMachineParameterId] = useState("");

  //The state variable to store the data coming from the api

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const onSubmitDataHandler = () => {};

  // useEffect(() => {
  //   if (selectedObj && selectedObjParameter) {
  //     console.log(
  //       "selectedObj",
  //       selectedObj,
  //       "selectedObjParameter",
  //       selectedObjParameter
  //     );
  //   }
  // }, [selectedObj, selectedObjParameter]);

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      machineId: machineId,
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllMachineParameterLinking(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        console.log("res", res);

        setData(res);
        setCount(res.count);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }, [searchString, machineId]);

  const populateTable = () => {
    console.log("populateTable has been called");
    let obj = {
      machineId: machineId,
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllMachineParameterLinking(obj)
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

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchMachine(autoSearchString)
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

  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    console.log(value);

    if (value === null) {
      setMachineId(null);
      //   setSearchString("");
    } else {
      searchValue = value.machineId;
      // setMachineId(value.machineId);
    }
  };

  const filterData = () => {
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    //  setSearchString(searchValue);

    setMachineId(searchValue);
  };

  function deleteRecord() {
    //  console.log("The record having id " + deleteId + " is going to be deleted");

    deleteMachineParameterLinkingById(
      deleteMachineId,
      deleteParameterId,
      deleteMachineParameterId
    )
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

  function deleteRow(row) {
    console.log(row);
    handelOpenChild();

    setDeleteMachineId(Number(row.MachineId));
    setDeleteParameterId(Number(row.ParameterId));
    setDeleteMachineParameterId(Number(row.MachineParameterId));
    // machineDeleteId = Number(row.MachineId);
    // parameterDeleteId = Number(row.ParameterId);
    // machineParameterDeleteId = Number(row.MachineParameterId);
    //  setDeleteId(row.Id);
  }

  return (
    <div className="w-full px-6 mb-4">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10 mt-8 md:rounded-md">
        <div className="space-y-2">
          {/* search TextField */}
          <div className="flex items-center gap-2 p-2 w-full">
            <h1 className="text-xl text-gray-700 font-Poppins ">
              Machine Parameter Linking
            </h1>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 w-full">
                <div className="w-1/2">
                  <SearchBar
                    type="button"
                    name="SearchableSelect"
                    placeholder="Search by Machine Code/Name"
                    dataArray={options}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                  />
                </div>
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
              </div>
              <div className="grid justify-end">
                <AddNewButton
                  onClick={() => {
                    handelOpen();
                    setEdit(false);
                  }}
                />

                {/* Body of country Modal form */}
              </div>
            </div>
          </div>

          {open ? (
            <MachineParameterLinkingModal
              handleClose={handleClose}
              // edit={edit}
              // setEdit={setEdit}
              setOpen={setOpen}
              open={open}
              handelOpen={handelOpen}
              //idValue={idValue}
              populateTable={populateTable}
              countClick={countClick}
              setCountClick={setCountClick}
              machineId={machineId}
              setMachineId={setMachineId}

              // parameter table props
            />
          ) : null}
        </div>
        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg="Are You Sure you want to delete the record?"
          confirmationButtonMsg="Delete"
        />
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            //data to be displayed
            dataResult={dataResult}
            tableApiFunc={fetchAllMachineParameterLinking}
            setDataResult={setDataResult}
            searchString={searchString}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
            //   editRow={editRow}
            setOpen={setOpen}
            deleteRow={deleteRow}
            displayView={displayView}
            // DownloadTableData={DownloadTableData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PathologyMachineParameterLinking;
