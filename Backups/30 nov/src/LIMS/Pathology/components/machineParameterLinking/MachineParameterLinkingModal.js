import React, { useState, useEffect } from "react";
import { Box, Modal, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../../Common/ModalStyle";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  fetchAllMachineParameters,
  fetchAllParameters,
  autoSearchParameters,
  autoSearchMachineParameter,
  autoSearchMachine,
  addNewMachineParameterLinking,
  getMachineList,
} from "../../services/MachineParameterLinkingServices";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import ParameterSelectionTable from "./ParameterSelectionTable";
import MachineParameterSelectionTable from "./MachineParameterSelectionTable";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import MachineParameterLinkingTable from "./MachineParameterLinkingTable";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/Toasts";

import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";

const MachineParameterLinkingModal = (props) => {
  const [dataParameter, setDataParameter] = useState({});

  let searchValue = "";

  const [dataResultParameter, setDataResultParameter] = useState([]);
  const [countParameter, setCountParameter] = useState();
  const [spinnerParameter, showSpinnerParameter] = useState(false);
  const [recordWarningParameter, showRecordWarningParameter] = useState(false);
  const [selectedParameter, setSelectedParameter] = React.useState([]);
  const [selectedObjParameter, setSelectedObjParameter] = React.useState();
  const [pageParameter, setPageParameter] = React.useState(0);
  const [rowsPerPageParameter, setRowsPerPageParameter] = React.useState(5);
  const [searchStringParameter, setSearchStringParameter] = useState("");

  const [machineId, setMachineId] = useState(null);
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState();
  const [spinner, showSpinner] = useState(false);
  const [recordWarning, showRecordWarning] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [tableData, setTableData] = useState([]);

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  const [options, setOptions] = React.useState([]);
  const [machineOptions, setMachineOptions] = React.useState([]);
  const [parameterOptions, setParameterOptions] = React.useState([]);
  const [machineParameterOptions, setMachineParameterOptions] = React.useState(
    []
  );

  const getMachineDropdown = () => {
    getMachineList()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setMachineOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMachineDropdown();
  }, []);

  useEffect(() => {
    showSpinnerParameter(true);
    showRecordWarningParameter(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPageParameter,
      searchString: searchStringParameter,
    };
    fetchAllParameters(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setDataParameter(res);
        setCountParameter(res.count);
        setDataResultParameter(res.result);
        showSpinnerParameter(false);
      })
      .catch(() => {
        showSpinnerParameter(false);
        showRecordWarningParameter(true);
      });
  }, [searchStringParameter]);

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      machineId: machineId,
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    if (machineId !== null || searchString !== "") {
      fetchAllMachineParameters(defaultParams)
        .then((response) => {
          console.log("The search result is " + JSON.stringify(response.data));
          return response.data;
        })
        .then((res) => {
          console.log(
            "The input for setData function is " + JSON.stringify(res)
          );
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
    }
  }, [searchString, machineId]);

  useEffect(() => {
    if (selectedObj && selectedObjParameter) {
      console.log(
        "selectedObj",
        selectedObj,
        "selectedObjParameter",
        selectedObjParameter
      );
    }
  }, [selectedObj, selectedObjParameter]);

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const { mutate: postNewMachineParameterLinking } = useMutation(
    addNewMachineParameterLinking,
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        console.log(result);
        props.setCountClick(0);
        //When the request is successfull ; close the confirmation modal for POST
        handleClosePost();
        successAlert();
        // props.populateTable({ page: 0, size: 10, searchString: "" });
        console.log("Record has been created");

        //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers

        //to set the form fields as blank
        reset(defaultValues);

        //for closing the modal form
        props.setOpen(false);
      },
      onError: (error) => {
        console.log(error);
        props.setCountClick(0);
        //Code for React toast
        errorAlert();

        //When the request is not successfull ; close the confirmation modal for POST
        handleClosePost();
      },
    }
  );

  function addRecord() {
    console.log("A new record has been added");
    // if (props.countClick === 0) {
    //   props.setCountClick(props.countClick + 1);
    //   postNewMachineParameterLinking(finalData);
    // }
    postNewMachineParameterLinking(finalData);
  }

  const defaultValues = {};

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    defaultValues,
  });

  let rows;

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  const handleSave = () => {
    console.log("tableData", tableData);
    tableData.map((item) => {
      delete item.machineParameter.code;
      delete item.machineParameter.name;
      delete item.parameter.code;
      delete item.parameter.name;
    });
    console.log("final tableData", tableData);
    let submitObj = {
      machine: {
        id: machineId,
      },
      parametersList: tableData,
    };
    console.log("submitObj", submitObj);
    setOpenPost(true);
    setFinalData(submitObj);
  };

  const handleInputChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchParameters(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setParameterOptions(res.result);
        });
    }
  };

  const handleInputChangeMachineParameter = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);

      autoSearchMachineParameter(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setMachineParameterOptions(res.result);
        });
    }
  };

  const onSubmitTableData = () => {
    console.log("selectedObj", selectedObj);
    console.log("selectedObjParameter", selectedObjParameter);
    //let obj = { ...selectedObj, ...selectedObjParameter };
    let arr = [];
    let transformedObj = {
      parameter: {
        id: selectedObjParameter.Id,
        name: selectedObjParameter.ParameterName,
        code: selectedObjParameter.ParameterCode,
      },
      machineParameter: {
        id: selectedObj.Id,
        name: selectedObj.MachineName,
        code: selectedObj.MachineParameterCode,
      },
      // parameter: {
      //   id: selectedObj.Id,
      //   name: selectedObj.ParameterName,
      //   code: selectedObj.ParameterCode,
      // },
      // machineParameter: {
      //   id: selectedObjParameter.Id,
      //   name: selectedObjParameter.MachineParameterDescription,
      //   code: selectedObjParameter.MachineParameterCode,
      // },
    };
    setTableData([...tableData, { ...transformedObj }]);

    console.log("arr", arr);

    //setTableData([...arr]);

    console.log("dataResult", dataResult);
    let check = dataResult.filter((item) => item !== selectedObj);
    let checkParameter = dataResultParameter.filter(
      (item) => item !== selectedObjParameter
    );

    setDataResult([...check]);
    setDataResultParameter([...checkParameter]);
    setSelected([]);
    setSelectedParameter([]);

    console.log("check", check);
    console.log("checkParameter", checkParameter);
    console.log("tableData", tableData);
  };

  const handleDelete = (obj, itemIndex) => {
    setTableData(tableData.filter((item, index) => index !== itemIndex));
    console.log("deleted", tableData);
  };

  return (
    <div className="w-[100%] grid justify-center items-center rounded lg:px-0 mt-4">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <div className="grid grid-cols-1 md:grid-cols-1  w-full">
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
              }}
            />
          </div>

          <div className="row">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 my-2 p-2">
              <div className="w-1/2 col-span-2">
                <DropdownField
                  control={control}
                  error={errors.machine}
                  name="machine"
                  label="Select Machine"
                  dataArray={machineOptions}
                  isSearchable={false}
                  placeholder="Select Machine"
                  isClearable={false}
                  inputRef={{
                    ...register("machine", {
                      onChange: (e) => {
                        if (e.target.value !== "") {
                          console.log("e.target", e.target);
                          setMachineId(e.target.value.id);
                        } else {
                          setMachineId(null);
                        }
                      },
                    }),
                  }}
                />
                {/* <div className="flex items-center space-x-2">
                  <SearchBar
                    type="button"
                    name="SearchableSelect"
                    placeholder="Search by Machine Code/Name"
                    dataArray={options}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                  />
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
                </div> */}
              </div>
              <div className="col-span-1 ">
                {dataParameter.hasOwnProperty("result") &&
                dataParameter.result.length > 0 &&
                dataParameter.statusCode === 200 &&
                spinnerParameter === false ? (
                  <div className="">
                    {spinnerParameter ? (
                      <div className="grid justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : null}
                    <div>
                      <SearchDropdown
                        control={control}
                        name="parameter"
                        label="Search By Parameter Code/Name"
                        searchIcon={true}
                        dataArray={parameterOptions}
                        placeholder="Search By Parameter Code/Name"
                        isSearchable={true}
                        isClearable={true}
                        handleInputChange={handleInputChange}
                        inputRef={{
                          ...register("parameter", {
                            onChange: (e) => {
                              console.log(e.target);
                              if (e.target.value !== null) {
                                setPageParameter(0);
                                setSearchStringParameter(
                                  e.target.value.parameter
                                );
                                //searchStringParameter(e.target.value.parameter);
                                console.log("e.target.value", e.target.value);
                              } else {
                                setPageParameter(0);
                                setSearchStringParameter("");
                                console.log("e.target.value", e.target.value);
                              }
                            },
                          }),
                        }}
                      />
                      <ParameterSelectionTable
                        //data to be displayed
                        dataResult={dataResultParameter}
                        tableApiFunc={fetchAllParameters}
                        setDataResult={setDataResultParameter}
                        searchString={searchStringParameter}
                        data={dataParameter}
                        page={pageParameter}
                        setPage={setPageParameter}
                        rowsPerPage={rowsPerPageParameter}
                        setRowsPerPage={setRowsPerPageParameter}
                        count={countParameter}
                        // DownloadTableData={DownloadTableData}
                        selected={selectedParameter}
                        setSelected={setSelectedParameter}
                        selectedObj={selectedObjParameter}
                        setSelectedObj={setSelectedObjParameter}
                      />{" "}
                    </div>
                  </div>
                ) : null}
              </div>
              {machineId !== null ? (
                <div className="col-span-1">
                  {data.hasOwnProperty("result") &&
                  data.result.length > 0 &&
                  data.statusCode === 200 &&
                  spinner === false ? (
                    <div className="">
                      {spinner ? (
                        <div className="grid justify-center">
                          <LoadingSpinner />
                        </div>
                      ) : null}
                      <div>
                        <SearchDropdown
                          control={control}
                          name="machineParameter"
                          label="Search By Machine Parameter Code/Name"
                          searchIcon={true}
                          dataArray={machineParameterOptions}
                          placeholder="Search By Machine Parameter Code/Name"
                          isSearchable={true}
                          isClearable={true}
                          handleInputChange={handleInputChangeMachineParameter}
                          inputRef={{
                            ...register("machineParameter", {
                              onChange: (e) => {
                                console.log(e.target);
                                if (e.target.value !== null) {
                                  setPage(0);
                                  setSearchString(
                                    e.target.value.MachineParameter
                                  );
                                  //searchStringParameter(e.target.value.parameter);
                                  console.log("e.target.value", e.target.value);
                                } else {
                                  setPage(0);
                                  setSearchString("");
                                  console.log("e.target.value", e.target.value);
                                }
                              },
                            }),
                          }}
                        />
                        <MachineParameterSelectionTable
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
                          // DownloadTableData={DownloadTableData}
                          selected={selected}
                          setSelected={setSelected}
                          selectedObj={selectedObj}
                          setSelectedObj={setSelectedObj}
                          machineId={machineId}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 text-md animate-pulse">
                    Please Select Machine First !
                  </span>
                </div>
              )}
              {
                <div className={`col-span-2 flex justify-end `}>
                  <button
                    type="button"
                    disabled={
                      selected.length > 0 && selectedParameter.length > 0
                        ? false
                        : true
                    }
                    onClick={onSubmitTableData}
                    className={`h-10 px-3 text-base font-medium  bg-customGreen text-white rounded ${
                      selected.length > 0 && selectedParameter.length
                        ? `cursor-pointer`
                        : `cursor-not-allowed`
                    }`}
                  >
                    Add
                  </button>
                </div>
              }
            </div>
            <MachineParameterLinkingTable
              rows={tableData}
              handleDelete={handleDelete}
            />
            {tableData.length > 0 && (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
};

export default MachineParameterLinkingModal;
