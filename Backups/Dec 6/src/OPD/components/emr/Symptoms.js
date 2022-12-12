import {
  Box,
  Card,
  CardContent,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddSymptoms from "./emrcomponents/AddSymptoms";
import CommonTable from "./CommonTable";
import ViewDataTable from "./ViewDataTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SymptomsTable from "./emrtables/SymptomsTable";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const Symptoms = (props) => {
  let result = props.symptoms;
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
  useEffect(() => {
    console.log("Symptoms Props", details);
  }, [details]);

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

  const validationSchema = yup.object().shape({
    symptoms: yup
      .string()
      .nullable()
      .notRequired("Please Add Symptoms"),
  });
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      symptoms: null,
    },
  });
  const { errors } = formState;

  // function onSubmit(allergiesData) {
  //   console.log(allergiesData);
  // }

  return (
    <>
      <div className="ml-1">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "3px",
            // borderRadius: "10px",
            overflow: "scroll",
            width: "99%",
          }}
          className=" mx-auto h-[16rem] max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-[#FCE7F3] -mt-2 ">
              <div className="text-sm font-semibold pl-2">Symptoms</div>
              <div>
                {props.symptoms !== null && props.symptoms.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip title="View Symptoms" placement="left-start" arrow>
                      <VisibilityRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
                {props.status && props.status.toLowerCase() !== "completed" ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setDataId(null);
                      setOpen(true);
                    }}
                  >
                    <Tooltip title="Add Symptoms" placement="left-start" arrow>
                      <AddCircleRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="flex">
              <TextField
                variant="outlined"
                label="Symptoms"
                fullWidth
                size="small"
                multiline
                rows={4}
                name="symptoms"
                onChange={(e) => props.setVoiceSymptoms(e.target.value)}
              />
            </div>
            {/* </form> */}
            {props.symptoms !== null && props.symptoms.length > 0 ? (
              <div className="h-auto max-h-[18rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <SymptomsTable
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
      {/* //Add Symptoms Modal// */}
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
          <AddSymptoms
            setOpen={setOpen}
            symptoms={props.symptoms}
            editInfo={editInfo}
            dataId={dataId}
          />
        </Box>
      </Modal>

      {/* //View Symptoms Modal// */}
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
          <SymptomsTable data={details} />
        </Box>
      </Modal>
    </>
  );
};

export default Symptoms;
