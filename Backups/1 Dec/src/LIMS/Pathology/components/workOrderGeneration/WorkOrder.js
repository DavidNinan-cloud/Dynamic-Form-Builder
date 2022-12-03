import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import CommonMasterTable from "../../../../Common Components/CommonTable/NoApiCommonMasterTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
// import SearchableDropdown from "../../formfields"
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as yup from "yup";

let patientDetails = {
  UHID: "453432",
  "OPD No": "4344",
  "Doctor Name": "Suresh Subhash Patil",
  Gender: "Male",
  Age: "23 Years 02 Months 04 Days",
  "Marital Status": "Single",
  "Mobile No": "98943434",
};

const genders = [
  { id: 2, value: "female", label: "Female" },
  { id: 1, value: "male", label: "Male" },
  { id: 3, value: "other", label: "Other" },
];

const WorkOrder = () => {
  const defaultValues = {
    // countryCode: "",
    // countryName: "",
    // id: "",
    // isdCode: "",
    // mobileLength: "",
    // status: true,
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
    // resolver: yupResolver(schema),
    // defaultValues,
  });
  const [toggleOptions, setToggleOptions] = useState("OPD");

  const handleChange = (event, newToggleOptions) => {
    setToggleOptions(newToggleOptions);
    console.log("newToggleOptions", newToggleOptions);
  };
  let myResult = [
    {
      Id: 1,
      Code: "018",
      Description: "EuroDip 300",
      Status: "false",
    },
    {
      Id: 2,
      Code: "019",
      Description: "D5 Supreme",
      Status: "true",
    },
  ];

  const [open, setOpen] = useState(false);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  useEffect(() => {
    //console.log("result",result)
    setData({
      result: myResult,
      actions: ["Edit", "Delete"],
    });
    console.log("Data", data);
  }, []);

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-20  mt-8 md:rounded-md">
        <div className="flex flex-col justify-center">
          <span className="text-gray-500 font-bold text-left text-base">
            Work Order
          </span>
          <div className="mx-auto my-2">
            <ToggleButtonGroup
              color="primary"
              value={toggleOptions}
              exclusive
              size="medium"
              onChange={handleChange}
            >
              <ToggleButton value="OPD">OPD</ToggleButton>
              <ToggleButton value="IPD">IPD</ToggleButton>
              <ToggleButton value="OUT PATIENT">OUT PATIENT</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {toggleOptions === "OPD" && (
            <div className="grid grid-cols-2 gap-2 my-2">
              <fieldset className="border rounded-md flex flex-col lg:col-span-2 md:col-span-2">
                <legend className="text-md font-bold col-span-2 text-lg">
                  Patient Details
                </legend>
                <div className="grid grid-cols-6 gap-3 p-2">
                  <div className="grid grid-cols-2 col-span-2">
                    <div className="font-semibold col-span-1">UHID</div>
                    <div className="text-gray-500 col-span-1">
                      : {patientDetails.UHID}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 col-span-2">
                    <div className="font-semibold col-span-1">Gender</div>
                    <div className="text-gray-500 col-span-1">
                      : {patientDetails.Gender}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 col-span-2">
                    <div className="font-semibold col-span-1">Doctor Name</div>
                    <div className="col-span-1 text-gray-500">
                      : {patientDetails["Doctor Name"]}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 col-span-2">
                    <div className="font-semibold col-span-1">Age</div>
                    <div className="col-span-1 text-gray-500">
                      : {patientDetails.Age}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 col-span-2">
                    <div className="font-semibold col-span-1">Mobile No</div>
                    <div className="text-gray-500 col-span-1">
                      : {patientDetails["Mobile No"]}
                    </div>
                  </div>
                </div>
                {/* <div className="grid grid-cols-6 gap-2 p-2">
                  <div className="flex flex-col col-span-1 gap-1">
                    <div className="">UHID</div>
                    <div>Patient Name </div>
                    <div>Gender</div>
                    <div>Age</div>
                    <div>Marital Status</div>
                    <div>Mobile No</div>
                  </div>
                  <div className="flex flex-col col-span-2 gap-1">
                    <div className="">: {patientDetails.UHID}</div>
                    <div>: {patientDetails["Patient Name"]}</div>
                    <div>: {patientDetails.Gender}</div>
                    <div>: {patientDetails.Age}</div>
                    <div>: {patientDetails["Marital Status"]}</div>
                    <div>: {patientDetails["Mobile No"]}</div>
                  </div>
                  <div className="flex flex-col col-span-1 gap-1">
                    <div className="">OPD No.</div>
                  </div>
                  <div className="flex flex-col col-span-2 gap-1">
                    <div className="">: {patientDetails["OPD No"]}</div>
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-2 gap-2 p-2">
                  <span className="text-md font-bold col-span-2">
                    Patient Details
                  </span>

                  <div className="col-span-1">
                    <SearchBar
                      type="button"
                      name="uhidCode"
                      placeholder="UHID Code"
                      isSearchable={true}
                    />
                  </div>
                  <div className="col-span-1">
                    

                    <InputField
                      name="opdId"
                      variant="outlined"
                      label="OPD Id"
                      error={errors.opdId}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    
                    <InputField
                      name="mobileNo"
                      variant="outlined"
                      label="Mobile No"
                      error={errors.mobileNo}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="emailId"
                      variant="outlined"
                      label="Email Id"
                      error={errors.emailId}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1 flex items-center space-x-2">
                    <div className="w-32">
                      <DropdownField
                        control={control}
                        error={errors.prefix}
                        name="prefix"
                        label="Prefix"
                        // dataArray={prefix}
                        isSearchable={false}
                        placeholder="Prefix"
                        isClearable={false}
                        inputRef={{
                          ...register("category", {
                            onChange: (e) => {
                              console.log(e.target.value);
                              // setSelectedPrefix(e.target.value.label);
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className="col-span-1">
                      <InputField
                        name="firstName"
                        variant="outlined"
                        label="First Name"
                        error={errors.firstName}
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <InputField
                      name="middleName"
                      variant="outlined"
                      label="Middle Name"
                      error={errors.middleName}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="lastName"
                      variant="outlined"
                      label="Last Name"
                      error={errors.lastName}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <DropdownField
                      control={control}
                      error={errors.patientSource}
                      name="maritalStatus"
                      label="Marital Status"
                      // dataArray={maritalStatus}
                      isSearchable={false}
                      placeholder="Marital Status"
                      isClearable={false}
                      inputRef={{
                        ...register("category", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex items-center space-x-2">
                    <div className="w-full">
                      <Controller
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              // disablePast
                              renderInput={(props) => (
                                <TextField
                                  {...props}
                                  type="date"
                                  variant="outlined"
                                  label="Date Of Birth"
                                  name="dateOfBirth"
                                  //   InputLabelProps={{ shrink: true }}
                                  fullWidth
                                  size="small"
                                />
                              )}
                              inputFormat="dd/MM/yyyy"
                              disableFuture
                              //disablePast
                              {...field}
                              // onAccept={(e) => {
                              //   getNewRegDate(e);
                              // }}
                              error={Boolean(errors.dateOfBirth)}
                              helperText={errors.dateOfBirth?.message}
                            />
                          </LocalizationProvider>
                        )}
                        name="dateOfBirth"
                      />
                    </div>
                    <div className="w-24">
                      <InputField
                        name="age"
                        variant="outlined"
                        label="Age"
                        error={errors.age}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center space-x-2">
                    <div className="">
                      <InputField
                        name="years"
                        variant="outlined"
                        label="Years"
                        error={errors.years}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="months"
                        variant="outlined"
                        label="Months"
                        error={errors.months}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="days"
                        variant="outlined"
                        label="Days"
                        error={errors.days}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <div className="">
                      {" "}
                      <RadioField
                        label="Gender"
                        name="gender"
                        control={control}
                        dataArray={genders}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="pincode"
                        variant="outlined"
                        label="Pincode"
                        error={errors.pincode}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <InputField
                      name="address"
                      variant="outlined"
                      label="Address"
                      error={errors.address}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="tehsil"
                      variant="outlined"
                      label="Tehsil"
                      error={errors.tehsil}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="district"
                      variant="outlined"
                      label="District"
                      error={errors.district}
                      control={control}
                    />
                  </div>
                </div> */}
              </fieldset>

              {/* <fieldset className="border rounded-md flex flex-col lg:col-span-1 md:col-span-2">
                <legend className="text-md font-bold col-span-2 text-lg">
                  Billing Details
                </legend>
                <div className="grid grid-cols-2 gap-3 p-2">
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Patient source</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Patient category</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Tariff</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Token No</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Unit</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Doctor</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">CGHS Dispensary</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Department</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                  <div className="grid grid-cols-2 col-span-1">
                    <div className="font-semibold">Company</div>
                    <div className="text-gray-500">: {patientDetails.UHID}</div>
                  </div>
                </div>
              </fieldset> */}
              <div className="border rounded-md grid grid-cols-2 gap-2 p-2 col-span-2">
                <div className="col-span-2">
                  <span className="text-md font-bold">
                    Pathology Order Details
                  </span>
                  {data && data.result.length > 0 && (
                    <CommonMasterTable
                      //data to be displayed
                      data={data}
                      //editRow={editRow}
                      setOpen={setOpen}
                      //deleteRow={deleteRow}
                      displayView={displayView}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {toggleOptions === "OUT PATIENT" && (
            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="border rounded-md col-span-2">
                <div className="grid grid-cols-4 gap-2 p-2">
                  <span className="text-md font-bold col-span-4">
                    Patient Details
                  </span>

                  <div className="col-span-1">
                    <SearchBar
                      type="button"
                      name="uhidCode"
                      placeholder="UHID Code"
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="opdId"
                      variant="outlined"
                      label="OPD Id"
                      error={errors.opdId}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="mobileNo"
                      variant="outlined"
                      label="Mobile No"
                      error={errors.mobileNo}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="emailId"
                      variant="outlined"
                      label="Email Id"
                      error={errors.emailId}
                      control={control}
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2 flex items-center space-x-2">
                    <div className="w-32">
                      <DropdownField
                        control={control}
                        error={errors.prefix}
                        name="prefix"
                        label="Prefix"
                        // dataArray={prefix}
                        isSearchable={false}
                        placeholder="Prefix"
                        isClearable={false}
                        inputRef={{
                          ...register("category", {
                            onChange: (e) => {
                              console.log(e.target.value);
                              // setSelectedPrefix(e.target.value.label);
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="firstName"
                        variant="outlined"
                        label="First Name"
                        error={errors.firstName}
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <InputField
                      name="middleName"
                      variant="outlined"
                      label="Middle Name"
                      error={errors.middleName}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      name="lastName"
                      variant="outlined"
                      label="Last Name"
                      error={errors.lastName}
                      control={control}
                    />
                  </div>
                  <div className="col-span-1">
                    <DropdownField
                      control={control}
                      error={errors.patientSource}
                      name="maritalStatus"
                      label="Marital Status"
                      // dataArray={maritalStatus}
                      isSearchable={false}
                      placeholder="Marital Status"
                      isClearable={false}
                      inputRef={{
                        ...register("maritalStatus", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2 flex items-center space-x-2">
                    <div className="w-full">
                      <Controller
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              // disablePast
                              renderInput={(props) => (
                                <TextField
                                  {...props}
                                  type="date"
                                  variant="outlined"
                                  label="Date Of Birth"
                                  name="dateOfBirth"
                                  //   InputLabelProps={{ shrink: true }}
                                  fullWidth
                                  size="small"
                                />
                              )}
                              inputFormat="dd/MM/yyyy"
                              disableFuture
                              //disablePast
                              {...field}
                              // onAccept={(e) => {
                              //   getNewRegDate(e);
                              // }}
                              error={Boolean(errors.dateOfBirth)}
                              helperText={errors.dateOfBirth?.message}
                            />
                          </LocalizationProvider>
                        )}
                        name="dateOfBirth"
                      />
                    </div>
                    <div className="lg:w-24 md:w-full">
                      <InputField
                        name="age"
                        variant="outlined"
                        label="Age"
                        error={errors.age}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1 md:col-span-2 flex items-center space-x-2">
                    <div className="">
                      <InputField
                        name="years"
                        variant="outlined"
                        label="Years"
                        error={errors.years}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="months"
                        variant="outlined"
                        label="Months"
                        error={errors.months}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="days"
                        variant="outlined"
                        label="Days"
                        error={errors.days}
                        control={control}
                      />
                    </div>
                  </div>
                  {/* <div className="col-span-2 flex items-center space-x-2"> */}
                  <div className="col-span-2">
                    {" "}
                    <RadioField
                      label="Gender"
                      name="gender"
                      control={control}
                      dataArray={genders}
                    />
                  </div>
                  <div className="">
                    <InputField
                      name="pincode"
                      variant="outlined"
                      label="Pincode"
                      error={errors.pincode}
                      control={control}
                    />
                  </div>
                  {/* </div> */}
                  <div className="col-span-2">
                    <InputField
                      name="address"
                      variant="outlined"
                      label="Address"
                      error={errors.address}
                      control={control}
                    />
                  </div>
                  <div className="">
                    <DropdownField
                      control={control}
                      error={errors.patientSource}
                      name="tehsil"
                      label="Tehsil"
                      // dataArray={tehsil}
                      isSearchable={false}
                      placeholder="Tehsil"
                      isClearable={false}
                      inputRef={{
                        ...register("tehsil", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="">
                    <DropdownField
                      control={control}
                      error={errors.district}
                      name="district"
                      label="District"
                      // dataArray={district}
                      isSearchable={false}
                      placeholder="District"
                      isClearable={false}
                      inputRef={{
                        ...register("district", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="">
                    <DropdownField
                      control={control}
                      error={errors.state}
                      name="state"
                      label="State"
                      // dataArray={state}
                      isSearchable={false}
                      placeholder="State"
                      isClearable={false}
                      inputRef={{
                        ...register("state", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2">
                    <DropdownField
                      control={control}
                      error={errors.suggestedBy}
                      name="suggestedBy"
                      label="Suggested By (Dr.Name)"
                      // dataArray={suggestedBy}
                      isSearchable={false}
                      placeholder="Suggested By (Dr.Name)"
                      isClearable={false}
                      inputRef={{
                        ...register("suggestedBy", {
                          onChange: (e) => {
                            console.log(e.target.value);
                            // setSelectedPrefix(e.target.value.label);
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2">
                    <Controller
                      control={control}
                      defaultValue={null}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            // disablePast
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                type="date"
                                variant="outlined"
                                label="Suggested Date"
                                name="suggestedDate"
                                //   InputLabelProps={{ shrink: true }}
                                fullWidth
                                size="small"
                              />
                            )}
                            inputFormat="dd/MM/yyyy"
                            disableFuture
                            //disablePast
                            {...field}
                            // onAccept={(e) => {
                            //   getNewRegDate(e);
                            // }}
                            error={Boolean(errors.suggestedDate)}
                            helperText={errors.suggestedDate?.message}
                          />
                        </LocalizationProvider>
                      )}
                      name="suggestedDate"
                    />
                  </div>
                  <TextField
                    className="lg:col-span-1 md:col-span-2"
                    size="small"
                    fullWidth
                    label="Upload Presciption"
                    InputLabelProps={{ shrink: true }}
                    type="file"
                  />
                  <span className="text-md font-bold col-span-4">Remark</span>
                  <div className="col-span-4">
                    <InputField
                      name="remark"
                      variant="outlined"
                      label="Provisional Diagonsis/remark"
                      error={errors.remark}
                      control={control}
                    />
                  </div>

                  <div className="lg:col-span-1 md:col-span-2">
                    {/* Checkbox component */}

                    <CheckBoxField
                      control={control}
                      name="isHivConsentTaken"
                      label="Is Hiv Consent Taken ?"
                      placeholder="Is Hiv Consent Taken ?"
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2">
                    {/* Checkbox component */}

                    <CheckBoxField
                      control={control}
                      name="urgent"
                      label="Urgent"
                      placeholder="Urgent"
                    />
                  </div>
                  <div className="lg:col-span-1 md:col-span-2">
                    <CheckBoxField
                      control={control}
                      name="addWithExistingSample"
                      label="Add With Existing Sample"
                      placeholder="Add With Existing Sample"
                    />
                  </div>
                  <button className="lg:col-start-4 md:col-start-3 border p-1 border-blue-400 text-blue-400 rounded-md">
                    Add
                  </button>
                </div>
              </div>

              <div className="border rounded-md grid grid-cols-2 gap-2 p-2 col-span-2">
                <div className="col-span-2">
                  <span className="text-md font-bold">
                    Pathology Order Details
                  </span>
                  {data && data.result.length > 0 && (
                    <CommonMasterTable
                      //data to be displayed
                      data={data}
                      //editRow={editRow}
                      setOpen={setOpen}
                      //deleteRow={deleteRow}
                      displayView={displayView}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrder;
