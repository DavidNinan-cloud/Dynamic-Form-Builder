import { Button, Card, Grid, Modal } from "@mui/material";
// import React, { useEffect, useState, lazy, Suspense } from "react";
import React, { useEffect, useState } from "react";

// const Allergies = lazy(() => import("./Allergies"));
// const Complaints = lazy(() => import("./Complaints"));
// const Diagnosis = lazy(() => import("./Diagnosis"));
// const Documents = lazy(() => import("./Documents"));
// const Investigation = lazy(() => import("./Investigation"));
// const Symptoms = lazy(() => import("./Symptoms"));
// const Services = lazy(() => import("./Services"));
// const Prescription = lazy(() => import("./Prescription"));

import Allergies from "./Allergies";
import Complaints from "./Complaints";
import Diagnosis from "./Diagnosis";
import Documents from "./Documents";
import Investigation from "./Investigation";
import Prescription from "./Prescription";
import Services from "./Services";
import Symptoms from "./Symptoms";
import LocalExamination from "./LocalExamination";

import GeneralProfile from "./GeneralProfile";
import PatientHistory from "./PatientHistory";
import PreviousVisits from "./PreviousVisits";
import Vitals from "./Vitals";
import { baseUrl } from "../../http-common-precription";
import {
  getDetailsByVisitNumber,
  getPatient,
  getPatientInfoById,
  saveEMRData,
} from "../../services/EMRServices/emrServices";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import { Box } from "@mui/system";
import { getPrescription } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import PatientPastHistory from "./PatientPastHistory";
import PatientSurgicalHistory from "./PatientSurgicalHistory";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../Common Components/FormFields/InputField";
import { useForm } from "react-hook-form";
import CompleteButton from "../../../Common Components/Buttons/CompleteButton";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import { AppContext } from "./Context";

const EMR = () => {
  let followupDetails = [];
  const [visits, setVisits] = useState();
  const [patientHistory, setPatientHistory] = useState(null);
  const [patientPastHistory, setPatientPastHistory] = useState(null);
  const [patientPastHistoryDetails, setPatientPastHistoryDetails] = useState(
    []
  );
  const [patientSurgicalHistory, setPatientSurgicalHistory] = useState("");
  const [localExamination, setLocalExamination] = useState("");
  const [vitals, setVitals] = useState([]);
  const [vitalsValue, setVitalsValue] = React.useState(null);
  const [complaints, setComplaints] = useState([]);
  const [voiceComplaints, setVoiceComplaints] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [voiceAllergies, setVoiceAllergies] = useState(null);
  const [investigations, setInvestigations] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [voiceSymptoms, setVoiceSymptoms] = useState(null);
  const [prescriptions, setPrescription] = useState([]);
  const [services, setServices] = useState([]);
  const [role, setRole] = useState("");
  const [patientInfo, setPatientInfo] = React.useState();
  const [visitDetails, setVisitDetails] = React.useState();
  const [selectedVisit, setSelectedVisit] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({ result: prescriptions });
  const [print, setPrint] = React.useState(false);
  const [prescriptionVisitId, setPrescriptionVisitId] = React.useState(null);
  const [prescriptionPdf, setPrescriptionPdf] = React.useState("");
  const [showPdf, setShowPdf] = React.useState(false);
  const [openPrescription, setOpenPrescription] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [locationParam, setLocationParams] = React.useState(null);
  const [closeVisitBtn, setCloseVisitBtn] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [advisedForAdmissionFlag, setAdvisedForAdmissionFlag] = useState();
  const [pdfSpinner, setPdfSpinner] = useState(false);
  // const [adviseInfo, setAdviseInfo] = useState("");
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  let navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state;

  console.log("location.state", patientData);

  useEffect(() => {
    if (patientData !== null) {
      setLocationParams(patientData);
    }
  }, []);

  const handleClose = () => setOpen(false);
  const handlePrescriptionClose = () => {
    setOpenPrescription(false);
    navigate("/opd/visitlist", { replace: true });
  };

  let patientId, visitId, visitNumber, visitDate, status, paramsData;
  if (locationParam !== null) {
    patientId = locationParam.patientId;
    visitNumber = locationParam.visitNumber;
    visitDate = locationParam.visitDate;
    visitId = locationParam.visitId;
    status = locationParam.status;
  }

  // paramsData = patientData.split(/[=&]+/);
  // console.log("Param Data", paramsData);
  // if (paramsData.length > 6) {
  //   patientId = paramsData[1];
  //   visitId = paramsData[3];
  //   visitNumber = paramsData[5].replaceAll("%2F", "/");
  //   visitDate = paramsData[7];
  // } else {
  //   patientId = paramsData[1];
  //   visitNumber = paramsData[3].replaceAll("%2F", "/");
  //   visitId = 0;
  //   visitDate = paramsData[5];
  // }

  //Form to get Advice for Admission Data
  const { handleSubmit, formState, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      advisedForAdmission: false,
      // advise: "",
    },
  });
  const { errors } = formState;

  function onSubmitAdvice(data) {
    console.log(data);
    setAdvisedForAdmissionFlag(data.advisedForAdmission);
    // setAdviseInfo(data.advise);
  }

  useEffect(() => {
    if (visitId !== 0 && patientData !== null) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  });

  useEffect(() => {
    if (typeof patientId !== "undefined") {
      if (visitId !== 0) {
        visitNumber = null;
      }
      getPatient(patientId, visitId, visitNumber)
        .then((response) => {
          setVisitDetails(response.data.result.visits);
          if (response.data.result.patientEmr) {
            setPatientPastHistory(response.data.result.patientEmr.pastHistory);
          }
          setPatientSurgicalHistory(
            response.data.result.patientInfo.surgicalHistoryDetails
          );
          setPatientInfo(response.data.result.patientInfo);
          if (
            typeof response.data.result.patientInfo.historyDetails !==
            "undefined"
          ) {
            setPatientHistory(response.data.result.patientInfo.historyDetails);
          } else {
            setPatientHistory(null);
          }

          console.log(
            "Response EMR 1",
            response.data.result.patientEmr.localExamination
          );
          if (response.data.result.patientEmr !== null) {
            setId(response.data.result.patientEmr.id);
            setLocalExamination(
              response.data.result.patientEmr.localExamination
            );
            // setPatientPastHistory(response.data.result.pastHistory);
            getPrescriptions(response.data.result.patientEmr);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [patientId]);

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    console.log("Role", role);
    userRole.toLowerCase() === "doctor"
      ? setRole("Doctor")
      : userRole.toLowerCase() === "nurse"
      ? setRole("Nurse")
      : setRole("");
  }, [role]);

  //Function to assign reponse to Table
  const getPrescriptions = (data) => {
    if (data.vitals != null) {
      data.vitals.map((item) => {
        vitals.push(item);
      });
    }
    if (data.complaints != null) {
      data.complaints.map((item) => {
        complaints.push(item);
      });
    }
    if (data.documents != null) {
      data.documents.map((item) => {
        documents.push(item);
      });
    }
    if (data.diagnosis != null) {
      data.diagnosis.map((item) => {
        diagnosis.push(item);
      });
    }
    if (data.allergies != null) {
      data.allergies.map((item) => {
        allergies.push(item);
      });
    }
    if (data.investigations != null) {
      data.investigations.map((item) => {
        investigations.push(item);
      });
    }
    if (data.symptoms != null) {
      data.symptoms.map((item) => {
        symptoms.push(item);
      });
    }
    if (data.services != null) {
      data.services.map((item) => {
        services.push(item);
      });
    }
    if (data.prescriptions != null) {
      data.prescriptions.map((item) => {
        prescriptions.push(item);
      });
    }
  };
  const handleDetailsByVisitNumber = (visitList, visitId) => {
    console.log("Visit List", visitList, visitId);
    setSelectedVisit(visitList);
    setPrescriptionVisitId(visitId);
  };

  const handleEMRData = () => {
    console.log("patient Past History", patientPastHistory);
    // if (patientPastHistory !== null) {
    //   patientPastHistoryDetails.push(patientPastHistory);
    // }
    console.log("vitalsValue", vitalsValue);
    if (vitalsValue !== null) {
      vitals.push(vitalsValue);
    }
    // console.log("voiceComplaints", voiceComplaints);
    if (voiceComplaints !== null) {
      console.log("voiceComplaints", voiceComplaints);
      let complaintObj = {
        complaint: voiceComplaints,
      };
      complaints.push(complaintObj);
      setVoiceComplaints(null);
    }

    if (voiceAllergies !== null) {
      let allergyObj = {
        allergyType: voiceAllergies,
      };
      allergies.push(allergyObj);
      setVoiceAllergies(null);
    }
    if (voiceSymptoms !== null) {
      let symptomsObj = {
        symptoms: voiceSymptoms,
      };
      symptoms.push(symptomsObj);

      setVoiceSymptoms(null);
    }

    setOpen(true);

    // console.log("voiceAllergies", voiceAllergies);
    // console.log("voiceSymptoms", voiceSymptoms);
  };

  // Api call after visit is selcted
  useEffect(() => {
    if (typeof selectedVisit !== "undefined") {
      console.log("Selected visit", selectedVisit);
      // handleDetailsByVisitNumber();
      let visitDetails = {
        visitNumber: selectedVisit,
      };
      getDetailsByVisitNumber(visitDetails)
        .then((response) => {
          console.log("Res1", response.data.result.vitals);
          if (response.status === 200) {
            setVitals(response.data.result.vitals);
            setComplaints(response.data.result.complaints);
            setDocuments(response.data.result.documents);
            setDiagnosis(response.data.result.diagnosis);
            setAllergies(response.data.result.allergies);
            setInvestigations(response.data.result.investigations);
            setSymptoms(response.data.result.symptoms);
            setServices(response.data.result.services);
            setPrescription(response.data.result.prescriptions);

            // setPatientDetails(response.data.result);
            // setPrescription(response.data.result.prescriptions);
            // getPrescriptions(response.data.result);
          }
        })
        .catch((response) => {
          console.log(response.message);
        });
    } else {
      if (typeof patientInfo !== "undefined") {
        console.log("patientInfo.id", patientInfo);
        let patientIdDetails;
        if (visitId === 0) {
          patientIdDetails = {
            patientInfoId: patientInfo.id,
          };
        } else {
          patientIdDetails = {
            visitNumber: [visitNumber],
          };
        }
        if (status.toLowerCase() === "completed")
          getPatientInfoById(patientIdDetails)
            .then((response) => {
              console.log("Complete Res", response.data.result.pastHistory);
              let AdviceData = {
                // advise: response.data.result.advise,
                advisedForAdmission: response.data.result.advisedForAdmission,
              };
              console.log("AdviceData", response.data.result);
              reset(AdviceData);
              setData({ result: response.data.result.prescriptions });
              setPatientPastHistory(response.data.result.pastHistory);
              getPrescriptions(response.data.result);
            })
            .catch((response) => {
              console.log(response);
            });
      }
    }
  }, [selectedVisit, patientInfo]);

  const { mutate: saveEMRDetails } = useMutation(
    saveEMRData,
    {
      onSuccess: (response) => {
        console.log("SaveResponse", response);

        setVitals([]);
        setComplaints([]);
        setAllergies([]);
        setSymptoms([]);
        setPrescriptionVisitId(response.data.result.visitId);
        // if (response.status === 200) {
        successAlert(response.data.message);
        navigate("/opd/visitlist", { replace: true });
        // }
        setOpenBackdrop(false);
      },
    },
    {
      onError: (err) => {
        setVitals([]);
        setComplaints([]);
        setAllergies([]);
        setSymptoms([]);
        errorAlert(err.message);
        setOpenBackdrop(false);
      },
    }
  );

  const { mutate: saveEMRPrintPrescription } = useMutation(
    saveEMRData,
    {
      onSuccess: (response) => {
        console.log("SaveResponse", response);

        setPrescriptionVisitId(response.data.result.visitId);
        setShowPdf(true);
        if (response.status === 200) {
          successAlert(response.data.message);
        }
        setOpenBackdrop(false);
      },
    },
    {
      onError: (err) => {
        errorAlert(err.message);
        setOpenBackdrop(false);
      },
    }
  );

  let department, doctorId, doctorName, priority, notes, nextFollowDate;
  followupDetails.map((item, index) => {
    department = item.department;
    doctorId = item.doctorId;
    doctorName = item.doctorName;
    priority = item.priority;
    notes = item.notes;
    nextFollowDate = item.nextFollowDate;
  });

  //Function Call on Confirm Button Click to Save EMR
  const handleSubmitEMR = () => {
    handleClose();
    setOpenBackdrop(true);
    let patientDOB;
    let birth = patientInfo.birthDate;
    let birthArray = birth.split("-");
    patientDOB = birthArray[0] + "-" + birthArray[1] + "-" + birthArray[2];
    console.log("visitDate", visitDate);
    let finalEMRObject = {
      id: id,
      visitDate: visitDate,
      visitNumber: visitNumber,
      advisedForAdmission: advisedForAdmissionFlag,
      // advise: adviseInfo,
      patientInfo: {
        patientId: patientInfo.patientId,
        id: patientInfo.id,
        uhid: patientInfo.uhid,
        patientName: patientInfo.patientName,
        birthDate: patientDOB,
        // historyDetails: patientHistory,
        surgicalHistoryDetails: patientSurgicalHistory,
        gender: patientInfo.gender,
        maritalStatus: patientInfo.maritalStatus,
        email: patientInfo.email,
        mobile: patientInfo.mobile,
        // insurance: patientInfo,
      },
      localExamination: localExamination,
      department: department,
      doctorId: doctorId,
      doctorName: doctorName,
      nextFollowDate: nextFollowDate,
      notes: notes,
      priority: priority,
      // pastHistories: patientPastHistoryDetails,
      pastHistory: patientPastHistory,
      complaints: complaints,
      allergies: allergies,
      documents: documents,
      diagnosis: diagnosis,
      investigations: investigations,
      prescriptions: prescriptions,
      services: services,
      symptoms: symptoms,
      vitals: vitals,
    };

    console.log("Final EMR", finalEMRObject);
    saveEMRDetails(finalEMRObject);
  };

  //Save EMR And Show Print Prescription Screen
  const handleSubmitAndPrint = () => {
    // setShowPdf(true);
    handleClose();
    let patientDOB;
    let birth = patientInfo.birthDate;
    let birthArray = birth.split("-");
    patientDOB = birthArray[0] + "-" + birthArray[1] + "-" + birthArray[2];

    let finalEMRObject = {
      id: id,
      visitDate: visitDate,
      visitNumber: visitNumber,
      patientInfo: {
        patientId: patientInfo.patientId,
        id: patientInfo.id,
        uhid: patientInfo.uhid,
        patientName: patientInfo.patientName,
        birthDate: patientDOB,
        // historyDetails: patientHistory,
        surgicalHistoryDetails: patientSurgicalHistory,
        gender: patientInfo.gender,
        maritalStatus: patientInfo.maritalStatus,
        email: patientInfo.email,
        mobile: patientInfo.mobile,
        // insurance: patientInfo,
      },
      department: department,
      doctorId: doctorId,
      doctorName: doctorName,
      nextFollowDate: nextFollowDate,
      notes: notes,
      // pastHistories: patientPastHistoryDetails,
      pastHistory: patientPastHistory,
      priority: priority,
      complaints: complaints,
      allergies: allergies,
      documents: documents,
      diagnosis: diagnosis,
      investigations: investigations,
      prescriptions: prescriptions,
      services: services,
      symptoms: symptoms,
      vitals: vitals,
    };

    console.log("Final EMR", finalEMRObject);
    saveEMRPrintPrescription(finalEMRObject);
    setOpenBackdrop(true);
  };

  useEffect(() => {
    console.log("prescriptionVisitId111", prescriptionVisitId);
    if (prescriptionVisitId !== null) {
      setPrint(true);
    }
  }, [prescriptionVisitId]);

  //API to Show Prescription PDF
  useEffect(() => {
    console.log("prescriptionVisitId", prescriptionVisitId);
    if (showPdf === true) {
      if (prescriptionVisitId !== null) {
        getPrescription(prescriptionVisitId)
          .then((response) => {
            if (response.status === 200) {
              setOpenPrescription(true);
              setPdfSpinner(true);
              setPrescriptionPdf(
                `${baseUrl}/reports/generatePdf/prescription?visitId=${prescriptionVisitId}`
              );
              setPdfSpinner(false);
            }
          })
          .catch((response) => {
            console.log(response);
          });
      }
    }
  }, [prescriptionVisitId, prescriptionPdf, showPdf]);

  useEffect(() => {
    console.log("Emr", investigations);
  }, [investigations]);

  return (
    <div className="mt-16 pt-2 mb-4">
      <div className="bg-slate-50 sticky top-14 z-30">
        <div className=" ">
          <GeneralProfile patientInfo={patientInfo} />
        </div>
        {/* //EMR Title and Complete Btn// */}
        <div className="text-gray-500 text-left ml-3 flex justify-between mb-2">
          <h1 className="mt-1 ml-2">Electronic Medical Record (EMR)</h1>

          {/* {role.toLowerCase() === "doctor" ? (
          <>
            <fieldset disabled={isDisabled}>
              <form onChange={handleSubmit(onSubmitAdvice)} className="w-full">
                <div className="flex ">
                  <div className="w-5/12">
                    <CheckBoxField
                      control={control}
                      name="advisedForAdmission"
                      label="Advised for Admission"
                      style={{ fontSize: "0.75rem" }}
                    />
                  </div>
                  <div className="w-7/12">
                    <InputField
                      type="string"
                      name="advise"
                      label="Advise"
                      control={control}
                    />
                  </div>
                </div>
              </form>
            </fieldset>
          </>
        ) : (
          ""
        )} */}
          <div>
            <form onSubmit={handleSubmit(onSubmitAdvice)} className="w-full">
              <div className="flex mr-6">
                {role.toLowerCase() === "doctor" ? (
                  <>
                    <CheckBoxField
                      control={control}
                      name="advisedForAdmission"
                      label="Advised for Admission"
                      style={{ fontSize: "0.75rem" }}
                    />
                  </>
                ) : (
                  ""
                )}

                {role.toLowerCase() === "nurse" &&
                status.toLowerCase() !== "completed" ? (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        handleEMRData();
                        // setOpen(true);
                      }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  ""
                )}
                {visitId !== 0 && patientData !== null ? (
                  ""
                ) : status.toLowerCase() === "ongoing" &&
                  role.toLowerCase() === "doctor" ? (
                  <CompleteButton
                    onClick={() => {
                      handleEMRData();
                      // setOpen(true);
                    }}
                  />
                ) : null}
                {/* <button
                    type="submit"
                    className="border border-orange-500 font-medium text-base py-1 px-2 mr-4 ml-2 uppercase bg-orange-500 text-white hover:bg-white hover:text-orange-500 rounded-md"
                    onClick={() => {
                      handleEMRData();
                      // setOpen(true);
                    }}
                  >
                    Complete
                  </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Grid container columnSpacing={0} rowSpacing={0}>
        <Grid item lg={12} sm={12}>
          <Vitals
            vitals={vitals}
            setCloseVisitBtn={setCloseVisitBtn}
            vitalsValue={vitalsValue}
            setVitalsValue={setVitalsValue}
            patientId={patientData.patientId}
          />
        </Grid>
        {/* //Visits// */}
        <Grid item lg={6} sm={12} className="mt-3">
          <PreviousVisits
            data={visitDetails}
            handleDetailsByVisitNumber={handleDetailsByVisitNumber}
          />
        </Grid>
        {/* //History// */}
        <Grid item lg={6} sm={12} className="">
          {/* //Past History// */}
          <PatientPastHistory
            patientPastHistory={patientPastHistory}
            setPatientPastHistory={setPatientPastHistory}
          />
        </Grid>

        {/* //Allergies// */}
        <Grid item lg={6} sm={12}>
          <Allergies
            allergies={allergies}
            voiceAllergies={voiceAllergies}
            setVoiceAllergies={setVoiceAllergies}
            status={status}
          />
        </Grid>

        {/* //Surgical History and Documents// */}
        <Grid item lg={6} sm={12}>
          <Grid>
            {/* //Documents// */}
            <div>
              <Documents documents={documents} status={status} />
            </div>
            {/* //Surgical History// */}
            <div className="mt-1">
              <PatientSurgicalHistory
                patientSurgicalHistory={patientSurgicalHistory}
                setPatientSurgicalHistory={setPatientSurgicalHistory}
              />
            </div>
          </Grid>
        </Grid>

        {/* <Suspense fallback={<h1>Loading…</h1>}> */}
        {/* //Complaints// */}
        <Grid item lg={4} sm={12}>
          <Complaints
            complaints={complaints}
            voiceComplaints={voiceComplaints}
            setVoiceComplaints={setVoiceComplaints}
            status={status}
          />
        </Grid>
        {/* //Symptoms// */}
        <Grid item lg={4} sm={12}>
          <Symptoms
            symptoms={symptoms}
            setVoiceSymptoms={setVoiceSymptoms}
            status={status}
          />
        </Grid>
        {/* //Local Examination// */}
        <Grid item lg={4} sm={12}>
          <LocalExamination
            localExamination={localExamination}
            setLocalExamination={setLocalExamination}
          />
        </Grid>
        {/* //Diagnosis// */}
        {role.toLowerCase() === "doctor" ? (
          <Grid item lg={6} sm={12}>
            <Diagnosis diagnosis={diagnosis} status={status} />
          </Grid>
        ) : (
          ""
        )}

        {/* //Investigation// */}
        {role.toLowerCase() === "doctor" ? (
          <Grid item lg={6} sm={12}>
            <Investigation
              investigations={investigations}
              services={services}
              setServices={setServices}
              status={status}
            />
          </Grid>
        ) : (
          ""
        )}
        {/* //Services// */}
        {role.toLowerCase() === "doctor" ? (
          <Grid item lg={6} sm={12}>
            <AppContext.Provider value={{ services, setServices, status }}>
              <Services />
            </AppContext.Provider>
          </Grid>
        ) : (
          ""
        )}
        {/* //Prescription// */}
        {role.toLowerCase() === "doctor" ? (
          <Grid item lg={6} sm={12}>
            <Prescription
              prescriptions={prescriptions}
              print={print}
              setPrint={setPrint}
              prescriptionVisitId={prescriptionVisitId}
              setOpenPrescription={setOpenPrescription}
              patientInfo={patientInfo}
              status={status}
            />
          </Grid>
        ) : (
          ""
        )}
        {/* </Suspense> */}
      </Grid>

      <CommonBackDrop openBackdrop={openBackdrop} />

      {/* //Confirmation Modal// */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #848211",
            borderRadius: "0.5rem",
            boxShadow: 24,
            p: 4,
            width: "46%",
            height: "auto",
          }}
        >
          <p className="my-3 tracking-wide font-bold text-lg text-center ">
            Please Confirm to Save Patient Details
          </p>
          {/* <p className="my-3 tracking-wide font-bold text-center">
            Click on Confirm to Save Patient Details
          </p> */}

          <div className="flex justify-center">
            <Button
              variant="outlined"
              color="error"
              sx={{ marginX: "1rem", height: "40px" }}
              onClick={() => {
                setVitals([]);
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{ marginX: "1rem", height: "40px" }}
              onClick={() => handleSubmitEMR()}
            >
              Confirm
            </Button>
            {role.toLowerCase() === "doctor" ? (
              <Button
                variant="contained"
                color="warning"
                sx={{ marginX: "1rem", height: "40px" }}
                onClick={() => handleSubmitAndPrint()}
              >
                Confirm & Print Prescription
              </Button>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>

      {/* //Prescription Modal// */}
      <Modal
        open={openPrescription}
        onClose={handlePrescriptionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginX: "auto",
            position: "absolute",
            top: "1%",
            left: "1%",
            width: "97%",
            height: "93%",
          }}
        >
          <div className=" bg-white font-bold flex justify-between px-4">
            <p className="text-lg">Prescription Details</p>
            <Button
              onClick={handlePrescriptionClose}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Close
            </Button>
          </div>
          {prescriptionPdf !== "" ? (
            pdfSpinner ? (
              <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <embed
                src={prescriptionPdf}
                frameBorder="0"
                width="100%"
                height="100%"
              />
            )
          ) : (
            <div>
              <p>Prescription is Not Available</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EMR;
