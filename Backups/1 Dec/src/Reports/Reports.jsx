import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from './http-common'
import { getreportsfilter, getDropdownApi ,getSearchBarApi, postApi, getDependentDropdownApi} from './services/reportServices'
import { useLocation} from 'react-router-dom';
import useDidMountEffect from "../Common Components/Custom Hooks/useDidMountEffect";
import { Box, Button, Divider, FormControl, FormHelperText, Grid, Modal, TextField } from "@mui/material";
import DropdownField from "../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import SearchBar from "../Common Components/FormFields/SearchBar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TuneIcon from "@mui/icons-material/Tune";
import ControlledInputField from "../Common Components/FormFields/ControlledInputField";
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from "../Common Components/loadingspinner/loadingSpinner";
import ReportListTable from "./ReportListTable";
import ControlledRadioField from "../Common Components/FormFields/ControlledRadioField";
import ControlledCheckBoxField from "../Common Components/FormFields/ControlledCheckBoxField";
import ControlledSearchBar from "../Common Components/FormFields/ControlledSearchBar";

export default function Reports ({routeElement, handleDrawerOpen, handleDrawerClose}) {
    
    const location = useLocation();

    const [openFilter,setOpenFilter] = useState(false)
    const handleOpenFilter = () =>{
        setOpenFilter(true)
    }
    const handleCloseFilter = () =>{
        if(openFilter){
            setOpenFilter(false)
        }
    }
    // show form or not
    const [showForm,setShowForm] = useState(false)

    // after Api call store
    const [reportForm,setReportForm] = useState([])
    // structure form data
    const [finalreportForm,setfinalReportForm] = useState([])
    // search Bar
    const [inputSearchArr,setInputSearchArr] = useState([])
    // for submiting obj
    const [submitData,setSubmitData] = useState({}) 


    // for report table
    const refDefaultObj = useRef({})
    const [count, setCount] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [spinner, showSpinner] = React.useState(false);
    const [loadingArray, showLoadingArray] = React.useState(false);
    
    const [tableData,setTableData] = useState([])
    const [dataResult,setDataResult] = useState([])
    const [postApiUrl,setPostApiUrl] = useState('')
    const methods = useForm({
        
      });
    const {register,setValue, handleSubmit, reset, formState:{ errors }, control } = methods

    const resetForm = () => {
        setReportForm([])
        setfinalReportForm([])
        setInputSearchArr([])
        setSubmitData({})
        setCount(0)
        setPage(0)
        setRowsPerPage(10)
        setTableData([])
        setDataResult([])
        setPostApiUrl('')
    }
    useEffect(() => {
            console.log("Reports Says Hii",location)
            console.log('routeElement',routeElement)
            resetForm()
            // getreportsfilter(location.state.functionalityId).then((response) => {
            getreportsfilter(routeElement.id).then((response) => {
                if (response.status === 200) {
                  
                    console.log(response.data.result)
                    // callAllApis(response.data.result)
                    setReportForm(response.data.result)
                  }
            })
            .catch((response) => {
                console.log(response);
            });
    },[routeElement])

    
    useDidMountEffect(()=>{

        showLoadingArray(true)
        callAllApis(reportForm)
    },[reportForm])


    useDidMountEffect(()=>{
        showLoadingArray(true)
        setTimeout(()=>{
            showLoadingArray(false)
        },[500])
    },[finalreportForm])

    const callAllApis = (data) => {
        let postApiUrlString = ''
        let elementObjDefault = {}
        let elementArr = []
        for(let element of data){
            postApiUrlString = element.searchUrl
            let obj = element
            let key = element.name 
            if(element.controlType == 'dropdown' || element.controlType == 'radiobutton'){
                elementObjDefault[`${key}`] = element.defaultValue
                refDefaultObj.current[`${key}`] = element.defaultValue
                getDropdownApi(element.url).then((response) => {
                    if (response.status === 200) {

                        obj.dataArr = response.data.result
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
                // callApiDropdown(element).then((reponse)=>{
                //     console.log("promise respones",reponse)
                //     obj.dataArr = response
                // })
            }else if(element.controlType == 'searchbar'){
                elementObjDefault[`${key}`] = null
                refDefaultObj.current[`${key}`] = null
            }else if(element.controlType == 'datepicker'){
                elementObjDefault[`${key}`] = element.defaultValue
                refDefaultObj.current[`${key}`] = element.defaultValue
                obj.data= element.defaultValue
            }else if(element.controlType == 'textfield'){
                elementObjDefault[`${key}`] = element.defaultValue
                refDefaultObj.current[`${key}`] = element.defaultValue
                obj.data = element.defaultValue
            }else if(element.controlType == "checkbox"){
                elementObjDefault[`${key}`] = element.defaultValue
                refDefaultObj.current[`${key}`] = element.defaultValue
                obj.data = element.defaultValue
            }

            elementArr.push(obj)
        }
        
        // refDefaultObj.current = elementObjDefault


        console.log("refDefaultObj.current",refDefaultObj.current)
        console.log("elementArr",elementArr)
        setSubmitData(elementObjDefault)
        setfinalReportForm(elementArr)
        setPostApiUrl(postApiUrlString)
    }

    const dependentApiCall = (element,elementValue,childArr,parentArr) => {
        let setParents = false
        if(parentArr.length > 0){
            setParents = true
        }
        let finalUrl = ''
        // setting parent params
        if(setParents){
            for(let i = 0 ; i<parentArr.length; i++){
                let elementValue = submitData[`${parentArr[i]}`]
                if(typeof elementValue !== "object"){
                    if(i == 0){
                        finalUrl = finalUrl + `?${parentArr[i]}=${elementValue}`
                    }else {
                        finalUrl = finalUrl + `&${parentArr[i]}=${elementValue}`
                    }
                }else if(elementValue == null){
                    if(i == 0){
                        finalUrl = finalUrl + `?${parentArr[i]}=`
                    }else {
                        finalUrl = finalUrl + `&${parentArr[i]}=`
                    }
                }
            }
            // set element param
            finalUrl = finalUrl + `&${element.name}=${elementValue}`
        }else{
            // set element param
            finalUrl = finalUrl + `?${element.name}=${elementValue}`
        }
        let submitObj = submitData
        let formArr = [...finalreportForm]
        for(let i = 0 ; i<childArr.length; i++){
            
            let elementValue = submitObj[`${childArr[i]}`]
            console.log("child  typeof",typeof elementValue)
            if(typeof elementValue !== "object"){
                submitObj[`${childArr[i]}`] = null
                setValue(childArr[i],null)

                // find child and set data
                let currentElementIndex = formArr.findIndex(o => o.name === childArr[i]);

                formArr[currentElementIndex].dataArr = []
                getDependentDropdownApi(formArr[currentElementIndex].url,finalUrl).then((response) => {
                    if (response.status === 200) {
                        console.log('api call successful')
                        formArr[currentElementIndex].dataArr = response.data.result
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
            }else if(elementValue == null){
                submitObj[`${childArr[i]}`] = null
                setValue(childArr[i],null)

                // find child and set data
                let currentElementIndex = formArr.findIndex(o => o.name === childArr[i]);

                formArr[currentElementIndex].dataArr = []
                getDependentDropdownApi(formArr[currentElementIndex].url,finalUrl).then((response) => {
                    if (response.status === 200) {
                        console.log('api call successful')
                        formArr[currentElementIndex].dataArr = response.data.result
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
            }
        }
        setfinalReportForm(formArr)
        setSubmitData(submitObj)
    }
    const dependentApiCallUpdated = (element,currElementValue,childArr) => {

        let finalUrl = ''
        let submitObj = submitData
        let formArr = [...finalreportForm]
        
        // iterate all dependent childs
        for(let i = 0 ; i<childArr.length; i++){
            let elementValue = submitObj[`${childArr[i]}`]
            let currentElementIndex = formArr.findIndex(o => o.name === childArr[i]);
            
                // get their dependent parents
                let dependentString = formArr[currentElementIndex].dependentOn
                let dependentStringArr = dependentString.split(',');
                for(let j = 0; j < dependentStringArr.length; j++) {
                    // Trim the excess whitespace.
                    dependentStringArr[j] = dependentStringArr[j].replace(/^\s*/, "").replace(/\s*$/, "");
                }

                // set their Apis path
                for(let j = 0; j < dependentStringArr.length; j++) {
                    console.log("dependentStringArr",dependentStringArr[j])
                    console.log("element.name",element.name)
                    let setElementValue
                    if(dependentStringArr[j] == element.name) {
                        setElementValue = currElementValue
                    }else{
                        setElementValue = submitData[`${dependentStringArr[j]}`]
                    }
                    
                    if(typeof setElementValue !== "object"){
                        if(j == 0){
                            finalUrl = finalUrl + `?${dependentStringArr[j]}=${setElementValue}`
                        }else {
                            finalUrl = finalUrl + `&${dependentStringArr[j]}=${setElementValue}`
                        }
                    }else if(setElementValue == null){
                        if(j == 0){
                            finalUrl = finalUrl + `?${dependentStringArr[j]}=`
                        }else {
                            finalUrl = finalUrl + `&${dependentStringArr[j]}=`
                        }
                    }
                }

            console.log("finalUrl ",finalUrl)
            // call dependent Child Apis
            if(typeof elementValue !== "object"){
                submitObj[`${childArr[i]}`] = null
                setValue(childArr[i],null)

                formArr[currentElementIndex].dataArr = []
                getDependentDropdownApi(formArr[currentElementIndex].url,finalUrl).then((response) => {
                    if (response.status === 200) {
                        console.log('api call successful')
                        formArr[currentElementIndex].dataArr = response.data.result
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
            }else if(elementValue == null){
                submitObj[`${childArr[i]}`] = null
                setValue(childArr[i],null)

                formArr[currentElementIndex].dataArr = []
                getDependentDropdownApi(formArr[currentElementIndex].url,finalUrl).then((response) => {
                    if (response.status === 200) {
                        console.log('api call successful')
                        formArr[currentElementIndex].dataArr = response.data.result
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
            }

            finalUrl = ''
        }
        setfinalReportForm(formArr)
        setSubmitData(submitObj)
    }
    useDidMountEffect(()=>{
        if(reportForm.length > 0) {
            setShowForm(true)
            callTableDataApi()
        }
    },[postApiUrl])


    const getDateModal = (dobValue) => {
        let dobGivenYear = dobValue.getFullYear();
        let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
        let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
        // const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
        const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
        return fullDOB
    };
    const onSubmit = () => {
        handleCloseFilter()
        console.log("onSubmit submitData",submitData)
        callTableDataApi()
    }


    const FormConditions = ({element,index}) => {
        return(
            <>  
                                            {
                                                element.controlType == 'dropdown' ? 
                                                (<> 
                                                    {element.dependentChild  ?
                                                    (
                                                                <DropdownField
                                                                    control={control}
                                                                    error={errors.documentType} 
                                                                    name={element.name}
                                                                    placeholder={element.placeholder}
                                                                    dataArray={element.dataArr}
                                                                    isSearchable={false}
                                                                    isClearable={false}
                                                                    inputRef={{
                                                                        ...register(element.name, {
                                                                        onChange: (e) => {
                                                                            let obj = submitData
                                                                            obj[`${element.name}`] = Number(e.target.value.value)
                                                                            setSubmitData(obj)
                                                                            //call api
                                                                            let childString = element.dependentChild
                                                                            let childArr = childString.split(',');
                                                                            for(let i = 0; i < childArr.length; i++) {
                                                                                // Trim the excess whitespace.
                                                                                childArr[i] = childArr[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                                                            }
                                                                            let parentArr = []
                                                                            if(element.dependentOn){
                                                                                let parentString = element.dependentOn
                                                                                parentArr = parentString.split(',');
                                                                                for(let i = 0; i < parentArr.length; i++) {
                                                                                    // Trim the excess whitespace.
                                                                                    parentArr[i] = parentArr[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                                                                }
                                                                            }
                                                                            let elementValue = Number(e.target.value.value)
                                                                            // dependentApiCall(element,elementValue,childArr,parentArr)
                                                                            dependentApiCallUpdated(element,elementValue,childArr)
                                                                        },
                                                                        }),
                                                                    }}
                                                                />
                                                    ):(
                                                        <DropdownField
                                                            control={control}
                                                            error={errors.documentType} 
                                                            name={element.name}
                                                            placeholder={element.placeholder}
                                                            dataArray={element.dataArr}
                                                            isSearchable={false}
                                                            isClearable={false}
                                                            inputRef={{
                                                                ...register(element.name, {
                                                                onChange: (e) => {
                                                                    let obj = submitData
                                                                    obj[`${element.name}`] = Number(e.target.value.value)
                                                                    setSubmitData(obj)
                                                                },
                                                                }),
                                                            }} 
                                                        />
                                                    )}
                                                </>
                                                ):''
                                            }
                                            {
                                                element.controlType == 'datepicker' ? (
                                                    <FormControl
                                                        sx={{
                                                            backgroundColor:'white'
                                                        }}
                                                        fullWidth
                                                        size="small"
                                                        >
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DatePicker
                                                            label={element.placeholder}
                                                            value={element.data}
                                                            onChange={(value) => {
                                                                let arr = [...finalreportForm]
                                                                arr[index].data = value
                                                                setfinalReportForm(arr)
                                                                let obj = submitData
                                                                obj[`${element.name}`] = getDateModal(value)
                                                                setSubmitData(obj)
                                                            }}
                                                            renderInput={(props) => (
                                                                <TextField {...props} size="small"  sx={{
                                                                svg: { color: "#0B83A5" },
                                                                }}/>
                                                            )}
                                                            name={element.name}
                                                            defaultValue={element.data}
                                                            inputFormat="dd/MM/yyyy"
                                                            />
                                                        </LocalizationProvider>

                                                        <FormHelperText style={{ color: "#d32f2f" }}>
                                                            {errors.dob?.message}
                                                        </FormHelperText>
                                                    </FormControl>
                                                ):''
                                            }
                                            {
                                                element.controlType == 'textfield' ? (
                                                    <ControlledInputField
                                                                name={element.name}
                                                                label={element.placeholder}
                                                                inputRef={{...register(element.name,{
                                                                    onChange: (e) => {
                                                                        let obj = submitData
                                                                        obj[`${element.name}`] = e.target.value
                                                                        setSubmitData(obj)
                                                                    },
                                                                    })}}
                                                                value={element.data}
                                                                defaultValue={element.data}
                                                                error={errors.Services?.[index]?.quantity}
                                                                control={control}
                                                    />
                                                ):''
                                            }
                                            {
                                                element.controlType == 'radiobutton' ? (
                                                    <ControlledRadioField
                                                                name={element.name}
                                                                label={element.placeholder}
                                                                inputRef={{...register(element.name,{
                                                                    onChange: (e) => {
                                                                        let obj = submitData
                                                                        obj[`${element.name}`] = Number(e.target.value)
                                                                        setSubmitData(obj)
                                                                    },
                                                                    })}}
                                                                value={element.data}
                                                                defaultValue={element.data}
                                                                dataArray={element.dataArr}
                                                                control={control}
                                                    />
                                                ):''
                                            }
                                            {
                                                element.controlType == 'checkbox' ? (
                                                    <ControlledCheckBoxField
                                                        name={element.name}
                                                        label={element.placeholder}
                                                        onChange={(value) => {
                                                                console.log("checkbox value",value)
                                                                let arr = [...finalreportForm]
                                                                arr[index].data = value
                                                                setfinalReportForm(arr)

                                                                let obj = submitData
                                                                obj[`${element.name}`] = value
                                                                setSubmitData(obj)
                                                            }}
                                                        value={element.data}
                                                        defaultValue={element.data}
                                                        control={control}
                                                    />
                                                ):''
                                            }
            </>
            )
        }

    const callTableDataApi = () =>{
        let obj = submitData
        obj.page = page
        obj.size = rowsPerPage
        showSpinner(true);
        console.log("obj param",obj)
        postApi(postApiUrl, obj)
        .then((response) => response.data)
        .then((res) => {
            console.log("Report List",res);
            showSpinner(false);
            setTableData(res);
            setDataResult(res.result)
            setCount(res.count)
        })
        .catch(() => {
            showSpinner(false);
            setTableData([]);
            setDataResult([])
            setCount(0)
        });
        }
    
    
    const [inputValue, setInputValue] = useState('')

    const handleReset = () => {
        console.log("resetDataObj",refDefaultObj.current)
        let defaultObj = refDefaultObj.current
        let finalFormArr = [...finalreportForm]
        for (const key of Object.keys(defaultObj    )) {
            console.log(key, defaultObj[key]);
            let formObjIndex = finalFormArr.findIndex(o => o.name == key);
            if(formObjIndex !== -1 && finalFormArr[formObjIndex].data){
                finalFormArr[formObjIndex].data = defaultObj[key]
            }
            setValue(key,defaultObj[key])
        }
        setInputValue('')
        setSubmitData(defaultObj)
        setfinalReportForm(finalFormArr)
    }
    return (
        <div className="min-h-screen bg-white mt-16 px-8 py-4">
            <div className="text-center text-gray-500 my-4 font-bold text-xl">{routeElement.functionality}</div>
            { showForm ? (
            <Grid container spacing={2} sx={{padding:2}}>
                {
                    showForm && finalreportForm.length > 0 && finalreportForm.map((element,index)=>{
                        // console.log(`map element ${index}`,element)
                        return(
                            <Grid key={index} item lg={element.lg ? element.lg : 3} md={element.md ? element.md : 3} sm={element.sm ? element.sm : 4} className={element.controlType == 'searchbar' ? 'z-50':''}>
                                                  { index <= 8 ? (
                                <>
                                    {
                                        element.controlType == 'searchbar' ? (
                                            <ControlledSearchBar
                                                    inputValue={inputValue}
                                                    setInputValue={setInputValue}
                                                    searchIcon={true}
                                                    control={control}
                                                    error={errors.inputSearch}
                                                    name={element.name}
                                                    placeholder={element.placeholder}
                                                    dataArray={inputSearchArr}
                                                    handleInputChange={(e)=>{
                                                        console.log(e)
                                                        if(e == null)
                                                        {
                                                            let obj = submitData
                                                            obj[`${element.name}`] = null
                                                            setSubmitData(obj)
                                                    }else{
                                                        if (e.length > 0) {
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e
                                                            setSubmitData(obj)
                                                            getSearchBarApi(element.url,e).then((response) => {
                                                                if (response.status === 200) {
                                                                    setInputSearchArr(response.data.result);
                                                                }
                                                            })
                                                            .catch((response) => {
                                                                console.log(response);
                                                            });
                                                        }
                                                        }
                                                        
                                                    }}
                                                    onChange={(e)=>{
                                                        if(e == null){
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e
                                                            setSubmitData(obj)
                                                        }
                                                        else{
                                                            console.log(e)
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e.label
                                                            setSubmitData(obj)
                                                        }
                                                    }}
                                                />
                                        ):''
                                    }
                                    <>  
                                            {
                                                element.controlType == 'dropdown' ? 
                                                (<> 
                                                    {element.dependentChild  ?
                                                    (
                                                                <DropdownField
                                                                    control={control}
                                                                    error={errors.documentType} 
                                                                    name={element.name}
                                                                    placeholder={element.placeholder}
                                                                    dataArray={element.dataArr}
                                                                    isSearchable={false}
                                                                    isClearable={false}
                                                                    inputRef={{
                                                                        ...register(element.name, {
                                                                        onChange: (e) => {
                                                                            let obj = submitData
                                                                            obj[`${element.name}`] = Number(e.target.value.value)
                                                                            setSubmitData(obj)
                                                                            //call api
                                                                            let childString = element.dependentChild
                                                                            let childArr = childString.split(',');
                                                                            for(let i = 0; i < childArr.length; i++) {
                                                                                // Trim the excess whitespace.
                                                                                childArr[i] = childArr[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                                                            }
                                                                            let parentArr = []
                                                                            if(element.dependentOn){
                                                                                let parentString = element.dependentOn
                                                                                parentArr = parentString.split(',');
                                                                                for(let i = 0; i < parentArr.length; i++) {
                                                                                    // Trim the excess whitespace.
                                                                                    parentArr[i] = parentArr[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                                                                }
                                                                            }
                                                                            let elementValue = Number(e.target.value.value)
                                                                            // dependentApiCall(element,elementValue,childArr,parentArr)
                                                                            dependentApiCallUpdated(element,elementValue,childArr)
                                                                        },
                                                                        }),
                                                                    }}
                                                                />
                                                    ):(
                                                        <DropdownField
                                                            control={control}
                                                            error={errors.documentType} 
                                                            name={element.name}
                                                            placeholder={element.placeholder}
                                                            dataArray={element.dataArr}
                                                            isSearchable={false}
                                                            isClearable={false}
                                                            inputRef={{
                                                                ...register(element.name, {
                                                                onChange: (e) => {
                                                                    let obj = submitData
                                                                    obj[`${element.name}`] = Number(e.target.value.value)
                                                                    setSubmitData(obj)
                                                                },
                                                                }),
                                                            }} 
                                                        />
                                                    )}
                                                </>
                                                ):''
                                            }
                                            {
                                                element.controlType == 'datepicker' ? (
                                                    <FormControl
                                                        sx={{
                                                            backgroundColor:'white'
                                                        }}
                                                        fullWidth
                                                        size="small"
                                                        >
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DatePicker
                                                            label={element.placeholder}
                                                            value={element.data}
                                                            onChange={(value) => {
                                                                let arr = [...finalreportForm]
                                                                arr[index].data = value
                                                                setfinalReportForm(arr)
                                                                let obj = submitData
                                                                obj[`${element.name}`] = getDateModal(value)
                                                                setSubmitData(obj)
                                                            }}
                                                            renderInput={(props) => (
                                                                <TextField {...props} size="small"  sx={{
                                                                svg: { color: "#0B83A5" },
                                                                }}/>
                                                            )}
                                                            name={element.name}
                                                            defaultValue={element.data}
                                                            inputFormat="dd/MM/yyyy"
                                                            />
                                                        </LocalizationProvider>

                                                        <FormHelperText style={{ color: "#d32f2f" }}>
                                                            {errors.dob?.message}
                                                        </FormHelperText>
                                                    </FormControl>
                                                ):''
                                            }
                                            {
                                                element.controlType == 'textfield' ? (
                                                    <ControlledInputField
                                                                name={element.name}
                                                                label={element.placeholder}
                                                                inputRef={{...register(element.name,{
                                                                    onChange: (e) => {
                                                                        let obj = submitData
                                                                        obj[`${element.name}`] = e.target.value
                                                                        setSubmitData(obj)
                                                                    },
                                                                    })}}
                                                                value={element.data}
                                                                defaultValue={element.data}
                                                                error={errors.Services?.[index]?.quantity}
                                                                control={control}
                                                    />
                                                ):''
                                            }
                                            {
                                                element.controlType == 'radiobutton' ? (
                                                    <ControlledRadioField
                                                                name={element.name}
                                                                label={element.placeholder}
                                                                inputRef={{...register(element.name,{
                                                                    onChange: (e) => {
                                                                        let obj = submitData
                                                                        obj[`${element.name}`] = Number(e.target.value)
                                                                        setSubmitData(obj)
                                                                    },
                                                                    })}}
                                                                value={element.data}
                                                                defaultValue={element.data}
                                                                dataArray={element.dataArr}
                                                                control={control}
                                                    />
                                                ):''
                                            }
                                            {
                                                element.controlType == 'checkbox' ? (
                                                    <ControlledCheckBoxField
                                                        name={element.name}
                                                        label={element.placeholder}
                                                        onChange={(value) => {
                                                                console.log("checkbox value",value)
                                                                let arr = [...finalreportForm]
                                                                arr[index].data = value
                                                                setfinalReportForm(arr)

                                                                let obj = submitData
                                                                obj[`${element.name}`] = value
                                                                setSubmitData(obj)
                                                            }}
                                                        value={element.data}
                                                        defaultValue={element.data}
                                                        control={control}
                                                    />
                                                ):''
                                            }
                                    </>
                                </>
                                ):''}
                            </Grid>
                        )
                    }) 
                }
                <Grid item lg={12} sm={12} className="flex justify-between">
                    <div>
                    {loadingArray ? (
                        <div className="flex justify-start space-x-8">
                            <LoadingSpinner /> <h1 className="mx-4 text-customBlue"> Loading Data </h1>
                        </div>
                        ) : '' }
                    </div>
                    <div className="flex space-x-4">
                    { finalreportForm.length > 8 ?

                        (
                        <div className="mt-2 mr-6">
                        <TuneIcon
                        className="cursor-pointer text-customBlue  mx-1"
                            onClick={() => {
                                handleOpenFilter()
                            }}
                        />
                        </div>
                        ):''
                    }

                    <Button
                            color="error"
                            onClick={()=>{handleReset()}}
                            variant="outlined"
                        >
                        Reset
                    </Button>
                    <Button
                            color="success"
                            onClick={onSubmit}
                            type="submit"
                            variant="contained"
                        >
                        Search
                    </Button>
                    </div>
                </Grid>
            </Grid>
            ):''
            } 
            {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : <>
        {tableData ? tableData.result ? tableData.result.length > 0 ? (
          <ReportListTable
              postApiUrl={postApiUrl}
              tableApiFunc = {postApi}
              searchParams={submitData}
              dataResult={dataResult}
              setDataResult={setDataResult}

              tableData={tableData}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}
          />
      ):
      (
        
                  <div className="text-gray-500 font-bold text-center ">
                    <h1 className="text-center">No Records Found</h1>
                  </div>
      ): "" : "" }
      </>}  
            <Modal
                open={openFilter}
                onClose={handleCloseFilter}
            >
                <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '60%',
                    maxWidth: '90%',
                    height: 'auto',
                    minHeight: '20%',
                    bgcolor: 'background.paper',
                    overflow:'hidden',
                    borderRadius: "0.7rem",
                    boxShadow: 24,
                    p: 2,}}>
                        <div className="flex pb-4 w-full justify-between">
                            <div className="">
                                <h1 className='text-xl font-semibold mr-2'> Additional Filter</h1> 
                            </div>
                            <div className='text-red-600'><CloseIcon onClick={handleCloseFilter}/></div>
                        </div>
                <Divider light sx={{marginBottom:'1rem'}}/>
                <Grid container spacing={2} sx={{padding:2}}>
                    {
                        showForm && finalreportForm.length > 0 && finalreportForm.map((element,index)=>{
                            
                            return(
                                <Grid key={index} item lg={element.lg ? element.lg : 3} md={element.md ? element.md : 3} sm={element.sm ? element.sm : 4} className={element.controlType == 'searchbar' ? 'z-50':''}>  
                                { index > 8 ? (
                                    <>
                                    {
                                        element.controlType == 'searchbar' ? (
                                            <SearchBar
                                                    searchIcon={true}
                                                    control={control}
                                                    error={errors.inputSearch}
                                                    name={element.name}
                                                    placeholder={element.placeholder}
                                                    dataArray={inputSearchArr}
                                                    handleInputChange={(e)=>{
                                                        console.log(e)
                                                        if(e == null)
                                                        {
                                                            let obj = submitData
                                                            obj[`${element.name}`] = null
                                                            setSubmitData(obj)
                                                    }else{
                                                        if (e.length > 0) {
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e
                                                            setSubmitData(obj)
                                                            getSearchBarApi(element.url,e).then((response) => {
                                                                if (response.status === 200) {
                                                                    setInputSearchArr(response.data.result);
                                                                }
                                                            })
                                                            .catch((response) => {
                                                                console.log(response);
                                                            });
                                                        }
                                                        }
                                                        
                                                    }}
                                                    onChange={(e)=>{
                                                        if(e == null){
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e
                                                            setSubmitData(obj)
                                                        }
                                                        else{
                                                            console.log(e)
                                                            let obj = submitData
                                                            obj[`${element.name}`] = e.label
                                                            setSubmitData(obj)
                                                        }
                                                    }}
                                                />
                                        ):''
                                    }
                                    <FormConditions element={element} index={index}/>
                                    
                                    </>
                                    ):''}
                                </Grid>
                            )
                        }) 
                    }
                    <Grid item lg={12} sm={12} className="flex justify-end">
                        <Button
                                color="success"
                                onClick={onSubmit}
                                type="submit"
                                variant="contained"
                            >
                            Search
                        </Button>
                </Grid>
                </Grid>
                </Box>
            </Modal>
            {/* backup comment */}
            {/*  */}
        </div>
    )
}