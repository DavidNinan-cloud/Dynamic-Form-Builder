import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Modal,
} from "@mui/material";

import BasicInfo from "./BasicInfo";
import AddressInfo from "./AddressInfo";
// import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/system";
import IncomeInfo from "./IncomeInfo";
import RepresentativeInfo from "./RepresentativeInfo";
import RemarkInfo from "./RemarkInfo";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";

// import {
//   getAgeonDOB,
//   getpatientInfoById,
//   registerPatient,
//   updatePatientData,
// } from "../../../OPD/services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
// import {
//   successAlert,
//   errorAlert,
// } from "../../Common Components/Toasts/Toasts";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import ConfirmationModal from "../../../Common Components/ConfirmationModal";

const PersonalDetails = (props) => {
  //useState to Expanded Accordion
  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal2, setExpandPanal2] = useState(true);
  const [expandPanal3, setExpandPanal3] = useState(true);
  const [expandPanal4, setExpandPanal4] = useState(true);
  const [expandPanal5, setExpandPanal5] = useState(true);
  //useState to get Age based on selected DOB
  const [age, setAge] = useState(0);
  // const [regDate, setRegDate] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [bloodgroups, setBloodgroups] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [selectedDoc, setSelectedDoc] = useState("Aadhar Card");
  const [representativeDoc, setRepresentativeDoc] = useState("Aadhar Card");

  const [open, setOpen] = React.useState(false);

  const {
    profilePic,
    setProfilePic,
    setProfilePicName,
    identificationDocFile,
    setIdentificationDocFile,
    setIdentificationDocFileName,
    incomeFile,
    setIncomeFile,
    setIncomeFileName,
    representativeDocFile,
    setRepresentativeDocFile,
    setRepresentativeFileName,
    mobileValue,
    setMobileValue,
  } = props;

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  // API to Get Patient Data
  // useEffect(() => {
  //   if (patientId !== "") {
  //     getpatientInfoById(patientId)
  //       .then((res) => {
  //         console.log("Response", res.data.result.prefix.value);
  //         methods.reset(res.data.result);
  //         methods.setValue("prefix", {
  //           id: res.data.result.prefix.value,
  //           value: res.data.result.prefix.value,
  //           label: res.data.result.prefix.label,
  //         });
  //         res.data.result.gender.value === 1
  //           ? methods.setValue("gender", 1)
  //           : res.data.result.gender.value === 2
  //           ? methods.setValue("gender", 2)
  //           : methods.setValue("gender", 3);
  //         getAge(res.data.result.dob);
  //       })
  //       .catch((res) => {
  //         console.log(res);
  //       });
  //   }
  // }, []);

  //API Get Age based on DOB
  // const getAge = (dob) => {
  //   getAgeonDOB(dob)
  //     .then((response) => {
  //       methods.setValue("age", response.data.result.years, {
  //         shouldValidate: true,
  //       });
  //       methods.setValue("ageInYears", response.data.result.years);
  //       methods.setValue("ageInMonths", response.data.result.months);
  //       methods.setValue("ageInDays", response.data.result.days);
  //       // setValue("dob", dobGivenYear, dobGivenMonth, day);
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // };

  const handleChangePanal1 = () => {
    setExpandPanal1(!expandPanal1);
  };
  const handleChangePanal2 = () => {
    setExpandPanal2(!expandPanal2);
  };
  const handleChangePanal3 = () => {
    setExpandPanal3(!expandPanal3);
  };

  const handleChangePanal4 = () => {
    setExpandPanal4(!expandPanal4);
  };

  const handleChangePanal5 = () => {
    setExpandPanal5(!expandPanal5);
  };

  return (
    <div className="bg-gray-50">
      <div className="w-full">
        <div className="grid grid-cols-1 ml-0.5 w-fit">
          <CheckBoxField
            control={control}
            name="isEmergency"
            label="Emergency"
          />
        </div>

        {/* /// Patient Details //// */}
        <Accordion
          expanded={expandPanal1}
          onChange={handleChangePanal1}
          elevation={6}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              "&.Mui-expanded": {
                marginBottom: "-1rem",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <p className="font-bold tracking-wide text-sm font-Poppins">
              Personal Details
            </p>
          </AccordionSummary>
          <AccordionDetails>
            {/* //Basic Information // */}
            <BasicInfo
              bloodgroups={bloodgroups}
              setBloodgroups={setBloodgroups}
              maritalStatus={maritalStatus}
              setMaritalStatus={setMaritalStatus}
              selectedDoc={selectedDoc}
              setSelectedDoc={setSelectedDoc}
              age={age}
              setAge={setAge}
              profilePic={profilePic}
              setProfilePic={setProfilePic}
              setProfilePicName={setProfilePicName}
              gender={gender}
              setGender={setGender}
              identificationDocFile={identificationDocFile}
              setIdentificationDocFile={setIdentificationDocFile}
              setIdentificationDocFileName={setIdentificationDocFileName}
              isVisit={true}
              mobileValue={mobileValue}
              setMobileValue={setMobileValue}
            />
            <hr className="border my-2 divide-x-8 border-slate-300" />
            {/* // Address Information // */}
            <p className="font-bold tracking-wide text-sm my-3 font-Poppins">
              Address Details
            </p>
            <AddressInfo />
          </AccordionDetails>
        </Accordion>

        {/* //Income Details// */}
        <Accordion
          expanded={expandPanal2}
          onChange={handleChangePanal2}
          elevation={6}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            sx={{
              "&.Mui-expanded": {
                marginBottom: "-1rem",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <p className="font-bold tracking-wide text-sm font-Poppins">
              Income Details
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <IncomeInfo
              incomeFile={incomeFile}
              setIncomeFile={setIncomeFile}
              setIncomeFileName={setIncomeFileName}
            />
          </AccordionDetails>
        </Accordion>

        {/* /// Representative  Details //// */}
        <Accordion
          expanded={expandPanal4}
          onChange={handleChangePanal4}
          elevation={6}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            sx={{
              "&.Mui-expanded": {
                marginBottom: "-1rem",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <p className="font-bold tracking-wide text-sm font-Poppins">
              Representative Details
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <RepresentativeInfo
              representativeDoc={representativeDoc}
              setRepresentativeDoc={setRepresentativeDoc}
              representativeDocFile={representativeDocFile}
              setRepresentativeDocFile={setRepresentativeDocFile}
              setRepresentativeFileName={setRepresentativeFileName}
            />
          </AccordionDetails>
        </Accordion>

        {/* /// Remark  Details //// */}
        <Accordion
          expanded={expandPanal5}
          onChange={handleChangePanal5}
          elevation={6}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            sx={{
              "&.Mui-expanded": {
                marginBottom: "-1rem",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <p className="font-bold tracking-wide text-sm font-Poppins">
              Remark For Account
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <RemarkInfo />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
export default PersonalDetails;
