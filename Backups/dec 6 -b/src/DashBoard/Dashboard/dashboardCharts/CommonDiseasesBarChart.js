import { Card, CardContent } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { commonDiseasesData } from "../../utils/constants/dashboardContants/dashboardCharts/commonDiseasesData";

const CommonDiseasesBarChart = () => {
  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="p-2 font-bold text-gray-800 text-base font-Poppins">
            Common Diseases Report
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={300} data={commonDiseasesData}>
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
              <Tooltip
                cursor={false}
                wrapperStyle={{
                  height: "2rem",
                  fontSize: "1rem",
                }}
              />
              <Bar dataKey="pv" stackId="a" barSize={30} fill="	#40E0D0" />
              <Bar dataKey="uv" stackId="a" barSize={30} fill="#696969" />
              <Bar dataKey="am" stackId="a" barSize={30} fill="#FA8072" />
              <Bar dataKey="pm" stackId="a" barSize={30} fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonDiseasesBarChart;
