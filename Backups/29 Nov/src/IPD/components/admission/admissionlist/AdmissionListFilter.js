import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUnitList } from "../../../services/admissiondetails/admissionDetailsService";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

const AdmissionListFilter = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <h6 className="text-lg font-bold">Admission Status</h6>

      <form>
        <div className="grid grid-cols-2 gap-2">
          {/* //Check Box List// */}
          <div className="col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
              <div>
                <CheckBoxField
                  control={control}
                  name="currentAdmissionList"
                  label="Current Admission List"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="allPatient"
                  label="All Patient"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="cancelledAdmissions"
                  label="Cancelled Admissions"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="pendingPassportDetails"
                  label="Pending Passport Details"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="otherThanIndian"
                  label="Other Than Indian"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="pendingDocuments"
                  label="Pending Documents"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <CheckBoxField
                  control={control}
                  name="tentativeDischarge"
                  label="Tentative Discharge"
                  style={{ fontSize: "12px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdmissionListFilter;
