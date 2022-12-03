import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InputField from "../Common Components/FormFields/InputField";
import DropdownField from "../Common Components/FormFields/DropdownField";
import SearchDropdown from "../Common Components/FormFields/searchDropdown";
import { Grid, TextField } from "@mui/material";
import CommonSelectableServiceTable from "./common/CommonSelectableServiceTable";
import ConfirmationModal from "../Common Components/ConfirmationModal";
import { getPrefixDropDown } from "./services/emergencyservice/EmergencyServices";
import RadioField from "../Common Components/FormFields/RadioField";
import {
  getAgeonDOB,
  getDOBonAge,
  getGenders,
  getUnitlist,
  getDoctorDropdown, // use for get Department id
  addNewEmergency,
  autoSearchService,
} from "./services/emergencyservice/EmergencyServices";
import { Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import ResetButton from "../Common Components/Buttons/ResetButton";
import CancelButton from "../Common Components/Buttons/CancelButton";
import UpdateButton from "../Common Components/Buttons/UpdateButton";
import { useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../Common Components/Toasts/CustomToasts";
import SearchBar from "../Common Components/FormFields/SearchBar";
import AddTypeButton from "../Common Components/Buttons/AddTypeButton";
import SaveButton from "../Common Components/Buttons/SaveButton";

const data = {
  message: "country list found ",
  result: [
    {
      Id: 1,
      ServiceCode: "1",
      Service: "ACTIVATED CLOTTING TIME (ACT)",
    },
    {
      Id: 2,
      ServiceCode: "2",
      Service: "PACKAGE FOR NORMAL DELIVERY (PN)",
    },
    {
      Id: 3,
      ServiceCode: "3",
      Service: "PACKAGE FOR NORMAL DELIVERY (PN)",
    },
  ],
  statusCode: 200,

  count: 5,
};

export default function OpdEmergencyForm(props) {
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
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
    age: yup
      .string()
      .matches(/^(?:10[0-9]|110|[0-9][0-9]|[2-9][0-9]|[0-9])$/, "Invalid")
      .required("Required"),
  });

  const defaultValues = {
    opdIpd: 0, //0 for OPD , 1 for IPD
    isEmergency: true,
    unit: null,
    services: null,
    prefix: null,
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    gender: null,
    employee: null,
    dob: new Date(),
    age: 0,
    ageInYears: 0,
    ageInMonths: 0,
    ageInDays: 0,
    remarks: "",
    Qty: "",
    department: null,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [genders, setGenders] = React.useState([]);
  const [prefixes, setPrefixes] = React.useState();
  const [openBirthDate, setOpenBirthDate] = React.useState(false);
  const [enteredAge, setEnteredAge] = React.useState();
  const [serviceErrorMessage, setServiceErrorMessage] = React.useState("");
  const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");

  let fullDOB;
  let fullRegDate;
  let dobValue;

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();
  let minYear = currentYear - 111;

  const { isDisabled } = props; //use For age // BOD Fields are disable
  const checkboxVisible = false; // for Service table checkbox
  const [serviceheaders, setServiceHeaders] = React.useState([
    // "id",
    "Service Code",
    "Service Name",
    "Quantity",
  ]);
  const [service, setService] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [unit, setUnit] = React.useState([]);
  const [unitId, setUnitId] = React.useState("");
  const [referralemployee, setReferralemployee] = React.useState([]);
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

  const handleServiceErrorMesg = () => {
    let searvicError = getValues("services");
    if (searvicError === null) {
      setServiceErrorMessage("Required");
    } else if (searvicError !== null) {
      setServiceErrorMessage("");
    }
  };
  const handleQtyErrorMesg = () => {
    let Qty = getValues("Qty");
    if (Qty === "") {
      setQtyErrorMessage("Required");
    } else if (Qty !== "" && Qty <= 1) {
      setQtyErrorMessage("");
    }
  };

  // setValue("services", null);
  const onSubmitDataHandler = (data) => {
    console.log("Employee is");
    console.log(getValues("employee"));
    data.employee = { id: data.employee.id };
    let employeeObj = getValues("employee");
    console.log("employeeObj is " + JSON.stringify(employeeObj));
    data.department = { id: employeeObj.departmentid };
    data.gender = { id: getValues("gender") };
    data.prefix = { id: data.prefix.id };
    data.unit = { id: unitId };

    let serviceObj = getValues("services");
    console.log("serviceObj is", serviceObj);
    data.services === null
      ? (data.services = null)
      : (data.services = [
          { serviceId: serviceObj.id, serviceCode: serviceObj.value },
        ]);

    console.log("Our required object is ");
    console.log(data);
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
        fromDate: "",
        page: 0,
        size: 10,
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
  }, []);
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

  //API For Gender dropdown
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

  function displayView() {
    console.log("dispalyVeiw Function Call");
  }

  // Handle Change Use For Service api
  const handleChange = (autoServceSearchString) => {
    console.log(
      "The value of service that was typed is " + autoServceSearchString
    );
    if (autoServceSearchString !== "") {
      autoSearchService(autoServceSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setService(res.result);
          setServiceErrorMessage("");
        })
        .catch((error) => {
          console.log("Service Error is: ", error);
        });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  const addServiceData = () => {
    let valueObj = getValues(["services", "Qty"]);
    //structure of valueObj is : [
    //     {
    //       "id": 42,
    //       "label": "MINOR DRESSING CHARGES",
    //       "value": "MINOR DRESSING CHARGES"
    //   },
    //   1
    // ]  so thats way Qty is 1 is not equal to empty
    console.log("ValueObj Qty is", valueObj[1]);
    console.log("ValueObj is", valueObj);
    if (valueObj[0] !== null && valueObj[1] !== "") {
      let obj = valueObj[0];
      let requiredObj = {};
      requiredObj["id"] = obj.id;
      requiredObj["Service Code"] = obj.value;
      requiredObj["Service Name"] = obj.label;
      requiredObj["Quantity"] = valueObj[1];
      let arr = [...data];
      arr.push(requiredObj);
      setData(arr);
    }
  };

  //We select service quantity value bedefault set 1
  let services = watch("services");
  useEffect(() => {
    if (services !== null) {
      setValue("Qty", 1);
      setQtyErrorMessage("");
    } else if (services === null) {
      setValue("Qty", "");
      setQtyErrorMessage("");
    }
  }, [services]);

  return (
    <div className="my-2">
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

          <Grid item className="items-center mt-5">
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

          {/* <SearchBar */}
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
        </div>

        <div className="">
          <div className="flex w-full  mt-2 gap-2">
            <span className="mt-2 text-gray-700 font-semibold whitespace-nowrap">
              Service Information
            </span>
            <div className="w-2/4 pl-10 pb-2 z-10">
              {/* <SearchBar
                    clearSearchBar={true}
                      name="services"
                      placeholder="Search by Service"
                      dataArray={service}
                      handleInputChange={handleChange}
                      onChange={autoSelectedValue}
                    /> */}
              <SearchDropdown
                control={control}
                name="services"
                label="Search by Services"
                placeholder="Search by Service"
                searchIcon={true}
                isSearchable={true}
                isClearable={false}
                dataArray={service}
                handleInputChange={handleChange}
              />
              <p className="text-customRed text-sm">{serviceErrorMessage}</p>
            </div>
            <div className="mb-2 flex gap-2">
              <div className="w-40">
                <InputField
                  name="Qty"
                  type="number"
                  variant="outlined"
                  label="Qty"
                  control={control}
                />
                <p className="text-customRed text-sm">{qtyErrorMessage}</p>
              </div>
              <AddTypeButton
                onClick={() => {
                  handleServiceErrorMesg(),
                    handleQtyErrorMesg(),
                    addServiceData();
                }}
              />
            </div>
          </div>

          <CommonSelectableServiceTable
            serviceheaders={serviceheaders}
            data={data}
            setData={setData}
            checkboxVisible={checkboxVisible}
          />
        </div>

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
    </div>
  );
}
