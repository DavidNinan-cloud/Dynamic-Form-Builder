import React, { useEffect, useRef } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Style } from "../../../IPD/components/bedallowcation/Style";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import RadioField from "../../../Common Components/FormFields/RadioField";
import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";

import { getSearchOptionRegistrationList } from "../../../OPD/services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

import { useQuery, useMutation } from "@tanstack/react-query";
import isFirstDayOfMonth from "date-fns/isFirstDayOfMonth/index";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import SaveButton from "../../../Common Components/Buttons/SaveButton";

export default function OrderSheetModal(props) {
  // console.log("order sheet modal excute");
  const Doctorschema = yup.object().shape({
    subjective: yup.string(),
    temp: yup
      .number()
      .positive()
      .typeError("")
      .nullable()
      .required(),
    bp: yup
      .number()
      .typeError("")
      .nullable(),
    pulse: yup
      .number()
      .typeError("")
      .nullable(),
    rr: yup
      .number()
      .typeError("")
      .nullable(),
    sp02: yup
      .number()
      .typeError("")
      .nullable(),
    peripheralpulse: yup
      .number()
      .typeError("")
      .nullable(),
    cvp: yup
      .number()
      .typeError("")
      .nullable(),
    cvs: yup
      .number()
      .typeError("")
      .nullable(),
    rs: yup
      .number()
      .typeError("")
      .nullable(),
    pa: yup
      .number()
      .typeError("")
      .nullable(),
    pv: yup
      .number()
      .typeError("")
      .nullable(),
    cns: yup
      .number()
      .typeError("")
      .nullable(),
    localexamation: yup
      .string()
      .matches(/^[A-Za-z0-9\s]+$/, "Number and Alphabet"),
    other: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    assessment: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    plan: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    cprnotes: yup.string().matches(/^[A-Za-z0-9\s]+$/),

    avpu: yup.string(),
  });

  const NurseSchema = yup.object().shape({
    subjective: yup.string(),
    other: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    assessment: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    plan: yup.string().matches(/^[A-Za-z0-9\s]+$/),
    cprnotes: yup.string().matches(/^[A-Za-z0-9\s]+$/),
  });

  const defaultValues = {
    subjective: "",
    temp: "",
    bp: "",
    pulse: "",
    rr: "",
    cvp: "",
    mews: "",
    sp02: "",
    cvs: "",
    rs: "",
    pa: "",
    pv: "",
    cns: "",
    localexamation: "",
    other: "",
    assessment: "",
    cprnotes: "",
    plan: "",
    avpu: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm(allSchema);

  const avpuArray = [
    { id: 0, value: "Alert", label: "Alert" },
    { id: 1, value: "Response to Voice", label: "Response to Voice" },
    { id: 2, value: "Pain", label: "Pain" },
    { id: 3, value: "Unresponsive", label: "Unresponsive" },
  ];

  const [time, setTime] = React.useState(null);
  const [toDate, setDate] = React.useState(null);
  const getUserRole = localStorage.getItem("role");

  let finalMews;
  const [resetMews, setResetMews] = React.useState();
  const mewsDivElement = useRef();

  console.log(mewsDivElement);

  const [bp, temp, pulse, rr] = watch(["bp", "temp", "pulse", "rr"]);

  const avpuVal = watch("avpu");

  console.log("avpuVal ", avpuVal);
  console.log("type of avpuVal is ", typeof avpuVal);
  // console.log("getuer role", getUserRole);
  // yup Schema validation for form fields

  function SystolicBloodPressure(sbp) {
    if (sbp >= 200) {
      return 2;
    } else if (sbp >= 101 && sbp <= 199) {
      return 0;
    } else if (sbp >= 81 && sbp <= 100) {
      return 2;
    } else if (sbp >= 71 && sbp <= 80) {
      return 2;
    } else if (sbp <= 70) {
      return 3;
    }
  }
  function PulseCalculation(pulse) {
    if (pulse <= 40) {
      return 2;
    } else if (pulse >= 41 && pulse <= 50) {
      return 1;
    } else if (pulse >= 51 && pulse <= 100) {
      return 0;
    } else if (pulse >= 101 && pulse <= 110) {
      return 1;
    } else if (pulse >= 111 && pulse <= 129) {
      return 2;
    } else if (pulse >= 130) {
      return 3;
    }
  }
  function RespiratoryRate(bpm) {
    if (bpm <= 9) {
      return 2;
    } else if (bpm > 9 && bpm <= 14) {
      return 0;
    } else if (bpm >= 15 && bpm <= 20) {
      return 1;
    } else if (bpm >= 21 && bpm <= 29) {
      return 2;
    } else if (bpm >= 30) return 3;
  }
  function Temperature(celsius) {
    if (celsius <= 35) {
      return 2;
    } else if (celsius > 35 && celsius <= 38.4) {
      return 0;
    } else if (celsius >= 38.5) {
      return 2;
    }
  }

  const calculateMews = (bp, temp, pulse, rr) => {
    console.log("calculateMews has been called");

    console.log("2222222");

    console.log(typeof bp);
    console.log(typeof Number(bp));
    let mewsVal;

    if (
      Number(bp) > 0 &&
      Number(temp) > 0 &&
      Number(pulse) > 0 &&
      Number(rr) > 0
    ) {
      let bpValue = SystolicBloodPressure(bp);

      let pulseValue = PulseCalculation(pulse);

      let tempValue = Temperature(temp);

      let rrValue = RespiratoryRate(rr);

      mewsVal =
        Number(bpValue) +
        Number(pulseValue) +
        Number(tempValue) +
        Number(rrValue);
    }

    return mewsVal;
  };

  //useEffect to set the displayof mews score
  useEffect(() => {
    console.log("hiiiiiii11111");

    finalMews = calculateMews(bp, temp, pulse, rr);

    console.log("mewsVal is ", finalMews);

    console.log("avpu value in num form is ", Number(avpuVal));

    console.log("avpu value type is ", typeof avpuVal);

    console.log("final mews is ", finalMews);

    //erase the finalMews score if the fields are empty
    //erase only when the modal is open.
    //erasing when the modal is closed throws error
    if (
      (bp === "" ||
        temp === "" ||
        pulse === "" ||
        rr === "" ||
        avpuVal === "") &&
      props.open === true
    ) {
      mewsDivElement.current.innerHTML = "";
    }

    if (avpuVal !== "") {
      finalMews = finalMews + Number(avpuVal);
    }

    if (finalMews >= 5 && avpuVal !== "") {
      mewsDivElement.current.innerHTML = `

      <div class="flex  items-center">
      <p  class=" text-gray-700 px-2 font-bold">MEWS  </p>
         <div class="w-10 h-10 rounded-full border-2 border-red-500 flex justify-center  bg-red-500 items-center text-white">

        <p
          class=" text-white py-2"
        >
        ${finalMews}
        </p>

      </div>
      <p class="px-2 font-bold text-red-500">Please Call Doctor For Consultation</p>
      `;
    } else if (finalMews < 5 && avpuVal !== "") {
      mewsDivElement.current.innerHTML = `     <div class="flex  items-center">
      <p  class=" text-gray-700 px-2 font-bold">MEWS</p>
         <div class="w-10 h-10 rounded-full border-2 border-green-500 flex justify-center  bg-green-500 items-center">

        <p
          class=" text-white py-2"
        >
        ${finalMews}
        </p>

      </div>
      <p class="px-2 font-bold text-green-500">No Need to Call Doctor For Consultation</p>`;
    }
  }, [bp, temp, pulse, rr, avpuVal, props.open]);

  useEffect(() => {
    console.log(mewsDivElement.current);
  }, []);

  const onSubmitDataHandler = (data) => {
    console.log("data handler function excuted");
    console.log(data);
  };
  function allSchema() {
    if (getUserRole === "Doctor") {
      return {
        mode: "onChange",
        resolver: yupResolver(Doctorschema),
        defaultValues,
      };
    } else if (getUserRole === "Nurse") {
      return {
        mode: "onChange",
        resolver: yupResolver(NurseSchema),
        defaultValues,
      };
    }
  }
  return (
    <>
      {/* Model open on add button  start */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={() => {}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={Style} className="max-h-[92%] w-[80%] p-4   ">
            <CancelPresentationIconButton
              onClick={() => {
                props.handleClose();
                reset(defaultValues);
              }}
            />
            <div className="row gap-y-2">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-2 rounded  lg:mt-6 lg:m-2 ">
                <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                  Order Sheet
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-1 px-3"
                >
                  {getUserRole === "Doctor" ? (
                    <>
                      <fieldset className="border border-gray-300 rounded pl-3 pb-1">
                        <legend className="font-bold text-gray-700 px-2 ">
                          Patient Info
                        </legend>
                        <div className="lg:grid lg:grid-cols-5 md:grid-cols-1 md:gap-2 w-full gap-2 items-center">
                          <div className="col-span-2 -pt-2">
                            <label className="font-bold text-gray-700">
                              Patient Name
                            </label>
                            :Lorem Ipsum Lorem Lorem
                          </div>
                          <div className="">
                            <label className="font-bold text-gray-700">
                              Bed No
                            </label>{" "}
                            : 0001
                          </div>
                          <div className="md:py-2">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Date"
                                name="toDate"
                                value={toDate}
                                onChange={(newValue) => {
                                  setDate(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    className="bg-white"
                                    fullWidth
                                    size="small"
                                    {...params}
                                    sx={{
                                      svg: { color: "#0B83A5" },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                          <div className="md:py-2 pr-2">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <TimePicker
                                label="Time"
                                name="time"
                                value={time}
                                onChange={(newValue) => {
                                  setTime(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    className="bg-white"
                                    fullWidth
                                    size="small"
                                    {...params}
                                    sx={{
                                      svg: { color: "#0B83A5" },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>
                      </fieldset>

                      <div className="w-full pt-2">
                        <InputField
                          name="subjective"
                          variant="outlined"
                          label="Subjective "
                          error={errors.subjective}
                          control={control}
                        />
                      </div>
                      <fieldset className="border border-gray-300 text-left  rounded-md  w-full pl-3 p-2">
                        <legend className="font-bold text-gray-700 px-2">
                          Objective
                        </legend>

                        <legend className="font-bold text-gray-700 py-2 ">
                          Vitals :
                        </legend>
                        <div className="row">
                          <div className="lg:grid lg:grid-cols-2 gap-2 divide-x divide-slate-500">
                            <div className="lg:grid lg:grid-cols-1  ">
                              <div className="lg:grid lg:grid-cols-2 gap-2">
                                <InputField
                                  name="temp"
                                  type="number"
                                  className="appearance-none"
                                  variant="outlined"
                                  label="Temp"
                                  error={errors.temp}
                                  control={control}
                                />
                                <InputField
                                  name="bp"
                                  type="number"
                                  variant="outlined"
                                  label="BP "
                                  error={errors.bp}
                                  control={control}
                                />
                              </div>
                              <div className="lg:grid lg:grid-cols-2 gap-2 pt-2">
                                <InputField
                                  name="pulse"
                                  type="number"
                                  variant="outlined"
                                  label="Pulse "
                                  error={errors.pulse}
                                  control={control}
                                />
                                <InputField
                                  name="rr"
                                  type="number"
                                  variant="outlined"
                                  label="Respiration Rate (RR)"
                                  error={errors.rr}
                                  control={control}
                                />
                              </div>

                              <div className="lg:flex flex-nowrap py-2">
                                <RadioField
                                  label=""
                                  name="avpu"
                                  control={control}
                                  dataArray={avpuArray}
                                />
                              </div>

                              {/* Display the result of mews */}
                              <div className="lg:grid lg:grid-cols-1 gap-2 py-2">
                                <div id="mews" ref={mewsDivElement}></div>
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-1  pl-2 ">
                              <InputField
                                name="sp02"
                                type="number"
                                variant="outlined"
                                label="SP02 "
                                error={errors.sp02}
                                control={control}
                              />

                              <InputField
                                name="peripheralpulse"
                                type="number"
                                variant="outlined"
                                label="Peripheral Pulse "
                                error={errors.peripheralpulse}
                                control={control}
                              />

                              <InputField
                                name="cvp"
                                variant="outlined"
                                type="number"
                                label="CVP "
                                error={errors.cvp}
                                control={control}
                              />
                              <div className="lg:invisible ">
                                <InputField
                                  name="cvp"
                                  variant="outlined"
                                  label="CVP "
                                  error={errors.cvp}
                                  control={control}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <legend className="font-bold text-gray-700 py-2">
                          Systemic Examination :
                        </legend>
                        <div className="grid grid-cols-1 gap-y-1 gap-x-2">
                          <div className="grid lg:grid-cols-4 gap-2">
                            <InputField
                              name="cvs"
                              variant="outlined"
                              label="CVS"
                              type="number"
                              error={errors.cvs}
                              control={control}
                            />
                            <InputField
                              name="rs"
                              variant="outlined"
                              label="RS"
                              type="number"
                              error={errors.rs}
                              control={control}
                            />
                            <InputField
                              name="cns"
                              variant="outlined"
                              label="CNS "
                              type="number"
                              error={errors.cns}
                              control={control}
                            />
                            <InputField
                              name="pa"
                              variant="outlined"
                              label="P/A "
                              type="number"
                              error={errors.pa}
                              control={control}
                            />
                          </div>
                          {/* <div className="lg:grid lg:grid-cols-3 gap-2 "></div> */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="">
                              <InputField
                                name="pv"
                                type="number"
                                variant="outlined"
                                label="P/V "
                                error={errors.pv}
                                control={control}
                              />
                            </div>
                            <div>
                              <InputField
                                className="w-full col-span-2"
                                name="localexamation"
                                variant="outlined"
                                label="getIte Examination "
                                error={errors.localexamation}
                                control={control}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 w-full py-1">
                          <InputField
                            name="other"
                            variant="outlined"
                            label="Other"
                            error={errors.other}
                            control={control}
                          />
                        </div>
                      </fieldset>
                      <div className="lg:grid lg:grid-cols-1  md:grid-cols-1 gap-2 py-1">
                        <div className="w-full ">
                          <InputField
                            name="assessment"
                            variant="outlined"
                            label="Assessment"
                            error={errors.assessment}
                            control={control}
                          />
                        </div>
                        <div className="w-full ">
                          <InputField
                            name="plan"
                            variant="outlined"
                            label="Plan"
                            error={errors.plan}
                            control={control}
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="cprnotes"
                            variant="outlined"
                            label="CPR Notes
                        "
                            error={errors.cprnotes}
                            control={control}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <fieldset className="border border-gray-300 rounded pl-3 pb-1">
                        <legend className="font-bold text-gray-700 px-2 ">
                          Patient Info
                        </legend>
                        <div className="lg:grid lg:grid-cols-5 md:grid-cols-1 md:gap-2 w-full gap-2 items-center">
                          <div className="col-span-2 -pt-2">
                            <label className="font-bold text-gray-700">
                              Patient Name
                            </label>
                            :Lorem Ipsum Lorem Lorem
                          </div>
                          <div className="">
                            <label className="font-bold text-gray-700">
                              Bed No
                            </label>{" "}
                            : 0001
                          </div>
                          <div className="md:py-2">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Date"
                                name="toDate"
                                // value={toDate}
                                // onChange={(newValue) => {
                                //   setToDate(newValue);
                                // }}
                                renderInput={(params) => (
                                  <TextField
                                    className="bg-white"
                                    fullWidth
                                    size="small"
                                    {...params}
                                    sx={{
                                      svg: { color: "#0B83A5" },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                          <div className="md:py-2 pr-2">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <TimePicker
                                label=" Time"
                                name="time"
                                // value={toTime}
                                // onChange={(newValue) => {
                                //   setToTime(newValue);
                                // }}
                                renderInput={(params) => (
                                  <TextField
                                    className="bg-white"
                                    fullWidth
                                    size="small"
                                    {...params}
                                    sx={{
                                      svg: { color: "#0B83A5" },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>
                      </fieldset>

                      <div className="w-full py-1">
                        <InputField
                          name="subjective"
                          variant="outlined"
                          label="Subjective "
                          error={errors.subjective}
                          control={control}
                        />
                      </div>
                      <div className="lg:grid lg:grid-cols-1  md:grid-cols-1 gap-2">
                        <div className="w-full">
                          <InputField
                            name="assessment"
                            variant="outlined"
                            label="Assessment"
                            error={errors.assessment}
                            control={control}
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="plan"
                            variant="outlined"
                            label="Plan"
                            error={errors.plan}
                            control={control}
                          />
                        </div>
                        <div className="w-full ">
                          <InputField
                            name="cprnotes"
                            variant="outlined"
                            label="CPR Notes
                        "
                            error={errors.cprnotes}
                            control={control}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex gap-2 justify-end">
                    <ResetButton
                      onClick={() => {
                        reset(defaultValues);
                      }}
                    />

                    <SaveButton />
                  </div>
                </form>
              </fieldset>
            </div>
          </Box>
        </Modal>
        {/* model and table name button end */}
      </div>
    </>
  );
}
