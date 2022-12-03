import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import {
  getCabin,
  getCompanyName,
  getDepartment,
  getDoctorList,
  getDoctors,
  getPatientCategory,
  getPatientSource,
  getPatientType,
  getSubDepartment,
  getSystemDate,
  getTariff,
  getVisitType,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

// const patientType = [
//   { value: "self", label: "Self" },
//   { value: "others", label: "Others" },
// ];

// const patientCategory = [
//   { value: "self", label: "Self" },
//   { value: "corporate", label: "Corporate Company" },
//   { value: "insurance", label: "Insurance Company" },
// ];
// const patientCompanyName = [
//   { value: "corporate1", label: "Corporate Company 1" },
//   { value: "corporate2", label: "Corporate Company 2" },
//   { value: "insurance1", label: "Insurance Company 1" },
// ];

// const patientSource = [{ value: "walkIn", label: "Walk In" }];

// const visitType = [{ value: "firstVisit", label: "First Visit" }];

// const department = [{ value: "cardiology", label: "Cardiology" }];

// const subdepartment = [{ value: "cardiology", label: "Cardiology" }];

// const doctor = [{ value: "Dr.ABCD", label: "Dr.ABCD" }];

const VisitInfo = (props) => {
  const [companyVisibity, setCompanyVisibity] = useState(false);
  const [companyLabel, setCompanyLabel] = useState("");
  const [patientCompanyName, setPatientCompanyName] = useState();
  // const [patientType, setPatientType] = useState();
  const [patientSource, setPatientSource] = useState();
  const [visitType, setVisitType] = useState();
  const [patientCategory, setPatientCategory] = useState();
  const [isInsurance, setIsInsurance] = useState(false);
  const [tariff, setTariff] = useState();
  const [department, setDepartment] = useState();
  const [departmentId, setDepartmentId] = useState(0);
  // const [subDepartment, setSubDepartment] = useState([]);
  const [cabin, setCabin] = useState();
  const [doctors, setDoctors] = useState([]);
  const [openVisitDate, setOpenVisitDate] = useState(false);
  // const [doctorList, setDoctorList] = useState();

  const { value, setValue, setPatientCategoryValue, unitId } = props;
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const methods = useFormContext();
  let patientCat = watch("patientCategory");
  let departmentChange = watch("department");

  //API to get System Date for Visit Date
  useEffect(() => {
    getSystemDate()
      .then((response) => {
        // console.log(response.data.result);

        let fullYear = response.data.result;
        let year = fullYear.substring(0, 4);
        let month = fullYear.substring(5, 7);
        let day = fullYear.substring(8, 10);
        setValue("visitDate", year, month, day);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API to get Patient Type
  // useEffect(() => {
  //   getPatientType()
  //     .then((response) => {
  //       // console.log(response.data.result);
  //       setPatientType(response.data.result);
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // }, []);

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

  //API to get Visit Type
  useEffect(() => {
    getVisitType()
      .then((response) => {
        // console.log(response.data.result);
        setVisitType(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //API to get Visit Type
  useEffect(() => {
    getTariff()
      .then((response) => {
        // console.log(response.data.result);
        setTariff(response.data.result);
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

  //Api to get Company Name
  useEffect(() => {
    console.log("Category1", isInsurance);
    getCompanyName(isInsurance)
      .then((response) => {
        // console.log(response.data.result);
        setPatientCompanyName(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [patientCat]);

  useEffect(() => {
    if (patientCat !== null) {
      if (typeof patientCat !== "undefined") {
        if (patientCat.label.toLowerCase() === "insurance") {
          setCompanyVisibity(true);
          setCompanyLabel("Insurance Company Name*");
          methods.setValue("company", null);
        } else if (patientCat.label.toLowerCase() === "corporate") {
          setCompanyVisibity(true);
          setCompanyLabel("Corporate Company Name*");
          methods.setValue("company", null);
        } else {
          setCompanyVisibity(false);
        }
      }
      console.log("companyVisibity", companyVisibity);
    }
  }, [patientCat]);

  //Api to get Department List
  useEffect(() => {
    console.log("unitId", unitId);
    methods.setValue("department", "");
    methods.setValue("doctor", "");
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

  //API to get Cabin List
  useEffect(() => {
    getCabin()
      .then((response) => {
        console.log("Cabin", response.data.result);
        setCabin(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //Api to get Sub Department List
  // useEffect(() => {
  //   if (departmentId !== 0) {
  //     getSubDepartment(departmentId)
  //       .then((response) => {
  //         // console.log("SubDepartment", response.data.result);
  //         setSubDepartment(response.data.result);
  //       })
  //       .catch((response) => {
  //         console.log(response);
  //       });
  //   }
  // }, [departmentChange]);
  //API to get Doctor List
  useEffect(() => {
    if (departmentId !== 0) {
      getDoctors(departmentId)
        .then((response) => {
          // console.log("Doctors", response.data.result);
          methods.setValue("doctor", "");
          setDoctors(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [departmentChange]);

  //API to get Doctor List
  // useEffect(() => {
  //   getDoctorList()
  //     .then((response) => {
  //       console.log(response.data.result);
  //       setDoctorList(response.data.result);
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {/* //Visit Date And Time // */}
        <div className="col-span-2 lg:col-span-1">
          <Controller
            control={control}
            // defaultValue={new Date()}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={openVisitDate}
                  onOpen={() => setOpenVisitDate(true)}
                  onClose={() => setOpenVisitDate(false)}
                  disablePast
                  disableFuture
                  inputProps={{ readOnly: true }}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      type="date"
                      variant="outlined"
                      label="Visit Date"
                      name="visitDate"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      onClick={(e) => setOpenVisitDate(true)}
                    />
                  )}
                  PopperProps={{ placement: "auto-end" }}
                  inputFormat="dd/MM/yyyy"
                  // minDate={new Date()}
                  {...field}
                  // error={Boolean(errors.visitDate)}
                  // helperText={errors.visitDate?.message}
                />
              </LocalizationProvider>
            )}
            name="visitDate"
          />
        </div>

        {/* //Type of Patient // */}
        {/* <div> */}
        {/* <Controller
            control={control}
            name="patientType"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.patientType)}
              >
                <InputLabel id="patientType">Type of Patient</InputLabel>
                <Select
                  labelId="patientType"
                  id="demo-simple-select"
                  label="Type of Patient"
                  name="patientType"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"self"}>Self</MenuItem>
                  <MenuItem value={"others"}>Others</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.patientType && <p>{errors.patientType.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
        {/* <DropdownField
            control={control}
            error={errors.patientType}
            name="patientType"
            label="Patient Type"
            dataArray={patientType}
            isSearchable={false}
            placeholder="Patient Type"
            isClearable={false}
          /> */}
        {/* </div> */}

        {/* //Patient Source // */}
        <div className="col-span-2 lg:col-span-1">
          {/* <Controller
            control={control}
            name="patientSource"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.patientSource)}
              >
                <InputLabel id="patientSource">Patient Source</InputLabel>
                <Select
                  labelId="patientSource"
                  id="demo-simple-select"
                  label="Patient Source"
                  name="patientSource"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"walkIn"}>WalkIn</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.patientSource && (
                    <p>{errors.patientSource.message}</p>
                  )}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <DropdownField
            control={control}
            error={errors.patientSource}
            name="patientSource"
            label="Patient Source *"
            dataArray={patientSource}
            isSearchable={false}
            placeholder="Patient Source *"
            isClearable={false}
          />
        </div>

        {/* //Visit Type // */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.visitType}
            name="visitType"
            label="Visit Type *"
            dataArray={visitType}
            isSearchable={false}
            placeholder="Visit Type *"
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
            isSearchable={false}
            placeholder="Patient Category *"
            isClearable={false}
            inputRef={{
              ...register("patientCategory", {
                onChange: (e) => {
                  console.log(e.target.value.label);
                  let selectedCategory = e.target.value.label;
                  selectedCategory !== "Self"
                    ? setPatientCategoryValue(true)
                    : setPatientCategoryValue(false);
                  selectedCategory === "Insurance"
                    ? setIsInsurance(true)
                    : setIsInsurance(false);
                },
              }),
            }}
          />
        </div>

        {/* //Patient Company Name// */}
        {companyVisibity === true ? (
          <div className="col-span-2 lg:col-span-2">
            <DropdownField
              control={control}
              error={errors.company}
              name="company"
              label={companyLabel}
              dataArray={patientCompanyName}
              isSearchable={false}
              placeholder={companyLabel}
              isClearable={false}
            />
          </div>
        ) : null}

        {/* //Department // */}
        <div className="col-span-2 lg:col-span-1">
          {/* <Controller
            control={control}
            name="department"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.department)}
              >
                <InputLabel id="department">Department</InputLabel>
                <Select
                  labelId="department"
                  id="demo-simple-select"
                  label="Department"
                  name="department"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"cardiology"}>Cardiology</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.department && <p>{errors.department.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <DropdownField
            control={control}
            error={errors.department}
            name="department"
            label="Department *"
            dataArray={department}
            isSearchable={false}
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

        {/* //Sub Department // */}
        {/* <div>
          <DropdownField
            control={control}
            error={errors.subDepartment}
            name="subDepartment"
            label="Sub Department"
            dataArray={subDepartment}
            isSearchable={false}
            placeholder="Sub Department"
            isClearable={false}
          />
        </div> */}

        {/* //Cabin// */}
        <div className="col-span-2 lg:col-span-1">
          <DropdownField
            control={control}
            error={errors.cabin}
            name="cabin"
            label="Cabin *"
            dataArray={cabin}
            isSearchable={false}
            placeholder="Cabin *"
            isClearable={false}
          />
        </div>

        {/* //Doctor // */}
        <div className="col-span-2 lg:col-span-1">
          {/* <Controller
            control={control}
            name="doctor"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl
                size="small"
                fullWidth
                error={Boolean(errors.doctor)}
              >
                <InputLabel id="doctor">Doctor</InputLabel>
                <Select
                  labelId="doctor"
                  id="demo-simple-select"
                  label="Doctor"
                  name="doctor"
                  defaultValue={""}
                  {...field}
                >
                  <MenuItem value={"abcd"}>Dr. ABCD</MenuItem>
                </Select>
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {errors.doctor && <p>{errors.doctor.message}</p>}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          <DropdownField
            control={control}
            error={errors.doctor}
            name="doctor"
            label="Doctor *"
            dataArray={doctors}
            isSearchable={false}
            placeholder="Doctor *"
            isClearable={false}
          />
        </div>

        {/* //Tariff  // */}
        <div className="">
          <DropdownField
            control={control}
            error={errors.tariff}
            name="tariff"
            label="Tariff *"
            dataArray={tariff}
            isSearchable={false}
            placeholder="Tariff *"
            isClearable={false}
          />
        </div>

        {/* //Remark/Reason // */}
        <div className="col-span-2">
          {/* <Controller
            control={control}
            name="remark"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Remark/Reason"
                fullWidth
                size="small"
                {...field}
                error={Boolean(errors.remark)}
                helperText={errors.remark?.message}
              />
            )}
          /> */}
          <InputField
            name="complaints"
            variant="outlined"
            label="Complaints/Reason"
            error={errors.complaints}
            control={control}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitInfo;
