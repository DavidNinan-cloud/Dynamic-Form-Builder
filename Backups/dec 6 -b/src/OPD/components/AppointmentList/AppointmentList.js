import * as React from "react";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Modal, Button, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
//yup liberary and hook form imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppointmentListTable from "./AppointmentListTable";
import { useNavigate } from "react-router-dom";
import {  Link, } from "react-router-dom";
import ReschedualAppointment from "./ReschedualAppointment";
import {fetchAllAppointments, fetchAppointmentsSearch
} from '../../services/AppointmentPageServices/AppointmentListServices'
import { Grid, FormControl, FormHelperText } from '@mui/material'
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import CancelAppointment from "./CancelAppointment";

import { useLocation } from "react-router-dom";


import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import ReplayIcon from '@mui/icons-material/Replay';
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import BookAppointmentButton from "../../../Common Components/Buttons/BookAppointmentButton";


const defalutValues = {
  id: "",
  deptCode: "",
  deptName: "",
  deptIsClinical: "",
  unitName: "",
  status: "Active",
  activeDept: false,
};

export const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "1px solid gray",
    borderRadius: 1,
    boxShadow: 20,
    p: 4,
  };

  // let inputSearchid  = ''
  let ApListPatientId   = ''
  let ApListVisitId = ''
  let ApListAppointmentId = ''
  let ApListPatientIdSetValue = ''

  let ReschedulefuncDoctorId = ''
  let AppointmentIdReschedual = ''

  let departmentName = ''
  let doctorName = ''

  
  const getDateModal = (dobValue) => {
    let dobGivenYear = dobValue.getFullYear();
    let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
    let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
    const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
    return fullDOB
};

export default function AppointmentList() {
  const [inputSearchid,setInputSearchid] = useState('')
  const [timeSlotsArr,setTimeSlotsArr]=React.useState([]);

  const [dataResult,setDataResult] = useState([])
  //use from
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
  });
  //state varible for  model open and close button
  const [openReschedule, setOpenReschedule] = React.useState(false);
  const handelOpenReschedule = () => {
    setOpenReschedule(true)
  };
  const handleCloseReschedule = () => {
    setTimeSlotsArr([])
    setOpenReschedule(false)
  };

  
  const [openCancel, setOpenCancel] = React.useState(false);
  const handelOpenCancel = () => setOpenCancel(true);
  const handleCloseCancel = () => {
    setOpenCancel(false)
  };
let sendDateDefault = getDateModal(new Date())
const [dateValue1, setDateValue1] = React.useState(new Date());
const [dateValue2, setDateValue2] = React.useState(new Date());


  //start JSX Elements


  const navigate = useNavigate();
  const  openReschedulefunc = (id,row) =>{
    console.log(id)
    console.log("row",row)
    ReschedulefuncDoctorId=row.doctorId
    AppointmentIdReschedual = row["Appointment Id"]
    departmentName =row["Department Name"]
    doctorName = row["Doctor Name"]
    handelOpenReschedule()
    }
  
  const  openCancelfunc = (id,row) =>{
      console.log(id)
      console.log("row",row)
      AppointmentIdReschedual = row["Appointment Id"]
      handelOpenCancel()
      }

    const [openChild, setOpenChild] = React.useState(false);
    const handelOpenChild = () => setOpenChild(true);
    const handleCloseChild = () => {
        if(openChild){
            setOpenChild(false)
        }
    };

    const [spinner, showSpinner] = React.useState(false);
    const [count, setCount] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openVisit, setOpenVisit] = React.useState(false);
    const handelOpenVisit = () => setOpenVisit(true);
    const handleCloseVisit = () => {
        if(openVisit){
            setOpenVisit(false)
        }
    };
  const  openConfirmationfunc = (id,row) =>{
      console.log(id)
      console.log("row",row)
      ApListPatientId=row["patientId"]
      ApListVisitId=row["patientVisitId"]
      ApListAppointmentId=row["Appointment Id"]
      if(ApListPatientId !==null){
        ApListPatientIdSetValue=true
      }else{
        ApListPatientIdSetValue=false
      }
      handelOpenChild()
      }


      const [data, setData] = useState({ result: [], actions: [] });
      const [inputSearchArr, setInputSearchArr] = useState([]);
      const [searchString, setSearchString] = useState("");



    
    
      const defaultParamsStart = {
        page: page,
        size: rowsPerPage,
        searchString: searchString,
        fromDate:sendDateDefault,
        toDate:sendDateDefault
      };
      
      const [senddefaultParams, setSendDefaultParams] = useState(defaultParamsStart);

      useEffect(() => {
        callTableDataApi()
      }, [senddefaultParams,searchString]);

      // def
      const callTableDataApi = () =>{
        
        showSpinner(true);
        let search = senddefaultParams
        search.searchString = inputSearchid
        console.log("inputSearchid",inputSearchid)
        console.log("defaultParams func",search)
        fetchAllAppointments(search)
        .then((response) => response.data)
        .then((res) => {
          console.log("Appointment List",res);
          showSpinner(false);
          setData(res);
          setDataResult(res.result)
          setCount(res.count)
        })
        .catch(() => {
          showSpinner(false);
        });
      }

      const routeBilling = (id,row) => {
        let RowDetails = {}
        RowDetails.unitId = row["unitId"] 
        RowDetails.UHID=row["UHID"]
        RowDetails.Age=row["patientAge"]
        RowDetails.PatientName=row["Patient Name"]
        RowDetails.PatientId=row["patientId"]
        RowDetails.MoblieNo=row["Mobile Number"]
        RowDetails.Department=row["Department Name"]
        RowDetails.Doctor=row["Doctor Name"]
        RowDetails.Category=row["patientCategory"]
        RowDetails.comingFrom = 'appointment list';
        if(row["company"]){
          RowDetails.Company=row["company"]
          RowDetails.CompanyId=row["companyId"]
        }else{
          RowDetails.Company=null
        }
        if(row["cashBalance"]){
          RowDetails.cashBalance=row["cashBalance"]
        }else{
          RowDetails.cashBalance=null
        }
        RowDetails.visitId=row["patientVisitId"]
        console.log("row object",RowDetails)
        navigate(`/billing/opd`,{state:RowDetails});
      }

      const validateDate = (value) => {
        let dobGivenYear = value.getFullYear();
        let dobGivenMonth = String(value.getMonth() + 1).padStart(2, "0");
        let dobGivenDay = String(value.getDate()).padStart(2, "0");
        let fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
        let isValidDate = dateIsValid(fullDOB)
        return isValidDate
      }
      function dateIsValid(dateStr) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
      
        if (dateStr.match(regex) === null) {
          return false;
        }
      
        const date = new Date(dateStr);
      
        const timestamp = date.getTime();
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          return false;
        }
      
        return date.toISOString().startsWith(dateStr);
      }
  return (
    
    <div className="px-8 w-full min-h-screen mt-20 ">
      <p className="w-full text-center text-gray-700  text-2xl my-2 font-Poppins ">
          Appointments
      </p>
      <div className="bg-white px-8 py-4">
      
      {/* <div className="text-center text-gray-500 my-4 font-bold text-xl">Appointments</div> */}
      
          <Grid container spacing={1} className="py-2  my-1 px-1 rounded-md flex flex-wrap justify-start" >
              {/* <Grid item lg={1.2} sm={3} sx={{marginY:"0.5rem" , marginRight:'1rem'}} className="text-gray-500 my-4 font-bold text-left text-base ">
                Appointments
              </Grid> */}
            {/* <Grid item lg={4} md={12} sm={8}> */}
              <Grid item xl={4} lg={4} md={8} sm={8} sx={{marginBottom:{sm:"0.5rem"}}}>
                <SearchBar
                  // control={control}
                  // error={errors.inputSearch}
                  // type="button"
                  // name="inputSearch"
                  placeholder="Search by Patient Name/ UHID/ Mobile No."
                  dataArray={inputSearchArr}
                  // className="w-96"
                  isSearchable={true}
                  //change option as per user input
                  handleInputChange={(e)=>{
                    console.log(e)
                    if(e == null)
                    {
                      setInputSearchid('')
                      setSearchString("")
                  }else{
                      if (e.length > 0) {
                        setInputSearchid(e)
                        fetchAppointmentsSearch(e).then((response) => {
                          console.log(response);
                          setInputSearchArr(response.data.result);
                        });
                      }
                    }
                    
                  }}
                  //after search user get specific value
                  onChange={(e)=>{
                    if(e == null){
                      setInputSearchid('')
                      setSearchString("")
                      let defaultParams = senddefaultParams
                      defaultParams.page = 0
                      defaultParams.searchString = ''
                      setSendDefaultParams(defaultParams)
                      setPage(0)
                    }
                    else{
                      setInputSearchid(e.mobileNumber)
                    }
                  }}
                  />
              </Grid>
              <Grid item xl={3} lg={4} md={6} sm={8} className="flex space-x-2 mt-1">
                <FormControl
                  sx={{
                    backgroundColor:'white'
                  }}
                  fullWidth
                  size="small"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disablePast
                      maxDate={dateValue2}
                      // maxDate={dateValue2 == new Date() ? dateValue2:undefined}
                      label="From Date"
                      value={dateValue1}
                      inputProps={{ readOnly: true }}
                      onChange={(value) => {
                        let isValidDate = validateDate(value)
                        if(isValidDate){
                          setDateValue1(value)
                        if(dateValue2<value){
                          setDateValue2(value)
                        }}
                      }}
                      renderInput={(props) => (
                        <TextField {...props} size="small"  sx={{
                          svg: { color: "#0B83A5" },
                        }}/>
                      )}
                      name="fromData"
                      defaultValue=""
                      inputFormat="dd/MM/yyyy"
                    />
                  </LocalizationProvider>

                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.dob?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  sx={{
                    backgroundColor:'white'
                  }}
                  fullWidth
                  size="small"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      minDate={dateValue1}
                      label="To Date"
                      value={dateValue2}
                      inputProps={{ readOnly: true }}
                      onChange={(value) => {
                        let isValidDate = validateDate(value)
                        if(isValidDate){
                        console.log("toDate",value)
                        setDateValue2(value);
                        }
                      }}
                      renderInput={(props) => (
                        <TextField {...props} size="small" sx={{
                          svg: { color: "#0B83A5" },
                        }}  />
                      )}
                      name="toDate"
                      defaultValue=""
                      inputFormat="dd/MM/yyyy"
                    />
                  </LocalizationProvider>

                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.dob?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>


              <Grid item xl={3} lg={1.6} md={3} sm={6} className="flex space-x-2 shrink" >
                <div>
                  {/* outlined search icon */}
                  <Button
                    className=" h-10 w-10   rounded-md text-gray-500"
                    type="button"
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: "grey.500", color: "gray" }}
                    onClick={()=>{
                              console.log("inputSearchid",inputSearchid)
                              let fromDate = getDateModal(dateValue1)
                              let toDate = getDateModal(dateValue2)
                              console.log("fromDate",fromDate)
                              console.log("toDate",toDate)
                              
                              let searchInputValue = inputSearchid
                              if(searchInputValue==undefined)
                              {
                                searchInputValue = ""
                              }else{
                                setSearchString(searchInputValue)
                              }
                              let defaultParams = {
                                page: 0,
                                size: rowsPerPage,
                                searchString: searchInputValue,
                                fromDate:fromDate,
                                toDate:toDate
                              };
                              setPage(0)
                              setSendDefaultParams(defaultParams)
                    }}
                  >
                    <SearchIcon className="cursor-pointer" />
                  </Button>
                </div>
                <div>
                  {/* outlined Refresh icon */}
                  <Button
                    className=" h-10 w-10   rounded-md text-gray-500"
                    type="button"
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: "grey.500", color: "gray" }}
                    onClick={()=>{
                              console.log("refresh")
                              let defaultParams = senddefaultParams
                              defaultParams.page = 0
                              setPage(0)
                              setSendDefaultParams(defaultParams)
                              callTableDataApi()
                    }}
                  >
                    <ReplayIcon className="cursor-pointer" />
                  </Button>
                </div>
              </Grid>
            {/* </div> */}
              <Grid item xl={2} lg={1.5} md={3} sm={4} className="py-4 justify-end translate-x-12">
              <Link to='/appointment/bookappointment' >
              {/* <BookAppointmentButton /> */}
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="justify-self-end"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "35px",
                  minWidth: "150px",
                  minHeight: "35px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "rgb(11 131 165 / var(--tw-bg-opacity))"
                }}
              >
                Book Appointment
              </Button>
              </Link>
              </Grid>
          </Grid>
          {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : <>
            {data.result.length > 0 ? (
      <AppointmentListTable
        tableApiFunc = {fetchAllAppointments}
        searchString={searchString}
        dataResult={dataResult}
        setDataResult={setDataResult}
        dateValue1={dateValue1}
        dateValue2={dateValue2}
        data={data}
        setData={setData}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        senddefaultParams={senddefaultParams}
        setSendDefaultParams={setSendDefaultParams}
        count={count}
        // reschedual
        modalVisit = {handelOpenVisit}
        routeBilling = {routeBilling}
        openConfirmfunc={openConfirmationfunc}
        openReschedulefunc={openReschedulefunc}
        openCancelfunc={openCancelfunc}
      />
      ):
      (
        
                  <div className="text-gray-500 font-bold text-center ">
                    <h1 className="text-center">No Records Found</h1>
                  </div>
      )}
        </>}
      
      </div>
        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={()=>{
            navigate(`/opd/quickregistration`,{state:{
              PatientId:ApListPatientId,
              VisitId:ApListVisitId,
              AppointmentId:ApListAppointmentId,
              PatientIdSetValue:ApListPatientIdSetValue,
          }});
          }}
          confirmationLabel="Confirmation "
          confirmationMsg="Click on Proceed to Mark the Visit ?"
          confirmationButtonMsg="Proceed"
        />
        
        <ReschedualAppointment
          openReschedule={openReschedule}
          setOpenReschedule={setOpenReschedule}
          handelOpenReschedule={handelOpenReschedule}
          handleCloseReschedule={handleCloseReschedule}
          timeSlotsArr={timeSlotsArr}
          setTimeSlotsArr={setTimeSlotsArr}
          departmentName = {departmentName}
          doctorName = {doctorName}
          doctorId={ReschedulefuncDoctorId}
          AppointmentId={AppointmentIdReschedual}
          callTableDataApi={callTableDataApi}
      />

      <CancelAppointment
          openCancel={openCancel}
          setOpenCancel={setOpenCancel}
          handelOpenCancel={handelOpenCancel}
          handleCloseCancel={handleCloseCancel}
          AppointmentId={AppointmentIdReschedual}
          callTableDataApi={callTableDataApi}
      />
    </div>
  );
  // end JSX
}
// end Organization function