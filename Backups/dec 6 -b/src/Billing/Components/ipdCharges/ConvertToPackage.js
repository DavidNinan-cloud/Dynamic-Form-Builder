import React, { useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";

const ConvertToPackage = (props) => {
  const [packageNameList, setPackageNameList] = useState();

  const schema = yup.object().shape({
    packageName: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .notRequired("Please Select Package"),
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isCompany: false,
      isPackage: false,
      packageName: null,
    },
  });

  function onSubmit(data) {
    console.log("Data", data);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-base">Convert to Package</h1>
        <div className="-mt-2">
          <CancelPresentationIcon
            className="text-red-600  rounded cursor-pointer"
            onClick={() => {
              props.setOpenCovertToPackage(false);
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <CheckBoxField control={control} name="isCompany" label="Company" />
          <CheckBoxField control={control} name="isPackage" label="Package" />
        </div>
        <div className="w-full">
          <DropdownField
            control={control}
            error={errors.packageName}
            name="packageName"
            label="Package"
            dataArray={packageNameList}
            placeholder="Package"
          />
        </div>
        <div className="flex justify-end my-2">
          <SaveButton />
        </div>
      </form>
    </div>
  );
};

export default ConvertToPackage;
