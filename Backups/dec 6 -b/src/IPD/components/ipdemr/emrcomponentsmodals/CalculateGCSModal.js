import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

const CalculateGCSModal = (props) => {
  const [eyeOpeningResponse, setEyeOpeningResponse] = React.useState("1");
  const [verbalResponse, setVerbalResponse] = React.useState("1");
  const [motorResponse, setMotorResponse] = React.useState("1");

  let calculateGCS;
  useEffect(() => {
    calculateGCS =
      parseInt(eyeOpeningResponse) +
      parseInt(verbalResponse) +
      parseInt(motorResponse);
    props.setGCSScore(calculateGCS);
  }, [eyeOpeningResponse, verbalResponse, motorResponse]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {/* //Eye Opening Response// */}
        <div className="border border-slate-500 px-4 rounded-md">
          <FormControl>
            <FormLabel
              id="eyeOpeningResponse"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Eye Opening Response
            </FormLabel>
            <RadioGroup
              aria-labelledby="eyeOpeningResponse"
              name="eyeOpeningResponse"
              value={eyeOpeningResponse}
              onChange={(e) => {
                setEyeOpeningResponse(e.target.value);
              }}
            >
              <FormControlLabel
                value="4"
                control={<Radio size="small" />}
                label={<Typography variant="body2">Spontaneous (4)</Typography>}
              />
              <FormControlLabel
                value="3"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">To Varbal Stimuli (3)</Typography>
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio size="small" />}
                label={<Typography variant="body2">To Pain (2)</Typography>}
              />
              <FormControlLabel
                value="1"
                control={<Radio size="small" />}
                label={<Typography variant="body2">None (1)</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* //Verbal Response// */}
        <div className="border border-slate-500 px-4 rounded-md">
          <FormControl>
            <FormLabel
              id="eyeOpeningResponse"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Verbal Response
            </FormLabel>
            <RadioGroup
              aria-labelledby="eyeOpeningResponse"
              name="eyeOpeningResponse"
              value={verbalResponse}
              onChange={(e) => {
                setVerbalResponse(e.target.value);
              }}
            >
              <FormControlLabel
                value="5"
                control={<Radio size="small" />}
                label={<Typography variant="body2">Oriented (5)</Typography>}
              />
              <FormControlLabel
                value="4"
                control={<Radio size="small" />}
                label={<Typography variant="body2">Confused (4)</Typography>}
              />
              <FormControlLabel
                value="3"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    Inappropriate Words (3)
                  </Typography>
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio size="small" />}
                label={<Typography variant="body2">Incoherent (2)</Typography>}
              />
              <FormControlLabel
                value="1"
                control={<Radio size="small" />}
                label={<Typography variant="body2">None (1)</Typography>}
              />
              <FormControlLabel
                value="0"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">ET Tube in Situ (T)</Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* //Motor Response// */}
        <div className="border border-slate-500 px-4 rounded-md">
          <FormControl>
            <FormLabel
              id="eyeOpeningResponse"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Motor Response
            </FormLabel>
            <RadioGroup
              aria-labelledby="eyeOpeningResponse"
              name="eyeOpeningResponse"
              value={motorResponse}
              onChange={(e) => {
                setMotorResponse(e.target.value);
              }}
            >
              <FormControlLabel
                value="6"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">Obeys Commands (6)</Typography>
                }
              />
              <FormControlLabel
                value="5"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">Localizes Pain (5)</Typography>
                }
              />
              <FormControlLabel
                value="4"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    Withdraws From Pain (4)
                  </Typography>
                }
              />
              <FormControlLabel
                value="3"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    Flexion To Pain or Decorticate(3)
                  </Typography>
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    Extension to Pain or Decerebrate (2)
                  </Typography>
                }
              />
              <FormControlLabel
                value="1"
                control={<Radio size="small" />}
                label={<Typography variant="body2">None (1)</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="flex justify-between my-4">
        <div>
          <div className="flex mx-4 my-auto">
            <p className="font-semibold mx-4">GCS Score</p>
            <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
              {props.GCSScore}
            </p>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="h-10 px-3 mx-4 border border-customRed text-customRed rounded text-base font-medium"
          >
            Reset
          </button>

          <button
            type="submit"
            className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
            onClick={() => {
              props.setOpenGCSModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculateGCSModal;
