import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import BlankProfile from "../../../../OPD/assets/Images/blankProfile.jpeg";
import PersonalDetails from "./personaldetails/PersonalDetails";
import { useForm, FormProvider } from "react-hook-form";
import {
  personalValidationSchema,
  admissionValidationSchema,
} from "./common component/formSchema/admissionValidationSchema";
import AdmissionsDetails from "./admissiondetails/AdmissionsDetails";
import BedInfoTab from "./BedInfoTab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import {
  errorAlert,
  successAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import { SubmitButton } from "../../../../Common Components/Buttons/CommonButtons";
import NextButton from "../../../../Common Components/Buttons/NextButton";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import { saveAdmissionData } from "../../../services/admissiondetails/admissionDetailsService";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import NRIDetails from "./nridetails/NRIDetails";

// import DocumentDetails from "./documentDetails/DocumentDetails";
// import NRIDetails from "./nriDetails/NRIDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdmissionForm() {
  const [value, setValue] = React.useState(0);
  const [errorLength, setErrorLength] = React.useState();
  const [isBedDetails, setIsBedDetails] = React.useState();
  const [formDetails, setFormDetails] = useState({});
  const [formData, setFormData] = React.useState();
  const [mobileValue, setMobileValue] = useState(null);
  //useState to setProfile Pic for Patient
  const [profilePic, setProfilePic] = React.useState(BlankProfile);
  const [profilePicName, setProfilePicName] = React.useState(null);
  //useState to Identification Document File for Patient
  const [identificationDocFile, setIdentificationDocFile] = React.useState("");
  const [
    identificationDocFileName,
    setIdentificationDocFileName,
  ] = React.useState(null);
  //useState to Income Document File for Patient
  const [incomeFile, setIncomeFile] = React.useState("");
  const [incomeFileName, setIncomeFileName] = React.useState(null);

  //useState to Representative Document File for Patient
  const [representativeDocFile, setRepresentativeDocFile] = React.useState("");
  const [representativeFileName, setRepresentativeFileName] = React.useState(
    null
  );

  const [errorDoctorDetails, setErrorDoctorDetails] = React.useState(
    "invisible"
  );
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useLocation to Get Bed Details
  let location = useLocation();
  let bedDetailsData = location.state;
  console.log("Location", bedDetailsData);

  const navigate = useNavigate();
  useEffect(() => {
    if (bedDetailsData !== null) {
      setIsBedDetails(true);
    }
  }, [bedDetailsData]);

  // let personalDetailsSchema = personalValidationSchema;
  const methods1 = useForm({
    mode: "onChange",
    resolver: yupResolver(personalValidationSchema),
    defaultValues: {
      isEmergency: false,
      email: "",
      prefix: null,
      firstName: "",
      middleName: "",
      lastName: "",
      dob: new Date(),
      age: "0",
      ageInYears: "0",
      ageInMonths: "0",
      ageInDays: "0",
      gender: null,
      isd: {
        id: 1,
        value: 1,
        label: "+91",
      },
      mobileNumber: "",
      maritalStatus: null,
      nationality: {
        id: 1,
        value: 1,
        label: "Indian",
      },
      bloodGroup: null,
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
      //Income Info
      income: null,
      incomeDocument: null,
      //Representative Info
      nameOfRepresentative: "",
      mobileNumberOfRepresentative: "",
      relationshipWithPatient: "",
      address: null,
      repCitizenIdProof: null,
      repIdentificationDocumentNumber: null,
      // Remark Details
      remarkForAccount: null,
      remarkForBill: null,
    },
  });

  const methods2 = useForm({
    mode: "onChange",
    resolver: yupResolver(admissionValidationSchema),
    defaultValues: {
      //Admission Details
      isMedicine: false,
      isOperative: false,
      ipdNo: null,
      admissionDate: new Date(),
      admissionTime: new Date(),
      unit: null,
      department: null,
      subDepartment: null,
      employee: null, //Here Employee key Used for Doctor
      patientSource: null,
      camp: null,
      tariff: null,
      patientCategory: null,
      company: null,
      assistantCompany: null,
      idNo: null,
      code: null,
      ipdLimit: null,
      used: null,
      empname: null,
      //Reference Details
      referralType: null,
      referralDoctor: null,
      //Doctor Details
      doctorDetails: [{ internalReferenceDoctor: null }],

      //Bed Details
      // bedCategory: "",
      // chargesPerBedCategory: null,
      // ward: "",
      // floor: "",
      // bedNo: "",

      //CheckBoxs
      lockIndent: false,
      medicoLegalCase: false,
      // isCashPayment: false,
      vaccineApplicable: false,
    },
  });

  const methods3 = useForm({
    mode: "onChange",
    // resolver: yupResolver(),
    defaultValues: {
      pendingPassportDetails: false,
      passportNumber: "",
      placeOfIssue: "",
      dateOfIssue: new Date(),
      validTill: new Date(),
      visaNumber: "",
      placeOfVisaIssue: "",
      dateOfVisaIssue: new Date(),
      validVisaTill: new Date(),
    },
  });

  let finalObject = {
    email: null,
    patientImageName: null,
    patientImageBase64: null,
    prefix: null,
    firstName: null,
    middleName: null,
    lastName: null,
    dob: null,
    gender: null,
    mobileNumber: null,
    maritalStatus: null,
    bloodGroup: null,
    nationality: null,
    citizenIdProof: null,
    identificationDocumentNumber: null,
    // identificationDocFileName: null,
    // identificationDocFilePath: null,

    //Address Details
    houseFlatNumber: null,
    streetAddress: null,
    area: null,
    city: null,
    taluka: null,
    district: null,
    state: null,
    country: null,
    pinCode: null,

    //Income Details
    income: null,
    // incomeFileName:null,
    // incomeFilePath:null,

    //Representative Details
    mobileNumberOfRepresentative: null,
    nameOfRepresentative: null,
    relationshipWithPatient: null,
    address: null,
    repCitizenIdProof: null,
    repIdentificationDocumentNumber: null,
    // representativeFileName:null,
    // representativeDocFilePath:null,

    //Remark Details
    remarkForAccount: null,
    remarkForBill: null,

    //Admission Details
    isMedicine: null,
    isOperative: null,
    ipdNo: null,
    unit: null,
    department: null,
    subDepartment: null,
    employee: null,
    patientSource: null,
    // camp:null,
    tariff: null,
    patientCategory: null,
    // code: null,
    // ipdLimit: null,
    // used: null,
    // staffName: null,
    // company: null,
    // assistantCompany: null,
    // idNo: null,

    // bed Details
    bedCategory: null,
    block: null,
    floor: null,
    ward: null,

    // CheckBox Details
    isNewBornBaby: null,
    lockIndent: null,
    medicoLegalCase: null,
    vaccineApplicable: null,
  };

  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors: errors },
    control,
  } = methods1;

  const {
    handleSubmit: handleSubmit2,
    watch: watch2,
    register: register2,
    reset: reset2,
    formState: { errors: errors2 },
    control: control2,
  } = methods2;

  const {
    handleSubmit: handleSubmit3,
    watch: watch3,
    register: register3,
    reset: reset3,
    formState: { errors: errors3 },
    control: control3,
  } = methods3;

  // let formDetails;

  // let errorLength;
  useEffect(() => {
    console.log("Errors", errors);
    //   // errorLength = Object.keys(errors).length;
    //   setErrorLength(Object.keys(errors).length);
    //   console.log("errorLength", errorLength);
    //   if (errorLength === 0 && value !== 1) {
    //     setValue(value + 1);
    //   }
  }, [errors]);

  const countryValue = watch("country");

  const onPersonalDetailsSubmit = (data) => {
    console.log("Personal Details", data);
    setFormDetails({ ...data });
    setValue(value + 1);
  };

  const onAdmissionDetailsSubmit = (data) => {
    console.log("Admission Details", formDetails);
    setFormDetails({ ...formDetails, ...data });
    if (countryValue !== null && countryValue.label.toLowerCase() !== "india") {
      if (bedDetailsData && bedDetailsData !== null) {
        console.log("Form Details", formDetails);
        setIsBedDetails(true);
        setValue(value + 1);
      } else {
        setIsBedDetails(false);
      }
    } else {
      console.log("Country", countryValue);
      if (bedDetailsData && bedDetailsData !== null) {
        console.log("Form Details", formDetails);
        setIsBedDetails(true);
        setOpen(true);
      } else {
        setIsBedDetails(false);
      }
    }
  };

  const onNRIDetailsSubmit = (data) => {
    console.log("Data", formDetails);
    setFormDetails({ ...formDetails, ...data });
    setOpen(true);
  };

  const handleFormSubmit = (data) => {
    setOpen(false);
    setOpenBackdrop(true);
    console.log("Form Data ", data);

    data.email !== ""
      ? (finalObject.email = data.email)
      : (finalObject.email = null);
    finalObject.patientImageName = profilePicName;
    let profilePicString = profilePic.toString().split(",")[1];
    finalObject.patientImageBase64 = profilePicString;
    finalObject.prefix = { id: parseInt(data.prefix.value) };
    data.firstName !== ""
      ? (finalObject.firstName =
          data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1))
      : (finalObject.firstName = null);
    data.middleName !== ""
      ? (finalObject.middleName =
          data.middleName.charAt(0).toUpperCase() + data.middleName.slice(1))
      : (finalObject.middleName = null);
    data.lastName !== ""
      ? (finalObject.lastName =
          data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1))
      : (finalObject.lastName = null);
    finalObject.dob = data.dob;
    finalObject.gender = { id: parseInt(data.gender) };
    finalObject.mobileNumber = data.mobileNumber;
    data.maritalStatus !== null
      ? (finalObject.maritalStatus = data.maritalStatus.label)
      : (finalObject.maritalStatus = null);
    data.bloodGroup !== null
      ? (finalObject.bloodGroup = data.bloodGroup.label)
      : (finalObject.bloodGroup = null);
    data.nationality !== null
      ? (finalObject.nationality = { id: parseInt(data.nationality.value) })
      : (finalObject.nationality = null);
    data.citizenIdProof !== null
      ? (finalObject.citizenIdProof = {
          id: parseInt(data.citizenIdProof.value),
        })
      : (finalObject.citizenIdProof = null);
    data.identificationDocumentNumber !== ""
      ? (finalObject.identificationDocumentNumber =
          data.identificationDocumentNumber)
      : (finalObject.identificationDocumentNumber = null);
    // finalObject.identificationDocFileName = incomeFileName;
    // let identificationFile = identificationDocFile.toString().split(",")[1];
    // finalObject.identificationDocFilePath = identificationFile;

    //Address Details
    data.houseFlatNumber !== ""
      ? (finalObject.houseFlatNumber = data.houseFlatNumber)
      : (finalObject.houseFlatNumber = null);
    data.streetAddress !== ""
      ? (finalObject.streetAddress = data.streetAddress)
      : finalObject.streetAddress == null;
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
    data.pinCode !== null
      ? (finalObject.pinCode = { id: parseInt(data.pinCode.value) })
      : (finalObject.pinCode = null);

    //Income Details
    data.income !== null
      ? (finalObject.income = { id: parseInt(data.income.value) })
      : (finalObject.income = null);
    // finalObject.incomeFileName = incomeFileName;
    // let incomeFilePath = incomeFile.toString().split(",")[1];
    // finalObject.incomeFilePath = incomeFilePath;

    //   //Representative Details
    data.nameOfRepresentative !== null
      ? (finalObject.nameOfRepresentative =
          data.nameOfRepresentative.charAt(0).toUpperCase() +
          data.nameOfRepresentative.slice(1))
      : (finalObject.nameOfRepresentative = null);
    finalObject.mobileNumberOfRepresentative =
      data.mobileNumberOfRepresentative;
    data.relationshipWithPatient !== null
      ? (finalObject.relationshipWithPatient =
          data.relationshipWithPatient.charAt(0).toUpperCase() +
          data.relationshipWithPatient.slice(1))
      : (finalObject.relationshipWithPatient = null);
    finalObject.address = data.address;
    data.repCitizenIdProof && data.repCitizenIdProof !== null
      ? (finalObject.repCitizenIdProof = {
          id: parseInt(data.repCitizenIdProof.value),
        })
      : (finalObject.citizenIdProof = null);
    finalObject.repIdentificationDocumentNumber =
      data.repIdentificationDocumentNumber;
    // finalObject.representativeFileName = representativeFileName;
    // let representativeDocFile = representativeDocFile.toString().split(",")[1];
    // finalObject.representativeDocFilePath = representativeDocFile;

    //Remark for Account
    finalObject.remarkForAccount = data.remarkForAccount;
    finalObject.remarkForBill = data.remarkForBill;

    //*****Admission Details */
    //Admission Info
    finalObject.isMedicine = data.isMedicine;
    finalObject.isOperative = data.isOperative;
    finalObject.ipdNo = data.ipdNo;
    finalObject.unit = { id: parseInt(data.unit.value) };
    finalObject.department = { id: parseInt(data.department.value) };
    data.subDepartment !== null
      ? (finalObject.subDepartment = { id: parseInt(data.subDepartment.value) })
      : (finalObject.subDepartment = null);
    finalObject.employee = { id: parseInt(data.employee.value) };
    data.patientSource !== null
      ? (finalObject.patientSource = { id: parseInt(data.patientSource.value) })
      : (finalObject.patientSource = null);
    data.camp !== null
      ? (finalObject.camp = { id: parseInt(data.camp.value) })
      : (finalObject.camp = null);
    finalObject.tariff = { id: parseInt(data.tariff.value) };
    finalObject.patientCategory = { id: parseInt(data.patientCategory.value) };
    //Condition To Save Data Based on Patient Category
    // if (data.patientCategory.label.toLowerCase() === "self") {
    //   delete finalObject.code;
    //   delete finalObject.ipdLimit;
    //   delete finalObject.used;
    //   delete finalObject.staffName;
    //   delete finalObject.company;
    //   delete finalObject.assistantCompany;
    //   delete finalObject.idNo;
    // } else if (data.patientCategory.label.toLowerCase() === "staff") {
    //   delete finalObject.company;
    //   delete finalObject.assistantCompany;
    //   delete finalObject.idNo;
    //   finalObject.code = data.code;
    //   finalObject.ipdLimit = data.ipdLimit;
    //   finalObject.used = data.used;
    //   finalObject.staffName = data.staffName;
    // } else {
    //   delete finalObject.code;
    //   delete finalObject.ipdLimit;
    //   delete finalObject.used;
    //   delete finalObject.staffName;
    //   finalObject.company = { id: parseInt(data.company.value) };
    //   finalObject.assistantCompany = data.assistantCompany;
    //   finalObject.idNo = data.idNo;
    // }
    // bed Details
    finalObject.bedCategory = { id: parseInt(bedDetailsData.bedcategory.id) };
    finalObject.block = { id: parseInt(bedDetailsData.block.id) };
    finalObject.floor = { id: parseInt(bedDetailsData.floors.id) };
    finalObject.ward = { id: parseInt(bedDetailsData.ward.id) };
    finalObject.room = { id: parseInt(bedDetailsData.room.id) };
    finalObject.bed = { id: parseInt(bedDetailsData.bedId) };

    //Check Box
    finalObject.lockIndent = data.lockIndent;
    finalObject.medicoLegalCase = data.medicoLegalCase;
    finalObject.vaccineApplicable = data.vaccineApplicable;
    finalObject.isNewBornBaby = data.isNewBornBaby;

    console.log("Final Object", finalObject);
    saveAdmission(finalObject);

    reset();
    reset2();
    setValue(0);
  };

  const { mutate: saveAdmission } = useMutation(
    saveAdmissionData,
    {
      onSuccess: (response) => {
        console.log("RESP", response.data.statusCode);
        if (response.status === 200) {
          successAlert(response.data.message);
          delete location.state;
          navigate("/ipd/admissionlist", { replace: true });
        } else {
          errorAlert(response.data.message);
        }
        setOpenBackdrop(false);
      },
    },
    {
      onError: (err) => {
        console.log("Error", err);
        errorAlert(err.data.message);
        setOpenBackdrop(false);
      },
    }
  );

  return (
    <div className="my-4 ml-2 mt-[4.5rem] ">
      {/* <p
        className="text-[1.2rem] font-semibold my-2  text-black font-Poppins"
        style={{ wordSpacing: "0.2rem" }}
      >
        Admission Details
      </p> */}
      <div className="sticky top-[3.5rem] z-30 mx-4 mb-2">
        <BedInfoTab
          bedDetailsData={bedDetailsData}
          isBedDetails={isBedDetails}
        />
      </div>

      <Box
        sx={{
          width: "100%",
          paddingX: "1rem",
          paddingY: "0.5rem",
        }}
      >
        {/* //Tab Heading// */}
        <Box
          sx={{
            position: "sticky",
            top: { sm: "8.2rem", lg: "7.52rem" },
            zIndex: "30",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              backgroundColor: "#dfe6e9",
              // borderRadius: "5px",
            }}
          >
            <Tab
              label="Personal Details"
              {...a11yProps(0)}
              sx={{
                fontWeight: "bold",
                color: "black",
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="Admission Details"
              {...a11yProps(1)}
              sx={{
                fontWeight: "bold",
                color: "black",
                textTransform: "capitalize",
              }}
            />
            {countryValue !== null &&
            countryValue.label.toLowerCase() !== "india" ? (
              <Tab
                label="NRI Details"
                {...a11yProps(2)}
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  textTransform: "capitalize",
                }}
              />
            ) : (
              ""
            )}
            {/*<Tab
              label="Documents"
              {...a11yProps(3)}
              sx={{
                fontWeight: "bold",
                color: "black",
                textTransform: "capitalize",
              }}
            /> */}
          </Tabs>
        </Box>

        <div className="-mx-2">
          <FormProvider {...methods1}>
            <form onSubmit={methods1.handleSubmit(onPersonalDetailsSubmit)}>
              {/* //Personal Details// */}
              <TabPanel value={value} index={0}>
                <PersonalDetails
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                  setProfilePicName={setProfilePicName}
                  identificationDocFile={identificationDocFile}
                  setIdentificationDocFile={setIdentificationDocFile}
                  setIdentificationDocFileName={setIdentificationDocFileName}
                  incomeFile={incomeFile}
                  setIncomeFile={setIncomeFile}
                  setIncomeFileName={setIncomeFileName}
                  representativeDocFile={representativeDocFile}
                  setRepresentativeDocFile={setRepresentativeDocFile}
                  setRepresentativeFileName={setRepresentativeFileName}
                  mobileValue={mobileValue}
                  setMobileValue={setMobileValue}
                />
              </TabPanel>
              <div className="flex justify-end">
                <div className="mr-4  my-2">
                  {value === 0 && value !== 2 ? <NextButton /> : ""}
                </div>
              </div>
            </form>
          </FormProvider>

          {/* //Admissions Details// */}
          <FormProvider {...methods2}>
            <form onSubmit={methods2.handleSubmit(onAdmissionDetailsSubmit)}>
              <TabPanel value={value} index={1}>
                <AdmissionsDetails
                  errorDoctorDetails={errorDoctorDetails}
                  setErrorDoctorDetails={setErrorDoctorDetails}
                  isBedDetails={isBedDetails}
                />
              </TabPanel>
              <div className="flex justify-end">
                <div className="my-2">
                  {value === 1 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setValue(value - 1);
                      }}
                    >
                      Back
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mx-4 my-2">
                  {value === 1 ? (
                    <Button variant="outlined" color="primary">
                      Print Barcode
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mr-4  my-2">
                  {countryValue !== null &&
                  countryValue.label.toLowerCase() !== "india" &&
                  value === 1 ? (
                    <NextButton />
                  ) : value === 1 ? (
                    <SubmitButton />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </FormProvider>

          {/* //NRI Details // */}
          <FormProvider {...methods3}>
            <form onSubmit={methods3.handleSubmit(onNRIDetailsSubmit)}>
              <TabPanel value={value} index={2}>
                <NRIDetails />
              </TabPanel>
              <div className="flex justify-end">
                <div className="my-2 mx-4">
                  {value !== 0 && value === 2 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setValue(value - 1);
                      }}
                    >
                      Back
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mr-4  my-2">
                  {value === 2 ? <SubmitButton /> : ""}
                </div>
              </div>
            </form>
          </FormProvider>
          {/* //Document Details// */}
          {/* <TabPanel value={value} index={3}>
                <DocumentDetails />
              </TabPanel> */}

          {/* //Buttons// */}
        </div>
      </Box>

      <CommonBackDrop openBackdrop={openBackdrop} />

      <ConfirmationModal
        confirmationOpen={open}
        confirmationHandleClose={handleClose}
        confirmationSubmitFunc={() => handleFormSubmit(formDetails)}
        confirmationLabel="Confirmation "
        confirmationMsg="Are You Sure ?"
        confirmationButtonMsg="Proceed"
      />
    </div>
  );
}
