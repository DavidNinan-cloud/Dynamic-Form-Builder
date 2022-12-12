import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import OnClickSaveButton from "../../../../../../Common Components/Buttons/OnClickSaveButton";
import OnClickUpdateButton from "../../../../../../Common Components/Buttons/OnClickUpdateButton";
import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import { VisitContext } from "../../../ClinicalCareChart";
import {
  addNewPatientAssessment,
  getPatientFallAssessment,
} from "../../../../services/nursingServices/painAssessment/PainAssessmentService";

export default function PatientFallAssessmentTable(props) {
  const schema = yup.object().shape({
    Age: yup
      .string()
      .nullable()
      .required("Please select at least one option"),

    Elimination: yup
      .string()
      .nullable()
      .required("Please select at least one option"),

    Medications: yup
      .string()
      .nullable()
      .required("Please select at least one option"),

    PatientCareEquipment: yup
      .string()
      .nullable()
      .required("Please select at least one option"),

    Mobility: yup.boolean().oneOf([true], "Please select at least one option"),

    Cognition: yup.boolean().oneOf([true], "Please select at least one option"),
  });

  const defaultValues = {
    Age: null,
    Elimination: null,
    Medications: null,
    PatientCareEquipment: null,
    FallHistory: null,
    mobility: [],
    cognition: [],
    lowRisk: [],
    highRisk: [],
  };

  //state variable to close the confirmation modal for POST request
  const closeAddConfirmation = () => {
    if (openPostConfirmation) {
      setPostConfirmation(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const closeUpdateConfirmation = () => {
    if (openUpdateConfirmation) {
      setUpdateConfirmation(false);
    }
  };

  //event listener function for the Add button of the confirmation modal
  function addNewPatientFallInfo() {
    //Close the confirmation modal
    closeAddConfirmation();

    setOpenBackdrop(true);

    console.log("The Add button of the confirmation modal has been clicked");

    //post request
    addNewPatientAssessment(formData)
      .then((response) => {
        setOpenBackdrop(false);
        console.log("The response of the painassessment service is", response);
      })
      .catch((error) => {
        setOpenBackdrop(false);
        console.log("The error of the painassessment service is  ", error);
      });
  }

  //event listener function for the Update button of the confirmation modal
  function updatePatientFallInfo() {
    //Close the confirmation modal
    closeUpdateConfirmation();

    setOpenBackdrop(true);

    console.log("The Update button of the confirmation modal has been clicked");

    console.log("formData in updatePatientInfo function is ", formData);

    //Post request
    addNewPatientAssessment(formData)
      .then((response) => {
        setOpenBackdrop(false);
        // successAlert(result.data.message);
        console.log("The response of the post request is ", response);
      })
      .catch((error) => {
        // errorAlert(error.message);
        setOpenBackdrop(false);
      });
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [formData, setFormData] = React.useState({});

  const [existingPatientId, setExistingPatientId] = React.useState(null);

  //state variable to open the confirmation modal adding the patient data
  const [openPostConfirmation, setPostConfirmation] = React.useState(false);

  //state variable to open and close the confirmation modal for updation
  const [openUpdateConfirmation, setUpdateConfirmation] = React.useState(false);

  let ageVal = watch("Age");
  let eliminationVal = watch("Elimination");
  let medicationsVal = watch("Medications");
  let fallHistoryVal = watch("FallHistory");
  let patientCareEquipementVal = watch("PatientCareEquipment");
  let mobilityVal = watch("mobility");
  let cognitionVal = watch("cognition");

  let ageValElement = 0;
  let fallHistoryValElement = 0;
  let eliminationValElement = 0;
  let medicationsValElement = 0;
  let patientCareEquipementValElement = 0;
  let mobilityScore = 0;
  let cognitionScore = 0;

  props.setVipScoreValue(
    ageValElement +
      fallHistoryValElement +
      eliminationValElement +
      medicationsValElement +
      patientCareEquipementValElement +
      mobilityScore +
      cognitionScore
  );

  // Context
  const patientVisitId = useContext(VisitContext);

  //Calculating the display of ageVal for the table.
  if (ageVal === "60 - 69 years") {
    ageValElement = 1;
  } else if (ageVal === "70 -79 years") {
    ageValElement = 2;
  } else if (ageVal === "Greater than or equal to 80 years") {
    ageValElement = 3;
  }

  //Calculating the display of fallHistoryVal for the table.
  if (fallHistoryVal === "One fall within 6 months before admissions") {
    fallHistoryValElement = 5;
  }

  //Calculating the display of eliminationVal for the table.
  if (eliminationVal === "Incontinence") {
    eliminationValElement = 2;
  } else if (eliminationVal === "Urgency or frequency") {
    eliminationValElement = 2;
  } else if (eliminationVal === "Urgency/frequency and incontinence") {
    eliminationValElement = 4;
  }

  if (medicationsVal === "On 1 high fall risk drug") {
    medicationsValElement = 3;
  } else if (medicationsVal === "On 2 or more high fall risk drugs") {
    medicationsValElement = 5;
  } else if (medicationsVal === "Sedated procedure within past 24 hours") {
    medicationsValElement = 7;
  }

  if (patientCareEquipementVal === "One present") {
    patientCareEquipementValElement = 1;
  } else if (patientCareEquipementVal === "Two present") {
    patientCareEquipementValElement = 2;
  } else if (patientCareEquipementVal === "3 or more present") {
    patientCareEquipementValElement = 3;
  }

  //calculating mobility score
  if (mobilityVal.length > 0) {
    let m = 0;
    for (let scoreString of mobilityVal) {
      if (
        scoreString ===
        "Requires assistance or supervision for mobility, transfer,or ambulation (2 points)"
      ) {
        m = m + 2;
      }

      if (scoreString === "Unsteady gait (2 points)") {
        m = m + 2;
      }

      if (
        scoreString ===
        "Visual or auditory impairment affecting mobility (2 points)"
      ) {
        m = m + 2;
      }

      mobilityScore = m;
    }
  }

  // calculating cognition score
  if (cognitionVal.length > 0) {
    let c = 0;
    for (let scoreString of cognitionVal) {
      if (
        scoreString ===
        "Altered awareness of immediate physical environment (1 point)"
      ) {
        c = c + 1;
      }

      if (scoreString === "Impulsive (2 points)") {
        c = c + 2;
      }

      if (
        scoreString ===
        "Lack of understanding of one's physical and cognitive limitations (4 points)"
      ) {
        c = c + 4;
      }
    }
    cognitionScore = c;
  }

  const [patientFallInfo, setPatientFallInfo] = React.useState("");

  console.log("patientVisitId is ", patientVisitId);

  //useEffect to fetch the information , if it exists
  React.useEffect(() => {
    //get the patient fall assessment information , if the patientVisitID exists
    if (patientVisitId) {
      getPatientFallAssessment(patientVisitId)
        .then((response) => {
          console.log("Patient Fall Assessment information is ", response);

          //if the result is empty then open the confirmation modal for adding the record
          //if the result is not empty then open the confirmation modal for updating the record
          if (response.data.hasOwnProperty("result")) {
            setPatientFallInfo(response.data.result);
            setExistingPatientId(response.data.result.id);

            let resetObj = {
              Age: "",
              Elimination: "",
              FallHistory: "",
              Medications: "",
              PatientCareEquipment: "",
              cognition: [],
              highRisk: [],
              lowRisk: [],
              mobility: [],
            };

            resetObj.Age = response.data.result.age.scoreValue;
            resetObj.Elimination = response.data.result.elimination.scoreValue;
            resetObj.FallHistory = response.data.result.fallHistory.scoreValue;
            resetObj.Medications = response.data.result.medications.scoreValue;
            resetObj.PatientCareEquipment =
              response.data.result.patientCareEquipment.scoreValue;

            resetObj.cognition = [
              ...response.data.result.cognition.particularValues,
            ];

            resetObj.mobility = [
              ...response.data.result.mobility.particularValues,
            ];

            console.log("The resetObj for the patientVisit id 1256 is ");

            console.log(resetObj);

            reset(resetObj);
          }
        })
        .catch((error) => {
          console.log("error object is ", error);
        });
    }
  }, []);

  React.useEffect(() => {
    console.log("existingPatientId is ", existingPatientId);
  }, [existingPatientId]);

  //The function to submit the form data
  function submitForm(data) {
    console.log("table data is ", data);
    let vipValue;

    let vipScore =
      ageValElement +
      eliminationValElement +
      fallHistoryValElement +
      medicationsValElement +
      patientCareEquipementValElement +
      mobilityScore +
      cognitionScore;

    if (vipScore == 6 && vipScore <= 13) {
      vipValue = "Moderate Fall Risk";
    } else if (vipScore > 13) {
      vipValue = "High Fall Risk";
    }

    let postObj;

    if (patientFallInfo === "" && existingPatientId === null) {
      postObj = {
        age: {
          score: ageValElement,
          scoreValue: ageVal,
        },
        elimination: {
          score: eliminationValElement,
          scoreValue: eliminationVal,
        },
        fallHistory: {
          score: fallHistoryValElement,
          scoreValue: fallHistoryVal,
        },
        medications: {
          score: medicationsValElement,
          scoreValue: medicationsVal,
        },
        patientCareEquipment: {
          score: patientCareEquipementValElement,
          scoreValue: patientCareEquipementVal,
        },

        mobility: {
          particularValues: data.mobility,
          score: mobilityScore,
        },

        cognition: {
          particularValues: data.cognition,
          score: cognitionScore,
        },

        highRisk: [],

        id: null,

        lowRisk: [],

        vipScore: vipScore,
        vipValue: vipValue,
        visitId: patientVisitId,
      };

      //open the confirmation modal for adding new patient
      setPostConfirmation(true);
      setFormData(postObj);
    } else if (patientFallInfo !== "" && existingPatientId !== null) {
      postObj = {
        age: {
          score: ageValElement,
          scoreValue: ageVal,
        },
        elimination: {
          score: eliminationValElement,
          scoreValue: eliminationVal,
        },
        fallHistory: {
          score: fallHistoryValElement,
          scoreValue: fallHistoryVal,
        },
        medications: {
          score: medicationsValElement,
          scoreValue: medicationsVal,
        },
        patientCareEquipment: {
          score: patientCareEquipementValElement,
          scoreValue: patientCareEquipementVal,
        },

        mobility: {
          particularValues: data.mobility,
          score: mobilityScore,
        },

        cognition: {
          particularValues: data.cognition,
          score: cognitionScore,
        },

        highRisk: [],

        id: existingPatientId,

        lowRisk: [],

        vipScore: vipScore,
        vipValue: vipValue,
        visitId: patientVisitId,
      };

      //open the confirmation modal for updating the patient data
      setUpdateConfirmation(true);
      setFormData(postObj);
    }

    console.log("postObj is ", postObj);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    paddingY: 0.5,
                    backgroundColor: "#EBB700",
                  },
                }}
              >
                <TableCell
                  className="text-lg whitespace-nowrap"
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center">
                    <p className="text-black">
                      FALL RISK SCORE CALCULATION &nbsp; - &nbsp;
                    </p>
                    <p className="text-black text-sm">
                      Select the appropriate option in each category. Add all
                      points to calculate Fall Risk Score.
                      <br /> (If no option is selected, score for category is 0)
                    </p>
                  </div>
                </TableCell>
                <TableCell
                  sx={{ width: 170, textAlign: "center" }}
                  className="text-lg text-center"
                  style={{
                    fontWeight: "bold",
                    borderRight: "1px solid lightGray",
                  }}
                >
                  Points
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">Age</p>
                    <span className="text-gray-700 text-xs font-semibold">
                      (single-select)
                    </span>
                    <span>
                      <p style={{ color: "red" }}>{errors.Age?.message}</p>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label="60 - 69 years"
                      value={"60 - 69 years"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "60 - 69 years") {
                      //     setAgeValue(1);
                      //   }
                      // }}
                      name="Age"
                      {...register("Age")}
                    />
                    <span>60 - 69 years (1 point)</span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"70 -79 years"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "70 -79 years") {
                      //     setAgeValue(2);
                      //   }
                      // }}
                      name="Age"
                      {...register("Age")}
                    />
                    <span className=""> 70 -79 years (2 points)</span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Greater than or equal to 80 years"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (
                      //     e.target.value === "Greater than or equal to 80 years"
                      //   ) {
                      //     setAgeValue(3);
                      //   }
                      // }}
                      name="Age"
                      {...register("Age")}
                    />
                    <span className="">
                      Greater than or equal to 80 years (3 points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <span>{ageValElement}</span>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">
                      Fall History (single-select)
                    </p>
                    <span className="text-gray-700 text-xs font-semibold">
                      {" "}
                      (single-select){" "}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"One fall within 6 months before admissions"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (
                      //     e.target.value ===
                      //     "One fall within 6 months before admissions"
                      //   ) {
                      //     setFallHistory(5);
                      //   }
                      // }}
                      name="FallHistory"
                      {...register("FallHistory")}
                    />

                    <span className="">
                      One fall within 6 months before admission (5 points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{fallHistoryValElement}</p>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">
                      Elimination, Bowel and Urine
                    </p>
                    <span className="text-gray-700 text-xs font-semibold">
                      {" "}
                      (single-select){" "}
                    </span>
                    <span>
                      <p style={{ color: "red" }}>
                        {errors.Elimination?.message}
                      </p>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Incontinence"}
                      {...register("Elimination")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "Incontinence") {
                      //     setEliminationVal(2);
                      //   }
                      // }}
                      name="Elimination"
                    />
                    <span className="">Incontinence (2 points)</span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Urgency or frequency"}
                      {...register("Elimination")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "Urgency or frequency") {
                      //     setEliminationVal(2);
                      //   }
                      // }}
                      name="Elimination"
                    />
                    <span className="">Urgency or frequency (2 points)</span>
                  </div>
                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Urgency/frequency and incontinence"}
                      {...register("Elimination")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (
                      //     e.target.value === "Urgency/frequency and incontinence"
                      //   ) {
                      //     setEliminationVal(4);
                      //   }
                      // }}
                      name="Elimination"
                    />
                    <span className="">
                      Urgency/frequency and incontinence (4 points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{eliminationValElement}</p>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">
                      Medications : &nbsp;
                      <span className="text-sm text-black ">
                        Includes PCA/opiates, anticonvulsants,
                        anti-hypertensives, diuretics, hypnotics, laxatives,
                        sedatives, and psychotropics.
                      </span>
                      <span className="text-gray-700 text-xs font-semibold">
                        (single-select)
                        <span>
                          <p style={{ color: "red" }}>
                            {errors.Medications?.message}
                          </p>
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"On 1 high fall risk drug"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "On 1 high fall risk drug") {
                      //     setMedicationVal(3);
                      //   }
                      // }}
                      name="Medications"
                      {...register("Medications")}
                    />
                    <span className="">
                      On 1 high fall risk drug (3 points)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"On 2 or more high fall risk drugs"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (
                      //     e.target.value === "On 2 or more high fall risk drugs"
                      //   ) {
                      //     setMedicationVal(5);
                      //   }
                      // }}
                      name="Medications"
                      {...register("Medications")}
                    />
                    <span className="">
                      On 2 or more high fall risk drugs (5 points)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Sedated procedure within past 24 hours"}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (
                      //     e.target.value ===
                      //     "Sedated procedure within past 24 hours"
                      //   ) {
                      //     setMedicationVal(7);
                      //   }
                      // }}
                      name="Medications"
                      {...register("Medications")}
                    />
                    <span className="">
                      Sedated procedure within past 24 hours (7 points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{medicationsValElement}</p>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold whitespace-nowrap">
                      Patient Care Equipment :
                    </p>
                    <span>
                      Any equipment that tethers patient (e.g., IV infusion,
                      chest tube, indwelling catheter, SCDs, etc.)
                    </span>
                    <span className="text-gray-700 text-xs font-semibold">
                      (single-select)
                    </span>
                    <span style={{ color: "red" }}>
                      {errors.PatientCareEquipment?.message}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"One present"}
                      name="PatientCareEquipment"
                      {...register("PatientCareEquipment")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "One present") {
                      //     setCareEquipment(1);
                      //   }
                      // }}
                    />
                    <span className="">One present (1 point)</span>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"Two present"}
                      name="PatientCareEquipment"
                      {...register("PatientCareEquipment")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "Two present") {
                      //     setCareEquipment(2);
                      //   }
                      // }}
                    />
                    <span className="">Two present (2 points)</span>
                  </div>
                  <div className="flex items-center gap-2 py-3">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      label=""
                      value={"3 or more present"}
                      name="PatientCareEquipment"
                      {...register("PatientCareEquipment")}
                      // onChange={(e) => {
                      //   console.log("The event object is ", e);
                      //   console.log("The age is ", e.target.value);
                      //   if (e.target.value === "3 or more present") {
                      //     setCareEquipment(3);
                      //   }
                      // }}
                    />
                    <span className="">3 or more present (3 points)</span>
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{patientCareEquipementValElement}</p>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">
                      Mobility
                    </p>
                    <span className="text-gray-700 text-xs font-semibold">
                      (Multi-select)
                      <span style={{ color: "red" }}>
                        {/* {errors.Mobility?.message} */}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      name="mobility"
                      label=""
                      value="Requires assistance or supervision for mobility, transfer,or ambulation (2 points)"
                      {...register("mobility")}
                      // onChange={(event) => {
                      //   if (event.currentTarget.checked) {
                      //     setMobilityScore(mobilityScore + 2);
                      //   } else {
                      //     setMobilityScore(mobilityScore - 2);
                      //   }
                      // }}
                    />
                    <span className="">
                      Requires assistance or supervision for mobility, transfer,
                      or ambulation (2 points)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      name="mobility"
                      label=""
                      value="Unsteady gait (2 points)"
                      {...register("mobility")}
                      // onChange={(event) => {
                      //   if (event.currentTarget.checked) {
                      //     setMobilityScore(mobilityScore + 2);
                      //   } else {
                      //     setMobilityScore(mobilityScore - 2);
                      //   }
                      // }}
                    />
                    <span className="">Unsteady gait (2 points)</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      name="mobility"
                      label=""
                      value="Visual or auditory impairment affecting mobility (2 points)"
                      {...register("mobility")}
                      // onChange={(event) => {
                      //   if (event.currentTarget.checked) {
                      //     setMobilityScore(mobilityScore + 2);
                      //   } else {
                      //     setMobilityScore(mobilityScore - 2);
                      //   }
                      // }}
                    />
                    <span className="">
                      Visual or auditory impairment affecting mobility (2
                      points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{mobilityScore}</p>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td": {
                    paddingY: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid lightGray",
                    fontWeight: "bold",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base text-black font-semibold">
                      Cognition
                    </p>
                    <span className="text-gray-700 text-xs font-semibold">
                      (Multi-select)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      // name="cognition"
                      label=""
                      value="Altered awareness of immediate physical environment (1 point)"
                      // defaultValue={0}
                      {...register("cognition")}
                      // onChange={onChangeCognitionValue}
                    />
                    <span className="">
                      Altered awareness of immediate physical environment (1
                      point)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      // name="cognition"
                      label=""
                      value="Impulsive (2 points)"
                      // defaultValue={0}
                      {...register("cognition")}
                      // onChange={onChangeCognitionValueTwo}
                    />
                    <span className="">Impulsive (2 points)</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      // name="cognition"
                      label=""
                      value="Lack of understanding of one's physical and cognitive limitations (4 points)"
                      // defaultValue={0}
                      {...register("cognition")}
                      // onChange={onChangeCognitionValueThree}
                    />
                    <span className="">
                      Lack of understanding of one's physical and cognitive
                      limitations (4 points)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    borderLeft: "1px solid lightGray",
                    borderRight: "1px solid lightGray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>{cognitionScore}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {props.showTableButton === true && patientFallInfo === "" ? (
          <div className="flex gap-2 justify-end mt-2">
            <ResetButton onClick={() => reset(defaultValues)} />
            <OnClickSaveButton
              onClick={() => {
                handleSubmit(submitForm)();
              }}
            />
          </div>
        ) : (
          <div className="flex gap-2 justify-end mt-2">
            <ResetButton onClick={() => reset(defaultValues)} />
            <OnClickUpdateButton
              onClick={() => {
                handleSubmit(submitForm)();
              }}
            />
          </div>
        )}
      </form>

      {/* Backdrop component to disable the screen after submitting the form */}
      <CommonBackDrop openBackdrop={openBackdrop} />

      {/* Confirmation modal for PUT request */}
      <ConfirmationModal
        confirmationOpen={openUpdateConfirmation}
        confirmationHandleClose={closeUpdateConfirmation}
        confirmationSubmitFunc={updatePatientFallInfo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to update this assessment ?"
        confirmationButtonMsg="Update"
      />

      {/* Confirmation modal for POST request */}
      <ConfirmationModal
        confirmationOpen={openPostConfirmation}
        confirmationHandleClose={closeAddConfirmation}
        confirmationSubmitFunc={addNewPatientFallInfo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}
