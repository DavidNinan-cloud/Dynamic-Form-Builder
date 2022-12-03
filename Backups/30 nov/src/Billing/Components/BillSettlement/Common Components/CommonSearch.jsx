import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../../Common-Components/PatientInfo";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";


import { dateIsValid, validateDate, setdateFormat } from "../../../../Common Components/Custom Hooks/DataValidator"
import useDidMountEffect from "../../../../Common Components/Custom Hooks/useDidMountEffect";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, FormHelperText, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { callCompanyList, callSelfList } from "../../../services/BillSettlement/BillSettlementServices";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function CommonSearch(props) {
    const {
        isSelfSettlement,
        isIPD,
        billListArr,
        setBillListArr,
        selectedBillData,
        setSelectedBillData,
        selectedCompany,
        setSelectedCompany,postApiCall } = props

    const [companies, setCompanies] = useState([])
    let Schema = yup.object().shape({
        company: yup.object().nullable().shape({
            value: yup.string().required("Please Mention Your Cancellation Reason"),
            label: yup.string().required("Please Mention Your Cancellation Reason")
        }).required("required"),

    }).required();
    useEffect(() => {
        callCompanyList().then((response) => {
            console.log("Company result", response.data.result);
            setCompanies(response.data.result)
        })
    }, [])



    const [inputSearchArr, setInputSearchArr] = useState([]);
    const [searchString, setSearchString] = useState(null);
    const [inputSearchid, setInputSearchid] = useState(null);
    const [dateValue1, setDateValue1] = React.useState(new Date());
    const [dateValue2, setDateValue2] = React.useState(new Date());
    const [notFoundMsg, setNotFoundMsg] = React.useState(false)

    useDidMountEffect(() => {
        resetPage()
    }, [isSelfSettlement])

    const resetPage = () => {
        setBillListArr([])
        setDateValue1(new Date())
        setDateValue2(new Date())
        setNotFoundMsg(false)
        setSelectedBillData(null)
        setSelectedCompany(null)
    }


    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(Schema),
        defaultValues: {
            company: null
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

    useDidMountEffect(()=>{
        fnCallApi()
    },[postApiCall])

    const company = watch('company')
    const fnCallApi = () => {
        setSelectedBillData(null)
        setBillListArr([])
        setNotFoundMsg(false)
        setSelectedCompany(null)
        setTimeout(()=>{
            let fromDate = setdateFormat(dateValue1)
            let toDate = setdateFormat(dateValue2)
            let isIpd = isIPD
            let patientCategory;
            if (isSelfSettlement) {
                patientCategory = 'Self'
            } else if (company !== null) {
                patientCategory = company.label
                setSelectedCompany(company.value)
            }
    
            let callObj = {
                fromDate: fromDate,
                toDate: toDate,
                isIpd: isIpd,
                patientCategory: patientCategory
            }
            if (isSelfSettlement) {
                fetchBillDetails(callObj)
            } else if (company !== null && !isSelfSettlement) {
                fetchBillDetails(callObj)
            } else {
                trigger('company')
            }
        },500)
       
    }

    const fetchBillDetails = (obj) => {
        callSelfList(obj).then((response) => {
            console.log("Bill details result", response.data);

            if(response.data.statusCode !== 404){
                let receivedData = response.data.result
                setBillListArr(receivedData)
                setNotFoundMsg(false)
            }else{
                setNotFoundMsg(true)
            }
        })
    }


    // searchbar functions
    return (
        <div>
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
                {
                    isSelfSettlement ?
                        (<>
                            {/* companies */}
                            <Grid item lg={5} sm={4} className="z-50">
                                <SearchBar
                                    name="inputSearch"
                                    placeholder="Search by Patient Name/ UHID/ Mobile No."
                                    dataArray={inputSearchArr}
                                    isSearchable={true}
                                    handleInputChange={(e) => {
                                        console.log("searchinput", e);
                                        if (e == null) {
                                            console.log("clear 1");
                                        } else {
                                            if (e.length > 0) {
                                                autoSearchPatientBillCancellations(e).then((response) => {
                                                    console.log("response result", response.data.result);
                                                    setInputSearchArr(response.data.result);
                                                });
                                            }
                                        }
                                    }}
                                    onChange={(e) => {
                                        console.log("searchinput selected", e);
                                        if (e == null) {
                                            console.log("clear 2");
                                            // resetForm()
                                            clearPage();
                                            setSearchString(null);
                                        } else {
                                            // resetForm()
                                            clearPage();
                                            setSearchString(null);
                                            setComingDataObj(e);
                                            setInputSearchid(e.patientId);
                                        }
                                    }}
                                />
                            </Grid>
                        </>) : (
                            <Grid item lg={5} md={4} >
                                <DropdownField
                                    control={control} error={errors.company}
                                    name='company' dataArray={companies}
                                    placeholder="Company"
                                    isSearchable={false}
                                />
                            </Grid>)
                }
                <Grid item lg={6} sm={8} className="flex space-x-2 mt-1">
                    <FormControl
                        sx={{
                            backgroundColor: 'white'
                        }}
                        fullWidth
                        size="small"
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                // disablePast
                                maxDate={dateValue2}
                                label="From Date"
                                value={dateValue1}
                                inputProps={{ readOnly: true }}
                                onChange={(value) => {
                                    let isValidDate = validateDate(value)
                                    if (isValidDate) {
                                        setDateValue1(value)
                                        if (dateValue2 < value) {
                                            setDateValue2(value)
                                        }
                                    }
                                }}
                                renderInput={(props) => (
                                    <TextField {...props} size="small" sx={{
                                        svg: { color: "#0B83A5" },
                                    }} />
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
                            backgroundColor: 'white'
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
                                    if (isValidDate) {
                                        console.log("toDate", value)
                                        setDateValue2(value);
                                    }
                                }}
                                renderInput={(props) => (
                                    <TextField {...props} size="small" sx={{
                                        svg: { color: "#0B83A5" },
                                    }} />
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
                <Grid item lg={1} sm={1} className="flex space-x-2 shrink">
                    <Button
                        className=" h-10 w-10 rounded-md text-gray-500"
                        type="button"
                        variant="outlined"
                        size="small"
                        sx={{ borderColor: "grey.500", color: "gray" }}
                        onClick={() => {
                            fnCallApi()
                        }}
                    >
                        <SearchIcon className="cursor-pointer" />
                    </Button>
                </Grid>
            </Grid>

            { notFoundMsg ? (
                <div className="w-full justify-center text-base font-bold mt-3 text-center">
                    Data Not Found
                </div>
                ):''}
        </div>
    )
}
