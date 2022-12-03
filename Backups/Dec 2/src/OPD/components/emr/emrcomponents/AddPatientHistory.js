import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddPatientHistory = (props) => {
  const { patientHistory, setPatientHistory, setOpen } = props;
  const [historyValue, setHistoryValue] = useState(patientHistory);

  const handleHistory = (e) => {
    e.preventDefault();
    setPatientHistory(historyValue);
    setOpen(false);
  };

  useEffect(() => {
    console.log("historyValue", patientHistory);
  }, [historyValue]);
  return (
    <div>
      <div className="text-base font-semibold  mb-3">
        <h1>Patient History</h1>
      </div>
      <div>
        {patientHistory !== null ? (
          <p>{patientHistory}</p>
        ) : (
          <div>
            <form onSubmit={handleHistory}>
              <TextField
                variant="outlined"
                label="Add Patient History"
                fullWidth
                size="small"
                multiline
                rows={3}
                name="history"
                sx={{ marginY: "0.2rem" }}
                onChange={(e) => setHistoryValue(e.target.value)}
                value={historyValue}
              />

              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPatientHistory;
