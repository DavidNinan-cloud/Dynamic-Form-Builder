import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../Common Components/FormFields/InputField";
import SearchDropdown from "../Common Components/FormFields/searchDropdown";
import CommonSelectableServiceTable from "./common/CommonSelectableServiceTable";
import ConfirmationModal from "../Common Components/ConfirmationModal";
import {
  addNewEmergency,
  autoSearchService,
  getDoctorDropdown,
  getUnitlist,
} from "./services/emergencyservice/EmergencyServices";
import SaveButton from "../Common Components/Buttons/SaveButton";
import ResetButton from "../Common Components/Buttons/ResetButton";
import CancelButton from "../Common Components/Buttons/CancelButton";
import UpdateButton from "../Common Components/Buttons/UpdateButton";
import { useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../Common Components/Toasts/CustomToasts";
import DropdownField from "../Common Components/FormFields/DropdownField";
import SearchBar from "../Common Components/FormFields/SearchBar";
import AddTypeButton from "../Common Components/Buttons/AddTypeButton";

export default function OpdRegisteredForm(props) {
  const { patientInfoId } = props;

  const schema = yup.object().shape({
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),

    employee: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
  });
  const defaultValues = {
    opdIpd: 0, //0 for OPD , 1 for IPD
    isEmergency: false,
    patientInfo: null,
    unit: null,
    services: null,
    employee: null,
    remarks: "",
    department: null,
    Qty: null,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const checkboxVisible = false; // for table checkbox
  const serviceheaders = [
    // "id",
    "Service Code",
    "Service Name",
    "Quantity",
  ];
  const [service, setService] = React.useState([]); //use for service
  const [data, setData] = React.useState([]); // use for service data show
  const [referralemployee, setReferralemployee] = React.useState([]);
  const [unit, setUnit] = React.useState([]);
  const [unitId, setUnitId] = React.useState("");
  const [finalData, setFinalData] = React.useState({});
  const [serviceErrorMessage, setServiceErrorMessage] = React.useState("");
  const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");

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

  const onSubmitDataHandler = (data) => {
    data.employee = { id: data.employee.id };
    let employeeObj = getValues("employee");
    console.log("employeeObj is " + JSON.stringify(employeeObj));
    data.department = { id: employeeObj.departmentid };
    data.unit = { id: unitId };
    data.patientInfo = { id: props.patientInfoId };
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

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });
  }, []);

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

  function displayView() {
    console.log("dispalyVeiw Function Call");
  }

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
          // setValue("qty", 1);
          setService(res.result);
          setServiceErrorMessage("");
        })
        .catch((error) => {
          console.log("Service Error is: ", error);
        });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  // const autoSelectedValue = (value) => {
  //   console.log(
  //     "The auto-complete object clicked by user is " + JSON.stringify(value)
  //   );
  // };

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
    <>
      <form onSubmit={handleSubmit(onSubmitDataHandler)} className="mx-2">
        <div className="grid w-full">
          {props.patientInfo ? (
            <>
              {/* Populate Patient Info Fields */}
              <div className="grid border bg-gray-100 border-gray-300 px-3 rounded mt-1">
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
                      <h1 className="text-black font-semibold flex space-x-12 lg:space-x-12 xl:space-x-4">
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
                      <h1 className="text-black font-semibold flex md:space-x-7 lg:space-x-1">
                        <span className="text-sm">Mobile No</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">9484280404</h1> */}
                      <h1 className="font-normal">
                        {props.patientData.mobileNumber}
                      </h1>
                    </div>
                  </div>

                  {/* Bed No */}
                  <div className="lg:pl-4">
                    <div className="flex gap-2 ">
                      <h1 className="text-black font-semibold flex space-x-16 lg:space-x-10">
                        <span className="text-sm">Age</span>
                        <span className="">:</span>
                      </h1>
                      {/* <h1 className="font-normal">23Year 02Months.</h1> */}
                      <h1 className="font-normal">{props.patientData.age}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 mt-2 gap-2">
                <div className="">
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
                </div>
                <div className="">
                  {/* Doctor input field */}
                  <SearchDropdown
                    control={control}
                    name="employee"
                    label="Doctor"
                    error={errors.employee}
                    placeholder="Doctor"
                    searchIcon={true}
                    isSearchable={true}
                    isClearable={false}
                    dataArray={referralemployee}
                    isMulti={false}
                    // clearValue={true}
                  />
                </div>
              </div>

              <div className="">
                <div className="flex w-full py-2 gap-2">
                  <span className="mt-2 text-gray-700 font-semibold whitespace-nowrap">
                    Service Information
                  </span>
                  <div className="grid w-2/4 pl-10 pb-2 z-10">
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
                    <p className="text-customRed text-sm">
                      {serviceErrorMessage}
                    </p>
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
                      <p className="text-customRed text-sm">
                        {qtyErrorMessage}
                      </p>
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

              <div className="w-full mt-2">
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
            </>
          ) : (
            ""
          )}
        </div>

        {/* Buttons Add Update Cancel Reset */}
        <div className="flex gap-2 justify-end my-4">
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
                props.setResetBtnFlag(true);
                // props.setPatientInfoId("");
                // props.setPatientInfo(false);
                // props.setPatientData();
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
