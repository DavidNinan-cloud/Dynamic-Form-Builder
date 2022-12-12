import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import UploadProfileModal from "./UploadProfileModal";
import BlankProfile from "../../../../../OPD/assets/Images/blankProfile.jpeg";
import useFileUpload from ".././common component/hooks/useFileUpload";
import { baseUrl } from "../../../../http-common";
import zIndex from "@mui/material/styles/zIndex";
import InputField from "../../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../../../Common Components/FormFields/searchDropdown";
import {
  getAgeonDOB,
  getBloodGroup,
  getDetailsBasedOnMobileNo,
  getDOBonAge,
  getGenders,
  getIdentificationDoc,
  getIsdNo,
  getMaritalStatus,
  getMobileNo,
  getNationality,
  getPrefix,
  getSystemDate,
} from "../../../../services/personaldetails/personalDetailsServices";

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
    mobileValue,
    setMobileValue,
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
  //

  //

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

    setValue("identificationDocumentNumber", null);
  };

  //API for Blood Group
  useEffect(() => {
    getBloodGroup()
      .then((response) => {
        setBloodgroups(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API For Marital Status List
  useEffect(() => {
    getMaritalStatus()
      .then((response) => {
        setMaritalStatus(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);
  //API to get System date for Registration date
  useEffect(() => {
    getSystemDate()
      .then((response) => {
        // console.log(response.data.result);
        setRegDate(response.data.result);
        let fullYear = response.data.result;
        let year = fullYear.substring(0, 4);
        let month = fullYear.substring(5, 7);
        let day = fullYear.substring(8, 10);
        setValue("registrationDate", year, month, day);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //Get changed Registration Date
  const getNewRegDate = (e) => {
    let regYear = e.getFullYear();
    let regMonth = String(e.getMonth() + 1).padStart(2, "0");
    let regDay = String(e.getDate()).padStart(2, "0");
    fullRegDate = [regYear, regMonth, regDay].join("-");
    console.log(fullRegDate);
    setValue("registrationDate", fullRegDate, { shouldValidate: true });
  };

  //API For Details Based on Mobile Number
  useEffect(() => {
    if (mobileValue !== null) {
      getDetailsBasedOnMobileNo(mobileValue)
        .then((response) => {
          console.log(
            "URL",
            `${baseUrl}/file${response.data.result.patientImagePath}`
          );

          reset(response.data.result, { shouldValidate: true });
          if (response.data.result.patientImagePath !== null) {
            setProfilePic(
              `${baseUrl}/file${response.data.result.patientImagePath}`
            );
          } else {
            setProfilePic(BlankProfile);
          }
          fullDOB = response.data.result.dob;
          setValue("email", response.data.result.email, {
            shouldValidate: true,
          });
          setValue("gender", response.data.result.gender.value, {
            shouldValidate: true,
          });

          setValue("prefix", response.data.result.prefix, {
            shouldValidate: true,
          });
          let maritalStatusObj = maritalStatus.find((maritalType) => {
            return (maritalType.label = response.data.result.maritalStatus);
          });
          setValue("maritalStatus", maritalStatusObj, {
            shouldValidate: false,
          });
          setValue("taluka", response.data.result.taluka, {
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
          setValue("bloodGroup", blood, {
            shouldValidate: false,
          });
          // setMobileValue(response.data.result);
          getBirthDetails(fullDOB);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [mobileValue]);

  //API For ISD List
  useEffect(() => {
    getIsdNo()
      .then((response) => {
        console.log("ISD", response.data.result);
        setIsd(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    if (identificationDocName) {
      if (identificationDocName.label) {
        setSelectedDoc(identificationDocName.label + " No.");
      } else {
        setSelectedDoc("Identification Document No.");
      }
    } else {
      setSelectedDoc("Identification Document No.");
    }
    setIdentificationDocFile(fileData.path);
    setIdentificationDocFileName(fileData.fileName);
  }, [identificationDocName, fileData, enteredAge]);

  //API For Prefix List
  useEffect(() => {
    getPrefix()
      .then((response) => {
        setPrefix(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

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
  //SetGender

  useEffect(() => {
    if (prefixData !== null) {
      console.log("PrefixData", prefixData);
      console.log("selectedPrefix", selectedPrefix);
      setValue("gender", prefixData.genderId);
    }
  }, [selectedPrefix]);

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

  //API Calculate DOB based on Age
  useEffect(() => {
    console.log("enterd age", fullDOB);
    // console.log("enterd Age", enteredAge);

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
  }, [enteredAge]);

  //API For Gender
  useEffect(() => {
    getGenders()
      .then((response) => {
        console.log(response);
        setGenders(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API For Nationality List
  useEffect(() => {
    getNationality()
      .then((response) => {
        setNationality(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  // setValue("registrationDate", "2018, 11, 24");

  //API for Identification Doc
  useEffect(() => {
    getIdentificationDoc()
      .then((response) => {
        setCitizenIdProof(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
        {/* //Mobile Number// */}
        <div className="col-span-2">
          {props.disableMobileSearch === true ? (
            <div className="opacity-70 w-full">
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
            <div className="w-full">
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
            </div>
          )}
        </div>
        {/* //Email Id // */}
        <div className="col-span-2">
          <InputField
            name="email"
            variant="outlined"
            label="Email Id"
            //error={errors.email}
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
                <DatePicker
                  open={openDate}
                  onOpen={() => setOpenDate(true)}
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
                      onClick={(e) => setOpenDate(true)}
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
                label="Prefix *"
                dataArray={prefix}
                isSearchable={false}
                placeholder="Prefix *"
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
        <div className="lg:col-span-2">
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
                    <DatePicker
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
                          // disabled={true}
                          readOnly={true}
                          onClick={(e) => setOpenBirthDate(true)}
                        />
                      )}
                      PopperProps={{ placement: "auto-end" }}
                      inputFormat="dd/MM/yyyy"
                      disableFuture
                      {...field}
                      onAccept={(e) => {
                        getAgeDOB(e);
                      }}
                      error={Boolean(errors.dob)}
                      helperText={errors.dob?.message}
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
                name="age"
                variant="outlined"
                label="Age *"
                error={errors.age}
                control={control}
                disabled={isDisabled}
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
          <RadioField
            label="Gender"
            name="gender"
            control={control}
            dataArray={genders}
          />
        </div>

        {/* //Mobile Number // */}
        <div className=" col-span-2">
          <div className="flex">
            {/* //ISD// */}
            <div className="w-4/12 mr-2">
              <DropdownField
                control={control}
                error={errors.isd}
                name="isd"
                label="ISD"
                dataArray={isd}
                // isSearchable={false}
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
          <DropdownField
            control={control}
            //error={errors.maritalStatus}
            name="maritalStatus"
            label="Marital Status"
            dataArray={maritalStatus}
            // isSearchable={false}
            isClearable={false}
            placeholder="Marital Status"
          />
        </div>

        {/* //Nationality and Blood Group// */}
        <div className=" col-span-3">
          <div className="flex">
            {/* //Nationality// */}
            <div className="w-6/12 mr-3">
              <DropdownField
                control={control}
                // error={errors.nationality}
                name="nationality"
                label="Nationality"
                dataArray={nationality}
                // isSearchable={false}
                isClearable={false}
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
                // isSearchable={false}
                isClearable={false}
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

        <p className="col-span-4 lg:col-span-6 font-bold tracking-wide text-sm -mt-1  font-Poppins">
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
            // isSearchable={false}
            isClearable={false}
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
          <div className=" w-7/12  border border-slate-400  py-1.5 rounded-md">
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
                      console.log(e);
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
