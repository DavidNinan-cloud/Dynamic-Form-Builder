import { Button, Card, CardContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const IpdSurgicalHistory = (props) => {
  const { patientSurgicalHistory, setPatientSurgicalHistory } = props;

  return (
    <div className="ml-1 mr-1  h-[16rem]">
      <Card
        square={true}
        elevation={1}
        sx={{
          marginY: "3px",
          overflow: "visible",
          paddingY: "0.3rem",
        }}
        className=" mx-auto h-full overflow-y-visible "
      >
        <div>
          <CardContent>
            <div className="text-sm font-semibold py-3 -mt-3.5 bg-yellow-50">
              <h1 className="pl-2">Surgical History</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div>
              <div>
                <TextField
                  variant="outlined"
                  label="Add Surgical History"
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  name="surgicalHistory"
                  value={props.patientSurgicalHistory}
                  onChange={(e) =>
                    props.setPatientSurgicalHistory(e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IpdSurgicalHistory;
