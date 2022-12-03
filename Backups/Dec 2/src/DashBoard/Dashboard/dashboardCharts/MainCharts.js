import { Grid } from "@mui/material";
import React from "react";
import CommonDiseasesBarChart from "./CommonDiseasesBarChart";
import PatientServeyAreaChart from "./PatientServeyAreaChart";
import VisitRatingPieChart from "./VisitRatingPieChart";

const MainCharts = () => {
  return (
    <div className="my-4">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 w-full">
        <PatientServeyAreaChart />
         <VisitRatingPieChart />
      </div>
    </div>
  );
};

export default MainCharts;
