import { useState, useEffect } from "react";
import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import BillCancellationTable from "./BillCancellationTable";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    deleteAlert,
    errdeleteAlert,
    errorAlert,successAlert
  } from "../../../Common Components/Toasts/Toasts";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { autoSearchPatientBillCancellations, fetchPatientBillCancelDetails, getCancellationReason } from "../../services/BillingCancellation/BillingCancellation";
import BillCancellationModal from "./BillCancellationModal";
import PatientInfo from "../../Common-Components/PatientInfo";

// let inputSearchid = ''
export default function BillCancellation({drawerOpen}){
    const [ open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    // const [open,setOpen]=useState(false)
    // const handleOpen = () => {setOpen(true)}
    // const handleClose = () => {setOpen(false)}
    const [ inputSearchArr, setInputSearchArr] = useState([])
    const [ searchString, setSearchString] = useState(null)
    const [inputSearchid,setInputSearchid] = useState(null)
    const [comingDataObj,setComingDataObj] = useState({}) 
    const [dataArr,setDataArr] = useState({ result : [] })
    const [dataResult,setDataResult] = useState([])
    const [comingData,setComingData] = useState({}) 
    const [showPage,setShowPage] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [count, setCount] = useState() 
    const [cancelReasonTypes, setCancelReasonTypes] = useState([])
    useEffect(()=>{
        getCancellationReason()
        .then(response=>response.data)
        .then(res=>{
            console.log("cancelReasonTypes",res.result) 
            setCancelReasonTypes(res.result)
        })
      },[])
    useDidMountEffect(()=>{
      console.log('searchString',searchString)
      if(searchString !== null){
        fetchPatientDetails()
      }else{
        // clearPage()
      }
    },[searchString])
  
    const fetchPatientDetails = () =>{
        fetchPatientBillCancelDetails(searchString).then((response) => {
            console.log("Patient details result",response.data);
            let receivedData = response.data
            setDataArr(receivedData)
            setDataResult(receivedData.result)
          });
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
    const [billId, setBillId] = useState() 
    const cancelFunc = (index,row) => {
        console.log("row",row)
        handleOpen()
        setBillId(row.billId)
    }
    const clearPage = () => {
        setDataArr([])
        setComingData({})
        setShowPage(false)
      }
    return(
        <>
        
        <div className=" mt-14 text-center text-gray-700  text-2xl my-2 font-Poppins py-4">Bill Cancellation</div>
        <div className=" bg-white md:mx-4 md:px-4 min-h-screen">
            <Grid container spacing={1}>
                <Grid item lg={4} sm={6} className='z-50'>
                <SearchBar
                    name="inputSearch"
                    placeholder="Search by Patient Name/ UHID/ Mobile No."
                    dataArray={inputSearchArr}
                    isSearchable={true}
                    handleInputChange={(e)=>{
                      console.log("searchinput",e)
                      if(e == null)
                      {
                        // setInputSearchid('')
                        // setSearchString(null)
                      }else{
                        if (e.length > 0) {
                            autoSearchPatientBillCancellations(e).then((response) => {
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
                        setInputSearchid(null)
                        setSearchString(null)
                        setComingDataObj(null)
                        setTimeout(()=>{
                          clearPage()
                        },500)
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
                                if(searchInputValue == null)
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
                  <div className=' w-full h-fit'>
                      {/* <legend className='ml-6 my-2 rounded-xl'>
                          <p className="text-xl font-semibold tracking-wide mx-4">Patient Details 
                          </p>
                      </legend> */}
                          <PatientInfo comingData={comingData}/>
                  </div>
                          
                          
                <Divider sx={{
                    "&::before, &::after": {
                      borderColor: "secondary.light",
                    },
                  }}/>
                {/* Advance Payment History  */}

                { dataArr && dataArr.result && dataArr.result.length > 0 ? (
                <div className='mx-auto  w-full  my-4'>
                    {/* <legend className='ml-6 my-2 rounded-xl'> */}
                        <p className="text-xl font-semibold tracking-wide mx-4">Bill History 
                        </p>
                    {/* </legend> */}
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
                </div>):(<p className='mx-auto text-xl w- full text-center font-semibold tracking-wide my-4'>Data Not Found</p>)}
              </>):''}
              {/* <ConfirmationModal
                  confirmationOpen={open}
                  confirmationHandleClose={handleClose}
                  confirmationSubmitFunc={()=>{
                  handleClose()
                  submitDataApit()
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Save Payment Details?"
                confirmationButtonMsg="Save Payment"
            /> */}
            <BillCancellationModal
                    fetchNewList={fetchPatientDetails}
                    billId={billId}
                    cancelReasonTypes={cancelReasonTypes}
                    open={open}
                    handleClose={handleClose}
            />
        </div>
        </>
    )
}