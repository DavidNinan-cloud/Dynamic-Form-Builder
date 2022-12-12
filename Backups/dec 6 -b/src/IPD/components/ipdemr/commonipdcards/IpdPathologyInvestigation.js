import { Box, Button, Card, CardContent, Modal, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import IpdPathologyInvestigationsTable from "../emrtables/IpdPathologyInvestigationsTable";
import AddIpdPathologyInvestigationModal from "../emrcomponentsmodals/AddIpdPathologyInvestigationModal";
import { useForm } from "react-hook-form";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { getPathologyInvestigations } from "../../../services/IpdEmr/IpdEmrServices";
import useFileUpload from "../../admission/admissionform/common component/hooks/useFileUpload";
import { pathologyInvestigationContext } from "../Context";

const IpdPathologyInvestigation = () => {
  const { pathologyInvestigations } = useContext(pathologyInvestigationContext);
  let result = pathologyInvestigations;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataId, setDataId] = React.useState(null);
  const [updateIndex, setUpdateIndex] = React.useState(null);
  const [editInfo, setEditInfo] = React.useState();
  const [actions, setActions] = React.useState(["Delete", "Edit"]);
  const [details, setDetails] = React.useState({
    result,
    actions,
  });
  const [
    pathologyInvestigationReport,
    setPathologyInvestigationReport,
  ] = React.useState(null);
  const [
    pathologyInvestigationReportPath,
    setPathologyInvestigationReportPath,
  ] = React.useState(null);
  const [openViewDoc, setOpenViewDoc] = React.useState(false);
  const [investigationList, setInvestigationList] = useState();
  const [investigation, setInvestigation] = useState();
  const [investigationReport, setInvestigationReport] = useState();

  useEffect(() => {
    getPathologyInvestigations()
      .then((response) => {
        setInvestigationList(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    result = pathologyInvestigations;
    setDetails({ result, actions });
  }, [pathologyInvestigations, pathologyInvestigationReport]);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      investigation: null,
    },
  });

  const deleteRow = (index) => {
    details.result.splice(index, 1);
    // console.log(complaintsData);
    setDetails({ ...details });
  };

  function editRow(investigationInfo, index) {
    console.log("Edit Info", investigationInfo, index);
    setUpdateIndex(index);
    let investigation = {
      value: 0,
      label: investigationInfo.investigation,
    };
    let myObj = {
      investigation: investigation,
      pathologyInvestigationReport: pathologyInvestigationReport,
      pathologyInvestigationReportPath: pathologyInvestigationReportPath,
    };

    reset(myObj);
  }

  const imgData = useFileUpload();

  const handleDocChange = (target, index) => {
    setDataId(index);
    const result = imgData.onProfilePicChange(target);
  };

  React.useEffect(() => {
    imgData.fileName.length === 0
      ? setPathologyInvestigationReportPath(null)
      : setPathologyInvestigationReportPath(imgData.path);

    imgData.fileName === ""
      ? setPathologyInvestigationReport(null)
      : setPathologyInvestigationReport(imgData.fileName);

    handleUploadedDoc(dataId);
  }, [imgData]);

  const handleUploadedDoc = (id) => {
    let uploadRecord = pathologyInvestigations[id];
    if (uploadRecord) {
      uploadRecord.pathologyInvestigationReport = pathologyInvestigationReport;
      uploadRecord.pathologyInvestigationReportPath = pathologyInvestigationReportPath;
      pathologyInvestigations[id] = uploadRecord;
    }
    console.log("uploadRecord", uploadRecord);
  };

  function onSubmit(investigationData) {
    console.log("investigationData", investigationData);

    if (updateIndex !== null) {
      let investigationDetails = {
        investigation: investigationData.investigation.label,
        testId: investigationData.investigation.id,
        pathologyInvestigationReport: pathologyInvestigationReport,
        pathologyInvestigationReportPath: pathologyInvestigationReportPath,
      };
      let updatedInvestigation = [];
      updatedInvestigation.push(investigationDetails);
      pathologyInvestigations[updateIndex] = updatedInvestigation[0];
    } else {
      let investigationDetails = {
        investigation: investigationData.investigation.label,
        testId: investigationData.investigation.id,
        pathologyInvestigationReport: null,
        pathologyInvestigationReportPath: null,
      };
      pathologyInvestigations.push(investigationDetails);
    }
    setUpdateIndex(null);
    setValue("investigation", null);
    // reset(defaultValues);
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
            // width: "99%",
          }}
          className=" mx-auto  h-[16rem] max-h-[16rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
        >
          <CardContent>
            <div className="flex justify-between py-2 bg-[#E0F2FE] -mt-2">
              <div className="text-sm font-semibold pl-2">
                Investigation(Pathology)
              </div>
              <div>
                {pathologyInvestigations !== null &&
                pathologyInvestigations.length > 0 ? (
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
                {/* <button
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
                </button> */}
              </div>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div className=" h-[18rem] overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
              <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
                <div className="flex w-full space-x-2">
                  <div className="w-9/12">
                    <SearchDropdown
                      control={control}
                      error={errors.investigation}
                      searchIcon={false}
                      name="investigation"
                      placeholder="Pathology Investigation"
                      label="Pathology Investigation"
                      dataArray={investigationList}
                      isSearchable={true}
                      isClearable={false}
                      inputRef={{
                        ...register("investigation", {
                          onChange: (e) => {
                            if (e.target.value !== null) {
                              setInvestigation(e.target.value.value);
                            } else {
                              setInvestigation(null);
                            }
                          },
                        }),
                      }}
                    />
                  </div>

                  <div className="w-3/12">
                    <button
                      type="submit"
                      className="h-10 px-6 my-auto rounded-md bg-customBlue text-white text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>

              {pathologyInvestigations !== null &&
              pathologyInvestigations.length > 0 ? (
                <IpdPathologyInvestigationsTable
                  data={details}
                  deleteRow={deleteRow}
                  editRow={editRow}
                  setOpen={setOpen}
                  dataId={dataId}
                  setOpenViewDoc={setOpenViewDoc}
                  handleDocChange={handleDocChange}
                  setInvestigationReport={setInvestigationReport}
                  pathologyInvestigationReport={pathologyInvestigationReport}
                />
              ) : (
                ""
              )}
            </div>
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
          <AddIpdPathologyInvestigationModal
            setOpen={setOpen}
            editInfo={editInfo}
            dataId={dataId}
            investigations={pathologyInvestigations}
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
          <IpdPathologyInvestigationsTable data={details} />
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
            overflow: "scroll",
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
          <div className="h-full">
            {investigationReport !== "" ? (
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
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default IpdPathologyInvestigation;
