import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import InputField from "../../../../Common Components/FormFields/InputField";

const AuthorizationCodeModal = (props) => {
  const { showAuthCodeModal, setShowAuthCodeModal, setBackdropOpen } = props;

  const formOptions = {
    // resolver: yupResolver(validationSchemaPatientDetails, validationSchemaContactDetails),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data, event) => {
    console.log("data", data);

    setShowAuthCodeModal(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form>
        <Box className="absolute top-1/2 mt-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-4 shadow-2xl bg-white ">
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-2 pt-2">
              <div className="text-lg">Authorization Code</div>

              <CancelPresentationIcon
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setShowAuthCodeModal(false);
                }}
              />
            </div>
            <div className="py-4 grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <InputField
                  name="code"
                  variant="outlined"
                  label="Enter Authorization Code"
                  error={errors.code}
                  control={control}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <ResetButton onClick={() => reset()} />

            {/* <SaveButton /> */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium"
            >
              Save
            </button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default AuthorizationCodeModal;
