import { Card, CardContent } from "@mui/material";
import React from "react";
import AddIpdPastHistoryModal from "../emrcomponentsmodals/AddIpdPastHistoryModal";

const IpdPastHistory = (props) => {
  return (
    <div>
      <div className=" my-2">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            overflow: "visible",
            width: "99%",
          }}
          className=" mx-auto h-auto max-h-[16rem] overflow-y-visible "
        >
          <CardContent>
            <AddIpdPastHistoryModal
              patientPastHistory={props.patientPastHistory}
              setPatientPastHistory={props.setPatientPastHistory}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IpdPastHistory;
