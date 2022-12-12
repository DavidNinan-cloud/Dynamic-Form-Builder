import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "-60",
    uv: -40,
    pv: 50,
  },
  {
    name: "40",
    uv: 30,
    pv: 198,
  },
  {
    name: "140",
    uv: 200,
    pv: 150,
  },
  {
    name: "240",
    uv: 80,
    pv: 208,
  },
];

const BloodPressureChart = (props) => {
  const { bloodPressure } = props;
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let chartDataDetails = bloodPressure.slice(0, 10);
    setChartData(chartDataDetails);
  }, [bloodPressure]);

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Blood Pressure</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-2">
        {/* //Chart// */}
        <div>
          <LineChart
            width={550}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Line
              name="BP(Systolic)"
              type="monotone"
              dataKey="bloodPressureSystolic"
              stroke="#ED4C67"
              activeDot={{ r: 8 }}
            />
            <Line
              name="BP(Diastolic)"
              type="monotone"
              dataKey="bloodPressureDiastolic"
              stroke="#0652DD"
            />
          </LineChart>
        </div>

        {/* //Table// */}
        <div className="w-full h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
          <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>BP (Systolic)</TableCell>
                <TableCell>BP (Diastolic)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bloodPressure.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <p>{item.date}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item.bloodPressureDiastolic}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item.bloodPressureSystolic}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;
