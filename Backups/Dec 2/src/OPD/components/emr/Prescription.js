import { Box, Card, CardContent, Modal, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import AddPrescription from "./emrcomponents/AddPrescription";
import CommonTable from "./CommonTable";
import PrescriptionPrint from "./emrcomponents/PrescriptionPrint";
import ViewDataTable from "./ViewDataTable";
import PrescriptionTable from "./emrtables/PrescriptionTable";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const Prescription = (props) => {
  let result = props.prescriptions;
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
  useEffect(() => {
    if (props.status && props.status.toLowerCase() === "completed") {
      setActions([]);
    }
  }, [props]);

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
            <div className="flex justify-between py-2 bg-[#E7D2FF] -mt-2">
              <div className="text-sm font-semibold pl-2">Prescription</div>
              <div>
                {props.prescriptions !== null &&
                props.prescriptions.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip
                      title="View Prescription"
                      placement="left-start"
                      arrow
                    >
                      <VisibilityRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
                {props.print === true ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setPrintOpen(true);
                    }}
                  >
                    <Tooltip
                      title="Print Prescription"
                      placement="left-start"
                      arrow
                    >
                      <PrintRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
                {props.status && props.status.toLowerCase() !== "completed" ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <Tooltip
                      title="Add Prescription"
                      placement="left-start"
                      arrow
                    >
                      <AddCircleRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border mb-2 border-sla -mt-2te-300" />
            {props.prescriptions !== null && props.prescriptions.length > 0 ? (
              <div className="h-auto max-h-[11rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <PrescriptionTable
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
          <AddPrescription
            setOpen={setOpen}
            prescriptions={props.prescriptions}
            editInfo={editInfo}
            dataId={dataId}
            patientInfo={props.patientInfo}
          />
        </Box>
      </Modal>

      {/* //Print Prescription Modal // */}
      <Modal
        open={openPrint}
        onClose={() => {
          setPrintOpen(false);
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
            height: "94%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <PrescriptionPrint
            prescriptionVisitId={props.prescriptionVisitId}
            setPrintOpen={setPrintOpen}
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
            <PrescriptionTable data={details} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Prescription;
