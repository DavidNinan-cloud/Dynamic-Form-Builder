import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
// import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
// import { getRelationship } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

// const relationship = [
//   { value: "relationship1", label: "Relationship 1" },
//   { value: "relationship2", label: "Relationship 2" },
// ];

const RepresentativeInfo = () => {
  const [relationship, setRelationship] = useState();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Api to Get Relationship List
  // useEffect(() => {
  //   getRelationship()
  //     .then((response) => {
  //       console.log(response.data.result);
  //       setRelationship(response.data.result);
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {/* ///Representative Name /// */}
        <div>
          {/* <Controller
              control={control}
              name="referralType"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.referralType)}
                >
                  <InputLabel id="referralType">Referral Type</InputLabel>
                  <Select
                    labelId="referralType"
                    id="demo-simple-select"
                    label="Referral Type"
                    name="referralType"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"referralType1"}>Referral Type 1</MenuItem>
                    <MenuItem value={"referralType2"}>Referral Type 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.referralType && <p>{errors.referralType.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
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
        <InputField
          name="mobileNumberOfRepresentative"
          variant="outlined"
          label="Mobile No. of Representative"
          error={errors.mobileNumberOfRepresentative}
          control={control}
          disabled={false}
          inputProps={{ maxLength: 14 }}
        />

        <div>
          {/* <Controller
              control={control}
              name="referralDoctor"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.referralDoctor)}
                >
                  <InputLabel id="referralDoctor">Referral Doctor Name</InputLabel>
                  <Select
                    labelId="referralDoctor"
                    id="demo-simple-select"
                    label="Referral Doctor Name"
                    name="referralDoctor"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"referralDoctor1"}>
                      Referral Doctor Name 1
                    </MenuItem>
                    <MenuItem value={"referralDoctor2"}>
                      Referral Doctor Name 2
                    </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.referralDoctor && (
                      <p>{errors.referralDoctor.message}</p>
                    )}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
          {/* <DropdownField
            control={control}
            error={errors.relationshipWithPatient}
            name="relationshipWithPatient"
            label="Relationship with Patient"
            dataArray={relationship}
            isSearchable={false}
            placeholder="Relationship with Patient"
            isClearable={false}
          /> */}
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
      </div>
    </div>
  );
};

export default RepresentativeInfo;
