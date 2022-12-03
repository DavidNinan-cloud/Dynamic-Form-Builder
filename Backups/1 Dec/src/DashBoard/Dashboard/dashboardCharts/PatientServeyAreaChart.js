import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Circle } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { getPatientServey } from "../../services/dashboardServices/dashboardService";

const PatientServeyAreaChart = () => {
  const [patientServeyData, setPatientServeyData] = useState(null);

  //API for Chart of Patient Servey
  useEffect(() => {
    getPatientServey()
      .then((response) => {
        console.log("PatientServey", response.data.result);
        setPatientServeyData(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h6 className="p-2 font-bold text-gray-800 text-base font-Poppins">
            Patient Survey
          </h6>
          {patientServeyData !== null ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={600}
                height={300}
                data={patientServeyData}
                margin={{ top: 10, right: 40, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#455A64" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#455A64" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  style={{ fontSize: "1rem", fontFamily: "Poppins" }}
                />
                <YAxis
                  axisLine={false}
                  allowDecimals={false}
                  style={{ fontSize: "1rem", fontFamily: "Poppins" }}
                />
                <CartesianGrid strokeDasharray="" vertical={false} />
                <Tooltip
                  wrapperStyle={{
                    height: "2.5rem",
                    fontSize: "1rem",
                  }}
                />
                <Legend
                  iconType={Circle}
                  iconSize={10}
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: "1rem", fontFamily: "Poppins" }}
                />
                <Area
                  type="monotone"
                  dataKey="New Patients"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="Old Patients"
                  stroke="#455A64"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex justify-center">
              <p className="my-auto ">Patient Details Are Not Available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientServeyAreaChart;
