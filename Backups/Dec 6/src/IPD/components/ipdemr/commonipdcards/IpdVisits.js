import { PropaneSharp } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import IpdVisitsTable from "../emrtables/IpdVisitsTable";

const IpdVisits = (props) => {
  console.log("Props", props.data);
  return (
    <div className="ml-2 my-2">
      <Card
        square={true}
        elevation={1}
        sx={{
          marginY: "3px",
          // borderRadius: "10px",
          overflow: "visible",
          width: "99%",
        }}
        className=" mx-auto  h-[16rem] max-h-[16rem] overflow-y-visible "
      >
        <CardContent>
          <div className="flex justify-between py-2 bg-[#FEF3C7] -mt-2">
            <div className="text-sm font-semibold pl-2">Previous Visits</div>
          </div>
          <hr className="border mb-2 border-slate-300" />
          {typeof props.data !== "undefined" && props.data.length > 0 ? (
            <IpdVisitsTable
              data={props.data}
              actions={["Delete"]}
              //   handleDetailsByVisitNumber={props.handleDetailsByVisitNumber}
            />
          ) : (
            <div className=" flex justify-center align-middle my-auto">
              <h1 className="text-base">Previous Visits Not Available</h1>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IpdVisits;
