import React from "react";
import { useEffect } from "react";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFieldsOmkar/RadioField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import OTListingTable from "../common/OTListingTable";

const OTListing = {
  result: [
    {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
     {
      "Operation Date": "20/12/2022",
      "UHID": "123456789",
      "Patient Name": "Nitin Pawar",
      "Surgery Description": "Carotid endarterectomy",
      "Start Time":"1:30 PM",
      "End Time":"2:30 PM",
      "Total Time":"60 Min",
      "Surgeon":"Jayant Pawar",
      "Anaesthetist":"Mahadev Kanade",
    },
  ],
  statusCode: 200,
  actions: ["Reschedule","Print","Cancel","View"],
  count: 3,
};

const OTBookingList = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);

  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(),
  });

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);
    // if (autoSearchString !== "") {
    //   autoSearchBlock(autoSearchString)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       console.log(
    //         "The response of auto-complete / auto-search is " +
    //           JSON.stringify(res)
    //       );
    //       setOptions(res.result);
    //     });
    // }
  };

  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  useEffect(() => {
    setData(OTListing);
    setDataResult(OTListing.result);
  }, []);

  return (
    <>
      <div className="mt-20 mx-2 items-center">
        <div className="text-xl my-2">OT Booking List</div>
        <div className="grid grid-cols-3 xl:grid-cols-6 2xl:flex gap-2 items-center">
          <div className="w-full col-span-2">
            <SearchBar
              name="searchbar"
              placeholder="Search by UHID code/Patient Name"
              searchIcon={true}
              control={control}
              handleInputChange={handleChange}
              onChange={autoSelectedValue}
            />
          </div>
          <div className="w-full">
            <DropdownField
              name="searchbar"
              placeholder="Operation Theater"
              control={control}
            />
          </div>
          <div className="flex space-x-2 w-full col-span-2 items-center">
            <div className="w-full ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="From Date"
                  name="date"
                  value={fromDate}
                  onChange={(newValue) => {
                    setFromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="bg-white"
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
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="To Date"
                  name="toDate"
                  value={toDate}
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="bg-white"
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
          <div className=" w-full xl:w-max mb-2">
            <fieldset className="border border-gray-300 text-left rounded">
              <legend className="px-2 ml-2 font-bold text-gray-800 text-sm">
                Patient Type
              </legend>
              <div className="gap-2 lg:gap-6 flex items-center px-3 py-0.5">
                <div className="w-full flex items-center gap-1">
                  <input
                    type="radio"
                    name="patientType"
                    value="all"
                    // error={errors.all}
                    // {...register("all")}
                  />
                  <label>All</label>
                </div>
                <div className="w-full flex items-center gap-1">
                  <input
                    type="radio"
                    name="patientType"
                    value="opd"
                    // error={errors.opd}
                    // {...register("opd")}
                  />
                  <label>OPD</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="patientType"
                    value="ipd"
                    // error={errors.ipd}
                    // {...register("ipd")}
                  />
                  <label>IPD</label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-max mb-2">
            <fieldset className="border border-gray-300 text-left rounded">
              <legend className="px-2 ml-2 font-bold text-gray-800 text-sm">
                Status
              </legend>
              <div className=" w-max flex items-center gap-1 px-2 py-0.5">
                <input
                  type="radio"
                  name="otCancelled"
                  value="otCancelled"
                  // error={errors.all}
                  // {...register("all")}
                />
                <label>OT Cancelled</label>
              </div>
            </fieldset>
            </div>
            <div>
              <Button
                type="button"
                className=" h-10 w-10 px-2 rounded-md text-gray-500"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                // onClick={filterData}
              >
                <SearchIcon className="cursor-pointer" />
              </Button>
            </div>
          </div>
        </div>
        <hr className="border border-t-sky-700"/>
        <div>
        {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
          <OTListingTable
                searchString={searchString}
                dataResult={dataResult}
                setDataResult={setDataResult}
                data={data}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={count}
                openModal={openModal}
                setOpenModal={setOpenModal}
          />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OTBookingList;