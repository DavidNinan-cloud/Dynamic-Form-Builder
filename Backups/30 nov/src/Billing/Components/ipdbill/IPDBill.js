import * as React from "react";
//imports from react library
import { useEffect } from "react";
//imported from  mui library
import { Button, TextField } from "@mui/material";
//importing the CommonMasterTable ; which is common to all
// import CommonMasterTable from "../common/CommonMasterTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
//fetching data into ipdBillService.js
import {
  fetchAllIPDBill, //fetch table Data
  autoSearchIPDBill,
  deleteIPDBillById, //fetch data for search bar autocomplete
} from "../../services/ipdbill/IPDBillServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import AdvanceButton from "../../../Common Components/Buttons/AdvanceButton";
import ViewChargesButton from "../../../Common Components/Buttons/ViewPreviousButton";
import DischargeButton from "../../../Common Components/Buttons/DischargeButton";
import ViewPreviousButton from "../../../Common Components/Buttons/ViewPreviousButton";
import PrintButton from "../../../Common Components/Buttons/PrintButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import CommonTable from "../../../IPD/nursing/common/CommonTable";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";

//IpdBillTable Data
const IPDBillData = {
  message: "IPD Bill Data found ",
  result: [
    {
      Id: 30,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 29,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 28,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 16,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 1,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 3,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 4,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 12,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 22,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 44,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 42,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
    {
      Id: 56,
      Date: "2022-08-27",
      "Service Code": 12345,
      Discription: "Lorem",
      Qty: 12,
      Rate: 41,
      "Total Amount": "322",
      "Dis %": "10",
      "Dis Amt": "4321",  
      "Net Amt": "41",
      "Paid Amt Date": "2022-11-13",
      "Balence Amt": "2321",
      "Net Paybable": "321",
    },
  ],
  statusCode: 200,
  count: 5,
};
//searchObj is sent with the POST request(set page size and searchString)
const searchObj = {
  page: 0,
  size: 10,
  searchString: "",
};

export default function IPDBill() {
  //For 1 Radio Btn
  const [selected, setSelected] = React.useState(false);
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };
  useEffect(() => {
    setSelected("all");
  }, []);

  //For 2 Radio Btn
  const [selectedRbtn, setSelectedRbtn] = React.useState(false);
  const changeHandlerRbtn = (e) => {
    setSelectedRbtn(e.target.value);
  };
  useEffect(() => {
    setSelectedRbtn("draftbill");
  }, []);

  //For search POST Request , Set the searchObj into the component state variable
  const searchIPDCharges = {
    page: 0,
    size: 10,
    searchString: "",
  };

  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //for create suggestion object for Search bar
  const [selectedObj, setSelectedObj] = React.useState("");

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = React.useState(false); //EditBtn and SaveBtn

  const [idValue, setIdValue] = React.useState("");

  // for Delete Api
  const [deleteId, setDeleteId] = React.useState("");

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  //When No Records Found That time Show
  const [recordWarning, showRecordWarning] = React.useState(false);

  //To execute the function only once
  const [countClick, setCountClick] = React.useState(0);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //useState and handle Methods for refund screen Open & Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Before the component gets mounted , call the asynchronous function fetchAllGender(). And resolve the promise returned by that function.
  useEffect(() => {
    populateTable(searchObj);
  }, []);

  // POST API Fetch Table Data
  // populate the CommonMasterTable using the function populateTable
  function populateTable(searchParameter) {
    showSpinner(true); // fetching data from server that time spinner show / loading
    showRecordWarning(false);
    fetchAllIPDBill(searchParameter)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
      })
      .catch(() => {
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
        showRecordWarning(true);
      });
  }

  //event listener for search icon
  const filterData = () => {
    console.log("Search icon has been clicked");

    console.log(
      "selected obj in filterData function is " + JSON.stringify(selectedObj)
    );
    console.log(typeof selectedObj);

    try {
      if (
        typeof selectedObj !== "string" &&
        selectedObj.hasOwnProperty("ipdCharges") &&
        selectedObj.ipdCharges !== ""
      ) {
        searchIPDCharges.searchString = selectedObj.ipdCharges;
        console.log("if block's populateTable");
        populateTable(searchIPDCharges);
      }
    } catch (err) {
      console.log("Selected object has empty or no search string");
    }
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      autoSearchIPDBill(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(value);
    setSelectedObj(value);
  };

  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    deleteIPDBillById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable(searchObj);
          deleteAlert();
        }
        setCountClick(0);
        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch(() => {
        setCountClick(0);
        //Code for React Toast
        errdeleteAlert();
        //Close the confirmation modal for delete
        handleCloseChild();
      });
  }

  //VIEW Functionaity
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl items-center">
          <h1 className="text-black font-Poppins text-xl whitespace-nowrap lg:hidden">
            IPD BILL
          </h1>
        </div>
        {/*searchable dropdown */}
        <div className=" flex w-full gap-2 items-center mt-2">
          <h1 className="text-xl text-black font-Poppins whitespace-nowrap hidden lg:block items-center">
            IPD Bill
          </h1>

          <div className="flex w-full lg:w-[70%] lg:grid grid-cols-2 gap-2 items-center ">
            <div className="grid grid-cols-1 w-full">
              <SearchBar
                selectedObj={selectedObj}
                type="button"
                name="SearchableSelect"
                placeholder="Search by UHID/MobileNo/PatientName"
                dataArray={options}
                isSearchable={true}
                handleInputChange={handleChange}
                selectedValue={autoSelectedValue}
              />
            </div>

            <SearchIconButton
              onClick={()=>{
                console.log("Click SearchIcon Button");
                onClick={filterData}
              }} />
          </div>
        </div>

        {/* Patient Information & Billing Information */}
        <div className="grid lg:flex my-3 gap-2 w-full overflow-hidden">
          <div className="w-full lg:w-8/12 items-center border bg-gray-100 border-gray-300 text-gray-500 text-left rounded">
            <div className="border-b py-1">
              <label className="w-full text-base text-black font-semibold ml-2 lg:ml-5 ">
                Patient Information
              </label>
            </div>
            <div className="text-sm xl:text-base ml-2 lg:ml-5 py-1">
              <div className="grid grid-cols-2 w-10/12">
                <h1 className="font-semibold text-sm text-black">IPD No </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12">
                <h1 className="font-semibold text-sm text-black">Admission Date</h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12">
                <h1 className="font-semibold text-sm text-black">Full Name </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full items-center border overflow-hidden border-gray-300 bg-gray-100 text-gray-500 text-left   rounded">
            <div className="border-b py-1">
              <label className="w-full text-base text-black font-semibold ml-2 lg:ml-5 ">
                Billing Information
              </label>
            </div>
            <div className="text-sm xl:text-base ml-2 lg:ml-5 grid grid-cols-2 items-center w-full py-1">
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">Department </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">Doctor</h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">Tariff </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 lg:w-10/12">
                <h1 className="font-semibold text-sm text-black">Patient Source </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">Patient Category </h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">CGHS Dispensary</h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-10/12 ">
                <h1 className="font-semibold text-sm text-black">Token No</h1>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-black font-normal">---- </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Radio Buttons */}
        <div className=" flex text-sm xl:text-base items-center md:space-x-8 w-full overflow-hidden">
          <div className="flex justify-center items-center">
            <input
              className="h-4 w-4 ml-3"
              type="radio"
              name="all"
              value="all"
              id="all"
              checked={selected === "all"}
              onChange={changeHandler}
            />
            <label htmlFor="all" className="ml-2">
              All
            </label>
          </div>
          <div className="flex justify-center items-center">
            <input
              // style={{ height: "20px", width: "20px", marginLeft: "10px" }}
              className="h-4 w-4 ml-5 md:ml-0 "
              type="radio"
              value="patientbill"
              id="patientbill"
              checked={selected === "patientbill"}
              name="patientbill"
              onChange={changeHandler}
            />
            <label htmlFor="patientbill" className="ml-2">
              Patient Bill
            </label>
          </div>
          <div className="flex justify-center items-center">
            <input
              // style={{ height: "20px", width: "20px", marginLeft: "10px" }}
              className="h-4 w-4 ml-5 md:ml-0 "
              type="radio"
              value="companybill"
              id="companybill"
              checked={selected === "companybill"}
              name="companybill"
              onChange={changeHandler}
            />
            <label htmlFor="companybill" className="ml-2">
              Company Bill
            </label>
          </div>
        </div>
        <div className="mt-2 w-full overflow-hidden">
          <CommonTable data={IPDBillData} />
        </div>
        {/* Two Fields */}
        <div className="flex justify-end text-sm xl:text-base">
          <div className="flex space-x-3 items-center my-1 justify-end">
            <h1 className="font-bold text-gray-700">Total Amount</h1>
            <label className="border rounded-md px-4 py-1">₹&nbsp; 67654</label>
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

        {/* Table Data Show */}
        {spinner ? (
          <div className="grid justify-center">{/* <LoadingSpinner /> */}</div>
        ) : null}

        {/* CommonMasterTable Component */}
        {/* {data.hasOwnProperty("result") &&
                        data.result.length > 0 &&
                        data.statusCode === 200 &&
                        spinner === false ? (
                        <CommonMasterTable
                            data={data}
                            editRow={editRow}
                            deleteRow={deleteRow}
                            displayView={displayView}
                        />
                    ) : null} */}

        {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
        {/* {recordWarning === true && spinner === false ? (
          <div className="flex justify-center">
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null} */}

        {/* Two Textfield */}
        <div className="grid grid-cols-2 gap-2">
          <TextField
            className="bg-white"
            multiline
            rows="2"
            name="remarkadmission"
            variant="outlined"
            label="Remark From Admission"
            size="small"
            //   control={control}
            style={{ textTransform: "capitalize" }}
          />
          {/* Patient Reported OutCome */}
          <TextField
            className="bg-white"
            multiline
            rows="2"
            name="remarkpro"
            variant="outlined"
            label="Remark From PRO"
            size="small"
            //   control={control}
            style={{ textTransform: "capitalize" }}
          />
        </div>

        {/* Payment Details Block */}
        <div className="w-full items-center border justify-center px-2 xl:px-3 border-gray-300 bg-gray-100 text-gray-500 text-left mt-2  rounded">
          <div className="border-b py-1">
            <label className="w-full text-base text-black font-semibold">
              Payment Details
            </label>
          </div>
          <div className=" text-sm xl:text-base grid grid-cols-2 gap-2 lg:grid-cols-3 items-center w-full py-1">
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">Total Bill Amt </h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">GST App Amt</h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">--- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">Adm App Amt</h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">Adm. Char. Amt </h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">Paybale Amt </h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">Paid Amt</h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-10/12 ">
              <h1 className="font-semibold text-sm text-black">GST Amt</h1>
              <div className="flex space-x-2 items-center">
                <span>:</span>
                <span className="text-black font-normal">---- </span>
              </div>
            </div>
            {/* <Divider orientation="vertical" className="h-full"/> */}
            <div className="flex justify-start items-center space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  className=" h-4 w-4"
                  type="radio"
                  name="draftbill"
                  value="draftbill"
                  id="draftbill"
                  checked={selectedRbtn === "draftbill"}
                  onChange={changeHandlerRbtn}
                />
                <label htmlFor="all" className="ml-2 text-black">
                  Draft Bill
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  className=" h-4 w-4 ml-5 md:ml-0 "
                  type="radio"
                  value="finalbill"
                  id="patientbill"
                  checked={selectedRbtn === "finalbill"}
                  name="finalbill"
                  onChange={changeHandlerRbtn}
                />
                <label htmlFor="finalbill" className="ml-2 text-black">
                  Final Bill
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                className=" h-4 w-4 ml-5 md:ml-0 "
                type="checkbox"
                value="consolidated"
                id="consolidated"
                name="consolidated"
              />
              <label htmlFor="consolidated" className="ml-2 text-black">
                Consolidated
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-2 justify-center lg:justify-end">
          <div className="">
            <AdvanceButton />
          </div>
          <ViewChargesButton />
          <DischargeButton />
          <PrintButton />
          <ResetButton />
          <SaveButton />
        </div>
      </div>
    </>
  );
}
