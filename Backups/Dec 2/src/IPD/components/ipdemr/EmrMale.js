import { Grid } from "@mui/material";
import React, { useState } from "react";
import IpdAdvice from "./commonipdcards/IpdAdvice";
import IpdAllergies from "./commonipdcards/IpdAllergies";
import IpdComplaints from "./commonipdcards/IpdComplaints";
import IpdDiagnosis from "./commonipdcards/IpdDiagnosis";
import IpdDoctorDetails from "./commonipdcards/IpdDoctorDetails";
import IpdGeneralExamination from "./commonipdcards/IpdGeneralExamination";
import IpdInjuryDetails from "./commonipdcards/IpdInjuryDetails";
import IpdLocalExamination from "./commonipdcards/IpdLocalExamination";
import IpdMedication from "./commonipdcards/IpdMedication";
import IpdOtherDetails from "./commonipdcards/IpdOtherDetails";
import IpdPastHistory from "./commonipdcards/IpdPastHistory";
import IpdPathologyInvestigation from "./commonipdcards/IpdPathologyInvestigation";
import IpdRadiologyInvestigation from "./commonipdcards/IpdRadiologyInvestigation";
import IpdSpecialInstruction from "./commonipdcards/IpdSpecialInstruction";
import IpdSurgicalHistory from "./commonipdcards/IpdSurgicalHistory";
import IpdSystematicExamination from "./commonipdcards/IpdSystematicExamination";
import IpdVisits from "./commonipdcards/IpdVisits";
import IpdVitals from "./commonipdcards/IpdVitals";
import PatientInfo from "./commonipdcards/PatientInfo";

const EmrMale = () => {
  //Vitals useState
  const [vitals, setVitals] = useState([]);
  const [vitalsValue, setVitalsValue] = React.useState(null);
  //Visits useState
  const [visitDetails, setVisitDetails] = React.useState();
  //Past History useState
  const [patientPastHistory, setPatientPastHistory] = useState(null);
  //Allergies useState
  const [allergies, setAllergies] = useState([]);
  const [voiceAllergies, setVoiceAllergies] = useState(null);
  //Surgical History useState
  const [patientSurgicalHistory, setPatientSurgicalHistory] = useState("");
  //Complaints useState
  const [complaints, setComplaints] = useState([]);
  const [voiceComplaints, setVoiceComplaints] = useState(null);
  //Local Examination useState
  const [localExamination, setLocalExamination] = useState("");
  //Injury useState
  const [injuryDetails, setInjuryDetails] = useState("");
  //Diagnosis useState
  const [diagnosis, setDiagnosis] = useState([]);
  //Special Instruction useState
  const [specialInstruction, setSpecialInstruction] = useState("");
  //Systematic Examination useState
  const [rs, setRs] = useState("");
  const [cvs, setCvs] = useState("");
  const [cns, setCns] = useState("");
  const [pa, setPa] = useState("");
  //Investigation Pythalogy useState
  const [pathologyInvestigations, setPathologyInvestigations] = useState([]);
  //Investigation Radiology useState
  const [radiologyInvestigations, setRadiologyInvestigations] = useState([]);
  //Advice useState
  const [advice, setAdvice] = useState("");
  //Medication useState
  const [medication, setMedication] = useState([]);
  //Other Details useState
  const [transferTo, setTransferTo] = useState();
  const [doctor, setDoctor] = useState();
  const [reference, setReference] = useState();
  const [informToConsultant, setInformToConsultant] = useState();
  const [consultantName, setConsultantName] = useState();
  const [otBooked, setOtBooked] = useState();

  return (
    <div className="mt-16 pt-2 mb-4">
      <div className="bg-slate-50 sticky top-14 z-30">
        <div className=" ">
          <PatientInfo />
        </div>
      </div>

      <Grid container columnSpacing={0} rowSpacing={0}>
        {/* //Vitals// */}
        <Grid item lg={12} sm={12}>
          <IpdVitals
            vitals={vitals}
            vitalsValue={vitalsValue}
            setVitalsValue={setVitalsValue}
          />
        </Grid>
        {/* //Visits// */}
        <Grid item lg={6} sm={12} className="mt-3">
          <IpdVisits data={visitDetails} />
        </Grid>
        {/* //History// */}
        <Grid item lg={6} sm={12} className="">
          {/* //Past History// */}
          <IpdPastHistory
            patientPastHistory={patientPastHistory}
            setPatientPastHistory={setPatientPastHistory}
          />
        </Grid>
        {/* //Allergies// */}
        <Grid item lg={6} sm={6}>
          <IpdAllergies
            allergies={allergies}
            voiceAllergies={voiceAllergies}
            setVoiceAllergies={setVoiceAllergies}
          />
        </Grid>
        {/* //Surgical History// */}
        <Grid item lg={6} sm={6}>
          <IpdSurgicalHistory
            patientSurgicalHistory={patientSurgicalHistory}
            setPatientSurgicalHistory={setPatientSurgicalHistory}
          />
        </Grid>
        {/* //Complaints// */}
        <Grid item lg={6} sm={6}>
          <IpdComplaints
            complaints={complaints}
            voiceComplaints={voiceComplaints}
            setVoiceComplaints={setVoiceComplaints}
          />
        </Grid>
        {/* //Local Examination// */}
        <Grid item lg={6} sm={6}>
          <IpdLocalExamination
            localExamination={localExamination}
            setLocalExamination={setLocalExamination}
          />
        </Grid>
        {/* //Injury Examination// */}
        <Grid item lg={6} sm={6}>
          <IpdInjuryDetails
            injuryDetails={injuryDetails}
            setInjuryDetails={setInjuryDetails}
          />
        </Grid>
        {/* //Diagnosis// */}
        <Grid item lg={6} sm={6}>
          <IpdDiagnosis diagnosis={diagnosis} />
        </Grid>
        {/* //Investigation Pythalogy// */}
        <Grid item lg={6} sm={6}>
          <IpdPathologyInvestigation
            pathologyInvestigations={pathologyInvestigations}
          />
        </Grid>
        {/* //Investigation Radiology// */}
        <Grid item lg={6} sm={6}>
          <IpdRadiologyInvestigation
            radiologyInvestigations={radiologyInvestigations}
          />
        </Grid>
        {/* //General Examination// */}
        <Grid item lg={6} sm={6}>
          <IpdGeneralExamination />
        </Grid>
        {/* //Sepcial Instruction// */}
        <Grid item lg={6} sm={6}>
          <IpdSpecialInstruction
            specialInstruction={specialInstruction}
            setSpecialInstruction={setSpecialInstruction}
          />
        </Grid>
        {/* //Systematic Examination// */}
        <Grid item lg={12}>
          <IpdSystematicExamination
            rs={rs}
            setRs={setRs}
            cns={cns}
            setCns={setCns}
            cvs={cvs}
            setCvs={setCvs}
            pa={pa}
            setPa={setPa}
          />
        </Grid>
        {/* //Medication// */}
        <Grid item lg={12} sm={12}>
          <IpdMedication medication={medication} />
        </Grid>
        {/* //Advice// */}
        <Grid item lg={12} sm={12}>
          <IpdAdvice advice={advice} setAdvice={setAdvice} />
        </Grid>

        {/* //Other Details//
        <Grid item lg={12}>
          <IpdOtherDetails
            transferTo={transferTo}
            setTransferTo={setTransferTo}
            doctor={doctor}
            setDoctor={setDoctor}
            reference={reference}
            setReference={setReference}
            informToConsultant={informToConsultant}
            setInformToConsultant={setInformToConsultant}
            consultantName={consultantName}
            setConsultantName={setConsultantName}
            otBooked={otBooked}
            setOtBooked={setOtBooked}
          />
        </Grid> */}

        <Grid item lg={12}>
          <IpdDoctorDetails />
        </Grid>

        <Grid item lg={12}>
          <div className="flex justify-end my-2">
            <button className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
              Save
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmrMale;
