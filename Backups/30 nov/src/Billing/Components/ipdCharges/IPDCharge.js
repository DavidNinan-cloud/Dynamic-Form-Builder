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
  getPatientData,
  getSearchServiceList,
} from "../../services/ipdCharges/IPDChargesServices";
import DropdownField from "../../../Common Components/FormFields/DropdownField";

export default function IPDCharge() {
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
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      searchServiceList: null,
      qty: "",
    },
  });
  const [options, setOptions] = React.useState([]);
  const [admissionId, setAdmissionId] = React.useState(null);
  const [selectedPatient, setSelectedPatient] = React.useState();
  const [addedServices, setAddedSevices] = React.useState([]);
  const [previousCharges, setPreviousCharges] = React.useState([]);
  const [applicablePackage, setApplicablePackage] = React.useState([]);
  const [style, setStyle] = React.useState("col-span-5");
  const [isDoctorShareApplicable, setIsDoctorShareApplicable] = React.useState(
    null
  );

  // const location = useLocation();
  // let admissionIdValue;

  // useEffect(() => {
  //   if (location.state && location.state !== null) {
  //     setAdmissionId(location.state.admissionId);
  //   }
  // }, [admissionIdValue]);

  //API For Get Patient Info and Previous Services
  useEffect(() => {
    if (admissionId !== null) {
      getPatientData(admissionId)
        .then((response) => {
          console.log("Response", response.data.result);
          setSelectedPatient(response.data.result.getPatientDetails);
          setPreviousCharges(response.data.result.list);
        })
        .catch((response) => {
          console.log("Error");
        });
    }
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
      getSearchServiceList(e)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setServiceList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  function onSubmit(data) {
    console.log("Data", data);
    let serviceName, serviceCode, doctorName;
    data.searchServiceList.serviceName !== null
      ? (serviceName = data.searchServiceList.serviceName)
      : (serviceName = null);
    data.searchServiceList.serviceCode !== null
      ? (serviceCode = data.searchServiceList.serviceCode)
      : (serviceCode = null);
    data.doctorName && data.doctorName !== null
      ? (doctorName = data.doctorName.label)
      : (doctorName = "-");
    let finalObj = {
      "Service Name": serviceName,
      "Service Code": serviceCode,
      Qty: data.qty,
      "Doctor Name": doctorName,
    };
    addedServices.push(finalObj);
    reset();
  }

  const getPatientInfo = (selectedPatientObj) => {
    console.log("call fun from selected patient", selectedPatientObj);
    // getIPDPatientInformationById(selectedPatientObj.id)
    //   .then((response) => response.data)
    //   .then((res) => {
    //     console.log("get all patient info", res);
    //     setSelectedPatient(res.result);
    //   });
  };
  return (
    <>
      <div className="pt-20 ml-2">
        <div className="text-center text-gray-500 font-bold text-xl ">
          IPD Charges
        </div>

        <div className="w-full grid  mt-2 md:rounded-md">
          <div className="">
            {/* //Patient Search// */}
            <div className="grid lg:w-3/6 py-2">
              <div className="flex">
                <SearchDropdown
                  control={control}
                  placeholder="Search By Patient Name /UHID"
                  dataArray={options}
                  name="bedTransferSearch"
                  searchIcon={true}
                  handleInputChange={handleChange}
                  inputRef={{
                    ...register("bedTransferSearch", {
                      onChange: (e) => {
                        console.log("hiii", e.target.value);
                        if (e.target.value !== null) {
                          setSelectedPatient(e.target.value);
                          getPatientInfo(e.target.value);
                        } else {
                          setSelectedPatient("");
                        }
                      },
                    }),
                  }}
                />
                <button className="mx-4 border border-gray-500 h-[2.3rem] rounded-md w-16 cursor-pointer p-1 bg-white">
                  <SearchRoundedIcon />
                </button>
              </div>
            </div>
            {/* //Patient Info// */}
            {admissionId !== null ? (
              <fieldset
                className="border border-gray-300 col-span-3 w-full lg:py-0
               text-left lg:px-2 md:p-2 rounded bg-gray-100"
              >
                <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1 lg:px-2 md:px-2">
                  Patient Information
                </legend>

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
            <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4  w-full pt-3">
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
                              setIsDoctorShareApplicable(
                                e.target.value.doctorShareApplicable
                              );
                              //   setSelectedPatient(e.target.value);
                              //   getPatientInfo(e.target.value);
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
                    <div className="w-4/12">
                      <DropdownField
                        control={control}
                        name="doctor"
                        label="Doctor"
                        // dataArray={doctors}
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
              {addedServices.length > 0 ? (
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
                <div className="flex justify-end items-center space-x-2 my-3">
                  <ResetButton />
                  {/* <CancelButton /> */}
                  {/* <BillButton /> */}
                  <SaveButton />
                </div>
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
                      <CommonTable data={applicablePackage} />
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
