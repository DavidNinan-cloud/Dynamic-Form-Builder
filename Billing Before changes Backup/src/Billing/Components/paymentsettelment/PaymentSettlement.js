import * as React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  fetchAllIPDBill, //fetch table Data
  autoSearchIPDBill,
  deleteIPDBillById, //fetch data for search bar autocomplete
} from "../../services/ipdbill/IPDBillServices";
import ListofPaymentSettlementTable from "./ListofPaymentSettlementTable";
import ListofCreditBillPaymentSettlement from "./ListofCreditBillPaymentSettlementTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";

//searchObj is sent with the POST request(set page size and searchString)
const searchObj = {
  page: 0,
  size: 10,
  searchString: "",
};

const listOfPaymentTableData = {
  message: "List Of Payment found ",
  result: [
    {
      "Receipt No": "10",
      "Receipt Date": "11/02/1912",
      "Total Bill Amount": "25000",
      "Concession Amount": "5000",
      "Net Bill Amount": "20000",
      "Paid Amount": "4322",
      "Balance Amount": "10",
      "Amount Paid Date": "4100",
      "Mode of Payment": 20,
    },
    {
      "Receipt No": "25",
      "Receipt Date": "11/02/2012",
      "Total Bill Amount": "25000",
      "Concession Amount": "5000",
      "Net Bill Amount": "20000",
      "Paid Amount": "4322",
      "Balance Amount": "10",
      "Amount Paid Date": "4100",
      "Mode of Payment": 20,
    },
    {
      "Receipt No": "34",
      "Receipt Date": "11/02/1857",
      "Total Bill Amount": "25000",
      "Concession Amount": "5000",
      "Net Bill Amount": "20000",
      "Paid Amount": "4322",
      "Balance Amount": "10",
      "Amount Paid Date": "4100",
      "Mode of Payment": 20,
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const listOfCreditBillTableData = {
  message: "List Of Payment found ",
  result: [
    {
      "Bill No": "12",
      "Bill Date": "1/04/2002",
      "Total Bill Amount": "25000",
      "Concession Amount": "5000",
      "Net Bill Amount": "20000",
      "Paid Amount": "4322",
      "Balance Amount": "10",
      "Amount Paid Date": "4100",
      "Mode of Payment": 20,
    },
    {
      "Bill No": "13",
      "Bill Date": "14/11/2004",
      "Total Bill Amount": "5500",
      "Concession Amount": "9850",
      "Net Bill Amount": "87500",
      "Paid Amount": "9852",
      "Balance Amount": "870",
      "Amount Paid Date": "9800",
      "Mode of Payment": 200,
    },
    {
      "Bill No": "14",
      "Bill Date": "13/02/2000",
      "Total Bill Amount": "25800",
      "Concession Amount": "8550",
      "Net Bill Amount": "22300",
      "Paid Amount": "6322",
      "Balance Amount": "50",
      "Amount Paid Date": "6100",
      "Mode of Payment": 80,
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function PaymentSettlement() {
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

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataPaymentSettlement, setDataPaymentSettlement] = React.useState({
    result: [],
    actions: [],
  });

  const [dataResult, setDataResult] = React.useState([]);
  const [dataPaymentSettlResult, setDataPaymentSettlResult] = React.useState(
    []
  );
  const [searchString, setSearchString] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState("");
  const [idValue, setIdValue] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [openChild, setOpenChild] = React.useState(false);
  const [spinner, showSpinner] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  // Display List of Credit Bill Payment Settlement Table Data
  React.useEffect(() => {
    setData(listOfCreditBillTableData);
    setDataResult(listOfCreditBillTableData.result);
  }, []);

  // Display List of Payment Settlement Table Data
  React.useEffect(() => {
    setDataPaymentSettlement(listOfPaymentTableData);
    setDataPaymentSettlResult(listOfPaymentTableData.result);
  }, []);

  //Before the component gets mounted , call the asynchronous function fetchAllGender(). And resolve the promise returned by that function.
  // useEffect(() => {
  //   populateTable(searchObj);
  //  }, []);

  //  POST API Fetch Table Data
  //  populate the CommonMasterTable using the function populateTable
  // function populateTable(searchParameter) {
  //   showSpinner(true); // fetching data from server that time spinner show / loading
  //   showRecordWarning(false);
  //   fetchAllIPDBill(searchParameter)
  //     .then((response) => {
  //       console.log("The search result is " + JSON.stringify(response.data));
  //       return response.data;
  //     })
  //     .then((res) => {
  //       console.log("The input for setData function is " + JSON.stringify(res));
  //       setData(res);
  //       showSpinner(false); //when fetch data or data show that time loading Spinner stop
  //     })
  //     .catch(() => {
  //       showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
  //       showRecordWarning(true);
  //     });
  // }

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

  //EDIT API
  //event listener function for edit btn
  const editRow = (gender) => {
    setEdit(true); //when we click on edit(pencile) show cancle update btn
    console.log(gender);
    console.log(gender.Id);
    setIdValue(gender.Id);
    handleOpen();
  };

  //DELETE API
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

    deleteIPDBillById(deleteId)
      .then((response) => {
        console.log(response);
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

  //VIEW Functionaity
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md overflow-hidden">
        {/* SearchBar */}
        <div className=" flex items-center w-full md:gap-2 lg:gap-5 overflow-hidden">
          <h1 className="grid justify-center items-center text-black font-Poppins text-xl whitespace-nowrap">
            Payment Settelement
          </h1>

          {/*searchable dropdown */}
          <div className="flex gap-2 items-center w-full xl:w-1/2">
            <SearchBar
              selectedObj={selectedObj}
              type="button"
              name="SearchableSelect"
              placeholder="Search by UHID/Patient Name/Mob No."
              dataArray={options}
              isSearchable={true}
              handleInputChange={handleChange}
              selectedValue={autoSelectedValue}
            />

            <SearchIconButton 
            // onClick={filterData} 
            />
            <Button
              className=" h-9 w-10 px-2 rounded-md text-gray-500"
              type="button"
            >
              <TuneIcon className="cursor-pointer" />
            </Button>
          </div>
        </div>

        {/* Patient Informationdata */}
        <div className="grid grid-cols-4 mt-4 border bg-gray-100 border-gray-300 px-3 rounded py-3">
          <div className="grid grid-cols-2 lg:w-50 py-1">
            <h1 className="font-semibold text-sm">Patient Name</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">---</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:w-50 py-1">
            <h1 className="font-semibold text-sm">UHID</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div>
          <div className="grid grid-cols-2 py-1">
            <h1 className="font-semibold text-sm">Gender</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:w-50 py-1">
            <h1 className="font-semibold text-sm">Age</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div>
          <div className="grid grid-cols-2 py-1">
            <h1 className="font-semibold text-sm">Admission No.</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div>
          {/* <div className="grid grid-cols-2 lg:w-50 py-1">
            <h1 className="font-semibold text-sm">Ward</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:w-50 py-1">
            <h1 className="font-semibold text-sm">Room</h1>
            <div className="flex space-x-2 items-center">
              <span>:</span>
              <span className="text-black font-normal">----</span>
            </div>
          </div> */}
        </div>

        {/* List Of Payment Table */}
        <div className="flex items-end pt-2 font-semibold text-sm text-black">
          List Of Payment
        </div>
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <ListofPaymentSettlementTable
            searchString={searchString}
            dataPaymentSettlResult={dataPaymentSettlResult}
            setDataPaymentSettlResult={setDataPaymentSettlResult}
            dataPaymentSettlement={dataPaymentSettlement}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        ) : null}

        {/* List Of Credit Bill Table */}
        <div className="flex items-end pt-2 font-semibold text-sm text-black">
          List Of Credit Bills
        </div>
        {/* Table */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <ListofCreditBillPaymentSettlement
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        ) : null}

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

        {/* ServiceTax Ok Cancel Btn */}
        <div className="grid grid-cols-2">
          <div className="flex items-center my-2 justify-start">
            <h1>Admin Charge + Service Tax(Rs)</h1>
            <label className="border rounded-md px-4 py-1">₹&nbsp; 67654</label>
          </div>
          <div className="flex justify-end py-2 gap-3">
            {/* <button className="border border-orange-500 text-orange-500 px-5 rounded-md">
              Cancel
            </button> */}
            <CancelButton />
            {/* <button className="border border-customBlue text-customBlue px-5 rounded-md">
              Ok
            </button> */}
            <SaveButton />
          </div>
        </div>
      </div>
    </>
  );
}
