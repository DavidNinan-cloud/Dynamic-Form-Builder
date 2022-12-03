import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../Common Components/FormFields/InputField";

const AddNewCountry = (props) => {
  const {
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: formState1,
    control: control1,
    register,
  } = useForm({
    defaultValues: {
      addCountry: props.getCountryName,
      addState: props.getStateName,
      addCity: props.getCityName,
    },
  });

  function onSubmitCountry(data) {
    console.log("Data", data);
    props.setOpenCountry(false);
  }

  return (
    <div>
      <p className="text-lg font-semibold">Add Address Details</p>
      <form onSubmit={handleSubmit1(onSubmitCountry)}>
        {props.getCountryName === null ? (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <InputField
                name="addCountry"
                variant="outlined"
                label="Add Your Country"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
            <div>
              <InputField
                name="addState"
                variant="outlined"
                label="Add Your State"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
            <div>
              <InputField
                name="addCity"
                variant="outlined"
                label="Add Your City"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {props.getStateName === null && props.getCountryName !== null ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <InputField
                name="addState"
                variant="outlined"
                label="Add Your State"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
            <div>
              <InputField
                name="addCity"
                variant="outlined"
                label="Add Your City"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {props.getCityName === null &&
        props.getCountryName !== null &&
        props.getStateName !== null ? (
          <div className="grid grid-cols-1 gap-2">
            <div>
              <InputField
                name="addCity"
                variant="outlined"
                label="Add Your City"
                inputProps={{ maxLength: 100 }}
                control={control1}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="w-full flex justify-end">
          <button className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCountry;
