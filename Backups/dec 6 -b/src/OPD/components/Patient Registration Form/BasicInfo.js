import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import UploadProfileModal from "./UploadProfileModal";
import BlankProfile from "../../../OPD/assets/Images/blankProfile.jpeg";
import useFileUpload from "../../Common Components/hooks/useFileUpload";
import InputField from "../../../Common Components/FormFields/InputField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  getMobileNo,
  getPrefix,
  getSystemDate,
  getDetailsBasedOnMobileNo,
  getIsdNo,
  getGenders,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getAgeonDOB } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getDOBonAge } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getNationality } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getIdentificationDoc } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { baseUrl } from "../../http-common";
import { getBloodGroup } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import { getMaritalStatus } from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import zIndex from "@mui/material/styles/zIndex";
import SearchBar from "../../../Common Components/FormFields/SearchBar";

// const title = [
//   { value: "mr", label: "Mr." },
//   { value: "mrs", label: "Mrs" },
// ];

// const genders = [
//   { id: 1, value: "male", label: "Male" },
//   { id: 2, value: "female", label: "Female" },
//   { id: 3, value: "other", label: "Other" },
// ];
// const bloodgroups = [

//   { value: "a", label: "A" },
//   { value: "o", label: "O" },
// ];

// const maritalStatus = [
//   { value: "married", label: "Married" },
//   { value: "unmarried", label: "Unmarried" },
// ];

// const nationality = [
//   { id: "1", value: "indian", label: "Indian" },
//   { id: "2", value: "usa", label: "USA" },
// ];

// const identificationDoc = [
//   { value: "aadharcard", label: "Aadhar Card" },
//   { value: "pancard", label: "PAN Card" },
//   { value: "votingid", label: "Voting Id" },
// ];

const BasicInfo = (props) => {
  //useState to Handle Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [isd, setIsd] = useState();
  const [enteredAge, setEnteredAge] = useState();
  const [genders, setGenders] = useState([]);
  const [nationality, setNationality] = useState();
  const [mobile, setMobile] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [prefix, setPrefix] = useState();
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [citizenIdProof, setCitizenIdProof] = useState();
  const [mobileValue, setMobileValue] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [openBirthDate, setOpenBirthDate] = useState(false);

  const fileData = useFileUpload();

  const {
    selectedDoc,
    setSelectedDoc,
    setAge,
    age,
    profilePic,
    setProfilePic,
    setProfilePicName,
    gender,
    setGender,
    regDate,
    setRegDate,
    identificationDocFile,
    setIdentificationDocFile,
    setIdentificationDocFileName,
    isDisabled,
    isVisit,
    bloodgroups,
    setBloodgroups,
    maritalStatus,
    setMaritalStatus,
    setSearchData,
    setUnitId,
  } = props;

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  const handleIndentificationFile = (target) => {
    const result = fileData.onProfilePicChange(target);
  };

  const prefixData = watch("prefix");
  const identificationDocName = watch("citizenIdProof");

  // const enteredAge = watch("age");
  let fullDOB;
  let fullRegDate;
  let dobValue;
  let maritalStatusObj;

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();
  let minYear = currentYear - 111;

  const handleChange = (e) => {
    // let search = e.toString().replaceAll(" ", "");
    let search = e;
    if (search.length > 0) {
      console.log("search", search);
      getMobileNo(search)
        .then((response) => {
          console.log("MobileDetails", response.data.result);
          setMobile(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  //Reset Identification No. on Chnage of Doc Type
  const handleResetOnChange = (changeField) => {
    console.log(changeField);

    setValue("identificationDocumentNumber", "");
  };

  const getBloodGroupList = () => {
    getBloodGroup()
      .then((response) => {
        setBloodgroups(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const getMaritalStatusList = () => {
    getMaritalStatus()
      .then((response) => {
        setMaritalStatus(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const handleSystemDate = () => {
    getSystemDate()
      .then((response) => {
        // setRegDate(response.data.result);
        let fullYear = response.data.result;
        let year = fullYear.substring(0, 4);
        let month = fullYear.substring(5, 7);
        let day = fullYear.substring(8, 10);
        console.log(year, month, day);
        fullRegDate = [year, month, day].join("-");
        setValue("registrationDate", fullRegDate);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //API For ISD List
  const handleIsd = () => {
    getIsdNo()
      .then((response) => {
        console.log("ISD", response.data.result);
        setIsd(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //API for Prefix
  const handlePrefix = () => {
    getPrefix()
      .then((response) => {
        setPrefix(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  //API for gender
  const handleGender = () => {
    getGenders()
      .then((response) => {
        console.log(response);
        setGenders(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  // API for Nationality
  const handleNationality = () => {
    getNationality()
      .then((response) => {
        setNationality(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //API to get Doclist
  const handleIdentityDoc = () => {
    getIdentificationDoc()
      .then((response) => {
        setCitizenIdProof(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //Get changed Registration Date
  const getNewRegDate = (e) => {
    let regYear = e.getFullYear();
    let regMonth = String(e.getMonth() + 1).padStart(2, "0");
    let regDay = String(e.getDate()).padStart(2, "0");
    fullRegDate = [regYear, regMonth, regDay].join("-");
    console.log("fullRegDate", fullRegDate);
    setValue("registrationDate", fullRegDate, { shouldValidate: true });
  };

  const getBirthDetails = (fullDate) => {
    // console.log("BirthDetails", fullDate);
    getAgeonDOB(fullDate)
      .then((response) => {
        setValue("age", response.data.result.years, { shouldValidate: true });
        setValue("ageInYears", response.data.result.years);
        setValue("ageInMonths", response.data.result.months);
        setValue("ageInDays", response.data.result.days);
        // setValue("registrationDate", year, month, day);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //API Calculate Age Based on DOB
  const getAgeDOB = (e) => {
    dobValue = e;
    console.log("DOB VALUE", dobValue);
    let dobGivenYear = dobValue.getFullYear();
    let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    console.log(fullDOB);
    getAgeonDOB(fullDOB)
      .then((response) => {
        setValue("age", response.data.result.years, { shouldValidate: true });
        setValue("ageInYears", response.data.result.years);
        setValue("ageInMonths", response.data.result.months);
        setValue("ageInDays", response.data.result.days);
        // setValue("dob", dobGivenYear, dobGivenMonth, day);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //handle set Gender
  const handleGenderData = () => {
    if (prefixData !== null) {
      selectedPrefix === "Mr" || selectedPrefix === null
        ? setValue("gender", prefixData.genderId)
        : setValue("gender", prefixData.genderId);
    }
  };
  //handle Indentification Doc
  const handleIndentification = () => {
    if (identificationDocName) {
      if (identificationDocName.label) {
        setSelectedDoc(identificationDocName.label + " No.");
      } else {
        setSelectedDoc("Identification Document No.");
      }
    } else {
      setSelectedDoc("Identification Document No.");
    }
  };

  //API Calculate DOB based on Age
  const handleAgeBasedDOB = () => {
    if (enteredAge !== "" && typeof enteredAge !== "undefined") {
      getDOBonAge(enteredAge)
        .then((response) => {
          // console.log(response.data.result);
          setValue("dob", response.data.result.localDate, {
            shouldValidate: true,
          });
          setValue("ageInYears", response.data.result.years);
          setValue("ageInMonths", response.data.result.months);
          setValue("ageInDays", response.data.result.days);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  useEffect(() => {
    console.log("enteredAge", enteredAge);
    if (selectedPrefix !== null) {
      handleGenderData();
    } else {
      if (enteredAge) {
        handleAgeBasedDOB();
      } else {
        getBloodGroupList();
        getMaritalStatusList();
        handleSystemDate();
        handleIsd();
        handlePrefix();
        handleGender();
        handleNationality();
        handleIdentityDoc();
        handleIndentification();
      }
    }
  }, [selectedPrefix, enteredAge]);

  useEffect(() => {
    handleIndentification();
  }, [identificationDocName]);

  useEffect(() => {
    setIdentificationDocFile(fileData.path);
    setIdentificationDocFileName(fileData.fileName);
  }, [fileData]);

  //API For Details Based on Mobile Number
  useEffect(() => {
    console.log("Mobile Id", props.disableMobileSearch);
    if (mobileValue && mobileValue !== null) {
      getDetailsBasedOnMobileNo(mobileValue)
        .then((response) => {
          console.log("URL", response.data.result);
          setSearchData(response.data.result);
          reset(response.data.result);
          if (response.data.result.patientImagePath !== null) {
            setProfilePic(
              `${baseUrl}/file${response.data.result.patientImagePath}`
            );
          } else {
            setProfilePic(BlankProfile);
          }

          if (response.data.result.email !== null) {
            setValue("email", response.data.result.email, {
              shouldValidate: true,
            });
          } else {
            setValue("email", "");
          }

          if (response.data.result.nameOfRepresentative !== null) {
            setValue(
              "nameOfRepresentative",
              response.data.result.nameOfRepresentative,
              {
                shouldValidate: true,
              }
            );
          } else {
            setValue("nameOfRepresentative", "");
          }

          if (response.data.result.mobileNumberOfRepresentative !== null) {
            setValue(
              "mobileNumberOfRepresentative",
              response.data.result.mobileNumberOfRepresentative,
              {
                shouldValidate: true,
              }
            );
          } else {
            setValue("mobileNumberOfRepresentative", "");
          }

          if (response.data.result.relationshipWithPatient !== null) {
            setValue(
              "relationshipWithPatient",
              response.data.result.relationshipWithPatient,
              {
                shouldValidate: true,
              }
            );
          } else {
            setValue("relationshipWithPatient", "");
          }

          fullDOB = response.data.result.dob;
          setValue("gender", response.data.result.gender.value, {
            shouldValidate: true,
          });

          setValue("prefix", response.data.result.prefix, {
            shouldValidate: true,
          });
          let maritalStatusObj = maritalStatus.find((maritalType) => {
            return (maritalType.label = response.data.result.maritalStatus);
          });
          if (maritalStatusObj) {
            setValue("maritalStatus", maritalStatusObj, {
              shouldValidate: false,
            });
          } else {
            getMaritalStatusList();
          }
          setValue("tehsil", response.data.result.taluka, {
            shouldValidate: true,
          });

          setValue("streetaddress", response.data.result.streetAddress, {
            shouldValidate: true,
          });
          setValue("houseno", response.data.result.houseFlatNumber, {
            shouldValidate: true,
          });
          setValue("pincode", response.data.result.pinCode, {
            shouldValidate: true,
          });
          // setValue("pinCode", response.data.result.pinCode, {
          //   shouldValidate: true,
          // });
          setValue("nationality", response.data.result.nationality, {
            shouldValidate: true,
          });
          let blood = bloodgroups.find((bloodType) => {
            return (bloodType.label = response.data.result.bloodGroup);
          });
          console.log("blood object", blood);
          if (blood) {
            setValue("bloodGroup", blood, {
              shouldValidate: false,
            });
          } else {
            getBloodGroupList();
          }

          setValue("unit", response.data.result.unit, {
            shouldValidate: false,
          });

          // setMobileValue(response.data.result);
          // let getYear = fullDOB[0];
          // let getMonth = String(fullDOB[1]).padStart(2, "0");
          // let getDay = String(fullDOB[2]).padStart(2, "0");
          // let dob = [getYear, getMonth, getDay].join("-");
          getBirthDetails(fullDOB);
          setUnitId(response.data.result.unit.value);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [mobileValue]);

  return (
    <div>
      <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
        {/* //Mobile Number// */}
        <div className="col-span-2 z-30">
          {props.disableMobileSearch === true ? (
            <div className="opacity-30 w-full">
              <fieldset disabled={props.disableMobileSearch}>
                <SearchDropdown
                  name="mobilesearch"
                  label="Mobile"
                  searchIcon={true}
                  dataArray={mobile}
                  placeholder="Search Patient"
                  isSearchable={true}
                  isClearable={false}
                  handleInputChange={handleChange}
                  inputRef={{
                    ...register("mobilesearch", {
                      onChange: (e) => {
                        console.log(e.target);
                        if (e.target.value !== null) {
                          setMobileValue(e.target.value.value);
                        } else {
                          setMobileValue(null);
                        }
                      },
                    }),
                  }}
                />
              </fieldset>
            </div>
          ) : (
            <div className="w-full z-50">
              <SearchBar
                name="mobilesearch"
                label="Mobile"
                searchIcon={true}
                dataArray={mobile}
                placeholder="Search Patient"
                isSearchable={true}
                isClearable={false}
                handleInputChange={handleChange}
                onChange={(e) => {
                  if (e !== null) {
                    console.log(e);
                    setMobileValue(e.value);
                  } else {
                    setMobileValue(null);
                  }
                }}
              />
            </div>
          )}
        </div>
        {/* //Email Id // */}
        <div className="col-span-2">
          <InputField
            name="email"
            variant="outlined"
            label="Email Id"
            error={errors.email}
            control={control}
            disabled={isDisabled}
            dontCapitalize={true}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        {/* //Registration Date// */}
        <div className="col-span-2">
          <Controller
            control={control}
            defaultValue={new Date()}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  open={openDate}
                  onOpen={() => setOpenDate(false)}
                  onClose={() => setOpenDate(false)}
                  inputProps={{ readOnly: true }}
                  // disablePast
                  // readOnly={true}

                  renderInput={(props) => (
                    <TextField
                      {...props}
                      type="date"
                      variant="outlined"
                      label="Registration Date"
                      name="registrationDate"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      // onClick={(e) => setOpenDate(true)}
                    />
                  )}
                  inputFormat="dd/MM/yyyy"
                  disableFuture
                  disablePast
                  {...field}
                  onAccept={(e) => {
                    getNewRegDate(e);
                  }}
                  error={Boolean(errors.registrationDate)}
                  helperText={errors.registrationDate?.message}
                />
              </LocalizationProvider>
            )}
            name="registrationDate"
          />
        </div>

        <div className="lg:hidden lg:row-span-3 mt-2">
          <div className="flex justify-center -mt-2 border border-slate-300 rounded-md">
            <Button onClick={handleOpen} disabled={isDisabled}>
              <div className="flex flex-col  ">
                <img
                  src={profilePic}
                  alt="Profile Pic"
                  className="h-32 w-32 mx-auto object-scale-down  hidden"
                />
                {profilePic === BlankProfile ? (
                  <p className="text-xs md:row-start-6 md:col-span-2 lg:row-start-5 lg:col-span-1">
                    Upload Profile
                  </p>
                ) : (
                  <p className="text-xs md:row-start-6 md:col-span-2 lg:row-start-5 lg:col-span-1">
                    Change Profile
                  </p>
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* //Profile Pic// */}
        <div className="hidden lg:block lg:row-span-3 mt-2">
          <div className="flex justify-center -mt-2 border border-slate-300 rounded-md">
            <div>
              {profilePic !== BlankProfile ? (
                <div className="flex justify-end">
                  <Tooltip title="Remove Pic" placement="left-start" arrow>
                    <IconButton>
                      <CloseRoundedIcon
                        data-tooltip-target="tooltip-default"
                        className="text-red-500 hover:cursor-pointer"
                        fontSize="small"
                        onClick={() => {
                          setProfilePic(BlankProfile);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                ""
              )}
              <Button onClick={handleOpen} disabled={isDisabled}>
                <div className="flex flex-col  ">
                  <img
                    src={profilePic}
                    alt="Profile Pic"
                    className="h-32 w-32 mx-auto object-scale-down lg:block hidden"
                  />
                  {profilePic === BlankProfile ? (
                    <p className="text-xs md:row-start-6 md:col-span-2 lg:row-start-5 lg:col-span-1">
                      Upload Profile
                    </p>
                  ) : (
                    <p className="text-xs md:row-start-6 md:col-span-2 lg:row-start-5 lg:col-span-1">
                      Change Profile
                    </p>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* //First Name & Title// */}
        <div className="col-span-2">
          <div className="flex">
            {/* //Title// */}
            <div className="w-6/12 mr-3">
              {/* <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl size="small" fullWidth>
                    <InputLabel id="title">Title</InputLabel>
                    <Select
                      labelId="title"
                      id="demo-simple-select"
                      label="Title"
                      defaultValue={""}
                      {...field}
                    >
                      <MenuItem value={"Mr"}>Mr.</MenuItem>
                      <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: "#d32f2f" }}>
                      {errors.title && <p>{errors.title.message}</p>}
                    </FormHelperText>
                  </FormControl>
                )}
              /> */}
              <DropdownField
                control={control}
                error={errors.prefix}
                name="prefix"
                label="Prefix*"
                dataArray={prefix}
                isSearchable={false}
                placeholder="Prefix*"
                isClearable={false}
                inputRef={{
                  ...register("prefix", {
                    onChange: (e) => {
                      console.log(e.target.value);
                      setSelectedPrefix(e.target.value.label);
                    },
                  }),
                }}
              />
            </div>
            {/* //First Name// */}
            <div>
              <InputField
                name="firstName"
                variant="outlined"
                label="First Name *"
                error={errors.firstName}
                control={control}
                disabled={isDisabled}
                inputProps={{ maxLength: 100 }}
              />
            </div>
          </div>
        </div>

        {/* //Middle Name// */}
        <div className="lg:col-span-2">
          <InputField
            name="middleName"
            variant="outlined"
            label="Middle Name"
            // error={errors.middleName}
            control={control}
            disabled={isDisabled}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Last Name// */}
        <div className="col-span-2">
          <InputField
            name="lastName"
            variant="outlined"
            label="Last Name *"
            error={errors.lastName}
            control={control}
            disabled={isDisabled}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Date of Birth and Age // */}
        <div className=" col-span-2">
          <div className="flex">
            {/* //Date of Birth // */}
            <div className="w-9/12 mr-2">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      open={openBirthDate}
                      onOpen={() => setOpenBirthDate(true)}
                      onClose={() => setOpenBirthDate(false)}
                      inputProps={{ readOnly: true }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          type="date"
                          variant="outlined"
                          label="Date of Birth"
                          name="dob"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          size="small"
                          // error={errors.dob}
                          // disabled={true}
                          readOnly={true}
                          onClick={(e) => setOpenBirthDate(true)}
                        />
                      )}
                      PopperProps={{ placement: "auto-end" }}
                      minDate={new Date(minYear, currentMonth, currentDay)}
                      inputFormat="dd/MM/yyyy"
                      disableFuture
                      {...field}
                      onAccept={(e) => {
                        getAgeDOB(e);
                      }}
                      // error={Boolean(errors.dob)}
                      // helperText={errors.dob?.message}
                    />
                  </LocalizationProvider>
                )}
                name="dob"
              />
            </div>
            {/* //Age// */}
            <div className="w-3/12">
              {/* <Controller
              control={control}
              name="age"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  variant="outlined"
                  label="Age"
                  fullWidth
                  size="small"
                  {...field}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  error={Boolean(errors.age)}
                  helperText={errors.age?.message}
                />
              )}
            /> */}
              <InputField
                type="tel"
                name="age"
                variant="outlined"
                label="Age *"
                error={errors.age}
                control={control}
                disabled={isDisabled}
                inputProps={{
                  step: "1",
                }}
                inputRef={{
                  ...register("age", {
                    onChange: (e) => {
                      console.log(e.target);
                      setEnteredAge(e.target.value);
                    },
                  }),
                }}
              />
            </div>
          </div>
        </div>

        {/* //Years Months Days // */}
        <div className=" col-span-2">
          <div className="flex justify-between gap-3">
            {/* //Years// */}

            <InputField
              name="ageInYears"
              variant="outlined"
              label="Years"
              disabled={true}
            />
            {/* //Months// */}
            <InputField
              name="ageInMonths"
              variant="outlined"
              label="Months"
              disabled={true}
            />
            {/* //Days// */}
            <InputField
              name="ageInDays"
              variant="outlined"
              label="Days"
              disabled={true}
            />
          </div>
        </div>

        {/* //Gender// */}
        <div className=" col-span-2">
          {/* <Controller
            control={control}
            name="gender"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.gender)}
                sx={{ marginY: "0.1rem" }}
                fullWidth
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  id="selectGender"
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="gender"
                  sx={{ marginTop: "-0.2rem" }}
                >
                  <div className="flex justify-between">
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          size="small"
                          {...register("gender")}
                          checked={gender === "male"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                      }
                      label={<Typography variant="body2">Male</Typography>}
                    />
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          size="small"
                          {...register("gender")}
                          checked={gender === "female"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                      }
                      label={<Typography variant="body2">Female</Typography>}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio
                          size="small"
                          {...register("gender")}
                          checked={gender === "other"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                      }
                      label={<Typography variant="body2">Other</Typography>}
                    />
                  </div>
                </RadioGroup>

                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.gender && <p>{errors.gender.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <RadioField
            label="Gender"
            name="gender"
            control={control}
            dataArray={genders}
          />
        </div>

        {/* //Mobile Number // */}
        <div className=" col-span-2">
          {/* <Controller
            control={control}
            name="bloodGroup"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.bloodGroup)}
              >
                <InputLabel id="bloodGroup">Blood Group</InputLabel>
                <Select
                  labelId="bloodGroup"
                  id="demo-simple-select"
                  label="Blood Group"
                  name="bloodGroup"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"O"}>O</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <div className="flex">
            {/* //ISD// */}
            <div className="w-4/12 mr-2">
              <DropdownField
                control={control}
                error={errors.isd}
                name="isd"
                label="ISD"
                dataArray={isd}
                isSearchable={false}
                isClearable={false}
                placeholder="ISD"
                defaultValue={{
                  id: 1,
                  value: 1,
                  label: "+91",
                }}
              />
            </div>
            {/* //Mobile No.// */}
            <div className="w-8/12">
              <InputField
                name="mobileNumber"
                variant="outlined"
                label="Mobile *"
                error={errors.mobileNumber}
                control={control}
                disabled={isDisabled}
                inputProps={{ maxLength: 14 }}
              />
            </div>
          </div>
        </div>

        {/* //Martial Status// */}
        <div className=" col-span-2">
          {/* <Controller
            control={control}
            name="maritalStatus"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.maritalStatus)}
              >
                <InputLabel id="maritalStatus">Marital Status</InputLabel>
                <Select
                  labelId="maritalStatus"
                  id="demo-simple-select"
                  label="Marital Status"
                  name="maritalStatus"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"married"}>Married</MenuItem>
                  <MenuItem value={"unmarried"}>Unmarried</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.maritalStatus && (
                    <p>{errors.maritalStatus.message}</p>
                  )}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <DropdownField
            control={control}
            //error={errors.maritalStatus}
            name="maritalStatus"
            label="Marital Status"
            dataArray={maritalStatus}
            placeholder="Marital Status"
          />
        </div>

        {/* //Nationality and Blood Group// */}
        <div className=" col-span-3">
          {/* <Controller
            control={control}
            name="nationality"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.nationality)}
              >
                <InputLabel id="nationality">Nationality</InputLabel>
                <Select
                  labelId="nationality"
                  id="demo-simple-select"
                  label="Nationality"
                  name="nationality"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"indian"}>Indian</MenuItem>
                  <MenuItem value={"russian"}>Russian</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.nationality && <p>{errors.nationality.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}

          <div className="flex">
            {/* //Nationality// */}
            <div className="w-6/12 mr-3">
              <DropdownField
                control={control}
                // error={errors.nationality}

                name="nationality"
                label="Nationality"
                dataArray={nationality}
                placeholder="Nationality"
              />
            </div>
            {/* //Blood Group// */}
            <div className="w-6/12">
              <DropdownField
                control={control}
                error={errors.bloodGroup}
                name="bloodGroup"
                label="Blood Group"
                dataArray={bloodgroups}
                placeholder="Blood Group"
              />
            </div>
          </div>
        </div>

        {/* //Blood Group// */}
        {/* <div className="row-start-4 col-span-1">
          <DropdownField
            control={control}
            error={errors.bloodGroup}
            name="bloodGroup"
            label="Blood Group"
            dataArray={bloodgroups}
            isSearchable={false}
            isClearable={false}
            placeholder="Blood Group"
          />
        </div> */}

        {/* ///ethnicity //// */}
        {/* <div className="row-start-5"> */}
        {/* <Controller
            control={control}
            name="ethnicity"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Ethnicity"
                fullWidth
                size="small"
                {...field}
                error={Boolean(errors.ethnicity)}
                helperText={errors.ethnicity?.message}
              />
            )}
          /> */}
        {/* <InputField
            name="ethnicity"
            variant="outlined"
            label="Ethnicity"
            error={errors.ethnicity}
            control={control}
            disabled={false}
          />
        </div> */}

        <p className="col-span-4 lg:col-span-6 font-bold tracking-wide text-lg -mt-1  font-Poppins">
          Documents
        </p>
        {/* //Indentification Doc// */}
        <div className="col-span-2">
          {/* <Controller
            control={control}
            name="identificationDoc"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.identificationDoc)}
              >
                <InputLabel id="identificationDoc">
                  Identification Document
                </InputLabel>
                <Select
                  labelId="identificationDoc"
                  id="demo-simple-select"
                  label="Identification Document"
                  name="identificationDoc"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"aadharcard"}>Aadhar Card</MenuItem>
                  <MenuItem value={"pancard"}>Pan card</MenuItem>
                  <MenuItem value={"votingid"}>Voting Id</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.identificationDoc && (
                    <p>{errors.identificationDoc.message}</p>
                  )}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <DropdownField
            control={control}
            error={errors.citizenIdProof}
            name="citizenIdProof"
            label="Identification Document"
            dataArray={citizenIdProof}
            placeholder="Identification Document"
            inputRef={{
              ...register("citizenIdProof", {
                onChange: (e) => {
                  handleResetOnChange(e.target.name);
                },
              }),
            }}
          />
        </div>

        {/* //Indentification No. */}
        <div className=" col-span-2">
          {/* <Controller
            control={control}
            name="identificationNo"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label={selectedDoc}
                fullWidth
                size="small"
                {...field}
                error={Boolean(errors.identificationNo)}
                helperText={errors.identificationNo?.message}
              />
            )}
          /> */}
          <InputField
            name="identificationDocumentNumber"
            variant="outlined"
            label={selectedDoc}
            error={errors.identificationDocumentNumber}
            control={control}
            disabled={isDisabled}
            inputProps={{ maxLength: 100 }}
          />
        </div>

        {/* //Indentification File// */}
        <div className="col-span-3">
          <div className=" w-6/12  border border-slate-400  py-1.5 rounded-md">
            <Button
              className="h-4"
              onClick={() => {
                document.getElementById("identificationDoc").click();
              }}
            >
              <label
                htmlFor="identificationDoc"
                className="cursor-pointer text-slate-600 "
              >
                <FileUploadOutlinedIcon />
                Upload Document
                <Controller
                  control={control}
                  defaultValue={identificationDocFile}
                  render={({ field }) => (
                    <TextField
                      id="identificationDoc"
                      variant="outlined"
                      fullWidth
                      type="file"
                      name="identificationFile"
                      size="small"
                      disabled={isDisabled}
                      {...field}
                      onChange={(e) => {
                        console.log("target", e);
                        field.onChange(e);
                        handleIndentificationFile(e);
                      }}
                      error={Boolean(errors.identificationFile)}
                      helperText={errors.identificationFile?.message}
                      // onChange={handleIndentificationFile}
                      sx={{ display: "none" }}
                    />
                  )}
                  name="identificationFile"
                />
              </label>
            </Button>
          </div>
        </div>
      </div>

      {/* //Patient Profile Pic Modal // */}
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
            backgroundColor: "white",
            width: "30%",
            borderRadius: "0.5rem",
          }}
        >
          <UploadProfileModal
            profilePic={profilePic}
            setProfilePic={setProfilePic}
            setOpen={setOpen}
            setProfilePicName={setProfilePicName}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default BasicInfo;
