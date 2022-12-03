import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import CancelPresentationIconButton from "../../Common Components/Buttons/CancelPresentationIconButton";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SelectButton from "../../Common Components/Buttons/SelectButton";
import RadioField from "../../Common Components/FormFields/RadioField";
import IndentListTable from "./inpatienttable/IndentListTable";
import ItemListTable from "./inpatienttable/ItemListTable";
import SearchIconButton from "../../Common Components/Buttons/SearchIconButton";

const GetIndentModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 20,
  p: 4,
};

const indenebtListData = {
  message: "Indent list found ",
  result: [
    {
      "Indent No.": "03",
      "Indent Date": "11/02/12",
      "Indent From Store": "Operation Theater",
      "Patient Name": "Suresh Kumar Rao",
      "IPD No.": "40",
    },
    {
      "Indent No.": "43",
      "Indent Date": "5/11/22",
      "Indent From Store": "Floor 1",
      "Patient Name": "Surendra shetty",
      "IPD No.": "10",
    },
    {
      "Indent No.": "33",
      "Indent Date": "15/8/19",
      "Indent From Store": "Floor 1",
      "Patient Name": "Surendra shetty",
      "IPD No.": "12",
    },
    {
      "Indent No.": "55",
      "Indent Date": "10/04/18",
      "Indent From Store": "Floor 1",
      "Patient Name": "Surendra shetty",
      "IPD No.": "16",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const itemListData = {
  message: "Item list found ",
  result: [
    {
      Item: "123",
      "Indent Qty": "120",
      "Pending Qty": "20",
      Rack: "ABC",
      Shelf: "1452",
    },
    {
      Item: "36",
      "Indent Qty": "120",
      "Pending Qty": "20",
      Rack: "ABC",
      Shelf: "235",
    },
    {
      Item: "18",
      "Indent Qty": "200",
      "Pending Qty": "50",
      Rack: "ABC",
      Shelf: "1",
    },
    {
      Item: "40",
      "Indent Qty": "320",
      "Pending Qty": "90",
      Rack: "ABC",
      Shelf: "870",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function GetIndentModal(props) {
  const getIndentRadio = [
    {
      id: "All",
      value: "All",
      label: "All",
    },
    {
      id: "Yes",
      value: "Yes",
      label: "Yes",
    },
    {
      id: "No",
      value: "No",
      label: "No",
    },
  ];

  const defaultValues ={
    searchPatientIndent:null,
    store:null,
    fromDate: new Date(),
    toDate: new Date(),
  }
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataIndent, setIndentData] = React.useState({
    result: [],
    actions: [],
  });

  const [dataResult, setDataResult] = React.useState([]);
  const [dataIndentResult, setIndentDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [searchId, setSearchId] = React.useState(null);

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

  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    mode: "onChange",
  });

  let getIndentRadioVal = watch("getIndentRadio");
  React.useEffect(() => {
    console.log("opdIpd radio field is " + getIndentRadioVal);
  }, [getIndentRadioVal]);

  React.useEffect(() => {
    setValue("getIndentRadio", "All");
  }, []);
  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  // Display Indent List Table Data
  React.useEffect(() => {
    setIndentData(indenebtListData);
    setIndentDataResult(indenebtListData.result);
  }, []);

  // Display Item List Table Data
  React.useEffect(() => {
    setData(itemListData);
    setDataResult(itemListData.result);
  }, []);

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("The value typed by the user is " + autoSearchString);
  };
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  //VIEW Functionaity
  function rowClick(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <div className="mt-10">
      <Modal
        open={props.openGetIndentModal}
        onClose={() => {
          // props.handleGetIndentModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={GetIndentModalStyle} className="max-h-[88%] xl:max-h-[80%]">
          <div className="grid grid-cols-1 md:grid-cols-1  w-full ">
            <CancelPresentationIconButton
              onClick={() => {
                props.handleGetIndentModalClose();
              }}
            />

            <div className="row">
              <fieldset className="border border-gray-300 text-left px-3 lg:px-4  rounded mt-1 lg:m-2 ">
                <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-600">
                  InPatient Indents
                </legend>
                <form
                  className="grid grid-cols-1 w-full"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="flex gap-5 w-full mt-3">
                    <div className="grid grid-cols-3 xl:grid-cols-5  gap-2">
                      <div className="col-span-3 xl:col-span-2">
                        <SearchBar
                          searchIcon={true}
                          name="searchPatientIndent"
                          placeholder="Search By Patient Name / Indent No"
                          dataArray={options}
                          handleInputChange={handleChange}
                          onChange={autoSelectedValue}
                          label="Item Search"
                          isSearchable={true}
                          isClearable={false}
                        />
                      </div>
                      <div>
                        <DropdownField
                          control={control}
                          name="store"
                          placeholder="Store"
                          // dataArray={store}
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
                    </div>
                  </div>

                  {/* Radio Button n searchIcon */}
                  <div className="flex items-end gap-2 py-2">
                    <fieldset className="border border-gray-300 rounded">
                      <legend className="font-semibold text-sm text-gray-700 ml-3">
                        Is Urgent
                      </legend>
                      <div className="flex px-2">
                        <RadioField
                          label=""
                          name="getIndentRadio"
                          control={control}
                          dataArray={getIndentRadio}
                        />
                      </div>
                    </fieldset>
                  <SearchIconButton
                  onClick={()=>{
                    console.log("Click Search Icon");
                  }} />

                    <ResetButton onClick={() => {reset(defaultValues);
               setSelectedFromDate(null);
               setSelectedToDate(null);
                     }} />
                  </div>

                  {/* Patient Information */}
                  <div className="my-2 text-sm lg:text-base grid border bg-gray-100 border-gray-300 px-2 rounded">
                    <div className="py-2 grid grid-cols-2 lg:grid-cols-3 gap-2">

                      <div className="flex gap-2">
                        <h1 className="font-semibold text-sm text-black">
                          Patient Name
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-8 xl:space-x-3">
                        <h1 className="font-semibold text-sm text-black">
                          UHID
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-16 lg:space-x-9 xl:space-x-6">
                        <h1 className="font-semibold text-sm text-black">
                          Age
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-3 lg:space-x-11 ">
                        <h1 className="font-semibold text-sm text-black">
                          Gender
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-14 lg:space-x-7 xl:space-x-2">
                        <h1 className="font-semibold text-sm text-black">
                          Ward
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-3 xl:space-x-0">
                        <h1 className="font-semibold text-sm text-black">
                          Bed No.
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <h1 className="font-semibold text-sm text-black">
                          Bed Category
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="flex gap-2 space-x-5 xl:space-x-1">
                        <h1 className="font-semibold text-sm text-black">
                          I.P. No.
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 w-full">
                    <div className="col-span-2">
                      <div className="font-semibold text-sm text-black">
                        Indent List :
                      </div>
                      <IndentListTable
                      data= {data}
                        searchString={searchString}
                        dataIndentResult={dataIndentResult}
                        setIndentDataResult={setIndentDataResult}
                        dataIndent={dataIndent}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        // count={count}
                        // editRow={editRow}
                        // deleteRow={deleteRow}
                        rowClick={rowClick}
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="font-semibold text-sm text-black">
                        Item List :
                      </div>
                      <ItemListTable
                        searchString={searchString}
                        dataResult={dataResult}
                        setDataResult={setDataResult}
                        data={data}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        // count={count}
                        // editRow={editRow}
                        // deleteRow={deleteRow}
                        rowClick={rowClick}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pb-2">
                     <SelectButton />
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
