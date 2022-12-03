import React, { useEffect, useState } from "react";
import {useFormContext } from "react-hook-form";
import CreateableSelect from "../../../../../Common Components/FormFields/CreateableSelect";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { getReferralDoctor, getReferralType } from "../../../../services/admissiondetails/admissionDetailsService";


const ReferenceInfo = () => {


  const [referralType, setReferralType] = useState();
  const [referralDoctor, setReferralDoctor] = useState();

  const {
    control,
    register,
    watch,
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
        <div>
          <DropdownField
            control={control}
            error={errors.referralType}
            name="referralType"
            label="Referral Type"
            dataArray={referralType}
            isSearchable={false}
            placeholder="Referral Type"
            isClearable={false}
          />
        </div>

        <div>
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

export default ReferenceInfo;
