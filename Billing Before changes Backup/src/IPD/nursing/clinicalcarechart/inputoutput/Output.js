import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ViewAllButton from "../../../../Common Components/Buttons/ViewAllButton"; 
import InputField from "../../../../Common Components/FormFields/InputField";
import CommonTable from "../../common/CommonTable";
import { useState } from "react";
import { useContext } from "react";
import { VisitContext } from "../ClinicalCareChart";
import {
  getAllOutput,
  saveInputOutput,
} from "../../services/nursingServices/inputOutputService/InputOutputService";


function InputOutput() {
  const [count, setCount] = React.useState();
  const [spinner, showSpinner] = useState(false);
  const [openPost, setOpenPost] = React.useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false); // record error and sucess warnings
  const [outputDataResult, setOutputDataResult] = useState([]); // populate table data
  const [outputData, setOutputData] = React.useState({
    result: [],
    actions: [],
  }); // for showing actions
  const [handleConfirmationModal, setHandleConfirmationModal] = React.useState(
    false
  ); // update/save ConfirmationMoaal

  const [outputFinalData, setOutputFinalData] = React.useState(); //input Save final data
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  useEffect(() => {
    outputPopulateTable(patientVisitId);
  }, [ outputFinalData, patientVisitId]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });


  const defaultValues = {
    visitId: null,
    type: null,
    urine: '',
    urineQuantity: '',
    drainage: "",
    drainageQuantity: "",
    stool: "",
    stoolQuantity: "",
    ngAspiratic: "",
    ngAspiraticQuantity: "",
    outputOther: "",
    outputOtherQuantity: "",
    outputPdHd: "",
    outputPdHdQuantity: "",
  };


  // output populate table
  const outputPopulateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", obj);
    showRecordWarning(false);
    getAllOutput(obj)
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
        setOutputData(res);
        setOutputDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //axios request for data post. That is post request
  function postOutputData(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    saveInputOutput(obj)
      .then((response) => {
        console.log("POSTED OBJ of Pain Score assessment  IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          outputPopulateTable(patientVisitId);
        }
      })
      .catch((error) => {
        console.log("circuler msg", error.message);
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  const onSubmitOutputDataHandler = (data) => {
    console.log(data);
    if (patientVisitId !== null) {
      let postedObj = {
        type: "output",
        urine: data.urine,
        urineQuantity: data.urineQuantity,
        drainage: data.drainage,
        drainageQuantity: data.drainageQuantity,
        stool: data.stool,
        stoolQuantity: data.stoolQuantity,
        ngAspiratic: data.ngAspiratic,
        ngAspiraticQuantity: data.ngAspiraticQuantity,
        outputOther: data.outputOther,
        outputOtherQuantity: data.outputOtherQuantity,
        outputPdHd: data.outputPdHd,
        outputPdHdQuantity: data.outputPdHdQuantity,
        visitId: patientVisitId,
      };
      console.log("postObj" + postedObj);
      setOpenPost(true);
      setOutputFinalData(postedObj); //final data
      reset(defaultValues);
      console.log("postedobj is" + postedObj);
    }
  };

  function addRecordOutput() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postOutputData(outputFinalData); //post final output data
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="col-span-3 w-full ">
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {outputData.hasOwnProperty("result") &&
          outputData.result.length > 0 &&
          outputData.statusCode === 200 &&
          spinner === false ? (
            <CommonTable
              data={outputData}
              count={count}
              // editRow={editRow}
              // setPatientInfo={setPatientInfo}
              dataResult={outputDataResult}
              setDataResult={setOutputDataResult}
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
      <form onSubmit={handleSubmit(onSubmitOutputDataHandler)}>
        <div className="flex mt-1">
          <div className="grid grid-cols-4 gap-2 m-2 border-r-2 pr-4">
            <InputField
              name="urineQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="urine"
                variant="outlined"
                label="Urine"
                control={control}
              />
            </div>

            <InputField
              name="drainageQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="drainage"
                variant="outlined"
                label="Drange"
                control={control}
              />
            </div>

            <InputField
              name="stoolQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="stool"
                variant="outlined"
                label="Stool"
                control={control}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 m-2">
            <InputField
              name="ngAspiraticQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="ngAspiratic"
                variant="outlined"
                label="NG Aspiratic"
                control={control}
              />
            </div>
            <InputField
              name="outputOtherQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="outputOther"
                variant="outlined"
                label="Other"
                control={control}
              />
            </div>

            <InputField
              name="outputPdHdQuantity"
              type="number"
              variant="outlined"
              label="Qty"
              control={control}
            />
            <div className="col-span-3">
              <InputField
                name="outputPdHd"
                variant="outlined"
                label="PD/HD"
                control={control}
              />
            </div>
          </div>
        </div>
        <div className=" flex gap-2 justify-end pb-2">
          <ViewAllButton />
          <AddButton />
        </div>
      </form>
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={setOpenPost}
        confirmationSubmitFunc={addRecordOutput}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}

export default InputOutput;
