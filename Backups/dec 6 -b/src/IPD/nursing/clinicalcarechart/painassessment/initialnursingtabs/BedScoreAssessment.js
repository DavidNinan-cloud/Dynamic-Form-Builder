import React, { useEffect } from "react";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { useForm } from "react-hook-form";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import BedScoreTable from "./table/BedScoreTable";

function BedScoreAssessment() {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    mode: "onChange",
    // defaultValues,
  });

  const [total, setTotal] = React.useState(0);
  setValue("total", total);

  let currentStyle = null;

  if (total > 100) {
    setValue("highRisk", true);
    setValue("lowRisk", false);
    setValue("noRisk", false);
    setValue("highRisk", (currentStyle = { color: "red" }));
  } else if (total >= 61 && total <= 100) {
    setValue("lowRisk", true);
    setValue("highRisk", false);
    setValue("noRisk", false);
    setValue("lowRisk", (currentStyle = { color: "yellow" }));
  } else if (total === 0 && total <= 60) {
    setValue("no", true);
    setValue("highRisk", false);
    setValue("lowRisk", false);
    setValue("noRisk", (currentStyle = { color: "green" }));
  }

  return (
    <div className="mx-2">
      <BedScoreTable total={total} setTotal={setTotal} />

      <div className="grid grid-cols-4 items-center gap-2 text-sm">
        <CheckBoxField
          control={control}
          name="noRisk"
          label="0 - 60 No Risk"
          value="No Risk"
          style={{ color: "green", fontWeight: "bold", fontSize: "13px" }}
          checkBoxStyle={{ color: "green" }}
        />

        <div className="whitespace-nowrap">
          <CheckBoxField
            control={control}
            name="lowRisk"
            label="61 - 100 Low Risk"
            value="Low Risk"
            style={{ color: "orange", fontWeight: "bold", fontSize: "13px" }}
            checkBoxStyle={{ color: "orange" }}
          />
        </div>

        <CheckBoxField
          control={control}
          name="highRisk"
          label="> 100 High Risk"
          value="High Risk"
          style={{ color: "red", fontWeight: "bold", fontSize: "13px" }}
          checkBoxStyle={{ color: "red" }}
        />

        <div className="flex items-center justify-end gap-2">
          <h6 className="font-bold">Total</h6>
          <div className="w-1/2 text-lg font-bold">
            {/* <InputField
                name="total"
                variant="outlined"
                label=""
                control={control}
              /> */}

            {total <= 60 ? (
              <label className="text-green-700 font-bold border border-green-700 py-1 rounded-lg md:px-8 ">
                {total}
              </label>
            ) : (
              ""
            )}
            {total >= 61 && total <= 100 ? (
              <label className="text-yellow-500 font-bold border border-yellow-500 py-1 rounded-lg md:px-8 ">
                {total}
              </label>
            ) : (
              ""
            )}
            {total > 100 ? (
              <label className="text-red-600 font-bold border border-red-600 py-1 rounded-lg md:px-8 ">
                {total}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="border border-b border-customBlue mx-2"> </div>

      {/* <div className="flex gap-2 justify-end mt-2 mx-2">
        <ResetButton onClick={() => reset(defaultValues)} />
        <SaveButton type="submit" />
      </div> */}
    </div>
  );
}

export default BedScoreAssessment;
