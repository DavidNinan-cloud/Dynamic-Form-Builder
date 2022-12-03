import { Card, CardContent, Modal, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const IpdVitals = (props) => {
  const validationSchema = yup.object().shape({
    temperature: yup
      .number()
      .typeError("Invalid")
      .max(125, "Invalid")
      .notRequired(),
    pulseRate: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired(),
    bloodPressureSystolic: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired(),
    bloodPressureDiastolic: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired(),
    spO2: yup
      .number()
      .typeError("Invalid")
      .max(200, "Invalid")
      .notRequired(),
    weight: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired(),
    height: yup
      .number()
      .typeError("Invalid")
      .max(300, "Invalid")
      .notRequired(),
    // bmi: yup
    //   .number()
    //   .typeError("Invalid")
    //   .max(50, "Invalid")
    //   .notRequired(),
    respiration: yup
      .number()
      .typeError("Invalid")
      .max(100, "Invalid")
      .notRequired(),
    bloodSugar: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired(),
  });

  let result = props.vitals;
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [vitalsData, setVitalsData] = React.useState();

  const {
    handleSubmit,
    reset,
    formState,
    control,
    register,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // defaultValues: {
    //   temperature: null,
    //   pulseRate: null,
    //   bloodPressureSystolic: null,
    //   bloodPressureDiastolic: null,
    //   spO2: null,
    //   weight: null,
    //   height: null,
    //   respiration: null,
    //   bloodSugar: null,
    // },
  });
  const { errors } = formState;

  const handleInputChange = (event) => {
    const { name } = event.target;
    props.setVitalsValue({
      ...props.vitalsValue,
      [name]:
        parseFloat(event.target.value) === ""
          ? ""
          : parseFloat(event.target.value),
    });
  };

  let weight = watch("weight");
  let height = watch("height");
  let bmi = watch("bmi");

  let BMIValue = 0;
  useEffect(() => {
    let weightValue = 0;
    let heightValue = 0;
    let heightInMeters = 0;
    if (props.vitalsValue !== null) {
      if (props.vitalsValue.weight && props.vitalsValue.height) {
        weightValue = parseInt(props.vitalsValue.weight);
        heightValue = parseInt(props.vitalsValue.height);
        heightInMeters = heightValue / 100;
        BMIValue = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
        props.vitalsValue.bmi = parseFloat(BMIValue);
        setValue("bmi", BMIValue);
      }
    }
  }, [props.vitalsValue]);

  return (
    <>
      <div className="ml-2  h-auto ">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "1px",
            // borderRadius: "10px",
            overflow: "visible",
            width: "99%",
          }}
          className=" mx-auto h-full  overflow-y-visible "
        >
          <CardContent className="">
            <div className="flex justify-between  bg-violet-50 py-2 ">
              <div className="text-sm font-semibold w-full pl-2">Vitals</div>
              {props.vitals.length > 0 ? (
                <button
                  className="text-blue-500 mr-1 flex justify-end"
                  onClick={() => {
                    setOpenView(true);
                  }}
                >
                  <Tooltip
                    title="View Vital Details"
                    placement="left-start"
                    arrow
                  >
                    <VisibilityRoundedIcon />
                  </Tooltip>
                </button>
              ) : null}
            </div>

            <div className="flex justify-between mb-2">
              <form onSubmit={handleSubmit()} className="w-full">
                <div className="grid grid-cols-6 lg:grid-cols-10 gap-2 w-full mt-2">
                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left ">Temp </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>

                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="temperature"
                      size="small"
                      label="°F"
                      control={control}
                      {...register("temperature")}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <p className="text-xs my-auto ml-1">°F</p> */}

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left">Pulse Rate </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>

                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="pulseRate"
                      size="small"
                      label="bpm"
                      control={control}
                      {...register("pulseRate")}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <p className="text-xs my-auto ml-1">bpm</p> */}

                  <div className=" flex justify-between">
                    <p className="text-xs my-auto text-left">BP(Systolic)</p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="bloodPressureSystolic"
                      size="small"
                      label="mmHg"
                      control={control}
                      {...register("bloodPressureSystolic")}
                      onChange={handleInputChange}
                    />
                    {/* <p className="text-xs my-auto ml-1">mm</p> */}
                  </div>

                  <div className=" flex justify-between">
                    <p className="text-xs my-auto text-left">BP(Diastolic)</p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="bloodPressureDiastolic"
                      size="small"
                      label="mmHg"
                      control={control}
                      {...register("bloodPressureDiastolic")}
                      onChange={handleInputChange}
                    />
                    {/* <p className="text-xs my-auto ml-1">mm</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left">SpO2 </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <div className="">
                      <TextField
                        type="number"
                        name="spO2"
                        size="small"
                        label="%"
                        control={control}
                        {...register("spO2")}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* <p className="text-xs my-auto ml-1">%</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left ">Weight </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <div className="">
                      <TextField
                        type="number"
                        name="weight"
                        size="small"
                        label="kg"
                        control={control}
                        {...register("weight")}
                        // value={sliderValue.Weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* <p className="text-xs my-auto ml-1">kg</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left ">Height </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="height"
                      size="small"
                      label="cm"
                      control={control}
                      {...register("height")}
                      // value={sliderValue.height}
                      onChange={handleInputChange}
                    />
                    {/* <p className="text-xs my-auto ml-1">cm</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left ">BMI </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    {props.vitalsValue !== null ? (
                      <TextField
                        type="number"
                        name="bmi"
                        size="small"
                        label="kg/m2"
                        {...register("bmi")}
                        disabled={true}
                        value={props.vitalsValue.bmi}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <TextField
                        type="number"
                        name="bmi"
                        size="small"
                        label="kg/m2"
                        {...register("bmi")}
                        disabled={true}
                        value={0}
                        onChange={handleInputChange}
                      />
                    )}
                    {/* <p className="text-xs my-auto ml-1">kg/m2</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left">Respiration</p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="mr-4">
                    <TextField
                      type="number"
                      name="respiration"
                      size="small"
                      label="bpm"
                      control={control}
                      {...register("respiration")}
                      // value={sliderValue.Respiration}
                      onChange={handleInputChange}
                    />
                    {/* <p className="text-xs my-auto ml-1">Per</p> */}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-xs my-auto text-left">Blood Sugar </p>
                    <p className="text-xs my-auto mr-4">: </p>
                  </div>
                  <div className="flex mr-4">
                    <TextField
                      type="number"
                      name="bloodSugar"
                      size="small"
                      label="mg/dl"
                      control={control}
                      {...register("bloodSugar")}
                      // value={sliderValue.Blood_Sugar}
                      onChange={handleInputChange}
                    />
                    {/* <p className="text-xs my-auto mr-1">cm</p> */}
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* //View Vitals Modal// */}
      <Modal
        open={openView}
        onClose={() => {
          setOpenView(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            height: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "scroll",
          }}
        >
          <div className="flex justify-end">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                setOpenView(false);
              }}
            />
          </div>
          {/* <ViewVitals vitalsData={props.vitals} patientId={props.patientId} /> */}
        </Box>
      </Modal>
    </>
  );
};

export default IpdVitals;
