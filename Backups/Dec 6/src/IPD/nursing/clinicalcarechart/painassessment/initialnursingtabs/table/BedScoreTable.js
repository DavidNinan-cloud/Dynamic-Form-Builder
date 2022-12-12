import React, { useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import OnClickSaveButton from "../../../../../../Common Components/Buttons/SaveButton";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";
import { VisitContext } from "../../../ClinicalCareChart";
import { addBedAssessmentScore } from "../../../../services/nursingServices/painAssessment/PainAssessmentService";

export default function BedScoreTable(props) {
  const defaultValues = {
    senCompletelyLimited: false,
    senVeryLimited: false,
    senSlightlyLimited: false,
    senNoImpairment: false,

    moiCompletelyLimited: false,
    moiVeryLimited: false,
    moiOccasionallyMoist: false,
    moiRarelyMoist: false,

    actBedLying: false,
    actChairDependent: false,
    actWalksOccasionally: false,
    actWalksFrequently: false,

    mobCompletelyLimited: false,
    mobVeryLimited: false,
    mobSlightlyLimited: false,
    mobNoImpairment: false,

    nutVeryPoor: false,
    nutProbablyInadequate: false,
    nutAdequate: false,
    nutExcellent: false,

    friProblem: false,
    friPotentialProblem: false,
    friNoApparentProblem: false,
  };

  const { control, watch, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
  });

  // Context
  const patientVisitId = useContext(VisitContext);

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    console.log(data);

    let scoreStringArr = [];

    //An array which contains the names of all the checkBox that were ticked mark
    for (let propertyName in data) {
      if (data[propertyName] === true) {
        scoreStringArr.push(propertyName);
      }
    }

    scoreObjectCalculator(scoreStringArr);
  };

  //The function to create and return the postObj
  function scoreObjectCalculator(scoreArr) {
    console.log("scoreArr is ", scoreArr);

    let postObj = {
      activity: {
        score: "",
        value: "",
      },
      frictionAndShear: {
        score: "",
        value: "",
      },
      id: "",
      mobility: {
        score: "",
        value: "",
      },
      moisture: {
        score: "",
        value: "",
      },
      nutrition: {
        score: "",
        value: "",
      },
      score: 0,
      scoreValue: "",
      sensoryPerception: {
        score: "",
        value: "",
      },
      visitId: patientVisitId,
    };

    let scoreObj = {
      senCompletelyLimited: ScoreOne,
      senVeryLimited: ScoreTwo,
      senSlightlyLimited: ScoreThree,
      senNoImpairment: ScoreFour,
      moiCompletelyLimited: ScoreFive,
      moiVeryLimited: ScoreSix,
      moiOccasionallyMoist: ScoreSeven,
      moiRarelyMoist: ScoreEight,
      actBedLying: ScoreNine,
      actChairDependent: ScoreTen,
      actWalksOccasionally: ScoreEleven,
      actWalksFrequently: ScoreTwelve,
      mobCompletelyLimited: ScoreThirteen,
      mobVeryLimited: ScoreFourteen,
      mobSlightlyLimited: ScoreFifteen,
      mobNoImpairment: ScoreSixteen,
      nutVeryPoor: ScoreSeventeen,
      nutProbablyInadequate: ScoreEightteen,
      nutAdequate: ScoreNineteen,
      nutExcellent: ScoreTwenty,
      friProblem: ScoreTwentyOne,
      friPotentialProblem: ScoreTwentyTwo,
      friNoApparentProblem: ScoreTwentyThree,
    };

    for (let scoreName of scoreArr) {
      //first three characters of the scoreName
      let firstThree = scoreName.slice(0, 3);

      //Value of the scoreName ; by deleting the first three characters
      let realScoreName = scoreName.substring(3);

      if (firstThree === "sen") {
        postObj.sensoryPerception.value = realScoreName;
        postObj.sensoryPerception.score = scoreObj[scoreName];
      } else if (firstThree === "moi") {
        postObj.moisture.value = realScoreName;
        postObj.moisture.score = scoreObj[scoreName];
      } else if (firstThree === "act") {
        postObj.activity.value = realScoreName;
        postObj.activity.score = scoreObj[scoreName];
      } else if (firstThree === "mob") {
        postObj.mobility.value = realScoreName;
        postObj.mobility.score = scoreObj[scoreName];
      } else if (firstThree === "nut") {
        postObj.nutrition.value = realScoreName;
        postObj.nutrition.score = scoreObj[scoreName];
      } else if (firstThree === "fri") {
        postObj.frictionAndShear.value = realScoreName;
        postObj.frictionAndShear.score = scoreObj[scoreName];
      }
    }

    postObj.score = TotalVal;

    if (TotalVal >= 0 && TotalVal <= 60) {
      postObj.scoreValue = "No Risk";
    } else if (TotalVal >= 61 && TotalVal <= 100) {
      postObj.scoreValue = "Low Risk";
    } else if (TotalVal > 100) {
      postObj.scoreValue = "High Risk";
    }

    console.log("The final postObj is ", postObj);

    addBedAssessmentScore(postObj)
      .then((response) => {
        console.log("The response of bed score assessment is ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Addition functionality Start
  let ScoreOne = 0;
  watch("senCompletelyLimited") ? (ScoreOne = 30) : (ScoreOne = 0);

  let ScoreTwo = 0;
  watch("senVeryLimited") ? (ScoreTwo = 15) : (ScoreTwo = 0);

  let ScoreThree = 0;
  watch("senSlightlyLimited") ? (ScoreThree = 10) : (ScoreThree = 0);

  let ScoreFour = 0;
  watch("senNoImpairment") ? (ScoreFour = 0) : (ScoreFour = 0);

  let ScoreFive = 0;
  watch("moiCompletelyLimited") ? (ScoreFive = 30) : (ScoreFive = 0);

  let ScoreSix = 0;
  watch("moiVeryLimited") ? (ScoreSix = 15) : (ScoreSix = 0);

  let ScoreSeven = 0;
  watch("moiOccasionallyMoist") ? (ScoreSeven = 10) : (ScoreSeven = 0);

  let ScoreEight = 0;
  watch("moiRarelyMoist") ? (ScoreEight = 0) : (ScoreEight = 0);

  let ScoreNine = 0;
  watch("actBedLying") ? (ScoreNine = 30) : (ScoreNine = 0);

  let ScoreTen = 0;
  watch("actChairDependent") ? (ScoreTen = 15) : (ScoreTen = 0);

  let ScoreEleven = 0;
  watch("actWalksOccasionally") ? (ScoreEleven = 10) : (ScoreEleven = 0);

  let ScoreTwelve = 0;
  watch("actWalksFrequently") ? (ScoreTwelve = 0) : (ScoreTwelve = 0);

  let ScoreThirteen = 0;
  watch("mobCompletelyLimited") ? (ScoreThirteen = 30) : (ScoreTen = 0);

  let ScoreFourteen = 0;
  watch("mobVeryLimited") ? (ScoreFourteen = 15) : (ScoreFourteen = 0);

  let ScoreFifteen = 0;
  watch("mobSlightlyLimited") ? (ScoreFifteen = 10) : (ScoreFifteen = 0);

  let ScoreSixteen = 0;
  watch("mobNoImpairment") ? (ScoreSixteen = 0) : (ScoreSixteen = 0);

  let ScoreSeventeen = 0;
  watch("nutVeryPoor") ? (ScoreSeventeen = 30) : (ScoreSeventeen = 0);

  let ScoreEightteen = 0;
  watch("nutProbablyInadequate") ? (ScoreEightteen = 15) : (ScoreEightteen = 0);

  let ScoreNineteen = 0;
  watch("nutAdequate") ? (ScoreNineteen = 10) : (ScoreNineteen = 0);

  let ScoreTwenty = 0;
  watch("nutExcellent") ? (ScoreTwenty = 0) : (ScoreTwenty = 0);

  let ScoreTwentyOne = 0;
  watch("friProblem") ? (ScoreTwentyOne = 30) : (ScoreTwentyOne = 0);

  let ScoreTwentyTwo = 0;
  watch("friPotentialProblem") ? (ScoreTwentyTwo = 15) : (ScoreTwentyTwo = 0);

  let ScoreTwentyThree = 0;
  watch("friNoApparentProblem")
    ? (ScoreTwentyThree = 0)
    : (ScoreTwentyThree = 0);

  let TotalVal = 0;

  TotalVal =
    ScoreOne +
    ScoreTwo +
    ScoreThree +
    ScoreFour +
    ScoreFive +
    ScoreSix +
    ScoreSeven +
    ScoreEight +
    ScoreNine +
    ScoreTen +
    ScoreEleven +
    ScoreTwelve +
    ScoreThirteen +
    ScoreFourteen +
    ScoreFifteen +
    ScoreSixteen +
    ScoreSeventeen +
    ScoreEightteen +
    ScoreNineteen +
    ScoreTwenty +
    ScoreTwentyOne +
    ScoreTwentyTwo +
    ScoreTwentyThree;

  props.setTotal(TotalVal);
  //Addition Functionality end

  let senCompletelyLimited = watch("senCompletelyLimited");
  let senVeryLimited = watch("senVeryLimited");
  let senSlightlyLimited = watch("senSlightlyLimited");
  let senNoImpairment = watch("senNoImpairment");

  let moiCompletelyLimited = watch("moiCompletelyLimited");
  let moiVeryLimited = watch("moiVeryLimited");
  let moiOccasionallyMoist = watch("moiOccasionallyMoist");
  let moiRarelyMoist = watch("moiRarelyMoist");

  let actBedLying = watch("actBedLying");
  let actChairDependent = watch("actChairDependent");
  let actWalksOccasionally = watch("actWalksOccasionally");
  let actWalksFrequently = watch("actWalksFrequently");

  let mobCompletelyLimited = watch("mobCompletelyLimited");
  let mobVeryLimited = watch("mobVeryLimited");
  let mobSlightlyLimited = watch("mobSlightlyLimited");
  let mobNoImpairment = watch("mobNoImpairment");

  let nutVeryPoor = watch("nutVeryPoor");
  let nutProbablyInadequate = watch("nutProbablyInadequate");
  let nutAdequate = watch("nutAdequate");
  let nutExcellent = watch("nutExcellent");

  let friProblem = watch("friProblem");
  let friPotentialProblem = watch("friPotentialProblem");
  let friNoApparentProblem = watch("friNoApparentProblem");

  let senCompletelyLimitedFlag =
    senVeryLimited || senSlightlyLimited || senNoImpairment;
  let senVeryLimitedFlag =
    senCompletelyLimited || senSlightlyLimited || senNoImpairment;
  let senSlightlyLimitedFlag =
    senCompletelyLimited || senVeryLimited || senNoImpairment;
  let senNoImpairmentFlag =
    senCompletelyLimited || senSlightlyLimited || senVeryLimited;

  let moiCompletelyLimitedFlag =
    moiVeryLimited || moiOccasionallyMoist || moiRarelyMoist;
  let moiVeryLimitedFlag =
    moiCompletelyLimited || moiOccasionallyMoist || moiRarelyMoist;
  let moiOccasionallyMoistFlag =
    moiCompletelyLimited || moiVeryLimited || moiRarelyMoist;
  let moiRarelyMoistFlag =
    moiCompletelyLimited || moiVeryLimited || moiOccasionallyMoist;

  let actBedLyingFlag =
    actChairDependent || actWalksOccasionally || actWalksFrequently;
  let actChairDependentFlag =
    actBedLying || actWalksOccasionally || actWalksFrequently;
  let actWalksOccasionallyFlag =
    actBedLying || actChairDependent || actWalksFrequently;
  let actWalksFrequentlyFlag =
    actBedLying || actChairDependent || actWalksOccasionally;

  let mobCompletelyLimitedFlag =
    mobVeryLimited || mobSlightlyLimited || mobNoImpairment;
  let mobVeryLimitedFlag =
    mobCompletelyLimited || mobSlightlyLimited || mobNoImpairment;
  let mobSlightlyLimitedFlag =
    mobCompletelyLimited || mobVeryLimited || mobNoImpairment;
  let mobNoImpairmentFlag =
    mobCompletelyLimited || mobVeryLimited || mobSlightlyLimited;

  let nutVeryPoorFlag = nutProbablyInadequate || nutAdequate || nutExcellent;
  let nutProbablyInadequateFlag = nutVeryPoor || nutAdequate || nutExcellent;
  let nutAdequateFlag = nutVeryPoor || nutProbablyInadequate || nutExcellent;
  let nutExcellentFlag = nutVeryPoor || nutProbablyInadequate || nutAdequate;

  let friProblemFlag = friPotentialProblem || friNoApparentProblem;
  let friPotentialProblemFlag = friProblem || friNoApparentProblem;
  let friNoApparentProblemFlag = friProblem || friPotentialProblem;

  return (
    <>
      <div className="w-auto grid">
        <form
          className="grid grid-cols-1 w-full gap-2 "
          onSubmit={handleSubmit(onSubmitDataHandler)}
        >
          <TableContainer sx={{ marginTop: "0rem" }} className="rounded ">
            <Table size="small">
              <TableHead>
                <TableRow
                  className="bg-gray-100"
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold whitespace-nowrap">
                      Braden Scale
                    </span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      textAlign: "center",
                    }}
                  >
                    <span className="font-bold whitespace-nowrap">Scoring</span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                      width: "12rem",
                      textAlign: "center",
                    }}
                  >
                    <span className="font-bold whitespace-nowrap">Mark</span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* 1 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Sensory Perception</span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Completely Limited</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={senCompletelyLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="senCompletelyLimited"
                        label=""
                        value="senCompletelyLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Very Limited </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={senVeryLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="senVeryLimited"
                        label=""
                        value="senVeryLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3"> 3. Slightly Limited</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={senSlightlyLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="senSlightlyLimited"
                        label=""
                        value="senSlightlyLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 4 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3"> 4. No Impairment</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={senNoImpairmentFlag}>
                      <CheckBoxField
                        control={control}
                        name="senNoImpairment"
                        label=""
                        value="senNoImpairment"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>

                {/* 2 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Moisture</span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Completely Limited</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={moiCompletelyLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="moiCompletelyLimited"
                        label=""
                        value="moiCompletelyLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Very Limited </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={moiVeryLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="moiVeryLimited"
                        label=""
                        value="moiVeryLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">3. Occasionally Moist </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={moiOccasionallyMoistFlag}>
                      <CheckBoxField
                        control={control}
                        name="moiOccasionallyMoist"
                        label=""
                        value="moiOccasionallyMoist"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 4 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">4. Rarely Moist</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={moiRarelyMoistFlag}>
                      <CheckBoxField
                        control={control}
                        name="moiRarelyMoist"
                        label=""
                        value="moiRarelyMoist"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>

                {/* 3 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Activity</span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Bed Lying </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={actBedLyingFlag}>
                      <CheckBoxField
                        control={control}
                        name="actBedLying"
                        label=""
                        value="actBedLying"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Chair Dependent </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={actChairDependentFlag}>
                      <CheckBoxField
                        control={control}
                        name="actChairDependent"
                        label=""
                        value="actChairDependent"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">3. Walks Occasionally </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={actWalksOccasionallyFlag}>
                      <CheckBoxField
                        control={control}
                        name="actWalksOccasionally"
                        label=""
                        value="actWalksOccasionally"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 4 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">4. Walks Frequently</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={actWalksFrequentlyFlag}>
                      <CheckBoxField
                        control={control}
                        name="actWalksFrequently"
                        label=""
                        value="actWalksFrequently"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>

                {/* 4 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Mobility </span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Completely Limited </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={mobCompletelyLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="mobCompletelyLimited"
                        label=""
                        value="mobCompletelyLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Very Limited </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={mobVeryLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="mobVeryLimited"
                        label=""
                        value="mobVeryLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">3. Slightly Limited </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={mobSlightlyLimitedFlag}>
                      <CheckBoxField
                        control={control}
                        name="mobSlightlyLimited"
                        label=""
                        value="mobSlightlyLimited"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 4 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">4. No Impairment</span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={mobNoImpairmentFlag}>
                      <CheckBoxField
                        control={control}
                        name="mobNoImpairment"
                        label=""
                        value="mobNoImpairment"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>

                {/* 5 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Nutrition </span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Very Poor </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={nutVeryPoorFlag}>
                      <CheckBoxField
                        control={control}
                        name="nutVeryPoor"
                        label=""
                        value="nutVeryPoor"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Probably Inadequate </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={nutProbablyInadequateFlag}>
                      <CheckBoxField
                        control={control}
                        name="nutProbablyInadequate"
                        label=""
                        value="nutProbablyInadequate"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">3. Adequate </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={nutAdequateFlag}>
                      <CheckBoxField
                        control={control}
                        name="nutAdequate"
                        label=""
                        value="nutAdequate"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 4 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">4. Excellent </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={nutExcellentFlag}>
                      <CheckBoxField
                        control={control}
                        name="nutExcellent"
                        label=""
                        value="nutExcellent"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>

                {/* 6 Head */}
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="font-bold">Friction And Shear </span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderRight: "1px solid lightGray",
                      borderLeft: "1px solid lightGray",
                    }}
                  ></TableCell>

                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGray",
                    }}
                  ></TableCell>
                </TableRow>
                {/* 1 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">1. Problem </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    30
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={friProblemFlag}>
                      <CheckBoxField
                        control={control}
                        name="friProblem"
                        label=""
                        value="friProblem"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 2 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">2. Potential Problem </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={friPotentialProblemFlag}>
                      <CheckBoxField
                        control={control}
                        name="friPotentialProblem"
                        label=""
                        value="friPotentialProblem"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
                {/* 3 */}
                <TableRow
                  sx={{
                    "& td": {
                      paddingY: 0,
                    },
                  }}
                >
                  <TableCell style={{ borderLeft: "1px solid lightGray" }}>
                    <span className="pl-3">3. No Apparent Problem </span>
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    style={{
                      borderLeft: "1px solid lightGray",
                      borderRight: "1px solid lightGrey",
                      textAlign: "center",
                    }}
                  >
                    <fieldset disabled={friNoApparentProblemFlag}>
                      <CheckBoxField
                        control={control}
                        name="friNoApparentProblem"
                        label=""
                        value="friNoApparentProblem"
                      />
                    </fieldset>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex gap-2 justify-end mt-3 mx-2">
            <ResetButton onClick={() => reset(defaultValues)} />
            <OnClickSaveButton
              onClick={() => {
                handleSubmit(onSubmitDataHandler)();
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
