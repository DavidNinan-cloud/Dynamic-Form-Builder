import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function PatientNotselectedConfiModal(props) {
    const ModalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        border: "1px solid gray",
        borderRadius: 1,
        boxShadow: 20,
        p: 4,
      };

  return (
    <div>
      <Modal open={props.openInitialNursingModal}>
      <Box sx={ModalStyle}>
        PatientNotselectedConfirmationModal
        </Box>
      </Modal>
    </div>
  );
}
