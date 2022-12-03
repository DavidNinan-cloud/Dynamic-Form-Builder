import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import CommonTable from "../../common/CommonTable";
import { getAllSuctionSaturation } from "../../services/nursingServices/SuctionSaturationService/SuctionSaturationService";
import { VisitContext } from "../ClinicalCareChart";

function SuccionSaturation() {
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  const [spinner, showSpinner] = useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false); // record error and sucess warnings
  const [
    succionSaturationDataResult,
    setSuccionSaturationDataResult,
  ] = useState([]); // populate table data

  useEffect(() => {
    PopulateTable(patientVisitId);
  }, [patientVisitId]);
  //populate the CommonTable using the function inputPopulateTable
  const PopulateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", obj);
    showRecordWarning(false);
    getAllSuctionSaturation(obj)
      .then((response) => {
        console.log(
          "The search result is " + JSON.stringify(response.data.result)
        );
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setSuccionSaturationDataResult(res);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };
  return (
    <div>
      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {succionSaturationDataResult.hasOwnProperty("result") &&
      succionSaturationDataResult.result.length > 0 &&
      succionSaturationDataResult.statusCode === 200 &&
      spinner === false ? (
        <CommonTable data={succionSaturationDataResult} />
      ) : null}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center items-center">
          <h3 className="flex justify-center mt-20 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}
    </div> 
  );
}

export default SuccionSaturation;
