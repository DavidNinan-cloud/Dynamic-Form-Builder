import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { quickRegistrationValidationSchema } from "../../Common Components/formSchema/Registration Schema/quickRegistrationValidationSchema";

import BlankProfile from "../../assets/Images/blankProfile.jpeg";
import BasicInfo from "../Patient Registration Form/BasicInfo";
import AddressInfo from "../Patient Registration Form/AddressInfo";
import ReferralDoctor from "../Patient Registration Form/ReferralDoctor";
import VisitInfo from "./VisitInfo";
import {
  registerPatientVisit,
  getpatientInfoById,
  getpatientInfoByApptId,
  getUnitsDropDown,
  getArea,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { Grid } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useNavigate, Navigate } from "react-router-dom";
import {
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { getBloodGroup } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getMaritalStatus } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

let unitId;
let billingData = {};
const QuickRegistrationForm = () => {
  //useState to Expanded Accordion
  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal5, setExpandPanal5] = useState(true);
  const [expandPanal8, setExpandPanal8] = useState(true);
  //useState to show Error Message for useFieldArray

  //useState to get Age based on selected DOB
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  //useState to setProfile Pic for Patient
  const [profilePic, setProfilePic] = useState(BlankProfile);
  const [profilePicName, setProfilePicName] = React.useState();
  // const [regDate, setRegDate] = React.useState(new Date());
  const [patientCategoryValue, setPatientCategoryValue] = useState(false);

  const [value, setValue] = React.useState(new Date());

  const [bloodgroups, setBloodgroups] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [pincodeId, setPincodeId] = useState(0);

  //useState to Identification Document File for Patient
  const [identificationDocFile, setIdentificationDocFile] = useState("");
  const [identificationDocFileName, setIdentificationDocFileName] = useState(
    null
  );
  const [searchData, setSearchData] = useState(null);

  const [units, setUnits] = React.useState();
  const [unitId, setUnitId] = React.useState(0);
  const [showUnits, setShowUnits] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [area, setArea] = useState();
  const [selectedDoc, setSelectedDoc] = React.useState();
  const [formData, setFormData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  //
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Set Data from Appointment List
  const location = useLocation();
  // check if data Available
  const [comingData, setComingData] = useState();

  const [disableMobileSearch, setDisableMobileSearch] = useState(false);

  let roleObj = {};

  useEffect(() => {
    roleObj = JSON.parse(localStorage.getItem("loggedUser"));
  }, []);

  useEffect(() => {
    // Units

    // getUnitsDropDown()
    //   .then((response) => response.data)
    //   .then((res) => {
    setUnits(roleObj.units);
    let unitsArr = roleObj.units;
    if (unitsArr.length > 1) {
      methods.setValue("showUnit", true);
      setShowUnits(true);
    } else if (unitsArr.length == 1) {
      methods.setValue("showUnit", false);
      setUnitId(unitsArr[0].id);
      methods.setValue("unit", roleObj.units);
      setShowUnits(false);
    } else {
      methods.setValue("showUnit", false);
      setShowUnits(false);
    }
    // });
  }, []);
  // real useEffect
  useEffect(() => {
    if (location.state !== undefined && location.state !== null) {
      console.log(location.state);
      setComingData(location.state);
      console.log("location not null - PatientId", location.state);
      console.log("PatientId -", location.state.PatientId);
      console.log("AppointmentId -", location.state.AppointmentId);
      let setFieldsThroughPatientId;
      // if (
      //   location.state.PatientId !== null &&
      //   location.state.PatientId !== undefined
      // ) {
      //   setFieldsThroughPatientId = true;
      //   // let myPatient = 14
      //   getpatientInfoById(location.state.PatientId).then((response) => {
      //     console.log("Get request by Patient id", response);
      //     let Values = response.data.result;
      //     setFieldValues(Values, setFieldsThroughPatientId);
      //   });
      // } else
      if (
        location.state.AppointmentId !== null &&
        location.state.AppointmentId !== undefined
      ) {
        setDisableMobileSearch(true);
        setFieldsThroughPatientId = false;
        getpatientInfoByApptId(location.state.AppointmentId).then(
          (response) => {
            console.log("Get request by Appt id", response);
            let Values = response.data.result;
            console.log("AppointmentId Values", Values);
            setUnitId(Values.unit.value);
            setFieldValues(Values);
            methods.setValue("department", null, {
              shouldValidate: false,
            });
            methods.setValue("doctor", null, {
              shouldValidate: false,
            });
          }
        );
      }
    } else {
      console.log("location is null");
    }
  }, []);

  const setFieldValues = (Values) => {
    // if (setFieldsThroughPatientId) {
    //   console.log(Values);
    //   const fields = [
    //     "mobileNumber",
    //     "firstName",
    //     "lastName",
    //     "dob",
    //     "citizenIdProof",
    //     "middleName",
    //     "identificationDocumentNumber",
    //     "email",
    //     "prefix",
    //   ];
    //   fields.forEach((field, i) => {
    //     methods.setValue(field, Values[field], { shouldValidate: true });
    //   });
    //   methods.setValue(
    //     "identificationDocumentNumber",
    //     Values.identificationDocumentNumber
    //   );
    //   methods.setValue("doctor", Values.employee);
    //   methods.setValue("prefix", Values.prefix);

    //   console.log(gender, Values.gender);
    //   methods.setValue("gender", Values.gender.value);
    // } else {
    //   console.log(Values);
    //   // const fields = [
    //   //   "complaints",
    //   //   "firstName",
    //   //   "lastName",
    //   //   "middleName",
    //   //   "mobileNumber",
    //   //   "age",
    //   //   "ageInDays",
    //   //   "ageInMonths",
    //   //   "ageInYears",
    //   //   "appointmentBookingSource",
    //   //   "appointmentType",
    //   //   "citizenIdProof",
    //   //   "prefix"
    //   // ];
    const fieldsa = [
      "complaints",
      "age",
      "appointmentDate",
      "ageInDays",
      "ageInMonths",
      "ageInYears",
      "appointmentBookingSource",
      "appointmentFromTime",
      "appointmentToTime",
      "appointmentType",
      "citizenIdProof",
      "department",
      "cabin",
      "dob",
      // "subDepartment",
      "employee",
      "referType",
      "referBy",
      "mobileNumber",
      "firstName",
      "middleName",
      "lastName",
      "identificationDocumentNumber",
      // "patientType",
      "patientInfo",
      "appointmentStatus",
      "patientVisit",
      "prefix",
      "unit",
    ];
    fieldsa.forEach((field, i) => {
      methods.setValue(field, Values[field]);
    });
    methods.setValue(
      "identificationDocumentNumber",
      Values.identificationDocumentNumber
    );
    methods.setValue("gender", Values.gender.value);
    methods.setValue("referralType", Values.referType);
    methods.setValue("referralDoctor", Values.referBy);
    methods.setValue("visitDate", Values.appointmentDate);
    methods.setValue("doctor", Values.employee);
    methods.setValue("prefix", Values.prefix);
    if (Values.patientInfo) {
      let patientIdData = Values.patientInfo;
      console.log("patientIdData", patientIdData);
      const fieldsb = [
        "area",
        "bloodGroup",
        "city",
        "country",
        "district",
        "email",
        "houseFlatNumber",
        "maritalStatus",
        "mobileNumberOfRepresentative",
        "nameOfRepresentative",
        "nationality",
        "pinCode",
        "relationshipWithPatient",
        "state",
        "streetAddress",
        "taluka",
        // "referBy",
        // "mobileNumber",
        // "firstName",
        // "middleName",
        // "lastName",
        // "identificationDocumentNumber",
        // // "patientType",
        // "patientInfo",
        // "appointmentStatus",
        // "patientVisit",
        // "prefix",
      ];
      fieldsb.forEach((fieldb, i) => {
        if (fieldb == "maritalStatus") {
          console.log("maritalStatus");
          getMaritalStatus()
            .then((response) => {
              let maritalArr = response.data.result;
              let val = maritalArr.find(
                (x) => x.label === patientIdData.maritalStatus
              );
              console.log("value maritalStatus", val);
              if (val) {
                methods.setValue("maritalStatus", val, {
                  shouldValidate: true,
                });
              }
            })
            .catch((response) => {
              console.log(response);
            });
          // let val = maritalStatus.find(x => x.label === patientIdData.maritalStatus)
          // console.log("value",val)
          // methods.setValue("maritalStatus", val ,{shouldValidate:true});
        } else if (fieldb == "bloodGroup") {
          console.log("bloodGroup");
          getBloodGroup()
            .then((response) => {
              let bloodGroupArr = response.data.result;
              let val = bloodGroupArr.find(
                (x) => x.label === patientIdData.bloodGroup
              );
              console.log("value bloodGroup", val);
              if (val) {
                methods.setValue("bloodGroup", val, { shouldValidate: true });
              }
            })
            .catch((response) => {
              console.log(response);
            });
        } else if (fieldb == "area") {
          getArea(patientIdData.pinCode.value)
            .then((response) => {
              let areaArr = response.data.result;
              let val = areaArr.find(
                (x) => x.label === patientIdData.area.label
              );
              console.log("value Area", val);
              if (val) {
                methods.setValue("area", val, {
                  shouldValidate: true,
                });
              }
              setArea(response.data.result);
            })
            .catch((response) => {
              console.log(response);
            });
        } else {
          methods.setValue(fieldb, patientIdData[fieldb], {
            shouldValidate: true,
          });
          methods.setValue("department", null, {
            shouldValidate: false,
          });
          methods.setValue("doctor", null, {
            shouldValidate: false,
          });
          methods.setValue("cabin", null, {
            shouldValidate: false,
          });
        }
      });
    }
  };

  // Call API for visitId and Billing needed Data
  // const [visitId, setVisitId] = useState("007JamesBond");

  const callVisitId = (data) => {
    const firstName = data.firstName;
    const middleName = data.middleName;
    const lastName = data.lastName;
    billingData.PatientName = firstName.concat(" ", middleName, " ", lastName);
    billingData.Age = data.age;
    billingData.MoblieNo = data.mobileNumber;
    billingData.Department = data.department.label;
    billingData.Doctor = data.doctor.label;
    billingData.Category = data.patientCategory.label;
    if (
      data.patientCategory.label.toLowerCase() === "insurance" ||
      data.patientCategory.label.toLowerCase() === "corporate"
    ) {
      billingData.Company = data.company.label;
      billingData.CompanyId = data.company.value;
      // billingData.Company = "DavidInvst";
    } else {
      billingData.Company = "-";
    }
    billingData.unitId = finalObject.unit;
  };

  let defaultValues = {
    showUnit: false,
    showEmail: false,
    unit: null,
    //Basic Info
    isd: {
      id: 1,
      value: 1,
      label: "+91",
    },
    mobileNumber: "",
    registationDate: new Date(),
    prefix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    bloodGroup: null,
    dob: new Date(),
    age: 0,
    ageInYears: "0",
    ageInMonths: "0",
    ageInDays: "0",
    gender: "",
    maritalStatus: "",
    nationality: {
      id: 1,
      value: 1,
      label: "Indian",
    },
    // ethnicity: "",
    // aadharNo: "",
    citizenIdProof: "",
    identificationDocumentNumber: "",

    //Address Info
    houseFlatNumber: "",
    streetAddress: "",
    area: "",
    city: "",
    taluka: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",

    //Referral Doctor
    referralType: "",
    referralDoctor: "",
    //Quick Registration
    visitDate: new Date(),
    // patientType: null,
    visitType: "",
    patientCategory: null,
    company: null,
    tariff: "",
    department: "",
    // subDepartment: "",
    cabin: "",
    doctor: "",
    complaints: "",
    patientSource: "",
  };

  const schema = quickRegistrationValidationSchema;
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    watch,
    trigger,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    clearErrors,
  } = methods;
  useEffect(() => {
    // console.log("Abcd");
    setValue(new Date());
  }, []);

  let departmentValue = methods.watch("department");
  let patientCategoryData = methods.watch("patientCategory");
  useEffect(() => {
    console.log("patientCategoryValue", patientCategoryData);
    if (typeof departmentValue === "undefined") {
      methods.setValue("department", "");
    }
    if (typeof patientCategoryData === "undefined") {
      methods.setValue("patientCategory", null);
    }
    // if (unitValue !== null) {
    //   setUnitId(unitValue.value);
    // }
  }, [departmentValue, patientCategoryData]);

  useEffect(() => {
    console.log("Error", errors);
  }, [errors]);

  const { isLoading, isError, error, mutate, isSuccess } = useMutation(
    registerPatientVisit
  );
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : true);
  // };

  let watchMail = methods.watch("email");
  useEffect(() => {
    if (watchMail !== null && watchMail !== "")
      methods.setValue("showEmail", true);
  }, [watchMail]);

  const handleChangePanal1 = () => {
    setExpandPanal1(!expandPanal1);
  };
  const handleChangePanal5 = () => {
    setExpandPanal5(!expandPanal5);
  };
  const handleChangePanal8 = () => {
    setExpandPanal8(!expandPanal8);
  };

  const handleReset = () => {
    methods.reset(defaultValues);
  };

  const finalObject = {
    //   //Basic Info
    isd: null,
    mobileNumber: null,
    registrationDate: null,
    // profilePicName: null,
    // profilePicBase64Path: null,
    prefix: null,
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    bloodGroup: null,
    dob: null,
    // ageInYears: null,
    // ageInMonths: null,
    // ageInDays: null,
    // age: null,
    gender: null,
    maritalStatus: null,
    nationality: null,
    // ethnicity: "",
    citizenIdProof: null,
    identificationDocumentNumber: null,
    // identificationDocFileName: null,
    // identificationDocFilePath: null,

    //   //Address Info
    houseFlatNumber: null,
    streetAddress: null,
    area: null,
    city: null,
    taluka: null,
    district: null,
    state: null,
    country: null,
    pinCode: null,

    //   //Referral Doctor
    referralType: null,
    referralDoctor: null,

    //Quick Registration
    // visitDate: null,
    // patientType: null,
    patientSource: null,
    visitType: null,
    patientCategory: null,
    company: null,
    tariff: null,
    department: null,
    cabin: null,
    // subDepartment: null,
    employee: null,
    remarkOrReason: null,
  };

  const handleFormSubmit = (data) => {
    setOpen(false);
    setOpenBackdrop(true);
    // myObj.gender=data.gender
    // console.log(myObj)
    // data.age = age;
    console.log(data);
    if (data.unit) {
      if (data.unit.value) {
        finalObject.unit = { id: parseInt(data.unit.value) };
      }
    } else {
      finalObject.unit = { id: parseInt(unitId) };
    }

    if (typeof data.registrationDate === "string") {
      finalObject.registrationDate = data.registrationDate;
    } else {
      let registationYear = data.registrationDate.getFullYear();
      let registationMonth = String(
        data.registrationDate.getMonth() + 1
      ).padStart(2, "0");
      let registrationDay = String(data.registrationDate.getDate()).padStart(
        2,
        "0"
      );
      finalObject.registrationDate =
        registationYear + "-" + registationMonth + "-" + registrationDay;
    }

    // let visitYear = data.visitDate.getFullYear();
    // let visitMonth = String(data.visitDate.getMonth() + 1).padStart(2, "0");
    // let visitDay = String(data.visitDate.getDate()).padStart(2, "0");

    //Assign Data to Final Object
    //Basic Info
    finalObject.isd = { id: parseInt(data.isd.value) };
    finalObject.mobileNumber = data.mobileNumber;
    finalObject.profilePicName = profilePicName;
    let profilePicString = profilePic.toString().split(",")[1];
    finalObject.profilePicBase64Path = profilePicString;
    finalObject.prefix = { id: parseInt(data.prefix.value) };
    data.firstName !== null
      ? (finalObject.firstName =
          data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1))
      : (finalObject.firstName = null);

    data.middleName !== null
      ? (finalObject.middleName =
          data.middleName.charAt(0).toUpperCase() + data.middleName.slice(1))
      : (finalObject.middleName = null);

    data.lastName !== null
      ? (finalObject.lastName =
          data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1))
      : (finalObject.lastName = null);

    data.email !== ""
      ? (finalObject.email = data.email)
      : (finalObject.email = null);
    data.bloodGroup !== null
      ? (finalObject.bloodGroup = data.bloodGroup.label)
      : (finalObject.bloodGroup = null);
    finalObject.dob = data.dob;
    // finalObject.ageInYears = data.ageInYears;
    // finalObject.ageInMonths = data.ageInMonths;
    // finalObject.ageInDays = data.ageInDays;
    // finalObject.age = data.age;
    finalObject.gender = { id: parseInt(data.gender) };
    // data.gender === "male"
    //   ? (finalObject.gender = { id: 2 })
    //   : (finalObject.gender = { id: 1 });
    // finalObject.gender = data.gender;
    data.maritalStatus !== null
      ? (finalObject.maritalStatus = data.maritalStatus.label)
      : (finalObject.maritalStatus = null);
    data.nationality !== null
      ? (finalObject.nationality = { id: parseInt(data.nationality.value) })
      : (finalObject.nationality = null);
    // finalObject.ethnicity = data.ethnicity;
    data.citizenIdProof !== null
      ? (finalObject.citizenIdProof = {
          id: parseInt(data.citizenIdProof.value),
        })
      : (finalObject.citizenIdProof = null);
    data.identificationDocumentNumber !== ""
      ? (finalObject.identificationDocumentNumber =
          data.identificationDocumentNumber)
      : (finalObject.identificationDocumentNumber = null);
    // finalObject.identificationDocFileName = identificationDocFileName;
    // let identificationFile = identificationDocFile.toString().split(",")[1];
    // finalObject.identificationDocFilePath = identificationFile;
    //Address Info
    data.houseFlatNumber !== ""
      ? (finalObject.houseFlatNumber = data.houseFlatNumber)
      : (finalObject.houseFlatNumber = null);
    data.streetAddress !== ""
      ? (finalObject.streetAddress = data.streetAddress)
      : (finalObject.streetAddress = null);
    data.area !== null
      ? (finalObject.area = { id: parseInt(data.area.value) })
      : (finalObject.area = null);

    data.city !== null
      ? (finalObject.city = { id: parseInt(data.city.value) })
      : (finalObject.city = null);

    data.taluka !== null
      ? (finalObject.taluka = { id: parseInt(data.taluka.value) })
      : (finalObject.taluka = null);
    data.district !== null
      ? (finalObject.district = { id: parseInt(data.district.value) })
      : (finalObject.district = null);
    data.state !== null
      ? (finalObject.state = { id: parseInt(data.state.value) })
      : (finalObject.state = null);

    data.country !== null
      ? (finalObject.country = { id: parseInt(data.country.value) })
      : (finalObject.country = null);
    finalObject.pinCode = { id: parseInt(data.pinCode.value) };

    // //Referral Info
    data.referralType !== null
      ? (finalObject.referralType = { id: parseInt(data.referralType.value) })
      : (finalObject.referralType = null);

    data.referralDoctor !== null
      ? (finalObject.referralDoctor = {
          id: parseInt(data.referralDoctor.value),
        })
      : (finalObject.referralDoctor = null);

    //Quick Registration
    // finalObject.visitDate = visitYear + "-" + visitMonth + "-" + visitDay;
    // finalObject.patientType = { id: parseInt(data.patientType.value) };
    finalObject.visitType = { id: parseInt(data.visitType.value) };
    finalObject.patientCategory = { id: parseInt(data.patientCategory.value) };

    if (
      data.patientCategory.label.toLowerCase() === "corporate" ||
      data.patientCategory.label.toLowerCase() === "insurance"
    ) {
      finalObject.company = { id: parseInt(data.company.value) };
    } else {
      delete finalObject.company;
    }
    finalObject.tariff = { id: parseInt(data.tariff.value) };
    finalObject.department = { id: parseInt(data.department.value) };
    finalObject.cabin = { id: parseInt(data.cabin.value) };
    // data.subDepartment !== null
    //   ? (finalObject.subDepartment = { id: parseInt(data.subDepartment.value) })
    //   : (finalObject.subDepartment = null);

    finalObject.employee = { id: parseInt(data.doctor.value) };
    data.complaints !== ""
      ? (finalObject.remarkOrReason = data.complaints)
      : (finalObject.remarkOrReason = null);
    finalObject.patientSource = { id: parseInt(data.patientSource.value) };
    // if paitent id exists
    if (comingData) {
      if (comingData.AppointmentId) {
        finalObject.appointmentId = comingData.AppointmentId;
      }
      if (comingData.PatientId) {
        finalObject.patientId = comingData.PatientId;
      }
    }

    console.log(finalObject);
    // billingData = data;
    callVisitId(data, finalObject.unit);

    callPostingData(finalObject);
  };

  const formReset = () => {
    methods.reset(defaultValues);
    setOpen(false);
    setGender("male");
    setProfilePic(BlankProfile);
    setIdentificationDocFile("");
    // setExpanded("panel1");
    setExpandPanal1(true);
    setExpandPanal5(true);
  };
  const callPostingData = (finalData) => {
    mutate(finalData, {
      onSuccess: (data, variables, context) => {
        setOpenBackdrop(false);
        console.log("data Successfully Added by David");
        console.log("data for visitID and UHID", data);
        billingData.visitId = data.data.result.visitId;
        billingData.UHID = data.data.result.uhid;
        billingData.PatientName = data.data.result.patientName;
        billingData.cashBalance = data.data.result.cashBalance;
        billingData.unitId = unitId;
        billingData.comingFrom = "quick registration";
        console.log("variables", variables);
        console.log("context", context);
        successAlert(data.data.message);
        formReset(defaultValues);
        navigate(`/billing/opd`, {
          state: billingData,
        });
      },
      onError: (data, variables, context) => {
        setOpenBackdrop(false);
        errorAlert(data.message);
      },
    });
  };
  const onSubmit = (data) => {
    console.log("Data", data);
    setOpen(true);
    setFormData(data);
  };

  return (
    <div className="bg-gray-50 py-1 mt-14">
      <p className="text-center text-2xl my-2 text-gray-700 font-Poppins">
        Patient Visit
      </p>
      <div className="w-12/12 mx-2 my-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* /// Patient Details //// */}
            <Accordion
              expanded={expandPanal1}
              onChange={handleChangePanal1}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide font-Poppins text-lg ">
                  Patient Details
                </p>
              </AccordionSummary>
              <AccordionDetails>
                {/* //Basic Information // */}
                <BasicInfo
                  selectedDoc={selectedDoc}
                  setSelectedDoc={setSelectedDoc}
                  bloodgroups={bloodgroups}
                  setBloodgroups={setBloodgroups}
                  maritalStatus={maritalStatus}
                  setMaritalStatus={setMaritalStatus}
                  disableMobileSearch={disableMobileSearch}
                  age={age}
                  setAge={setAge}
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                  setProfilePicName={setProfilePicName}
                  gender={gender}
                  setGender={setGender}
                  identificationDocFile={identificationDocFile}
                  setIdentificationDocFile={setIdentificationDocFile}
                  setIdentificationDocFileName={setIdentificationDocFileName}
                  setSearchData={setSearchData}
                  setUnitId={setUnitId}
                />
                {/* // Address Information // */}
                <p className="font-bold tracking-wide text-lg my-3 font-Poppins">
                  Address Details
                </p>
                <AddressInfo
                  searchData={searchData}
                  setPincodeId={setPincodeId}
                  pincodeId={pincodeId}
                  area={area}
                  setArea={setArea}
                />
              </AccordionDetails>
            </Accordion>

            {/* /// Referral Doctor Details //// */}
            <Accordion
              expanded={expandPanal5}
              onChange={handleChangePanal5}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide font-Poppins text-lg ">
                  Referral Details
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <ReferralDoctor />
              </AccordionDetails>
            </Accordion>

            {/* /// Quick Registation Details //// */}
            <Accordion
              expanded={expandPanal8}
              onChange={handleChangePanal8}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7bh-content"
                id="panel8bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide font-Poppins text-lg">
                  Visit Details
                </p>
              </AccordionSummary>
              <AccordionDetails>
                {showUnits ? (
                  <Grid
                    container
                    spacing={1}
                    className="mt-1 mb-2 px-1 rounded-md flex "
                  >
                    <Grid item lg={3} sm={3}>
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        dataArray={units}
                        placeholder="Unit *"
                        isSearchable={false}
                        inputRef={{
                          ...register("unit", {
                            onChange: (e) => {
                              console.log("UNIT ID", e.target);
                              setUnitId(e.target.value.id);
                            },
                          }),
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}
                <VisitInfo
                  value={value}
                  setValue={setValue}
                  setPatientCategoryValue={setPatientCategoryValue}
                  unitId={unitId}
                />
              </AccordionDetails>
            </Accordion>

            <div className="flex justify-end my-4">
              <div className="mx-3">
                <ResetButton onClick={handleReset} />
              </div>
              <SubmitButton />
            </div>
          </form>
        </FormProvider>
      </div>

      <CommonBackDrop openBackdrop={openBackdrop} />

      {/* //Confirmation Modal// */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className=" justify-center align-middle">
            <p className="my-3">Are You Sure ?</p>
            <div>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginX: "1rem", border: "2px solid" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                // type="submit"
                variant="outlined"
                color="success"
                sx={{ marginRight: "1rem", border: "2px solid" }}
                onClick={() => handleFormSubmit(formData)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal> */}
      <ConfirmationModal
        confirmationOpen={open}
        confirmationHandleClose={handleClose}
        confirmationSubmitFunc={() => handleFormSubmit(formData)}
        confirmationLabel="Confirmation "
        confirmationMsg="Are You Sure ?"
        confirmationButtonMsg="Proceed"
      />
    </div>
  );
};

export default QuickRegistrationForm;
