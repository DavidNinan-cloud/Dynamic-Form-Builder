import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Grid,
  Modal,
} from "@mui/material";
import { patientRegistrationValidationSchema } from "../../Common Components/formSchema/Registration Schema/patientRegistrationValidationSchema";

import BlankProfile from "../../../OPD/assets/Images/blankProfile.jpeg";
import BasicInfo from "./BasicInfo";
import AddressInfo from "./AddressInfo";
import ReferralDoctor from "./ReferralDoctor";
import RepresentativeInfo from "./RepresentativeInfo";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/system";
import {
  getAgeonDOB,
  getArea,
  getBloodGroup,
  getDetailsonPincodeId,
  getMaritalStatus,
  getpatientInfoById,
  getUnitsDropDown,
  registerPatient,
  updatePatientData,
} from "../../../OPD/services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { baseUrl } from "../../http-common";
import {
  warningAlert,
  successAlert,
  errorAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CommonBackdrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
let unitId;
const PatientRegistrationForm = () => {
  //useState to Expanded Accordion
  const [expandPanal1, setExpandPanal1] = useState(true);
  const [expandPanal5, setExpandPanal5] = useState(true);
  const [expandPanal6, setExpandPanal6] = useState(true);
  //useState to get Age based on selected DOB
  const [age, setAge] = useState(0);
  // const [regDate, setRegDate] = useState(new Date());
  const [gender, setGender] = useState("male");
  //useState to setProfile Pic for Patient
  const [profilePic, setProfilePic] = useState(BlankProfile);
  const [profilePicName, setProfilePicName] = React.useState(null);
  const [disableMobileSearch, setDisableMobileSearch] = useState(false);
  const [searchData, setSearchData] = useState(null);

  //useState to Identification Document File for Patient
  const [identificationDocFile, setIdentificationDocFile] = useState("");
  const [identificationDocFileName, setIdentificationDocFileName] = useState(
    null
  );

  const [units, setUnits] = React.useState();
  const [unitId, setUnitId] = React.useState(0);
  const [showUnits, setShowUnits] = React.useState(false);
  const [area, setArea] = useState();
  const [bloodgroups, setBloodgroups] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [pincodeId, setPincodeId] = useState(0);

  const [selectedDoc, setSelectedDoc] = useState();
  const [formData, setFormData] = React.useState();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  let dateValue = "22-05-2022";

  let navigate = useNavigate();

  //Code to edit Patient Info
  const location = useLocation();
  const patientData = location.state;
  console.log("Location", patientData);
  let patientId = null;
  let isViewStatus = null;
  if (patientData !== null) {
    patientId = patientData.patientId;
    if (typeof patientData.isView !== "undefined") {
      console.log("patientData.isView", patientData.isView);
      isViewStatus = patientData.isView;
    }
  }

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

  // API to Get Patient Data
  useEffect(() => {
    console.log("Patinet Data", patientId);
    if (patientId !== null) {
      getpatientInfoById(patientId)
        .then((res) => {
          console.log("Edit Response", res.data.result.area);
          methods.reset(res.data.result);
          setDisableMobileSearch(true);

          getMaritalStatus()
            .then((response) => {
              let maritalArr = response.data.result;
              let val = maritalArr.find(
                (x) => x.label === res.data.result.maritalStatus
              );
              methods.setValue("maritalStatus", val, { shouldValidate: true });
            })
            .catch((response) => {
              console.log(response);
            });

          getBloodGroup()
            .then((response) => {
              let bloodGroupArr = response.data.result;
              let blood = bloodGroupArr.find(
                (bloodType) => bloodType.label === res.data.result.bloodGroup
              );
              methods.setValue("bloodGroup", blood, {
                shouldValidate: false,
              });
            })
            .catch((err) => {
              console.log("Error", err);
            });

          setPincodeId(parseInt(res.data.result.pinCode.value));

          if (res.data.result.patientImagePath !== null) {
            setProfilePic(`${baseUrl}/file${res.data.result.patientImagePath}`);
          } else {
            setProfilePic(BlankProfile);
          }
          methods.setValue("prefix", {
            id: res.data.result.prefix.value,
            value: res.data.result.prefix.value,
            label: res.data.result.prefix.label,
          });

          methods.setValue("gender", res.data.result.gender.value);
          // res.data.result.gender.value === 1
          //   ? methods.setValue("gender", 1)
          //   : res.data.result.gender.value === 2
          //   ? methods.setValue("gender", 2)
          //   : methods.setValue("gender", 3);
          getAge(res.data.result.dob);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      setDisableMobileSearch(false);
    }
  }, [patientData]);

  //API Get Age based on DOB
  const getAge = (dob) => {
    // let getYear = dob[0];
    // let getMonth = String(dob[1]).padStart(2, "0");
    // let getDay = String(dob[2]).padStart(2, "0");
    // let fullDOB = [getYear, getMonth, getDay].join("-");

    getAgeonDOB(dob)
      .then((response) => {
        methods.setValue("age", response.data.result.years, {
          shouldValidate: true,
        });
        methods.setValue("ageInYears", response.data.result.years);
        methods.setValue("ageInMonths", response.data.result.months);
        methods.setValue("ageInDays", response.data.result.days);
        // setValue("dob", dobGivenYear, dobGivenMonth, day);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const { mutate: savePatient } = useMutation(
    registerPatient,
    {
      onSuccess: (response) => {
        console.log("RESP", response.data.statusCode);
        if (response.data.statusCode === 302) {
          warningAlert(response.data.message);
        } else if (response.status === 200) {
          successAlert(response.data.message);
          handleReset();
          navigate("/opd/patientlist", { replace: true });
        }
        setOpenBackdrop(false);
      },
    },
    {
      onError: (err) => {
        errorAlert(err.data.message);
        setOpenBackdrop(false);
      },
    }
  );

  const { mutate: updatePatient } = useMutation(
    updatePatientData,
    {
      onSuccess: (response) => {
        console.log(response);
        if (response.data.statusCode === 302) {
          warningAlert(response.message);
        } else if (response.status === 200) {
          setIdentificationDocFile("");
          setProfilePic(BlankProfile);
          successAlert(response.data.message);
        }
        navigate("/opd/patientlist", { replace: true });
        setOpenBackdrop(false);
      },
    },
    {
      onError: (err) => {
        errorAlert(err.data.message);
        setOpenBackdrop(false);
      },
    }
  );

  let defaultValues = {
    showUnit: false,
    showEmail: false,
    unit: "",
    //Basic Info
    isd: {
      id: 1,
      value: 1,
      label: "+91",
    },
    mobileNumber: "",
    registrationDate: new Date(),
    prefix: null,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    bloodGroup: null,
    dob: new Date(),
    age: "0",
    ageInYears: "0",
    ageInMonths: "0",
    ageInDays: "0",
    gender: null,
    maritalStatus: null,
    nationality: {
      id: 1,
      value: 1,
      label: "Indian",
    },
    // ethnicity: "",
    // aadharNo: "",
    citizenIdProof: null,
    identificationDocumentNumber: "",

    //Address Info
    houseFlatNumber: "",
    streetAddress: "",
    area: null,
    city: null,
    taluka: null,
    district: null,
    state: null,
    country: null,
    pinCode: null,

    //Referral Doctor
    referralType: null,
    referralDoctor: null,

    //   //Representative Details
    nameOfRepresentative: "",
    mobileNumberOfRepresentative: "",
    // relationshipWithPatient: null,
    relationshipWithPatient: "",
  };

  const schema = patientRegistrationValidationSchema;
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    formState: { errors },
    control,
  } = methods;

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : true);
  // };

  const handleChangePanal1 = () => {
    setExpandPanal1(!expandPanal1);
  };
  const handleChangePanal5 = () => {
    setExpandPanal5(!expandPanal5);
  };

  const handleChangePanal6 = () => {
    setExpandPanal6(!expandPanal6);
  };

  const handleReset = () => {
    setProfilePic(BlankProfile);
    methods.setValue("dob", new Date());
    methods.reset(defaultValues);
  };

  let watchMail = methods.watch("email");
  useEffect(() => {
    if (watchMail !== null && watchMail !== "")
      methods.setValue("showEmail", true);
  }, [watchMail]);

  const finalObject = {
    //   //Basic Info
    isd: null,
    mobileNumber: null,
    registrationDate: null,
    patientImageName: null,
    patientImageBase64: null,
    prefix: null,
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    bloodGroup: null,
    dob: null,
    // years: null,
    // months: null,
    // days: null,
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

    //   //Representative Details
    nameOfRepresentative: null,
    mobileNumberOfRepresentative: null,
    relationshipWithPatient: null,
  };
  const handleFormSubmit = (data) => {
    setOpen(false);
    setOpenBackdrop(true);
    // myObj.gender=data.gender
    // console.log(myObj)
    // data.age = age;
    console.log(data.relationshipWithPatient);

    //Assign Data to Final Object

    patientId !== null ? (finalObject.id = parseInt(patientId)) : null;
    if (data.unit) {
      if (data.unit.value) {
        finalObject.unit = { id: parseInt(data.unit.value) };
      }
    } else {
      finalObject.unit = { id: parseInt(unitId) };
    }
    //Basic Info
    finalObject.isd = { id: parseInt(data.isd.id) };
    finalObject.mobileNumber = data.mobileNumber;
    finalObject.registrationDate = data.registrationDate;
    finalObject.patientImageName = profilePicName;
    let profilePicString = profilePic.toString().split(",")[1];
    finalObject.patientImageBase64 = profilePicString;
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
    // finalObject.years = data.years;
    // finalObject.months = data.months;
    // finalObject.days = data.days;
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
    // finalObject.citizenIdProof = data.identificationDoc.label;
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
    // //Address Info
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

    //   //Representative Details
    data.nameOfRepresentative !== null
      ? (finalObject.nameOfRepresentative =
          data.nameOfRepresentative.charAt(0).toUpperCase() +
          data.nameOfRepresentative.slice(1))
      : (finalObject.nameOfRepresentative = null);

    data.mobileNumberOfRepresentative !== null
      ? (finalObject.mobileNumberOfRepresentative =
          data.mobileNumberOfRepresentative)
      : (finalObject.mobileNumberOfRepresentative = null);
    // data.relationshipWithPatient !== null
    //   ? (finalObject.relationshipWithPatient =
    //       data.relationshipWithPatient.label)
    //   : (finalObject.relationshipWithPatient = null);

    data.relationshipWithPatient !== null
      ? (finalObject.relationshipWithPatient =
          data.relationshipWithPatient.charAt(0).toUpperCase() +
          data.relationshipWithPatient.slice(1))
      : (finalObject.relationshipWithPatient = null);

    console.log(finalObject);

    patientData !== null
      ? updatePatient(finalObject)
      : savePatient(finalObject);
    // setErrorDoc("invisible");
    // methods.reset();
    setOpen(false);
    setGender("male");
    // setExpanded("panel1");
    // setIdentificationDocFile("");
    // setProfilePic(BlankProfile);
    setExpandPanal1(true);
    setExpandPanal5(true);
    setExpandPanal6(true);
  };

  // useEffect(() => {
  //   console.log("errors", errors);
  // }, [errors]);
  const onSubmit = (data) => {
    console.log("Data", data);
    setOpen(true);
    setFormData(data);
  };
  // const handleOpen = () => {};

  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    console.log("isViewStatus", isViewStatus);
    if (isViewStatus === true) {
      setIsDisabled(true);
    }
  }, [isDisabled, isViewStatus]);

  return (
    <div className="bg-gray-50 py-1 mt-14">
      <p className="text-center text-2xl my-2 text-gray-700 font-Poppins">
        Patient Registration
      </p>
      <div className="w-12/12 mx-2 my-4">
        <FormProvider {...methods}>
          <fieldset disabled={isDisabled}>
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
                  <p className="font-bold tracking-wide text-lg font-Poppins">
                    Patient Basic Information
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* //Basic Information // */}
                  {showUnits ? (
                    <div className="grid grid-cols-7 gap-x-3 mb-3">
                      <div className="col-span-2 z-50">
                        <DropdownField
                          control={control}
                          error={errors.unit}
                          name="unit"
                          dataArray={units}
                          placeholder="Unit *"
                          isSearchable={false}
                        />
                      </div>
                    </div>
                  ) : null}
                  <BasicInfo
                    bloodgroups={bloodgroups}
                    setBloodgroups={setBloodgroups}
                    maritalStatus={maritalStatus}
                    setMaritalStatus={setMaritalStatus}
                    selectedDoc={selectedDoc}
                    setSelectedDoc={setSelectedDoc}
                    age={age}
                    setAge={setAge}
                    profilePic={profilePic}
                    setProfilePic={setProfilePic}
                    setProfilePicName={setProfilePicName}
                    gender={gender}
                    setGender={setGender}
                    disableMobileSearch={disableMobileSearch}
                    identificationDocFile={identificationDocFile}
                    setIdentificationDocFile={setIdentificationDocFile}
                    setIdentificationDocFileName={setIdentificationDocFileName}
                    isDisabled={isDisabled}
                    isVisit={true}
                    setSearchData={setSearchData}
                  />
                  <hr className="border my-2 divide-x-8 border-slate-300" />
                  {/* // Address Information // */}
                  <p className="font-bold tracking-wide  text-lg my-3 font-Poppins">
                    Address Details
                  </p>
                  <AddressInfo
                    isDisabled={isDisabled}
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
                  <p className="font-bold tracking-wide  text-lg font-Poppins">
                    Referral Details
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <ReferralDoctor /> */}
                  <ReferralDoctor isDisabled={isDisabled} />
                </AccordionDetails>
              </Accordion>

              {/* /// Representative  Details //// */}
              <Accordion
                expanded={expandPanal6}
                onChange={handleChangePanal6}
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
                  <p className="font-bold tracking-wide text-lg font-Poppins">
                    Representative Details
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <RepresentativeInfo isDisabled={isDisabled} />
                </AccordionDetails>
              </Accordion>
              <div className="flex justify-end my-4">
                {isViewStatus === null ? (
                  patientId !== null ? (
                    <div className="mx-2">
                      <CancelButton onClick={handleReset} />
                    </div>
                  ) : (
                    <div className="mx-3">
                      <ResetButton onClick={handleReset} />
                    </div>
                  )
                ) : (
                  ""
                )}

                {isViewStatus === null ? (
                  patientId !== null ? (
                    <UpdateButton />
                  ) : (
                    <SubmitButton />
                  )
                ) : (
                  ""
                )}
              </div>
            </form>
          </fieldset>
        </FormProvider>
      </div>

      <CommonBackdrop openBackdrop={openBackdrop} />

      {/* //Confirmation Modal// */}
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
export default PatientRegistrationForm;
