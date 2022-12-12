import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreateableSelect from "../../../Common Components/FormFields/CreateableSelect";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import {
  getReferralDoctor,
  getReferralType,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

// const referralType = [
//   { value: "referralType1", label: "Referral Type 1" },
//   { value: "referralType2", label: "Referral Type 2" },
// ];

// const referralDoctor = [
//   { value: "referralDoctor1", label: "Referral Doctor 1" },
//   { value: "referralDoctor2", label: "Referral Doctor 2" },
// ];

const ReferralDoctor = () => {
  const [referralType, setReferralType] = useState();
  const [referralDoctor, setReferralDoctor] = useState();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  //API For Referral Type List
  useEffect(() => {
    getReferralType()
      .then((response) => {
        setReferralType(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API For Referral Doctor List
  useEffect(() => {
    getReferralDoctor()
      .then((response) => {
        setReferralDoctor(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {/* ///Referral Type /// */}
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
          <DropdownField
            control={control}
            error={errors.referralType}
            name="referralType"
            label="Referral Type"
            dataArray={referralType}
            isSearchable={true}
            placeholder="Referral Type"
            isClearable={false}
          />
        </div>

        {/* //Referral Name// */}
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
          <CreateableSelect
            control={control}
            error={errors.referralDoctor}
            name="referralDoctor"
            label="Referral Doctor"
            dataArray={referralDoctor}
            placeholder="Referral Doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralDoctor;
