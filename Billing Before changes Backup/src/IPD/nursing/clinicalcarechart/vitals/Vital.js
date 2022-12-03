import React, { useRef, useEffect, useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import PrintPFRatioButton from "../../../../Common Components/Buttons/PrintPFRatioButton";
import CareAndPositionButton from "../../../../Common Components/Buttons/CareAndPositionButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import VitalsTable from "./VitalsTable";
import { VisitContext } from "../ClinicalCareChart";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import {
  getAllVitals,
  savePatientVitals,
} from "../../services/nursingServices/vitalsServices/VitalsServices";
import {
  errorAlert,
  successAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
function Vital(props) {
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

  const schema = yup
    .object()
    .shape({
      temperature: yup.number().required("Required"),
      pulseRate: yup.number().required("Required"),
      respiration: yup.number().required("Required"),
      bloodPressureSystolic: yup.number().required("Required"),
      cvp: yup.number().required("Required"),
      peep: yup.number().required("Required"),
      arterialBloodPressure: yup.number().required("Required"),
      bloodPressureSystolic: yup.number().required("Required"),
      papressureReading: yup.number().required("Required"),
      brady: yup.number().required("Required"),
      apnea: yup.number().required("Required"),
      abdominalGirth: yup.number().required("Required"),
      desaturation: yup.number().required("Required"),
      fiO2: yup.number().required("Required"),
      po2: yup.number().required("Required"),
      pfRatio: yup.number().required("Required"),
      saturationWithO2: yup.number().required("Required"),
      saturationWithoutO2: yup.number().required("Required"),
    })
    .required();

  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  const avpuArray = [
    { id: 0, value: "Alert", label: "Alert" },
    { id: 1, value: "Response to Voice", label: "Response to Voice" },
    { id: 2, value: "Pain", label: "Pain" },
    { id: 3, value: "Unresponsive", label: "Unresponsive" },
  ];

  let finalMews;
  const mewsDivElement = useRef();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //the object to reset the form to blank values
  const defaultValues = {
    temperature: "",
    pulseRate: "",
    respiration: "",
    cvp: "",
    peep: "",
    arterialBloodPressure: "",
    bloodPressureSystolic: "",
    papressureReading: "",
    brady: "",
    apnea: "",
    abdominalGirth: "",
    desaturation: "",
    fiO2: "",
    po2: "",
    pfRatio: "",
    saturationWithO2: "",
    saturationWithoutO2: "",
    avpu: "",
    mews: "",
    finalMews: null,
    tracheostomy: false,
    nasal: false,
    ett: false,
    oral: false,
  };
  const onSubmitDataHandler = (data) => {
    console.log("vitals data is ", data);
    if (patientVisitId !== null) {
      let postedObj = {
        visitId: patientVisitId,
        bloodPressureSystolic: data.bloodPressureSystolic,
        bloodPressureDiastolic: data.bloodPressureDiastolic,
        pulseRate: data.pulseRate,
        respiration: data.respiration,
        temperature: data.temperature,
        avpu: data.avpu,
        mews: data.mews,
        cvp: data.cvp,
        peep: data.peep,
        arterialBloodPressure: data.arterialBloodPressure,
        papressureReading: data.papressureReading,
        brady: data.brady,
        apnea: data.apnea,
        abdominalGirth: data.abdominalGirth,
        desaturation: data.desaturation,
        fiO2: data.fiO2,
        po2: data.po2,
        suction: {
          ett: data.ett,
          nasal: data.nasal,
          oral: data.oral,
          tracheostomy: data.tracheostomy,
        },
        saturation: {
          pfRatio: data.pfRatio,
          saturationWithO2: data.saturationWithO2,
          saturationWithoutO2: data.saturationWithoutO2,
        },
      };
      setOpenPost(true);
      setFinalData(postedObj);
      reset(defaultValues);
      console.log("postedObj" + postedObj);
    }
  };

  const [bp, temp, pulse, rr] = watch([
    "bloodPressureSystolic",
    "temperature",
    "pulseRate",
    "respiration",
  ]);
  const avpuVal = watch("avpu");

  function SystolicBloodPressure(sbp) {
    if (sbp >= 200) {
      return 2;
    } else if (sbp >= 101 && sbp <= 199) {
      return 0;
    } else if (sbp >= 81 && sbp <= 100) {
      return 2;
    } else if (sbp >= 71 && sbp <= 80) {
      return 2;
    } else if (sbp <= 70) {
      return 3;
    }
  }
  function PulseCalculation(pulse) {
    if (pulse <= 40) {
      return 2;
    } else if (pulse >= 41 && pulse <= 50) {
      return 1;
    } else if (pulse >= 51 && pulse <= 100) {
      return 0;
    } else if (pulse >= 101 && pulse <= 110) {
      return 1;
    } else if (pulse >= 111 && pulse <= 129) {
      return 2;
    } else if (pulse >= 130) {
      return 3;
    }
  }
  function RespiratoryRate(bpm) {
    if (bpm <= 9) {
      return 2;
    } else if (bpm > 9 && bpm <= 14) {
      return 0;
    } else if (bpm >= 15 && bpm <= 20) {
      return 1;
    } else if (bpm >= 21 && bpm <= 29) {
      return 2;
    } else if (bpm >= 30) return 3;
  }
  function Temperature(celsius) {
    if (celsius <= 35) {
      return 2;
    } else if (celsius > 35 && celsius <= 38.4) {
      return 0;
    } else if (celsius >= 38.5) {
      return 2;
    }
  }

  const calculateMews = (bp, temp, pulse, rr) => {
    console.log("calculateMews has been called");

    console.log("2222222");

    console.log(typeof bp);
    console.log(typeof Number(bp));
    let mewsVal;

    if (
      Number(bp) > 0 &&
      Number(temp) > 0 &&
      Number(pulse) > 0 &&
      Number(rr) > 0
    ) {
      let bpValue = SystolicBloodPressure(bp);

      let pulseValue = PulseCalculation(pulse);

      let tempValue = Temperature(temp);

      let rrValue = RespiratoryRate(rr);

      mewsVal =
        Number(bpValue) +
        Number(pulseValue) +
        Number(tempValue) +
        Number(rrValue);
    }

    return mewsVal;
  };

  useEffect(() => {
    console.log("hiiiiiii11111");

    finalMews = calculateMews(bp, temp, pulse, rr);

    console.log("mewsVal is ", finalMews);

    console.log("avpu value in num form is ", Number(avpuVal));

    console.log("avpu value type is ", typeof avpuVal);

    console.log("final mews is ", finalMews);

    //erase the finalMews score if the fields are empty
    //erase only when the modal is open.
    //erasing when the modal is closed throws error
    if (
      (bp === "" ||
        temp === "" ||
        pulse === "" ||
        rr === "" ||
        avpuVal === "") &&
      props.open === true
    ) {
      mewsDivElement.current.innerHTML = "";
    }

    if (avpuVal !== "") {
      finalMews = finalMews + Number(avpuVal);
    }

    if (finalMews >= 5 && avpuVal !== "") {
      mewsDivElement.current.innerHTML = `

      <div class="flex  items-center">
      <p  class=" text-gray-700 px-2 font-bold">MEWS  </p>
         <div class="w-10 h-10 rounded-full border-2 border-red-500 flex justify-center  bg-red-500 items-center text-white">

        <p
          class=" text-white py-2"
        >
        ${finalMews}
        </p>

      </div>
      <p class="px-2 font-bold text-red-500">Please Call Doctor For Consultation</p>
      `;
    } else if (finalMews < 5 && avpuVal !== "") {
      mewsDivElement.current.innerHTML = `     <div class="flex  items-center">
      <p  class=" text-gray-700 px-2 font-bold">MEWS</p>
         <div class="w-10 h-10 rounded-full border-2 border-green-500 flex justify-center  bg-green-500 items-center">

        <p
          class=" text-white py-2"
        >
        ${finalMews}
        </p>

      </div>
      <p class="px-2 font-bold text-green-500">No Need to Call Doctor For Consultation</p>`;
    }
  }, [bp, temp, pulse, rr, avpuVal, props.open]);

  useEffect(() => {
    console.log(mewsDivElement.current);
  }, []);

  useEffect(() => {
    populateTable(patientVisitId);
  }, [finalData, patientVisitId]);

  const populateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    showRecordWarning(false);
    getAllVitals(obj)
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
  function postVitals(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    savePatientVitals(obj)
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

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postVitals(finalData);
  }

  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };

  console.log("data is " + JSON.stringify(finalData));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        {/* Vital Heading n Table */}
        <div className="grid col-span-3 gap-4 w-full">
          <h1 className="my-1 font-semibold text-lg">Vitals</h1>
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <VitalsTable
              data={data}
              count={count}
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
        <div>
          <div className="grid grid-cols-4 gap-2 py-2">
            <div className="w-full">
              <InputField
                name="temperature"
                variant="outlined"
                label="Temperature"
                control={control}
                error={errors.temperature}
                // inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="pulseRate"
                variant="outlined"
                label="Pulse"
                control={control}
                error={errors.pulseRate}
                // inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="respiration"
                variant="outlined"
                label="Respiration"
                control={control}
                error={errors.respiration}
                // inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="bloodPressureSystolic"
                variant="outlined"
                label="Blood Pressure Systolic"
                control={control}
                error={errors.bloodPressureSystolic}
                // inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="lg:flex flex-nowrap py-2 col-span-full">
              <RadioField
                label=""
                name="avpu"
                control={control}
                dataArray={avpuArray}
              />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-1 gap-2 py-2">
            <div id="mews" ref={mewsDivElement} name></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 py-2">
            <div className="grid md:grid-cols-4 lg:grid-cols-2 gap-2">
              <InputField
                name="cvp"
                variant="outlined"
                label="CVP"
                control={control}
                error={errors.cvp}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="peep"
                variant="outlined"
                label="Peep"
                control={control}
                error={errors.peep}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="arterialBloodPressure"
                variant="outlined"
                label="Arterial Blood Pressure"
                control={control}
                error={errors.arterialBloodPressure}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="papressureReading"
                variant="outlined"
                label="Pressure Reading"
                control={control}
                error={errors.papressureReading}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="brady"
                variant="outlined"
                label="Brady"
                control={control}
                error={errors.brady}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="apnea"
                variant="outlined"
                label="Apnea"
                control={control}
                error={errors.apnea}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="abdominalGirth"
                variant="outlined"
                label="Abdominal Girth"
                control={control}
                error={errors.abdominalGirth}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <InputField
                name="desaturation"
                variant="outlined"
                label="Desaturation"
                control={control}
                error={errors.desaturation}
                inputProps={{ style: { textTransform: "capitalize" } }}
                required
              />
              <div className="hidden lg:block">
                <InputField
                  name="fiO2"
                  variant="outlined"
                  label="Fio2"
                  control={control}
                  error={errors.fiO2}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  required
                />
              </div>
              <div className="hidden lg:block">
                <InputField
                  name="po2"
                  variant="outlined"
                  label="Po2"
                  control={control}
                  error={errors.po2}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-base font-bold ">Suction</p>
              <div className="grid md:grid-cols-4 lg:grid-cols-2 items-center text-sm pb-2">
                <div className="flex items-center pt-1">
                  <input
                    className=" h-5 w-5 ml-5 md:ml-0 "
                    type="checkbox"
                    value="oral"
                    id="oral"
                    name="oral"
                  />
                  <label htmlFor="oral" className="ml-2">
                    Oral(Yes/No)
                  </label>
                </div>
                <div className="flex items-center pt-1">
                  <input
                    className=" h-5 w-5 ml-5 md:ml-0 "
                    type="checkbox"
                    value="medicolegalcase"
                    id="medicolegalcase"
                    name="ett"
                  />
                  <label htmlFor="ett" className="ml-2">
                    ETT(Yes/No)
                  </label>
                </div>
                <div className="flex items-center lg:pt-4">
                  <input
                    className=" h-5 w-5 ml-5 md:ml-0 "
                    type="checkbox"
                    value="tracheostomy"
                    id="tracheostomy"
                    name="tracheostomy"
                  />
                  <label htmlFor="tracheostomy" className="ml-2">
                    Tracheostomy(Y/N)
                  </label>
                </div>
                <div className="flex items-center lg:pt-4 md:ml-3 lg:ml-0">
                  <input
                    className=" h-5 w-5 ml-5 md:ml-0 "
                    type="checkbox"
                    value="nasal"
                    id=" nasal"
                    name="nasal"
                  />
                  <label htmlFor="nasal" className="ml-2">
                    Nasal(Yes/No)
                  </label>
                </div>
              </div>

              <p className="text-base font-bold items-end">Saturation</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 items-end gap-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <InputField
                    name="saturationWithO2"
                    variant="outlined"
                    label="Saturation With o2"
                    control={control}
                    error={errors.saturationWithO2}
                    // inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                    required
                  />

                  <InputField
                    name="saturationWithoutO2"
                    variant="outlined"
                    label="Saturation WithOut o2"
                    control={control}
                    error={errors.saturationWithoutO2}
                    // inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                    required
                  />
                </div>
                <div className="lg:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    <InputField
                      name="fiO2"
                      variant="outlined"
                      label="Fio2"
                      control={control}
                      error={errors.fiO2}
                      // inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                      required
                    />

                    <InputField
                      name="po2"
                      variant="outlined"
                      label="Po2"
                      control={control}
                      error={errors.po2}
                      // inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="">
                  <InputField
                    name="pfRatio"
                    variant="outlined"
                    label="P:F Ratio"
                    error={errors.pfRatio}
                    control={control}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                  />
                </div>
                <div className="w-full">
                  <PrintPFRatioButton />
                </div>
              </div>
            </div>
          </div>
          <hr className="" />
          <div className=" flex gap-2 justify-end py-2">
            <div className="">
              <CareAndPositionButton />
            </div>
            <div className="">
              <ResetButton
                onClick={() => {
                  reset(defaultValues);
                }}
              />
            </div>
            <div className=" gap-2">
              <AddButton />
            </div>
          </div>
        </div>
      </form>
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

export default Vital;
