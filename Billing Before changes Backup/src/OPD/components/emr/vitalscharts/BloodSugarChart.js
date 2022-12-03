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
    bloodSugar: 100,
  },
  {
    name: "100",
    bloodSugar: 300,
  },
  {
    name: "200",
    bloodSugar: 200,
  },
  {
    name: "300",
    bloodSugar: 280,
  },
  {
    name: "400",
    bloodSugar: 190,
  },
  {
    name: "500",
    bloodSugar: 230,
  },
  {
    name: "600",
    bloodSugar: 340,
  },
];

const BloodSugarChart = (props) => {
  const { bloodSugar } = props;
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let chartDataDetails = bloodSugar.slice(0, 10);
    setChartData(chartDataDetails);
  }, [bloodSugar]);
  return (
    <div>
      <p className="text-sm font-semibold mb-2">Blood Sugar</p>
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
              name="Blood Sugar"
              type="linear"
              dataKey="bloodSugar"
              stroke="#0abde3"
            />
          </LineChart>
        </div>
        {/* //Table// */}
        <div className="w-full h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
          <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Blood Sugar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bloodSugar.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <p>{item.date}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item.bloodSugar}</p>
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

export default BloodSugarChart;
