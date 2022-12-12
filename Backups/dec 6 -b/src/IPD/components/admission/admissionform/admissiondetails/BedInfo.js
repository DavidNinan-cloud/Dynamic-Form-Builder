import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../../Common Components/FormFields/InputField";




const BedInfo = () => {
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
      <div className="grid grid-cols-4 gap-3">
        <div>
          <InputField
            name="bedCategory"
            variant="outlined"
            label="Bed Category"
            error={errors.bedCategory}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        <div>
          <DropdownField
            control={control}
            error={errors.charges}
            name="charges"
            label="Charges As Per Bed Category"
            //   dataArray={patientSource}
            isSearchable={false}
            placeholder="Charges As Per Bed Category*"
            isClearable={false}
          />
        </div>

        <div>
          <InputField
            name="ward"
            variant="outlined"
            label="Ward"
            error={errors.ward}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        <div>
          <InputField
            name="floor"
            variant="outlined"
            label="Floor"
            error={errors.floor}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        <div>
          <InputField
            name="bedNo"
            variant="outlined"
            label="Bed No."
            error={errors.bedNo}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        <div className="w-6/12">
          <button className="border-2 border-orange-500 py-[0.68rem] px-4 rounded-md">
            <p className="text-orange-500 text-xs">SELECT BED</p>
          </button>
        </div>
        <div className="col-span-3 flex justify-between w-10/12 mt-3">
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
          <CheckBoxField
            control={control}
            name="cashPayment"
            label="Cash Payment"
          />
          <CheckBoxField
            control={control}
            name="vaccineApplicable"
            label="Vaccine Applicable"
          />
        </div>
      </div>
    </div>
  );
};

export default BedInfo;
