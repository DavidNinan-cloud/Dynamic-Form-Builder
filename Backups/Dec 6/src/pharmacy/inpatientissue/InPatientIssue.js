import { Button, TextField } from "@mui/material";
import React from "react";
import CommonBackDrop from "../../Common Components/CommonBackDrop/CommonBackDrop";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import InPatientTable from "./inpatienttable/InPatientTable";
import AddIssueButton from "../../Common Components/Buttons/AddIssueButton"
import InpatientModal from "./InpatientModal";
import InpatientRowModal from "./InPatientRowModal";
import SearchIconButton from "../../Common Components/Buttons/SearchIconButton";

const inPatientIssueData = {
  message: "In Patient Issued list found ",
  result: [
    {
      "Issue No": "123",
      "Issue Date": "01/02/2022",
      "Patient Name": "Ankita Jadhav",
      "Bed No": "154",
      "Total Amt": "44500",
      "Indent No": "75",
      "Admission Id": "1",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "234",
      "Issue Date": "11/12/2012",
      "Patient Name": "Shamli Ranpise",
      "Bed No": "654",
      "Total Amt": "44500",
      "Indent No": "666",
      "Admission Id": "3",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "633",
      "Issue Date": "25/06/2018",
      "Patient Name": "Ramnath Kakde",
      "Bed No": "754",
      "Total Amt": "98500",
      "Indent No": "895",
      "Admission Id": "6",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "45",
      "Issue Date": "16/03/2019",
      "Patient Name": "Dash Dash",
      "Bed No": "187",
      "Total Amt": "1110",
      "Indent No": "455",
      "Admission Id": "84",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "987",
      "Issue Date": "11/12/2020",
      "Patient Name": "Utkarsh Jadhav",
      "Bed No": "634",
      "Total Amt": "44500",
      "Indent No": "879",
      "Admission Id": "71",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "44",
      "Issue Date": "11/12/2011",
      "Patient Name": "Samiksha Kondhe",
      "Bed No": "78",
      "Total Amt": "4870",
      "Indent No": "895",
      "Admission Id": "10",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "804",
      "Issue Date": "18/02/2010",
      "Patient Name": "Sita Yadav",
      "Bed No": "154",
      "Total Amt": "44500",
      "Indent No": "895",
      "Admission Id": "32",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "633",
      "Issue Date": "25/06/2018",
      "Patient Name": "Ramnath Kakde",
      "Bed No": "754",
      "Total Amt": "98500",
      "Indent No": "895",
      "Admission Id": "6",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "45",
      "Issue Date": "16/03/2019",
      "Patient Name": "Dash Dash",
      "Bed No": "187",
      "Total Amt": "1110",
      "Indent No": "455",
      "Admission Id": "84",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "987",
      "Issue Date": "11/12/2020",
      "Patient Name": "Utkarsh Jadhav",
      "Bed No": "634",
      "Total Amt": "44500",
      "Indent No": "879",
      "Admission Id": "71",
      "Issued By": "lorem ipusm",
    },
    {
      "Issue No": "44",
      "Issue Date": "11/12/2011",
      "Patient Name": "Samiksha Kondhe",
      "Bed No": "78",
      "Total Amt": "4870",
      "Indent No": "895",
      "Admission Id": "10",
      "Issued By": "lorem ipusm",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const issues = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Issued",
    label: "Issued",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];
export default function InPatientIssue() {

  const defaultValues = {
    searchableSelect: null,
    fromDate: new Date(),
    toDate: new Date(),
    issue: null,
  };

  let searchValue = "";
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  
  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setidValue] = React.useState("");
  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };
   //useState and handle Methods for Modal Open & Close   Click on New Issue
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //useState and handle Methods for Modal Open & Close   Click on row Modal
  const [openRowModal, setOpenRowModal] = React.useState(false);
  const handleOpenRowModal = () => setOpenRowModal(true);
  const handleCloseRowModal = () => setOpenRowModal(false);

  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);


  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("you can type :");
    // if (autoSearchString !== "") {
    //   searchValue = autoSearchString;
    //   autoSearchGender(autoSearchString)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       setOptions(res.result);
    //     });
    // }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    // if (value === null) {
    //   setSearchString("");
    // } else {
    //   searchValue = value.gender;
    // }
  };

  // Display Table Data
  React.useEffect(() => {
    setData(inPatientIssueData);
    setDataResult(inPatientIssueData.result);
  }, []);

  //VIEW Functionaity
  function rowClick(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <h1 className=" grid justify-center items-center text-black font-Poppins text-xl whitespace-nowrap">
          InPatient Issue
        </h1>

        <div className="flex gap-5 w-full mt-3">
          {/* searchable */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 w-full">
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
              <SearchBar
                name="searchableSelect"
                searchIcon={true}
                placeholder="Search By Patient Name/UHID/Issue No/Mob."
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div>
              <DropdownField
                control={control}
                name="issue"
                placeholder="Issue"
                dataArray={issues}
                isMulti={false}
                isSearchable={false}
              />
            </div>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                // disablePast
                label="From Date"
                value={selectedFromDate}
                name="fromDate"
                onChange={(newValue) => {
                  setSelectedFromDate(newValue);
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disableFuture
                label="To Date"
                value={selectedToDate}
                onChange={(newValue) => {
                  setSelectedToDate(newValue);
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
            <div className="flex items-start gap-2 lg:col-span-2 xl:col-span-1">
             <SearchIconButton
              onClick={()=>{
                console.log("Click SearchIcon Button");
              }} />
              <div className="flex justify-between gap-3">
                <ResetButton onClick={() => {reset(defaultValues);
               setSelectedFromDate(null);
               setSelectedToDate(null);
                }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between py-1">
          <div className="text-lg font-semibold">InPatient Issue List</div>
          <div>
            <AddIssueButton
              onClick={() => {
                console.log("InPatient Modal Called");
                handleOpen();
              }}
            />
          </div>
        </div>

        <CommonBackDrop openBackdrop={openBackdrop} />

        {/* Table */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <InPatientTable
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
            // editRow={editRow}
            // deleteRow={deleteRow}
            rowClick={rowClick}
            openRowModal={openRowModal}
            setOpenRowModal={setOpenRowModal}
            handleOpenRowModal={handleOpenRowModal}
            handleCloseRowModal={handleCloseRowModal}
          />
        ) : null}

        <InpatientModal
          // populateTable={populateTable}
          // edit={edit}
          // setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          idValue={idValue}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
          // openBackdrop={openBackdrop}
          // setOpenBackdrop={setOpenBackdrop}
        />

        <InpatientRowModal
            idValue={idValue}
          openRowModal={openRowModal}
          setOpenRowModal={setOpenRowModal}
          handleOpenRowModal={handleOpenRowModal}
          handleCloseRowModal={handleCloseRowModal}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />
      </div>
    </>
  );
}
