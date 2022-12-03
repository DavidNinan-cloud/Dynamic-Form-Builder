import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../Common-Components/PatientInfo";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import RadioField from "../../../Common Components/FormFields/RadioField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import CommonSearch from "./Common Components/CommonSearch";
import BillList from "./BillList";
import SelectedBillTableSelf from './SelectedBillTableSelf'
import SelectedBillTableCompany from "./SelectedBillTableCompany";

export default function BillSettlement({ drawerOpen }) {
  const refundTypes = [
    { id: 0, value: 0, label: "Self" },
    { id: 1, value: 1, label: "Company" },
  ];
  const applicableType = [
    { id: 0, value: 0, label: "OPD" },
    { id: 1, value: 1, label: "IPD" },
    { id: 2, value: 2, label: "Both" }]

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      settlementAgainst: 0,
      applicableTo: 0,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    control,
    setValue,
    watch,
    getValues,
  } = methods;
  
  const [isSelfSettlement,setIsSelfSettlement] = useState(true)
  const [isIPD,setIsIPD] = useState(false)
  const [billListArr, setBillListArr] = useState([]);
  const [checkIndex, setCheckIndex] = useState([]);
  const [selectedBillData, setSelectedBillData] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [postApiCall, setPostApiCall] = useState(false);
  

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
      setOpen(true)
  }
  const handleClose = () => {
      setOpen(false)
  }
  const settlementAgainst = watch('settlementAgainst')
  useEffect(()=>{
    if(settlementAgainst == 0){
      setIsSelfSettlement(true)
    }else{
      setIsSelfSettlement(false)
    }
  },[settlementAgainst])

  const applicableTo = watch('applicableTo')
  useEffect(()=>{
    if(applicableTo == 1){
      setIsIPD(true)
    }else{
      setIsIPD(false)
    }
  },[applicableTo])

  // set data
  useDidMountEffect(()=>{
    let arr = [...billListArr]
    let indexArr = []
    for ( let item of arr){
      indexArr.push(false)
    }
    setCheckIndex(indexArr)
  },[billListArr])

  useDidMountEffect(()=>{
      fnCalculateTotal()
  },[checkIndex])

  const fnCalculateTotal = () => {
      let arr = [...billListArr]
      let indexArr = [...checkIndex]
      let totalBillAmount = 0
      let totalSelfBalance = 0
      let billIds = []
      for (let i = 0 ; i < arr.length ; i++){
        if(indexArr[i]){
          let selfBalance = arr[i]['Self Balance']
          let totalAmount = arr[i].totalAmount

          selfBalance = Number(selfBalance)
          totalAmount = Number(totalAmount)
          if(!isNaN(selfBalance) && !isNaN(totalAmount)){
            totalBillAmount += totalAmount
            totalSelfBalance += selfBalance

            let obj = {
              id: Number(arr[i].billId)
            }
            billIds.push(obj)
          }
        }         
      }
      let obj = {
        totalBillAmount : totalBillAmount,
        totalSelfBalance : totalSelfBalance,
        billIds : billIds
      }
      if(totalBillAmount > 0){
        setSelectedBillData(obj)
      }else{
        setSelectedBillData(null)
      }
  }

  const [unitId,setUnitId] = useState(null)

  useEffect(()=>{
    let roleObj = JSON.parse(localStorage.getItem("loggedUser"));
    let unitId = roleObj.units[0].value
    setUnitId(unitId)
    console.log('roleObj',roleObj)
  },[])
  return (
    <>
      <div className=" mt-14 text-center text-gray-700  text-2xl my-2 font-Poppins py-4">
        Bill Settlement
      </div>
      <div className=" bg-white md:mx-4 md:px-4 min-h-screen">
        <Grid container spacing={1}>
          <Grid item lg={drawerOpen ? 2.2 : 2} md={2.1} sm={3}>
            <p className="text-sm font-semibold tracking-wide mt-2">
              Settlement Type :
            </p>
          </Grid>
          <Grid item md={drawerOpen ? 4 : 3} sm={4} >
            <RadioField
              // label="Refund Against "
              name="settlementAgainst"
              control={control}
              dataArray={refundTypes}
            />
          </Grid>

          <Grid item lg={drawerOpen ? 1 : 1} md={2.1} sm={3}>
              <p className="text-sm font-semibold tracking-wide mt-1">
                Type :
              </p>
            </Grid>
            <Grid item md={drawerOpen ? 4 : 3} sm={4} >
              <RadioField
                // label="Refund Against "
                name="applicableTo"
                control={control}
                dataArray={applicableType}
              />
            </Grid>
          <Box width="100%"/>
        </Grid>

        {/* CommonSearch */}
        <CommonSearch 
            isSelfSettlement={isSelfSettlement}
            isIPD={isIPD}
            billListArr={billListArr}
            setBillListArr={setBillListArr}
            selectedBillData={selectedBillData}
            setSelectedBillData={setSelectedBillData}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            postApiCall = {postApiCall}
        />

        {
          billListArr.length > 0 ? (
            <BillList 
                dataResult = {billListArr}
                checkIndex = {checkIndex}
                setCheckIndex = {setCheckIndex}
            />
          ):''
        }

        {
          selectedBillData !== null ? (
            <>
              {
                isSelfSettlement ? (
                  <SelectedBillTableSelf 
                      postApiCall = {postApiCall}
                      setPostApiCall = {setPostApiCall}
                      ledgerData={selectedBillData}
                      isSelfSettlement={isSelfSettlement}
                      unitId={unitId}
                  />
                ):( 
                  <SelectedBillTableCompany 
                      postApiCall = {postApiCall}
                      setPostApiCall = {setPostApiCall}
                      ledgerData={selectedBillData}
                      selectedCompany={selectedCompany}
                      isSelfSettlement={isSelfSettlement}
                      unitId={unitId}
                  />
                )
              }
            </>
          ):''
        }
      </div>
    </>
  );
}
