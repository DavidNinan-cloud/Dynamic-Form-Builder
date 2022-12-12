import { Button, Slider, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PainAssemssmetTable from "./PainAssessmentTable";
import PainAssessmentScale from "./assets/PainAssessmentScale.svg";
import { styled } from "@mui/material/styles";
import MedicationErrorRepModal from "./MedicationErrorRepModal";
import PhlebitiesScoreModal from "./PhlebitiesScoreModal";

import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import InitialNursingModal from "./InitialNursingModal";
import { VisitContext } from "../ClinicalCareChart";
import {
  getAllPainAssessment,
  addNewPatientPainScore,
} from "../../services/nursingServices/painAssessment/PainAssessmentService";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import { useForm } from "react-hook-form";
import {
  errorAlert,
  successAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import DialyWeight from "./DialyWeight";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import CareNPosition from "./carenposition/CareNPosition";
 
function valueText(value) {
  console.log("valueText is ", value);
  return `${value}°C`;
}
const CustomSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  padding: 7,

  "& .MuiSlider-mark": {
    border: "none",
    color: "gray",
    height: 7,
    // marginLeft: "2px",
  },
  "& .MuiSlider-rail": {
    border: "none",
    backgroundImage:
      "linear-gradient(.25turn,  lightblue, green, greenyellow, yellow, orange, red)",
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundImage:
      "linear-gradient(.25turn,  lightblue, green, greenyellow, yellow, orange, red)",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid blue",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "black",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
const sliderMarks = [
  {
    value: 0,
    scaledValue: 0,
  },
  {
    value: 1,
    scaledValue: 1,
  },
  {
    value: 2,
    scaledValue: 2,
  },
  {
    value: 3,
    scaledValue: 3,
  },
  {
    value: 4,
    scaledValue: 4,
  },
  {
    value: 5,
    scaledValue: 5,
  },
  {
    value: 6,
    scaledValue: 6,
  },
  {
    value: 7,
    scaledValue: 7,
  },
  {
    value: 8,
    scaledValue: 8,
  },
  {
    value: 9,
    scaledValue: 9,
  },
  {
    value: 10,
    scaledValue: 10,
  },
];

export default function PainAssessment(props) {
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);
  let selectedPainScore = 0;
  const [recordWarning, showRecordWarning] = useState(false);
  const [spinner, showSpinner] = useState(false);
  const [count, setCount] = React.useState();
  const [finalData, setFinalData] = React.useState();
  // Pain Assessment Table
  const [data, setData] = React.useState({ result: [] });
  const [dataResult, setDataResult] = useState([]);
  //use for confirmation modal
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);

  const painScore = [
    {
      id: 0,
      score: 0,
      value: "No Pain",
    },
    {
      id: 1,
      score: 1,
      value: "Mild Pain",
    },
    {
      id: 2,
      score: 2,
      value: "Mild Pain",
    },
    {
      id: 3,
      score: 3,
      value: "Mild Pain",
    },
    {
      id: 4,
      score: 4,
      value: "Moderate Pain",
    },
    {
      id: 5,
      score: 5,
      value: "Moderate Pain",
    },
    {
      id: 6,
      score: 6,
      value: "Severe Pain",
    },
    {
      id: 7,
      score: 7,
      value: "Severe Pain",
    },
    {
      id: 8,
      score: 8,
      value: "Very Severe Pain",
    },
    {
      id: 9,
      score: 9,
      value: "Very Severe Pain",
    },
    {
      id: 10,
      score: 10,
      value: "Worst Pain Possible",
    },
  ];

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

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // defaultValues,
  });
       
  const [
    openMedicationErrorModal,
    setOpenMedicationErrorModal,
  ] = React.useState(false);
  const handleOpenMedicationErrorModal = () =>
    setOpenMedicationErrorModal(true);
  const handleCloseMedicationErrorModal = () =>
    setOpenMedicationErrorModal(false);

  const [openPhlebitiesModal, setOpenPhlebitiesModal] = React.useState(false);
  const handleOpenPhlebitiesModal = () => setOpenPhlebitiesModal(true);
  const handleClosePhlebitiesModal = () => setOpenPhlebitiesModal(false);

  const [openInitialNursingModal, setOpenInitialNursingModal] = React.useState(
    false
  );
  const handleOpenInitialNursing = () => setOpenInitialNursingModal(true);
  const handleCloseInitialNursing = () => setOpenInitialNursingModal(false);

  const [openCareNPostionModal, setOpenCareNPostionModal] = React.useState(
    false
  );
  const handleOpenCareNPostionModal = () => setOpenCareNPostionModal(true);
  const handleCloseCareNPostionModal = () => setOpenCareNPostionModal(false);

  useEffect(() => {
    populateTable(patientVisitId);
  }, [finalData, patientVisitId]);

  //populate the PainAssemssmetTable using the function populateTable
  const populateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    showRecordWarning(false);
    getAllPainAssessment(obj)
      .then((response) => {
        console.log(
          "The search result patientVisitId is " +
            JSON.stringify(response.data.result)
        );
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

  // axios request for data post. [POST SAVE Patient Pain assessment Score]
  function postPainAssessment(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    addNewPatientPainScore(obj)
      .then((response) => {
        console.log(
          "POSTED OBJ of Pain Score assessment  IS ",
          JSON.stringify(response)
        );
        console.log(JSON.stringify(response));
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

  const onSubmitDataHandler = (data) => {
    console.log(data);
    if (patientVisitId !== null) {
      const painScoreValue = painScore.find(
        (painScore) => painScore.score === selectedPainScore
      );

      console.log("painScoreValue object is ", painScoreValue);

      // {id: 4, score: 4, value: 'Moderate Pain'}

      let painScorePostObj = {
        painScore: "",
        visitId: patientVisitId,
        painScoreDescription: "",
      };

      painScorePostObj.painScore = painScoreValue.score;
      painScorePostObj.painScoreDescription = painScoreValue.value;

      console.log("The posted object is ", painScorePostObj);

      setFinalData(painScorePostObj);

      setOpenPost(true);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postPainAssessment(finalData);
  }

  return (
    <div className="w-full">
      <form
        className="grid grid-cols-1 w-full gap-x-2 py-4"
        onSubmit={handleSubmit(onSubmitDataHandler)}
      >
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="col-span-3 lg:col-span-2 w-full ">
            <h1 className="my-1 font-semibold text-lg">Assessment List</h1>
            {spinner ? (
             <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : null}
            {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 &&
            spinner === false ? (
              <PainAssemssmetTable
                data={data}
                count={count}
                // dataResult={dataResult}
                // setDataResult={setDataResult}
              />
            ) : null}
            {recordWarning === true &&
            spinner === false &&
            data.statusCode !== 200 ? (
              <div className="flex justify-center">
                <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                  No Records Found...
                </h3>
              </div>
            ) : null}
          </div>
          <div className="w-full hidden lg:block">
            <DialyWeight />
          </div>
        </div>
        <div className="mt-5 rounded-md border p-5 w-full bg-white">
          <div className="flex justify-center items-center w-full my-1">
            <div className="my-2 text-center text-xl font-semibold w-full">
              <h1>Patient Pain Assessment</h1>
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <div className="flex flex-col space-y-2 xl:space-y-4 xl:pt-2 2xl:space-y-16 2xl:pt-12 w-[25%] xl:w-[20%] text-xs xl:text-sm 2xl:text-xl text-gray-600">
              <h1>Verbal Descriptor Scale</h1>
              <h1>Wong-Baker Facial Grimace scale</h1>
              <h1>Activity Tolerance scale</h1>
            </div>
            <div className="w-[97%]">
              <div className="w-full">
                <img className="w-full" src={PainAssessmentScale} />
              </div>
              <div className="flex w-full justify-start mt-2">
                <div className="w-[92%] xl:w-[90%] 2xl:w-[91%] ml-3 lg:ml-5 2xl:ml-9">
                  <CustomSlider
                    className="painScore"
                    name="painScore"
                    onChange={(value) => {
                      selectedPainScore = value.target.value;
                      console.log(
                        "selectedPainScore in onChange is ",
                        selectedPainScore
                      );
                    }}
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valueText}
                    min={0}
                    step={1}
                    max={10}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                    style={{ height: "14px" }}
                    marks={sliderMarks}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-2 ">
                <SaveButton />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden">
          <DialyWeight />
        </div>
        <div className="flex space-x-2 justify-end mt-2 ">
          <Button
            variant="contained"
            onClick={() => {
              console.log("Click ");
              handleOpenCareNPostionModal();
            }}
            style={{
              backgroundColor: "#E9CFEC",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Care And Position
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleOpenMedicationErrorModal();
            }}
            style={{
              backgroundColor: "#C3FDB8",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Report Medication Error
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleOpenPhlebitiesModal();
            }}
            style={{
              backgroundColor: "#CFECEC",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Phlebits
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleOpenInitialNursing();
            }}
            style={{
              backgroundColor: "#E9CFEC",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Initial Nursing Assessment
          </Button>
        </div>
        <CareNPosition
        patientInformation={props.patientInformation}
          open={openCareNPostionModal}
          setOpen={setOpenCareNPostionModal}
          handleOpen={handleOpenCareNPostionModal}
          handleClose={handleCloseCareNPostionModal}
        />
        <MedicationErrorRepModal
          open={openMedicationErrorModal}
          setOpen={setOpenMedicationErrorModal}
          handleOpen={handleOpenMedicationErrorModal}
          handleClose={handleCloseMedicationErrorModal}
        />
        <PhlebitiesScoreModal
          open={openPhlebitiesModal}
          setOpen={setOpenPhlebitiesModal}
          handleOpen={handleOpenPhlebitiesModal}
          handleClose={handleClosePhlebitiesModal}
        />
        <InitialNursingModal
          open={openInitialNursingModal}
          patientInformation={props.patientInformation}
          setOpen={setOpenInitialNursingModal}
          handleOpen={handleOpenInitialNursing}
          handleClose={handleCloseInitialNursing}
        />
      </form>
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
  );
}
