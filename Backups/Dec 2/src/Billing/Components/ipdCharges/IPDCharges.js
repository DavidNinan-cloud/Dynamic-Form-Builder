import * as React from "react";
//imports from react library
import { useEffect } from "react";
//imported from  mui library
import { Button, TextField } from "@mui/material";
//importing the CommonMasterTable ; which is common to all
// import CommonMasterTable from "../common/CommonMasterTable";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
//fetching data into IPDChargesService.js
import {
  fetchAllIPDCharges, //fetch table Data
  autoSearchIPDCharges,
} from "../../services/ipdCharges/IPDChargesServices";
// import ConfirmationModal from "../common/formfields/ConfirmationModal";
// import {
//   deleteAlert,
//   errdeleteAlert,
// } from "../../../Common Components/Toasts/Toasts";
// import LoadingSpinner from "../common/loadingspinner/loadingSpinner";
import ReactSelect from "react-select";
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

export default function IPDCharges() {
  //For search POST Request , Set the searchObj into the component state variable
  const searchIPDCharges = {
    page: 0,
    size: 10,
    searchString: "",
  };
  const [date, setDate] = React.useState(null);
  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });

  //state variable for storing the modal form data [for Search POST Request]
  const [options, setOptions] = React.useState([]);

  //for create suggestion object for Search bar
  const [selectedObj, setSelectedObj] = React.useState("");

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  //When No Records Found That time Show
  const [recordWarning, showRecordWarning] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //Before the component gets mounted , call the asynchronous function fetchAllGender(). And resolve the promise returned by that function.
  useEffect(() => {
    populateTable(searchObj);
  }, []);

  //POST API Fetch Table Data
  //populate the CommonMasterTable using the function populateTable
  function populateTable(searchParameter) {
    showSpinner(true); // fetching data from server that time spinner show / loading
    showRecordWarning(false);
    fetchAllIPDCharges(searchParameter)
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
      autoSearchIPDCharges(autoSearchString)
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

  return (
    <>
      <div className="w-full px-6">
        <div className="w-full grid   pt-14  mt-4 md:rounded-md">
          {/*searchable dropdown */}
          <div className="flex items-center  gap-4 ml-5 w-full">
            <div className="text-xl text-black font-Poppins">
            IPD Charges
            </div>
            <div className="flex gap-2 items-center w-full xl:w-[30%]">
              <SearchBar
                selectedObj={selectedObj}
                type="button"
                name="SearchableSelect"
                placeholder="Search by UHID/MobileNo/PatientID"
                dataArray={options}
                isSearchable={true}
                handleInputChange={handleChange}
                selectedValue={autoSelectedValue}
              />
            </div>
            <div className="flex gap-2 ">
            <SearchIconButton 
            // onClick={filterData}
             />
            </div>
          </div>
          <form className="mt-2 w-full">
            <div className="border border-gray-300 bg-gray-100 rounded-md  w-full">
              <div className="grid grid-cols-2 lg:grid-cols-3 text-gray-500 justify-center mx-5 text-sm items-center gap-1 w-full py-3">
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12 ">
                  <h1 className="text-black font-semibold">Full Name </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">UHID </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">OPD No </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Gender </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Age </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Admission Date </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Ward </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Room No </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold ">Bed No </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Bed Category </h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Department </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 w-10/12 lg:w-8/12">
                  <h1 className="text-black font-semibold">Doctor </h1>
                  <div className="flex space-x-2 items-center text-black">
                    <span>:</span>
                    <span className="text-black font-normal">---- </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">
            <div className="text-sm lg:text-lg flex items-center gap-4 my-2 w-full">
              <div className="text-black font-Poppins flex justify-center">
                <label>List Of Previous Charges</label>
              </div>
              <div className="w-4/12">
                <ReactSelect placeholder="Service" />
              </div>
              <div className="flex space-x-2 items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label>Emergency</label>
              </div>
              <div className="flex space-x-2 items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label>Show All Charges</label>
              </div>
            </div>
            <div className=" ">
            <CommonTable data={IPDBillData} />
            </div>
            <div className="flex space-x-3 items-center my-2 justify-end">
              <h1>Total Amount</h1>
              <label className="border rounded-md px-4 py-1">
                ₹&nbsp; 67654
              </label>
            </div>
          </div>
          <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">
            <div className="flex items-center gap-4 my-2 w-full">
              <div className="text-lg text-black font-Poppins flex justify-center">
                <label>List Of Charges</label>
              </div>
              <div className="w-4/12">
                <ReactSelect placeholder="Service" />
              </div>
            </div>
            <div className="">
            <CommonTable data={IPDBillData} />
            </div>
            <div className="flex justify-between items-center my-2">
              <div className="flex space-x-3 items-center ">
                <h1>Total Advance</h1>
                <label className="border rounded-md px-4 py-1">
                  ₹&nbsp; 67654
                </label>
              </div>
              <div className="flex space-x-3 items-center  ">
                <div>
                  <button className="px-2 py-1 border border-orange-500 text-orange-500 rounded-md">
                    Verify Pharmacy
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <h1>Total Amount</h1>
                  <label className="border rounded-md px-4 py-1">
                    ₹&nbsp; 67654
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-2 my-3">
            <button className="px-5 py-1 border border-pink-600 text-pink-600 rounded-md">
              Cancel
            </button>
            <button className="px-5 py-1 border border-gray-500 text-gray-500 rounded-md">
              Bill
            </button>
            <button className="px-5 py-1 border border-gray-500 text-gray-500 rounded-md">
              Send Message
            </button>
            <button className="px-5 py-1 border border-green-600 text-green-600 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
