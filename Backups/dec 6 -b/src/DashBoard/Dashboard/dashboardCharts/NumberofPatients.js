import { Card, CardContent } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { numberOfPatientsData } from "../../utils/constants/dashboardContants/dashboardCharts/numberOfPatientsData";

const NumberofPatients = () => {
  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px", marginX: "auto" }}>
        <CardContent>
          <h1 className="px-3 pb-3 font-bold text-gray-800 text-base font-Poppins">
            Number Of Patients
          </h1>
          <ResponsiveContainer width="100%" height={382}>
            <BarChart
              width={350}
              height={300}
              data={numberOfPatientsData}
              margin={{
                top: 5,
                right: 5,
                left: 2,
                bottom: 5,
              }}
              barGap={1}
            >
              <CartesianGrid strokeDasharray="" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                style={{ fontSize: "1rem", fontFamily: "Poppins" }}
              />
              <YAxis
                axisLine={false}
                style={{ fontSize: "1rem", fontFamily: "Poppins" }}
              />
              <Bar dataKey="pv" fill="#00a8ff" barSize={12} />
              <Bar dataKey="uv" fill="#b2bec3" barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberofPatients;
