import { Grid } from "@mui/material";
import React from "react";
import NumberofPatients from "../dashboardCharts/NumberofPatients";
import DoctorsList from "./DoctorsList";
import TodoList from "./TodoList";

const MainLists = () => {
  return (
    <div className="my-2">
      <Grid container spacing={2}>
        <Grid item md={4} sm={10} sx={{ marginX: "auto" }}>
          <TodoList />
        </Grid>
        <Grid item md={4} sm={10} sx={{ marginX: "auto" }}>
          <DoctorsList />
        </Grid>
        <Grid item md={4} sm={10} sx={{ marginX: "auto" }}>
          <NumberofPatients />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainLists;
