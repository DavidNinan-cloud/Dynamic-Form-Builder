import { Card, CardContent, Modal } from "@mui/material";
import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddPatientHistory from "./emrcomponents/AddPatientHistory";
import { Box } from "@mui/system";
import { useEffect } from "react";

const PatientHistory = (props) => {
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState(props.patientHistory);
  useEffect(() => {
    setHistory(props.patientHistory);
  }, [props.patientHistory]);
  return (
    <>
      <div className="ml-2 h-[8rem]">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            borderRadius: "10px",
            overflow: "visible",
          }}
          className=" mx-auto h-full overflow-y-visible "
        >
          <div className=" mx-auto h-full">
            <CardContent>
              <div className="flex justify-between mb-2">
                <div className="text-sm font-semibold">Patient History</div>
                {history === null ||
                typeof props.patientHistory === "undefined" ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <AddCircleRoundedIcon />
                  </button>
                ) : (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <VisibilityIcon />
                  </button>
                )}
              </div>
              <div>
                {props.patientHistory !== "" ? (
                  <p className="text-sm">{props.patientHistory}</p>
                ) : (
                  <p className="text-sm">Patient History is Not Available</p>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      {/* //Add or View Patient History Modal// */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
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
            width: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddPatientHistory
            setOpen={setOpen}
            patientHistory={props.patientHistory}
            setPatientHistory={props.setPatientHistory}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PatientHistory;
