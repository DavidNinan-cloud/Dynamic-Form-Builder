import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { VisitContext } from "../../ClinicalCareChart";
import { Style } from "../../../../components/bedallowcation/Style";
import {
  getAllCareNPosition,
  addNewcareNPosition,
} from "../../../services/nursingServices/carenposition/CareNPositionServices";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";
import CareNPositionTable from "./CareNPositionTable";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  patientNotselecteAlert,
  successAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";

export default function CareNPosition(props) {
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);
  const [count, setCount] = React.useState();
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [spinner, showSpinner] = React.useState(false);
  const [finalData, setFinalData] = React.useState();
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [careNPositionResult, setCareNPositionResult] = React.useState([]);
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const defaultValues = {
    eyeCare: false,
    mouthCare: false,
    backCare: false,
    foleysCathater: false,
    supinePosition: false,
    leftPosition: false,
    rightPosition: false,
    pronePosition: false,
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    populateCareNPositionTable(patientVisitId);
  }, [finalData, patientVisitId]);

  const populateCareNPositionTable = (obj) => {
    console.log("PopulateTable Has been called!!");
    showSpinner(true);
    showRecordWarning(false);
    getAllCareNPosition(obj)
      .then((response) => {
        console.log("getAllCareNPosition data is", getAllCareNPosition);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("care n position res.result", res.result);
        setCareNPositionResult(res);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  function postCareNPosition(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    addNewcareNPosition(obj)
      .then((response) => {
        console.log(
          "Posted OBJ of Care N Position IS ",
          JSON.stringify(response)
        );
        console.log(JSON.stringify(response));
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateCareNPositionTable(patientVisitId);
        }
        // if(patientVisitId === null){
        //   patientNotselecteAlert("Plz select Patient")
        //   setOpenPost(false);
        // }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }
  const onSubmitDataHandler = (postdata) => {
    console.log("care n position data is: ", postdata);
    if (patientVisitId !== null) {
      let carePositionPostObj = {
        backCare: postdata.backCare,
        eyeCare: postdata.eyeCare,
        foleysCatheter: postdata.foleysCathater,
        leftPosition: postdata.leftPosition,
        mouthCare: postdata.mouthCare,
        pronePosition: postdata.pronePosition,
        rightPosition: postdata.rightPosition,
        supinePosition: postdata.supinePosition,
        visitId: patientVisitId,
      };
      console.log("Care n Position Post Obj is :", carePositionPostObj);
      setFinalData(carePositionPostObj);
      setOpenPost(true);
    } 
  };
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postCareNPosition(finalData);
  }

  return (
    <div className=" backdrop-blur-0">
      <Modal
        open={props.open}
        onClose={() => { reset(defaultValues);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="w-[90%] h-[85%] xl:h-[75%] px-4 pb-2">
          <form
            className="grid grid-cols-1 w-full gap-x-2"
            onSubmit={handleSubmit(onSubmitDataHandler)}
          >
            <div className="sticky top-0 bg-white z-50 w-full">
              <div className="flex justify-between items-center w-full py-2">
                <div className="w-full font-semibold text-xl mt-1">
                  Care And Position
                </div>
                <CancelPresentationIconButton
                  onClick={() => {
                    props.handleClose();
                    reset(defaultValues);
                  }}
                />
              </div>
              <div className="bg-gray-100 px-2 rounded-md  border border-gray-300 mt-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 text-gray-500  text-sm items-center gap-1 w-full py-3">
                  {/* Patient Name */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-1">
                      <span className="whitespace-nowrap">Patient Name </span>
                      <span className=""> :</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      {props.patientInformation.patientName}
                    </h1>
                  </div>
                  {/* UHID */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-16 lg:space-x-9">
                      <span>UHID</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      {" "}
                      {props.patientInformation.uhid}
                    </h1>
                  </div>
                  {/* Age */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-16 lg:space-x-6 xl:space-x-10">
                      <span>Age</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      {props.patientInformation.age}
                    </h1>
                  </div>
                  {/* Gender */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-12">
                      <span>Gender</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      {" "}
                      {props.patientInformation.gender}
                    </h1>
                  </div>
                  {/* Bed Category */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-12 lg:space-x-6">
                      <span>BedNo</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      {" "}
                      {props.patientInformation.bedNo}
                    </h1>
                  </div>
                </div>
              </div>

              {spinner ? (
                <div className="grid justify-center">
                  <LoadingSpinner />
                </div>
              ) : null}
              {careNPositionResult.hasOwnProperty("result") &&
              careNPositionResult.result.length > 0 &&
              careNPositionResult.statusCode === 200 &&
              spinner === false ? (
                <CareNPositionTable data={careNPositionResult} />
              ) : null}
              {recordWarning === true && spinner === false ? (
                <div className="flex justify-center items-center">
                  <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                    No Records Found...
                  </h3>
                </div>
              ) : null}

              <div className="grid md:grid-cols-1 xl:grid-cols-2 items-center gap-x-2 ">
                <div className="flex gap-2 items-center md:justify-between lg:justify-start xl:justify-center">
                  <p className="font-semibold text-black"> Care : </p>
                  <CheckBoxField
                    control={control}
                    name="eyeCare"
                    label="Eye Care"
                  />

                  <CheckBoxField
                    control={control}
                    name="mouthCare"
                    label="Mouth Care"
                  />
                  <CheckBoxField
                    control={control}
                    name="backCare"
                    label="Back Care"
                  />
                  <CheckBoxField
                    control={control}
                    name="foleysCathater"
                    label="Foleys Cathater"
                  />
                </div>
                <div className="flex gap-2 items-center md:justify-between lg:justify-start">
                  <p className="font-semibold text-black"> Position : </p>
                  <CheckBoxField
                    control={control}
                    name="supinePosition"
                    label="S"
                  />
                  <CheckBoxField
                    control={control}
                    name="leftPosition"
                    label="L"
                  />
                  <CheckBoxField
                    control={control}
                    name="rightPosition"
                    label="R"
                  />
                  <CheckBoxField
                    control={control}
                    name="pronePosition"
                    label="P"
                  />
                  <SaveButton />
                </div>
              </div>
            </div>
          </form>

          
        </Box>
      </Modal>
      <ConfirmationModal
            confirmationOpen={openPost}
            confirmationHandleClose={handleClosePost}
            confirmationSubmitFunc={addRecord}
            confirmationLabel="Confirmation"
            confirmationMsg="Are you sure want to add this record ?"
            confirmationButtonMsg="Add"
          />
    </div>
  );
}
