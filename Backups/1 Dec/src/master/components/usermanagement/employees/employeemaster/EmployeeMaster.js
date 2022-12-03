import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { validationSchema } from "./validationSchema";

import BlankProfile from "./image4.jpg";
import BasicInfo from "./BasicInfo";
import EmployeePosition from "./EmployeePosition";
import EmployeeDocuments from "./EmployeeDocuments";
import AssignDepartment from "./AssignDepartment";
import {
  getGendersDropDown,
  getPrefixDropDown,
  maritalStatusDropDown,
  bloodGroupDropDown,
  nationalityDropDown,
  designationDropDown,
  qualificationsDropDown,
  registerEmployeeMaster,editEmployeeMaster
} from "../../services/EmployeeMaster/EmployeeMasterServices";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  successAlert,
  errorAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";
import { useNavigate, Navigate } from "react-router-dom";

import {useLocation} from 'react-router-dom';
// import {SubmitButton, ResetButton} from '../../../../../Common Components/Buttons/CommonButtons'
import SubmitButton from "../../../../../Common Components/Buttons/SubmitButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import { baseUrl } from "../../../../http-common";

const defaultValues = {
  // Basic Info
  isAdmin: false,
  loginApplicable:true,
  isClinical: true,
  active: true,
  doctorShareApplicable: true,
  concessionApplicable: false,
  Temporary: false,
  employeeType: "",
  // employeeCode:"11",
  prefix: null,
  firstName: "",
  middleName: "",
  lastName: "",
  // gender:"1",
  dob: new Date(),
  ageInYears: "0",
  ageInMonths: "0",
  ageInDays: "0",
  age: "0",
  maritalStatus: null,
  bloodGroup: null,
  email: "",
  mobileNo: "",
  consultationAmount: "0",
  followUpAmount: "0",
  // indentificationFile: "",

  // Address Info
  nationality: "",
  address: "",
  country: "",
  state: "",
  district: "",
  taluka: "",
  city: "",
  area: "",
  pinCode: "",
  // Employee Position
  // educationInfo: [{collegeName: "" }],
  educationInfo: [{ collegeName: "", qualification: null, passingYear: '' }],
  //
  designation: "",
  experience: "",
  employeeJoiningDate: new Date(),
  employeeTimeSlot: "",
  registrationNo: "",
  qualification: "",
  // Employee Documents
  aadharNo: "",
  panNo: "",
  employeeUAN: null,
  employeePfNo: null,
  employeeDriverLicenceNo: null,
  employeePassportNo: null,
  bank: "",
  ifsCode: "",
  accountNo: null,
  // Assign Department
  units: [],
  departments: [],
};
const gendersInput = [
  { id: 0, value: 1, label: "Male" },
  { id: 1, value: 2, label: "Female" },
  { id: 2, value: 3, label: "Other" },
];

const employeeTimeSlots = [
  { id: 0, value: "15 Mins", label: "15 Mins" },
  { id: 1, value: "30 Mins", label: "30 Mins" },
  { id: 2, value: "other", label: "Other" },
];

let employeeId
const EmployeeMaster = () => {
  // adding college
  const [cardBorder, setCardBorder] = useState("");
  const [errorEdu, setErrorEdu] = useState("invisible");
  //useState to setProfile Pic for Patient
  // employeeRegistrationNo
  const employeeRegistrationNo = defaultValues.registrationNo;
  // employeeJoiningDate
  const employeeJoiningDate = defaultValues.employeeJoiningDate;
  // Validation
  const schema = validationSchema;
  //useState to Expanded Accordion
  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal2, setExpandPanal2] = useState(false);
  const [expandPanal3, setExpandPanal3] = useState(false);
  const [expandPanal4, setExpandPanal4] = useState(false);
  //useState to get Age based on selected DOB
  // date
  const [dateIs, setdateIs] = React.useState(defaultValues.dob);
  const [joinDateIs, setJoinDateIs] = React.useState(new Date());
  //useState to setProfile Pic for Patient
  const [profilePic, setProfilePic] = useState(BlankProfile);
  const [profilePicName, setProfilePicName] = useState(null);
  const [signature, setSignature] = useState('');
  const [signatureName, setSignatureName] = useState(null);
  // useState to show or not for employee Type
  const [empType, setEmpType] = useState(true);
  // useSte to shoe consultCharges
  const [drChrgAmt, setDrChrgAmt] = useState(false);

  const [countryId, setCountryId] = useState();

  const [stateId, setStateId] = useState();

  const [districtId, setDistrictId] = useState();

  const [tehsilId, setTehsilId] = useState();
  // defaultValues = trialDefault
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = methods;

  const navigate = useNavigate();

  const handleChangePanal1 = () => {
    setExpandPanal1(!expandPanal1);
  };
  const handleChangePanal2 = () => {
    setExpandPanal2(!expandPanal2);
  };
  const handleChangePanal3 = () => {
    setExpandPanal3(!expandPanal3);
  };
  const handleChangePanal4 = () => {
    setExpandPanal4(!expandPanal4);
  };

  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  
  const [checkValue, setCheckValue] = useState(defaultValues.isClinical);
  // api calls
  const [nationalities, setNationalities] = useState();
  const [titles, setTitles] = useState();
  const [maritalStatuss, setMaritalStatuss] = useState();
  const [bloodGroups, setBloodGroups] = useState();
  const [employeeDesignations, setEmployeeDesignations] = useState();
  const [qualifications, setQualifications] = useState();
  const [genders, setGenders] = useState(gendersInput);

  const [comingData, setComingData] = useState()
  
const location = useLocation();
  useEffect(() => {
    getGendersDropDown()
      .then((response) => response.data)
      .then((res) => {
        console.log("genders", res.result);
        setGenders(res.result);
      });
    // Prefix
    getPrefixDropDown()
      .then((response) => response.data)
      .then((res) => {
        setTitles(res.result);
      });
    // maritalStatusDropDown
    maritalStatusDropDown()
      .then((response) => response.data)
      .then((res) => {
        setMaritalStatuss(res.result);
      });
    // bloodGroupDropDown
    bloodGroupDropDown()
      .then((response) => response.data)
      .then((res) => {
        setBloodGroups(res.result);
      });

    // setNationalities
    nationalityDropDown()
      .then((response) => response.data)
      .then((res) => {
        setNationalities(res.result);
      });

    designationDropDown()
      .then((response) => response.data)
      .then((res) => {
        setEmployeeDesignations(res.result);
      });

    qualificationsDropDown()
      .then((response) => response.data)
      .then((res) => {
        setQualifications(res.result);
      });
  }, []);
  //
  useEffect(() => {
    if(location.state!==undefined && location.state!==null){
      console.log("Employee Details",location.state.employeeDetails)
      setEmployeeValues(location.state.employeeDetails)
      console.log("location not null",location.state)
      employeeId = location.state.employeeDetails.id
      setComingData(location.state.employeeDetails)
      if(location.state.employeeDetails.profileImagePath){
          console.log('profile pic path',`${baseUrl}/file${location.state.employeeDetails.profileImagePath}`)
          setProfilePic(`${baseUrl}/file${location.state.employeeDetails.profileImagePath}`)
      }
      if(location.state.employeeDetails.signImagePath){
          setSignature(`${baseUrl}/file${location.state.employeeDetails.signImagePath}`)
          console.log('profile pic path',`${baseUrl}/file${location.state.employeeDetails.profileImagePath}`)
      }
      // setFieldDisabled(location.state.)
    }else{
      console.log("location is null",location.state)
    }
  }, []);
  const [finalData, setFinalData] = useState();


const setEmployeeValues = (employeeDetails) => {
  const employeeDetailsArr = [
    "id",
    "area",
    "city",
    "email",
    "panNo",
    "state",
    "units",
    "active",
    "gender",
    "prefix",
    "taluka",
    "address",
    "country",
    "isAdmin",
    "pinCode",
    "aadharNo",
    "district",
    "lastName",
    "mobileNo",
    "accountNo",
    "birthDate",
    "firstName",
    "ageInYears",
    "bloodGroup",
    "departments",
    "experience",
    "isClinical",
    "middleName",
    "designation",
    "joiningDate",
    "nationality",
    // "employeeCode",//ask maam
    "employeeType",
    "maritalStatus",
    "durationOfSlot",
    "followUpAmount",
    "registrationNo",//change name to common
    "loginApplicable",//add checkbox
    "consultationAmount",
    "concessionApplicable",
    "doctorShareApplicable",
    "bank",
    "ifsCode"
  ]
  employeeDetailsArr.forEach((field, i) => {
    setValue(field, employeeDetails[field]);
  });
  setValue("gender", employeeDetails['gender'].value);
  setdateIs(employeeDetails['birthDate'])
  setJoinDateIs(employeeDetails['joiningDate'])

  setValue("age",employeeDetails['ageInYears'])

  let educationInfo = employeeDetails['educationInfo']
  for(let i = 0 ;i<educationInfo.length;i++){
    setValue(`educationInfo[${i}].collegeName`,educationInfo[i].collegeName)
    setValue(`educationInfo[${i}].qualification`,educationInfo[i].qualification)
    setValue(`educationInfo[${i}].passingYear`,educationInfo[i].passingYear)
  }
  setCheckValue(employeeDetails['isClinical'])
  if(employeeDetails['isClinical']){
    setEmpType(true);
    if(employeeDetails['employeeType']){
      setDrChrgAmt(true);
    }
  }else{
    setEmpType(false);
    setDrChrgAmt(false);
  }

  // call address apis
//   area
  // city
  // state
  // taluka
  // country
  // district
  let countryValue =  employeeDetails['country']
  let stateValue = employeeDetails['state']
  let areaValue = employeeDetails['area']
  let cityValue = employeeDetails['city']
  let talukaValue = employeeDetails['taluka']
  let districtValue = employeeDetails['district']
  setCountryId(countryValue.value)
  setStateId(stateValue.value)
  setDistrictId(districtValue.value)
  setTehsilId(talukaValue.value)
  // let obj = {
    
  // }
}
  const setAddressData = () => {

  }
  const getDateModal = (dobValue) => {
    let dobGivenYear = dobValue.getFullYear();
    let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    return fullDOB;
  };
useEffect(()=>{
  console.log("error",errors)
},[errors])


  const onSubmit = (data) => {
    let finalObj = {};
    let profilePicString = profilePic.toString().split(",")[1];
    let signaturePicString = signature.toString().split(",")[1];
    
    if(profilePicName){
        finalObj.profileImageBase64 = profilePicString;
        finalObj.profileImagePath = profilePicName
    }
    if(signatureName){
        finalObj.signImagePath = signatureName;
        finalObj.signImageBase64 = signaturePicString;
    }
    // 
    console.log("signature", signaturePicString)
    console.log("signatureName", signatureName)

    console.log("data", data);
    console.log("comingData", comingData);
    console.log("employeeId", employeeId);
    // if Edit
    if(comingData){
      if(comingData.id){
        finalObj.id = comingData.id
        finalObj.employeeCode = comingData.employeeCode
      }
    }


    let finalDOB = dateIs;
    let DobdateType = typeof dateIs;
    if (DobdateType !== "string") {
      console.log("dateDob not string", DobdateType);
      finalDOB = getDateModal(finalDOB);
    }

    let finalJoinDate = joinDateIs;
    let finalJoinDateType = typeof joinDateIs;
    if (finalJoinDateType !== "string") {
      console.log("finalJoinDateType not string", finalJoinDateType);
      finalJoinDate = getDateModal(finalJoinDate);
    }
    finalObj.birthDate = finalDOB;
    finalObj.joiningDate = finalJoinDate;

    finalObj.isAdmin = data.isAdmin;
    finalObj.isClinical = checkValue;
    finalObj.loginApplicable =data.loginApplicable 
    finalObj.employeeType = { id: parseInt(data.employeeType.value) };
    if (checkValue) {
      finalObj.employeeRegNo = data.registrationNo;

      if (
        data.employeeType.label == "Doctor" ||
        data.employeeType.label == "Consultant"
      ) {
        finalObj.consultationAmount = Number(data.consultationAmount);
        finalObj.followUpAmount = Number(data.followUpAmount);
        finalObj.durationOfSlot = Number(data.employeeTimeSlot);
      } else {
        finalObj.consultationAmount = 0;
        finalObj.followUpAmount = 0;
        finalObj.durationOfSlot = null;
      }
    } else {
      finalObj.employeeRegNo = null;
    }
    finalObj.active = data.active;
    finalObj.doctorShareApplicable = data.doctorShareApplicable;
    finalObj.concessionApplicable = data.concessionApplicable;
    // finalObj.employeeCode = data.employeeCode
    finalObj.firstName = data.firstName;
    if(data.middleName){
    finalObj.middleName = data.middleName};
    finalObj.lastName = data.lastName;
    finalObj.ageInYears = Number(data.ageInYears);
    finalObj.ageInMonths = Number(data.ageInMonths);
    finalObj.ageInDays = Number(data.ageInDays);
    // finalObj.age = data.age
    finalObj.email = data.email;
    finalObj.mobileNo = Number(data.mobileNo);
    finalObj.address = data.address;
    finalObj.experience = Number(data.experience);
    finalObj.aadharNo = Number(data.aadharNo);
    finalObj.panNo = data.panNo;
    if(data.employeeUAN){
      finalObj.uanNo = Number(data.employeeUAN)
    }else{
      finalObj.uanNo = data.employeeUAN
    };
    finalObj.pfNo = data.employeePfNo;
    finalObj.drLicenceNo = data.employeeDriverLicenceNo
    finalObj.passportNo = data.employeePassportNo;
    finalObj.ifsCode = data.ifsCode;
    finalObj.accountNo = Number(data.accountNo);
    // finalObj.mobile = Number(data.mobileNo);

    finalObj.gender = { id: parseInt(data.gender) };
    // profile picture and signature
    // finalObj.profilePic = data.profilePic
    // finalObj.signature = data.signature
    if(data.prefix){
    finalObj.prefix = { id: parseInt(data.prefix.value) }};
    if(data.maritalStatus){
    finalObj.maritalStatus = { id: parseInt(data.maritalStatus.value) }};
    if(data.bloodGroup){
    finalObj.bloodGroup = { id: parseInt(data.bloodGroup.value) }};
    finalObj.nationality = { id: parseInt(data.nationality.value) };

    finalObj.bank = { id: parseInt(data.bank.value) };
    finalObj.designation = { id: parseInt(data.designation.value) };
    finalObj.pinCode = { id: parseInt(data.pinCode.value) };
    console.log(data.area.value);
    finalObj.area = { id: parseInt(data.area.value) };
    finalObj.city = { id: parseInt(data.city.value) };
    finalObj.taluka = { id: parseInt(data.taluka.value) };
    finalObj.district = { id: parseInt(data.district.value) };
    finalObj.state = { id: parseInt(data.state.value) };
    finalObj.country = { id: parseInt(data.country.value) };

    let units = data.units;
    let unitArray = [];
    for (let i = 0; i < units.length; i++) {
      unitArray = [...unitArray, { id: parseInt(units[i].value) }];
    }
    finalObj.unit = unitArray;

    // departments
    // finalObj.departments = { id: parseInt(data.departments.value) };
    let departments = data.departments;
    let departmentsArray = [];
    for (let i = 0; i < departments.length; i++) {
      departmentsArray = [...departmentsArray, { id: parseInt(departments[i].value) }];
    }
    finalObj.departments = departmentsArray;

    let eduactionArray = data.educationInfo;
    let submitEduactionArray = [];
    for (let i = 0; i < eduactionArray.length; i++) {
      submitEduactionArray = [
        ...submitEduactionArray,
        {
          qualification: {
            id: parseInt(eduactionArray[i].qualification.value),
          },
          passingYear: eduactionArray[i].passingYear,
          collegeName: eduactionArray[i].collegeName,
        },
      ];
    }
    finalObj.educationInfo = submitEduactionArray;

    console.log("finalObj", finalObj);
    setFinalData(finalObj);
    handelOpenChild();
    // handleReset()
  };

  const { isSuccess, isError, mutate } = useMutation(registerEmployeeMaster);
  const { isSuccess:isSuccessEdit, isError:isErrorEdit, mutate:mutateEdit } = useMutation(editEmployeeMaster);

  const postDataFinal = () => {
    handleCloseChild();
    console.log("finalData", finalData);
    if(comingData){
        mutateEdit(finalData, {
          onSuccess: (data, variables, context) => {
            successAlert(data.data.message);
            console.log("data", data);
            console.log("variables", variables);
            console.log("context", context);
            handleReset();
            navigate(`/masters/usermanagement/employee`);
          },
          onError: (data, variables, context) => {
            errorAlert(data.message);
          },
          onSettled: () => {},
        });
    }else{
        mutate(finalData, {
          onSuccess: (data, variables, context) => {
            successAlert(data.data.message);
            console.log("data", data);
            console.log("variables", variables);
            console.log("context", context);
            handleReset();
            navigate(`/masters/usermanagement/employee`);
          },
          onError: (data, variables, context) => {
            errorAlert(data.message);
          },
          onSettled: () => {},
        });
    }
  };
  const handleReset = () => {
    methods.reset();
    setSignature(BlankProfile);
    setProfilePic(BlankProfile);
    setProfilePicName(null)
    setExpandPanal1(true);
    setExpandPanal2(false);
    setExpandPanal3(false);
    setExpandPanal4(false);
    setdateIs(new Date());
    setJoinDateIs(new Date());
  };
  return (
    <div className="bg-slate-50 py-1 min-h-screen mt-20 ">
      <p className="text-center text-2xl">
        <Typography variant="h4" sx={{ marginY: "1" }}>
          <p className=" tracking-wide">Employee Master</p>
        </Typography>
      </p>
      <div className="w-[100%] px-2 mx-auto my-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/*Basic Info  */}
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
                <p className="font-bold tracking-wide">Employee Details</p>
              </AccordionSummary>
              <AccordionDetails>
                <BasicInfo
                countryId={countryId}
                setCountryId={setCountryId}
                stateId={stateId}
                setStateId={setStateId}
                districtId={districtId}
                setDistrictId={setDistrictId}
                tehsilId={tehsilId}
                setTehsilId={setTehsilId}
                  checkValue={checkValue}
                  setCheckValue={setCheckValue}
                  defaultValues={defaultValues}
                  dateIs={dateIs}
                  setdateIs={setdateIs}
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                  profilePicName={profilePicName}
                  setProfilePicName={setProfilePicName}
                  titles={titles}
                  genders={genders}
                  maritalStatuss={maritalStatuss}
                  bloodGroups={bloodGroups}
                  drChrgAmt={drChrgAmt}
                  setDrChrgAmt={setDrChrgAmt}
                  empType={empType}
                  setEmpType={setEmpType}
                  nationalities={nationalities}
                  signature={signature}
                  setSignature={setSignature}
                  signatureName={signatureName}
                  setSignatureName={setSignatureName}
                />
              </AccordionDetails>
            </Accordion>

            {/* Employee Position */}
            <Accordion
              expanded={expandPanal2}
              onChange={handleChangePanal2}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide">Professional Info</p>
              </AccordionSummary>
              <AccordionDetails>
                <EmployeePosition
                  joinDateIs={joinDateIs}
                  setJoinDateIs={setJoinDateIs}
                  employeeRegistrationNo={employeeRegistrationNo}
                  employeeJoiningDate={employeeJoiningDate}
                  employeeDesignations={employeeDesignations}
                  employeeTimeSlots={employeeTimeSlots}
                  empType={empType}
                  drChrgAmt={drChrgAmt}
                  qualifications={qualifications}
                  // passoutYears={passoutYears}

                  cardBorder={cardBorder}
                  setCardBorder={setCardBorder}
                  errorEdu={errorEdu}
                  setErrorEdu={setErrorEdu}
                />
              </AccordionDetails>
            </Accordion>
            {/* Employee Documents */}
            <Accordion
              expanded={expandPanal3}
              onChange={handleChangePanal3}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide">
                  Identification And Bank Details
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <EmployeeDocuments />
              </AccordionDetails>
            </Accordion>
            {/* Assign Department */}
            <Accordion
              expanded={expandPanal4}
              onChange={handleChangePanal4}
              elevation={6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                sx={{
                  "&.Mui-expanded": {
                    marginBottom: "-1rem",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <p className="font-bold tracking-wide">Assign Department</p>
              </AccordionSummary>
              <AccordionDetails>
                <AssignDepartment checkValue={checkValue}/>
              </AccordionDetails>
            </Accordion>
            <div className="flex justify-end my-4 space-x-4">
              <ResetButton onClick={handleReset}/>
              <SubmitButton />
            </div>
          </form>
        </FormProvider>
      </div>
      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        confirmationSubmitFunc={(e) => {
          
          postDataFinal();
        }}
        confirmationLabel="Confirmation "
        confirmationMsg="Click on Proceed to Employee List ?"
        confirmationButtonMsg="Proceed"
      />
    </div>
  );
};

export default EmployeeMaster;
