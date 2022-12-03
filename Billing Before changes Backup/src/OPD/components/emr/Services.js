import { Box, Card, CardContent, Modal, Tooltip } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddServices from "./emrcomponents/AddServices";
import CommonTable from "./CommonTable";
import ViewDataTable from "./ViewDataTable";
import ServiceTable from "./emrtables/ServicesTable";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EditIcon from "@mui/icons-material/Edit";
import { AppContext } from "./Context";

const Services = (props) => {
  // console.log("Props Service", props);

  const { services, status } = useContext(AppContext);
  let result = services;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editInfo, setEditInfo] = React.useState();
  const [dataId, setDataId] = React.useState(null);
  const [actions, setActions] = React.useState(["Delete", "Edit"]);
  const [details, setDetails] = React.useState({ result, actions });

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  useEffect(() => {
    if (status && status.toLowerCase() === "completed") {
      setActions([]);
    }
  }, [status]);

  function editRow(serviceInfo, index) {
    console.log("Edit Info", serviceInfo);
    setIsEdit(true);
    setEditInfo(serviceInfo);
    setDataId(index);
    setOpen(true);
  }

  useEffect(() => {
    let serviceList = services;
    console.log("props.services1", serviceList);
    details.result = serviceList;
  }, [services, result, details]);

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
          className=" mx-auto  h-[16rem] max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-sky-50 -mt-2">
              <div className="text-sm font-semibold pl-2">Services</div>
              <div>
                {services !== null && services.length > 0 ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpenView(true);
                    }}
                  >
                    <Tooltip title="View Services" placement="left-start" arrow>
                      <VisibilityRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
                {status && status.toLowerCase() !== "completed" ? (
                  <button
                    className="text-blue-500 mr-1"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <Tooltip title="Add Services" placement="left-start" arrow>
                      <AddCircleRoundedIcon />
                    </Tooltip>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />
            {services !== null && services.length > 0 ? (
              <div className=" h-[18rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                <ServiceTable
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

      {/* //Add Services Modal// */}
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
          <AddServices
            setOpen={setOpen}
            editInfo={editInfo}
            dataId={dataId}
            setEditInfo={setEditInfo}
            setDataId={setDataId}
          />
        </Box>
      </Modal>

      {/* //View Services Modal// */}
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
          <ServiceTable data={details} />
        </Box>
      </Modal>
    </>
  );
};

export default Services;
