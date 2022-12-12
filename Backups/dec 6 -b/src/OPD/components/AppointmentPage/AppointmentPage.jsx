import React, { useEffect, useState } from 'react'
import { useMutation } from "@tanstack/react-query";
import { successAlert, errorAlert } from '../../../Common Components/Toasts/CustomToasts'
import {useNavigate} from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import {Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton ,styled} from '@mui/material'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import {Edit, CalendarMonthOutlined} from '@mui/icons-material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import InputField from "../../../Common Components/FormFields/InputField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../Common Components/FormFields/RadioField";
import CreateAbleSelect from "../../../Common Components/FormFields/CreateableSelect";
import {
  getGendersDropDown,
  getPrefixDropDown, 
  getPatientTypeDropDown, 
  getAppointmentBookingDropDown, 
  getDepartmentDropDown, 
  getSubDepartmentDropDown,
  getCitizenIdProofDropDown,
  getReferTypeDropDown,
  getreferralDoctorsDropDown,
  getAppointmentTypeDropDown,
  getAge,
  getDateOfBirth,
  getISDDropDown,
  registerAppointmentPage,
  getEmployeeDropDown,
  getPaitentInfoByNo,getPaitentInfoByID,
  getTimeSlotsApi,getUnitsDropDown
} from "../../services/AppointmentPageServices/AppointmentPageServices";
import SearchBar from '../../../Common Components/FormFields/SearchBar';
import LoadingSpinner from '../../../Common Components/loadingspinner/loadingSpinner';
import CommonBackDrop from '../../../Common Components/CommonBackDrop/CommonBackDrop';
import ConfirmationModal from '../../../Common Components/ConfirmationModal';


  // global variable to tell selected timeId and value
let timeNameGiven='';
let setDoctor='' ;
// VALIDATION
let finalData={};
let patientId=null;

let appointmentFromTime=''
let appointmentToTime=''
let Appdateid=''
// let doctorId=''
let UnitId=''

const getDateModal = (dobValue) => {
  let dobGivenYear = dobValue.getFullYear();
  let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
  let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
  const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
  return fullDOB
};

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: '#ffffff',
  },
});
const fontColor = {
  style: { color: 'rgb(150, 250, 350)' }
}
const textFieldColor = '#000000';
const textFieldSX = {
    input: {
        "-webkit-text-fill-color": `${textFieldColor} !important`,
        color: `${textFieldColor} !important`,
    },
};
const AppointmentPage = () => {
  const validateDate = (value) => {
    let dobGivenYear = value.getFullYear();
    let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(value.getDate()).padStart(2, "0");
    let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    let isValidDate = dateIsValid(fullDOB)
    return isValidDate
  }
  let initialSchema = {
  
    firstName: yup
        .string()
        .matches(
          /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
          "Please Give First Name in Proper Format"
        )
        .required("Required")
        .min(1,"Minimum 1 Characters Needed"),
  
      // middleName: yup
      //   .string()
      //   .matches(
      //     /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      //     "Please Give Middle Name in Proper Format"
      //   )
      //   .required("Middle Name is Required")
      //   .min(1),
  
        lastName: yup
        .string()
        .matches(
          /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
          "Please Give Last Name in Proper Format"
        )
        .required("Required")
        .min(1,"Minimum 1 Characters Needed"),
  
      citizenIdProof: 
        yup.object().nullable().shape({
                  value: yup.string().required("Please Mention Identification Document"),
                  label: yup.string().required("Please Mention Identification Document")
                }),
                // .required("Please Mention Identification Document"),
  
    identificationDocumentNumber: yup
      .string()
      .nullable()
      // .required("Identification No. Required")
      .when("citizenIdProof", (citizenIdProof) => {
        if (citizenIdProof !== null) {
          if (citizenIdProof.label.toLowerCase() === "pan") {
            return yup
              .string()
              .matches(
                /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                "Please Provide Valid Pan No."
              )
              .min(10, "Please Provide Valid Pan No.")
              .max(10, "Please Provide Valid Pan No.")
              .typeError("Pancard No. is required");
          } else if (citizenIdProof.label.toLowerCase() === "aadhar") {
            return yup
              .string()
              .matches(/^[0-9]+$/, "Please Provide Valid Aadhar No.")
              .min(12, "Please Provide Valid Aadhar No.")
              .max(12, "Please Provide Valid Aadhar No.")
              .typeError("Aadhar No. is required");
          } else {
            return yup.string();
            // .required("Required");
          }
        }
      }),
  
      prefix: 
      yup.object().nullable().shape({
                value: yup.string().required("Required"),
                label: yup.string().required("Required")
              }).required("Required"),
  
        mobileISD: 
        yup.object().nullable().shape({
                  value: yup.string().required("Required ISD"),
                  label: yup.string().required("Required ISD")
                }).required("Required"),
  
        mobileNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Please Provide Valid Mobile No.")
        .min(10, "Please Provide Valid Mobile No.")
        .max(14, "Please Provide Valid Mobile No.")
        .required("Required"),
  
        // complaints: yup
        // .string()
        // .required("Please Mention complaint"),
        // dob: yup
        //   .date()
        //   // .typeError("Please Provide Date of Birth in Valid Format")
        //   // .min("01/01/1950", "You are Not Eligible")
        //   .test("is-date", "Invalid Date", function(value){
        //     console.log("date val",value)
        //     let errorDate = validateDate(value)
        //     console.log("errorDate",errorDate)
        //     return errorDate
        //   })
        //   .required(),
        
        age: yup
        .string()
        .matches(/^(110|[1-9]?[0-9])$/, "Invalid")
        .required("Required"),
        // age: yup
        // .number().integer('Invalid')
        // .typeError("Invalid")
        // .min(0, "Invalid")
        // .max(110, "Invalid")
        // .required("Required"),
  
        patientCategory: 
        yup.object().nullable().shape({
                  value: yup.string().required("Please Mention Patient Type"),
                  label: yup.string().required("Please Mention Patient Type")
                }).required("Required"),
  
  
        //          
                
        appointmentType: yup.object().nullable().shape({
          value: yup.string().required("Please Mention Appointment Type"),
          label: yup.string().required("Please Mention Appointment Type")
        }).required("Required"),
  
        department:  yup.object().nullable().shape({
          value: yup.string().required("Please Mention Department"),
          label: yup.string().required("Please Mention Department")
        }).required("Required"),
  
  
        employee: yup.object().nullable().shape({
          value: yup.string().required("Please Mention Doctor"),
          label: yup.string().required("Please Mention Doctor")
        }).required("Required"),
  
        appointmentTime: yup
        .string()
        .required("Please Select Time"),
  
        phone: yup.string().when('$exist', {
          is: exist => exist,
          then: yup.string().required(),
          otherwise: yup.string()
        }),
  
  
          unit:yup.object().nullable()
                  .when("showUnit", (showUnit) => {
                    if (showUnit) {
                        return yup.object().nullable().shape({
                          value: yup.string().required("Please Mention Unit"),
                          label: yup.string().required("Please Mention Unit")
                        }).required("Required")
                      }
                    }), 
    };
  
  // backend Data
  const defaultValues = 
      {
            //Basic Info
            showUnit:false,
            unit:'',
            prefix:null,
            firstName: "",
            middleName: '', 
            lastName: "",
            // gender:1,
            citizenIdProof: null,
            identificationDocumentNumber: "",
            complaints:null,
            mobileISD:"",
            referType:'',
            referBy:null,
            mobileNumber: "",
            patientCategory: "",
            appointmentBookingSource: "",
            appointmentType:"",
            department:"",
            subDepartment:null,
            employee:"",
            // appointmentDate: new Date(),
            ageInDays:0,
            ageInMonths:0,
            ageInYears:0,
            dob: new Date(),
            age:0
          }
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [doctorId, setDoctorId] = useState("");
  const [apDate, setApDate] = useState("");
  const [dateDob, setDateDob] = React.useState(getDateModal(new Date()));
  const [open, setOpen] = React.useState(false);

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);
  const [timeSlotsArr,setTimeSlotsArr]=React.useState([]);
  const handleOpen = () => {
    let fullDOB = getDateModal(dateIs)
    setApDate(fullDOB)
    if(timeSlotsArr.length == 0){
      callApi()
    }
    setOpen(true);
  };
  const handleClose = () => {
    setTimeSlotsArr([])
    setOpen(false)
  };
  useEffect(()=>{
    if(timeSlotsArr.length > 0){
      handleOpen()
      showSpinner(false)
    }else{
      // handleClose()
    }
  },[timeSlotsArr])
  const [timeIndexGiven,setTimeIndexGiven] =React.useState();
  const [showTimeSlot, setShowTimeSlot] = React.useState(false);
// document tye validation
  const [documentType, setDocumentType] = React.useState("Identification Document No.")


  // const [patientId,setPatientId]=React.useState(null);
// Api Calling

const [prefixes,setPrefixes]=React.useState();
const [patientTypes,setPatientTypes]=React.useState();
const [bookingSources,setBookingSources]=React.useState();
const [appointmentTypes,setAppointmentTypes]=React.useState();
const [departments,setDepartments]=React.useState();
const [subDepartments,setSubDepartments]=React.useState();
const [documentTypes,setDocumentTypes]=React.useState();
const [referralTypes,setReferralTypes]=React.useState();
const [referralDoctors,setReferralDoctors]=React.useState();
const [doctors,setDoctors]=React.useState();
const [isds,setIsds]=React.useState();
const[units,setUnits]=React.useState()
const[showUnits,setShowUnits]=React.useState(false)
const[genders,setGenders]=React.useState([])




useEffect(()=>{
  // Units
  getUnitsDropDown()
  .then(response=>response.data)
  .then(res=>{
  let unitsArr = res.result
  if(unitsArr.length > 1){
    setValue("showUnit",true)
    setUnits(unitsArr)
    setShowUnits(true)
  }else if(unitsArr.length == 1){
    setValue("showUnit",false)
    console.log("UnitId",unitsArr)
    UnitId=unitsArr[0].value
    setUnits("unit",unitsArr[0].value)
    setShowUnits(false)

    // call department
    getDepartmentDropDown(unitsArr[0].value)
    .then(response=>response.data)
    .then(res=>{
      setDepartments(res.result)
    })
  }else{
    setValue("showUnit",false)
    setShowUnits(false)
  }
  })

  getGendersDropDown()
  .then(response=>response.data)
  .then(res=>{
    console.log("genders",res.result) 
    setGenders(res.result)
  })
  // Prefix

  getPrefixDropDown()
  .then(response=>response.data)
  .then(res=>{
    console.log("prefixes",res.result) 
    setPrefixes(res.result)
  })
    // getISDDropDown
    getISDDropDown()
    .then(response=>response.data)
    .then(res=>{
      console.log("setIsds",res.result) 
      setIsds(res.result)
    })
  
  // patientCategory
  getPatientTypeDropDown()
  .then(response=>response.data)
  .then(res=>{
    setPatientTypes(res.result)
  })

  // setBookingSources
  getAppointmentBookingDropDown()
  .then(response=>response.data)
  .then(res=>{
    setBookingSources(res.result)
  })

  // AppointmentTypeDropDown
  getAppointmentTypeDropDown()
  .then(response=>response.data)
  .then(res=>{
    setAppointmentTypes(res.result)
  })

  // getDepartmentDropDown
  

  // getCitizenIdProofDropDown
  getCitizenIdProofDropDown()
  .then(response=>response.data)
  .then(res=>{
    setDocumentTypes(res.result)
  })

  getReferTypeDropDown()
  .then(response=>response.data)
  .then(res=>{
    setReferralTypes(res.result)
  })

  // getreferralDoctorsDropDown setReferencedoctors
  getreferralDoctorsDropDown()
  .then(response=>response.data)
  .then(res=>{
    setReferralDoctors(res.result)
  })
},[])

const AppointValidation = yup.object().shape(
  initialSchema
  ).required();
const schema = AppointValidation

const [dateIs, setdateIs] = React.useState(new Date());

useEffect(() => {
  let fullDOA = getDateModal(dateIs)
  setApDate(fullDOA)
  
  Appdateid = fullDOA
},[dateIs]);

const selectDoctor= (event)=>{
      setDoctor = event.target.value;
      setDoctorId(setDoctor.value)
      // callApi()
      setTimeIndexGiven(null);
      setShowTimeSlot(false)
    }
const setDate = (value)=>{
      setdateIs(value);
      Appdateid = value
      if(setDoctor == null){
        // console.log("doctor not selected")
      }else{
        setTimeIndexGiven(null);
        // handleOpen()
        callApi()
      }
    }
    // convert Date to backend Format
    // const getDateModal = (dobValue) => {
    //   let dobGivenYear = dobValue.getFullYear();
    //   let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    //   let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    //   const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    //   return fullDOB
    // };
    const callApi = ()=>{
      
      let appointmentDate = Appdateid
      console.log("appointmentDate",appointmentDate)
      console.log("doctorId",doctorId)
      //
      let DOA = appointmentDate
      let DOAType = typeof(DOA)
      if (DOAType!=="string"){
        console.log("dateDob not string",DOAType)
        DOA = getDateModal(DOA)
      }
      // 
      
      showSpinner(true);
      getTimeSlotsApi(DOA, doctorId)
      .then((response) => {
        console.log("getTimeSlotsApi",response.data);
        showSpinner(false);
        setTimeSlotsArr(response.data.result.slots);                   
      })
      .catch((response) => {
        console.log("getTimeSlotsApi catch",response);
        if(response.response.status == 500){
          
          showSpinner(false);
          errorAlertCustom(response.message)
        }
      });
      // setTimeSlotsArr(timeSlots)               
    }

    const gettingTimeInfo = ()=>{
      
      let menuObj = timeSlotsArr[timeIndexGiven];
      
      timeNameGiven = menuObj.fromTimeDisplay;
      appointmentFromTime = menuObj.fromTime;
      appointmentToTime = menuObj.toTime;
      // setTimeNameGiven(menuObj.name)
      console.log("appointmentFromTime appointmentToTime",appointmentFromTime,
        appointmentToTime)

      const fields = [
        "appointmentTime",
      ];
      fields.forEach((field) => setValue(field, timeNameGiven));
      setShowTimeSlot(true)
      handleClose()

    }
    
    const changeCategory = (index ) => {
       if (timeIndexGiven == index){
        setTimeIndexGiven(null);
       }else {
        setTimeIndexGiven(index);
       }
     };
     

  //API Calculate DOB based on Age


  function dateIsValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (dateStr.match(regex) === null) {
      return false;
    }
  
    const date = new Date(dateStr);
  
    const timestamp = date.getTime();
  
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }
  
    return date.toISOString().startsWith(dateStr);
  }
  const settingDobAgeApi = (value) => {
    console.log("settingDobAgeApi",value)
    setDateDob(value.localDate);
    setValue("ageInYears", value.years);
    setValue("ageInMonths", value.months);
    setValue("ageInDays", value.days);
  }
      // set date and age
  const settingDateDob = (value, inputType )=>{
    
    setDateDob(value);
    console.log(inputType)
    if(inputType=="ageInput"){
      // 
    }else{
      if(value){
        getAgeByDOB(value)
      }
    }
    }
    //API Calculate Age Based on DOB api
    const getAgeByDOB = (dobValue) => {
      console.log(dobValue);
      let dobGivenYear = dobValue.getFullYear();
      let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
      let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
      const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
      getAge(fullDOB)
        .then((response) => {
          setValue("age", response.data.result.years, {
            shouldValidate: true,
          });
          setValue("ageInYears", response.data.result.years);
          setValue("ageInMonths", response.data.result.months);
          setValue("ageInDays", response.data.result.days);
        })
        .catch((response) => {
          console.log(response);
        });
    };

const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues, 
  });
const {watch, register, handleSubmit, reset,formState:{errors}, control, setValue, clearErrors  } = methods;

const citizenIdProof = watch('citizenIdProof')
const navigate = useNavigate();

  const {isSuccess,mutate } =
  useMutation(registerAppointmentPage);
  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => {
    setOpenChild(true)
    console.log(finalData)
  };
  const handleCloseChild = () => {
      if(openChild){
          setOpenChild(false)
      }
  };

const onSubmit = (data) => {
    console.log("data",data)
    console.log("dateDob",dateDob)
    if(data.unit){
    finalData.unit= { id: parseInt(data.unit.value) }
  }else {
    finalData.unit= { id: parseInt(UnitId) }
  }
      
    let finalDOB = dateDob
    let DobdateType = typeof(finalDOB)
    if (DobdateType!=="string"){
      console.log("dateDob not string",DobdateType)
      finalDOB = getDateModal(finalDOB)
    }
    const finalDOA = getDateModal(dateIs)
    if(patientId !== null){
        finalData.patientInfo={ id: parseInt(patientId) }
      }
      finalData.appointmentFromTime=appointmentFromTime
      finalData.appointmentToTime=appointmentToTime
      finalData.age=data.age
      finalData.ageInDays=data.ageInDays
      finalData.ageInMonths=data.ageInMonths
      finalData.ageInYears=data.ageInYears
      if(data.appointmentBookingSource)
      {
      finalData.appointmentBookingSource= { id: parseInt(data.appointmentBookingSource.value) }
      }
      finalData.appointmentDate=finalDOA
      // finalData.appointmentTime=data.appointmentTime
      finalData.appointmentType= { id: parseInt(data.appointmentType.value) }
      finalData.complaints=data.complaints
      finalData.department= { id: parseInt(data.department.value) }
      finalData.dob=finalDOB
      finalData.employee= { id: parseInt(data.employee.value) }
      finalData.firstName= data.firstName
      finalData.gender={ id: parseInt(data.gender) } 
      finalData.identificationDocumentNumber= data.identificationDocumentNumber 
      finalData.lastName= data.lastName
      finalData.middleName= data.middleName
      if(data.mobileISD){
      finalData.mobileISD= { id: parseInt(data.mobileISD.value) }}
      finalData.mobileNumber=data.mobileNumber
      finalData.patientCategory= { id: parseInt(data.patientCategory.value) }


      if(data.prefix){
        finalData.prefix= { id: parseInt(data.prefix.value) }}
      else{
        finalData.prefix=  null
      }
      if(data.referBy){
      finalData.referBy= { id: parseInt(data.referBy.value) }}
      else{
        finalData.referBy = null;
      }
      if(data.referType){
      finalData.referType= { id: parseInt(data.referType.value) }}else{
        finalData.referType = null;
      }
      if(data.subDepartment !==null){
        finalData.subDepartment = { id: parseInt(data.subDepartment.value) }
      }else{
        finalData.subDepartment = null;
      }
      if(data.citizenIdProof){
        finalData.citizenIdProof= { id: parseInt(data.citizenIdProof.value) }
      }
    
    

    console.log("final Data",finalData)
    // Verify and Post Data
    handelOpenChild()
  };


  const postDataFinal= () =>{
    setOpenBackdrop(true)
    handleCloseChild()
    mutate(finalData, {onSuccess: (data, variables, context) => {
      
      setOpenBackdrop(false)
      successAlert(data.data.message)
      console.log("data",data)
      console.log("variables",variables)
      console.log("context",context)
      navigate(`/appointment/appointmentlist`)
    },
    onError:(data)=>{
      setOpenBackdrop(false)
      errorAlert(data.message)
    },
  });

    if(isSuccess){
      formReset()
    }
  }
  const formReset= ()=>{
    // appointmentTime
    appointmentFromTime=""
    appointmentToTime=""
    setTimeIndexGiven(null);
    setTimeSlotsArr([]);
    setShowTimeSlot(false);
    setdateIs(new Date());
    setDateDob(getDateModal(new Date()));
    // setAge(0)
    // setDay(0)
    // setMonth(0)
    // setYear(0)
    reset()
  }

  const [mobileNos,setMobileNos]=React.useState();
  const [patientInfo,setPatientInfo]=React.useState(null);

    useEffect(() => {
    if(patientInfo !== null){
      console.log("patientInfo",patientInfo)
      setDateDob(patientInfo.dob)
      clearErrors();
      getAge(patientInfo.dob)
        .then((response) => {
          setValue("age", response.data.result.years, {
          shouldValidate: true,
        });
          setValue("ageInYears", response.data.result.years);
          setValue("ageInMonths", response.data.result.months);
          setValue("ageInDays", response.data.result.days);
        })
        .catch((response) => {
          console.log(response);
        });
      setValue("prefix", patientInfo.prefix)
      setValue("firstName", patientInfo.firstName)
      setValue("middleName", patientInfo.middleName)
      setValue("lastName", patientInfo.lastName)
      setValue("gender", patientInfo.gender.value)
      setValue("mobileNumber", patientInfo.mobileNumber)
      setValue("citizenIdProof", patientInfo.citizenIdProof)
      if(patientInfo.citizenIdProof){
      setDocumentType(patientInfo.citizenIdProof.label)
      setValue("identificationDocumentNumber", patientInfo.identificationDocumentNumber)
    }
      patientId=patientInfo.id
    }

    // setDateDob()
  }, [patientInfo]);


  const callDepartmentDependentApi = (departmentId) =>{
    getSubDepartmentDropDown(departmentId)
    .then((response) => {
      setSubDepartments(response.data.result);
    })
    .catch((response) => {
      console.log(response);
    });

  // Calling Doctors data
  getEmployeeDropDown(departmentId)
    .then((response) => {
      console.log("call Doctor", response);
      setDoctors(response.data.result);
    })
    .catch((response) => {
      console.log(response);
    });

    setValue("subDepartment",null)
    setValue("employee","")
    setTimeSlotsArr([])
    setdateIs(new Date())
    setShowTimeSlot(false)
  }

  const textFieldSX = {
    input: {
      '& input[type=number]': {
        '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    }
    },
};
  const watchDoctor = watch("employee")

  const testDateFormat = (dateInput) => {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dateInput))) {
        return false;
    }else{
      return true
    }
  }

  useEffect(()=>{
    console.log("errors",errors)
  },[errors])
  return (
    <div className="bg-gray-50 min-h-screen py-1  mt-16 ">
      
      <p className="text-center text-gray-700  text-2xl my-2 font-Poppins ">
        Book Appointment
      </p>
      <Box className=" mx-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-1  mx-auto w-12/12"
      >
        <div className="rounded-md bg-white shadow-md px-3 py-1 my-2 ">
          <Grid
            container
            spacing={1}
            className="py-4  my-1 px-1 rounded-md flex "
          >
            <Grid
              item
              lg={2}
              sm={3}
              className="my-1 px-1 rounded-md tracking-wide text-base font-bold"
            >
              Patient Details
            </Grid>
            <Grid item lg={4} sm={5} className="z-50">
            <SearchBar
                  clearSearchBar={true}
                  searchIcon={true}
                  placeholder="Search Patient By Mobile No."
                  dataArray={mobileNos}
                  className="w-96"
                  isSearchable={true}
                  handleInputChange={(e)=>{
                    console.log(e)
                      if (e.length > 0) {
                        getPaitentInfoByNo(e).then((response) => {
                          console.log(response);
                          setMobileNos(response.data.result);
                        });
                      }
                  }}
                  onChange={(e)=>{
                    if (e!==null){
                    let mobileId = e.value;
                    console.log("selected mobileId",mobileId)
                      getPaitentInfoByID(mobileId).then((response) => {
                        setPatientInfo(response.data.result);
                      });}
                  }}
                />
              
            </Grid>
            
            <Grid item lg={3} sm={2}></Grid>
            {  showUnits ?   (  
            <Grid item lg={3} sm={2}>
                <DropdownField 
                        control={control} error={errors.unit}
                        name="unit" dataArray={units}
                        inputRef={{
                          ...register("unit", {
                            onChange: (e) => {
                              let selectedUnit = e.target.value.value
                              setValue('department','')
                              setValue('employee','')    
                              setValue("subDepartment",null)
                              setTimeSlotsArr([])
                              setdateIs(new Date())
                              setShowTimeSlot(false)

                            getDepartmentDropDown(selectedUnit)
                            .then(response=>response.data)
                              .then(res=>{
                                setDepartments(res.result)
                              })
                            }
                          })
                        }}
                        placeholder="Unit *" isSearchable={false}
                /> 
            </Grid>):""}
          </Grid>
          <div className="">
            <Grid container spacing={1} className="justify-between w-full ">
              {/* prefix */}
              <Grid item lg={1.25} sm={1.5} className="z-30 ">
                <DropdownField
                  control={control}
                  error={errors.prefix}
                  name="prefix"
                  dataArray={prefixes}
                  placeholder="Prefix*"
                  isSearchable={false}
                  isClearable={false}
                  inputRef={{
                    ...register("prefix", {
                      onChange: (e) => {
                        let genderId = e.target.value.genderId
                        setValue("gender",genderId)
                        console.log(e);
                      },
                    }),
                  }}
                />
              </Grid>
              {/* First Name */}
              <Grid item lg={2.75} sm={2.5}>
                <InputField
                  name="firstName"
                  variant="outlined"
                  label="First Name *"
                  error={errors.firstName}
                  control={control}
                />
              </Grid>

              {/* ///Middle Name/// */}
              <Grid item lg={4} sm={4}>
                <InputField
                  name="middleName"
                  variant="outlined"
                  label="Middle Name"
                  error={errors.middleName}
                  inputRef={{
                    ...register("middleName", {
                      onChange: (e) => {
                        if(e.target.value == ""){
                        setValue("middleName",null );}
                      },
                    }),
                  }}
                  control={control}
                />
              </Grid>

              {/* ///Last Name/// */}
              <Grid item lg={4} sm={4}>
                <InputField
                  name="lastName"
                  variant="outlined"
                  label="Last Name *"
                  error={errors.lastName}
                  control={control}
                />
              </Grid>

              {/* ///Gender/// */}
              {/* <Grid item lg={1} sm={1} sx={{marginTop:"0.75rem"}}>
              <p className="mt-1 lg:text-xl text-base px-2">Gender </p>
            </Grid> */}
              <Grid item lg={4} sm={6} sx={{marginTop:{lg:"0.75rem"}}}>
                {/* <div className="py-2"> */}
                <RadioField
                  label="Gender *"
                  name="gender"
                  control={control}
                  dataArray={genders}
                />
                {/* </div> */}
              </Grid>

              {/* //Date of Birth // */}
              <Grid item lg={4} sm={4}>
                <FormControl
                  sx={{
                    marginY: "0.6rem",
                  }}
                  fullWidth
                  size="small"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      maxDate={new Date()}
                      label="Date of Birth"
                      value={dateDob}
                      inputProps={{ readOnly: true }}
                      onChange={(value) => {
                        if(value !== ' '){
                          let dateInput = "dateInput";

                          
                          let isValidDate = validateDate(value)
                          console.log("isValidDate",isValidDate)
                          if(isValidDate){
                            settingDateDob(value, dateInput);
                          }
                          
                        }
                      }}
                      renderInput={(props) => (
                        <TextField {...props} size="small" 
                        // disabled={true}
                        />
                      )}
                      name="dob"
                      defaultValue=""
                      inputFormat="dd/MM/yyyy"
                      format="DD-MM-YYYY"
                    />
                  </LocalizationProvider>

                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.dob?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* // Age //  */}
              <Grid
                item
                lg={1}
                sm={2}
                sx={{
                  marginY: "0.6rem",
                }}
              >
                <InputField
                  name="age"
                  label="Age"
                  error={errors.age}
                  control={control}
                  inputRef={{
                    ...register("age", {
                      onChange: (e) => {
                        setValue("age", e.target.value);
                        let enteredAge = e.target.value;
                        getDateOfBirth(enteredAge).then((response) => {
                          let value = response.data.result;
                          settingDobAgeApi(value);
                        });
                      },
                    }),
                  }}
                />
              </Grid>

              {/* - dob - add */}
              {/* ageInYears */}
              <Grid
                item
                lg={1}
                sm={2}
                sx={{
                  marginY: "0.6rem",
                }}
              >
                <InputField
                  disabled={true}
                  name="ageInYears"
                  label="Year/s"
                  error={errors.ageInYears}
                  control={control}
                />
              </Grid>
              {/* ageInMonths */}
              <Grid
                item
                lg={1}
                sm={2}
                sx={{
                  marginY: "0.6rem",
                }}
              >
                <InputField
                  disabled={true}
                  name="ageInMonths"
                  label="Month/s"
                  error={errors.ageInMonths}
                  control={control}
                />
              </Grid>
              {/* Day */}
              <Grid
                item
                lg={1}
                sm={2}
                sx={{
                  marginY: "0.6rem",
                }}
              >
                <InputField
                  disabled={true}
                  name="ageInDays"
                  label="Day/s"
                  error={errors.ageInDays}
                  control={control}
                />
              </Grid>

              
              {/* <Box width="100%" /> */}
              {/* ISD */}
              <Grid item lg={1.25} sm={2} sx={{marginTop:{sm:"0.75rem",lg:"0rem"}}} className="lg:-translate-y-2  z-20">
                <DropdownField
                  control={control}
                  error={errors.mobileISD}
                  name="mobileISD"
                  dataArray={isds}
                  placeholder="ISD *"
                  isSearchable={false}
                  isClearable={false}
                />
              </Grid>
              {/* Mobile No. */}
              <Grid item lg={2.75} sm={4} sx={{marginTop:{sm:"0.75rem",lg:"0rem"}}} className="-translate-y-2 z-10">
                <InputField
                  InputProps={{
                    '& .MuiOutlinedInput-input': {
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                    },}
                  }}
                  type="number"
                  name="mobileNumber"
                  label="Mobile Number *"
                  error={errors.mobileNumber}
                  control={control}
                />
              </Grid>
              {/* ///Indentification Doc// */}
              <Grid item lg={4} sm={6} className="-translate-y-2 z-20">
                <DropdownField
                  control={control}
                  error={errors.citizenIdProof}
                  name="citizenIdProof"
                  dataArray={documentTypes}
                  placeholder="Identification Doc "
                  inputRef={{
                    ...register("citizenIdProof", {
                      onChange: (e) => {
                        
                        let option = e.target.value;
                        if(option !== null){
                          setDocumentType(option.label);
                          setValue("identificationDocumentNumber","")
                          clearErrors("identificationDocumentNumber");
                        }else{
                          setValue('identificationDocumentNumber','')
                        }
                      },
                    }),
                  }}
                isSearchable={false}
                isClearable={true}
                />
              </Grid>
              {/* Adhar No */}
              <Grid item lg={4} sm={6}>
                <Controller
                  control={control}
                  name="identificationDocumentNumber"
                  // rules={{
                  //   required: true,
                  // }}
                  className="w-[100%]"
                  render={({ field }) => (
                    <TextField
                      disabled={citizenIdProof ? false : true}
                      variant="outlined"
                      // label="Aadhar No."
                      type={documentType.toLowerCase() === "aadhar" ? "number":"text"}
                      label={`${documentType} `}
                      fullWidth
                      className="-translate-y-2 "
                      size="small"
                      {...field}
                      error={Boolean(errors.identificationDocumentNumber)}
                      helperText={errors.identificationDocumentNumber?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="rounded-md  bg-white shadow-md px-3 py-1 my-2 ">
          <div className="mt-1 px-1 rounded-md tracking-wide text-base font-bold ">
            Appointment Info
          </div>
          <Grid container sx={{marginY:'0.3rem'}} spacing={1} className="justify-center w-full mt-3  ">
            {/* Type Of Paitent */}
            <Grid item lg={4} md={4} sm={6}>
              <DropdownField
                control={control}
                error={errors.patientCategory}
                name="patientCategory"
                dataArray={patientTypes}
                placeholder="Select Patient Category *"
                isSearchable={false}
              />
            </Grid>

            {/* Appointment Booking Source */}
            <Grid item lg={4} md={4} sm={6}>
              <DropdownField
                control={control}
                error={errors.appointmentBookingSource}
                name="appointmentBookingSource"
                label="Booking Source"
                dataArray={bookingSources}
                placeholder="Booking Source"
                isSearchable={false}
                isClearable={false}
              />
            </Grid>

            {/* Type Of Appointment */}
            <Grid item lg={4} md={4} sm={6}>
              <DropdownField
                control={control}
                error={errors.appointmentType}
                name="appointmentType"
                dataArray={appointmentTypes}
                placeholder="Type Of Appointment *"
                isSearchable={false}
                isClearable={false}
              />
            </Grid>

            {/* Paitent complaints */}
            <Grid item lg={12} md={12} sm={6} className="-z-0">
              <InputField
                name="complaints"
                variant="outlined"
                label="Complaints and Remarks"
                error={errors.complaints}
                inputRef={{
                  ...register("complaints", {
                    onChange: (e) => {
                      if(e.target.value == ""){
                      setValue("complaints",null );}
                    },
                  }),
                }}
                control={control}
              />
            </Grid>
          </Grid>
        </div>
        <div className="rounded-md  bg-white shadow-md px-3 py-1 my-2 ">
          <div className=" mt-1 px-1 rounded-md tracking-wide text-base font-bold ">
          Referral Info
          </div>
          <Grid container sx={{marginY:'0.3rem'}} spacing={1} className="w-full ">
            {/* Referral Type */}
            <Grid item lg={4} sm={4}>
              <DropdownField
                control={control}
                error={errors.referType}
                name="referType"
                label="Referral Type"
                dataArray={referralTypes}
                placeholder="Referral Type"
                isSearchable={false}
                isClearable={true}
              />
            </Grid>

            {/* Refer Doctor */}
            <Grid item lg={4} sm={4}>
              <CreateAbleSelect
                control={control}
                error={errors.referBy}
                name="referBy"
                label="Referral Name"
                dataArray={referralDoctors}
                placeholder="Referral Name"
              />
            </Grid>
          </Grid>
        </div>
        <div className="rounded-md bg-white shadow-md px-3 py-1 my-2 ">
          <div className="my-1 px-1 pb-2 rounded-md tracking-wide text-base font-bold mb-6">
            Time Slot
          </div>
          <Grid container sx={{marginY:'0.5rem'}} spacing={{sm:"0.75rem",lg:"0rem"}} className="flex lg:justify-between w-full">
            {/* Department */}
            <Grid item lg={2.4} sm={4}>
              <DropdownField
                control={control}
                error={errors.department}
                name="department"
                dataArray={departments}
                placeholder="Departments *"
                isSearchable={false}
                inputRef={{
                  ...register("department", {
                    onChange: (e) => {
                      let departmentId= e.target.value.value
                      callDepartmentDependentApi(departmentId)
                      // calling SubDepartments
                      
                    },
                  }),
                }}
              />
            </Grid>
            {/* SubDepartment */}
            <Grid item lg={2.4} sm={4}>
              <DropdownField
                control={control}
                error={errors.subDepartment}
                name="subDepartment"
                label="Sub Department"
                dataArray={subDepartments}
                placeholder="Sub Department"
                isSearchable={false}
              />
            </Grid>
            {/* Doctor */}
            <Grid item lg={2.3} sm={4}>
              <DropdownField
                control={control}
                error={errors.employee}
                name="employee"
                dataArray={doctors}
                placeholder="Doctors *"
                inputRef={{
                  ...register("employee", {
                    onChange: (e) => {
                      selectDoctor(e);
                    },
                  }),
                }}
                isSearchable={false}
              />
            </Grid>
            {/* //Date of Appointment // */}
            <Grid item lg={2.3} sm={4} >
              <FormControl
                sx={
                  {
                    // width: "19%",
                  }
                }
                fullWidth
                size="small"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                  
                    disablePast
                    label="Appointment Date"
                    value={dateIs}
                    inputProps={{ readOnly: true }}
                    onChange={(value) => {
                      if(value!==''){
                        let isValidDate = validateDate(value)
                          console.log("isValidDate",isValidDate)
                          if(isValidDate){
                            setDate(value);
                          }
                      }
                    }}
                    renderInput={(props) => (
                      <TextField {...props} size="small"  
                      // disabled={true}
                      />
                    )}
                    name="appointmentDate"
                    defaultValue=""
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.appointmentDate?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item lg={2.3} sm={4}  className="flex space-x-1">
            {showTimeSlot ? (
              <>
                  <Controller
                    name="appointmentTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-read-only-input"
                        name="appointmentTime"
                        InputProps={{
                          readOnly: true,
                        }}
                        size="small"
                        {...field}
                      />
                    )}
                  />
                  <IconButton
                    aria-label="EditIcon"
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                    className="-translate-y-2 w-[4%] "
                  >
                    <Edit variant="outlined" color="primary" />
                  </IconButton>
                  </>
            ) : (
                <FormControl className="w-full">
                  <TextField
                    type="button"
                    variant="outlined"
                    color="primary"
                    // sx={{ width:'19%' }}
                    fullWidth
                    size="small"
                    onClick={handleOpen}
                    value="View Slots"

                    // error={Boolean(errors.appointmentTime)}
                    // helperText={errors.appointmentTime?.message}
                  />
                  {showTimeSlot ? (
                    <></>
                  ) : (
                    <>
                      <FormHelperText style={{ color: "#d32f2f" }}>
                        {errors.appointmentTime?.message}
                      </FormHelperText>
                    </>
                  )}
                </FormControl>
            )}
            
            </Grid>
          </Grid>
          {/* modal */}
          <Modal
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
                // width: 'auto',
                // maxWidth: '800',
                textAlign:'center',
                bgcolor: "background.paper",
                
                border: "2px solid #848211",
                // border: "2px solid #000",
                boxShadow: 24,
                minWidth:{sm:timeSlotsArr.length>0 ? "94%":"fit-content",lg:timeSlotsArr.length>0 ? "70%":"fit-content"},
                p: 4,
              }}

              className={timeSlotsArr.length > 0 ? "w-fit max-h-[90%]":"min-w-[80%] max-h-[90%]"}
            >
              {timeSlotsArr.length > 0 ? (
                <>
                  <div className="flex justify-between mb-4 w-[96%] lg:w-[90%]  mx-auto ">
                      <div className="w-7/12 lg:w-2/4 flex space-x-4">
                          <h1 className='pl-5 text-2xl font-bold'>Select Slot</h1>
                          <div className="flex justify-start w-4/6 lg:w-2/6 ml-12">
                          {/* <div>DATE:</div> */}
                          <div className='mb-2'>
                            {/* <IconButton
                              aria-label="CalendarMonthOutlinedIcon"
                              size="large"
                              className=" bg-slate-200"
                            > */}
                              <CalendarMonthOutlined fontSize="large"
                                style={{ color: "#127C9E", marginRight:'0.5rem' }}
                              />
                            {/* </IconButton> */}
                          </div>
                          <div className="mt-2">{apDate}</div>
                        </div>
                      </div>

                      <div className=" w-5/12 flex justify-end lg:justify-items-stretch space-x-3">
                        
                        <Grid  container sx={{justifyContent: 'flex-end'}}
              // spacing={} 
              className="">
                          <Grid  item  lg={0.1}  sm={7}></Grid>
                          <Grid  item  lg={3.9}  sm={5} className="flex mx-4 space-x-2 mt-2">
                            <div className="rounded-full text-[#127C9E] w-6 h-6">
                            <CircleIcon color='#127C9E'
                            sx={{color:"#127C9E"}}
                            />
                            </div>

                            <h1>Selected</h1>
                          </Grid>
                          <Grid  item  lg={0.1}  sm={7}></Grid>
                          <Grid  item  lg={3.9}  sm={5} className="flex mx-4 space-x-2 mt-2">
                            <div className="rounded-full w-6 h-6"><RadioButtonUncheckedIcon color='#127C9E'
                            sx={{color:"#127C9E"}}
                            /></div>
                            <h1>Available</h1>
                          </Grid>
                          <Grid  item  lg={0.1}  sm={7}></Grid>
                          <Grid  item  lg={3.9}  sm={5} className="flex mx-4 space-x-2 mt-2">
                            <div className="">
                            <CircleIcon color='#e2e8f0' className="rounded-full w-fit h-fit"
                            sx={{color:"#e2e8f0", border:"1 solid black", borderRadius: '9999px', padding:'1'}}
                            />
                            {/* <RadioButtonUncheckedIcon color='#475569' 
                            sx={{color:"#475569", backgroundColor:'#e2e8f0',
                            borderRadius: '9999px'}}
                            /> */}
                            </div>
                            <h1>Booked</h1>
                          </Grid>
                        </Grid>
                      </div>
                  </div>

                    <div className=" mx-auto p-4 gap-2   w-[80%] pr-10">
                    <Grid
              container
              spacing={1}
              sx={{maxHeight:'24rem'}}
              className="py-4  my-1 px-1 rounded-md flex flex-wrap  overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50"
            >
              
                      {timeSlotsArr.map((item, index) => {
                        return (
                          <Grid key={index}
                                    item
                                    lg={2.4}
                                    sm={2.4}
                                    className=" mx-auto px-1 rounded-md text-xl font-semibold"
                                    
                                  >
                            {!item.isBooked ? (
                              <>
                                  {timeIndexGiven === index ? (
                                    
                                    <Button
                                    fullWidth
                                    disableFocusRipple
                                    variant="contained"
                                    // color="#127C9E"
                                    onClick={() => changeCategory(index)}
                                    sx={{
                                      width:'90%',
                                      backgroundColor:'#127C9E',color:"white", 
                                    ':hover': {
                                      bgcolor: '#127C9E',
                                      color: 'white',
                                    },
                                  }}
                                  >
                                        {item.fromTimeDisplay}
                                      </Button>
                                  ) : (
                                      <Button
                                      fullWidth
                                      variant="outlined"
                                      // color="primary"
                                      onClick={() => changeCategory(index)}
                                      sx={{
                                        width:'90%', border: "2px solid #127C9E" }}
                                    >
                                      
                                      {item.fromTimeDisplay}
                                    </Button>
                                  )}
                              </>
                            ) : (
                              
                              <Button
                                    fullWidth
                                    disabled={true}
                                    disableFocusRipple
                                    variant="outlined"
                                    // color="#127C9E"
                                    onClick={() => changeCategory(index)}
                                    sx={{
                                      width:'90%', border: "2px solid #94a3b8", backgroundColor:'#f8fafc',color:"#94a3b8", 
                                    ':hover': {
                                      border: "2px solid #94a3b8",
                                      bgcolor: '#f8fafc',
                                      color: '#94a3b8',
                                    },
                                  }}
                                  >
                                        {item.fromTimeDisplay}
                                      </Button>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="text"
                        color="info"
                        sx={{ width: "19%", mt: 2 }}
                        fullWidth
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outlined"
                        color="info"
                        sx={{ width: "19%", border: "2px solid", mt: 2 }}
                        fullWidth
                        onClick={gettingTimeInfo}
                      >
                        Proceed
                      </Button>
                    </div>
                </>
              ) : (<>
                {
                  watchDoctor == ""  ? ( 
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Please Select A Doctor {console.log("watchDoctor",watchDoctor)}
                  </Typography>
                  ):(<>
                    { spinner ? (
                      <div className="grid justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : 
                  (<Typography id="modal-modal-title" variant="h6" component="h2">
                  No Time Slot is Available {console.log("watchDoctor",watchDoctor)}
                </Typography>)
                  }
                </>
                )
                }
                </>
                
              )}
            </Box>
          </Modal>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            onClick={formReset}
            variant="outlined"
            color="error"
            // sx={{ marginRight: "1rem", border: "2px solid" }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginRight: "1rem"}}
          >
            Submit
          </Button>
        </div>
      </form>
      </Box>

      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        confirmationSubmitFunc={(e) => {
          
          postDataFinal();
        }}
        confirmationLabel="Confirmation "
        confirmationMsg="Do you want to confirm the Appointment ?"
        confirmationButtonMsg="Confirm Appointment"
      />
      {/* //Confirmation Modal// */}

      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
    </div>
  );
};

export default AppointmentPage;
