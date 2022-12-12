import React from "react";
import { useFormContext } from "react-hook-form";
import { AddButton } from "../../../../Common Components/Buttons/CommonButtons";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import EquipmentsTable from "../common/EquipmentsTable";

const EquipmentsList = {
    result: [
      {
        "Equipments":"Anesthesiologists",
      },
      {
        "Equipments":"Colon and Rectal Surgeons",
      },
      {
        "Equipments":"Critical Care Medicine Specialists",
      },
      {
        "Equipments":"Emergency Medicine Specialists",
      },
    ],
    statusCode: 200,
    actions: ["Delete"],
    count: 3,
  };
const Equipments = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();
  return (
    <>
      <div className="grid w-full xl:flex xl:justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-full xl:w-96">
            <DropdownField
              control={control}
              name="equipments"
              placeholder="Equipments"
            />
          </div>
          <div className="w-40">
            <InputField name="qty" label="Qty" />
          </div>
          <div>
            <AddButton />
          </div>
        </div>
        <div className="flex items-center my-2 xl:my-0">
          <span className="font-semibold">Total Amount : </span>
          <span className="font-semibold">Rs.20120</span>
        </div>
      </div>
      <div>
        <EquipmentsTable data={EquipmentsList}/>
      </div>
    </>
  );
};

export default Equipments;
