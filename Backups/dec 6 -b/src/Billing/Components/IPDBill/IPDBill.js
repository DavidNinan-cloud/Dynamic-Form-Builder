import * as React from "react";
import { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button, TextField } from "@mui/material";
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
    apiBillServiceList,
  getPatientData,
  getSearchPatient,
  searchPatient
} from "../../services/IpdBillServices/IpdBillServices";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import IpdChargesTable from "./Tables/IpdChargesTable";
import RadioField from "../../../Common Components/FormFields/RadioField";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";


export default function IPDBill() {

  const billOptions = [
    {id:"All",  value:"All",  label:"Show All"},
    {id:"Patient",  value:"Patient",  label:"Patient Charges"},
    {id:"Company",  value:"Company",  label:"Company Charges"},
    {id:"Package",  value:"Package",  label:"Package Charges"},
  ]
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
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
        billType:"All",
        adminChargesApplicable : 0,
        adminCharge : 0,
        totalAdvance : 0,
        discAmt: 0,
        gstAmt: 0,
        netAmt: 0
    },
  });
  const billType = watch('billType')
    const adminChargesApplicable = watch('adminChargesApplicable')
    const adminCharge = watch('adminCharge')
    const totalAdvance = watch('totalAdvance')
    const discAmt = watch('discAmt')
    const gstAmt = watch('gstAmt')
    const netAmt = watch('netAmt')
  const [patientList, setPatientList] = React.useState([]);
  const [admissionId, setAdmissionId] = React.useState(null);
  const [selectedPatient, setSelectedPatient] = React.useState();

//   below not yet needed
  const [actions, setActions] = React.useState([]);
  const [billserviceList, setbillServiceList] = React.useState([]);
  const [bedCategoryId, setbedCategoryId] = React.useState(null);
  const [tariffId, setTariffId] = React.useState(null);
  const [previousCharges, setPreviousCharges] = React.useState([]);
  const [billInfoDetails, setBillInfoDetails] = React.useState(null);
  
  const location = useLocation();
  let admissionIdValue;

  let navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state !== null) {
      setAdmissionId(location.state.admissionId);
      setbedCategoryId(location.state.bedCategory);
      setTariffId(location.state.tariff);
      
    }
  }, [admissionIdValue]);

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
            let comingDataObj = response.data.result.getPatientDetails
            let obj = {
                patientId : comingDataObj.patientId,
                PatientName : comingDataObj.patientName,
                MoblieNo : comingDataObj.mobileNumber,
                Age : comingDataObj.age,
                UHID : comingDataObj.uhid,
                }
          setBillInfoDetails(obj)
          setPreviousCharges(response.data.result.list);
          setbedCategoryId(
            response.data.result.getPatientDetails.bedCategoryId
          );
          setTariffId(response.data.result.getPatientDetails.tariffId);
        })
        .catch((response) => {
          console.log("Error");
        });


        // call bill services
        fnCallBillServices()
    }
  };

  useDidMountEffect(()=>{
    if(admissionId !== null){
        fnCallBillServices()
    }
  },[billType])


  const fnCallBillServices = () => {
    
    apiBillServiceList(admissionId,billType)
    .then((response) => {
      console.log("Response services list", response.data.result);
      setbillServiceList(response.data.result);
    })
    .catch((response) => {
      console.log("Error");
    });
  }

  useEffect(()=>{
    if(billserviceList.length > 0){
        let e=""
        filterData(e)
    }
  },[billserviceList])

  const[tableFilter,setTableFilter]=React.useState([])
  
  const filterData=(e)=>{
  if(e !== ""){
    console.log('filter data e',e)
        let nonFilteredObjs = []
      const filterTable = billserviceList.filter( result =>  {
            if(result['Service Description'].toLowerCase().includes(e.toLowerCase())){
                return result
            }else {
                console.log('nonFilteredObjs',result)
                nonFilteredObjs.push(result)
            }
            
        }
            //   ||
            //   result.subGroupDiscription.toLowerCase().includes(e.toLowerCase())||
            //   result.subGroupName.toLowerCase().includes(e.toLowerCase())
        )
          setTableFilter([...filterTable,...nonFilteredObjs])
  }else{
    console.log('filter data billserviceList',billserviceList)
    setTableFilter([...billserviceList])
  }
  }
  useEffect(() => {
    handlePatientInfo();
  }, [admissionId]);

  const onSubmit = (data) => {

  }

    // navigate ipd charges
    const fnNavigateCharges = () => {
        let billParams = {
            admissionId: admissionId,
            bedCategory: bedCategoryId,
            tariff: tariffId,
            };
            navigate("/ipd/charges", { state: billParams });
    }   
    // navigate ipd charges
    const fnNavigatePatientBillInfo = () => {
        let billParams = {
            billInfoDetails: billInfoDetails,
            patientId: billInfoDetails.patientId,
            };
            navigate("/billing/patientbillinfo", { state: billParams });
    }   
    const frontEndSearch = (e) =>{
        filterData(e)
    }

  return (
    <div className='mt-14 min-h-screen'>
        <div className='text-center w-full justify-center'>
            <p className="text-center text-2xl my-2 text-gray-700  font-Poppins">
                IPD Billing
            </p>
        </div>
        <div className="px-3">
            <div className='flex mt-4 w-full space-x-4 justify-between'>
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
                            setAdmissionId(e.target.value.value);
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
                {admissionId !== null && (
                    <div className='flex space-x-4'>
                        <div className="justify-self-end">
                                <Button variant='contained' onClick={()=>{
                                    fnNavigateCharges()                                }}>
                                    Charges
                                </Button>
                        </div>
                        <div className="justify-self-end">
                                <Button variant='contained' onClick={()=>{fnNavigatePatientBillInfo()}}>
                                    Patient Bill Info
                                </Button>
                        </div>
                    </div>
                )
                }
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
                    <div className="border rounded-md w-full mt-2 px-5 bg-white py-3 overflow-visible">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex gap-4  w-full pt-3">
                                <div className="w-4/12 ">

                      <InputField
                          name="searchService"
                          label="Search Service"
                          error={errors.searchService}
                          control={control}
                          inputRef={{
                            ...register(`searchService`, {
                                onChange: (e) => {                                         
                                    let search = e.target.value
                                    frontEndSearch(search)
                                },
                            })
                        }}
                      />
                                    {/* <SearchDropdown
                                    name="searchServiceList"
                                    control={control}
                                    searchIcon={true}
                                    isSearchable={true}
                                    placeholder="Search Services *"
                                    error={errors.searchServiceList}
                                    handleInputChange={frontEndSearch}
                                    inputRef={{
                                        ...register("searchServiceList", {
                                        onChange: (e) => {
                                            if (e.target.value !== null) {

                                            }
                                        },
                                        }),
                                    }}
                                    /> */}
                                </div>
                                <div>
                                <RadioField
                                    name="billType"
                                    control={control}
                                    dataArray={billOptions}
                                />
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
                                {
                    admissionId !==null && (
                        <div className="border rounded-md w-full mt-2 px-5 bg-white py-3 overflow-visible">
                                {tableFilter.length > 0 ? (
                                    <div className="col-span-2">
                                    {/* <p>List Of Packaged Charges</p> */}
                                    <IpdChargesTable data={tableFilter} actions={actions} />
                                    </div>
                                ) : (
                                   <p className="w-full text-base text-center"> Data Not Found </p>
                                )}
                        </div>
                    )
                }
                {admissionId !== null ? (
                    <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">

                    </div>
                ) : (
                    ""
                )}

                {admissionId !== null ? (
                    <div className="border rounded-md w-full overflow-hidden mt-2 px-5 bg-white">

                        <div className="grid grid-cols-2 py-3 gap-3">
                            <div>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    label="Remarks From Addmission"
                                    fullWidth
                                    size="small"
                                    multiline
                                    rows={4}
                                    name="addmisionRemarks"
                                />
                            </div>
                            <div>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    label="Remarks From PRO"
                                    fullWidth
                                    size="small"
                                    multiline
                                    rows={4}
                                    name="proRemarks"
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className="flex space-x-3 w-fit">
                                <div className="flex items-center gap-2 w-fit col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                                    <span className=" font-semibold w-56">Admin Charge Applicable Amt. </span>
                                    <div className="flex space-x-2 items-center">
                                        <span>:</span>
                                        <span className="text-gray-700 font-normal">
                                            {adminChargesApplicable && adminChargesApplicable}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-fit col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                                    <span className=" font-semibold w-52">Admin Charge Amt. </span>
                                    <div className="flex space-x-2 items-center">
                                        <span>:</span>
                                        <span className="text-gray-700 font-normal">
                                            {adminCharge && adminCharge}
                                        </span>
                                    </div>
                                </div>
                            </div>   
                            <div>
                                <Button variant="contained">
                                    Generate Draft Bill    
                                </Button>    
                            </div> 
                        </div>
                    </div>
                ) : (
                    ""
                )}
                </div>
        </div>
    </div>
  )
}
