import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import InputField from "../../../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../../../Common Components/FormFields/searchDropdown";

const DoctorInfo = (props) => {
  const { errorDoctorDetails, setErrorDoctorDetails } = props;
  const [doctorName, setDoctorName] = useState(null);

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctorDetails",
  });

  let doctorDetailsData = watch("doctorDetails");

  useEffect(() => {
    console.log("doctorDetailsData", doctorDetailsData);
  }, [doctorDetailsData]);

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div>
      <p className="font-bold tracking-wide text-sm font-Poppins my-2">
        Doctor Details
      </p>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((item, index) => (
          <div className="flex w-full" key={item.id}>
            {/* <div> */}
            {/* <InputField
              name={`doctorDetails[${index}].internalReferenceDoctor`}
              variant="outlined"
              label="Internal Reference Doctor"
              {...register(`doctorDetails[${index}].internalReferenceDoctor`)}
              // error={errors.doctorDetails?.[index]?.internalReferenceDoctor}
              control={control}
              inputProps={{ maxLength: 100 }}
              inputRef={{
                ...register(`doctorDetails[${index}].internalReferenceDoctor`, {
                  onChange: (e) => {
                    console.log("Change", e.target.value);
                    setDoctorName(e.target.value);
                  },
                }),
              }}
            /> */}
            <SearchDropdown
              control={control}
              error={errors.doctorDetails?.[index]?.internalReferenceDoctor}
              searchIcon={false}
              name={`doctorDetails[${index}].internalReferenceDoctor`}
              label="Internal Reference Doctor"
              // dataArray={internalDoctors}
              isSearchable={true}
              placeholder="Internal Reference Doctor"
              isClearable={false}
              handleInputChange={handleChange}
              inputRef={{
                ...register(`doctorDetails[${index}].internalReferenceDoctor`, {
                  onChange: (e) => {
                    console.log("Doctor", e.target);
                    if (e.target.value !== null) {
                      setDoctorName(e.target.value.value);
                    } else {
                      setDoctorName(null);
                    }
                  },
                }),
              }}
            />

            {/* <p className={errorDoctorDetails}>Please Add Proper Details</p> */}
            {/* </div> */}
            <div className="flex mx-2">
              {fields.length !== 1 && (
                <CloseRoundedIcon
                  className="mt-2 bg-red-600 rounded-full"
                  onClick={() => remove(index)}
                />
              )}

              {fields.length - 1 === index && (
                <AddOutlinedIcon
                  className="mt-2 mx-1 cursor-pointer text-sky-600 border border-sky-600 rounded-full"
                  onClick={(index) => {
                    if (doctorName !== null) {
                      append({ internalReferenceDoctor: "" });
                      setDoctorName(null);
                      setErrorDoctorDetails("invisible");
                    } else {
                      setErrorDoctorDetails(
                        "visible mx-auto text-red-500 text-xs mt-3"
                      );
                    }
                  }}
                />
              )}
              
            </div>
          </div>
        ))}
      </div>
      <p className={errorDoctorDetails}>Please Add Reference Doctor</p>
    </div>
  );
};

export default DoctorInfo;
