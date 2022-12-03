import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Controller, useFormContext } from "react-hook-form";
import useFileUpload from "../common component/hooks/useFileUpload";
import InputField from "../../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { getIdentificationDoc } from "../../../../../OPD/services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

const RepresentativeInfo = (props) => {
  const {
    representativeDoc,
    setRepresentativeDoc,
    representativeDocFile,
    setRepresentativeDocFile,
    setRepresentativeFileName,
  } = props;

  const [
    representativeCitizenIdProof,
    setRepresentativeCitizenIdProof,
  ] = useState();

  const fileData = useFileUpload();

  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext();

  const representativeidentificationDocName = watch(
    "representativeCitizenIdProof"
  );

  //API for Identification Doc
  useEffect(() => {
    getIdentificationDoc()
      .then((response) => {
        setRepresentativeCitizenIdProof(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //Reset Identification No. on Change of Doc Type
  const handleResetOnChange = (changeField) => {
    console.log(changeField);

    setValue("representativeIdentificationDocumentNumber", null);
  };

  const handleIndentificationFile = (target) => {
    const result = fileData.onProfilePicChange(target);
  };

  useEffect(() => {
    if (representativeidentificationDocName) {
      if (representativeidentificationDocName.label) {
        setRepresentativeDoc(
          representativeidentificationDocName.label + " No."
        );
      } else {
        setRepresentativeDoc("Identification Document No.");
      }
    } else {
      setRepresentativeDoc("Identification Document No.");
    }
    setRepresentativeDocFile(fileData.path);
    setRepresentativeFileName(fileData.fileName);
  }, [representativeidentificationDocName, fileData]);

  return (
    <div>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {/* ///Representative Name /// */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="nameOfRepresentative"
            variant="outlined"
            label="Name of Representative"
            error={errors.nameOfRepresentative}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Representative Mobile No.// */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="mobileNumberOfRepresentative"
            variant="outlined"
            label="Mobile No. of Representative"
            error={errors.mobileNumberOfRepresentative}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 14 }}
          />
        </div>

        {/* //Relationship with Patient// */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="relationshipWithPatient"
            variant="outlined"
            label="Relationship with Patient"
            error={errors.relationshipWithPatient}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 50 }}
          />
        </div>

        {/* //Address// */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="address"
            variant="outlined"
            label="Address"
            error={errors.address}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 50 }}
          />
        </div>

        {/* //Indentification Doc// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.repCitizenIdProof}
            name="repCitizenIdProof"
            label="Identification Document"
            dataArray={representativeCitizenIdProof}
            isSearchable={false}
            isClearable={false}
            placeholder="Identification Document"
            inputRef={{
              ...register("repCitizenIdProof", {
                onChange: (e) => {
                  handleResetOnChange(e.target.name);
                },
              }),
            }}
          />
        </div>

        {/* //Indentification No. */}
        <div className="col-span-2 lg:col-span-1">
          <InputField
            name="repIdentificationDocumentNumber"
            variant="outlined"
            label={representativeDoc}
            error={errors.repIdentificationDocumentNumber}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Indentification File// */}
        <div className="col-span-2 lg:col-span-1">
          <div className="w-full border border-slate-400  py-1.5 rounded-md">
            <label
              htmlFor="representativeDoc"
              className="cursor-pointer text-slate-600"
            >
              <div className="w-full">
                <FileUploadOutlinedIcon />
                Upload Document
              </div>
              <Controller
                control={control}
                defaultValue={representativeDocFile}
                render={({ field }) => (
                  <TextField
                    id="representativeDoc"
                    variant="outlined"
                    fullWidth
                    type="file"
                    name="representativeIdentificationFile"
                    size="small"
                    {...field}
                    onChange={(e) => {
                      console.log("Reptresentative", e);
                      field.onChange(e);
                      handleIndentificationFile(e);
                    }}
                    error={Boolean(errors.representativeIdentificationFile)}
                    helperText={
                      errors.representativeIdentificationFile?.message
                    }
                    // onChange={handleIndentificationFile}
                    sx={{ display: "none" }}
                  />
                )}
                name="representativeIdentificationFile"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentativeInfo;
