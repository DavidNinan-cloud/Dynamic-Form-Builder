import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import CalculateGCSModal from "../emrcomponentsmodals/CalculateGCSModal";

const IpdGeneralExamination = (props) => {
  const [selectedMews, setSelectedMews] = useState();
  const [openGCSModal, setOpenGCSModal] = useState(false);
  const [GCSScore, setGCSScore] = React.useState(0);

  return (
    <div>
      <div className="ml-2">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            overflow: "visible",
            // width: "99%",
          }}
          className=" mx-auto  h-[16rem] max-h-[16rem]"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-[#CCFBF1] -mt-2">
              <div className="text-sm font-semibold pl-2">
                General Examination
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />

            <div className="grid grid-cols-3 gap-x-1">
              <TextField
                variant="outlined"
                label="Saturation With o2(%)"
                fullWidth
                size="small"
                name="saturationwitho2%"
                // onChange={(e) => props.setVoiceAllergies(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Saturation With o2"
                fullWidth
                size="small"
                name="saturationwitho2"
                // onChange={(e) => props.setVoiceAllergies(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Oxygen Rate Per Min"
                fullWidth
                size="small"
                name="oxygenpermin"
                // onChange={(e) => props.setVoiceAllergies(e.target.value)}
              />
            </div>

            <div className="flex">
              <div className=" h-[9rem] mx-1 my-2 w-6/12 border-r-2 border-slate-300">
                {/* //GCS// */}
                <div className="flex justify-between h-[4rem]">
                  <button
                    className="h-8 px-6 my-auto rounded-md bg-customBlue text-white text-sm"
                    onClick={() => {
                      setOpenGCSModal(true);
                    }}
                  >
                    GCS
                  </button>
                  <div className="flex mx-4 my-auto">
                    <p className="font-semibold mx-4">GCS Score</p>
                    <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                      {GCSScore}
                    </p>
                  </div>
                </div>

                {/* //Pews// */}
                {props.isChild ? (
                  <div className="flex justify-between h-[4rem]">
                    <button className="h-8 px-6 my-auto rounded-md bg-customBlue text-white text-sm">
                      Pews
                    </button>
                    <div className="flex mx-4 my-auto">
                      <p className="font-semibold mx-4">Pews</p>
                      <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                        4
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="h-[9rem] w-6/12 my-auto">
                {/* //Radio Button// */}
                <FormControl sx={{ marginY: "2rem", height: "4rem" }} fullWidth>
                  <RadioGroup
                    id="selectMews"
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="A"
                    name="selectMews"
                    sx={{ marginTop: "-0.2rem" }}
                  >
                    <div className="flex justify-evenly w-full">
                      <FormControlLabel
                        value="A"
                        control={
                          <Radio
                            size="small"
                            onChange={(e) => {
                              setSelectedMews(e.target.value);
                            }}
                          />
                        }
                        label={<Typography variant="body2">A</Typography>}
                      />
                      <FormControlLabel
                        value="V"
                        control={
                          <Radio
                            size="small"
                            onChange={(e) => {
                              setSelectedMews(e.target.value);
                            }}
                          />
                        }
                        label={<Typography variant="body2">V</Typography>}
                      />
                      <FormControlLabel
                        value="P"
                        control={
                          <Radio
                            size="small"
                            onChange={(e) => {
                              setSelectedMews(e.target.value);
                            }}
                          />
                        }
                        label={<Typography variant="body2">P</Typography>}
                      />
                      <FormControlLabel
                        value="U"
                        control={
                          <Radio
                            size="small"
                            onChange={(e) => {
                              setSelectedMews(e.target.value);
                            }}
                          />
                        }
                        label={<Typography variant="body2">U</Typography>}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* //Mews// */}
                <div className="flex justify-end mx-4 -mt-6 my-auto">
                  <p className="font-semibold mx-4">Mews</p>
                  <p className="bg-green-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                    3
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        open={openGCSModal}
        onClose={() => {
          setOpenGCSModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CalculateGCSModal GCSScore={GCSScore} setGCSScore={setGCSScore} setOpenGCSModal={setOpenGCSModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default IpdGeneralExamination;
