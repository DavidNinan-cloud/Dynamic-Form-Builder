import React from "react";
import { Modal, Box } from "@mui/material";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import SubmitButton from "../../../../Common Components/Buttons/SubmitButton";

const RecollectReprocessModal = (props) => {
  const radioOptions = [
    { id: 0, value: 0, label: "Reprocess" },
    { id: 1, value: 1, label: "Recollect" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div>
      {" "}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            border: "1px solid gray",
            borderRadius: 1,
            boxShadow: 20,
            p: 4,
          }}
        >
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-1  w-full">
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="border border-gray-300 gap-2 text-left w-full rounded grid grid-cols-2 p-2">
                <legend className="ml-2 font-bold text-gray-700">
                  Reprocess / Recollect Sample
                </legend>
                <div className="">
                  <RadioField
                    //  label="Reprocess / Recollect"
                    name="radioOptions"
                    control={control}
                    dataArray={radioOptions}
                  />
                </div>
                <div className="">
                  <InputField
                    name="reason"
                    variant="outlined"
                    label="Reason"
                    error={errors.reason}
                    control={control}
                  />
                </div>
                <div className="col-start-2 col-span-1 flex items-center justify-end">
                  <SubmitButton className="" />
                </div>
              </fieldset>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RecollectReprocessModal;
