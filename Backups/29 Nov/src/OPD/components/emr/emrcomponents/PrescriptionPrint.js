import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { getPrescription } from "../../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { baseUrl } from "../../../http-common-billing";

const PrintPrescription = (props) => {
  console.log(props.prescriptionVisitId);
  const [prescriptionPdf, setPrescriptionPdf] = React.useState("");
  useEffect(() => {
    let visitId = props.prescriptionVisitId;
    console.log("Visit Id ", visitId);
    getPrescription(visitId)
      .then((response) => {
        if (response.status === 200) {
          setPrescriptionPdf(
            `${baseUrl}/reports/generatePdf/prescription?visitId=${visitId}`
          );
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div className="w-full h-screen">
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
            onClick={() => props.setPrintOpen(false)}
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Close
          </Button>
        </div>
        {prescriptionPdf !== "" ? (
          <embed
            src={prescriptionPdf}
            frameborder="0"
            width="100%"
            height="100%"
          />
        ) : (
          <div>
            <p>Prescription is Not Available</p>
          </div>
        )}
      </Box>
    </div>
  );
};

export default PrintPrescription;
