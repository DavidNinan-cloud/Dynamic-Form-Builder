import { Box, Button, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useFormContext } from 'react-hook-form';
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import InputField from '../../../../../Common Components/FormFields/InputField';
import RadioField from '../../../../../Common Components/FormFields/RadioField'
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import PackageTotal from "../PackageTotal/PackageTotal";
import { fetchServiceSearch } from "../services/HealthPlanCreation";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import HealthPlanTariffTable from "./HealthPlanTariffTable";
import HealthPlanTotalServices from "./HealthPlanTotalServices";

export default function HealthPlan({
  packageTotalRates,classList,
  selectedTariffs,
  selectedUnits,setPackageTotalRates,
  dateValue1,
setDateValue1,
dateValue2,
setDateValue2,validateDate,
selectedServices,
setSelectedServices
}) {
  const {
    getValues,
    setValue,
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  
  
  const [searchString, setSearchString] = useState(null);
  const [inputSearchArr, setInputSearchArr] = useState([]);




  const addServiceToTable = (e) => {
    let arr = [...selectedServices]
    arr.push(e)
    setSelectedServices(arr)
  }


  const packageServicesRequestDtoList = watch('packageServicesRequestDtoList')
useEffect(()=>{
    if(packageServicesRequestDtoList && packageServicesRequestDtoList.length > 0 && selectedTariffs && classList && selectedTariffs.length > 0 &&  classList.length > 0)
      {
        calculateTotalServices()
      }
},[packageServicesRequestDtoList,selectedTariffs,classList,selectedServices])


const calculateTotalServices = () =>{

  let getRate = getValues('packageServicesRequestDtoList')
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
              }else{
                totalClassRate = totalClassRate + 0
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

const fnApiServiveCall = (e) =>{
  let tariffIds = []
  for (let item of selectedTariffs){
    tariffIds.push(item.value)
  }
  let unitIds = []
  for (let item of selectedUnits){
    unitIds.push(item.value)
  }
  
  const searchObj = {
    "searchString": e,
    "tariffId": tariffIds,
    "unitId": unitIds
  }
  fetchServiceSearch(searchObj).then((response) => response.data).then((res) => {

    console.log("res",res);
    let resultList = [];
    res.result.forEach((jsonString) => {
      let jsonObject = JSON.parse(jsonString);
      resultList.push(jsonObject);
    });

    
    console.log("resultList",resultList);
    setInputSearchArr(resultList);
  });
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
        <Box width="100%"/>

        <Grid item lg={12} sm={12} className='w-full'>
              <div className='my-1 px-1 rounded-md tracking-wide text-base font-bold'>
                                    Add Services :  
              </div>
        </Grid>
        <Grid item lg={4} sm={5.5}  >
                <SearchBar
                  clearSearchBar={true}
                  control={control}
                  error={errors.inputSearch}
                  type="button"
                  name="inputSearch"
                  placeholder="Search by Service Name"
                  dataArray={inputSearchArr}
                  className="w-96"
                  isSearchable={true}
                  //change option as per user input
                  handleInputChange={(e)=>{
                    console.log(e);
                    if (e == null) {
                    } else {
                      if (e.length > 0) {
                        fnApiServiveCall(e)
                      }
                    }
                  }}
                  //after search user get specific value
                  onChange={(e)=>{
                    if (e == null) {
                      setSearchString(null);
                    } else {
                      setSearchString(e);
                      addServiceToTable(e)
                    }
                  }}
                />
        </Grid>

              {/* <Grid item lg={3} sm={2.3} className="flex gap-1">
                <div>
                  <Button
                    color='success'
                    variant="contained"
                    size="small"
                    onClick={(e)=>{
                      addServiceToTable()
                    }}
                  >
                    ADD
                  </Button>
                </div>
                
            </Grid> */}
            
        <Box width="100%"/>
        <Grid item lg={12} sm={12} className='mt-4'>
              <div className='my-1 px-1 rounded-md tracking-wide text-base font-bold'>
                  Services
              </div>

              <div >
                      <HealthPlanTotalServices 
                          selectedServices={selectedServices}
                          setSelectedServices={setSelectedServices}
                          classList={classList} 
                      />
              </div>
        </Grid>
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
                                    <HealthPlanTariffTable 
                                        calculateTotalServices={calculateTotalServices}
                                        startIndex={index * classList.length == 0 ? -1 : (index * classList.length)+1}
                                        selectedServices={selectedServices}
                                        selectedUnits={selectedUnits} 
                                        classList={classList} 
                                        tariffId={tarrif.value}
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
