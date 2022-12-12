import { Box, Button, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useFormContext } from 'react-hook-form';
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import InputField from '../../../../../Common Components/FormFields/InputField';
import RadioField from '../../../../../Common Components/FormFields/RadioField'
import PackageTotal from "../PackageTotal/PackageTotal";
import PackageGroupTable from './PackageGroupTable';

const setPackagePriceType = [
  {
      id: 0,
      label: "Group-Wise",
      value:0
  },
  {
      id: 1,
      label: "Service-Wise",
      value:1
  }
]
export default function PackageComponent({
  classList,
  groupList,
  isAuto,
  selectedTariffs,
  selectedUnits,
  packageServiceArray,
  setPackageServiceArray,applicableTo,
  packageTotalRates,
  setPackageTotalRates
}) {    
const {
  getValues,
  setValue,
  control,
  watch,
  register,
  formState: { errors },
} = useFormContext();

const [dateValue1, setDateValue1] = React.useState(new Date());
const [dateValue2, setDateValue2] = React.useState(new Date());

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


const packageRateType = watch('packageRateType')
const [rateGroupWise,setRateGroupWise] = useState(true)

useEffect(()=>{
  if(packageRateType == 0){
    if(!rateGroupWise){
      setRateGroupWise(true)
    }
  }else{
    setRateGroupWise(false)
  }
},[packageRateType])

const selectedGroups = watch('packageGroups')



const groupRates = watch('groupRates')
useEffect(()=>{
  if(rateGroupWise){
    if(groupRates && groupRates.length > 0 && selectedTariffs && classList && selectedTariffs.length > 0 &&  classList.length > 0)
      {
          calculateTotalGroupwise()
      }
  }
},[groupRates,selectedTariffs,classList])


const calculateTotalGroupwise = () =>{

  let getRate = getValues('groupRates')
  console.log('getRate',getRate)
  if(getRate.length > 0){
    let arr = getRate
    let calculatedArr = []
    for(let tariffValue of selectedTariffs){
      let obj = {}
      obj.tariffId = Number(tariffValue.value)
      obj.Tariff = tariffValue.label
      obj.Classes = []
      for(let classValue of classList){
        let totalClassRate = 0
        for(let groupRateValue of arr){
          if(groupRateValue.tariff && groupRateValue.classType){
            if(tariffValue.value == groupRateValue.tariff.id && classValue.classId == groupRateValue.classType.id){
              let rate = Number(groupRateValue.rate)
              if(!Number.isNaN(rate)){
                totalClassRate = totalClassRate + rate
              }
            }
          }
        }
        let innerObj = {
          className : classValue.classType,
          classRate : totalClassRate,
          classId : classValue.classId
        }
        obj.Classes.push(innerObj)
        // obj[`${classValue.classType}`] = totalClassRate
      }
      calculatedArr.push(obj)
    }
    console.log('calculatedArr',calculatedArr)
    setPackageTotalRates(calculatedArr)
  }

}
  return (
    <Grid container spacing={1}>
        <Grid item lg={12} sm={12} className='w-full'>
        {
              packageTotalRates && packageTotalRates.length > 0 ? (
                <>
          <div className='my-1 px-1 rounded-md tracking-wide text-base font-bold'>
                                Package Rates :  
          </div>

          <div>
            {/* Package Rate */}
                  <PackageTotal 
                  
                    classList={classList} 
                    data={packageTotalRates}
                  />
          </div>
                </>
              ):''
            }
        </Grid>
        <Grid item lg={6}  sm={8} className="flex space-x-2 mt-1">
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
        <Grid item lg={2}  sm={4} >
            <InputField
                type="number"
                inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}
                name="activityDays"
                label="Activity Days"
                error={errors.activityDays}
                control={control}
            />
        </Grid>
        <Grid item xl={4} tab={4} sm={6} className=''>
            <DropdownField 
                    control={control} error={errors.packageGroups}
                    name="packageGroups" dataArray={groupList}
                    placeholder="Package Groups" isMulti={true}
                    isSearchable={true}
            />
        </Grid>
        
        <Grid item lg={6} sm={6} className='flex'>
            <div className="mx-2 px-2">Set Price  : </div>
            <RadioField
                label=""
                name="packageRateType"
                control={control}
                dataArray={setPackagePriceType}
            />
        </Grid>
        <Box width="100%"/>


        {
            selectedUnits && selectedUnits.length > 0 && selectedTariffs && selectedTariffs.length > 0 ? (
              <>
                  {
                    selectedTariffs.map((tarrif,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <Grid item lg={12} sm={12} className='mt-4'>
                            <div className='my-1 px-1 rounded-md tracking-wide text-base font-bold'>
                                Tarrif : {tarrif.label} 
                            </div>

                            <div >
                                    <PackageGroupTable 
                                        calculateTotalGroupwise={calculateTotalGroupwise}
                                        startIndex={index * classList.length == 0 ? -1 : (index * classList.length)+1}
                                        IndexOne={index}
                                        tariffId={tarrif.value} 
                                        selectedUnits={selectedUnits} 
                                        rateGroupWise={rateGroupWise} 
                                        classList={classList} 
                                        selectedGroups={selectedGroups}
                                        packageServiceArray={packageServiceArray}
                                        setPackageServiceArray={setPackageServiceArray}
                                    />
                            </div>
                          </Grid>
                        </React.Fragment>
                      )
                    })
                  }
              </>
            ):''
        }
    </Grid>
  )
}
