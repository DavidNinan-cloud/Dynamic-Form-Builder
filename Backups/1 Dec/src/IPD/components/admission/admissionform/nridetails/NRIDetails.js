import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PassportDetails from "./PassportDetails";
import VisaDetails from "./VisaDetails";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";

const NRIDetails = () => {
  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal2, setExpandPanal2] = useState(true);

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
  return (
    <div>
      <div className="bg-gray-50">
        <div className="w-full -mt-8">
          <div className="grid grid-cols-1 ml-0.5 w-fit">
            <CheckBoxField
              control={control}
              name="pendingPassportDetails"
              label="Pending Passport Details"
            />
          </div>
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
                Passport Details
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <PassportDetails />
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
                Visa Details
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <VisaDetails />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default NRIDetails;
