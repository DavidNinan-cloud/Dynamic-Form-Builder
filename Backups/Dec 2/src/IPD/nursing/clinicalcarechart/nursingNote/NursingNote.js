import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import NursingNoteTable from "./NursingNoteTable";
import { getAllNursingNote } from "../../services/nursingServices/nursingNoteService/NursingNoteService";
import { VisitContext } from "../ClinicalCareChart";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import { useForm } from "react-hook-form";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { Divider } from "@mui/material";
const NursingNoteData = [
  { id: "All", value: "All", label: "All" },
  { id: "Doctor", value: "Doctor", label: "Doctor" },
  { id: "Nursing", value: "Nursing", label: "Nursing" },
];
function NursingNote() {
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);
  const [spinner, showSpinner] = useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false); //
  const [nursingNoteDataResult, setNursingNoteDataResult] = useState([]); // populate table data
  const [nursingNoteData, setNursingNoteData] = React.useState({
    result: [],
    actions: [],
  });
  // for showing actions
  const [noteInfo, setNoteInfo] = React.useState();

  console.log("Notes ----- " + patientVisitId);
  const defaultValues = {
    All: null,
    Doctor: null,
    Nursing: null,
  };
  const { control, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  let userType = watch("NursingNoteData");
  console.log("userType is", userType);

  let filter = "";

  if (userType === "All") {
    filter = "All";
    console.log("filter is" + filter);
    console.log("visitId is" + patientVisitId);
  } else if (userType === "Doctor") {
    filter = "Doctor";
  } else if (userType === "Nursing") {
    filter = "Nursing";
    console.log("filter is" + filter);
    console.log("visitId is" + patientVisitId);
  }
  useEffect(() => {
    console.log("NursingNoteData");
    setValue("NursingNoteData", "All");
  }, []);

  useEffect(() => {
    console.log("1111111111111111111");
    PopulateTable(filter, patientVisitId);
  }, [filter, patientVisitId]);

  // output populate table
  const PopulateTable = (filter, patientVisitId) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", filter);
    console.log("nursingNote is", userType);
    showRecordWarning(false);
    getAllNursingNote(filter, patientVisitId)
      .then((response) => response.data)
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setNursingNoteData(res.result);
        // setNursingNoteDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  console.log("hiiiiii", noteInfo);
  return (
    <div>
      <div className="mt-2 flex  space-x-5 w-full">
        <div className="w-full">
          <h1 className="py-2 text-lg font-semibold">Nursing Note</h1>
          <div className=" flex space-x-5 overflow-hidden">
            <RadioField
              label=""
              // defaultValue={NursingNoteData}
              name="NursingNoteData"
              control={control}
              dataArray={NursingNoteData}
            />
          </div>
          <div className="">
            {spinner ? (
              <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : null}
            {nursingNoteData.length > 0 ? (
              <NursingNoteTable
                data={nursingNoteData}
                setNoteInfo={setNoteInfo}
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
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="w-5/6">
          <h1 className="py-2 text-lg font-semibold">Notes</h1>
          <div className="grid gap-y-3">
            <div className="border rounded bg-white">
              <h1
                className="p-2 text-lg font-semibold rounded "
                style={{ backgroundColor: "#FFE1C6" }}
              >
                Subjective
              </h1>
              <p className="p-2 ">{noteInfo && noteInfo.subjective}</p>
            </div>
            {userType === "All" || userType === "Doctor" ? (
              <div className="border rounded bg-white">
                <h1
                  className="p-2 text-lg font-semibold rounded "
                  style={{ backgroundColor: "#D4EDFF" }}
                >
                  Objective
                </h1>
                <div className="p-2 flex space-x-2">
                  <h1>Vitals &nbsp; :</h1>
                  <span>{noteInfo && noteInfo.vitals.date}</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="border rounded bg-white">
              <h1
                className="p-2 text-lg font-semibold rounded "
                style={{ backgroundColor: "#D3F8C6" }}
              >
                Assessment
              </h1>
              <p className="p-2 ">{noteInfo && noteInfo.assessment}</p>
            </div>
            <div className="border rounded bg-white">
              <h1
                className="p-2 text-lg font-semibold rounded "
                style={{ backgroundColor: "#FFC7DB" }}
              >
                Plan
              </h1>
              <p className="p-2 ">
                <p className="p-2 ">{noteInfo && noteInfo.plan}</p>
              </p>
            </div>
            <div className="border rounded bg-white">
              <h1
                className="p-2 text-lg font-semibold rounded "
                style={{ backgroundColor: "#FFDBC7" }}
              >
                CPR Notes
              </h1>
              <p className="p-2 ">
                <p className="p-2 ">{noteInfo && noteInfo.cprNotes}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NursingNote;
