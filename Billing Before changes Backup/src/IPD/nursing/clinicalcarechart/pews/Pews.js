import { Slider, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PewsTable from "./PewsTable";
import "./style.css";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../../Common Components/FormFields/InputField";
import { Modal, Box, Button, Divider } from "@mui/material";
import CheckBoxField from "./CheckboxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import AddButton from "../../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../../Common Components/Buttons/ResetButton";

import SaveButton from "../../../../Common Components/Buttons/SaveButton";

import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";

export default function Pews() {
  console.log("pews model excuated");
  const schema = yup.object().shape({
    playingappropriate: yup.boolean().required("Required"),
    sleeping: yup.boolean().required("Required"),
    irritable: yup.boolean().required("Required"),
    reducedresponsetopain: yup.boolean().required("Required"),
    lethargicConfused: yup.boolean().required("Required"),
    pink: yup.boolean().required("Required"),
    capillaryrefill12sec: yup.boolean().required("Required"),
    paledusky: yup.boolean().required("Required"),
    capillaryrefill3sec: yup.boolean().required("Required"),
    graycyanotic: yup.boolean().required("Required"),
    capillaryrefill4sec: yup.boolean().required("Required"),
    tachycardianormal20abovenormalrate: yup.boolean().required("Required"),
    grayccyanoticandmolted: yup.boolean().required("Required"),
    capillaryrefill5secabove: yup.boolean().required("Required"),
    tachycardianormal30abovenormalrate: yup.boolean().required("Required"),
    bradcardia: yup.boolean().required("Required"),
    withnormalparameters: yup.boolean().required("Required"),
    normal10parameters: yup.boolean().required("Reqired"),
    usingaccessorymuscles: yup.boolean().required("Required"),
    Fio302Or3Litersmin: yup.boolean().required("Required"),
    normal20parameters: yup.boolean().required("Required"),
    retractions: yup.boolean().required("Required"),
    Fio402Or6Litersmin: yup.boolean().required("Required"),
    blownormalparametersretractions: yup.boolean().required("Required"),
    Fio502Or8Liters: yup.boolean().required("Required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const defaultValues = {
    playingappropriate: false,
    sleeping: false,
    irritable: false,
    reducedresponsetopain: false,
    lethargicConfused: false,
    pink: false,
    capillaryrefill12sec: false,
    paledusky: false,
    capillaryrefill3sec: false,
    graycyanotic: false,
    capillaryrefill4sec: false,
    tachycardianormal20abovenormalrate: false,
    grayccyanoticandmolted: false,
    capillaryrefill5secabove: false,
    tachycardianormal30abovenormalrate: false,
    bradcardia: false,
    withnormalparameters: false,
    normal10parameters: false,
    usingaccessorymuscles: false,
    Fio302Or3Litersmin: false,
    normal20parameters: false,
    retractions: false,
    Fio402Or6Litersmin: false,
    blownormalparametersretractions: false,
    Fio502Or8Liters: false,
  };

  const [behaviorScore, setBehaviorScore] = React.useState();
  const [cardiovascularScore, setcardiovascularScore] = React.useState();
  const [respiratoryScore, setRespiratoryScore] = React.useState();

  const pewsDivElement = useRef();

  console.log("div element call", pewsDivElement);

  const onSubmitDataHandler = (data) => {
    console.log("data handler function excuted");
    console.log("data is in fun", data);
  };

  useEffect(() => {
    const subscription = watch((data) => {
      console.log("The subscribed data is ");
      console.log(data);

      console.log(typeof data);

      if (data.playingappropriate === true) {
        setBehaviorScore(0);
      } else if (data.sleeping === true) {
        setBehaviorScore(1);
      } else if (data.irritable === true) {
        setBehaviorScore(2);
      } else if (
        data.reducedresponsetopain === true ||
        data.lethargicConfused === true
      ) {
        setBehaviorScore(3);
      } else {
        setBehaviorScore("");
      }

      if (data.pink === true || data.capillaryrefill12sec === true) {
        setcardiovascularScore(0);
      } else if (data.paledusky === true || data.capillaryrefill3sec === true) {
        setcardiovascularScore(1);
      } else if (
        data.graycyanotic === true ||
        data.capillaryrefill4sec === true ||
        data.tachycardianormal20abovenormalrate === true
      ) {
        setcardiovascularScore(2);
      } else if (
        data.grayccyanoticandmolted === true ||
        data.capillaryrefill5secabove === true ||
        data.tachycardianormal30abovenormalrate === true ||
        data.bradcardia
      ) {
        setcardiovascularScore(3);
      } else {
        setcardiovascularScore("");
      }

      if (data.withnormalparameters === true) {
        setRespiratoryScore(0);
      } else if (
        data.normal10parameters === true ||
        data.usingaccessorymuscles === true ||
        data.Fio302Or3LitersminFlag === true
      ) {
        setRespiratoryScore(1);
      } else if (
        data.normal20parameters === true ||
        data.retractions === true ||
        data.Fio402Or6Litersmin === true
      ) {
        setRespiratoryScore(2);
      } else if (
        data.blownormalparametersretractions === true ||
        data.Fio502Or8Liters === true
      ) {
        setRespiratoryScore(3);
      } else {
        setRespiratoryScore("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    calculatePews(behaviorScore, cardiovascularScore, respiratoryScore);
    console.log("use effect excuted");
  }, [behaviorScore, cardiovascularScore, respiratoryScore]);

  let finalPews;

  function calculatePews(behaviorScore, cardiovascularScore, respiratoryScore) {
    if (
      Number(behaviorScore) <5 &&
      Number(cardiovascularScore) <5 &&
      Number(respiratoryScore)<5
    ) {
      setBehaviorScore(behaviorScore);
      console.log("bsValue", behaviorScore);
      setcardiovascularScore(cardiovascularScore);
      console.log("csValue", cardiovascularScore);
      setRespiratoryScore(respiratoryScore);
      console.log("RsValue", respiratoryScore);
      finalPews =
        Number(behaviorScore) +
        Number(cardiovascularScore) +
        Number(respiratoryScore);

      console.log("final pews cal", finalPews);

      pewsDivElement.current.innerHTML = `Final Mews is ===0 ${finalPews}`;
      console.log("pews calculation", pewsDivElement);
    } else if (
      Number(behaviorScore) > 0 &&
      Number(cardiovascularScore) > 0 &&
      Number(respiratoryScore) > 0
    ) {
      finalPews =
        Number(behaviorScore) +
        Number(cardiovascularScore) +
        Number(respiratoryScore);

      console.log("final pews cal", finalPews);

      pewsDivElement.current.innerHTML = `Final Mews is > 0 ${finalPews}`;
    }
   

    if (finalPews >= 5) {
      pewsDivElement.current.innerHTML = ` <div class="flex  items-center">
      <p  class=" text-gray-700 px-2 font-bold">PEWS  </p>
         <div class="w-8 h-8 rounded-full border-2 border-red-500 flex justify-center  bg-red-500 items-center text-white">

        <p
          class=" text-white py-2"
        >
        ${finalPews}
        </p>

       
      </div>
      <p class="px-2 font-bold text-red-500">Please Call Doctor For Consultation</p>
      `;
    } else if (finalPews < 5 ) {
      pewsDivElement.current.innerHTML = `
      <div class="flex  items-center">
        <p  class=" text-gray-700 px-2 font-bold">PEWS</p>
           <div class="w-8 h-8 rounded-full border-2 border-green-500 flex justify-center  bg-green-500 items-center">

          <p
            class=" text-white py-2"
          >
          ${finalPews}
          </p>

         
        </div>
        <p class="px-2 font-bold text-green-500">No Need to Call Doctor For Consultation</p>
      `;
    }
    
  }

  //Behavior score watch
  let playingAppropriateFlag =
    watch("sleeping") ||
    watch("irritable") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let sleepingFlag =
    watch("playingappropriate") ||
    watch("irritable") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let irritableFlag =
    watch("playingappropriate") ||
    watch("sleeping") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let reducedresponsetopainFlag =
    watch("playingappropriate") || watch("sleeping") || watch("irritable");

  let lethargicConfusedFlag =
    watch("playingappropriate") || watch("sleeping") || watch("irritable");

  //Cardiovascula score watch

  let pinkFlag =
    watch("paledusky") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let capillaryrefill12secFlag =
    watch("paledusky") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let paleduskyFlag =
    watch("capillaryrefill12sec") ||
    watch("pink") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let capillaryrefill3secFlag =
    watch("pink") ||
    watch("capillaryrefill12sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let graycyanoticFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let capillaryrefill4secFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let tachycardianormal20abovenormalrateFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let grayccyanoticandmoltedFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let capillaryrefill5secaboveFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let tachycardianormal30abovenormalrateFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let bradcardiaFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");
  let withnormalparametersFlag =
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("normal20parameters") ||
    watch("Fio302Or3Litersmin") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let normal10parametersFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let usingaccessorymusclesFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let Fio302Or3LitersminFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let normal20parametersFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let retractionsFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let Fio402Or6LitersminFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let blownormalparametersretractionsFlag =
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin");
  let Fio502Or8LitersFlag =
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin");

  return (
    <div className="w-full pt-1">
      <div className="grid grid-cols-1 gap-4 w-full ">
        <PewsTable />
      </div>
      <form
        onSubmit={handleSubmit(onSubmitDataHandler)}
        className="grid grid-cols-1 md:grid-cols-1  gap-1"
      >
        <fieldset className="border border-gray-300 text-left lg:px-4 mt-1 md:px-4 md:ml-0 md:mr-0 py-2 rounded  bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold  text-base text-gray-700">
            <div className="flex flex-nowrap items-center">
              Behavior Score
              {playingAppropriateFlag ||
              sleepingFlag ||
              irritableFlag ||
              reducedresponsetopainFlag ||
              lethargicConfusedFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full   flex justify-center  bg-[#0081a8] items-center text-white text-xs">
                  {behaviorScore}
                </p>
              ) : null}
            </div>
          </legend>

          <div className="grid grid-cols-4 w-full ">
            <div>
              <div className="font-base ">0</div>
              <fieldset
                disabled={playingAppropriateFlag}
                className="font-base "
              >
                <CheckBoxField
                  control={control}
                  name="playingappropriate"
                  label="Playing / Appropriate"
                  style={
                    playingAppropriateFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className=" w-full">
              <div className="font-base">1</div>
              <fieldset disabled={sleepingFlag}>
                <CheckBoxField
                  control={control}
                  name="sleeping"
                  label="Sleeping"
                  value="Sleeping"
                  error={errors.sleeping}
                  style={
                    sleepingFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className=" w-full">
              <div className="font-base">2</div>
              <fieldset disabled={irritableFlag}>
                <CheckBoxField
                  control={control}
                  name="irritable"
                  label="Irritable"
                  value="Irritable"
                  error={errors.irrritable}
                  style={
                    irritableFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">3</div>
              <fieldset disabled={reducedresponsetopainFlag}>
                <CheckBoxField
                  control={control}
                  name="reducedresponsetopain"
                  label="Reduced Response To Pain"
                  error={errors.reducedresponsetopain}
                  style={
                    reducedresponsetopainFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <fieldset disabled={lethargicConfusedFlag}>
                <CheckBoxField
                  control={control}
                  name="lethargicConfused"
                  label="Lethargic / Confused"
                  error={errors.lethargicConfused}
                  style={
                    lethargicConfusedFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 text-left   lg:mx-auto md:px-4 lg:px-4 md:ml-0 md:mr-0 py-2 rounded  bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold  text-base text-gray-700">
            <div className="flex flex-nowrap items-center">
              Cardiovascular Score
              {pinkFlag ||
              capillaryrefill12secFlag ||
              paleduskyFlag ||
              capillaryrefill3secFlag ||
              graycyanoticFlag ||
              capillaryrefill4secFlag ||
              tachycardianormal20abovenormalrateFlag ||
              grayccyanoticandmoltedFlag ||
              capillaryrefill5secaboveFlag ||
              tachycardianormal30abovenormalrateFlag ||
              bradcardiaFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full   flex justify-center  bg-[#0081a8] items-center text-white text-xs">
                  {cardiovascularScore}
                </p>
              ) : null}
            </div>
          </legend>

          <div className="grid grid-cols-4 w-full ">
            <div className="">
              <div className="font-base ">0</div>
              <fieldset disabled={pinkFlag}>
                <CheckBoxField
                  control={control}
                  name="pink"
                  label="Pink"
                  value="Pink"
                  style={
                    pinkFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>

              <fieldset disabled={capillaryrefill12secFlag}>
                <CheckBoxField
                  control={control}
                  name="capillaryrefill12sec"
                  label="Capillary Refill 1-2 sec"
                  value="Capillary Refill 1-2 sec"
                  style={
                    capillaryrefill12secFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">1</div>
              <fieldset disabled={paleduskyFlag}>
                <CheckBoxField
                  control={control}
                  name="paledusky"
                  label="Pale or Dusky"
                  value="Pale or Dusky"
                  style={
                    paleduskyFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>

              <fieldset disabled={capillaryrefill3secFlag}>
                <CheckBoxField
                  control={control}
                  name="capillaryrefill3sec"
                  label="Capillary Refill 3 sec"
                  style={
                    capillaryrefill3secFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">2</div>
              <fieldset disabled={graycyanoticFlag}>
                <CheckBoxField
                  control={control}
                  name="graycyanotic"
                  label="Grey Or Cyanotic"
                  style={
                    graycyanoticFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>

              <fieldset disabled={capillaryrefill4secFlag}>
                <CheckBoxField
                  control={control}
                  name="capillaryrefill4sec"
                  label="Capillary Refill 4 sec"
                  style={
                    capillaryrefill4secFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>

              <fieldset disabled={tachycardianormal20abovenormalrateFlag}>
                <CheckBoxField
                  control={control}
                  name="tachycardianormal20abovenormalrate"
                  label="Tachycardia of 20 Above Normal Rate"
                  value="Tachycardia of 20 Above Normal Rate"
                  style={
                    tachycardianormal20abovenormalrateFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>

            <div className="">
              <div className="font-base">3</div>
              <fieldset disabled={grayccyanoticandmoltedFlag}>
                <CheckBoxField
                  control={control}
                  name="grayccyanoticandmolted"
                  label="Gray Ccyanotic and Molted"
                  value="Gray Ccyanotic and Molted"
                  style={
                    grayccyanoticandmoltedFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <div className="py-2 whitespace-nowrap">
                <fieldset disabled={capillaryrefill5secaboveFlag}>
                  <CheckBoxField
                    control={control}
                    name="capillaryrefill5secabove"
                    label="Capillary Refill 5 sec and Above"
                    value="Capillary Refill 5 sec and Above"
                    style={
                      capillaryrefill5secaboveFlag
                        ? {
                            color: "#818589",
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                        : {
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                    }
                  />
                </fieldset>
              </div>
              <div className="py-2">
                <fieldset disabled={tachycardianormal30abovenormalrateFlag}>
                  <CheckBoxField
                    control={control}
                    name="tachycardianormal30abovenormalrate"
                    label="Tachycardia of 30 Above Normal Rate"
                    value="Tachycardia of 30 Above Normal Rate"
                    style={
                      tachycardianormal30abovenormalrateFlag
                        ? {
                            color: "#818589",
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                        : {
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                    }
                  />
                </fieldset>
              </div>
              <fieldset disabled={bradcardiaFlag}>
                <CheckBoxField
                  control={control}
                  name="bradcardia"
                  label="Bradcardia"
                  value="Bradcardia"
                  style={
                    bradcardiaFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 text-left mb-2  lg:mx-auto md:px-4 lg:px-4 md:ml-0 md:mr-0 py-2 rounded    bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold  text-base text-gray-700">
            <div className="flex flex-nowrap items-center">
              Respiratory Score
              {withnormalparametersFlag ||
              normal10parametersFlag ||
              usingaccessorymusclesFlag ||
              Fio302Or3LitersminFlag ||
              normal20parametersFlag ||
              retractionsFlag ||
              Fio402Or6LitersminFlag ||
              blownormalparametersretractionsFlag ||
              Fio502Or8LitersFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full   flex justify-center  bg-[#0081a8] items-center text-white text-xs">
                  {respiratoryScore}
                </p>
              ) : null}
            </div>
          </legend>

          <div className="grid grid-cols-4 w-full gap-2">
            <div className="">
              <div className="font-base">0</div>
              <fieldset disabled={withnormalparametersFlag}>
                <CheckBoxField
                  control={control}
                  name="withnormalparameters"
                  label="With Normal Parameters"
                  value="With Normal Parameters"
                  style={
                    withnormalparametersFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">1</div>
              <fieldset disabled={normal10parametersFlag}>
                <CheckBoxField
                  control={control}
                  name="normal10parameters"
                  label="> 10 Normal Parameters"
                  value="> 10 Normal Parameters"
                  style={
                    normal10parametersFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <fieldset disabled={usingaccessorymusclesFlag}>
                <CheckBoxField
                  control={control}
                  name="usingaccessorymuscles"
                  label="Using Accessory Muscles"
                  value="Using Accessory Muscles"
                  style={
                    usingaccessorymusclesFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <fieldset className="whitespace-nowrap " disabled={Fio302Or3LitersminFlag}>
                <CheckBoxField
                  control={control}
                  name="Fio302Or3Litersmin"
                  label="30 + %Fio2 Or 3 + Liters / min"
                  value="30 + %Fio2 Or 3 + Liters / min"
                  style={
                    Fio302Or3LitersminFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">2</div>
              <fieldset disabled={normal20parametersFlag}>
                <CheckBoxField
                  control={control}
                  name="normal20parameters"
                  label="> 20 Normal Parameters"
                  value="> 20 Normal Parameters"
                  style={
                    normal20parametersFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <fieldset disabled={retractionsFlag}>
                <CheckBoxField
                  control={control}
                  name="retractions"
                  label="Retractions"
                  value="Retractions"
                  style={
                    retractionsFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <fieldset disabled={Fio402Or6LitersminFlag}>
                <CheckBoxField
                  control={control}
                  name="Fio402Or6Litersmin"
                  label="40 + %Fio2 Or 6 + Liters/min"
                  value="40 + %Fio2 Or 6 + Liters/min"
                  style={
                    Fio402Or6LitersminFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
            </div>
            <div className="w-full ">
              <div className="font-base">3</div>
              <fieldset disabled={blownormalparametersretractionsFlag}>
                <CheckBoxField
                  control={control}
                  name="blownormalparametersretractions"
                  label="b>= Normal Parameters With Retractions"
                  value="b>= Normal Parameters With Retractions"
                  style={
                    blownormalparametersretractionsFlag
                      ? {
                          color: "#818589",
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                      : {
                          fontSize: "13px",
                          alignItems: "flex-start !important",
                          paddingRight: 0,
                          marginRight: 0,
                        }
                  }
                />
              </fieldset>
              <div className="py-3 whitespace-nowrap">
                <fieldset disabled={Fio502Or8LitersFlag}>
                  <CheckBoxField
                    control={control}
                    name="Fio502Or8Liters"
                    label="50 + %Fio2 Or 8 + Liters / min"
                    value="50 + %Fio2 Or 8 + Liters / min"
                    style={
                      Fio502Or8LitersFlag
                        ? {
                            color: "#818589",
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                        : {
                            fontSize: "13px",
                            alignItems: "flex-start !important",
                            paddingRight: 0,
                            marginRight: 0,
                          }
                    }
                  />
                </fieldset>
              </div>
              <div className=" w-1/3 "></div>
            </div>
          </div>
        </fieldset>
        <div className="flex gap-2 justify-between">
          <div className="lg:grid lg:grid-cols-1 gap-2 py-2">
            <div name="pews" id="pews" ref={pewsDivElement}></div>
          </div>

          <div className="flex justify-end gap-2">
            <ResetButton
              onClick={() => {
                reset(defaultValues);
              }}
            />

            <SaveButton />
          </div>
        </div>
      </form>
    </div>
  );
}
