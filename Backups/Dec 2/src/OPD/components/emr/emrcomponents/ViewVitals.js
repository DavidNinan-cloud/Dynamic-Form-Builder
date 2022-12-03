import React, { useEffect } from "react";
import { getChartDetails } from "../../../services/EMRServices/emrServices";

import VitalsTable from "../emrtables/VitalsTable";
import BloodPressureChart from "../vitalscharts/BloodPressureChart";
import BloodSugarChart from "../vitalscharts/BloodSugarChart";
import PulseRate from "../vitalscharts/PulseRate";
import TemperatureChart from "../vitalscharts/TemperatureChart";

const ViewVitals = (props) => {
  let result = props.vitalsData;
  const [actions, setActions] = React.useState([]);
  const [details, setDetails] = React.useState({ result, actions });
  const [bloodPressure, setBloodPressure] = React.useState([]);
  const [bloodSugar, setBloodSugar] = React.useState([]);
  const [pulseRate, setPulseRate] = React.useState([]);
  const [temperatures, setTemperatures] = React.useState([]);

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  useEffect(() => {
    getChartDetails(props.patientId)
      .then((response) => {
        console.log("Blood Pressure", response.data.result.bloodPressures);
        setBloodPressure(response.data.result.bloodPressures);
        setBloodSugar(response.data.result.bloodSugars);
        setPulseRate(response.data.result.pulseRates);
        setTemperatures(response.data.result.temperatures);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <div>
        {bloodPressure && bloodPressure.length > 0 ? (
          <>
            <BloodPressureChart bloodPressure={bloodPressure} />
            <hr className="border my-2 divide-x-8 border-slate-300" />
          </>
        ) : (
          ""
        )}
        {pulseRate && pulseRate.length > 0 ? (
          <>
            <PulseRate pulseRate={pulseRate} />
            <hr className="border my-2 divide-x-8 border-slate-300" />
          </>
        ) : (
          ""
        )}

        {bloodSugar && bloodSugar.length > 0 ? (
          <>
            <BloodSugarChart bloodSugar={bloodSugar} />
            <hr className="border my-2 divide-x-8 border-slate-300" />
          </>
        ) : (
          ""
        )}
        {temperatures && temperatures.length > 0 ? (
          <>
            <TemperatureChart temperatures={temperatures} />
            <hr className="border my-2 divide-x-8 border-slate-300" />
          </>
        ) : (
          ""
        )}
      </div>
      {props.vitalsData.length > 0 ? (
        <div className="w-full overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
          <VitalsTable data={details} deleteRow={deleteRow} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewVitals;
