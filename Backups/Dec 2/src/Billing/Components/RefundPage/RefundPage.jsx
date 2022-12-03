import { useState, useEffect } from "react";
import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import RadioField from "../../../Common Components/FormFields/RadioField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    deleteAlert,
    errdeleteAlert,
    errorAlert,successAlert
  } from "../../../Common Components/Toasts/Toasts";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { autoSearchPatientRefund, fetchBillServiceDetails, fetchPatientBillRefundDetails, saveRefundDetails } from "../../services/RefundServices/RefundServices";
import RefundBillListTable from './RefundBillListTable'
import ServiceListTable from './ServiceListTable'
import InputField from "../../../Common Components/FormFields/InputField";
import RefundMode from "./RefundMode";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RefundAdvance from "./RefundAdvance";
import RefundBill from "./RefundBill";


export default function RefundPage({drawerOpen}){
    const refundTypes = [
        { id: 0 , value: 0, label: 'Bill'},
        { id: 1 , value: 1, label: 'Advance'}
    ]



    const methods = useForm({
        mode: "onChange",
        defaultValues:{
            refundAgainst:0,
        } 
    });
    const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods; 

    // const [open,setOpen]=useState(false)
    // const handleOpen = () => {setOpen(true)}
    // const handleClose = () => {setOpen(false)}
    const [ inputSearchArr, setInputSearchArr] = useState([])
    const [ searchString, setSearchString] = useState('')
    const [inputSearchid,setInputSearchid] = useState(null)
    const [comingDataObj,setComingDataObj] = useState({}) 
    const [dataArr,setDataArr] = useState({ result : [] })
    const [dataResult,setDataResult] = useState([])
    const [comingData,setComingData] = useState({}) 
    const [showPage,setShowPage] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [count, setCount] = useState() 
    const [billId, setBillId] = useState() 
    
    const [showAdvanceRefund,setShowAdvanceRefund] = useState(false)
    const refundAgainst = watch('refundAgainst')

    useEffect(()=>{
        if(refundAgainst == 0){
            setShowAdvanceRefund(false)
        }else{
            if(!showAdvanceRefund){
                setShowAdvanceRefund(true)
            }
        }
    },[refundAgainst])
    useDidMountEffect(()=>{
        if(searchString !== null){
            fetchPatientDetails()
        }
    },[searchString])
  
    const fetchPatientDetails = () =>{
        fetchPatientBillRefundDetails(searchString).then((response) => {
            console.log("Patient details result",response.data);
            let receivedData = response.data
            setDataArr(receivedData)
            setDataResult(receivedData.result)
            setCount(receivedData.result.length)
        });

        
        let obj = {
            patientId : comingDataObj.patientId,
            PatientName : comingDataObj.patientName,
            MoblieNo : comingDataObj.mobileNumber,
            Age : comingDataObj.age,
            UHID : comingDataObj.uhid,
            cashBalance : comingDataObj.cashBalance
            }
            // if(!showPage){
                setShowPage(true)
            // }

        setComingData(obj)
    }

    
    const clearPage = () => {
        setDataArr([])
        setComingData({})
        setShowPage(false)
      }
    const afterSubmit = () =>{
        clearPage()
        setTimeout(()=>{
            fetchPatientDetails()
        },1000)
    }
    return(
        <>
        
        <div className="mt-14 text-center text-gray-700 text-2xl my-2 font-Poppins py-4">Bill Refund</div>
        <div className="bg-white md:mx-4 md:px-4 min-h-screen">
            <Grid container spacing={1}>
                <Grid item lg={4} sm={4} className='z-50'>
                <SearchBar
                    // control={control}
                    // error={errors.inputSearch}
                    // type="button"
                    searchIcon={true}
                    clearSearchBar={true}
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
                            autoSearchPatientRefund(e).then((response) => {
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
                        // resetForm()
                        clearPage()
                        searchInputValue = ''
                        setSearchString(null)
                      }
                      else{
                        // resetForm()
                        if(e.patientId !== searchString){
                            clearPage()
                            setTimeout(()=>{
                                setSearchString(null)
                                setComingDataObj(e)
                                setInputSearchid(e.patientId)
                                setSearchString(e.patientId)
                            },100)

                        }
                      }
                    }}
                    />
                </Grid>
                <Grid item lg={1.5} sm={1} className="flex space-x-2 shrink h-10" >
                    {/* <Button
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
                    </Button> */}

                    
                </Grid>
                <Grid item lg={drawerOpen ? 2.2 : 2} md={2.1} sm={3}>
                    
                        <p className="text-sm font-semibold tracking-wide ml-8 pl-8 mt-3">Refund Against :
                        </p>
                </Grid>
                <Grid item md={drawerOpen ? 4:3} sm={4} sx={{marginTop:1}}>
                    <RadioField
                        // label="Refund Against "
                        name="refundAgainst"
                        control={control}
                        dataArray={refundTypes}
                    />
                 </Grid>
            </Grid>
            {showPage ? (

                <>
                    {/* Paitent Inf0 */}
                    <div className='mx-auto border w-full my-4 bg-gray-100'>
                                {/* <legend className='ml-6 my-2 rounded-xl'>
                                    <p className="text-xl font-semibold tracking-wide mx-4">Patient Details 
                                    </p>
                                </legend> */}
                                    {
                                        comingData? (
                                        <Grid container spacing={1} justifyContent="start" className='py-4 mx-5 mb-2 mt-6  px-5'>
                                            {/* Patient Name */}
                                            <Grid item  md={1.7} sm={2.5} className="pt-6 text-left" sx={{text:'right',overflowWrap:'break-word'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Patient Name
                                                </span>
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={2.3} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                <span className=''>{`  ${comingData.PatientName}`} </span> 
                                            </Grid>
                                            {/* UHID */}
                                            <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    UHID   
                                                </span> 
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={2} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                <span className=''>{`  ${comingData.UHID}`} </span>
                                            </Grid>
                                            {/* Mobile No */}
                                            <Grid item  md={1.3} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Mobile No.   
                                                </span>  
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={1.5} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                <span className=''>{`  ${comingData.MoblieNo}`} </span>
                                            </Grid>
                                            {/* Age */}
                                            <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Age   
                                                </span> 
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={1} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                 <span className=''>{`  ${comingData.Age}`} </span>
                                            </Grid>
                                            {/* cashBalance */}
                                            {
                        showAdvanceRefund ? (<>
                                            <Grid item  md={1.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                  Cash Balance   
                                                </span> 
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={2.3} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                 <span className=''>{comingData.cashBalance ?     comingData.cashBalance : '0'} </span>
                                            </Grid>
                                            </>
                        ):''}
                                        </Grid>
                                        ):(<p className='mx-auto'>"Data Not Found"</p>)
                                    }
                            </div>
                                    
                                    
                          <Divider sx={{
                              "&::before, &::after": {
                                borderColor: "secondary.light",
                              },
                            }}/>
                    {
                        showAdvanceRefund ? (
                            <>
                                <RefundAdvance 
                                    afterSubmit={afterSubmit}
                                    searchString={searchString}
                                    comingData={comingData}
                                    setComingData={setComingData}
                                    billId={billId}
                                />
                            </>
                        ):(
                            <>
                                <RefundBill 
                                    billId={billId}
                                    setBillId={setBillId}
                                    afterSubmit={afterSubmit}
                                    searchString={searchString}
                                    drawerOpen={drawerOpen}
                                    dataArr={dataArr}
                                    setDataArr={setDataArr}
                                    dataResult={dataResult}
                                    setDataResult={setDataResult}
                                    comingData={comingData}

                                    page={page}
                                    setPage={setPage}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                    count={count}
                                    setCount={setCount}
                                />
                            </>
                        )
                    }
                </>
                ):""
                }

               
              
        </div>
        
        </>
    )
}