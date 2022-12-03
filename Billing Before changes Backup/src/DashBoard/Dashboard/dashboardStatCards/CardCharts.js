import React from "react";
import { ResponsiveContainer, Area, AreaChart } from "recharts";
import { cardsData } from "../../utils/constants/dashboardContants/dashboardCardChartData/cardsData";

const CardCharts = (props) => {
  const { strokeColor, fillColor } = props;
  return (
    <div>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart
          width={200}
          height={40}
          data={cardsData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Area
            type="monotone"
            dataKey="new"
            stroke={strokeColor}
            fill={fillColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardCharts;
