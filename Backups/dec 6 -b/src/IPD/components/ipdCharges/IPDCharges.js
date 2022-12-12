import * as React from "react";
import { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button, TextField } from "@mui/material";
import CommonTable from "./IPDChargesTable";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../Common Components/FormFields/InputField";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import AddButton from "../../../Common Components/Buttons/AddButton";
import { useLocation } from "react-router-dom";
import {
  getDoctorList,
  getPatientData,
  getSearchPatient,
  getSearchServiceList,
  saveServices,
} from "../../services/ipdcharges/IPDCharges";
import DropdownField from "../../../Common Components/FormFields/DropdownField";

export default function IPDCharges() {
  const [serviceList, setServiceList] = React.useState();
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    searchServiceList: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Service"),
    qty: yup
      .string()
      .required("Required")
      .matches(/^[0-9\s]+$/, "Invalid Value"),
    doctor: yup
      .object()
      .nullable()
      .when("searchServiceList", (searchServiceList) => {
        if (searchServiceList.isDoctorShareApplicable === true) {
          return yup
            .object()
            .shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
            .required();
        }
      }),
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      searchServiceList: null,
      qty: "",
    },
  });
  const [doctors, setDoctors] = React.useState();
  const [unitId, setUnitId] = React.useState(null);
  const [patientList, setPatientList] = React.useState([]);
  const [admissionId, setAdmissionId] = React.useState(null);
  const [bedCategoryId, setbedCategoryId] = React.useState(null);
  const [tariffId, setTariffId] = React.useState(null);
  const [selectedPatient, setSelectedPatient] = React.useState();
  const [addedServices, setAddedSevices] = React.useState([]);
  const [savedServices, setSavedSevices] = React.useState([]);
  const [actions, setActions] = React.useState(["Delete"]);
  const [previousCharges, setPreviousCharges] = React.useState([]);
  const [applicablePackage, setApplicablePackage] = React.useState([]);
  const [style, setStyle] = React.useState("col-span-5");
  const [isDoctorShareApplicable, setIsDoctorShareApplicable] = React.useState(
    null
  );

  // let roleObj = {};

  // useEffect(() => {
  //   roleObj = JSON.parse(localStorage.getItem("loggedUser"));
  // }, []);

  const location = useLocation();
  let admissionIdValue;

  useEffect(() => {
    if (location.state && location.state !== null) {
      setAdmissionId(location.state.admissionId);
      setbedCategoryId(location.state.bedCategory);
      setTariffId(location.state.tariff);
    }
    handleDoctorsList(unitId);
  }, [admissionIdValue]);

  //API For Get Doctors List
  const handleDoctorsList = (unitId) => {
    getDoctorList(unitId)
      .then((response) => {
        setDoctors(response.data.result);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  //API for Patient Search
  const handlePatientSearch = (e) => {
    console.log("Patient Search", e);
    if (e.length > 0) {
      getSearchPatient(e)
        .then((response) => {
          console.log("Response", response);
          setPatientList(response.data.result);
        })
        .catch((response) => {
          console.log("Error");
        });
    }
  };

  //API For Get Patient Info and Previous Services

  const handlePatientInfo = () => {
    if (admissionId !== null) {
      getPatientData(admissionId)
        .then((response) => {
          console.log("Response", response.data.result);
          setSelectedPatient(response.data.result.getPatientDetails);
          setPreviousCharges(response.data.result.list);
          setbedCategoryId(
            response.data.result.getPatientDetails.bedCategoryId
          );
          setTariffId(response.data.result.getPatientDetails.tariffId);
        })
        .catch((response) => {
          console.log("Error");
        });
    }
  };

  useEffect(() => {
    handlePatientInfo();
  }, [admissionId]);

  useEffect(() => {
    if (applicablePackage.length > 0) {
      setStyle("col-span-3");
    } else {
      setStyle("col-span-5");
    }
  });

  //API For Search Service
  const handleChange = (e) => {
    if (e.length > 0) {
      getSearchServiceList(e, bedCategoryId, tariffId)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setServiceList(response.data.result);
          // setActions(response.data.actions);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  function onSubmit(data) {
    // console.log("Data", data);
    let serviceName, serviceCode, doctorName, doctorId, serviceId;
    data.searchServiceList.serviceName !== null
      ? (serviceName = data.searchServiceList.serviceName)
      : (serviceName = null);
    data.searchServiceList.serviceCode !== null
      ? (serviceCode = data.searchServiceList.serviceCode)
      : (serviceCode = null);
    data.searchServiceList.serviceCode !== null
      ? (serviceId = data.searchServiceList.value)
      : (serviceId = null);
    data.doctorName && data.doctorName !== null
      ? (doctorName = data.doctorName.label)
      : (doctorName = null);
    data.doctorName && data.doctorName !== null
      ? (doctorId = data.doctorName.value)
      : (doctorId = null);
    let finalObj = {
      "Service Name": serviceName,
      "Service Code": serviceCode,
      Qty: data.qty,
      "Doctor Name": doctorName,
      doctorId: doctorId,
      serviceId: serviceId,
    };
    addedServices.push(finalObj);
    let savedService = {
      doctorId: doctorId,
      quantity: data.qty,
      services: serviceId,
    };
    savedServices.push(savedService);
    reset();
  }

  const handleAddedService = () => {
    let roleObj = JSON.parse(localStorage.getItem("loggedUser"));

    let finalObj = {
      admissionId: admissionId,
      bedCategory: bedCategoryId,
      servicesRequestDto: savedServices,
      tariff: tariffId,
      unitId: roleObj.units[0].id,
    };

    // console.log("Final Obj", finalObj);

    saveServices(finalObj)
      .then((response) => {
        console.log("Response", response);
        handlePatientInfo();
      })
      .catch((res) => {
        console.log("error");
      });
  };

  return (
    <>
      <div className="pt-20 ml-2">
        <div className="flex">
          <div className="text-center text-gray-500 font-bold text-xl mr-8 my-auto">
            Charges
          </div>
          <div className="flex w-4/12">
            <SearchDropdown
              control={control}
              placeholder="Search By Patient Name /UHID"
              dataArray={patientList}
              name="bedTransferSearch"
              searchIcon={true}
              handleInputChange={handlePatientSearch}
              inputRef={{
                ...register("bedTransferSearch", {
                  onChange: (e) => {
                    console.log("hiii", e.target.value);
                    if (e.target.value !== null) {
                      setAdmissionId(e.target.value.id);
                    } else {
                      setAdmissionId(null);
                    }
                  },
                }),
              }}
            />
            {/* <button className="mx-4 border border-gray-500 h-[2.3rem] rounded-md w-16 cursor-pointer p-1 bg-white">
                  <SearchRoundedIcon />
                </button> */}
          </div>
        </div>

        <div className="w-full grid  mt-2 md:rounded-md">
          <div className="">
            {admissionId !== null ? (
              <fieldset
                className="border border-gray-300 col-span-3 w-full lg:py-0
               text-left lg:px-2 md:p-2 rounded bg-gray-100"
              >
                <div className=" grid  lg:grid-cols-4 2xl:grid-cols-4 gap-y-1 gap-x-2 px-3 ">
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Patient Name</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.patientName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">UHID</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.uhid}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">IPD No</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.ipdNo}
                    </span>
                  </div>
                </div> */}
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">ADM Date</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.admissionDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">ADM No.</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.admissionNumber}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Gender</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.gender}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">D.O.B</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.dob}
                    </span>
                  </div>
                </div> */}
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Age</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.age}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Department</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.department}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Doctor</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.doctor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Ward</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.ward}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Room No.</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.roomNumber}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">Patient Category</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.bedCategory}
                    </span>
                  </div>
                </div> */}
                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">Tariff</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.traiff}
                    </span>
                  </div>
                </div> */}

                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">Unit</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.unit}
                    </span>
                  </div>
                </div> */}

                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Bed Category</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.bedCategory}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                    <span className=" font-semibold w-28">Bed No.</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {selectedPatient && selectedPatient.bedNumber}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                  <span className=" font-semibold w-28">Company</span>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-700 font-normal">
                      {selectedPatient && selectedPatient.company}
                    </span>
                  </div>
                </div> */}
                </div>
              </fieldset>
            ) : (
              ""
            )}
          </div>
          {admissionId !== null ? (
            <div className="border rounded-md w-full mt-2 px-5 bg-white py-4 overflow-visible">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4  w-full pt-3">
                  <div className="text-lg text-black font-Poppins flex justify-center">
                    <label>Add Charges</label>
                  </div>
                  <div className="w-4/12 ">
                    <SearchDropdown
                      name="searchServiceList"
                      control={control}
                      // searchIcon={true}
                      isSearchable={true}
                      placeholder="Search Services *"
                      error={errors.searchServiceList}
                      dataArray={serviceList}
                      handleInputChange={handleChange}
                      inputRef={{
                        ...register("searchServiceList", {
                          onChange: (e) => {
                            if (e.target.value !== null) {
                              console.log(" e.target.value", e.target.value);
                              setIsDoctorShareApplicable(
                                e.target.value.doctorShareApplicable
                              );
                            } else {
                              setIsDoctorShareApplicable(null);
                            }
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="lg:w-28 md:w-40 ">
                    <InputField
                      name="qty"
                      variant="outlined"
                      label="Qty *"
                      error={errors.qty}
                      control={control}
                    />
                  </div>
                  {/* <div className="lg:w-28 md:w-40 ">
                <InputField name="rate" control={control} label="Rate" />
              </div> */}
                  {isDoctorShareApplicable === true ? (
                    <div className="w-3/12">
                      <DropdownField
                        control={control}
                        name="doctor"
                        label="Doctor"
                        dataArray={doctors}
                        isSearchable={false}
                        placeholder="Doctor"
                        isClearable={false}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <AddButton />
                </div>
              </form>
              {addedServices && addedServices.length > 0 ? (
                <div className="">
                  <CommonTable data={addedServices} />
                </div>
              ) : (
                ""
              )}
              <div className="flex justify-end items-center">
                {/* <div className="flex gap-4">
                <div className="flex space-x-3 items-center ">
                  <h1>Total Advance</h1>
                  <label className="border rounded-md px-4 py-1">
                    ₹&nbsp; 67654
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <h1>Total Amount</h1>
                  <label className="border rounded-md px-4 py-1">
                    ₹&nbsp; 67654
                  </label>
                </div>
              </div> */}
                {addedServices && addedServices.length > 0 ? (
                  <div className="flex justify-end items-center space-x-2 my-3">
                    <ResetButton />
                    {/* <CancelButton /> */}
                    {/* <BillButton /> */}
                    {/* <SaveButton  /> */}
                    <button
                      className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                      onClick={() => {
                        handleAddedService();
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          {admissionId !== null ? (
            <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">
              <div className="flex items-center gap-4  w-full pt-3">
                <div className="text-lg text-black font-Poppins flex justify-center">
                  <label>List Of Previous Charges</label>
                </div>
                <div className="w-4/12 ">
                  <SearchDropdown
                    name="searchlistofcharges"
                    control={control}
                    searchIcon={true}
                    isSearchable={true}
                    placeholder="Search Services"
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <input type="checkbox" className="h-4 w-4" />
                  <label>Emergency</label>
                </div>
                <div className="flex space-x-2 items-center">
                  <input type="checkbox" className="h-4 w-4" />
                  <label>Show All Charges</label>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-5 gap-2 items-center">
                  {previousCharges.length > 0 ? (
                    <div className={style}>
                      <CommonTable data={previousCharges} />
                    </div>
                  ) : (
                    ""
                  )}

                  {applicablePackage.length > 0 ? (
                    <div className="col-span-2">
                      {/* <p>List Of Packaged Charges</p> */}
                      <CommonTable data={applicablePackage} actions={actions} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
