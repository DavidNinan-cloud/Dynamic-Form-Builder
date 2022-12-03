import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";

export default function BedScoreTable(props) {
  const { control, watch } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    console.log(data);
  };

  const defaultValues = {
    textOne: false,
    textTwo: false,
    textThree: false,
    textFour: false,
    textFive: false,
    textSix: false,
    textSeven: false,
    textEight: false,
    textNine: false,
    textTen: false,
    textEleven: false,
    textTwelve: false,
    textThirteen: false,
    textFourteen: false,
    textFifteen: false,
    textSixteen: false,
    textSeventeen: false,
    textEighteen: false,
    textNineteen: false,
    textTwenty: false,
    textTwentyOne: false,
    textTwentyTwo: false,
    textTwentythree: false,
  };

  //Addition functionality Start
  let ScoreOne = 0;
  watch("textOne") ? (ScoreOne = 30) : (ScoreOne = 0);

  let ScoreTwo = 0;
  watch("textTwo") ? (ScoreTwo = 15) : (ScoreTwo = 0);

  let ScoreThree = 0;
  watch("textThree") ? (ScoreThree = 10) : (ScoreThree = 0);

  let ScoreFour = 0;
  watch("textFour") ? (ScoreFour = 0) : (ScoreFour = 0);

  let ScoreFive = 0;
  watch("textFive") ? (ScoreFive = 30) : (ScoreFive = 0);

  let ScoreSix = 0;
  watch("textSix") ? (ScoreSix = 15) : (ScoreSix = 0);

  let ScoreSeven = 0;
  watch("textSeven") ? (ScoreSeven = 10) : (ScoreSeven = 0);

  let ScoreEight = 0;
  watch("textEight") ? (ScoreEight = 0) : (ScoreEight = 0);

  let ScoreNine = 0;
  watch("textNine") ? (ScoreNine = 30) : (ScoreNine = 0);

  let ScoreTen = 0;
  watch("textTen") ? (ScoreTen = 15) : (ScoreTen = 0);

  let ScoreEleven = 0;
  watch("textEleven") ? (ScoreEleven = 10) : (ScoreEleven = 0);

  let ScoreTwelve = 0;
  watch("textTwelve") ? (ScoreTwelve = 0) : (ScoreTwelve = 0);

  let ScoreThirteen = 0;
  watch("textThirteen") ? (ScoreThirteen = 30) : (ScoreTen = 0);

  let ScoreFourteen = 0;
  watch("textFourteen") ? (ScoreFourteen = 15) : (ScoreFourteen = 0);

  let ScoreFifteen = 0;
  watch("textFifteen") ? (ScoreFifteen = 10) : (ScoreFifteen = 0);

  let ScoreSixteen = 0;
  watch("textSixteen") ? (ScoreSixteen = 0) : (ScoreSixteen = 0);

  let ScoreSeventeen = 0;
  watch("textSeventeen") ? (ScoreSeventeen = 30) : (ScoreSeventeen = 0);

  let ScoreEightteen = 0;
  watch("textEighteen") ? (ScoreEightteen = 15) : (ScoreEightteen = 0);

  let ScoreNineteen = 0;
  watch("textNineteen") ? (ScoreNineteen = 10) : (ScoreNineteen = 0);

  let ScoreTwenty = 0;
  watch("textTwenty") ? (ScoreTwenty = 0) : (ScoreTwenty = 0);

  let ScoreTwentyOne = 0;
  watch("textTwentyOne") ? (ScoreTwentyOne = 30) : (ScoreTwentyOne = 0);

  let ScoreTwentyTwo = 0;
  watch("textTwentyTwo") ? (ScoreTwentyTwo = 15) : (ScoreTwentyTwo = 0);

  let ScoreTwentyThree = 0;
  watch("textTwentyThree") ? (ScoreTwentyThree = 0) : (ScoreTwentyThree = 0);

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

  let textOne = watch("textOne");
  let textTwo = watch("textTwo");
  let textThree = watch("textThree");
  let textFour = watch("textFour");

  let textFive = watch("textFive");
  let textSix = watch("textSix");
  let textSeven = watch("textSeven");
  let textEight = watch("textEight");

  let textNine = watch("textNine");
  let textTen = watch("textTen");
  let textEleven = watch("textEleven");
  let textTwelve = watch("textTwelve");

  let textThirteen = watch("textThirteen");
  let textFourteen = watch("textFourteen");
  let textFifteen = watch("textFifteen");
  let textSixteen = watch("textSixteen");

  let textSeventeen = watch("textSeventeen");
  let textEighteen = watch("textEighteen");
  let textNineteen = watch("textNineteen");
  let textTwenty = watch("textTwenty");

  let textTwentyOne = watch("textTwentyOne");
  let textTwentyTwo = watch("textTwentyTwo");
  let textTwentyThree = watch("textTwentyThree");

  let textOneFlag = textTwo || textThree || textFour;
  let textTwoFlag = textOne || textThree || textFour;
  let textThreeFlag = textOne || textTwo || textFour;
  let textFourFlag = textOne || textThree || textTwo;

  let textFiveFlag = textSix || textSeven || textEight;
  let textSixFlag = textFive || textSeven || textEight;
  let textSevenFlag = textFive || textSix || textEight;
  let textEightFlag = textFive || textSix || textSeven;

  let textNineFlag = textTen || textEleven || textTwelve;
  let textTenFlag = textNine || textEleven || textTwelve;
  let textElevenFlag = textNine || textTen || textTwelve;
  let textTwelveFlag = textNine || textTen || textEleven;

  let textThirteenFlag = textFourteen || textFifteen || textSixteen;
  let textFourteenFlag = textThirteen || textFifteen || textSixteen;
  let textFifteenFlag = textThirteen || textFourteen || textSixteen;
  let textSixteenFlag = textThirteen || textFourteen || textFifteen;

  let textSeventeenFlag = textEighteen || textNineteen || textTwenty;
  let textEighteenFlag = textSeventeen || textNineteen || textTwenty;
  let textNineteenFlag = textSeventeen || textEighteen || textTwenty;
  let textTwentyFlag = textSeventeen || textEighteen || textNineteen;

  let textTwentyOneFlag = textTwentyTwo || textTwentyThree;
  let textTwentyTwoFlag = textTwentyOne || textTwentyThree;
  let textTwentyThreeFlag = textTwentyOne || textTwentyTwo;

  return (
    <>
      <div className="w-auto grid">
        {/* <form onSubmit={handleSubmit(onSubmitDataHandler)}> */}
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
                  <fieldset disabled={textOneFlag}>
                    <CheckBoxField
                      control={control}
                      name="textOne"
                      label=""
                      value="textOne"
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
                  <fieldset disabled={textTwoFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwo"
                      label=""
                      value="textTwo"
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
                  <fieldset disabled={textThreeFlag}>
                    <CheckBoxField
                      control={control}
                      name="textThree"
                      label=""
                      value="textThree"
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
                  <fieldset disabled={textFourFlag}>
                    <CheckBoxField
                      control={control}
                      name="textFour"
                      label=""
                      value="textFour"
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
                  <fieldset disabled={textFiveFlag}>
                    <CheckBoxField
                      control={control}
                      name="textFive"
                      label=""
                      value="textFive"
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
                  <fieldset disabled={textSixFlag}>
                    <CheckBoxField
                      control={control}
                      name="textSix"
                      label=""
                      value="textSix"
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
                  <fieldset disabled={textSevenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textSeven"
                      label=""
                      value="textSeven"
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
                  <fieldset disabled={textEightFlag}>
                    <CheckBoxField
                      control={control}
                      name="textEight"
                      label=""
                      value="textEight"
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
                  <fieldset disabled={textNineFlag}>
                    <CheckBoxField
                      control={control}
                      name="textNine"
                      label=""
                      value="textNine"
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
                  <fieldset disabled={textTenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTen"
                      label=""
                      value="textTen"
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
                  <fieldset disabled={textElevenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textEleven"
                      label=""
                      value="textEleven"
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
                  <fieldset disabled={textTwelveFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwelve"
                      label=""
                      value="textTwelve"
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
                  <fieldset disabled={textThirteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textThirteen"
                      label=""
                      value="textThirteen"
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
                  <fieldset disabled={textFourteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textFourteen"
                      label=""
                      value="textFourteen"
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
                  <fieldset disabled={textFifteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textFifteen"
                      label=""
                      value="textFifteen"
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
                  <fieldset disabled={textSixteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textSixteen"
                      label=""
                      value="textSixteen"
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
                  <fieldset disabled={textSeventeenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textSeventeen"
                      label=""
                      value="textSeventeen"
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
                  <fieldset disabled={textEighteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textEighteen"
                      label=""
                      value="textEighteen"
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
                  <fieldset disabled={textNineteenFlag}>
                    <CheckBoxField
                      control={control}
                      name="textNineteen"
                      label=""
                      value="textNineteen"
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
                  <fieldset disabled={textTwentyFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwenty"
                      label=""
                      value="textTwenty"
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
                  <fieldset disabled={textTwentyOneFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwentyOne"
                      label=""
                      value="textTwentyOne"
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
                  <fieldset disabled={textTwentyTwoFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwentyTwo"
                      label=""
                      value="textTwentyTwo"
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
                  <fieldset disabled={textTwentyThreeFlag}>
                    <CheckBoxField
                      control={control}
                      name="textTwentyThree"
                      label=""
                      value="textTwentyThree"
                    />
                  </fieldset>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* </form> */}
      </div>
    </>
  );
}
