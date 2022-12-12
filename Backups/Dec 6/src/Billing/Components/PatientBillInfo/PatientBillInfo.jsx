import { useState, useEffect } from "react";
import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    deleteAlert,
    errdeleteAlert,
    errorAlert,successAlert
  } from "../../../Common Components/Toasts/Toasts";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { advanceInfo, autoSearchPatientInfo,  billInfo,  paymentInfo, refundInfo, serviceInfo } from "../../services/PatientInfoServices/PatientInfoServices";
import PatientInfo from "../../Common-Components/PatientInfo";
import CommonTable from "./CommonTable";
import InfoCard from "./InfoCard";

export default function PatientBillInfo({}){

    const [ inputSearchArr, setInputSearchArr] = useState([])
    const [ searchString, setSearchString] = useState('')
    const [inputSearchid,setInputSearchid] = useState(null)
    const [comingDataObj,setComingDataObj] = useState({}) 


    // const [dataArr,setDataArr] = useState({ result : [] })
    // const [dataResult,setDataResult] = useState([])

    
    const [advance,setadvance] = useState([])
    const [serviceDetails,setserviceDetails] = useState([])
    const [bills,setbills] = useState([])
    const [refundDetails,setrefundDetails] = useState([])
    const [paymentHistory,setpaymentHistory] = useState([])
    const [pharmacy,setPharmacy] = useState([])
    


    const [comingData,setComingData] = useState({}) 
    const [showPage,setShowPage] = useState(false)

    
    useDidMountEffect(()=>{
      if(searchString !== null){
        fetchPatientDetails()
      }
    },[searchString])
  
    const fetchPatientDetails = () =>{
        showPatientDetails()
        callApis(advanceInfo,setadvance)
        callApis(serviceInfo,setserviceDetails)
        callApis(billInfo,setbills)
        callApis(refundInfo,setrefundDetails)
        callApis(paymentInfo,setpaymentHistory)
    }
    const showPatientDetails = () => {
        let obj = {
            patientId : comingDataObj.patientId,
            PatientName : comingDataObj.patientName,
            MoblieNo : comingDataObj.mobileNumber,
            Age : comingDataObj.age,
            UHID : comingDataObj.uhid,
            }
        if(!showPage){
            setShowPage(true)
            }
        setComingData(obj)
    }
    
    const callApis = (apiFunc,setStatefunc) => {
        apiFunc(searchString).then((response) => {
            console.log("Patient details result",response.data);
            let receivedData = response.data
            // setDataArr(receivedData)
            setStatefunc(receivedData)
          });
    }
    const clearPage = () => {
        // setDataArr([])
        setComingData(null)
        setShowPage(false)
      }


    const DisplayTable = ({tableData,title,headColor}) => {
        return(
            <>
            {/* {
                tableData && tableData.result && tableData.result.length > 0 ?
                (    */}
                    <Grid item  md={6} sm={12} className="">
                            <InfoCard tableData={tableData} title={title} headColor={headColor}/>
                    </Grid>
                    {/* )
                    :''
            } */}
            </>
        )
    }
    return(
        <div className='bg-slate-100 w-full overflow-hidden'> 
            <div className="flex justify-center space-x-6 w-full mt-14">
                    <p className="text-center text-2xl my-2 text-gray-700 py-4  font-Poppins">
                        Patient Bill Info
                    </p>
            </div>
            <div className="bg-white w-full min-h-screen mx-4 px-6 border py-4">
            <Grid container spacing={1}>
                <Grid item lg={4} sm={6} className='z-50'>
                <SearchBar
                    // control={control}
                    // error={errors.inputSearch}
                    // type="button"
                    name="inputSearch"
                    placeholder="Search by Patient Name/ UHID/ Mobile No."
                    dataArray={inputSearchArr}
                    isSearchable={true}
                    handleInputChange={(e)=>{
                      console.log("searchinput",e)
                      if(e == null)
                      {
                        console.log('clear 1')
                      }else{
                        if (e.length > 0) {
                            autoSearchPatientInfo(e).then((response) => {
                            console.log("response result",response.data.result);
                            setInputSearchArr(response.data.result);
                              });
                            }
                          }
                      }}
                    //after search user get specific value
                    onChange={(e)=>{
                      console.log("searchinput selected",e)
                      if(e == null){
                        console.log('clear 2')
                        // resetForm()
                        clearPage()
                        setSearchString(null)
                      }
                      else{
                        // resetForm()
                        clearPage()
                        setSearchString(null)
                        setComingDataObj(e)
                        setInputSearchid(e.patientId)
                      }
                    }}
                    />
                </Grid>
                <Grid item lg={3} sm={3} className="flex space-x-2 shrink" >
                    <Button
                      className=" h-10 w-10 rounded-md text-gray-500"
                      type="button"
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: "grey.500", color: "gray" }}
                      onClick={()=>{
                                let searchInputValue = inputSearchid
                                if(searchInputValue==undefined)
                                {
                                  searchInputValue = ""
                                }else{
                                  console.log("searchInputValue",searchInputValue)
                                  setSearchString(searchInputValue)
                                }
                      }}
                    >
                      <SearchIcon className="cursor-pointer" />
                    </Button>
                </Grid>
            </Grid>
            {showPage ? (
                <>
                  {/* Paitent Inf0 */}
                 <PatientInfo comingData={comingData}/>
                {/* tables  */}

                
                <Grid container spacing={1} className='py-4 mx-2 mb-2 mt-6  px-4'>
                        {/* Advance */}
                        < DisplayTable tableData={advance} title='Advance' headColor='#CAE2F9'/>
                        {/* serviceDetails */}
                        < DisplayTable tableData={serviceDetails} title='Service Details' headColor='#C3F5FA'/>
                        {/* bills */}
                        < DisplayTable tableData={bills} title='Bills' headColor='#F5D6C5'/>
                        {/* refundDetails */}
                        < DisplayTable tableData={refundDetails} title='Refund Details' headColor='#DEFFC4'/>
                        {/* pharmacy */}
                        < DisplayTable tableData={pharmacy} title='Pharmacy' headColor='#A5D9F2'/>
                        {/* paymentHistory */}
                        < DisplayTable tableData={paymentHistory} title='Payment History' headColor='#FFF3D5'/>
                </Grid>

                {/* { dataArr && dataArr.result && dataArr.result.length > 0 ? (
                <div className='mx-auto border w-full rounded-xl my-4'>
                    <legend className='ml-6 my-2 rounded-xl'>
                        <p className="text-xl font-semibold tracking-wide mx-4">Bill History 
                        </p>
                    </legend>
                    <div className="px-5">
                        <BillCancellationTable 
                            drawerOpen={drawerOpen}
                            cancelFunc={cancelFunc}
                            patientId={searchString}
                            tableApiFunc={fetchPatientBillCancelDetails}
                            dataResult={dataResult}
                            setDataResult={setDataResult}
                            data={dataArr}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            count={count}
                        />
                    </div>
                </div>):""} */}
              </>):''}
            </div>
        </div>
    )
}