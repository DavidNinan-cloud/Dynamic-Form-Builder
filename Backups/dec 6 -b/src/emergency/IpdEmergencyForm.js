  import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InputField from "../Common Components/FormFields/InputField";
import DropdownField from "../Common Components/FormFields/DropdownField";
import { Grid, TextField } from "@mui/material";
import ConfirmationModal from "../Common Components/ConfirmationModal";
import { getPrefixDropDown } from "./services/emergencyservice/EmergencyServices";
import RadioField from "../Common Components/FormFields/RadioField";
import {
  getAgeonDOB,
  getDOBonAge,
  getGenders,
  getpatientSource,
  getUnitlist,
  getDoctorDropdown, // use for get Department id
  getClassCategoryDropdown,
  getreferType,
  getreferBy,
  addNewEmergency,
} from "./services/emergencyservice/EmergencyServices";
import { Controller } from "react-hook-form";
import CheckBoxField from "../Common Components/FormFields/CheckBoxField";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import ResetButton from "../Common Components/Buttons/ResetButton";
import CancelButton from "../Common Components/Buttons/CancelButton";
import UpdateButton from "../Common Components/Buttons/UpdateButton";
import SearchDropdown from "../Common Components/FormFields/searchDropdown";
import { useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../Common Components/Toasts/CustomToasts";
import SaveButton from "../Common Components/Buttons/SaveButton";

export default function IpdEmergencyForm(props) {
  const schema = yup.object().shape({
    prefix: yup
      .object()
      .nullable()
      .required("Required")
      .shape({
        value: yup.string().required("Please Select Prefix"),
        label: yup.string().required("Please Select Prefix"),
      }),
    firstName: yup
      .string()
      .required("Required")
      .min(2, "Add First Name")
      .matches(/^[a-zA-Z]+$/, "Space & Special Characters Not Allow"),
    lastName: yup
      .string()
      .required("Required")
      .min(2, "Add Last Name")
      .matches(/^[a-zA-Z]+$/, "Space & Special Characters Not Allow"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Provide Valid Mobile No.")
      .min(10, "Provide Valid Mobile No.")
      .max(14, "Provide Valid Mobile No.")
      .required("Required"),
    bedCategory: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
  });

  const defaultValues = {
    opdIpd: 1, //0 for OPD , 1 for IPD
    isEmergency: true,
    isMlc: false,
    admissionAdvice: false,
    unit: null,
    patientSource: null,
    employee: null,
    referType: null,
    referBy: null,
    bedCategory: null,
    mobileNumber: "",
    remarks: "",
    medicalManagement: false,
    surgicalManagement: false,
    dob: new Date(),
    age: 0,
    ageInYears: 0,
    ageInMonths: 0,
    ageInDays: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: null,
    prefix: null,
    department: null,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [genders, setGenders] = React.useState([]);
  const [prefixes, setPrefixes] = React.useState();
  const [openBirthDate, setOpenBirthDate] = React.useState(false);
  const [enteredAge, setEnteredAge] = React.useState();
  let fullDOB;
  let dobValue; //BirthDate
  const [patientSource, setpatientSource] = React.useState(); //Patient Source
  const [referType, setreferType] = React.useState(); //Referral Type
  const [referBy, setreferBy] = React.useState(); //Referral By
  const [referralemployee, setReferralemployee] = React.useState([]);
  const [classTypeOptions, setClasstypeOptions] = React.useState([]); //Bed Category
  const { isDisabled } = props; //use For age // BOD Fields are disable
  const [unit, setUnit] = React.useState([]);
  const [unitId, setUnitId] = React.useState("");
  const [finalData, setFinalData] = React.useState({});



  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log("dob", data.dob);

    // dobValue = getValues("dob");
    // console.log("DOB VALUE", dobValue);
    // let dobGivenYear = dobValue.getFullYear();
    // let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    // let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    // fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");

    // data.dob = fullDOB;
    data.bedCategory = { id: data.bedCategory.id };
    console.log("Employee is");
    console.log(getValues("employee"));
    data.employee = { id: data.employee.id };
    let employeeObj = getValues("employee");
    console.log("employeeObj is " + JSON.stringify(employeeObj));
    data.department = { id: employeeObj.departmentid };
    console.log("Gender is");
    console.log(getValues("gender"));
    data.gender = { id: getValues("gender") };
    // data.patientSource = { id: data.patientSource.id };
    data.patientInfo === null
      ? (data.patientInfo = null)
      : (data.patientInfo = { id: props.patientInfoId });
    data.prefix = { id: data.prefix.id };
    data.referBy === null
      ? (data.referBy = null)
      : (data.referBy = { id: data.referBy.id });
    data.referType === null
      ? (data.referType = null)
      : (data.referType = { id: data.referType.id });
    data.unit = { id: unitId };

    setOpenPost(true);
    setFinalData(data);
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postEmergency(finalData);
  }

  //ADD POST API save data
  const { mutate: postEmergency } = useMutation(addNewEmergency, {
    onSuccess: (res) => {
      console.log("useMutation was called");
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log("Record has been created");
      console.log(result);
      props.setOpenBackdrop(false);
      successAlert(result.data.message);
      props.populateTable({
        page: 0,
        size: 10,
        fromDate: "",
        toDate: "",
        searchString: "",
      });
      reset(defaultValues);
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  //API for Prefix Dropdown
  useEffect(() => {
    getPrefixList();

    //API For Gender dropdown
    getGenders()
      .then((response) => {
        console.log("Gender Id is:", response);
        console.log(response);
        setGenders(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });

    // Patient Source
    getpatientSource()
      .then((response) => {
        setpatientSource(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
    getCategoryList();

    //API For Referral Type List
    getreferType()
      .then((response) => {
        setreferType(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });

    //API For Referral By List
    getreferBy()
      .then((response) => {
        setreferBy(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
  }, []);

  useEffect(() => {
    //API For Referral employee List
    getDoctorDropdown(unitId)
      .then((response) => {
        setReferralemployee(response.data.result);
        console.log("doctor list is:", response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [unitId]);

  //axios get request to have all the list of gender.
  function getPrefixList() {
    getPrefixDropDown()
      .then((response) => {
        console.log(
          "The list of all the gender Prefix are as follows" + response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setPrefixes(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      })
      .catch((response) => {
        console.log(response);
      });
  };

  //API Calculate DOB based on Age
  useEffect(() => {
    console.log("enterd age", fullDOB);
    if (enteredAge !== "" && typeof enteredAge !== "undefined") {
      getDOBonAge(enteredAge)
        .then((response) => {
          setValue("dob", response.data.result.localDate, {
            shouldValidate: true,
          });
          setValue("ageInYears", response.data.result.years);
          setValue("ageInMonths", response.data.result.months);
          setValue("ageInDays", response.data.result.days);
          getBirthDetails(fullDOB);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [enteredAge]);
  const getBirthDetails = (fullDate) => {
    getAgeonDOB(fullDate)
      .then((response) => {
        setValue("age", response.data.result.years, { shouldValidate: true });
        setValue("ageInYears", response.data.result.years);
        setValue("ageInMonths", response.data.result.months);
        setValue("ageInDays", response.data.result.days);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  // Bed Category
  function getCategoryList() {
    getClassCategoryDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setClasstypeOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function displayView() {
    console.log("dispalyVeiw Function Call");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitDataHandler)} className="mx-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 my-2">
          <div className="flex gap-2">
            <div className="w-1/3 lg:w-6/12">
              <DropdownField
                control={control}
                error={errors.prefix}
                name="prefix"
                dataArray={prefixes}
                placeholder="Prefix *"
                isSearchable={false}
                isClearable={false}
                inputRef={{
                  ...register("prefix", {
                    onChange: (e) => {
                      let genderId = e.target.value.genderId;
                      setValue("gender", genderId);
                      console.log(e);
                    },
                  }),
                }}
              />
            </div>
            <InputField
              name="firstName"
              variant="outlined"
              label="First Name*"
              error={errors.firstName}
              control={control}
              inputProps={{
                style: { textTransform: "capitalize" },
              }} // use inputProps props for return 1st letter in upper case
            />
          </div>
          <div>
            <InputField
              name="middleName"
              variant="outlined"
              label="Middle Name"
              error={errors.middleName}
              control={control}
              inputProps={{
                style: { textTransform: "capitalize" },
              }} // use inputProps props for return 1st letter in upper case
            />
          </div>
          <div>
            <InputField
              name="lastName"
              variant="outlined"
              label="Last Name*"
              error={errors.lastName}
              control={control}
              inputProps={{
                style: { textTransform: "capitalize" },
              }} // use inputProps props for return 1st letter in upper case
            />
          </div>

          <Grid item className="grid items-center">
            <RadioField
              label="Gender *"
              name="gender"
              control={control}
              dataArray={genders}
            />
          </Grid>

          <div className="flex gap-2">
            {/* //Date of Birth // */}
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
                        label="Date of Birth*"
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
            {/* //Age// */}
            <div className="w-1/3">
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

          {/* //Years Months Days // */}
          <div className="flex justify-between gap-2 lg:ml-2">
            <InputField
              name="ageInYears"
              variant="outlined"
              label="Years"
              control={control}
              disabled={true}
            />
            {/* //Months// */}
            <InputField
              name="ageInMonths"
              variant="outlined"
              label="Months"
              control={control}
              disabled={true}
            />
            {/* //Days// */}
            <InputField
              name="ageInDays"
              variant="outlined"
              label="Days"
              control={control}
              disabled={true}
            />
          </div>

          <InputField
            InputProps={{
              "& .MuiOutlinedInput-input": {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                },
              },
            }}
            type="text"
            name="mobileNumber"
            label="Mobile Number *"
            error={errors.mobileNumber}
            control={control}
          />

          <div className="hidden lg:block">
            <DropdownField
              control={control}
              error={errors.bedCategory}
              name="bedCategory"
              label="Bed Category*"
              dataArray={classTypeOptions}
              isSearchable={false}
              placeholder="Bed Category*"
              isClearable={false}
            />
          </div>

          {/* Patient Sourse Dropdown */}
          <DropdownField
            control={control}
            error={errors.patientSource}
            name="patientSource"
            label="Patient Source"
            dataArray={patientSource}
            isSearchable={false}
            placeholder="Patient Source"
            isClearable={false}
          />
          <div className="lg:hidden">
            <DropdownField
              control={control}
              error={errors.bedCategory}
              name="bedCategory"
              label="Bed Category*"
              dataArray={classTypeOptions}
              isSearchable={false}
              placeholder="Bed category*"
              isClearable={false}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <DropdownField
            control={control}
            error={errors.unit}
            name="unit"
            dataArray={unit}
            placeholder="Unit *"
            isMulti={false}
            isSearchable={false}
            inputRef={{
              ...register("unit", {
                onChange: (e) => {
                  console.log("Selected unit is ");
                  console.log(e);
                  setUnitId(e.target.value.id);
                },
              }),
            }}
          />

          {/* Doctor input field */}
          <SearchDropdown
            control={control}
            name="employee"
            label="Doctor"
            placeholder="Doctor"
            searchIcon={true}
            isSearchable={true}
            isClearable={false}
            dataArray={referralemployee}
          />

          <DropdownField
            control={control}
            name="referType"
            label="Refer Type"
            dataArray={referType}
            isSearchable={false}
            placeholder="Refer Type"
            isClearable={false}
          />
          <DropdownField
            control={control}
            name="referBy"
            label="Refer By"
            dataArray={referBy}
            isSearchable={false}
            placeholder="Refer By"
            isClearable={false}
          />
        </div>

        <div className="grid lg:grid-cols-2   xl:gap-2">
          <div className="flex lg:mr-3 lg:mt-6 lg:border-r-2 border-slate-500">
            <CheckBoxField
              control={control}
              name="isMlc"
              label="Medico Legal Case"
       
            />
            <CheckBoxField
              control={control}
              name="admissionAdvice"
              label="Admission Advised"
            />
          </div>

          <div className="">
            <label className="text-sm font-semibold">
              Type Of Care Required
            </label>
            <div className="flex">
              <div className="whitespace-nowrap">
                <CheckBoxField
                  control={control}
                  name="medicalManagement"
                  label="Medical Management"
                />
              </div>
              <div className="whitespace-nowrap">
                <CheckBoxField
                  control={control}
                  name="surgicalManagement"
                  label="Surgical Management"
                />
              </div>
            </div>
          </div>
        </div>

        {/* remarks Field */}
        <div className="w-full my-2">
          <InputField
            name="remarks"
            variant="outlined"
            label="Remark"
            error={errors.remarks}
            control={control}
            inputProps={{
              style: { textTransform: "capitalize" },
            }} // use inputProps props for return 1st letter in upper case
            required
          />
        </div>

        {/* Buttons Add Update Cancel Reset */}
        <div className="flex gap-2 justify-end mb-2">
          {props.edit ? (
            <CancelButton
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          ) : (
            <ResetButton onClick={() => reset(defaultValues)} />
          )}

          {props.edit ? <UpdateButton /> : <SaveButton />}
        </div>
      </form>

      {/* Confirmation modal for PUT request */}
      <ConfirmationModal
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        // confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
      {/* Confirmation modal for POST request */}
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </>
  );
}
