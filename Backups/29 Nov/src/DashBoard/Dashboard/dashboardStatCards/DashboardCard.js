import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import CardCharts from "./CardCharts";

const DashboardCard = (props) => {
  const {
    backColor,
    cardIcon,
    cardTitle,
    cardDetails,
    strokeColor,
    fillColor,
  } = props;
  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent
          sx={{
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <div className="flex justify-between items-center p-2">
            <div className={backColor}>
              <p className="shadow-md border text-white w-12 p-2 rounded-lg grid justify-center">
                {cardIcon}
              </p>
            </div>
            <div className="text-2xl font-bold pr-2">
              <p className="text-base text-right font-Poppins">{cardTitle}</p>
              <p className="text-right text-2xl font-Poppins">{cardDetails}</p>
            </div>
          </div>
          <CardCharts strokeColor={strokeColor} fillColor={fillColor} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;
