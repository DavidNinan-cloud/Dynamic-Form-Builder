//imports from react library
import { useState, useEffect } from "react";
import * as React from "react";
//imports from material ui library
import { Button, TextField } from "@mui/material";
import RefundModal from "./RefundModal";
//import the CommonMasterTable component
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import TuneIcon from "@mui/icons-material/Tune";

import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";

//importing the asynchronous function from refundService file
import {
  fetchAllRefund,
  autoSearchRefund,
  deleteRefundById,
} from "../../services/refund/RefundServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
//dropdown css

//searchObj is sent with the POST request to get all the list of countries
const searchObj = {
  page: 0,
  size: 20,
  searchString: "",
};
//body of Refund Component
function Refund(props) {
  let searchGroup = {
    page: 0,
    size: 10,
    searchString: "",
  };
  //state varible 'open' for modal open and close
  const [open, setOpen] = useState(false);
  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);
  //for create suggestion object
  const [selectedObj, setSelectedObj] = React.useState("");
  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);
  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setIdValue] = useState("");
  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = useState("");
  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });
  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);
  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    company: null,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    defaultValues,
  });

  //clicking on the Add button of modal form
  const onSubmitDataHandler = (dataDropdown) => {
    console.log("onSubmitDataHandler function has been invoked");
    let postedObj = {
      id: dataDropdown.id,
      refundAmount: {
        refundAmountName: dataDropdown.refundAmount.label,
        id: dataDropdown.refundAmount.value,
      },
    };
    postRefund(postedObj);
    //to set the form fields as blank
    reset(defaultValues);
  };
  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);
  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);
  //Before the component gets mounted , call the asynchronous function fetchAllGroup(). And resolve the promise returned by that function.
  useEffect(() => {
    populateTable(searchObj);
  }, []);
  //populate the CommonMasterTable using the function populateTable
  function populateTable(searchParameter) {
    showSpinner(true);
    showRecordWarning(false);
    fetchAllRefund(searchParameter)
      .then((response) => {
        console.log("the serch result is" + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        showSpinner(false);
      })
      .catch(()=>{
        showSpinner(false);
        showRecordWarning(true);
      })
  }
  //matched string
  const filterData = () => {
    console.log("Search icon has been clicked");

    console.log(
      "selected obj in filterData function is " + JSON.stringify(selectedObj)
    );

    console.log(typeof selectedObj);

    try {
      if (
        typeof selectedObj !== "string" &&
        selectedObj.hasOwnProperty("group") &&
        selectedObj.group !== ""
      ) {
        searchGroup.searchString = selectedObj.group;
        console.log("if block's populateTable");
        populateTable(searchGroup);
      }
    } catch (err) {
      errorAlert();
      console.log("Selected object has empty or no search string");
    }
  };
  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    if (autoSearchString !== "") {
      autoSearchRefund(autoSearchString)
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
  //selected value set to  setSelected state
  const autoSelectedValue = (value) => {
    console.log(value);
    setSelectedObj(value);
  };
  //event listener function for edit icon
  function editRow(RefundInfo) {
    setEdit(true);
    console.log(RefundInfo);
    console.log(RefundInfo.Id);
    setIdValue(RefundInfo.Id);
    //When we click on edit pencil ; show Cancel and Update button
    //open the modal form
    handelOpen();
  }
 
  //event listener function for the dustbin icon
  function deleteRow(row) {
    //open the confirmation modal
    handelOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }
  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    deleteRefundById(deleteId)
      .then((response) => {
        console.log(response);
        console.log(typeof response.data.statusCode);
        if (response.data.statusCode === 200) {
          populateTable(searchObj);
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
   //event listener function for view functionality
   function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <>
      <div className="w-full px-2">
        <div className="w-full grid px-2  pt-14  mt-8 md:rounded-md">
          <div className="">
            <div className="row ">
              {/* search TextField */}
              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div className="grid grid-cols-2 lg:flex items-center gap-2 w-full">
                  {/* searchable */}
                  <div className="lg:flex w-full items-center lg:space-x-3">
                    <div className="w-full">
                      <SearchBar
                        type="button"
                        name="SearchableSelect"
                        placeholder="Search by PatientName/UHID/MobileNo"
                        dataArray={options}
                        isSearchable={true}
                        handleInputChange={handleChange}
                        selectedValue={autoSelectedValue}
                        selectedObj={selectedObj}
                        onClick={filterData}
                      />
                    </div>
                    <div className="flex justify-center">
                      <h2 className="text-gray-500 font-bold text-left text-base">
                        OR
                      </h2>
                    </div>
                    <div className="flex items-center space-x-3 w-full">
                      <DropdownField
                        control={control}
                        error={errors.company}
                        name="company"
                        placeholder="Select Company"
                        // dataArray={unitOptions}
                        isDisabled={props.edit}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 ">
                    <Button
                      className="h-11 w-10 px-2 rounded-md  text-gray-500"
                      type="button"
                    >
                      <TuneIcon className="cursor-pointer" />
                    </Button>
                    <Button
                      className="h-11 w-10 px-2 rounded-md  text-gray-500 "
                      variant="outlined"
                      size="small"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "40px",
                        minWidth: "200px",
                        minHeight: "38px",
                        fontWeight: "bold",
                        textTransform: "none",
                        marginTop: "2px",
                      }}
                      type="submit"
                    >
                      Show Company Advance
                    </Button>
                  </div>
                </div>
              </form>
              {/* Add button to open the Modal Form and table name start */}
              <div className="flex justify-end items-center w-full  mt-4 rounded">
                <div className="flex w-full items-center justify-between">
                  {/* When the Add button is clicked ; the modal form opens */}
                  <div className="w-full">
                    <label className="text-gray-500 font-bold text-left text-base">
                      List Of Advance
                    </label>
                  </div>
                  <div className="flex items-center justify-end lg:justify-between w-full">
                    <div className="ml-5 hidden lg:block">
                      <label className="text-gray-500 font-bold text-left text-base">
                        List Of Refund
                      </label>
                    </div>
                    <div className=" ">
                      <Button
                        type="button"
                        variant="outlined"
                        size="small"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "40px",
                          minWidth: "120px",
                          minHeight: "37px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          handelOpen();
                          setEdit(false);
                        }}
                      >
                        + Add Refund
                      </Button>
                    </div>
                  </div>

                  {/* Body of Block Modal form */}
                  {open ? (
                    <RefundModal
                      handleClose={handleClose}
                      edit={edit}
                      setEdit={setEdit}
                      setOpen={setOpen}
                      open={open}
                      handelOpen={handelOpen}
                      idValue={idValue}
                      populateTable={populateTable}
                      searchObj={searchObj}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <ConfirmationModal
              confirmationOpen={openChild}
              confirmationHandleClose={handleCloseChild}
              confirmationSubmitFunc={deleteRecord}
              confirmationLabel="Confirmation "
              confirmationMsg="Are you sure want to delete this record ?"
              confirmationButtonMsg="Delete"
            />
            {/* CommonMasterTable Component */}
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 ? (
              <div className="lg:grid grid-cols-2 lg:space-x-5 items-center ">
                <div>
                  <CommonMasterTable
                    //data to be displayed
                    data={data}
                    editRow={editRow}
                    setOpen={setOpen}
                    deleteRow={deleteRow}
                    displayView={displayView}
                  />
                </div>
                <div>
                  <label className="lg:hidden text-gray-500 font-bold text-left text-base">
                    List Of Refund
                  </label>
                  <CommonMasterTable
                    //data to be displayed
                    data={data}
                    editRow={editRow}
                    setOpen={setOpen}
                    deleteRow={deleteRow}
                    displayView={displayView}
                  />
                </div>
                <div className="col-span-2 grid gap-3 justify-end">
                  <div>
                    <TextField
                      className="bg-white"
                      size="small"
                      disabled
                      value="hello"
                      label="Total Advance (Rs)"
                    />
                  </div>
                  <div>
                    <TextField
                      className="bg-white"
                      size="small"
                      disabled
                      label="Advance consumed (Rs)"
                    />
                  </div>
                  <div>
                    <TextField
                      className="bg-white"
                      size="small"
                      disabled
                      label="Total Refund (Rs)"
                    />
                  </div>
                  <div>
                    <TextField
                      className="bg-white"
                      size="small"
                      disabled
                      label="Advance Available (Rs)"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid justify-center items-center w-full">
                <div className="flex mt-5 justify-center w-full">
                  <button className="">
                  {spinner ? (
                      <div className="grid justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : null}
                    {recordWarning === true && spinner === false ? (
                        <div className="flex justify-center">
                          <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                            No Records Found...
                          </h3>
                        </div>
                      ) : null}
                  </button>
                </div>
                {/* <div className="flex justify-center w-full">
                  <h3 className="mt-5 font-bold text-gray-600">
                    No Records Found...
                  </h3>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Refund;
