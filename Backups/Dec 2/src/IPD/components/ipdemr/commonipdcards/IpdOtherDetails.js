import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React from "react";

const IpdOtherDetails = (props) => {
  const {
    transferTo,
    doctor,
    reference,
    informToConsultant,
    consultantName,
    otBooked,
  } = props;
  return (
    <div className="ml-1 mt-2 h-[10rem]">
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
        <div className="">
          <CardContent>
            <div className="text-sm font-semibold py-2 bg-green-50 -mt-2">
              <h1 className="pl-2">Other Details</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div className="grid grid-cols-3 gap-2">
              <div>
                <TextField
                  variant="outlined"
                  label="Transfer To"
                  fullWidth
                  size="small"
                  name="transferTo"
                  onChange={(e) => props.setTransferTo(e.target.value)}
                  value={transferTo}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="Doctor Name"
                  fullWidth
                  size="small"
                  name="doctor"
                  onChange={(e) => props.setDoctor(e.target.value)}
                  value={doctor}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="Reference"
                  fullWidth
                  size="small"
                  name="reference"
                  onChange={(e) => props.setReference(e.target.value)}
                  value={reference}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={informToConsultant}
                      onChange={(e) =>
                        props.setInformToConsultant(e.target.value)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Informed To Consultant"
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="Consultant Name"
                  fullWidth
                  size="small"
                  name="consultantName"
                  onChange={(e) => props.setConsultantName(e.target.value)}
                  value={consultantName}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={otBooked}
                      onChange={(e) =>
                        props.setInformToConsultant(e.target.value)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="OT Booked"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IpdOtherDetails;
