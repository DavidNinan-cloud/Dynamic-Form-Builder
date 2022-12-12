import { Button, Card, Grid } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import {dateIsValid, validateDate, setdateFormat} from "../Common Components/Custom Hooks/DataValidator"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useDidMountEffect from '../Common Components/Custom Hooks/useDidMountEffect'
import DropdownField from '../Common Components/FormFields/DropdownField';
import SearchBar from '../Common Components/FormFields/SearchBar';

export default function StockTransactionsHistory() {

    const [dropdownArr,setDropdownArr] = useState([])
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(ValidationObj),
        defaultValues: {
            details:[{

            }]
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
    const [inputSearchArr, setInputSearchArr] = useState([]);
    const [dateValue1, setDateValue1] = React.useState(new Date());
    const [dateValue2, setDateValue2] = React.useState(new Date());
  return (
    <>
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Stock Transactions History 
        </p>

        <div className='w-full p-5'>
            <Grid container spacing={1} >
                <Grid item lg={4} sm={4} className="z-50">
                    <SearchBar
                    name="inputSearch"
                    placeholder="Search by Company Name"
                    dataArray={inputSearchArr}
                    isSearchable={true}
                    handleInputChange={(e) => {
                        console.log("searchinput", e);
                        if (e == null) {
                        console.log("clear 1");
                        } else {
                        if (e.length > 0) {
                            // autoSearchPatientBillCancellations(e).then((response) => {
                            //   console.log("response result", response.data.result);
                            //   setInputSearchArr(response.data.result);
                            // });
                        }
                        }
                    }}
                    //after search user get specific value
                    onChange={(e) => {
                        console.log("searchinput selected", e);
                        if (e == null) {
                        //   clearPage();
                        //   setSearchString(null);
                        } else {
                        // resetForm()
                        //   setInputSearchid(e.patientId);
                        }
                    }}
                    />
                </Grid>
                {/* type */}
                <Grid item lg={2} sm={4}>
                    <DropdownField
                        control={control}
                        error={errors.type}
                        name={`type`}
                        dataArray={dropdownArr}
                        placeholder="Type"
                        isSearchable={false}
                        inputRef={{...register(`type`,
                        {       onChange: (e) => {
                                    // funcSetLedgerData()
                                },
                        })}}
                    />
                </Grid>
                {/* from and to date */}
                <Grid item lg={5}  sm={8} className="flex space-x-2 mt-1">
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
                {/* Search Button */}
                <Grid item lg={1}  sm={1}>
                    <Button 
                        variant='contained'>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    </div>
    </>
  )
}
