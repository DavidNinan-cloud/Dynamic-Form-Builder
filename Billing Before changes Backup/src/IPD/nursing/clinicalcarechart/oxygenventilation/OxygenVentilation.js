import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import VantilationStartButton from "../../../../Common Components/Buttons/VantilationStartButton";
import OxygenStartButton from "../../../../Common Components/Buttons/OxygenStartButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import AddButton from "../../../../Common Components/Buttons/AddButton";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getAllOxygenVantilation,
  saveVentilationOxygenRecords,
} from "../../services/nursingServices/oxygenVatilationServices/oxygenVatilationServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import OxygenVentilationTable from "./OxygenVentilationTable";

import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
import { VisitContext } from "../ClinicalCareChart";

const modeOption = [
  {
    value: 1,
    label: "High Concentration",
  },
  {
    value: 2,
    label: "Low Concentration",
  },
];

function OxygenVentilation(props) {
  //state Variables for post and view data
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState();
  //To execute the function only once
  const [count, setCount] = React.useState();
  const [spinner, showSpinner] = useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [data, setData] = React.useState({ result: [], actions: [] });
  //for edit
  const [idValue, setIdValue] = React.useState("");
  //Add Edit Update Cancel Button
  const [edit, setEdit] = React.useState(false);
  const [patientInfo, setPatientInfo] = React.useState("");

  console.log("selected Patient Information", patientInfo);
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  //the object to reset the form to blank values
  const defaultValues = {
    visitId: "",
    mode: "",
    tidolV: "",
    setRate: "",
    ipap: "",
    minuteV: "",
    rateTotal: "",
    epap: "",
    peep: "",
    pc: "",
    mv: "",
    prSup: "",
    fiO2: "",
    ie: "",
    oxygenRatePerMinute: "",
    saturationWithO2: "",
    flowTrigger: "",
    // ventilationDuration: "",
    // oxygenDuration: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    populateTable(patientVisitId);
  }, [finalData, patientVisitId]);

  //event listener function for edit icon
  function editRow(patientVisitId) {
    setEdit(true);
    console.log("gender object is " + JSON.stringify(patientVisitId));
    console.log("Required id is genderId" + patientVisitId.patientInfo);
    setIdValue(patientVisitId.patientInfo);
    handleOpen();
  }

  //populate the CommonMasterTable using the function populateTable
  const populateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", obj);
    showRecordWarning(false);
    getAllOxygenVantilation(obj)
      .then((response) => {
        console.log(
          "The search result 1123 is nitin" +
            JSON.stringify(response.data.result)
        );
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //axios request for data post. That is post request
  function postOxygenVentilation(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    saveVentilationOxygenRecords(obj)
      .then((response) => {
        console.log("POSTED OBJ of Pain Score assessment  IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        console.log("circuler msg", error.message);
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  const onSubmitDataHandler = (data) => {
    console.log(data);
    if (patientVisitId !== null) {
      let postedObj = {
        mode: data.mode.label,
        tidolV: data.tidolV,
        setRate: data.setRate,
        ipap: data.ipap,
        minuteV: data.minuteV,
        rateTotal: data.rateTotal,
        epap: data.epap,
        peep: data.peep,
        pc: data.pc,
        mv: data.mv,
        prSup: data.prSup,
        fiO2: data.fiO2,
        ie: data.ie,
        oxygenRatePerMinute: data.oxygenRatePerMinute,
        saturationWithO2: data.saturationWithO2,
        flowTrigger: data.flowTrigger,
        visitId: patientVisitId,
        // ventilationDuration: data.ventilationDuration,
        // oxygenDuration: data.oxygenDuration,
      };
      console.log("postObj" + postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
      reset(defaultValues);
      console.log("postedobj is" + postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postOxygenVentilation(finalData);
  }
  // confirnation model

  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleCloePut has been called");
    if (openPut) {
      setOpenPut(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="col-span-3 w-full ">
          <h1 className="my-1 font-semibold text-lg">Oxygen / Ventilation</h1>
          {/* <PainAssemssmetTable /> */}
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <OxygenVentilationTable
              data={data}
              count={count}
              editRow={editRow}
              setPatientInfo={setPatientInfo}
              dataResult={dataResult}
              setDataResult={setDataResult}
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
      </div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div className="grid w-2/3 py-2">
          <DropdownField
            control={control}
            error={errors.mode}
            name="mode"
            placeholder="Mode"
            dataArray={modeOption}
            isSearchable={false}
            // isDisabled={props.edit}
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
          <InputField
            name="tidolV"
            type="number"
            variant="outlined"
            label="Tidol V (ml)*"
            error={errors.tidolV}
            control={control}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          <InputField
            name="setRate"
            type="number"
            variant="outlined"
            label="Set.Rate(per min)"
            error={errors.setRate}
            control={control}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          <InputField
            name="ipap"
            type="number"
            error={errors.ipap}
            variant="outlined"
            label="IPAP"
            control={control}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          <InputField
            name="minuteV"
            type="number" 
            error={errors.minuteV}
            variant="outlined"
            label="Minute V (lit./min)"
            control={control}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          <InputField
            name="rateTotal"
            type="number"
            error={errors.rateTotal}
            variant="outlined"
            label="Rate Total"
            control={control}
          />
          <InputField
            name="epap"
            type="number"
            error={errors.epap}
            variant="outlined"
            label="EPAP"
            control={control}
          />
          <InputField
            name="peep"
            type="number"
            error={errors.peep}
            variant="outlined"
            label="Peep (cm)"
            control={control}
          />
          <InputField
            name="pc"
            type="number"
            error={errors.pc}
            variant="outlined"
            label="PC"
            control={control}
          />
          <InputField
            name="mv"
            type="number"
            error={errors.mv}
            variant="outlined"
            label="% MV"
            control={control}
          />
          <InputField
            name="prSup"
            type="number"
            error={errors.prSup}
            variant="outlined"
            label="Pr.Sup.(cm)"
            control={control}
          />
          <InputField
            name="fiO2"
            type="number"
            error={errors.fiO2}
            variant="outlined"
            label="fiO2"
            control={control}
          />
          <InputField
            name="ie"
            type="number"
            error={errors.ie}
            variant="outlined"
            label="I : E"
            control={control}
          />
          <InputField
            name="oxygenRatePerMinute"
            type="number"
            error={errors.oxygenRatePerMinute}
            variant="outlined"
            label="Oxygen Rate Per Min"
            control={control}
          />
          <InputField
            name="saturationWithO2"
            type="number"
            error={errors.saturationWithO2}
            variant="outlined"
            label="Saturation With o2"
            control={control}
          />
          <InputField
            name="flowTrigger"
            type="number"
            error={errors.flowTrigger}
            variant="outlined"
            label="Flow Trigger"
            control={control}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="grid grid-cols-3 gap-2">
            <InputField
              name="hour"
              variant="outlined"
              label="Hour"
              control={control}
            />
            <InputField
              name="min"
              variant="outlined"
              label="Min"
              control={control}
            />
            <InputField
              name="sec"
              variant="outlined"
              label="Sec"
              control={control}
            />
            <InputField
              name="hour"
              variant="outlined"
              label="Hour"
              control={control}
            />
            <InputField
              name="min"
              variant="outlined"
              label="Min"
              control={control}
            />
            <InputField
              name="sec"
              variant="outlined"
              label="Sec"
              control={control}
            />
          </div>

          <div className="grid gap-2">
            <div className="">
              <VantilationStartButton />
            </div>
            <div className="">
              <OxygenStartButton />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 py-2">
          <ResetButton onClick={() => reset(defaultValues)} />
          {props.edit ? <UpdateButton /> : <AddButton />}
        </div>
      </form>
      {/* Confirmation modal for PUT request */}
      {/* <ConfirmationModal
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      /> */}

      {/* Confirmation modal for POST request */}
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={setOpenPost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}

export default OxygenVentilation;
