import React, { useState, useEffect } from "react";
import { Box, Modal, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import CommonMasterTable from "../../../../components/../../Common Components/CommonTable/CommonMasterTable";
import {
  getMachineDropdown,
  addNewMachineParameter,
  getMachineParameterById,
  updateMachineParameter,
} from "../../../../services/lims/pathology/MachineParameterServices";
import MachineParameterTable from "./MachineParameterTable";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

const MachineParameterModal = (props) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState();
  const [dataResult, setDataResult] = useState([]);

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  const [machineOptions, setMachineOptions] = useState([]);
  const [data, setData] = useState({ result: [], actions: [] });
  const [spinner, showSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const [recordWarning, showRecordWarning] = useState(false);

  const schema = yup.object().shape({
    machine: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),

    parameterCode: yup.string().required("Parameter Code Required"),
    parameterDescription: yup
      .string()
      .required("Parameter Description Required"),
  });

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  //the object to reset the form to blank values
  const defaultValues = {
    machine: "",
    parameterCode: "",
    parameterDescription: "",
    id: "",
    status: true,
  };

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
    resolver: yupResolver(schema),
    defaultValues,
  });

  let rows;

  //let demo = [];

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  const getMachine = () => {
    getMachineDropdown()
      .then((response) => {
        console.log("The list of all the machines are" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setMachineOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function createData(machine, parameterCode, parameterDescription, status) {
    return { machine, parameterCode, parameterDescription, status };
  }

  rows = tableData.map((item) => {
    return createData(
      item.machine,
      item.parameterCode,
      item.parameterDescription,
      item.status
    );
  });

  useEffect(() => {
    getMachine();
  }, []);

  const handleDelete = (obj, itemIndex) => {
    console.log("Delete");
    console.log("obj", obj);
    console.log("itemIndex", itemIndex);
    setTableData((item) => item.filter((item, index) => index !== itemIndex));
  };

  const onSubmit = (data) => {
    console.log("data", data);
    //let myArr = [];
    let myObj = {
      machine: { name: data.machine.label, id: data.machine.id },
      parameterCode: data.parameterCode,
      parameterDescription: data.parameterDescription,
      status: data.status,
    };
    tableData.push(myObj);
    reset(defaultValues);
    //setTableData([...myArr]);
    console.log("tableData", tableData);
  };

  const handleSave = () => {
    console.log(tableData);

    let arr = [];
    tableData.map((item) => {
      let obj = {
        active: item.status,
        code: item.parameterCode,
        name: item.parameterDescription,
      };
      arr.push(obj);
    });
    let machineId = tableData
      .filter((item, index) => index === 0)
      .map((item) => item.machine.id)
      .toString();
    console.log(machineId);
    let submitObj = {
      machine: {
        id: Number(machineId),
      },

      parameters: [...arr],
    };

    console.log(submitObj);
    setOpenPost(true);
    setFinalData(submitObj);
  };

  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postMachineParameter(finalData);
  }
  //useMutation hook for the implementation of post request data saving
  const { mutate: postMachineParameter } = useMutation(addNewMachineParameter, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      //When the request is successfull ; close the confirmation modal for POST
      props.setOpenBackdrop(false);
      successAlert();
      props.populateTable({ page: 0, size: 10, searchString: "" });
      console.log("Record has been created");

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset(defaultValues);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);

      //Code for React toast
      errorAlert();
      props.setOpenBackdrop(false);
      handleClosePost();
      //When the request is not successfull ; close the confirmation modal for POST
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["MachineParameter", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getMachineParameterById(props.idValue);
      }
    },

    {
      enabled: props.edit,

      staleTime: 0,

      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        console.log(status);

        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        console.log(data);

        //         machine: "",
        // parameterCode: "",
        // parameterDescription: "",
        // id: "",
        // status: true,
        let resetObj = {
          machine: data.data.result.machine,
          parameterCode: data.data.result.machineParameterCode,
          parameterDescription: data.data.result.machineParameterDescription,
          id: data.data.result.id,
          status: data.data.result.status,
        };

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    updateMachineParameter(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset(defaultValues);
          props.setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setOpenBackdrop(false);
        errorAlert(error.message);
      });
  }

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
            <fieldset className="border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-8 rounded mt-8 lg:m-2 ">
              <legend className="px-2 font-bold text-gray-700">
                Add New Lab Machine Parameter
              </legend>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-1 w-full  gap-2"
              >
                <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-2 gap-2">
                  <div className="lg:col-span-2 md:col-span-1">
                    <DropdownField
                      control={control}
                      error={errors.machine}
                      name="machine"
                      label="Machine Name"
                      dataArray={machineOptions}
                      isSearchable={false}
                      placeholder="Machine Name"
                      isClearable={false}
                    />
                  </div>
                  {/* Country Code  */}
                  <div className="lg:col-span-2 md:col-span-1">
                    {/*Country Code Input field */}

                    <InputField
                      name="parameterCode"
                      variant="outlined"
                      label="Parameter Code"
                      error={errors.parameterCode}
                      control={control}
                    />
                  </div>

                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="parameterDescription"
                      variant="outlined"
                      label="Parameter Description"
                      error={errors.parameterDescription}
                      control={control}
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className="lg:col-start-5 pl-0.5 md:col-start-2">
                    {/* Checkbox component */}

                    <CheckBoxField
                      control={control}
                      name="status"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  {props.edit ? (
                    <CancelButton
                      onClick={() => {
                        props.handleClose();
                        props.setEdit(false);
                        reset(defaultValues);
                      }}
                    />
                  ) : (
                    <ResetButton onClick={() => reset(defaultValues)} />
                  )}

                  {props.edit ? <UpdateButton /> : <AddButton />}
                </div>
              </form>
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </fieldset>
            <MachineParameterTable rows={rows} handleDelete={handleDelete} />
            {tableData.length > 0 && (
              <div className="flex items-center justify-end mt-1">
                {/* <button
                  className="border border-green-500 text-green-500 px-2"
                  onClick={handleSave}
                >
                  Save
                </button> */}
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
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
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

export default MachineParameterModal;
