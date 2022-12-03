import {
  Box,
  Card,
  CardContent,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AddIpdDiagnosisModal from "../emrcomponentsmodals/AddIpdDiagnosisModal";
import IpdDiagnosisTable from "../emrtables/IpdDiagnosisTable";

const IpdDiagnosis = (props) => {
  let result = props.diagnosis;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataId, setDataId] = React.useState(null);
  const [editInfo, setEditInfo] = React.useState();
  const [actions, setActions] = React.useState(["Delete", "Edit"]);
  const [details, setDetails] = React.useState({ result, actions });

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  function editRow(diagnosisInfo, index) {
    console.log("Edit Info", diagnosisInfo, index);
    setIsEdit(true);
    setEditInfo(diagnosisInfo);
    setDataId(index);
    setOpen(true);
  }

  return (
    <>
      <div className="ml-2">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            overflow: "scroll",
            width: "99%",
          }}
          className="mx-auto h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-orange-50 -mt-2">
              <div className="text-sm font-semibold pl-2">Diagnosis</div>
              <div>
                {props.diagnosis !== null && props.diagnosis.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip
                      title="View Diagnosis"
                      placement="left-start"
                      arrow
                    >
                      <VisibilityRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="text-blue-500 mr-1"
                  onClick={() => {
                    setDataId(null);
                    setOpen(true);
                  }}
                >
                  <Tooltip title="Add Diagnosis" placement="left-start" arrow>
                    <AddCircleRoundedIcon />
                  </Tooltip>
                </button>
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />

            {props.diagnosis !== null && props.diagnosis.length > 0 ? (
              <div className="h-auto max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <IpdDiagnosisTable
                  data={details}
                  deleteRow={deleteRow}
                  editRow={editRow}
                  setOpen={setOpen}
                />
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </div>
      {/* //Add diagnosis Modal// */}
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
          <AddIpdDiagnosisModal
            setOpen={setOpen}
            diagnosis={props.diagnosis}
            editInfo={editInfo}
            dataId={dataId}
            details={details}
          />
        </Box>
      </Modal>

      {/* //View diagnosis Modal// */}
      <Modal
        open={openView}
        onClose={() => {
          setOpenView(false);
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
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-end">
            {/* <button
              className="border border-gray-500 rounded-full text-red-500"
              onClick={() => {
                setOpenView(false);
              }}
            >
              <CloseRoundedIcon />
            </button> */}
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                setOpenView(false);
              }}
            />
          </div>
          <IpdDiagnosisTable data={details} />
        </Box>
      </Modal>
    </>
  );
};

export default IpdDiagnosis;
