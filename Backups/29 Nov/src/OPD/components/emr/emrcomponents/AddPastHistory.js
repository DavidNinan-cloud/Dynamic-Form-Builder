import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";

const AddPastHistory = (props) => {
  console.log("Past History Props", props);
  const [dmVisibility, setDmVisibility] = useState("none");
  const [htnVisibility, setHtnVisibility] = useState("none");
  const [heartDiseaseVisibility, setHeartDiseaseVisibility] = useState("none");
  const [TbVisibility, setTbVisibility] = useState("none");
  const [COPDVisibility, setCOPDVisibility] = useState("none");
  const [ASTHMAVisibility, setASTHMAVisibility] = useState("none");
  const [LIVERVisibility, setLIVERVisibility] = useState("none");
  const [OtherVisibility, setOtherVisibility] = useState("none");

  const { handleSubmit, reset, formState, control, register, watch } = useForm({
    defaultValues: {
      id:null,
      dmFlag: false,
      dmDescription: null,
      htnFlag: false,
      htnDescription: null,
      heartDiseaseFlag: false,
      heartDiseaseDescription: null,
      tbFlag: false,
      tbDescription: null,
      copdFlag: false,
      copdDescription: null,
      asthmaFlag: false,
      asthmaDescription: null,
      liverFlag: false,
      liverDescription: null,
      otherFlag: false,
      otherDescription: null,
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (props.patientPastHistory !== null) {
      reset(props.patientPastHistory);
    }
  }, [props]);

  const getDM = watch("dmFlag");
  const getHTN = watch("htnFlag");
  const getHeartDisease = watch("heartDiseaseFlag");
  const getTB = watch("tbFlag");
  const getCOPD = watch("copdFlag");
  const getASTHMA = watch("asthmaFlag");
  const getLIVER = watch("liverFlag");
  const getOther = watch("otherFlag");

  useEffect(() => {
    if (getDM === true) {
      setDmVisibility("block");
    } else {
      setDmVisibility("none");
    }
    if (getHTN === true) {
      setHtnVisibility("block");
    } else {
      setHtnVisibility("none");
    }
    if (getHeartDisease === true) {
      setHeartDiseaseVisibility("block");
    } else {
      setHeartDiseaseVisibility("none");
    }
    if (getTB === true) {
      setTbVisibility("block");
    } else {
      setTbVisibility("none");
    }
    if (getCOPD === true) {
      setCOPDVisibility("block");
    } else {
      setCOPDVisibility("none");
    }
    if (getASTHMA === true) {
      setASTHMAVisibility("block");
    } else {
      setASTHMAVisibility("none");
    }
    if (getLIVER === true) {
      setLIVERVisibility("block");
    } else {
      setLIVERVisibility("none");
    }
    if (getOther === true) {
      setOtherVisibility("block");
    } else {
      setOtherVisibility("none");
    }
  });

  function onSubmit(data) {
    console.log("Data History", data);
    props.setPatientPastHistory(data);
  }

  return (
    <div>
      <div className="bg-teal-50 py-2 -mt-2">
        <div className="text-sm font-semibold  pl-2">Past History</div>
      </div>
      <hr className="border mb-1 divide-x-8 border-slate-300" />
      <form onChange={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* //DM// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="dmFlag"
              label="DM"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: dmVisibility }}>
              <InputField
                type="string"
                name="dmDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //HTN// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="htnFlag"
              label="HTN"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: htnVisibility }}>
              <InputField
                type="string"
                name="htnDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>
          {/* //Heart Disease// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="heartDiseaseFlag"
              label="Heart Disease"
              style={{
                fontSize: "0.75rem",
              }}
            />
            <div
              className="w-[9.5rem]"
              style={{ display: heartDiseaseVisibility }}
            >
              <InputField
                type="string"
                name="heartDiseaseDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //TB// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="tbFlag"
              label="TB"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: TbVisibility }}>
              <InputField
                type="string"
                name="tbDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //COPD// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="copdFlag"
              label="COPD"
              style={{ fontSize: "0.75rem", marginRight: "0px" }}
            />
            <div className="w-[9.5rem]" style={{ display: COPDVisibility }}>
              <InputField
                type="string"
                name="copdDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //ASTHMA// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="asthmaFlag"
              label="ASTHMA"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: ASTHMAVisibility }}>
              <InputField
                type="string"
                name="asthmaDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //LIVER// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="liverFlag"
              label="LIVER"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: LIVERVisibility }}>
              <InputField
                type="string"
                name="liverDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>

          {/* //Other// */}
          <div className="flex justify-between">
            <CheckBoxField
              control={control}
              name="otherFlag"
              label="Other"
              style={{ fontSize: "0.75rem" }}
            />
            <div className="w-[9.5rem]" style={{ display: OtherVisibility }}>
              <InputField
                type="string"
                name="otherDescription"
                label="Description"
                control={control}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPastHistory;
