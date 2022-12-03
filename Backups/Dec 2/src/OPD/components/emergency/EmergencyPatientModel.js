import React from "react";
//imports from the yup library
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//imports from the common FormControl folder
import { Controller } from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import RadioField from "../../../Common Components/FormFields/RadioField";
import { Modal, Box, Button, Grid, TextField } from "@mui/material";
//closing to modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
// imports from react-query library
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";
export default function TypeOfAppointmentModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    appointmentTypeCode: yup
      .string()
      .required("Please Enter Appointment Code")
      .matches(/^[A-Za-z0-9]+$/, "Only alphabets are allowed for this field "),
    appointmentTypeName: yup
      .string()
      .required("Please Enter Appointment Type")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    appointmentTypeCode: "",
    appointmentTypeName: "",
    active: true,
  };
  const [countClick, setCountClick] = React.useState(0);
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  //state variable to open the confirmation modal for POST request
  const handelOpenPost = () => {
    console.log("Confirmation modal for post request has been opened");
    if (isValid === true) {
      //show the confirmation modal
      setOpenPost(true);
    } else if (isValid === false) {
      //handleSubmit of React hook forms can be invoked remotely as well. To show the error message
      handleSubmit(onSubmitDataHandler)();
    }
  };
  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
  //state variable to open the confirmation modal for PUT request
  const handelOpenPut = () => {
    console.log("Confirmation modal for put request has been opened");
    if (isValid === true) {
      //show the confirmation modal
      setOpenPut(true);
    } else if (isValid === false) {
      //handleSubmit of React hook forms can be invoked remotely as well. To show the error message
      handleSubmit(onSubmitDataHandler)();
    }
  };
  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    // errors object for show you the errors in the form
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const genders = [
    { id: 1, value: 1, label: "Male" },
    { id: 2, value: 2, label: "Female" },
    { id: 3, value: 3, label: "Other" },
  ];
  const ipdopd = [
    { id: 1, value: 1, label: "IPD" },
    { id: 2, value: 2, label: "OPD" },
  ];
  const patienttype = [
    { id: 1, value: 1, label: "Reg." },
    { id: 2, value: 2, label: "Emergency" },
  ];
  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    if (countClick === 0) {
      setCountClick(countClick + 1);
      //handleSubmit of React hook forms can be invoked remotely as well
      handleSubmit(onSubmitDataHandler)();
    }
  }
  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  // const onSubmitDataHandler = (data) => {
  // console.log("onSubmitDataHandler function has been invoked");
  // if (props.edit === true) {
  // console.log(
  // "Put request is going to be sent to the api and the data is "
  // );
  // console.log(data);
  // let updateObj = {
  // active: data.active,
  // appointmentTypeCode: data.appointmentTypeCode,
  // appointmentTypeName: data.appointmentTypeName,
  // id: data.id,
  // };
  // //invoke the function to send the put request
  // updateData(updateObj);
  // } else if (props.edit === false) {
  // console.log(
  // "Post request is going to be sent to the api and the data is "
  // );
  // console.log(data);
  // let postObj = {
  // active: data.active,
  // appointmentTypeCode: data.appointmentTypeCode,
  // appointmentTypeName: data.appointmentTypeName,
  // };
  // console.log(postObj);
  // postTypeOfAppointment(postObj);
  // }
  // };
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");
    if (props.countClick === 0) {
      props.setCountClick(countClick + 1);
      //handleSubmit of React hook forms can be invoked remotely as well
      handleSubmit(onSubmitDataHandler)();
    }
  }
  //function to send the put request
  // function updateData(data) {
  // // This is PUT request
  // updateTypeOfAppointment(data)
  // .then((response) => {
  // console.log(response);
  // if (response.data.statusCode === 200) {
  // updateAlert();
  // console.log("Record has been updated successfully");
  // props.populateTable(props.searchObj);
  // props.setCountClick(0);
  // //close the confirmation modal
  // handleClosePut();
  // //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandler
  // props.setEdit(false);
  // //to set the form fields as blank
  // reset(defaultValues);
  // //for closing the modal form after executing the PUT or POST request
  // props.setOpen(false);
  // }
  // })
  // .catch((error) => {
  // console.log(error);
  // props.setCountClick(0);
  // errorAlert();
  // //Code for React Toast
  // handleClosePut();
  // });
  // }
  //useMutation hook for the implementation of post request data saving
  // const { mutate: postTypeOfAppointment } = useMutation(
  // addNewTypeOfAppointment,
  // {
  // onSuccess: (res) => {
  // const result = {
  // status: res.status + "-" + res.statusText,
  // headers: res.headers,
  // data: res.data,
  // };
  // console.log(result);
  // props.setCountClick(0);
  // //When the request is successfull ; close the confirmation modal for POST
  // handleClosePost();
  // successAlert();
  // console.log("Record has been created");
  // props.populateTable(props.searchObj);
  // console.log("data has been recorded successfully");
  // //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandler
  // props.setEdit(false);
  // //to set the form fields as blank
  // reset(defaultValues);
  // //for closing the modal form after executing the PUT or POST request
  // props.setOpen(false);
  // },
  // onError: (error) => {
  // console.log(error);
  // props.setCountClick(0);
  // errorAlert();
  // //Code for React toast
  // handleClosePost();
  // },
  // }
  // );
  //useQuery hook for the functionality of edit icon click
  // const { status } = useQuery(
  // ["TypeOfAppoinment", props.idValue],
  // //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
  // () => {
  // if (props.idValue && openPut !== true) {
  // return getTypeOfAppoinmentById(props.idValue);
  // }
  // },
  // {
  // enabled: props.edit,
  // staleTime: 0,
  // cacheTime: 0,
  // onSuccess: (data) => {
  // console.log(
  // "data fetched with no problem by using the react query library"
  // );
  // console.log(status);
  // console.log(
  // "Data fetched from API after clicking on the edit icon is " +
  // JSON.stringify(data)
  // );
  // let resetObj = {
  // active: data.data.result.status,
  // appointmentTypeCode: data.data.result.appointmentTypeCode,
  // appointmentTypeName: data.data.result.appointmentTypeName,
  // id: data.data.result.id,
  // };
  // console.log(data);
  // if (data) {
  // reset(resetObj);
  // }
  // },
  // onError: (error) => {
  // console.log(error);
  // //Code for React Toast
  // },
  // }
  // );
  return (
    <>
      {/* Model and table name start */}
      <div className="">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="w-full">
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-400  rounded cursor-pointer"
                onClick={() => {
                  props.handleClose();
                }}
              />
            </div>
            <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-2 md:ml-0 md:mr-0 rounded  lg:mt-0 lg:m-2 ">
              <legend className="md:mx-2 lg:px-2 py-2 font-bold text-gray-700">
                Emergency Patient Information
              </legend>
              <form
                // onSubmit={handleSubmit(onSubmitDataHandler)}
                className="  gap-2 mx-2"
              >
                <div className=" gap-2 flex">
                  <fieldset className=" col-span-3 w-60 border border-gray-300 text-left  lg:px-2 md:ml-0  rounded  lg:mt-0  ">
                    <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                      Patient Type
                    </legend>
                    <RadioField
                      // label="Patient Type"
                      name="ipdopd"
                      control={control}
                      dataArray={ipdopd}
                    />
                  </fieldset>
                  <div className=" gap-2 ">
                    <fieldset className=" col-span-3 w-60 border border-gray-300 text-left  lg:px-2 md:ml-0  rounded  lg:mt-0  ">
                      <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                        Patient Type
                      </legend>
                      <RadioField
                        // label="Patient Type"
                        name="patienttype"
                        control={control}
                        dataArray={patienttype}
                      />
                    </fieldset>
                  </div>
                </div>

                <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-2 md:ml-0 md:mr-0 rounded  lg:mt-0 lg:m-2 ">
                  <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                    Emergency Patient Details
                  </legend>

                  <div class="grid overflow-hidden grid-lines sm grid-cols-3 py-2 gap-2 gap-x-2 gap-y-4 grid-flow-row w-auto h-auto">
                    <div class="box col-end-2 col-span-2 z-50">
                      <SearchDropdown
                        control={control}
                        error={errors.employeeCode}
                        // dataArray={searchEmployee}
                        searchIcon={true}
                        name="employeeCode"
                        label="Employee Code / Name"
                        placeholder="Search by UHID"
                        isSearchable={true}
                        isClearable={false}
                        // handleInputChange={handleChange}
                        // inputRef={{
                        //   ...register("employeeCode", {
                        //     onChange: (e) => {
                        //       console.log(
                        //         "The selected employeeCode object is" +
                        //           JSON.stringify(e)
                        //       );
                        //       setEmployeeExist(true);
                        //       setValue("alreadyexist", true);
                        //       if (e.target.value !== null) {
                        //         setIncomingData(e.target.value.allInfo);
                        //       }
                        //     },
                        //   }),
                        // }}
                      />
                    </div>
                    <div class=" col-end-2">
                      <div className=" row-start-2">
                        <div className="flex">
                          {/* //Title// */}
                          <div className="w-6/12 mr-3">
                            <DropdownField
                              control={control}
                              error={errors.prefix}
                              name="prefix"
                              label="Prefix"
                              isSearchable={false}
                              placeholder="Prefix"
                              isClearable={false}
                            />
                          </div>
                          {/* //First Name// */}
                          <div>
                            <InputField
                              name="firstName"
                              variant="outlined"
                              label="First Name *"
                              error={errors.firstName}
                              control={control}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box">
                      <div>
                        <InputField
                          name="middlename"
                          variant="outlined"
                          label="Middle Name *"
                          error={errors.middlename}
                          control={control}
                        />
                      </div>
                    </div>
                    <div class="box">
                      <div>
                        <InputField
                          name="lastname"
                          variant="outlined"
                          label="Last Name *"
                          error={errors.lastname}
                          control={control}
                        />
                      </div>
                    </div>

                    <div class="box col-span-2">
                      {/* //Date of Birth and Age // */}
                      <div className="row-start-3 col-span-2">
                        <div className="flex">
                          {/* //Date of Birth // */}
                          <div className="w-9/12 mr-2">
                            <Controller
                              control={control}
                              rules={{
                                required: true,
                              }}
                              render={({ field }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DatePicker
                                    //  open={openBirthDate}
                                    //  onOpen={() => setOpenBirthDate(true)}
                                    //  onClose={() => setOpenBirthDate(false)}
                                    // readOnly={true}
                                    renderInput={(props) => (
                                      <TextField
                                        {...props}
                                        type="date"
                                        variant="outlined"
                                        label="Date of Birth"
                                        name="dob"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        // disabled={true}
                                        readOnly={true}
                                        onClick={(e) => setOpenBirthDate(true)}
                                      />
                                    )}
                                    inputFormat="dd/MM/yyyy"
                                    disableFuture
                                    {...field}
                                    onAccept={(e) => {
                                      getAgeDOB(e);
                                    }}
                                    error={Boolean(errors.dob)}
                                    helperText={errors.dob?.message}
                                  />
                                </LocalizationProvider>
                              )}
                              name="dob"
                            />
                          </div>
                          {/* //Age// */}
                          <div className="w-3/12">
                            <InputField
                              name="age"
                              variant="outlined"
                              label="Age *"
                              error={errors.age}
                              control={control}
                              //  disabled={isDisabled}
                              //  inputRef={{
                              //    ...register("age", {
                              //      onChange: (e) => {
                              //        console.log(e.target);
                              //        setEnteredAge(e.target.value);
                              //      },
                              //    }),
                              //  }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box">
                      {/* //Years Months Days // */}
                      <div className="row-start-3 col-span-2">
                        <div className="flex justify-between gap-3">
                          {/* //Years// */}
                          <InputField
                            name="ageInYears"
                            variant="outlined"
                            label="Years"
                            disabled={true}
                            control={control}
                          />
                          {/* //Months// */}
                          <InputField
                            name="ageInMonths"
                            variant="outlined"
                            label="Months"
                            disabled={true}
                            control={control}
                          />
                          {/* //Days// */}
                          <InputField
                            name="ageInDays"
                            variant="outlined"
                            label="Days"
                            disabled={true}
                            control={control}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="box">
                      {/* //Gender// */}
                      <div className="row-start-3 col-span-2">
                        <RadioField
                          label="Gender"
                          name="gender"
                          control={control}
                          dataArray={genders}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-2 md:ml-0 md:mr-0 rounded  lg:mt-0 lg:m-2 ">
                  <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                    Add Services
                  </legend>
                  <div className="grid lg:grid-cols-1">
                    <div className="col-span-2 mb-2">
                      <SearchBar
                        // selectedObj={selectedObj}
                        type="button"
                        name="SearchableSelect"
                        placeholder="Search by Service Code / Name"
                        // dataArray={options}
                        isSearchable={true}
                        // handleInputChange={handleChange}
                        // selectedValue={autoSelectedValue}
                      />
                    </div>
                    {/* <div>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Service Code</TableCell>
                              <TableCell align="right">Service Name</TableCell>
                              <TableCell align="right">Qty</TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.number}>
                                <TableCell component="th" scope="row">
                                  {row.number}
                                </TableCell>
                                <TableCell align="right">{row.item}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div> */}
                  </div>
                </fieldset>
                <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-2 md:ml-0 md:mr-0 rounded  lg:mt-0 lg:m-2 ">
                  <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                    Patient Source
                  </legend>
                  <div className="grid grid-cols-3 gap-4 p-2">
                    <div className="">
                      <DropdownField
                        control={control}
                        error={errors.patientsource}
                        name="patientsource"
                        label="Patient Source *"
                        isSearchable={false}
                        placeholder="Patient Source *"
                        isClearable={false}
                      />
                    </div>
                    <div className="">
                      <DropdownField
                        control={control}
                        error={errors.doctor}
                        name="doctor"
                        label="Doctor *"
                        isSearchable={false}
                        placeholder="Doctor *"
                        isClearable={false}
                      />
                    </div>
                    <div className="">
                      <DropdownField
                        control={control}
                        error={errors.referralconsultant}
                        name="referralconsultant"
                        label="Referral Consultant *"
                        isSearchable={false}
                        placeholder="Referral Consultant *"
                        isClearable={false}
                      />
                    </div>
                    <div className="">
                      <label className="pr-12"> Bed Category : </label>
                      <Button
                        type="button"
                        variant="outlined"
                        size="small"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "35px",
                          minWidth: "120px",
                          minHeight: "35px",
                          fontWeight: "bold",
                          textTransform: "none",
                        }}
                      >
                        Select Bed
                      </Button>
                    </div>
                    <div className="">
                      <CheckBoxField
                        control={control}
                        name="medicolegalcase"
                        label="Medico Legal Case"
                      />
                    </div>
                    <div className="">
                      <CheckBoxField
                        control={control}
                        name="admissionadvised"
                        label="Admission Advised"
                      />
                    </div>

                    <div className="">
                      <label className="pr-12"> Type Of Care Require : </label>
                    </div>
                    <div className="">
                      <CheckBoxField
                        control={control}
                        name="medicalmanagement"
                        label="Medical Management"
                      />
                    </div>
                    <div className="">
                      <CheckBoxField
                        control={control}
                        name="surgicalmanagement"
                        label="Surgical Management"
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="flex space-x-3 gap-4 py-2 justify-end">
                  {props.edit ? (
                    <Button
                      type="button"
                      size="small"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "35px",
                        minWidth: "90px",
                        minHeight: "35px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                      // onClick={() => {
                      //   reset(defaultValues);
                      //   props.handleClose();
                      // }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="small"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "35px",
                        minWidth: "90px",
                        minHeight: "35px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                      // onClick={() => reset(defaultValues)} //Reset
                    >
                      Reset
                    </Button>
                  )}

                  {props.edit ? (
                    <Button
                      type="button"
                      variant="outlined"
                      size="small"
                      // onClick={handelOpenPut}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "35px",
                        minWidth: "120px",
                        minHeight: "35px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outlined"
                      size="small"
                      // onClick={handelOpenPost}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "35px",
                        minWidth: "120px",
                        minHeight: "35px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </form>
            </fieldset>
          </Box>
        </Modal>
        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />
        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
      {/* model and table name button end */}
    </>
  );
}
