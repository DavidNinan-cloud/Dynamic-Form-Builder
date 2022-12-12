import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../../Common Components/FormFields/InputField";


const RemarkInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <InputField
            name="remarkForAccount"
            variant="outlined"
            label="Remark for Account"
            error={errors.remarkForAccount}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 50 }}
          />
        </div>

        <div>
          <InputField
            name="remarkForBill"
            variant="outlined"
            label="Remark for Bill"
            error={errors.remarkForBill}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 50 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RemarkInfo;
