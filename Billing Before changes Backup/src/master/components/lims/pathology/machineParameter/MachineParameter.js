import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CommonMasterTable from "../../../../components/../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MachineParameterModal from "./MachineParameterModal";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import {
  fetchAllMachineParameters,
  deleteMachineParameterById,
  autoSearchMachineParameter,
  getMachineDropdown,
} from "../../../../services/lims/pathology/MachineParameterServices";
//imports from react hook form
import { useForm } from "react-hook-form";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const MachineParameter = () => {
  let searchValue = "";

  const schema = yup.object().shape({
    machineName: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Machine Name"),
        label: yup.string().required("Please Select Machine Name"),
      }),
  });

  const defaultValues = {
    machineName: null,
  };

  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [open, setOpen] = useState(false);

  const [machineOptions, setMachineOptions] = useState([]);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState();
  const [countClick, setCountClick] = React.useState(0);
  const [options, setOptions] = React.useState([]);

  const [spinner, showSpinner] = useState(false);
  const [recordWarning, showRecordWarning] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [dataResult, setDataResult] = useState([]);

  const [edit, setEdit] = useState(false);
  const [machineId, setMachineId] = useState();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  //The state variable to store the data coming from the api
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

  useEffect(() => {
    getMachine();
    setValue("machineName", defaultAllDropdown);
  }, []);

  const getMachine = () => {
    getMachineDropdown()
      .then((response) => {
        console.log("The list of all the machines are" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        setMachineOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    setSearchString(searchValue);
    console.log("The current machine name dropdown option is");
    console.log(JSON.stringify(getValues("machineName")));
    setMachineId(getValues("machineName").id);
  };

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      machineId: machineId,
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllMachineParameters(defaultParams)
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
    fetchAllMachineParameters(obj)
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

  const onSubmitDataHandler = () => {};

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchMachineParameter(autoSearchString)
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
      setSearchString("");
    } else {
      searchValue = value.MachineParameter;
    }
  };

  function editRow(machineParameter) {
    setEdit(true);
    console.log("machineParameter", machineParameter);
    console.log(machineParameter.Id);
    setIdValue(machineParameter.Id);
    handelOpen();
  }

  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
    deleteMachineParameterById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert();
          setOpenBackdrop(false);
        }

        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        errdeleteAlert();
        setOpenBackdrop(false);
        //Close the confirmation modal for delete
      });
  }

  function deleteRow(row) {
    handelOpenChild();
    console.log("row", row);
    setDeleteId(row.Id);
  }

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="">
          <div className="row ">
            <div className="flex justify-between items-center w-full  mt-4 rounded">
              <div className="flex items-center gap-x-2 w-full xl:w-11/12">
                <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
                  Machine Parameter
                </h1>
                <div className="w-11/12">
                  <SearchBar
                    type="button"
                    name="SearchableSelect"
                    placeholder="Search by Machine Parameter Code/Name"
                    dataArray={options}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                  />
                </div>
                <div className="w-1/2">
                  <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                    <DropdownField
                      control={control}
                      error={errors.machineName}
                      name="machineName"
                      placeholder="Select Machine Name"
                      dataArray={machineOptions}
                      //isDisabled={props.edit}
                    />
                  </form>
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
                <Button
                  className=" h-11 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>

              <div className="grid justify-end">
                {/* When the Add button is clicked ; the modal form opens */}

                <AddNewButton
                  onClick={() => {
                    handelOpen();
                    setEdit(false);
                  }}
                />

                {/* Body of country Modal form */}
              </div>
            </div>{" "}
            <CommonBackDrop openBackdrop={openBackdrop} />
            {open ? (
              <MachineParameterModal
                handleClose={handleClose}
                edit={edit}
                setEdit={setEdit}
                setOpen={setOpen}
                open={open}
                handelOpen={handelOpen}
                idValue={idValue}
                populateTable={populateTable}
                openBackdrop={openBackdrop}
                setOpenBackdrop={setOpenBackdrop}
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
          {/* CommonMasterTable Component */}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <CommonMasterTable
              //data to be displayed
              dataResult={dataResult}
              tableApiFunc={fetchAllMachineParameters}
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
    </div>
  );
};

export default MachineParameter;
