import React, { useEffect, useContext } from "react";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import PatientFallAssessmentTable from "./table/PatientFallAssessmentTable";
import { useForm } from "react-hook-form";
import { VisitContext } from "../../ClinicalCareChart";
function PatientFallAssessment() {
  //state Variable for Table Show And Hide
  const [historyIsChecked, setHistoryIsChecked] = React.useState(false);
  const [patienIsChecked, setPatienIsChecked] = React.useState(false);
  const [protocolIsChecked, setProtocolIsChecked] = React.useState(false);
  const [completeIsChecked, setCompleteIsChecked] = React.useState(false);

  const [showTableButton, setShowTableButton] = React.useState(false);

  const [vipScoreValue, setVipScoreValue] = React.useState(0);

  useEffect(() => {
    console.log("vipScoreValue is ", vipScoreValue);
  }, [vipScoreValue]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      highRisk: [],
      lowRisk: [],
    },
  });

  let highRisk = watch("highRisk");
  let lowRisk = watch("lowRisk");

  // Context
  const patientVisitId = useContext(VisitContext);

  console.log("patientVisitId in PatientFallAssessment is ", patientVisitId);

  console.log("lowRisk is ", lowRisk);
  console.log("highRisk is ", highRisk);
  console.log("lowRisk length is ", lowRisk.length);
  console.log("highRisk length is ", highRisk.length);

  //use effect to show or hide the Table form's Reset and Submit button
  useEffect(() => {
    if (highRisk.length === 0 && lowRisk.length === 0) {
      setShowTableButton(true);
    } else {
      setShowTableButton(false);
    }
  }, [highRisk, lowRisk]);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className="mx-2">
      <form
        className="grid grid-cols-1 w-full gap-x-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-4 py-2">
          <p className="text-black font-semibold text-base">
            If patient has any of the following conditions, check the box and
            apply Fall Risk interventions as indicated.
          </p>
          <div className="flex gap-2 pt-2">
            <p className="text-black font-semibold text-base">
              High Fall Risk &nbsp; - &nbsp;
            </p>
            <span className="text-sm text-gray-600 font-semibold">
              Implement High Fall Risk interventions per protocol
            </span>
          </div>

          {/* {fields.map((field, index) => {
            return ( */}
          {/* <> */}
          <div className="flex items-center space-x-3 py-2">
            <input
              type="checkbox"
              // name="highFallRisk"
              className="h-5 w-5"
              value="history"
              {...register("highRisk")}
              onClick={(e) => {
                console.log("checkbox value" + e.target.checked);
                if (e.target.checked === true) {
                  setHistoryIsChecked(true);
                } else {
                  setHistoryIsChecked(false);
                }
              }}
            />
            <p className="text-gray-600 text-sm font-semibold">
              &nbsp; History of more than one fall within 6 months before
              admission.
            </p>
          </div>
          <div className="flex items-center space-x-3 py-2">
            <input
              type="checkbox"
              // name="highFallRisk"
              className="h-5 w-5"
              value="patient"
              {...register("highRisk")}
              onClick={(e) => {
                console.log("checkbox value" + e.target.checked);
                if (e.target.checked === true) {
                  setPatienIsChecked(true);
                } else {
                  setPatienIsChecked(false);
                }
              }}
            />
            <p className="text-gray-600 text-sm font-semibold">
              &nbsp; Patient has experienced a fall during this hospitalization.
            </p>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <input
              type="checkbox"
              // name="highFallRisk"
              className="h-5 w-5"
              value="protocol"
              {...register("highRisk")}
              onClick={(e) => {
                console.log("checkbox value" + e.target.checked);
                if (e.target.checked === true) {
                  setProtocolIsChecked(true);
                } else {
                  setProtocolIsChecked(false);
                }
              }}
            />
            <p className="text-gray-600 text-sm font-semibold">
              &nbsp;Patient is deemed high fall-risk per protocol (e.g., seizure
              precautions).
            </p>
          </div>
          {/* </> */}
          {/* ); */}
          {/* })} */}

          <div className="flex gap-2 pt-2">
            <p className="text-black font-semibold text-base">
              Low Fall Risk &nbsp; - &nbsp;
            </p>
            <span className="text-sm text-gray-600 font-semibold">
              Implement Low Fall Risk interventions per protocol
            </span>
          </div>

          {/* {fields.map((field, index) => {
            return (
              <> */}
          <div className="flex items-center  space-x-3 py-2">
            <input
              type="checkbox"
              className="h-5 w-5"
              // name="lowRisk"
              value="complete"
              // {...register(`lowRisk.${index}.complete`)}
              {...register("lowRisk")}
              onClick={(e) => {
                console.log("checkbox value" + e.target.checked);
                if (e.target.checked === true) {
                  setCompleteIsChecked(true);
                } else {
                  setCompleteIsChecked(false);
                }
              }}
            />
            <p className="text-gray-600 text-sm font-semibold">
              Complete paralysis or completely immobilized.
            </p>
          </div>
          {/* </>
            );
          })} */}

          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-base">
              Do not continue with Fall Risk Score Calculation if any of the
              above conditions are checked.
            </p>
            {vipScoreValue >= 6 ? (
              <label className="bg-yellow-400 w-10 h-10 flex justify-center items-center font-bold  rounded-full text-white">
                {vipScoreValue}
              </label>
            ) : (
              ""
            )}
            {vipScoreValue >= 13 ? (
              <label className="bg-customRed w-10 h-10 flex justify-center items-center font-bold   rounded-full text-white ">
                {vipScoreValue}
              </label>
            ) : (
              ""
            )}

            {/* <p className="bg-red-700 text-white rounded-full h-10 w-10 text-center flex items-center justify-center">
  
            {totalScore}
          </p> */}
          </div>
        </div>
        {historyIsChecked === false &&
        patienIsChecked === false &&
        protocolIsChecked === false &&
        completeIsChecked === false ? (
          <div>
            {" "}
            <PatientFallAssessmentTable
              showTableButton={showTableButton}
              setVipScoreValue={setVipScoreValue}
            />
          </div>
        ) : null}
        <div>
          <h2 className="text-base font-semibold my-2">
            SCORING: 6-13 Total Points ={vipScoreValue}
            <span className="text-yellow-400">Moderate Fall Risk</span>, {">13"}
            Total Points ={vipScoreValue}
            <span className="text-customRed"> High Fall Risk</span>
          </h2>
        </div>
        <div className="border border-b border-customBlue">
          VIP Score is {vipScoreValue}
        </div>

        {showTableButton === false ? (
          <div className="flex gap-2 justify-end mt-2">
            <ResetButton onClick={() => reset(defaultValues)} />
            <SaveButton />
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default PatientFallAssessment;
