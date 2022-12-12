import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
const data = [
  {
    date: "0",
    temperature: 100,
  },
  {
    date: "100",
    temperature: 300,
  },
  {
    date: "200",
    temperature: 200,
  },
  {
    date: "300",
    temperature: 280,
  },
  {
    date: "400",
    temperature: 190,
  },
  {
    date: "500",
    temperature: 230,
  },
  {
    date: "600",
    temperature: 340,
  },
];

const TemperatureChart = (props) => {
  const { temperatures } = props;
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let chartDataDetails = temperatures.slice(0, 10);
    setChartData(chartDataDetails);
  }, [temperatures]);

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Temperature</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              name="Temperature"
              type="linear"
              dataKey="temperature"
              stroke="#e056fd"
            />
          </LineChart>
        </div>
        {/* //Table// */}
        <div className="w-full h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
          <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Temperatures</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {temperatures.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <p>{item.date}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item.temperature}</p>
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

export default TemperatureChart;
