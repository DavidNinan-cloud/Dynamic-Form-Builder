import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
// import SaveButton from "../../../Common Components/Buttons/SaveButton";
import OnClickSaveButton from "../../../Common Components/Buttons/OnClickSaveButton";
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

  const defaultValues = {
    headers:
      "Dear Sir, \n Please quote your lowest rates for the following as per the Terms & Conditions mentioned here below.",
  };

  const {
    control,
    reset,
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });
  // const onSubmitDataHandler = (data) => {
  //   console.log(data);
  // };

useEffect(()=>{

console.log("headerStore is ",props.headerStore);

},[props.headerStore])


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
            {/* <form onSubmit={handleSubmit(onSubmitDataHandler)}> */}
            <form
              // onSubmit={handleSubmit((data) => {
              //   console.log("Headers Data is", data);
              //  // props.setHeaderStore = data;
              // })}
            >
              <div className="my-4">
                <div className="w-full">

                  <TextareaAutosize
                    {...register("headers")}
                    minRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    // defaultValue="Dear Sir, \n Please quote your lowest rates for the following as per the Terms & Conditions mentioned here below."
                    style={{
                      width: "100%",
                      border: "1px solid gray",
                      padding: "1rem",
                    }}
                    name="headers"
                  />
                </div>
                <div className="flex justify-end my-2 gap-4">
                  <ResetButton
                    onClick={() => {
                      reset(defaultValues);
                    }}
                  />
                  <OnClickSaveButton
                    onClick={() => {
                      let val = getValues("headers");
                      props.setHeaderStore(val);
                    }}
                  />
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default HeaderModal;