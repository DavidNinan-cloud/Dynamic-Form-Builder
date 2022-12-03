import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../Common Components/FormFields/InputField";
import DropdownField from "../Common Components/FormFields/DropdownField";
import SearchDropdown from "../Common Components/FormFields/searchDropdown";
import ConfirmationModal from "../Common Components/ConfirmationModal";
import {
  getpatientSource,
  getUnitlist,
  getDoctorDropdown, // use for get Department id
  getClassCategoryDropdown,
  getreferType,
  getreferBy,
  addNewEmergency,
} from "./services/emergencyservice/EmergencyServices";
import CheckBoxField from "../Common Components/FormFields/CheckBoxField";
import ResetButton from "../Common Components/Buttons/ResetButton";
import CancelButton from "../Common Components/Buttons/CancelButton";
import UpdateButton from "../Common Components/Buttons/UpdateButton";
import { useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../Common Components/Toasts/CustomToasts";
import SaveButton from "../Common Components/Buttons/SaveButton";

export default function IpdRegisterForm(props) {
  const { patientInfoId } = props;

  const schema = yup.object().shape({
    // mobileNumber: yup
    //   .string()
    //   .matches(/^[0-9]+$/, "Provide Valid Mobile No.")
    //   .min(10, "Provide Valid Mobile No.")
    //   .max(14, "Provide Valid Mobile No.")
    //   .required("Required"),
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
    isEmergency: false,
    unit: null,
    patientInfo: null,
    isMlc: false,
    admissionAdvice: false,
    patientSource: null,
    employee: null,
    department: null,
    referType: null,
    referBy: null,
    bedCategory: null,
    // mobileNumber: "",
    medicalManagement: false,
    surgicalManagement: false,
    department: null,
    remarks: "",
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [patientSource, setpatientSource] = React.useState(); //Patient Source
  const [referType, setreferType] = React.useState(); //Referral Type
  const [referBy, setreferBy] = React.useState(); //Referral By
  const [unit, setUnit] = React.useState([]);
  const [unitId, setUnitId] = React.useState("");
  const [referralemployee, setReferralemployee] = React.useState([]);
  const [classTypeOptions, setClasstypeOptions] = React.useState([]); //Bed Category
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
    console.log("The form data is ");
    console.log(data);

    data.patientInfo === null ? data.patientInfo = null : data.patientInfo = { id: props.patientInfoId };
    let obj = getValues("employee");
    console.log("object is ", obj);
    data.employee = { id: data.employee.id };
    let employeeObj = getValues("employee");
    console.log("employeeObj is " + JSON.stringify(employeeObj));
    data.department = { id: employeeObj.departmentid };
    data.referBy === null ? data.referBy = null : data.referBy = { id: data.referBy.id };
    data.referType === null ? data.referType = null : data.referType =  { id: data.referType.id };
    data.bedCategory === null ? data.bedCategory = null : data.bedCategory = { id: data.bedCategory.id };
    data.unit = { id: unitId };
    data.patientInfo === null ? data.patientInfo = null : data.patientInfo = { id: props.patientInfoId };

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
    // Patient Source
    getpatientSource()
      .then((response) => {
        setpatientSource(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });

    //Store all the options of the ward Dropdown before the component gets mounted
    console.log("getUnitList() is going to be executed");
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
        <div className="grid w-full ">
          {props.patientInfo ? (
            <>
              {/* Populate Patient Info Fields */}
              <div className="grid border border-gray-300 bg-gray-100 px-3 rounded mt-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                  <div className="grid gap-2 border-r-2 border-slate-500 my-1 ">
                    {/* Patient Name , UHID */}
                    <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex space-x-1">
                        <span className="text-sm">Patient Name </span>
                        <span className=""> :</span>
                      </h1>
                      {/* <h1 className="font-normal">Ram Sham Rao</h1> */}
                      <h1 className="font-normal">
                        {props.patientData.patientName}
                      </h1>
                    </div>
                    <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex space-x-5 lg:space-x-4">
                        <span className="text-sm">Gender</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">Male</h1> */}
                      <h1 className="font-normal">
                        {props.patientData.gender}
                      </h1>
                    </div>
                  </div>

                  {/* Gender , Age */}
                  <div className="grid gap-2 lg:border-r-2 pl-4 border-slate-500 my-1 ">
                    <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex space-x-16 lg:space-x-16">
                        <span className="text-sm">UHID</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">124584</h1> */}
                      <h1 className="font-normal">{props.patientData.uhid}</h1>
                    </div>
                 
                    <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex md:space-x-7 space-x-1">
                        <span className="text-sm">Mobile No</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">Dr.Gupte</h1> */}
                      <h1 className="font-normal">
                        {props.patientData.mobileNumber}
                      </h1>
                    </div>
                  </div>

                  {/* Bed No */}
                  <div className="lg:pl-4">
                  <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex space-x-11 lg:space-x-10">
                        <span className="text-sm">Age</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">23Year 02Months.</h1> */}
                      <h1 className="font-normal">{props.patientData.age}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {/* Patient Sourse Dropdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 py-2 gap-2">
          {/* <InputField
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
          /> */}

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
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
        <div className="my-2">
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
                <ResetButton
                  onClick={() => {
                    reset(defaultValues);
                    props.setResetIPDBtnFlag(true);
                    // props.patientInfoId("");
                  }}
                />
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
