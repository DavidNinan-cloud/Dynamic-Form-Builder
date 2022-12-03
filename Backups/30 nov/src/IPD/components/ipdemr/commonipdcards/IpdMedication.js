import { Box, Card, CardContent, Modal, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AddIpdMedicationModal from "../emrcomponentsmodals/AddIpdMedicationModal";
import IpdMedicationTable from "../emrtables/IpdMedicationTable";

const IpdMedication = (props) => {
  let result = props.medication;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openPrint, setPrintOpen] = React.useState(false);
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
  function editRow(sysmptomsInfo, index) {
    console.log("Edit Info", sysmptomsInfo, index);
    setIsEdit(true);
    setEditInfo(sysmptomsInfo);
    setDataId(index);
    setOpen(true);
  }

  useEffect(() => {
    console.log("Props Print", props);
  }, [props]);

  return (
    <>
      <div className="">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            overflow: "visible",
            width: "99%",
          }}
          className=" mx-auto h-[16.4rem] overflow-y-visible "
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-[#FFF3E5] -mt-2">
              <div className="text-sm font-semibold pl-2">Medication</div>
              <div>
                {props.medication !== null && props.medication.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip
                      title="View Medication"
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
                    setOpen(true);
                  }}
                >
                  <Tooltip title="Add Medication" placement="left-start" arrow>
                    <AddCircleRoundedIcon />
                  </Tooltip>
                </button>
              </div>
            </div>
            <hr className="border mb-2 border-sla -mt-2te-300" />
            {props.medication !== null && props.medication.length > 0 ? (
              <div className="h-auto max-h-[11rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <IpdMedicationTable
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
      {/* //Add Prescription Modal// */}
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
          <AddIpdMedicationModal
            setOpen={setOpen}
            medication={props.medication}
            editInfo={editInfo}
            dataId={dataId}
            patientInfo={props.patientInfo}
          />
        </Box>
      </Modal>

      {/* //View Prescription Modal// */}
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
            width: "95%",
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
          <div className=" max-h-[30rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
            <IpdMedicationTable data={details} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default IpdMedication;
