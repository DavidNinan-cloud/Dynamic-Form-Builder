import { Grid } from "@mui/material";
import React from "react";
import BookedAppointments from "./BookedAppointments";
import DoctorList from "./DoctorList";
import Operations from "./Operations";
import PatientsGroups from "./PatientsGroups";
import TodaysAppointments from "./TodaysAppointments";

const MainTables = () => {
  return (
    <div className="my-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3  lg:col-span-2">
          <BookedAppointments />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <DoctorList />
        </div>
      </div>
      {/* <Grid container>
        <Grid item md={8} sm={10} sx={{ marginX: "auto" }}>
          <BookedAppointments />
        </Grid>
        <Grid item md={4} sm={10} sx={{ marginX: "auto" }}>
          <DoctorList />
        </Grid> */}
      {/* <Grid item md={10} sm={12} sx={{ marginX: "auto" }}>
          <Operations />
        </Grid>
        <Grid item md={8} sm={10} sx={{ marginX: "auto" }}>
          <TodaysAppointments />
        </Grid>
        <Grid item md={4} sm={10} sx={{ marginX: "auto" }}>
          <PatientsGroups />
        </Grid> */}
      {/* </Grid> */}
    </div>
  );
};

export default MainTables;
