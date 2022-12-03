import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  getCamp,
  getCompanyName,
  getDepartment,
  getDoctors,
  getPatientCategory,
  getPatientSource,
  getSubDepartment,
  getTariff,
  getUnitsDropDown,
} from "../../../../services/admissiondetails/admissionDetailsService";
import BedAllowModal from "../../../bedallowcation/BedAllowModal";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../../Common Components/FormFields/InputField";

const AdmissionInfo = (props) => {
  const [admissionType, setAdmissionType] = useState();
  const [companyVisibity, setCompanyVisibity] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [units, setUnits] = React.useState();
  const [unitId, setUnitId] = React.useState(0);
  const [department, setDepartment] = useState();
  const [subDepartment, setSubDepartment] = useState();
  const [departmentId, setDepartmentId] = useState(0);
  const [doctors, setDoctors] = useState();
  const [patientSource, setPatientSource] = useState();
  const [campList, setCampList] = useState();
  const [patientCategory, setPatientCategory] = useState();
  const [isInsurance, setIsInsurance] = useState(false);
  const [companyName, setCompanyName] = useState();
  const [tariffList, setTariffList] = useState();
  const [openBed, setOpenBed] = React.useState(false);

  const handleOpenBed = () => setOpenBed(true);
  const handleCloseBed = () => setOpenBed(false);

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  let roleObj = {};

  useEffect(() => {
    roleObj = JSON.parse(localStorage.getItem("loggedUser"));
  }, []);

  // useEffect(() => {
  //   setUnits(roleObj.units);
  //   let unitsArr = roleObj.units;
  //   if (unitsArr.length == 1) {
  //     setUnitId(unitsArr[0].id);
  //     setValue("unit", roleObj.units, { shouldValidate: true });
  //   }
  // }, []);
  let departmentChange = watch("department");
  let patientCat = watch("patientCategory");

  //API to get Unit List
  useEffect(() => {
    getUnitsDropDown()
      .then((response) => {
        // console.log(response.data.result);
        setUnits(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API to get Department List
  useEffect(() => {
    console.log("unitId", unitId);
    if (unitId !== 0) {
      getDepartment(unitId)
        .then((response) => {
          // console.log(response.data.result);
          setDepartment(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [unitId]);

  //API to get Sub Department List
  useEffect(() => {
    if (departmentId !== 0) {
      getSubDepartment(departmentId)
        .then((response) => {
          // console.log("Doctors", response.data.result);
          setValue("subDepartment", "");
          setSubDepartment(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [departmentChange]);

  //API to get Doctor List
  useEffect(() => {
    if (departmentId !== 0) {
      getDoctors(departmentId)
        .then((response) => {
          // console.log("Doctors", response.data.result);
          setValue("doctor", "");
          setDoctors(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [departmentChange]);

  //API to get Patient Source
  useEffect(() => {
    getPatientSource()
      .then((response) => {
        // console.log(response.data.result);
        setPatientSource(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API to get Camp
  useEffect(() => {
    getCamp()
      .then((response) => {
        // console.log(response.data.result);
        setCampList(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API to get Patient Category
  useEffect(() => {
    getPatientCategory()
      .then((response) => {
        // console.log("Category--", response.data.result);
        setPatientCategory(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    if (patientCat) {
      if (
        patientCat.label.toLowerCase() === "staff" ||
        patientCat.label.toLowerCase() === "staff dependent"
      ) {
        setCompanyVisibity(true);
      } else if (
        patientCat.label.toLowerCase() === "corporate" ||
        patientCat.label.toLowerCase() === "insurance"
      ) {
        setCompanyVisibity(true);
        setValue("company", null);
      } else {
        setCompanyVisibity(false);
      }
    }
  }, [patientCat]);

  //API to get Company Name
  useEffect(() => {
    console.log("Category1", isInsurance);
    getCompanyName(isInsurance)
      .then((response) => {
        // console.log(response.data.result);
        setCompanyName(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [patientCat]);

  //API to get Tariff List
  useEffect(() => {
    getTariff()
      .then((response) => {
        setTariffList(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <div className="flex">
        {/* //Checkbox - Medical and Operative// */}
        <div className="ml-1">
          <CheckBoxField control={control} name="isMedicine" label="Medicine" />
          <CheckBoxField
            control={control}
            name="isOperative"
            label="Operative"
          />
        </div>
      </div>
      {/* //Admission Details// */}
      <div className="grid grid-cols-4 gap-3">
        {/* //IPD No // */}
        {/* <div className="col-span-2 lg:col-span-1">
          <InputField
            name="ipdNo"
            variant="outlined"
            label="IPD No."
            error={errors.ipdNo}
            control={control}
            inputProps={{ maxLength: 100 }}
          />
        </div> */}

        {/* //Admission Date// */}
        <div className="col-span-2 lg:col-span-1">
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
                      label="Admission Date"
                      name="admissionDate"
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
                    // getNewRegDate(e);
                  }}
                  error={Boolean(errors.admissionDate)}
                  helperText={errors.admissionDate?.message}
                />
              </LocalizationProvider>
            )}
            name="admissionDate"
          />
        </div>

        {/* //Admission Time// */}
        <div className="col-span-2 lg:col-span-1">
          <Controller
            control={control}
            defaultValue={new Date()}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  open={openTime}
                  onOpen={() => setOpenTime(true)}
                  onClose={() => setOpenTime(false)}
                  inputProps={{ readOnly: true }}
                  // disablePast
                  // readOnly={true}

                  renderInput={(props) => (
                    <TextField
                      {...props}
                      type="date"
                      variant="outlined"
                      label="Admission Time"
                      name="admissionTime"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      onClick={(e) => setOpenTime(true)}
                    />
                  )}
                  {...field}
                  onAccept={(e) => {
                    // getNewRegDate(e);
                  }}
                  error={Boolean(errors.admissionTime)}
                  helperText={errors.admissionTime?.message}
                />
              </LocalizationProvider>
            )}
            name="admissionTime"
          />
        </div>

        {/* //unit// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.unit}
            name="unit"
            dataArray={units}
            placeholder="Unit *"
            // isSearchable={false}
            inputRef={{
              ...register("unit", {
                onChange: (e) => {
                  console.log("UNIT ID", e.target);
                  setUnitId(e.target.value.id);
                },
              }),
            }}
          />
        </div>

        {/* //department //*/}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.department}
            name="department"
            label="Department *"
            dataArray={department}
            // isSearchable={false}
            placeholder="Department *"
            isClearable={false}
            inputRef={{
              ...register("department", {
                onChange: (e) => {
                  console.log(e.target.value.id);
                  setDepartmentId(e.target.value.id);
                },
              }),
            }}
          />
        </div>

        {/* //Sub department //*/}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.subDepartment}
            name="subDepartment"
            label="Sub Department"
            dataArray={subDepartment}
            // isSearchable={false}
            placeholder="Sub Department"
            isClearable={false}
            // inputRef={{
            //   ...register("subDepartment", {
            //     onChange: (e) => {
            //       console.log(e.target.value.id);
            //       setDepartmentId(e.target.value.id);
            //     },
            //   }),
            // }}
          />
        </div>
        {/* //doctor// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.employee}
            name="employee"
            label="Doctor *"
            dataArray={doctors}
            // isSearchable={false}
            placeholder="Doctor *"
            isClearable={false}
          />
        </div>
        {/* //Patient Source// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.patientSource}
            name="patientSource"
            label="Patient Source"
            dataArray={patientSource}
            // isSearchable={false}
            placeholder="Patient Source"
            isClearable={false}
          />
        </div>
        {/* //Camp// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.camp}
            name="camp"
            label="Camp"
            dataArray={campList}
            // isSearchable={false}
            placeholder="Camp"
            isClearable={false}
          />
        </div>

        {/* //Patient Category// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.patientCategory}
            name="patientCategory"
            label="Patient Category *"
            dataArray={patientCategory}
            // isSearchable={false}
            placeholder="Patient Category *"
            isClearable={false}
            inputRef={{
              ...register("patientCategory", {
                onChange: (e) => {
                  console.log(e.target.value.label);
                  let selectedCategory = e.target.value.label;
                  selectedCategory === "Insurance"
                    ? setIsInsurance(true)
                    : setIsInsurance(false);
                },
              }),
            }}
          />
        </div>

        {/* //Tariff// */}
        <div className="">
          <DropdownField
            control={control}
            error={errors.tariff}
            name="tariff"
            label="Tariff *"
            dataArray={tariffList}
            // isSearchable={false}
            placeholder="Tariff *"
            isClearable={false}
          />
        </div>

        {/* //Select Bed// */}
        {props.isBedDetails === true ? (
          <button
            type="button"
            className="border-2 w-full lg:w-6/12 h-10 border-orange-500 py-[0.65rem] px-2 rounded-md"
            onClick={handleOpenBed}
          >
            <p className="text-orange-500 text-xs">CHANGE BED</p>
          </button>
        ) : (
          <button
            type="button"
            className="border-2 w-full lg:w-6/12 h-10 border-orange-500 py-[0.65rem] px-2 rounded-md"
            onClick={handleOpenBed}
          >
            <p className="text-orange-500 text-xs">SELECT BED</p>
          </button>
        )}

        {openBed ? (
          <BedAllowModal
            handleOpen={handleOpenBed}
            handleClose={handleCloseBed}
            open={openBed}
            setOpen={setOpenBed}
          />
        ) : null}
      </div>

      {/* //Company Details// */}
      {companyVisibity === true ? (
        <div>
          {patientCat.label.toLowerCase() !== "staff" ? (
            <div>
              <p className="font-bold tracking-wide text-sm font-Poppins my-2">
                Company Details
              </p>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <DropdownField
                    control={control}
                    error={errors.company}
                    name="company"
                    label="Company"
                    dataArray={companyName}
                    // isSearchable={false}
                    placeholder="Company"
                    isClearable={false}
                  />
                </div>

                <div>
                  <InputField
                    name="assistantCompany"
                    variant="outlined"
                    label="Assistant Company"
                    error={errors.assistantCompany}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>

                <div>
                  <InputField
                    name="idNo"
                    variant="outlined"
                    label="ID No."
                    error={errors.idNo}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold tracking-wide text-sm font-Poppins my-2">
                Employee Details
              </p>
              <div className="grid grid-cols-5 gap-3">
                {/* //Code// */}
                <div>
                  <InputField
                    name="code"
                    variant="outlined"
                    label="Code"
                    error={errors.code}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                {/* //IPD Limit// */}
                <div>
                  <InputField
                    name="ipdLimit"
                    variant="outlined"
                    label="IPD Limit"
                    error={errors.ipdLimit}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                {/* //Used// */}
                <div>
                  <InputField
                    name="used"
                    variant="outlined"
                    label="Used"
                    error={errors.used}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                {/* //Name// */}
                <div className="col-span-2">
                  <InputField
                    name="empname"
                    variant="outlined"
                    label="Name"
                    error={errors.empname}
                    control={control}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdmissionInfo;
