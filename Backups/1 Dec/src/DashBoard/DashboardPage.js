import React, { lazy, Suspense } from "react";
import MainCharts from "../DashBoard/Dashboard/dashboardCharts/MainCharts";
import MainLists from "../DashBoard/Dashboard/dashboardLists/MainLists";
import MainCards from "../DashBoard/Dashboard/dashboardStatCards/MainCards";
const MainTables = lazy(() =>
  import("../DashBoard/Dashboard/dashboardTables/MainTables")
);

const DashboardPage = () => {
  return (
    <div className="mt-10 mx-2">
      <MainCards />
      <MainCharts />
      <Suspense fallback={<h1>Loading…</h1>}>
        <MainTables />
      </Suspense>
      {/* <MainLists /> */}
    </div>
  );
};

export default DashboardPage;
