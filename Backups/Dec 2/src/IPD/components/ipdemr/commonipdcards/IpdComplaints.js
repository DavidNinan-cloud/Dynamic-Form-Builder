import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AddIpdComplaintsModal from "../emrcomponentsmodals/AddIpdComplaintsModal";
import IpdComplaintTable from "../emrtables/IpdComplaintTable";

const IpdComplaints = (props) => {
  let result = props.complaints;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataId, setDataId] = React.useState(null);
  const [editInfo, setEditInfo] = React.useState();
  const [actions, setActions] = React.useState(["Delete", "Edit"]);
  const [details, setDetails] = React.useState({ result, actions });

  const validationSchema = yup.object().shape({
    complaint: yup
      .string()
      .nullable()
      .notRequired("Please Add Complaints"),
  });
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      complaint: "",
    },
  });
  const { errors } = formState;

  function onSubmitComplaints(complaintData) {
    console.log(complaintData);
  }

  useEffect(() => {
    console.log("Props complaints", props);
  }, [props]);

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  function editRow(complaintsInfo, index) {
    console.log("Edit Info", complaintsInfo, index);
    setIsEdit(true);
    setEditInfo(complaintsInfo);
    setDataId(index);
    setOpen(true);
  }
  return (
    <>
      <div className="ml-2 ">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            width: "99%",
            overflow: "scroll",
          }}
          className=" mx-auto h-[16rem] max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-[#DCFCE7] -mt-2">
              <div className="text-sm font-semibold pl-2">Complaints</div>
              <div>
                {props.complaints !== null && props.complaints.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip
                      title="View Complaints"
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
                    title="Add New Complaints"
                    placement="left-start"
                    arrow
                  >
                    <AddCircleRoundedIcon />
                  </Tooltip>
                </button>
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />
            {/* <form onSubmit={handleSubmit(onSubmitComplaints)}> */}
            <div className="flex">
              <TextField
                variant="outlined"
                label="Complaint"
                fullWidth
                size="small"
                multiline
                rows={4}
                name="complaint"
                onChange={(e) => props.setVoiceComplaints(e.target.value)}
              />
            </div>
            {/* </form> */}
            {props.complaints !== null && props.complaints.length > 0 ? (
              <div className=" h-auto max-h-[18rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <IpdComplaintTable
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

      {/* //Add Complaints Modal// */}
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
          <AddIpdComplaintsModal
            setOpen={setOpen}
            complaints={props.complaints}
            editInfo={editInfo}
            dataId={dataId}
          />
        </Box>
      </Modal>

      {/* //View Complaints Modal// */}
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
          <IpdComplaintTable data={details} />
        </Box>
      </Modal>
    </>
  );
};

export default IpdComplaints;
