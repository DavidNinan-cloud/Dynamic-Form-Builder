import React, { useContext, useEffect, useState } from "react";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import SugarLevelTable from "./SugarLevelTable";
//imports from react hook form
import { Controller, useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../../Common Components/FormFields/InputField";
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import { VisitContext } from "../ClinicalCareChart";
import {
  getConsultantList,
  getDrugList,
  getIntakeModeList,
  getRmoDoctorList,
  getSugarLevels,
  saveSugarLevel,
  updateSugarLevelByRmo,
} from "../../services/sugarLevelServices/SugarLevelServices";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";
import SearchDropdown from "../../../../master/components/common/formfields/SearchDropdown";
import {
  errorAlert,
  successAlert,
} from "../../../../Common Components/Toasts/CustomToasts";

function SugerLevel() {
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = useState();

  //Flag for conditional rendering of Add , Reset , Update , Cancel button
  const [edit, setEdit] = useState(false);

  //The state variable to store the id ; which is to be sent to "get request by id".
  const [idValue, setIdValue] = useState("");

  //The state variable to store the id for delete operation
  const [deleteFlag, setDeleteFlag] = useState(false);

  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [] });
  const [dataResult, setDataResult] = useState([]);
  const [finalData, setFinalData] = React.useState({});
  const [spinner, showSpinner] = React.useState(false);
  //for recalling api
  const [searchString, setSearchString] = React.useState("");
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [autoCompleteObj, setAutoCompleteObj] = useState("");
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState(false);
  const [consultant, setConsultant] = useState("");
  const [reportedRMO, setReportedRMO] = useState("");
  const [intakeMode, setIntakeMode] = useState("");
  const [drug, setDrug] = useState();
  const [patientInformation, setPatientInformation] = React.useState("");
  const [editRmo, setEditRmo] = useState(false);

  const doctorSchema = yup
    .object()
    .shape({
      bsl: yup.string().required("Required"),
      urineSugar: yup.string().required("Required"),
      urineKetone: yup.string().required("Required"),
      bodies: yup.string().required("Required"),
      intakeMode: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select IntakeMode"),
          label: yup.string().required("Please Select IntakeMode"),
        }),
      reportedRmo: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Injection"),
          label: yup.string().required("Please Select Injection"),
        }),
      // consultant: yup
      //   .object()
      //   .required("Required")
      //   .nullable()
      //   .shape({
      //     value: yup.string().required("Please Select Injection"),
      //     label: yup.string().required("Please Select Injection"),
      //   }),
      // injection: yup
      //   .object()
      //   .required("Required")
      //   .nullable()
      //   .shape({
      //     value: yup.string().required("Please Select Injection"),
      //     label: yup.string().required("Please Select Injection"),
      //   }),
      // injectionDose: yup.string().required("Required"),
      // informedBy: yup.string().required("Required"),
      // tablet: yup
      //   .object()
      //   .required("Required")
      //   .nullable()
      //   .shape({
      //     value: yup.string().required("Please Select Tablet"),
      //     label: yup.string().required("Please Select Tablet"),
      //   }),
      // tabletDose: yup.string().required("Required"),
    })
    .required();

  const nurseSchema = yup
    .object()
    .shape({
      bsl: yup.string().required("Required"),
      urineSugar: yup.string().required("Required"),
      urineKetone: yup.string().required("Required"),
      bodies: yup.string().required("Required"),
      intakeMode: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select IntakeMode"),
          label: yup.string().required("Please Select IntakeMode"),
        }),
      reportedRmo: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Injection"),
          label: yup.string().required("Please Select Injection"),
        }),
    })
    .required();

  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  //the object to reset the form to blank values
  const defaultValues = {
    bsl: "",
    urineSugar: "",
    urineKetone: "",
    bodies: "",
    intakeMode: null,
    reportedRmo: null,
    reportedRmoName: "",
    consultantName: "",
    consultant: null,
    injection: null,
    injectionDose: "",
    informedBy: "",
    tablet: null,
    tabletDose: "",
    givenTime: null,
    givenDate: null,
    id: null,
    active: true,
  };
  const getUserRole = localStorage.getItem("role");
  const [date, setDate] = React.useState(null);
  const [time, setGivenTime] = React.useState(null);

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm(allSchema());

  function allSchema() {
    if (getUserRole === "Doctor") {
      return {
        // use mode to specify the event that triggers each input field
        //schema for put request
        mode: "onChange",
        resolver: yupResolver(doctorSchema),
        defaultValues,
      };
    } else if (getUserRole === "Nurse") {
      return {
        // use mode to specify the event that triggers each input field
        //schema for post request
        mode: "onChange",
        resolver: yupResolver(nurseSchema),
        defaultValues,
      };
    }
  }
  let doseDate;
  let sugarLevelDate;

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();
  let minYear = currentYear - 111;

  const getDate = (e) => {
    sugarLevelDate = e;
    console.log("Given Date", sugarLevelDate);
    let givenYear = sugarLevelDate.getFullYear();
    let givenMonth = String(sugarLevelDate.getMonth() + 1).padStart(2, "0");
    let givenDay = String(sugarLevelDate.getDate()).padStart(2, "0");
    doseDate = [givenYear, givenMonth, givenDay].join("/");
  };

  const onSubmitDataHandler = (data) => {
    console.log("vitals data is ", data);
    if (getUserRole === "Doctor") {
      let updateObj = {
        visitId: patientVisitId,
        bsl: data.bsl,
        urineSugar: data.urineSugar,
        urineKetone: data.urineKetone,
        bodies: data.bodies,
        intakeMode: data.intakeMode.label,
        id: data.id,
        injection: data.injection,
        injectionDose: data.injectionDose,
        consultant: {
          _id: data.consultant.id,
        },
        tablet: data.tablet,
        tabletDose: data.tabletDose,
        informedBy: data.informedBy,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (getUserRole === "Nurse") {
      let postedObj = {
        visitId: patientVisitId,
        bsl: data.bsl,
        urineSugar: data.urineSugar,
        urineKetone: data.urineKetone,
        bodies: data.bodies,
        intakeMode: data.intakeMode.label,
        id: data.id,
        consultantName: data.consultantName,
        consultant: null,
        injection: data.injection,
        injectionDose: data.injectionDose,
        tablet: data.tablet,
        tabletDose: data.tabletDose,
        reportedRmo: {
          _id: data.reportedRmo.id,
        },
        reportedRmoName: data.reportedRmoName,
        givenDate: data.givenDate,
        givenTime: data.givenTime,
        informedBy: data.informedBy,
      };
      setOpenPost(true);
      setFinalData(postedObj);
      // reset(defaultValues);
      console.log("postedObj" + postedObj);
    }
  };

  function displayData(obj) {
    console.log("Obj in displayData is", obj);

    // addedBy: "Hansika Sen";
    // bodies: 2;
    // bsl: 2;
    // dateTime: "25-11-2022 03:44";
    // id: "6380956d72c5e55d73b205ce";
    // intakeMode: "PP";
    // reportedRmoName: "Mohit  Sharma";
    // urineKetone: 2;
    // urineSugar: 2;
    // visitId: 1223;

    // resetObj = {
    //   bsl: data.result.bsl,
    //   bodies: data.result.bodies,
    //   urineSugar: data.result.urineSugar,
    //   urineKetone: data.result.urineKetone,
    //   intakeMode: data.result.intakeMode,
    //   reportedRmoName: data.result.reportedRmo,
    // };

    let reportedRmoObj = {
      value: obj.reportedRmoName,
      label: obj.reportedRmoName,
    };

    let inTakeModeObj = {
      value: obj.intakeMode,
      label: obj.intakeMode,
    };

    console.log("Reported Rmo", reportedRmoObj);
    reset(obj);
    setValue("reportedRmo", reportedRmoObj);
    setValue("intakeMode", inTakeModeObj);
  }

  useEffect(() => {
    populateTable(patientVisitId);
    getConsultant();
    getReportedRMO();
    getIntakeMode();
  }, [finalData, patientVisitId]);

  const populateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    showRecordWarning(false);
    getSugarLevels(obj)
      .then((response) => {
        // console.log(
        //   "The search result of paerticulaer id is" +
        //     JSON.stringify(response.data.result)
        // );
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        // console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  // // axios request for data post. [POST SAVE Vitals]
  function postSugarLevels(obj) {
    saveSugarLevel(obj)
      .then((response) => {
        console.log("POSTED OBJ IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  function updateSugarLevelRmo() {
    updateSugarLevelByRmo(finalData)
      .then((response) => {
        console.log("POSTED OBJ IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value of pincode that was typed is " + autoSearchString);

    if (autoSearchString !== "") {
      getDrugList(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setDrug(res.result);
        });
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postSugarLevels(finalData);
  }

  function editSugarLevelRmo(sugarLevel) {
    setEditRmo(true);
  }
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };

  function getConsultant() {
    getConsultantList()
      .then((response) => {
        setConsultant(response.data.result);
      })
      .catch((error) => {});
  }

  function getReportedRMO() {
    getRmoDoctorList()
      .then((response) => {
        setReportedRMO(response.data.result);
      })
      .catch((error) => {});
  }

  function getIntakeMode() {
    getIntakeModeList()
      .then((response) => {
        setIntakeMode(response.data.result);
      })
      .catch((error) => {});
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div className="col-span-3 w-full ">
          <h1 className="my-1 font-semibold text-lg">Suger Level</h1>
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <SugarLevelTable
              data={data}
              count={count}
              dataResult={dataResult}
              setDataResult={setDataResult}
              setPatientInformation={setPatientInformation}
              displayData={displayData}
              editRmo={editRmo}
              setEditRmo={setEditRmo}
            />
          ) : null}
          {recordWarning === true && spinner === false ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null}
        </div>
        {getUserRole === "Doctor" ? (
          <div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div>
                <InputField
                  name="bsl"
                  variant="outlined"
                  label="BSL*"
                  error={errors.bsl}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </div>
              <div>
                <InputField
                  name="urineSugar"
                  variant="outlined"
                  label="Urin Sugar*"
                  error={errors.urineSugar}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </div>
              <div>
                <InputField
                  name="urineKetone"
                  variant="outlined"
                  label="Urin Ketone*"
                  error={errors.urineKetone}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </div>
              <div>
                <InputField
                  name="bodies"
                  variant="outlined"
                  label="Bodies*"
                  error={errors.bodies}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </div>
              <div>
                <DropdownField
                  control={control}
                  error={errors.intakeMode}
                  dataArray={intakeMode}
                  name="intakeMode"
                  isSearchable={false}
                  placeholder="Intake Mode"
                  isClearable={false}
                />
              </div>
              <div>
                <DropdownField
                  control={control}
                  error={errors.reportedRmo}
                  name="reportedRmo"
                  dataArray={reportedRMO}
                  isSearchable={false}
                  placeholder="Reported To RMO"
                  isClearable={false}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font font-semibold my-1">
                TO Be Field By RMO
              </h1>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div>
                  <DropdownField
                    control={control}
                    error={errors.consultant}
                    name="consultant"
                    dataArray={consultant}
                    isSearchable={false}
                    placeholder="Consultant"
                    isClearable={false}
                    isDisabled={getUserRole === "Nurse"}
                  />
                </div>
                <div>
                  <SearchDropdown
                    control={control}
                    error={errors.injection}
                    name="injection"
                    searchIcon={true}
                    placeholder="Injection"
                    dataArray={drug}
                    handleInputChange={handleChange}
                    disabled={getUserRole === "Nurse"}
                    inputRef={{
                      ...register("injection", {
                        onChange: (e) => {
                          console.log(
                            "The selected druglist object is" +
                              JSON.stringify(e)
                          );
                        },
                      }),
                    }}
                  />
                </div>
                <div>
                  <InputField
                    name="injectionDose"
                    variant="outlined"
                    label="Dose*"
                    error={errors.injectionDose}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    disabled={getUserRole === "Nurse"}
                  />
                </div>
                <div>
                  <InputField
                    name="informedBy"
                    variant="outlined"
                    label="InformedBy (RMO Name)*"
                    error={errors.informedBy}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    disabled={getUserRole === "Nurse"}
                  />
                </div>
                <div>
                  <SearchDropdown
                    control={control}
                    error={errors.tablet}
                    name="tablet"
                    searchIcon={true}
                    placeholder="Tablet"
                    dataArray={drug}
                    handleInputChange={handleChange}
                    isDisabled={getUserRole === "Nurse"}
                    inputRef={{
                      ...register("tablet", {
                        onChange: (e) => {
                          console.log(
                            "The selected druglist object is" +
                              JSON.stringify(e)
                          );
                        },
                      }),
                    }}
                  />
                </div>
                <div>
                  <InputField
                    name="tabletDose"
                    variant="outlined"
                    label="Dose*"
                    error={errors.tabletDose}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    disabled={getUserRole === "Nurse"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div>
              <InputField
                name="bsl"
                variant="outlined"
                label="BSL*"
                error={errors.bsl}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="urineSugar"
                variant="outlined"
                label="Urin Sugar*"
                error={errors.urineSugar}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="urineKetone"
                variant="outlined"
                label="Urin Ketone*"
                error={errors.urineKetone}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="bodies"
                variant="outlined"
                label="Bodies*"
                error={errors.bodies}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <DropdownField
                control={control}
                error={errors.intakeMode}
                dataArray={intakeMode}
                name="intakeMode"
                isSearchable={false}
                placeholder="Intake Mode"
                isClearable={false}
              />
            </div>
            <div>
              <DropdownField
                control={control}
                error={errors.reportedRmo}
                name="reportedRmo"
                dataArray={reportedRMO}
                isSearchable={false}
                placeholder="Reported To RMO"
                isClearable={false}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mt-3 justify-between">
          <div className="col-span-1 flex justify-between space-x-3">
            <div className="flex gap-2">
              {/* // Given Date // */}
              <Controller
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                name="givenDate"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Given Date"
                      name="givenDate"
                      value={date}
                      // minDate={new Date(minYear, currentMonth, currentDay)}
                      // inputFormat="dd/MM/yyyy"
                      // disableFuture
                      // {...field}
                      // onAccept={(e) => {
                      //   getDate(e);
                      // }}
                      onChange={(newValue) => {
                        setDate(newValue);
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
                )}
              />
            </div>

            <div className="flex gap-2">
              {/* //Given Time // */}
              <Controller
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                      label="Given Time"
                      name="givenTime"
                      value={time}
                      onChange={(newValue) => {
                        setGivenTime(newValue);
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
                )}
                name="givenTime"
              />
            </div>
          </div>
          <div className="flex col-span-2 justify-end space-x-3">
            <ResetButton
              onClick={() => {
                reset(defaultValues);
              }}
            />
            <AddButton />
          </div>
        </div>
      </form>

      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={updateSugarLevelRmo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />

      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}

export default SugerLevel;
