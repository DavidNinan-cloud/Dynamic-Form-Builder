import { Button, Card, CardContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const PatientSurgicalHistory = (props) => {
  const { patientSurgicalHistory, setPatientSurgicalHistory } = props;
  // const [historyValue, setHistoryValue] = useState(patientSurgicalHistory);

  // const handleHistory = (e) => {
  //   e.preventDefault();
  //   setPatientSurgicalHistory(historyValue);
  // };

  return (
    <div className="ml-1 mr-1 h-[8.2rem]">
      <Card
        square={true}
        elevation={1}
        sx={{
          // borderRadius: "10px",
          overflow: "visible",
          paddingY: "0.3rem",
        }}
        className=" mx-auto h-full overflow-y-visible "
      >
        <div className="-mb-4">
          <CardContent sx={{ paddingY: "0.37rem" }}>
            <div className="text-sm font-semibold py-1 bg-yellow-50">
              <h1 className="pl-2">Surgical History</h1>
            </div>
            <hr className="border mb-3 border-slate-300" />
            <div>
              {/* {patientSurgicalHistory !== null ? (
                <p>{patientSurgicalHistory}</p>
              ) : ( */}
              <div>
                {/* <form onSubmit={handleHistory}> */}
                <TextField
                  variant="outlined"
                  label="Add Surgical History"
                  fullWidth
                  size="small"
                  multiline
                  rows={2.5}
                  name="surgicalHistory"
                  value={props.patientSurgicalHistory}
                  onChange={(e) =>
                    props.setPatientSurgicalHistory(e.target.value)
                  }
                  // value={historyValue}
                />
                {/* <div className="flex justify-center w-full">
                      <Button
                        variant="outlined"
                        type="submit"
                        sx={{ marginY: "0.3rem" }}
                      >
                        Submit
                      </Button>
                    </div> */}
                {/* </form> */}
              </div>
              {/* )} */}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PatientSurgicalHistory;
