import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";

const MediclaimAmountModal = (props) => {
  const validationSchema = yup.object().shape({
    mediClaimAmount: yup
      .string()
      .matches(/^[0-9]+$/, "Invalid")
      .nullable()
      .required("Add Medi Claim Amount"),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      mediClaimAmount: 0,
    },
  });

  function onSubmit(data) {
    console.log("Data", data);

    let finalObj = {
      mediClaimAmount: data.mediClaimAmount,
    };
    console.log("Received Data", finalObj);

    props.setOpenMediclaimModal(false);
  }

  return (
    <div>
      <p className="text-lg font-semibold">Add Mediclaim Amount</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 my-4">
          <div>
            <InputField
              name="mediClaimAmount"
              variant="outlined"
              label="Medicliam Amount"
              error={errors.mediClaimAmount}
              control={control}
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediclaimAmountModal;
