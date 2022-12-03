import { Box, Button, Card, CardContent, Modal, Tooltip } from "@mui/material";
import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import IpdPythalogyInvestigationsTable from "../emrtables/IpdPythalogyInvestigationsTable";
import AddIpdPythalogyInvestigationModal from "../emrcomponentsmodals/AddIpdPythalogyInvestigationModal";

const IpdPythalogyInvestigation = (props) => {
  let result = props.pythalogyInvestigations;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataId, setDataId] = React.useState(null);
  const [editInfo, setEditInfo] = React.useState();
  const [actions, setActions] = React.useState(["Delete", "Edit"]);
  const [details, setDetails] = React.useState({ result, actions });
  const [
    pathalogyInvestigationReport,
    setPathalogyInvestigationReport,
  ] = React.useState("");
  const [openViewDoc, setOpenViewDoc] = React.useState(false);

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  function editRow(documentInfo, index) {
    console.log("Edit Info", documentInfo, index);
    setIsEdit(true);
    setEditInfo(documentInfo);
    setDataId(index);
    setOpen(true);
  }

  return (
    <>
      <div className="">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            overflow: "scroll",
            width: "99%",
          }}
          className=" mx-auto  h-[16rem] max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-lime-50 -mt-2">
              <div className="text-sm font-semibold pl-2">
                Investigation(Pythalogy)
              </div>
              <div>
                {props.pythalogyInvestigations !== null &&
                props.pythalogyInvestigations.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip
                      title="View Investigation"
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
                  <Tooltip
                    title="Add Investigation"
                    placement="left-start"
                    arrow
                  >
                    <AddCircleRoundedIcon />
                  </Tooltip>
                </button>
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />
            {props.pythalogyInvestigations !== null &&
            props.pythalogyInvestigations.length > 0 ? (
              <div className=" h-[18rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <IpdPythalogyInvestigationsTable
                  data={details}
                  deleteRow={deleteRow}
                  editRow={editRow}
                  setOpen={setOpen}
                  dataId={dataId}
                  setOpenViewDoc={setOpenViewDoc}
                  setInvestigationReport={setInvestigationReport}
                />
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </div>

      {/* //Add Investigation Modal// */}
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
          <AddIpdPythalogyInvestigationModal
            setOpen={setOpen}
            editInfo={editInfo}
            dataId={dataId}
            investigations={props.pathalogyInvestigations}
          />
        </Box>
      </Modal>

      {/* //View Investigation Modal// */}
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
            width: "60%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-end">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                setOpenView(false);
              }}
            />
          </div>
          <IpdPythalogyInvestigationsTable data={details} />
        </Box>
      </Modal>

      {/* // document preview modal// */}
      <Modal
        open={openViewDoc}
        onClose={() => {
          setOpenViewDoc(false);
        }}
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
          <div className=" bg-white font-bold flex justify-between px-4">
            <p className="text-lg">Investigation Details</p>
            <Button
              onClick={() => setOpenViewDoc(false)}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Close
            </Button>
          </div>
          {/* {investigationReport !== "" ? (
            <embed
              src={investigationReport}
              frameBorder="0"
              width="100%"
              height="100%"
            />
          ) : (
            <div>
              <p>Document is Not Available</p>
            </div>
          )} */}
        </Box>
      </Modal>
    </>
  );
};

export default IpdPythalogyInvestigation;
