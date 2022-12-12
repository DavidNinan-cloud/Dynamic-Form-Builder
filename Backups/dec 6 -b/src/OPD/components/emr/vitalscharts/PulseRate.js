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
    name: "0",
    pulseRate: 100,
  },
  {
    name: "100",
    pulseRate: 300,
  },
  {
    name: "200",
    pulseRate: 200,
  },
  {
    name: "300",
    pulseRate: 280,
  },
  {
    name: "400",
    pulseRate: 190,
  },
  {
    name: "500",
    pulseRate: 230,
  },
  {
    name: "600",
    pulseRate: 340,
  },
];

const PulseRate = (props) => {
  const { pulseRate } = props;
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let chartDataDetails = pulseRate.slice(0, 10);
    setChartData(chartDataDetails);
  }, [pulseRate]);

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Pulse Rate</p>
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
              name="Pulse Rate"
              type="linear"
              dataKey="pulseRate"
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
                <TableCell>Pulse Rate</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pulseRate.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <p>{item.date}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item.pulseRate}</p>
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

export default PulseRate;
