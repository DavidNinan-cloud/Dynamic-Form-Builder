import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../Common-Components/PatientInfo";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import RadioField from "../../../Common Components/FormFields/RadioField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";
import SelfSettlement from "./SelfSettlement";
import CompanySettlement from "./CompanySettlement";

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

  const settlementAgainst = watch('settlementAgainst')
  useEffect(()=>{
    if(settlementAgainst == 0){
      setIsSelfSettlement(true)
    }else{
      setIsSelfSettlement(false)
    }
  },[settlementAgainst])
  return (
    <>
      <div className=" mt-14 text-center text-gray-700  text-2xl my-2 font-Poppins py-4">
        Bill Settlement
      </div>
      <div className=" bg-white md:mx-4 md:px-4 min-h-screen">
        <Grid container spacing={1}>
          <Grid item lg={drawerOpen ? 2.2 : 2} md={2.1} sm={3}>
            <p className="text-sm font-semibold tracking-wide mt-2">
              Settlement Against :
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
          <Box width="100%"/>
        </Grid>
        {
              isSelfSettlement ? 
              <SelfSettlement  
                  applicableType={applicableType}
                  isSelfSettlement={isSelfSettlement}
              /> : 
              <CompanySettlement 
                  applicableType={applicableType}
                  isSelfSettlement={isSelfSettlement}
              /> 
        }
      </div>
    </>
  );
}
