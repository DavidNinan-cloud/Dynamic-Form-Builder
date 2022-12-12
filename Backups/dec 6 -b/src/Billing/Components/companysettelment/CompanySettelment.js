import * as React from "react";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  fetchAllIPDBill, //fetch table Data
  autoSearchIPDBill,
  deleteIPDBillById, //fetch data for search bar autocomplete
} from "../../services/ipdbill/IPDBillServices";
import CompanySettlementTable from "../companysettelment/CompanySettlementTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../Common Components/Toasts/Toasts";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import InputField from "../../../Common Components/FormFields/InputField";
import SettleBillButton from "../../../Common Components/Buttons/SettleBillButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import ClaimReportButton from "../../../Common Components/Buttons/ClaimReportButton";
import SendMailButton from "../../../Common Components/Buttons/SendMailButton";
import PrintButton from "../../../Common Components/Buttons/PrintButton";
import ApplyButton from "../../../Common Components/Buttons/ApplyButton";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
//searchObj is sent with the POST request(set page size and searchString)
const searchObj = {
  page: 0,
  size: 10,
  searchString: "",
};

const companysettelmentData = {
  message: "In Patient Issued list found ",
  result: [
    {
      "Bill No": "30",
      "Bill Date": "20/12/2012",
      "Patient Name": "Ankita Jadhav",
      "Total Bill Amount": "154",
      "Commission Bill Amount": "44500",
      "Commission Balance Amount": "750",
      "Credit Note": "10",
      "Non Billable Amount": "4100",
      "Net Amount": "20",
    },
    {
      "Bill No": "07",
      "Bill Date": "01/02/2022",
      "Patient Name": "Komal Muthal",
      "Total Bill Amount": "04",
      "Commission Bill Amount": "18000",
      "Commission Balance Amount": "1000",
      "Credit Note": "302",
      "Non Billable Amount": "8796",
      "Net Amount": "50",
    },
    {
      "Bill No": "111",
      "Bill Date": "10/05/2019",
      "Patient Name": "Sonakshi Sinha",
      "Total Bill Amount": "94",
      "Commission Bill Amount": "6660",
      "Commission Balance Amount": "78",
      "Credit Note": "130",
      "Non Billable Amount": "6000",
      "Net Amount": "600",
    },
    {
      "Bill No": "01",
      "Bill Date": "25/10/2012",
      "Patient Name": "Rutuja Bhatkute",
      "Total Bill Amount": "12000",
      "Commission Bill Amount": "6600",
      "Commission Balance Amount": "1200",
      "Credit Note": "320",
      "Non Billable Amount": "20220",
      "Net Amount": "800",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function CompanySettlement() {
  const defaultValues = {
    OPD: true,
    IPD: false,
    nonbillable: false,
  };
  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    watch,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = methods;

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

   //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchString, setSearchString] = React.useState("");
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

  
  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  // Display Table Data
  React.useEffect(() => {
    setData(companysettelmentData);
    setDataResult(companysettelmentData.result);
  }, []);

  //Before the component gets mounted , call the asynchronous function fetchAllGender(). And resolve the promise returned by that function.
  // useEffect(() => {
  //   populateTable(searchObj);
  // }, []);

  // POST API Fetch Table Data
  // populate the CommonMasterTable using the function populateTable
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
  // const filterData = () => {
  //   console.log("Search icon has been clicked");

  //   console.log(
  //     "selected obj in filterData function is " + JSON.stringify(selectedObj)
  //   );
  //   console.log(typeof selectedObj);

  //   try {
  //     if (
  //       typeof selectedObj !== "string" &&
  //       selectedObj.hasOwnProperty("ipdCharges") &&
  //       selectedObj.ipdCharges !== ""
  //     ) {
  //       searchIPDCharges.searchString = selectedObj.ipdCharges;
  //       console.log("if block's populateTable");
  //       populateTable(searchIPDCharges);
  //     }
  //   } catch (err) {
  //     console.log("Selected object has empty or no search string");
  //   }
  // };

  //use props forthe DropdownField/ searchbar
  // const handleChange = (autoSearchString) => {
  //   if (autoSearchString !== "") {
  //     autoSearchIPDBill(autoSearchString)
  //       .then((response) => response.data)
  //       .then((res) => {
  //         setOptions(res.result);
  //       });
  //   }
  // };

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

  //Searchbar same as assignfunctionality compo
  const onSubmit = (data) => {
    console.log(data);
    let finalDataObj = {};
    finalDataObj.company = { id: parseInt(data.selectCompany.value) };

    // finalDataObj.functionalities = tableData;
    console.log("finalData", finalDataObj);
    // setFinalData(finalDataObj);
    handelOpenChild();
  };
  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-5 md:rounded-md overflow-hidden">
        {/* SearchBar */}
        <div className=" flex  items-center gap-3 pt-2 ">
          <h1 className="text-xl text-black font-Poppins whitespace-nowrap">
            Company Settlement
          </h1>

          <div className=" flex lg:justify-start px-2">
            <CheckBoxField
              control={control}
              name="OPD"
              label="OPD"
              placeholder="OPD"
            />

            <CheckBoxField
              control={control}
              name="IPD"
              label="IPD"
              placeholder="IPD"
            />

            <CheckBoxField
              control={control}
              name="nonbillable"
              label="Non Billable"
              placeholder="Non Billable"
            />
          </div>
        </div>

        <div className="flex items-center w-full gap-2 lg:gap-5">
          <div className="w-full xl:w-2/6">
            <DropdownField
              control={control}
              // error={errors.employeeType}
              name="selectCompany"
              // dataArray={roleDropdown}
              placeholder="Select Company"
              inputRef={{
                ...register("selectCompany", {
                  // onChange: (e) => {
                  //   console.log(e);
                  //   let roleId = e.target.value.value;
                  //   getFunctionalities(roleId).then((response) => {
                  //     console.log("Role Info", response.data.body.result);
                  //     setTableData(response.data.body.result);
                  //     calculateExpandArray(response.data.body.result);
                  //   }
                  //   );
                  // },
                }),
              }}
              isSearchable={false}
            />
          </div>

          <div className="xl:w-1/6">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                // disablePast
                label="From Date"
                // value={selectedFromDate}
                name="fromDate"
                onChange={(newValue) => {
                  // setSelectedFromDate(newValue);
                  console.log("From Date");
                }}
                renderInput={(params) => (
                  <TextField
                    className="bg-white"
                    fullWidth
                    name="fromDate"
                    size="small"
                    defaultValue=""
                    inputFormat="dd/MM/yyyy"
                    {...params}
                    sx={{
                      svg: { color: "#0B83A5" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="xl:w-1/6">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disableFuture
                label="To Date"
                // value={selectedToDate}
                onChange={(newValue) => {
                  // setSelectedToDate(newValue);
                  console.log("ToDate");
                }}
                renderInput={(params) => (
                  <TextField
                    className="bg-white"
                    name="toDate"
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      svg: { color: "#0B83A5" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="flex items-center">
          <SearchIconButton
          //  onClick={filterData} 
           />
          </div>
        </div>

        {/* List Of Payment Table */}
        <div className="flex justify-between my-2 items-center">
          <div className="w-full text-base text-black font-semibold">
            List Of Pending Bills
          </div>

          <div className="grid grid-cols-2">
            <h1 className="font-semibold text-base text-black whitespace-nowrap">
              Opening Balance :{" "}
              <span className="text-black font-normal">-----</span>
            </h1>
          </div>
        </div>

        {/* Table */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CompanySettlementTable 
          searchString={searchString}
          data={data}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          dataResult={dataResult}
          setDataResult={setDataResult}
          />
        ) : null}

        <div className="flex gap-8 mt-2 items-center">
          <div className="flex gap-3 md:text-sm lg:text-sm items-center">
            <h2 className="font-semibold text-black">Total Amount</h2>{" "}
            <span className="text-black"> : </span> <span className="font-normal text-black"> 25 </span>
          </div>

          {/* <div className="flex gap-3 md:text-sm lg:text-sm items-center"> */}
          {/* <h2 className="font-semibold text-gray-700">T.D.S (Tax)</h2>  */}
          {/* Input Fields */}
          <div className="w-2/12">
            <InputField
              name="tds"
              variant="outlined"
              label="T.D.S (Tax)"
              error={errors.tds}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
          </div>
          <div className="">
            <ApplyButton />
          </div>

          <div className="flex gap-3 md:text-sm lg:text-sm items-center">
            <h2 className="font-semibold text-black">Net Amount</h2>{" "}
            <span className="text-black"> : </span> <span className="font-normal text-black"> 20 </span>{" "}
            <SettleBillButton />
          </div>
        </div>

        <div className="flex justify-end gap-3 md:my-2 lg:my-1">
          {/* <div className="grid gap-2 items-start justify-end"> */}
          <CancelButton />
          <SendMailButton />
          <ClaimReportButton />
          {/* </div> */}
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
      </div>
    </>
  );
}
