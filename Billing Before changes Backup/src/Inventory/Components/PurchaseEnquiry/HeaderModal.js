import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Box} from "@mui/material";
import {Modal} from "@mui/material";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import { TextareaAutosize } from "@mui/material";
const HeaderModal = (props) => {
  const HeaderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "1px solid gray",
    borderRadius: 1,
    boxShadow: 20,
    p: 4,
  };

  const [newHeader, setNewHeader] = useState(null);
  const schema = yup.object().shape({
    name: yup.string().required("Header Required"),
  });

  const val =
    "Dear Sir, \n Please quote your lowest rates for the following as per the Terms & Conditions mentioned here below.";

  const defaultValues = {
    header: {val},
  };

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  
  return (
    <>
      <div>
        <Modal
          open={props.openHeader}
          onClose={() => {
            props.handleHeaderClose();
          }}
        >
          <Box sx={HeaderStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full ">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleHeaderClose();
                }}
              />
            </div>
            <f>
              <div className="my-4">
                <div className="w-full">
                  {/* <TextField multiline rows={3} defaultValue={val} sx={{width:"100%"}} name="header"/> */}
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Header"
                    defaultValue={val}
                    style={{ width: "100%",border:"1px solid black", padding:"1rem" }}
                    name="header"
                    ModalStyle   value={newHeader}
                    onChange={(e) => setNewHeader(e.target.value)}
                  />
                </div>
                <div className="flex justify-end my-2 gap-4">
                  <ResetButton onClick={() => {setNewHeader(val)}} />
                  <SaveButton />
                </div>
              </div>
            </f>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default HeaderModal;
