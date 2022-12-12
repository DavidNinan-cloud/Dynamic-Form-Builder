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
  updateSugarLevelByNurse,
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
import { format } from "date-fns";

function SugarLevel() {
  const [openPost, setOpenPost] = React.useState(false);
  const [openRmoPut, setOpenRmoPut] = React.useState(false);
  const [openNursePut, setOpenNursePut] = React.useState(false);
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

  const getUserRole = localStorage.getItem("role");
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [selectedSugarObj, setSelectedSugarObj] = React.useState();
  const [rowId, setRowId] = useState();

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
      injection: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Injection"),
          label: yup.string().required("Please Select Injection"),
        }),
      // injectionDose: yup.string().required("Required"),
      // informedBy: yup.string().required("Required"),
      tablet: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Tablet"),
          label: yup.string().required("Please Select Tablet"),
        }),
      // tabletDose: yup.string().required("Required"),
    })
    .required();

  const nurseSchema = yup
    .object()
    .shape({
      bsl: yup.number().required("Required"),
      urineSugar: yup.number().required("Required"),
      urineKetone: yup.number().required("Required"),
      bodies: yup.number().required("Required"),
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
    informedByRmo: null,
    tablet: null,
    tabletDose: "",
    givenTime: null,
    givenDate: null,
    id: "",
    active: true,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm(allSchema());

  function allSchema() {
    if (getUserRole === "RMO") {
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

  const inj = watch("injection");
  const tab = watch("tablet");

  const onSubmitDataHandler = (data) => {
    if (getUserRole === "Nurse" && rowId !== null && inj === null) {
      console.log("Sugar Levels data is ", data);
      let postedObj = {
        visitId: patientVisitId,
        bsl: data.bsl,
        urineSugar: data.urineSugar,
        urineKetone: data.urineKetone,
        bodies: data.bodies,
        intakeMode: data.intakeMode.label,
        reportedRmo: {
          _id: data.reportedRmo.id,
        },
      };
      setOpenPost(true);
      setFinalData(postedObj);
      console.log("postedObj " + JSON.stringify(postedObj));
      reset(defaultValues);
    } else if (getUserRole === "RMO" && rowId !== null) {
      let updateRmoObj = {
        visitId: patientVisitId,
        consultant: {
          _id: data.consultant.id,
        },
        injection: data.injection.label,
        injectionDose: data.injectionDose,
        tablet: data.tablet.label,
        tabletDose: data.tabletDose,
        id: selectedSugarObj.id,
      };
      setOpenRmoPut(true);
      setFinalData(updateRmoObj);
      console.log("updateRmoObj " + JSON.stringify(updateRmoObj));
      reset(defaultValues);
    } else {
      if (getUserRole === "Nurse" && rowId !== null && inj !== "") {
        console.log("Date is ", date);
        let dateArray = date.toLocaleDateString().split("/");
        console.log(dateArray);
        let dateStr = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        let updateNurseObj = {
          id: selectedSugarObj.id,
          givenDate: dateStr,
          givenTime: time.toLocaleTimeString(),
        };
        setOpenNursePut(true);
        setFinalData(updateNurseObj);
        console.log("updateNurseObj " + JSON.stringify(updateNurseObj));
        reset(defaultValues);
      }
    }
  };

  function displayData(obj) {
    console.log("Obj in displayData is", obj);

    setSelectedSugarObj(obj);

    let resetObj = {
      bsl: obj.BSL,
      urineSugar: obj["Urine Sugar"],
      urineKetone: obj["Urine Ketone"],
      bodies: obj.Bodies,
      intakeMode: { value: obj["Intake Mode"], label: obj["Intake Mode"] },
      reportedRmo: {
        value: obj["Informed To Rmo"],
        label: obj["Informed To Rmo"],
      },
      informedByRmo: {
        value: obj["Informed To Rmo"],
        label: obj["Informed To Rmo"],
      },
      consultant: {
        value: obj.Consultant,
        label: obj.Consultant,
      },
      injection: {
        value: obj.Injection,
        label: obj.Injection,
      },
      injectionDose: obj.injectionDose,
      tablet: {
        value: obj.Tablet,
        label: obj.Tablet,
      },
      tabletDose: obj.tabletDose,
    };

    reset(resetObj);
  }

  useEffect(() => {
    populateTable(patientVisitId);
    if (patientVisitId !== null) {
      getConsultant();
      getReportedRMO();
      getIntakeMode();
    }
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
    handleCloseRmoPut();
    updateSugarLevelByRmo(finalData)
      .then((response) => {
        console.log("RMO Updated OBJ IS " + JSON.stringify(response));
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg " + error.message);
      });
  }

  function updateSugarLevelNurse() {
    handleCloseNursePut();
    updateSugarLevelByNurse(finalData)
      .then((response) => {
        console.log("Nurse Updated OBJ IS " + JSON.stringify(response));
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg " + error.message);
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

  // function editSugarLevelRmo(sugarLevel) {
  //   setEditRmo(true);
  // }

  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };

  const handleCloseRmoPut = () => {
    console.log("Post modal is going to close");
    if (openRmoPut) {
      setOpenRmoPut(false);
    }
  };

  const handleCloseNursePut = () => {
    console.log("Post modal is going to close");
    if (openNursePut) {
      setOpenNursePut(false);
    }
  };
  function getConsultant() {
    getConsultantList()
      .then((response) => {
        setConsultant(response.data.result);
      })
      .catch((error) => { });
  }

  function getReportedRMO() {
    getRmoDoctorList()
      .then((response) => {
        setReportedRMO(response.data.result);
      })
      .catch((error) => { });
  }

  function getIntakeMode() {
    getIntakeModeList()
      .then((response) => {
        setIntakeMode(response.data.result);
      })
      .catch((error) => { });
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
              setRowId={setRowId}
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
        <div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div>
              <InputField
                name="bsl"
                type="number"
                variant="outlined"
                label="BSL*"
                error={errors.bsl}
                control={control}
                disabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="urineSugar"
                type="number"
                variant="outlined"
                label="Urine Sugar*"
                error={errors.urineSugar}
                control={control}
                disabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="urineKetone"
                type="number"
                variant="outlined"
                label="Urine Ketone*"
                error={errors.urineKetone}
                control={control}
                disabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <InputField
                name="bodies"
                type="number"
                variant="outlined"
                label="Bodies*"
                error={errors.bodies}
                control={control}
                disabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
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
                isDisabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
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
                isDisabled={
                  getUserRole === "RMO" ||
                  (selectedSugarObj && (inj !== null || tab !== null))
                }
              />
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-xl font font-semibold my-2">
                To Be Filled By RMO :
              </h1>
            </div>
            <hr className="border border-t-[1px] border-gray-300" />
            <div className="mt-2 grid grid-cols-3 gap-2 my-2">
              <div className="text-lg font font-semibold my-1 flex">
                <span className="w-56">Doctor / Consultant Info</span>
                <span>:</span>
              </div>
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
                <DropdownField
                  control={control}
                  error={errors.informedByRmo}
                  name="informedByRmo"
                  dataArray={reportedRMO}
                  isSearchable={false}
                  placeholder="Informed By RMO"
                  isClearable={false}
                  isDisabled={getUserRole === "Nurse"}
                />
              </div>
            </div>
            <hr className="border border-t-[1px] border-gray-300" />
            <div className="grid grid-cols-3 w-full gap-2 my-2 items-center">
              <div className="text-lg font font-semibold my-1 flex">
                <span className="w-56">Injection / Tablet</span>
                <span>:</span>
              </div>
              <div className="col-span-2  gap-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                  <div>
                    <SearchDropdown
                      control={control}
                      error={errors.injection}
                      name="injection"
                      searchIcon={true}
                      placeholder="Injection"
                      dataArray={drug}
                      handleInputChange={handleChange}
                      isDisabled={getUserRole === "Nurse"}
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
                      type="number"
                      variant="outlined"
                      label="Injection Dose"
                      error={errors.injectionDose}
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
                      type="number"
                      variant="outlined"
                      label="Tablet Dose"
                      error={errors.tabletDose}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                      disabled={getUserRole === "Nurse"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="border border-t-[1px] border-gray-300" />
          </div>
        </div>

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
                      inputFormat="yyyy/mm/dd"
                      disableFuture
                      value={date}
                      disabled={
                        getUserRole === "Nurse" &&
                        (inj === null || tab === null)
                      }
                      onChange={(newValue) => {
                        setDate(newValue);
                        console.log("Date is ", newValue.toLocaleDateString())
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="givenDate"
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
                defaultValue={null}
                name="givenTime"
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
                        setTime(newValue);
                        console.log("Time is ", newValue.toLocaleTimeString());
                      }}
                      disabled={
                        getUserRole === "Nurse" &&
                        (inj === null || tab === null)
                      }
                      renderInput={(params) => (
                        <TextField
                          className="bg-white"
                          fullWidth
                          size="small"
                          name="givenTime"
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
        confirmationOpen={openNursePut}
        confirmationHandleClose={handleCloseNursePut}
        confirmationSubmitFunc={updateSugarLevelNurse}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />

      <ConfirmationModal
        confirmationOpen={openRmoPut}
        confirmationHandleClose={handleCloseRmoPut}
        confirmationSubmitFunc={updateSugarLevelRmo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
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

export default SugarLevel;
