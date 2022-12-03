import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  FormLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormContext } from "react-hook-form";
import { Box } from "@mui/system";
import UploadProfileModal from "./UploadProfileModal";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

// Import FormFields
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../../Common Components/FormFields/RadioField";
import {
  getAge,
  getDateOfBirth,
} from "../../services/EmployeeMaster/EmployeeMasterServices";
import SearchDropdown from "../../../../../Common Components/FormFields/searchDropdown";
import {
  getArea,
  getCity,
  getCountry,
  getDetailsonPincodeId,
  getDistrict,
  getPincodeBySearchId,
  getState,
  getTahshil,
  employeeTypeDropDown,
} from "../../services/EmployeeMaster/EmployeeMasterServices";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";



let Appdateid
const BasicInfo = (props) => {
  const {
    countryId,
    setCountryId,
    stateId,
    setStateId,
    districtId,
    setDistrictId,
    tehsilId,
    setTehsilId,
    signatureName,
    setSignatureName,
    checkValue,
    setCheckValue,
    defaultValues,
    nationalities,
    dateIs,
    setdateIs,
    empType,
    setEmpType,
    drChrgAmt,
    setDrChrgAmt,
    profilePic,
    setProfilePic,
    profilePicName,
    setProfilePicName,
    titles,
    genders,
    maritalStatuss,
    bloodGroups,
    signature,
    setSignature,
  } = props;

  // signature pic file
  //Function used to convert Image to Base 64
  const fileToBase64Sign = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(null, reader.result);
      setSignatureName(file.name)
    };
    reader.onerror = function(error) {
      cb(error, null);
    };
  };

  //Get the Selected file and set Converted Base64 image
  const SignatureChange = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    fileToBase64Sign(target.files[0], (err, result) => {
      if (result) {
        setSignature(result);
        console.log("Signature", result);
      }
    });
  };
  //useState to Handle Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();


  const [employeeTypes, setEmployeeTypes] = useState();

  

  // text " Update Image"
  const [picText, SetPicText] = React.useState("Set Profile Image");

  // changing empType
  const employeeTypeis = (event) => {
    let item = event.target.value;
    let Employee = item.label;
    if (
      Employee == "Doctor" ||
      Employee == "Technician" ||
      Employee == "Consultant"
    ) {
      if (!drChrgAmt) {
        setDrChrgAmt(true);
      }
    } else {
      if (drChrgAmt) {
        setDrChrgAmt(false);
      }
    }
  };

  // start here

  const [countries, setCountry] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [taluka, setTehsil] = useState();
  const [city, setCity] = useState();
  // const [cityId, setCityId] = useState();
  const [pincodes, setPincodes] = useState();
  const [pincodeId, setPincodeId] = useState(0);
  const [area, setArea] = useState();

  //

  useEffect(() => {
    getCountry()
      .then((response) => {
        // console.log(response.data.result);
        setCountry(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });

    setEmployeeTypesfunc(defaultValues.isClinical);
  }, []);

  const setEmployeeTypesfunc = (value) => {
    employeeTypeDropDown(value)
      .then((response) => response.data)
      .then((res) => {
        setEmployeeTypes(res.result);
      });
  };
  //
  const handleResetOnChange = (changeField) => {
    console.log(changeField);
    if (changeField === "country") {
      setValue("state", null);
      setValue("district", null);
      setValue("pinCode", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
    } else if (changeField === "state") {
      setValue("district", null);
      setValue("pinCode", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
    } else if (changeField === "district") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
    }
    // else if (changeField === "pinCode") {
    //   setValue("country", null);
    //   setValue("state", null);
    //   setValue("district", null);
    //   setValue("area", null);
    //   setValue("taluka", null);
    //   setValue("city", null);
    // }
    else if (changeField === "taluka") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("city", null);
    } else if (changeField === "city") {
      setValue("pinCode", null);
      setValue("area", null);
    }
  };

  //Api to get State List
  useEffect(() => {
    if (typeof countryId === "number") {
      getState(countryId)
        .then((response) => {
          // console.log("State", response);
          setState(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [countryId]);

  //Api to get District  List
  useEffect(() => {
    if (typeof stateId === "number") {
      getDistrict(stateId)
        .then((response) => {
          // console.log(response);
          setDistrict(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [stateId]);

  //Api to get Tahshil List
  useEffect(() => {
    // console.log("distric", districtId);
    if (typeof districtId === "number") {
      getTahshil(districtId)
        .then((response) => {
          console.log(response);
          setTehsil(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [districtId]);

  // Api to get City List
  useEffect(() => {
    if (typeof tehsilId === "number") {
      getCity(tehsilId)
        .then((response) => {
          // console.log(response);
          setCity(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [tehsilId]);

  // Api to get Area List
  useEffect(() => {
    if (typeof pincodeId === "number") {
      getArea(pincodeId)
        .then((response) => {
          // console.log(response);
          setArea(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [pincodeId]);

  //APi to get pinCode List
  const handleChange = (e) => {
    console.log(e.length);
    if (e.length > 0) {
      getPincodeList(e);
    }
  };
  const getPincodeList = (e) => {
    console.log(e);
    getPincodeBySearchId(e)
      .then((response) => {
        // console.log(response);
        getPincodes(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const getPincodes = (pinCodes) => {
    // console.log(pinCodes);
    setPincodes(pinCodes);
  };

  //Api to get Details Based on pinCode
  useEffect(() => {
    if (typeof pincodeId === "number") {
      getDetailsonPincodeId(pincodeId)
        .then((response) => {
          // console.log("pinCode Deatils", response.data.result.city.taluka);
          setValue("city", response.data.result.city, { shouldValidate: true });
          setValue("taluka", response.data.result.city.taluka, {
            shouldValidate: true,
          });
          setValue("district", response.data.result.city.taluka.district, {
            shouldValidate: true,
          });
          setValue("state", response.data.result.city.taluka.district.state, {
            shouldValidate: true,
          });
          setValue(
            "country",
            response.data.result.city.taluka.district.state.country,
            { shouldValidate: true }
          );
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [pincodeId]);

  useEffect(() => {
    let fullDOA = dateIs
    let DobdateType = typeof(dateIs)
    if (DobdateType!=="string"){
      fullDOA = getDateModal(fullDOA)
    }
    Appdateid = fullDOA
  },[dateIs]);

  const getDateModal = (dobValue) => {
    let dobGivenYear = dobValue.getFullYear();
    let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    return fullDOB
  };
  
  const settingDobAgeApi = (value) => {
    console.log("settingDobAgeApi",value)
    setdateIs(value.localDate);
    setValue("ageInYears", value.years);
    setValue("ageInMonths", value.months);
    setValue("ageInDays", value.days);
  }

  const settingDateDob = (value, inputType )=>{
    
    setdateIs(value);
    console.log(inputType)
    if(inputType=="ageInput"){
      // getDOBByAge(value)
    }else{
      getAgeByDOB(value)
    }
    // getAgeValue(value)
    }
    const getAgeByDOB = (dobValue) => {
      // let dobValue = e;
      console.log(dobValue);
      let dobGivenYear = dobValue.getFullYear();
      let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
      let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
      const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
      getAge(fullDOB)
        .then((response) => {
          setValue("age", response.data.result.years);
          setValue("ageInYears", response.data.result.years);
          setValue("ageInMonths", response.data.result.months);
          setValue("ageInDays", response.data.result.days);
        })
        .catch((response) => {
          console.log(response);
        });
    };

  return (
    <div className="mb-0">
      <Grid container spacing={1}>
                    {/* isClinical */}
                    <Grid item lg={1.55} sm={3}>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <FormControlLabel
                        label={<p className='text-sm'>Is Clinical</p>}
                        control={
                          <Checkbox
                            checked={checkValue}
                            defaultChecked={defaultValues.isClinical}
                            onChange={(e) => {
                              setValue('departments','');
                              let value = e.target.checked;

                              setEmployeeTypesfunc(value);
                              setCheckValue(value);
                              setValue("employeeType", "");
                              if (value) {
                                setEmpType(true);
                                setValue("doctorShareApplicable", defaultValues.doctorShareApplicable);
                                
                              } else {
                                setEmpType(false);
                                setDrChrgAmt(false);
                                setValue("doctorShareApplicable", false);
                              }
                            }}
                          />
                        }
                        {...field}
                        type="checkbox"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        className="w-full items-center text-sm font-bold tracking-wider mr-2"
                      />
                    )}
                    sx={{ fontSize: 20, color: "black" }}
                    name="isClinical"
                    control={control}
                    defaultValue={defaultValues.isClinical}
                  />
                </FormControl>
            </Grid>
            {/* /// Employee Type /// */}
            <Grid item lg={3} sm={6}>
              <DropdownField
                control={control}
                error={errors.employeeType}
                name="employeeType"
                placeholder="Employee Type *"
                dataArray={employeeTypes}
                inputRef={{
                  ...register("employeeType", {
                    onChange: (e) => {
                      employeeTypeis(e);
                    },
                  }),
                }}
                isSearchable={false}
              />
            </Grid>

            {/* Active */}
            <Grid item lg={1.2} sm={3}>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 w-full ml-5">
                <CheckBoxField
                  defaultChecked={defaultValues.active}
                  control={control}
                  name="active"
                  label="Active"
                  placeholder="Active"
                />
              </div>
            </Grid>

            {
              checkValue ? (
                <>
                  {/* isAdmin */}
                  <Grid item lg={1.2} sm={3}>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 w-full ml-5">
                    <CheckBoxField
                      defaultChecked={defaultValues.isAdmin}
                      control={control}
                      name="isAdmin"
                      label="isAdmin"
                      placeholder="isAdmin"
                    />
                  </div>
                </Grid>

                {/* DoctorShareApplicable */}
                <Grid item lg={2.8} sm={6}>
                  <div className=" w-full ml-4">
                    <CheckBoxField
                      defaultChecked={defaultValues.doctorShareApplicable}
                      control={control}
                      name="doctorShareApplicable"
                      label="Doctor Share Applicable"
                      placeholder="Doctor Share Applicable"
                    />
                  </div>
                </Grid>
                </>
              ):""
            }
            
            
            {/* loginApplicable */}
            <Grid item lg={2.25} sm={3} className=''>
                    <CheckBoxField 
                      defaultChecked={defaultValues.loginApplicable}
                      control={control} 
                      name="loginApplicable" 
                      label="login Applicable" 
                      placeholder="loginApplicable"/>
            </Grid>

            {/* blabk space */}
            <Box width="100%" />
        <Grid item lg={10.4} sm={10}>
          <Grid container spacing={1}>


            {/* //Title// */}
            <Grid item lg={1} sm={2}>
              <DropdownField
                control={control}
                error={errors.prefix}
                name="prefix"
                placeholder="Prefix"
                dataArray={titles}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("prefix", {
                    onChange: (e) => {
                      let genderId = e.target.value.genderId
                      setValue("gender",genderId)
                    },
                  }),
                }}
              />
            </Grid>
            {/* //First Name // */}
            <Grid item lg={3} sm={4}>
              <InputField
                // inputProps={{style: { textTransform: "capitalize" },}}
                name="firstName"
                variant="outlined"
                label="First Name *"
                error={errors.firstName}
                control={control}
              />
            </Grid>
            {/* //Middle Name // */}
            <Grid item lg={4} sm={6}>
              <InputField
                // inputProps={{style: { textTransform: "capitalize" },}}
                // dontCapitalize={true}
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
            {/* //Last Name // */}
            <Grid item lg={4} sm={6}>
              <InputField
                inputProps={{style: { textTransform: "capitalize" },}}
                name="lastName"
                variant="outlined"
                label="Last Name *"
                error={errors.lastName}
                control={control}
              />
            </Grid>

            {/* ///Gender /// */}
            {/* <Grid item lg={1} sm={2}>
              <p className=" text-xl px-2"> </p>
            </Grid> */}
            <Grid item lg={4} sm={6}>
              <RadioField
                label="Gender"
                name="gender"
                control={control}
                dataArray={genders}
              />
            </Grid>

            {/* //Date of Birth // */}
            <Grid item lg={4} sm={4}>
              {/* trial */}
              <FormControl
                sx={
                  {
                    // width: "19%",
                  }
                }
                fullWidth
                size="small"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    maxDate={new Date()}
                    label="Date of Birth *"
                    value={dateIs}
                    inputProps={{ readOnly: true }}
                    onChange={(value) => {
                      
                      let dateInput = "dateInput";
                      settingDateDob(value, dateInput);
                    }}
                    renderInput={(props) => (
                      <TextField {...props} size="small" />
                    )}
                    name="dob"
                    defaultValue=""
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.dob?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* // Age //  */}
            <Grid item lg={1} sm={2}>
              <InputField
                name="age"
                label="Age *"
                error={errors.age}
                control={control}
                inputRef={{
                  ...register("age", {
                    onChange: (e) => {
                      setValue("age", e.target.value);
                      let enteredAge = e.target.value;
                        let ageInput = "ageInput";
                        getDateOfBirth(enteredAge).then((response) => {
                          let value = response.data.result;
                          settingDobAgeApi(value);
                          // setValue("dob", response.data.result);
                        });
                    },
                  }),
                }}
              />
            </Grid>
            {/* age - dob - add */}
            {/* year */}
            <Grid item lg={1} sm={2}>
              <InputField
                disabled={true}
                name="ageInYears"
                label="Year/s"
                error={errors.ageInYears}
                control={control}
              />
            </Grid>
            {/* month */}
            <Grid item lg={1} sm={2}>
              <InputField
                disabled={true}
                name="ageInMonths"
                label="Month/s"
                error={errors.ageInMonths}
                control={control}
              />
            </Grid>
            {/* Day */}
            <Grid item lg={1} sm={2}>
              <InputField
                disabled={true}
                name="ageInDays"
                label="Day/s"
                error={errors.ageInDays}
                control={control}
              />
              
            </Grid>

            
            {/*  */}
            {/* // Marital Status // */}

            <Grid item lg={2} sm={6}>
              <DropdownField
                control={control}
                error={errors.maritalStatus}
                name="maritalStatus"
                dataArray={maritalStatuss}
                placeholder={<p className="">Marital Status</p>}
                isSearchable={false}
                isClearable={false}
              />
            </Grid>
            {/* //Blood Group // */}
            <Grid item lg={2} sm={6}>
              <DropdownField
                control={control}
                error={errors.bloodGroup}
                name="bloodGroup"
                dataArray={bloodGroups}
                placeholder="Blood Group"
                isSearchable={false}
                isClearable={false}
              />
            </Grid>
            {/* /// Email /// */}
            <Grid item lg={4} sm={6}>
              <InputField
                name="email"
                dontCapitalize={true}
                variant="outlined"
                label="Email Id "
                error={errors.email}
                control={control}
              />
            </Grid>

            {/* /// mobileNo /// */}
            <Grid item lg={4} sm={6}>
              <InputField
                type="number"
                name="mobileNo"
                variant="outlined"
                label="Mobile No *"
                error={errors.mobileNo}
                control={control}
              />
            </Grid>

            {/* Address */}
            <Grid item lg={4} sm={6}>
              <InputField
                name="address"
                variant="outlined"
                label="Address *"
                error={errors.address}
                control={control}
              />
            </Grid>
            {/* /// Nationality /// */}
            <Grid item lg={2} sm={3}>
              <DropdownField
                control={control}
                error={errors.nationality}
                name="nationality"
                placeholder="Nationality *"
                dataArray={nationalities}
                // inputRef={{...register("department", {
                //   onChange: (e) => {
                //     selectDocument(e);
                //   },
                // })}}
                isSearchable={false}
              />
            </Grid>

            {/* /// Country /// */}
            <Grid item lg={2} sm={3}>
              <DropdownField
                control={control}
                error={errors.country}
                name="country"
                placeholder="Country *"
                dataArray={countries}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("country", {
                    onChange: (e) => {
                      console.log(e.target.name);
                      handleResetOnChange(e.target.name);
                      setCountryId(e.target.value.id);
                    },
                  }),
                }}
              />
            </Grid>

            {/* /// State /// */}
            <Grid item lg={2} sm={3}>
              <DropdownField
                control={control}
                error={errors.state}
                name="state"
                placeholder="State *"
                dataArray={state}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("state", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      handleResetOnChange(e.target.name);
                      setStateId(e.target.value.id);
                    },
                  }),
                }}
              />
            </Grid>

            {/* /// District /// */}
            <Grid item lg={2} sm={3}>
              <DropdownField
                control={control}
                error={errors.district}
                name="district"
                placeholder="District *"
                dataArray={district}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("district", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      handleResetOnChange(e.target.name);
                      setDistrictId(e.target.value.id);
                    },
                  }),
                }}
              />
            </Grid>

            {/* pinCode */}
            <Grid item lg={2} sm={3} sx={{marginTop:'0.25rem'}}>
              <SearchDropdown
                control={control}
                error={errors.pinCode}
                searchIcon={true}
                name="pinCode"
                placeholder="Pin Code *"
                dataArray={pincodes}
                isSearchable={true}
                isClearable={false}
                handleInputChange={handleChange}
                inputRef={{
                  ...register("pinCode", {
                    onChange: (e) => {
                      console.log("PIn", e.target);
                      handleResetOnChange(e.target.name);
                      if (e.target.value !== null) {
                        setPincodeId(e.target.value.value);
                      } else {
                        setPincodeId(null);
                      }
                    },
                  }),
                }}
              />
            </Grid>
            {/* Landmark */}
            <Grid item lg={2} sm={3} sx={{marginTop:'0.25rem'}}>
              <DropdownField
                control={control}
                error={errors.area}
                name="area"
                placeholder="Area *"
                dataArray={area}
                inputRef={{
                  ...register("area", {
                    onChange: (e) => {
                      console.log("area", e.target.value);
                    },
                  }),
                }}
                isSearchable={true}
                isClearable={false}
              />
            </Grid>

            {/* /// Taluka /// */}
            <Grid item lg={2} sm={3} sx={{marginTop:'0.25rem'}}>
              <DropdownField
                control={control}
                error={errors.taluka}
                name="taluka"
                placeholder="Taluka *"
                dataArray={taluka}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("taluka", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      handleResetOnChange(e.target.name);
                      setTehsilId(e.target.value.id);
                    },
                  }),
                }}
              />
            </Grid>

            {/* /// City /// */}
            <Grid item lg={2} sm={3} sx={{marginTop:'0.25rem'}}>
              <DropdownField
                control={control}
                error={errors.city}
                name="city"
                placeholder="City *"
                dataArray={city}
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("city", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      // setCityId(e.target.value.id);
                    },
                  }),
                }}
              />
            </Grid>

            {/* Doctor Search Applicable */}

            {/* Employee Concession */}
            <Grid item lg={4} sm={6} sx={{marginTop:'0.25rem'}}>
              <div className=" w-full ml-4">
                <CheckBoxField
                  // defaultChecked={defaultValues.concessionApplicable}
                  control={control}
                  name="concessionApplicable"
                  label="Employee Authorized for Concession"
                  placeholder="Employee Authorized for Concession"
                />
              </div>
            </Grid>

            {/* ///Doc File /// */}
            <Grid item lg={4} sm={6}>
              {/* <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                          // label="Indentification File"
                          variant="outlined"
                          fullWidth
                          type="file"
                          name="indentificationFile"
                          // defaultValue=""
                          size="small"
                          {...field}
                          error={Boolean(errors.indentificationFile)}
                          helperText={errors.indentificationFile?.message}
                        /> 
                )}
                name="indentificationFile"
              /> */}
            </Grid>
          </Grid>
        </Grid>
        {/* //Patient Profile Pic //  */}
        <Grid item lg={1.6} sm={2}>
          <div className="flex justify-end -translate-y-4 ">
            <Button fullWidth onClick={handleOpen}>
              <div className="flex flex-col h-full">
                <img src={profilePic} alt="Profile Pic" width="100%" />
                <p> {picText}</p>
              </div>
            </Button>
          </div>
          {/* signature */}
          <div className="flex justify-center">
            {/* <img src={signature} alt="Signature Pic" width="100%" height='1rem' /> */}
            <input
              type="file"
              accept="application/pdf,image/*"
              style={{ display: "none" }}
              id="outlined-sign-file"
              onChange={SignatureChange}
            />
            <label htmlFor="outlined-sign-file">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  alignItems: "center",
                  paddingY: "0.2rem",
                  paddingX: "0.2rem",
                  color: "#0f0f0f",
                  borderColor: "#ffffff",
                  "& MuiButton-outlined.mui-focused": {
                    borderColor: "#ffffff",
                  },
                }}
              >
                <FileUploadRoundedIcon className="mr-1 text-center " />
                <p className="text-xs">Upload Signature </p>
                
              </Button>
            </label>
          </div>
        </Grid>
      </Grid>

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
            profilePicName={profilePicName}
            setProfilePicName={setProfilePicName}
            setProfilePic={setProfilePic}
            setOpen={setOpen}
            SetPicText={SetPicText}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default BasicInfo;
