import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormContext } from "react-hook-form";
import AdmissionInfo from "./AdmissionInfo";
import BedInfo from "./BedInfo";
import ReferenceInfo from "./ReferenceInfo";
import DoctorInfo from "./DoctorInfo";
import AdmissionCheckboxs from "./AdmissionCheckboxs";

const AdmissionsDetails = (props) => {
  const { errorDoctorDetails, setErrorDoctorDetails, isBedDetails } = props;

  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal2, setExpandPanal2] = useState(true);
  const [expandPanal3, setExpandPanal3] = useState(true);
  const [expandPanal4, setExpandPanal4] = useState(true);

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

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

  return (
    <div>
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
          <p className="font-bold tracking-wide text-sm font-Poppins my-2">
            Admission Details
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <AdmissionInfo isBedDetails={isBedDetails} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandPanal2}
        onChange={handleChangePanal2}
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
          <p className="font-bold tracking-wide text-sm font-Poppins my-2">
            Reference Details
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <ReferenceInfo />
          <DoctorInfo
            errorDoctorDetails={errorDoctorDetails}
            setErrorDoctorDetails={setErrorDoctorDetails}
          />
        </AccordionDetails>
      </Accordion>

      <AdmissionCheckboxs />
      {/* 
      <Accordion
        expanded={expandPanal3}
        onChange={handleChangePanal3}
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
          <p className="font-bold tracking-wide text-sm font-Poppins my-2">
            Bed Details
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <BedInfo />
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default AdmissionsDetails;
