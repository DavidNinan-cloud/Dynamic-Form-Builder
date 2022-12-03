import { Card, CardContent } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";


const AdmissionCheckboxs = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();
  return (
    <div>
      <Card elevation={6} square={true}>
        <CardContent>
          <CheckBoxField
            control={control}
            name="lockIndent"
            label="Lock Indent"
          />
          <CheckBoxField
            control={control}
            name="medicoLegalCase"
            label="Medico Legal Case"
          />
          {/* <CheckBoxField
            control={control}
            name="isCashPayment"
            label="Cash Payment"
          /> */}
          <CheckBoxField
            control={control}
            name="vaccineApplicable"
            label="Vaccine Applicable"
          />

          <CheckBoxField
            control={control}
            name="isNewBornBaby"
            label="New Born Baby"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionCheckboxs;
