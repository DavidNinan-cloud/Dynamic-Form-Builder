import React, { useEffect, useState } from "react";
import CommonTable from "../../common/CommonTable";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../../Common Components/FormFields/InputField";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import OnClickAddButton from "../../../../Common Components/Buttons/OnClickAddButton";
const data = {
  message: "Apache Score list found ",
  result: [
    {
      Id: 30,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 29,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 28,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 16,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 1,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 3,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 4,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 12,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 22,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 44,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 42,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
    {
      Id: 56,
      DateAndTime: "01/02/2022,11:30Am",
      Temparture: 98.5,
      Pulse: 123,
      Respiration: 23,
      "Blood Pressure": "123/45",
      MEWS: 1,
      AVPU: 1,
      TakenBy: "lorem ipsum dollor",
    },
  ],
  statusCode: 200,

  count: 5,
};
function ApacheScore() {
  //Yup schema
  const schema = yup.object().shape({
    pulse: yup.string().required("required"),

    respiration: yup.string().required("required"),

    meanArterialPressure: yup.string().required("required"),

    temperatureRectal: yup.string().required("required"),

    arterialPH: yup.string().required("required"),

    oxygenation: yup.string().required("required"),

    serumHCO3: yup.string().required("required"),

    serumSodium: yup.string().required("required"),

    hematocrit: yup.string().required("required"),

    serumCreatinine: yup.string().required("required"),

    serumPotassium: yup.string().required("required"),

    wbc: yup.string().required("required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    pulse: "",
    respiration: "",
    meanArterialPressure: "",
    temperatureRectal: "",
    arterialPH: "",
    oxygenation: "",
    serumHCO3: "",
    serumSodium: "",
    hematocrit: "",
    serumCreatinine: "",
    serumPotassium: "",
    wbc: "",
    chronicHealthOne: "",
    chronicHealthTwo: "",
    apacheScore: "",
    deathRate: "",
    id: "",
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //array for the eyeOpeningResponse radio fields
  const eyeOpeningResponseArray = [
    { id: 1, value: "None (1)", label: "None (1)" },
    { id: 2, value: "Pain (2)", label: "Pain (2)" },
    { id: 3, value: "Verbal Stimuli (3)", label: "Verbal Stimuli (3)" },
    { id: 4, value: "Spontaneous (4)", label: "Spontaneous (4)" },
  ];

  //array for the verbalResponse radio fields
  const verbalResponseArray = [
    { id: 1, value: "None (1)", label: "None (1)" },
    { id: 2, value: "Incoherent (2)", label: "Incoherent (2)" },
    {
      id: 3,
      value: "Inappropriate Words (3)",
      label: "Inappropriate Words (3)",
    },
    {
      id: 4,
      value: "Confused (4)",
      label: "Confused (4)",
    },
    {
      id: 5,
      value: "Oriented (5)",
      label: "Oriented (5)",
    },
  ];

  //array for the motorResponse radio fields
  let motorResponseArray = [
    { id: 1, value: "None (1)", label: "None (1)" },
    {
      id: 2,
      value: "Extension To Pain or Decerebrate (2)",
      label: "Extension To Pain or Decerebrate (2)",
    },
    {
      id: 3,
      value: "Flexion To Pain Or Decorticate (3)",
      label: "Flexion To Pain Or Decorticate (3))",
    },
    {
      id: 4,
      value: "Withdraws From Pain (4)",
      label: "Withdraws From Pain (4)",
    },
    {
      id: 5,
      value: "Localizes Pain (5)",
      label: "Localizes Pain (5)",
    },
    {
      id: 6,
      value: "Obeys Commands (6)",
      label: "Obeys Commands (6)",
    },
  ];

  //array for the chronicHealth radio fields
  let chronicHealthArray = [
    {
      id: 0,
      value: "None (0)",
      label: "None (0)",
    },
    {
      id: 5,
      value: "For Elective Postoperative Patients (5)",
      label: "For Elective Postoperative Patients (5)",
    },
    {
      id: "5.0",
      value: "For Non Operation / Emergency (5)",
      label: "For Non Operation / Emergency (5)",
    },
  ];

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    console.log(data);
    //to set the form fields as blank
    reset(defaultValues);
  };

  //Calculate temparatureRectal
  function calculateTemperatureRectal() {
    let temperatureRectalVal;

    //calculate the temperatureRectal
    if (Number(getValues("temperatureRectal")) >= 41) {
      //calculating the value of temperatureRectal
      temperatureRectalVal = -4;
    } else if (
      Number(getValues("temperatureRectal")) >= 39 &&
      Number(getValues("temperatureRectal")) <= 40.9
    ) {
      temperatureRectalVal = -3;
    } else if (
      Number(getValues("temperatureRectal")) >= 38.5 &&
      Number(getValues("temperatureRectal")) <= 38.9
    ) {
      temperatureRectalVal = -1;
    } else if (
      Number(getValues("temperatureRectal")) >= 36 &&
      Number(getValues("temperatureRectal")) <= 38.4
    ) {
      // 36-38.4
      temperatureRectalVal = 0;
    } else if (
      Number(getValues("temperatureRectal")) >= 34 &&
      Number(getValues("temperatureRectal")) <= 35.9
    ) {
      // 34-35.9
      temperatureRectalVal = 1;
    } else if (
      Number(getValues("temperatureRectal")) >= 32 &&
      Number(getValues("temperatureRectal")) <= 33.9
    ) {
      // 32-33.9
      temperatureRectalVal = 2;
    } else if (
      Number(getValues("temperatureRectal")) >= 30 &&
      Number(getValues("temperatureRectal")) <= 31.9
    ) {
      // 30-31.9
      temperatureRectalVal = 3;
    } else if (Number(getValues("temperatureRectal")) <= 29.9) {
      // ≤ 29.9
      temperatureRectalVal = 4;
    }

    return temperatureRectalVal;
  }

  //Calculate meanArterialPressure
  function calculateMeanArterialPressure() {
    let meanArterialPressureVal;
    //calculating the value of meanArterialPressure
    if (Number(getValues("meanArterialPressure")) >= 160) {
      meanArterialPressureVal = -4;
    } else if (
      Number(getValues("meanArterialPressure")) >= 130 &&
      Number(getValues("meanArterialPressure")) <= 159
    ) {
      meanArterialPressureVal = -3;
    } else if (
      Number(getValues("meanArterialPressure")) >= 110 &&
      Number(getValues("meanArterialPressure")) <= 129
    ) {
      meanArterialPressureVal = -2;
    } else if (
      Number(getValues("meanArterialPressure")) >= 70 &&
      Number(getValues("meanArterialPressure")) <= 109
    ) {
      meanArterialPressureVal = 0;
    } else if (
      Number(getValues("meanArterialPressure")) >= 50 &&
      Number(getValues("meanArterialPressure")) <= 69
    ) {
      meanArterialPressureVal = 2;
    } else if (Number(getValues("meanArterialPressure")) <= 49) {
      meanArterialPressureVal = 4;
    }

    return meanArterialPressureVal;
  }

  //Calculate arterialPH
  function calculateArterialPH() {
    let arterialPHVal;
    //calculating the value of arterialPH
    if (Number(getValues("arterialPH")) >= 7.7) {
      arterialPHVal = -4;
    } else if (
      Number(getValues("arterialPH")) >= 7.6 &&
      Number(getValues("arterialPH")) <= 7.69
    ) {
      arterialPHVal = -3;
    } else if (
      Number(getValues("arterialPH")) >= 7.5 &&
      Number(getValues("arterialPH")) <= 7.59
    ) {
      arterialPHVal = -1;
    } else if (
      Number(getValues("arterialPH")) >= 7.33 &&
      Number(getValues("arterialPH")) <= 7.49
    ) {
      arterialPHVal = 0;
    } else if (
      Number(getValues("arterialPH")) >= 7.25 &&
      Number(getValues("arterialPH")) <= 7.32
    ) {
      arterialPHVal = 2;
    } else if (
      Number(getValues("arterialPH")) >= 7.15 &&
      Number(getValues("arterialPH")) <= 7.24
    ) {
      arterialPHVal = 3;
    } else if (Number(getValues("arterialPH")) <= 7.15) {
      arterialPHVal = 4;
    }

    return arterialPHVal;
  }

  //calculating the value of pulse(means heartrate)
  function calculatePulse() {
    let pulseVal;

    if (Number(getValues("pulse")) >= 180) {
      pulseVal = -4;
    } else if (
      Number(getValues("pulse")) >= 140 &&
      Number(getValues("pulse")) <= 179
    ) {
      pulseVal = -3;
    } else if (
      Number(getValues("pulse")) >= 110 &&
      Number(getValues("pulse")) <= 139
    ) {
      pulseVal = -2;
    } else if (
      Number(getValues("pulse")) >= 70 &&
      Number(getValues("pulse")) <= 109
    ) {
      pulseVal = 0;
    } else if (
      Number(getValues("pulse")) >= 55 &&
      Number(getValues("pulse")) <= 69
    ) {
      pulseVal = 2;
    } else if (
      Number(getValues("pulse")) >= 40 &&
      Number(getValues("pulse")) <= 54
    ) {
      pulseVal = 3;
    } else if (Number(getValues("pulse")) <= 39) {
      pulseVal = 4;
    }

    return pulseVal;
  }

  //calculating the value of respiration
  function calculateRespiration() {
    let respirationVal;
    if (Number(getValues("respiration")) >= 50) {
      respirationVal = -4;
    } else if (
      Number(getValues("respiration")) >= 35 &&
      Number(getValues("respiration")) <= 49
    ) {
      respirationVal = -3;
    } else if (
      Number(getValues("respiration")) >= 110 &&
      Number(getValues("respiration")) <= 139
    ) {
      respirationVal = -2;
    } else if (
      Number(getValues("respiration")) >= 25 &&
      Number(getValues("respiration")) <= 34
    ) {
      respirationVal = -1;
    } else if (
      Number(getValues("respiration")) >= 12 &&
      Number(getValues("respiration")) <= 24
    ) {
      respirationVal = 0;
    } else if (
      Number(getValues("respiration")) >= 10 &&
      Number(getValues("respiration")) <= 11
    ) {
      respirationVal = 1;
    } else if (Number(getValues("respiration")) <= 39) {
      respirationVal = 4;
    }

    return respirationVal;
  }

  //caculating the value of oxygentation
  function calculateOxygentation() {
    let oxygenationVal;
    //calculating the value of oxygenation
    if (Number(getValues("oxygenation")) >= 500) {
      oxygenationVal = -4;
    } else if (
      Number(getValues("oxygenation")) >= 350 &&
      Number(getValues("oxygenation")) <= 499
    ) {
      oxygenationVal = -3;
    } else if (
      Number(getValues("oxygenation")) >= 200 &&
      Number(getValues("oxygenation")) <= 349
    ) {
      oxygenationVal = -2;
    } else if (Number(getValues("oxygenation")) < 200) {
      oxygenationVal = 0;
    }

    return oxygenationVal;
  }

  //calculating the serumHCO3
  function calculateSerumHCO3() {
    let serumHCO3Val;
    if (Number(getValues("serumHCO3")) >= 52) {
      serumHCO3Val = -4;
    } else if (
      Number(getValues("serumHCO3")) >= 41 &&
      Number(getValues("serumHCO3")) <= 51.9
    ) {
      serumHCO3Val = -3;
    } else if (
      Number(getValues("serumHCO3")) >= 32 &&
      Number(getValues("serumHCO3")) <= 40.9
    ) {
      serumHCO3Val = -1;
    } else if (
      Number(getValues("serumHCO3")) >= 22 &&
      Number(getValues("serumHCO3")) <= 31.9
    ) {
      serumHCO3Val = 0;
    } else if (
      Number(getValues("serumHCO3")) >= 18 &&
      Number(getValues("serumHCO3")) <= 21.9
    ) {
      serumHCO3Val = 1;
    } else if (
      Number(getValues("serumHCO3")) >= 15 &&
      Number(getValues("serumHCO3")) <= 17.5
    ) {
      serumHCO3Val = 2;
    } else if (Number(getValues("serumHCO3")) <= 15) {
      serumHCO3Val = 4;
    }

    return serumHCO3Val;
  }

  //calculating the wbc
  function calculateWbc() {
    let wbcVal;
    if (Number(getValues("wbc")) >= 40) {
      wbcVal = -4;
    } else if (
      Number(getValues("wbc")) >= 20 &&
      Number(getValues("wbc")) <= 39.9
    ) {
      wbcVal = -2;
    } else if (
      Number(getValues("wbc")) >= 15 &&
      Number(getValues("wbc")) <= 19.9
    ) {
      wbcVal = -1;
    } else if (
      Number(getValues("wbc")) >= 3 &&
      Number(getValues("wbc")) <= 14.9
    ) {
      wbcVal = 0;
    } else if (
      Number(getValues("wbc")) >= 1 &&
      Number(getValues("wbc")) <= 2.9
    ) {
      wbcVal = 2;
    } else if (Number(getValues("wbc")) < 1) {
      wbcVal = 4;
    }

    return wbcVal;
  }

  //calculating the hematocrit
  function calculateHematocrit() {
    let hematocritVal;
    if (Number(getValues("hematocrit")) >= 60) {
      hematocritVal = -4;
    } else if (
      Number(getValues("hematocrit")) >= 50 &&
      Number(getValues("hematocrit")) <= 59.9
    ) {
      hematocritVal = -2;
    } else if (
      Number(getValues("hematocrit")) >= 46 &&
      Number(getValues("hematocrit")) <= 49.9
    ) {
      hematocritVal = -1;
    } else if (
      Number(getValues("hematocrit")) >= 30 &&
      Number(getValues("hematocrit")) <= 45.9
    ) {
      hematocritVal = 0;
    } else if (
      Number(getValues("hematocrit")) >= 20 &&
      Number(getValues("hematocrit")) <= 29.9
    ) {
      hematocritVal = 2;
    } else if (Number(getValues("hematocrit")) < 20) {
      hematocritVal = 4;
    }

    return hematocritVal;
  }

  //calculating the serumCreatinine
  function calculateSerumCreatinine() {
    let serumCreatinineVal;
    if (Number(getValues("serumCreatinine")) >= 3.5) {
      serumCreatinineVal = -4;
    } else if (
      Number(getValues("serumCreatinine")) >= 2 &&
      Number(getValues("serumCreatinine")) <= 3.4
    ) {
      serumCreatinineVal = -3;
    } else if (
      Number(getValues("serumCreatinine")) >= 1.5 &&
      Number(getValues("serumCreatinine")) <= 1.9
    ) {
      serumCreatinineVal = -2;
    } else if (
      Number(getValues("serumCreatinine")) >= 0.6 &&
      Number(getValues("serumCreatinine")) <= 1.4
    ) {
      serumCreatinineVal = 0;
    } else if (Number(getValues("serumCreatinine")) < 0.6) {
      serumCreatinineVal = 2;
    }

    return serumCreatinineVal;
  }

  //calculating the serumPotassium
  function calculateSerumPotassium() {
    let serumPotassiumVal;
    if (Number(getValues("serumPotassium")) >= 7) {
      serumPotassiumVal = -4;
    } else if (
      Number(getValues("serumPotassium")) >= 6 &&
      Number(getValues("serumPotassium")) <= 6.9
    ) {
      serumPotassiumVal = -3;
    } else if (
      Number(getValues("serumPotassium")) >= 5.5 &&
      Number(getValues("serumPotassium")) <= 5.9
    ) {
      serumPotassiumVal = -1;
    } else if (
      Number(getValues("serumPotassium")) >= 3.5 &&
      Number(getValues("serumPotassium")) <= 5.4
    ) {
      serumPotassiumVal = 0;
    } else if (
      Number(getValues("serumPotassium")) >= 3 &&
      Number(getValues("serumPotassium")) <= 3.4
    ) {
      serumPotassiumVal = 1;
    } else if (
      Number(getValues("serumPotassium")) >= 2.5 &&
      Number(getValues("serumPotassium")) <= 2.9
    ) {
      serumPotassiumVal = 2;
    } else if (Number(getValues("serumPotassium")) <= 2.5) {
      serumPotassiumVal = 4;
    }

    return serumPotassiumVal;
  }

  //Calculating the serumSodium
  function calculateSerumSodium() {
    let serumSodiumVal;
    if (Number(getValues("serumSodium")) >= 180) {
      serumSodiumVal = -4;
    } else if (
      Number(getValues("serumSodium")) >= 160 &&
      Number(getValues("serumSodium")) <= 179
    ) {
      serumSodiumVal = -3;
    } else if (
      Number(getValues("serumSodium")) >= 155 &&
      Number(getValues("serumSodium")) <= 159
    ) {
      serumSodiumVal = -2;
    } else if (
      Number(getValues("serumSodium")) >= 150 &&
      Number(getValues("serumSodium")) <= 154
    ) {
      serumSodiumVal = -1;
    } else if (
      Number(getValues("serumSodium")) >= 130 &&
      Number(getValues("serumSodium")) <= 149
    ) {
      serumSodiumVal = 0;
    } else if (
      Number(getValues("serumSodium")) >= 120 &&
      Number(getValues("serumSodium")) <= 129
    ) {
      serumSodiumVal = 2;
    } else if (
      Number(getValues("serumSodium")) >= 111 &&
      Number(getValues("serumSodium")) <= 119
    ) {
      serumSodiumVal = 3;
    } else if (Number(getValues("serumSodium")) <= 110) {
      serumSodiumVal = 4;
    }

    return serumSodiumVal;
  }

  //Calculate the value of A and set it into the input field
  function CalculateSumOfA() {
    let pulse = calculatePulse();

    let respiration = calculateRespiration();

    let temperatureRectal = calculateTemperatureRectal();

    let meanArterialPressure = calculateMeanArterialPressure();

    let arterialPH = calculateArterialPH();

    let oxygenation = calculateOxygentation();

    let serumHCO3 = calculateSerumHCO3();

    let wbc = calculateWbc();

    let hematocrit = calculateHematocrit();

    let serumCreatinine = calculateSerumCreatinine();

    let serumPotassium = calculateSerumPotassium();

    let serumSodium = calculateSerumSodium();

    let summationOfA = null;

    //calculating the value of A
    summationOfA =
      Number(pulse) +
      Number(respiration) +
      Number(temperatureRectal) +
      Number(meanArterialPressure) +
      Number(arterialPH) +
      Number(oxygenation) +
      Number(serumHCO3) +
      Number(wbc) +
      Number(hematocrit) +
      Number(serumCreatinine) +
      Number(serumPotassium) +
      Number(serumSodium);

    //displaying the value of A
    if (summationOfA !== null) {
      setValue("a", summationOfA);
    }
  }

  //Calculate the value of B and set it into the input field
  function CalculateSumOfB() {
    let summationOfB = null;

    summationOfB =
      Number(getValues("eyeOpeningResponse")) +
      Number(getValues("verbalResponse")) +
      Number(getValues("motorResponse"));

    if (summationOfB !== null) {
      setValue("totalGCS", summationOfB);
      setValue("b", summationOfB);
    }
  }

  function calculateC() {
    let valueOfC = null;
    valueOfC = Number(getValues("chronicHealth"));

    if (valueOfC !== null) {
      setValue("c", valueOfC);
    }
  }

  //Calculate and set the value of 'A' , if and only if all the inputFields are not empty
  if (
    watch("pulse") !== "" &&
    watch("respiration") !== "" &&
    watch("meanArterialPressure") !== "" &&
    watch("temperatureRectal") !== "" &&
    watch("arterialPH") !== "" &&
    watch("oxygenation") !== "" &&
    watch("serumHCO3") !== "" &&
    watch("serumSodium") !== "" &&
    watch("hematocrit") !== "" &&
    watch("serumCreatinine") !== "" &&
    watch("serumPotassium") !== "" &&
    watch("wbc") !== ""
  ) {
    CalculateSumOfA();
  } else {
    setValue("a", "");
  }

  //Calculate the value of 'B' , if and only if at least one of the radio fields in each legend is selected
  if (
    watch("eyeOpeningResponse") !== "" &&
    watch("verbalResponse") !== "" &&
    watch("motorResponse") !== ""
  ) {
    CalculateSumOfB();
  } else {
    setValue("totalGCS", "");
    setValue("b", "");
  }

  //Calculate the value of 'C' ,if and only if at least one of the radio fields is selected
  if (watch("chronicHealth") !== "") {
    calculateC();
  }

  useEffect(() => {
    setValue("a", "");
    setValue("totalGCS", "");
    setValue("b", "");
    setValue("c", "");
  }, []);

  return (
    <div>
      <div>
        <CommonTable data={data} />
      </div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div className="border-b-2 border-customBlue py-2">
          <h1 className="h-7 w-7 text-center flex items-center justify-center bg-orange-500 text-white rounded-full mt-2">
            A
          </h1>
          <div className="grid grid-cols-4 gap-1 mt-2">
            <div className="w-full">
              <InputField
                name="pulse"
                type="number"
                variant="outlined"
                label="Pulse*"
                error={errors.pulse}
                control={control}
                // inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="respiration"
                type="number"
                variant="outlined"
                label="Respiration*"
                error={errors.respiration}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="temperatureRectal"
                type="number"
                variant="outlined"
                label="Temp. Rectal (C°)"
                error={errors.temperatureRectal}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="meanArterialPressure"
                type="number"
                variant="outlined"
                label="Mean Arterial Pressure*"
                error={errors.meanArterialPressure}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="arterialPH"
                type="number"
                variant="outlined"
                label="Arterial PH*"
                error={errors.arterialPH}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="oxygenation"
                type="number"
                variant="outlined"
                label="Oxygenation*"
                error={errors.oxygenation}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="serumHCO3"
                type="number"
                variant="outlined"
                label="Serum HCO3*"
                error={errors.serumHCO3}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="wbc"
                type="number"
                variant="outlined"
                label="WBC*"
                error={errors.wbc}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="hematocrit"
                type="number"
                variant="outlined"
                label="Hematocrit*"
                error={errors.hematocrit}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="serumCreatinine"
                type="number"
                variant="outlined"
                label="Serum Creatinine*"
                error={errors.serumCreatinine}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="serumPotassium"
                type="number"
                variant="outlined"
                label="Serum Potassium*"
                error={errors.serumPotassium}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="serumSodium"
                type="number"
                variant="outlined"
                label="Serum Sodium*"
                error={errors.serumSodium}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
          </div>
          <div>
            <h1 className="h-7 w-7 text-center flex items-center justify-center bg-orange-500 text-white rounded-full mt-2">
              B
            </h1>
            <div className="grid gap-2 text-sm">
              <div>
                <fieldset
                  className="flex justify-between border border-gray-300
                col-span-3 w-full text-left mt-1 px-4 rounded text-sm"
                >
                  <legend className="font-semibold text-sm text-gray-700 ">
                    Eye Opening Response
                  </legend>
                  <div className="grid gap-2">
                    <div className="lg:flex flex-nowrap py-2">
                      <RadioField
                        label=""
                        name="eyeOpeningResponse"
                        control={control}
                        dataArray={eyeOpeningResponseArray}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset className="flex justify-between border border-gray-300 w-full text-left mt-1 px-4 rounded text-sm">
                  <legend className="font-semibold text-sm text-gray-700 ">
                    Verbal Response
                  </legend>
                  <div className="grid gap-2">
                    <div className="lg:flex flex-nowrap py-2">
                      <RadioField
                        label=""
                        name="verbalResponse"
                        control={control}
                        dataArray={verbalResponseArray}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="flex justify-between border border-gray-300 w-full text-left mt-1 px-4 rounded text-sm">
                  <legend className="font-semibold text-sm text-gray-700 ">
                    Motor Response
                  </legend>

                  <div className="grid gap-2">
                    <div className="lg:flex flex-nowrap py-2">
                      <RadioField
                        label=""
                        name="motorResponse"
                        control={control}
                        dataArray={motorResponseArray}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div>
            <h1 className="h-7 w-7 text-center flex items-center justify-center bg-orange-500 text-white rounded-full mt-2">
              C
            </h1>
            <div className="xl:flex items-center gap-2 w-full">
              <div>
                <fieldset
                  className=" border border-gray-300
                     w-full text-left mt-1 px-4 rounded text-sm"
                >
                  <legend className="font-semibold text-sm text-gray-700 ">
                    Chronic Health Points*
                  </legend>
                  <h1 className="my-1 text-gray-400">
                    If the patient has a history of severe order system
                    insufficiency or is immunocompromised assign points as
                    following :
                  </h1>
                  <div className="grid gap-2">
                    <div className="lg:flex flex-nowrap py-2">
                      <div className="lg:flex flex-nowrap py-2">
                        <RadioField
                          label=""
                          name="chronicHealth"
                          control={control}
                          dataArray={chronicHealthArray}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="mt-2 xl:mt-0">
                <div className="flex items-center space-x-2 w-full">
                  <h1 className="w-3/12 xl:w-full">Total GCS =</h1>
                  <div className="w-3/12 xl:w-full">
                    <InputField
                      className="w-4/12"
                      name="totalGCS"
                      variant="outlined"
                      label="Total GCS"
                      // error={errors.wbc}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <h1 className="w-3/12 xl:w-full">Death Rate =</h1>
                  <div className="w-3/12 xl:w-full">
                    <InputField
                      className=""
                      name="deathRate"
                      variant="outlined"
                      label="Death Rate"
                      // error={errors.wbc}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 items-center w-full xl:w-[71%] mt-2">
            <h1 className="w-3/12">Apache Score :</h1>
            <div className="grid gap-1 grid-cols-4 w-full">
              <div className="flex items-center">
                <InputField
                  name="a"
                  variant="outlined"
                  label="A"
                  // error={errors.wbc}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
                <h1 className="font-semibold">+</h1>
              </div>
              <div className="flex items-center">
                <InputField
                  name="b"
                  variant="outlined"
                  label="B"
                  // error={errors.wbc}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
                <h1 className="font-semibold">+</h1>
              </div>
              <div className="flex items-center">
                <InputField
                  name="c"
                  variant="outlined"
                  label="C"
                  // error={errors.wbc}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
                <h1 className="font-semibold">=</h1>
              </div>
              <div>
                <InputField
                  // className="text-sm"
                  name="apacheScore"
                  variant="outlined"
                  label="Apache Score"
                  // error={errors.wbc}
                  control={control}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 justify-end w-full items-center mt-2">
          <ResetButton />
          <OnClickAddButton
            onClick={(e) => {
              e.preventDefault();

              let deathRate = null;

              let apacheScore =
                Number(getValues("a")) +
                Number(getValues("b")) +
                Number(getValues("c"));

              setValue("apacheScore", apacheScore);

              if (apacheScore === 0 && apacheScore <= 4) {
                deathRate = "4%";
              } else if (apacheScore === 5 && apacheScore <= 9) {
                deathRate = "8%";
              } else if (apacheScore === 10 && apacheScore <= 14) {
                deathRate = "15%";
              } else if (apacheScore === 15 && apacheScore <= 19) {
                deathRate = "25%";
              } else if (apacheScore === 20 && apacheScore <= 24) {
                deathRate = "40%";
              } else if (apacheScore === 25 && apacheScore <= 29) {
                deathRate = "55%";
              } else if (apacheScore === 30 && apacheScore <= 34) {
                deathRate = "75%";
              } else if (apacheScore > 34) {
                deathRate = "80%";
              }

              if (deathRate !== null) {
                setValue("deathRate", deathRate);
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default ApacheScore;
