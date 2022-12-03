import React, { useContext, useEffect, useState } from "react";
import WeightTable from "./WeightTable";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import { VisitContext } from "../ClinicalCareChart";
import {
  getAllDailyWeight,
  addNewWeight,
} from "../../services/nursingServices/painAssessment/PainAssessmentService";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import InputField from "../../../../Common Components/FormFields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  errorAlert,
  successAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import OnClickSaveButton from "../../../../Common Components/Buttons/OnClickSaveButton";

export default function DialyWeight() {
  const schema = yup.object().shape({
    weightInKgs: yup
      .string()
      .required("Required")
      .min(1, "Add weight")
      .matches(/^[0-9.]+$/, "Only Digits Allow"),
  });

  const defaultValues = {
    weightInKgs: "",
  };

  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  const [recordWarning, showRecordWarning] = useState(false);
  const [spinner, showSpinner] = useState(false);
  const [count, setCount] = React.useState();
  const [finalData, setFinalData] = React.useState();
  // Weight Table
  const [weightData, setWeightData] = React.useState({ result: [] });
  const [weightDataResult, setWeightDataResult] = useState([]);
  //use for confirmation modal
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    populateWeightTable(patientVisitId);
  }, [finalData, patientVisitId]);

  const populateWeightTable = (obj) => {
    showSpinner(true);
    showRecordWarning(false);
    getAllDailyWeight(obj)
      .then((response) => {
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        setWeightData(res);
        console.log("Weight res.result", res.result);
        setWeightDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  // axios request for data post. [POST SAVE Weight]
  function postWeight(obj) {
    console.log("The record having id " + obj + " is");
    console.log(JSON.stringify(obj));
    addNewWeight(obj)
      .then((response) => {
        console.log("POSTED OBJ IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateWeightTable(patientVisitId);
          reset(defaultValues);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  const onSubmitDataHandler = (data) => {
    console.log("weight data is: ", data);
    if (patientVisitId !== null) {
      let postObj = {
        weightInKgs: data.weightInKgs,
        visitId: patientVisitId,
      };

      postWeight(postObj)
      //   setOpenPost(true);

      setFinalData(postObj);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 w-full gap-x-2"
        onSubmit={handleSubmit(onSubmitDataHandler)}
      >
        <div className="">
          <h1 className="my-1 font-semibold text-lg">Daily Weight</h1>
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {weightData.hasOwnProperty("result") &&
          weightData.result.length > 0 &&
          weightData.statusCode === 200 &&
          spinner === false ? (
            <WeightTable
              weightData={weightData}
              count={count}
              weightDataResult={weightDataResult}
              setWeightDataResult={setWeightDataResult}
            />
            ) : null}
          {
              recordWarning === true &&
              spinner === false &&
          weightData.statusCode !== 200 ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) :  <div className="flex space-x-4 mt-2 pt-2">
            <InputField
              type="text"
              name="weightInKgs"
              variant="outlined"
              label="Weight In KG"
              error={errors.weightInKgs}
              control={control}
            />
            <OnClickSaveButton
              onClick={() => {
                handleSubmit(onSubmitDataHandler)();
              }}
            />
          </div>}
         
        </div>
      </form>
    </>
  );
}
