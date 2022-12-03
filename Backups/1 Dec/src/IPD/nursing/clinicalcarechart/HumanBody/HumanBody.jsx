import { Button, Grid, Box, Modal, Divider } from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import HumanBodyImg from './HumanBody.png'
import Xarrow from 'react-xarrows';
import HumanBodyTable from "./HumanBodyTable";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormControl, Card } from "@mui/material";
import { Controller } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import useDidMountEffect from "../../../../Common Components/Custom Hooks/useDidMountEffect";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { VisitContext } from "../ClinicalCareChart";
import { useMutation } from "@tanstack/react-query";
import { getHumanBodyDetails, nurseListApi, saveHumanBodyApplied } from "../../services/clinicalchart/HumanBodyServices/HumanBodyServices";
import { errorAlert, successAlert } from "../../../../Common Components/Toasts/CustomToasts";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

let dummnyData = [{
    Action:"Inserted",
    By:'David',
    Time:24,
    Reason:'Fill'
  },
  {
    Action:"Removed",
    By:'Ruth',
    Time:24,
    Reason:'Fill'
  },
  {
    Action:"Inserted",
    By:'Omkar',
    Time:24,
    Reason:'Fill'
  },
  ]



const CheckBoxInput = ({label, control, stateChecked, setBodyInput, name }) =>{
    return(
    <FormControl>
                <Controller
                    render={({ field }) => (
                    <FormControlLabel
                    label={label}
                    control={
                        <Checkbox
                            checked={stateChecked}
                            defaultChecked={stateChecked}
                        onChange={(e) => {
                                let value = e.target.checked;
                                let obj = {
                                    inputType:label,
                                    inputKey:name,
                                    applied:value
                                }
                                setBodyInput(obj)
                            }}
                        />
                            }
                            {...field}
                            type="checkbox"
                            sx={{
                                "& .MuiSvgIcon-root":
                                { fontSize: 20 },
                            }}
                            className="w-full items-center pl-20 md:pl-0 text-gray-800 font-bold tracking-wider mr-2"
                        />
                        )}
                        name={name}
                        control={control}
                        defaultValue={stateChecked}
                    />
                    </FormControl>)
}


export default function HumanBody ({drawerOpen}){

    // Context
    const patientVisitId = useContext(VisitContext);
    const [data,setData] = useState(dummnyData)
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(schema),
        defaultValues:{
            CVP:true,
            ETT:true,
            RT:true,
            rhIntracath:true,
            lhIntracath:true,
            cathater:true,
            rlIntracath:true,
            llIntracath:true,
            doneBy:'',
            remarks:'',
            date:'',
            time:''
        } 
    });
    const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;

    
    const {isSuccess,mutate } =   useMutation(saveHumanBodyApplied);
    const [CVP,setCVP] =useState(true)
    const [ETT,setETT]=useState(true)
    const [RT,setRT]=useState(true)
    const [rhIntracath,setrhIntracath]=useState(true)
    const [lhIntracath,setlhIntracath]=useState(true)
    const [cathater,setcathater]=useState(true)
    const [rlIntracath,setrlIntracath]=useState(true)
    const [llIntracath,setllIntracath]=useState(true)


    const [bodyInput,setBodyInput]=useState({inputType:'',inputKey:'',applied:false})
    const [open,setOpen]=useState(false)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    let systemDate = new Date()
    let systemTime = systemDate.getTime();
    const [date, setDate] = useState(systemDate);
    const [time, setTime] = React.useState(systemTime);
    const [nurseData, setNurseData] = React.useState([]);
    
    useEffect(()=>{
        nurseListApi()
        .then(response=>response.data)
        .then(res=>{
          console.log("nurses",res.result) 
          setNurseData(res.result)
        })
    },[])

    useEffect(()=>{

        if(patientVisitId !== undefined){
            CallBodyDetails()
        }

    },[patientVisitId])

    const CallBodyDetails = () => {
        getHumanBodyDetails(patientVisitId)
        .then(response=>response.data)
        .then(res=>{
          console.log("patient details human body",res.result) 
        //   setNurseData(res.result)
          setBodyDetails(res.result.humanBodyStatus)
          setData(res.result.humanBodyEquips)
        })
    }
    const setBodyDetails = (bodyData) => {
        setCVP(bodyData.isCvp)
        setETT(bodyData.isEtt)
        setRT(bodyData.isRt)
        setrhIntracath(bodyData.isRhIntracath)
        setlhIntracath(bodyData.isLhIntracath)
        setcathater(bodyData.isFoleysCatheter)
        setrlIntracath(bodyData.isRlIntracath)
        setllIntracath(bodyData.isLlIntracath)
    }
    
    // bodyInput
    useDidMountEffect(()=>{
        console.log("bodyInput",bodyInput)
        reset()
        handleOpen()
    },[bodyInput])

    const [drawerState,setDrawerState] = useState({
        CVP:false,
        ETT:false,
        RT:false,
        rhIntracath:false,
        lhIntracath:false,
        cathater:false,
        rlIntracath:false,
        llIntracath:false,
    })
    const [showArrows,setShowArrows] = useState(true)

    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    useEffect(()=>{
        if(!drawerOpen){
            setShowArrows(false)
            setTimeout(()=>{
                setShowArrows(true)
            },[250])
        }else{
            setShowArrows(false)
            setTimeout(()=>{
                setShowArrows(true)
            },[250])
        }
    },[drawerOpen])

    const populateTable = (input) =>{
        console.log("input",input)
    }


    const getDateModal = (dobValue) => {
        let dobGivenYear = dobValue.getFullYear();
        let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
        let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
        const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
        return fullDOB
      };
    const setTimeFormat = (timeValue) => {
        let dateStr = timeValue;

        let date = new Date(dateStr);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = data.getScounds

        let ampm;

        if (hours >= 12) {
          ampm = "PM";
        } else {
          ampm = "AM";
        }

        // hours = hours % 12;

        // if (hours < 10) {
        //   hours = "0" + hours;
        // }

        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        // let timeStr = `${hours}:${minutes}` + ` ${ampm}`;
        let timeStr = `${hours}:${minutes}:00`;

        return timeStr
    }
    const onSubmit = (data) => {
        console.log("data" , data)
        console.log('date',date)
        let insertedDate = getDateModal(date)
        let insertedTime = setTimeFormat(time)
        let obj = {
            "action": null,
            "id": null,
            "insertedBy": {
            "_id": Number(data.doneBy.value)
            },
            "insertedDate": insertedDate,
            "insertedTime": insertedTime,
            "remarks": data.remarks,
            
            "type": null,
            "visitId": patientVisitId
            }
        obj.visitId = patientVisitId
        if(bodyInput.applied){
            // it is inserted
            obj.action = "inserted"
        }else{
            obj.action = "removed"
        }

        // String CVP = "CVP";
        // String ETT = "E.T.T";
        // String RT= "R.T.";
        // String RHI = "R.H.Intracath";
        // String LLI = "L.L.Intracath";
        // String RLI = "R.L.Intracath";
        // String FOLEYS_CATHATER = "Foleys Cathater";
        // String LHI ="L.H.Intracath";

        if(bodyInput.inputKey === 'CVP'){
            obj.type = "CVP"
            setCVP(bodyInput.applied)
        }else if(bodyInput.inputKey === 'ETT'){
            obj.type = "E.T.T"
            setETT(bodyInput.applied)
        }else if(bodyInput.inputKey === 'RT'){
            obj.type = "R.T."
            setRT(bodyInput.applied)
        }else if(bodyInput.inputKey === 'rhIntracath'){
            obj.type = "R.H.Intracath"
            setrhIntracath(bodyInput.applied)
        }else if(bodyInput.inputKey === 'lhIntracath'){
            obj.type = "L.H.Intracath"
            setlhIntracath(bodyInput.applied)
        }else if(bodyInput.inputKey === 'cathater'){
            obj.type = "Foleys Cathater"
            setcathater(bodyInput.applied)
        }else if(bodyInput.inputKey === 'rlIntracath'){
            obj.type = "R.L.Intracath"
            setrlIntracath(bodyInput.applied)
        }else if(bodyInput.inputKey === 'llIntracath'){
            obj.type = "L.L.Intracath"
            setllIntracath(bodyInput.applied)
        }

        console.log('obj',obj)
        saveApi(obj)
        handleClose()
    }

    const saveApi = (finalObj) => {
        mutate(finalObj, {onSuccess: (data, variables, context) => {
      
            setOpenBackdrop(false)
            successAlert(data.data.message)
            setTimeout(()=>{
                CallBodyDetails()
            },1000)
            
          },
          onError:(data)=>{
            setOpenBackdrop(false)
            errorAlert(data.message)
          },
        });
    }
    return(
        <>
        <div className="bg-white relative">
            
            <Grid container spacing={1} sx={{position:'relative', paddingY:'4rem'}}>
                <Grid item lg={2.6} md={3} sx={{paddingLeft:'1rem', display:'flex' ,flexDirection:'column', justifyContent:'end',position:'relative'}}
                    className="space-y-4"
                >
                    {/* CVP */}
                    <div>   
                            <CheckBoxInput 
                                control={control} 
                                name="CVP" 
                                label="Central Venous Pressure (CVP)"
                                stateChecked={CVP}
                                setBodyInput={setBodyInput}
                            />
                    </div>
                    {/* ETT */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="ETT" 
                                label="ENDOTRACHEAL TUBE (ETT)"
                                stateChecked={ETT}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* RT */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="RT" 
                                label="RT"
                                stateChecked={RT}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* R.H.Intracath */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="rhIntracath" 
                                label="R.H Intracath"
                                stateChecked={rhIntracath}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* L.H.Intracath */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="lhIntracath" 
                                label="L.H.Intracath"
                                stateChecked={lhIntracath}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* Foleys Cathater */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="cathater" 
                                label="Foleys Cathater"
                                stateChecked={cathater}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* R.L.Intracath */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="rlIntracath" 
                                label="R.L. Intracath"
                                stateChecked={rlIntracath}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                    {/* L.L.Intracath */}
                    <div>
                            <CheckBoxInput 
                                control={control} 
                                name="llIntracath" 
                                label="L.L. Intracath"
                                stateChecked={llIntracath}
                                setBodyInput={setBodyInput}
                        />
                    </div>
                </Grid>
                <Grid item lg={6} md={8.4} sx={{paddingX:'2rem',position:'relative'}}>
                     <svg className="mx-auto z-0 " width="246" height="519" viewBox="0 0 246 519" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Human Body" d="M145.08 66.1403C156.025 43.2269 155.099 20.4455 149.607 12.452C144.702 5.31167 134.147 -0.144149 122.797 0.00312457C111.446 -0.144149 101.298 5.31167 96.3928 12.452C90.9015 20.4455 89.9746 43.2269 100.92 66.1403C101.111 66.5411 101.176 66.9976 101.053 67.4244C98.8727 74.9914 86.3648 83.6106 62.6115 86.1179C51.7085 87.3725 28.9374 96.0117 25.0767 120.531C20.259 151.129 -7.55012 254.263 1.97103 280.634C2.0051 280.729 2.02561 280.808 2.05392 280.904C3.59885 286.158 32.9412 300.26 29.4957 291.296C29.4208 291.102 29.2973 290.907 29.1591 290.751C20.2165 280.628 11.0201 263.774 35.422 278.593C35.9796 278.932 36.6961 279.004 37.3136 278.793C40.8528 277.587 43.8014 276.571 20.4183 248.705C20.3107 248.576 20.1789 248.461 20.0596 248.343C18.8918 247.193 18.048 243.225 22.9319 235.063C29.3664 224.308 36.8734 201.725 39.5544 188.282C42.0612 175.713 47.3805 152.803 59.8952 140.648C61.022 139.553 62.8142 140.292 62.9486 141.857C64.1684 156.064 65.6357 186.872 63.6994 221.346C63.6892 221.527 63.6571 221.698 63.5991 221.87C58.6162 236.624 50.1045 272.361 55.0004 300.085C55.0673 300.464 55.2447 300.805 55.49 301.101C58.6619 304.936 64.7185 317.589 66.365 341.528C68.5072 372.678 69.5796 353.941 66.3765 397.293C66.3691 397.393 66.3682 397.493 66.3761 397.593C67.124 407.036 71.4642 433.091 82.9875 463.05C85.8473 468.786 89.851 482.838 82.9875 493.162C76.7477 502.547 75.9443 509.089 76.387 511.816C76.462 512.278 76.764 512.655 77.1722 512.883C81.3264 515.203 92.0144 519.086 107.013 518.999C107.998 518.993 108.82 518.251 108.935 517.273C110.014 508.064 111.541 488.186 110.334 470.04C108.726 445.843 113.015 383.469 110.334 362.499C108.429 347.594 115.655 308.101 120.925 284.141C121.378 282.081 124.222 282.08 124.681 284.138C130.024 308.098 137.571 347.594 135.666 362.499C132.985 383.469 137.274 445.843 135.666 470.04C134.459 488.186 135.986 508.064 137.065 517.273C137.18 518.251 138.002 518.993 138.987 518.999C153.986 519.086 164.674 515.203 168.828 512.883C169.236 512.655 169.538 512.278 169.613 511.816C170.056 509.089 169.252 502.547 163.012 493.162C156.149 482.838 160.153 468.786 163.012 463.05C174.536 433.091 178.876 407.036 179.624 397.593C179.632 397.493 179.631 397.393 179.623 397.293C176.42 353.941 177.493 372.678 179.635 341.528C181.281 317.589 187.338 304.936 190.51 301.101C190.755 300.805 190.933 300.464 191 300.085C195.896 272.361 187.384 236.624 182.401 221.87C182.343 221.698 182.311 221.527 182.301 221.346C180.364 186.872 181.832 156.064 183.051 141.857C183.186 140.292 184.978 139.553 186.105 140.648C198.62 152.803 203.939 175.713 206.446 188.282C209.127 201.725 216.634 224.308 223.068 235.063C227.952 243.225 227.108 247.193 225.94 248.343C225.821 248.461 225.689 248.576 225.582 248.705C202.199 276.571 205.147 277.587 208.686 278.793C209.304 279.004 210.02 278.932 210.578 278.593C234.98 263.774 225.783 280.628 216.841 290.751C216.703 290.907 216.579 291.102 216.504 291.296C213.059 300.26 242.401 286.158 243.946 280.904C243.974 280.808 243.995 280.729 244.029 280.634C253.55 254.263 225.741 151.129 220.923 120.531C217.063 96.0117 194.291 87.3725 183.389 86.1179C159.635 83.6106 147.127 74.9914 144.947 67.4244C144.824 66.9976 144.889 66.5411 145.08 66.1403Z" fill="#F4D79F"/>
                            {/* CVP */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="CVPBOX" cx="200" cy="145" r="5" fill="red" />
                            </marker>
                            {/* ETT */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="ETTBOX" cx="240" cy="85" r="5" fill="red" />
                            </marker>
                            {/* RT */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="RTBOX" cx="240" cy="105" r="5" fill="red" />
                            </marker>
                            {/* rhIntracath */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="rhIntracathBOX" cx="18" cy="540" r="5" fill="red" />
                            </marker>
                            {/* lhIntracath */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="lhIntracathBOX" cx="480" cy="540" r="5" fill="red" />
                            </marker>
                            {/* cathater */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="cathaterBOX" cx="240" cy="560" r="5" fill="red" />
                            </marker>
                            {/* rlIntracath */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="rlIntracathBOX" cx="180" cy="980" r="5" fill="red" />
                            </marker>
                            {/* llIntracath */}
                            <marker viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                                <circle id="llIntracathBOX" cx="320" cy="980" r="5" fill="red" />
                            </marker>
                    </svg>
                </Grid>
                <Grid item lg={3} md={12}>
                    <HumanBodyTable data={data} />
                </Grid>
                
            </Grid>
            
            
            {/* CVP */}
            <Button 
                variant="contained"
                color="info"
                onClick={()=> populateTable("CVP")}   
                sx={ CVP ?{
                    position:"absolute",
                    top:{lg:'12%',md:'8%'}, 
                    left:{lg:'20%',md:'22%'}
                }:{
                    visibility:'hidden'
                }}id='CVP'>
                    CVP
            </Button>
            {/* ETT */}
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=> populateTable("ETT")}   
                sx={ ETT ?{
                    position:"absolute",
                    top:{lg:'8%',md:'8%'}, 
                    right:{lg:'30%',md:'5%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='ETT'>
                    ENDOTRACHEAL TUBE
            </Button>
            {/* RT */}
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>{populateTable("RT")}}   
                sx={ RT ?{
                    position:"absolute",
                    top:{lg:'15%',md:'15%'}, 
                    right:{lg:'30%',md:'5%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='RT'>
                    RT
            </Button>
            {/* rhIntracath */}
            <Button 
                variant="contained"
                color="info"
                onClick={()=>{populateTable("rhIntracath")}}     
                sx={ rhIntracath ?{
                    position:"absolute",
                    top:{lg:'42%',md:'32%'}, 
                    left:{lg:'20%',md:'22%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='rhIntracath'>
                    rhIntracath
            </Button>
            {/* lhIntracath */}
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>{populateTable("lhIntracath")}}    
                sx={ lhIntracath ?{
                    position:"absolute",
                    top:{lg:'42%',md:'32%'}, 
                    right:{lg:'30%',md:'5%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='lhIntracath'>
                    lhIntracath
            </Button>
            {/* cathater */}
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>{populateTable("cathater")}}    
                sx={ cathater ?{
                    position:"absolute",
                    bottom:{lg:'30%',md:'48%'}, 
                    right:{lg:'30%',md:'5%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='cathater'>
                    cathater
            </Button>
            {/* rlIntracath */}
            <Button 
                variant="contained"
                color="info"
                onClick={()=>{populateTable("rlIntracath")}}    
                sx={ rlIntracath ?{
                    position:"absolute",
                    bottom:{lg:'15%',md:'35%'}, 
                    left:{lg:'20%',md:'22%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='rlIntracath'>
                    rlIntracath
            </Button>
            {/* llIntracath */}
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>{populateTable("llIntracath")}}    
                sx={ llIntracath ?{
                    position:"absolute",
                    bottom:{lg:'15%',md:'35%'}, 
                    right:{lg:'30%',md:'5%'}
                }:{
                    visibility:'hidden'
                }}
                // className={ CVP ? 'absolute top-[2.7rem] left-[2.5rem] border w-[1rem] h-fit border-orange-500 font-bold text-center rounded px-3 text-yellow-500':'hidden'}
                  id='llIntracath'>
                    llIntracath
            </Button>
            {
                showArrows ? (
                <>
                    <Xarrow showHead={false} showTail={true} endAnchor={["bottom"]} path="straight" start='CVPBOX' end='CVP' showXarrow={CVP} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["bottom"]} path="straight" start='ETTBOX' end='ETT' showXarrow={ETT} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["left"]} path="straight" start='RTBOX' end='RT' showXarrow={RT} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["bottom"]} path="straight" start='rhIntracathBOX' end='rhIntracath' showXarrow={rhIntracath} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["bottom"]} path="straight" start='lhIntracathBOX' end='lhIntracath' showXarrow={lhIntracath} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["top"]} path="straight" start='cathaterBOX' end='cathater' showXarrow={cathater} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["right"]} path="straight" start='rlIntracathBOX' end='rlIntracath' showXarrow={rlIntracath} strokeWidth={1} color='black' headSize={6}/>
                    <Xarrow showHead={false} showTail={true} endAnchor={["left"]} path="straight" start='llIntracathBOX' end='llIntracath' showXarrow={llIntracath} strokeWidth={1} color='black' headSize={6}/>
                </>):''
            }

        </div>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: {lg:'30%',md:'60%'},
                    maxWidth: '50%',
                    height: 'auto',
                    minHeight: '30%',
                    bgcolor: 'background.paper',
                    overflow:'hidden',
                    borderRadius: "0.7rem",
                    boxShadow: 24,
                    paddingX: 4,
                    paddingBottom: 4,
                }}
                    className="">
                <div className=''>
                    <div className="flex py-4 mt-3 mb-6 justfy-between w-full mx-auto border-b">
                        <div className="w-full flex ">
                            <h1 className='text-xl font-semibold mr-2'>{bodyInput.inputType}</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>

                    <form onSubmit={handleSubmit(onSubmit)} className='py-1 md:py-0 top-0  mx-auto lg:px-[4%] px-[0%] w-[96%]'>
                        <Grid container spacing={1} className="w-full mx-auto space-y-3">
                            <Grid item lg={1} md={1}>
                            </Grid>
                            <Grid item lg={5} md={5}>
                                
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Date"
                                        name="date"
                                        value={date}
                                        onChange={(newValue) => {
                                        setDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            className="bg-white"
                                            fullWidth
                                            size="small"
                                            {...params}
                                            sx={{
                                            svg: { color: "#0B83A5" },
                                            }}
                                        />
                                        )}
                                    />
                                    </LocalizationProvider>

                            </Grid>

                            <Grid item lg={5} md={5}>
                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopTimePicker
                                    label=" Time"
                                    name="time"
                                    value={time}
                                    onChange={(newValue) => {
                                    setTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                    <TextField
                                        className="bg-white"
                                        fullWidth
                                        size="small"
                                        {...params}
                                        sx={{
                                        svg: { color: "#0B83A5" },
                                        }}
                                    />
                                    )}
                                />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={1} md={1}>
                            </Grid>

                            <Grid item lg={1} md={1}>
                            </Grid>
                            <Grid item lg={10} md={10} sx={{marginY:'0.6rem'}}>
                                <DropdownField 
                                        control={control} error={errors.doneBy}
                                        name='doneBy' dataArray={nurseData} isSearchable={true}
                                        placeholder={bodyInput.applied ? "Inserted By" : 'Removed By'}
                                />
                            </Grid>
                            <Grid item lg={1} md={1}>
                            </Grid>

                            <Grid item lg={1} md={1}>
                            </Grid>
                            <Grid item lg={10} md={10} >
                                <InputField
                                                name="remarks"
                                                label="Remarks"
                                                error={errors.remarks}
                                                control={control}
                                    />
                            </Grid> 
                            <Grid item lg={1} md={1}>
                            </Grid>
                        </Grid>
                    <div className='flex justify-end w-full my-4 space-x-4'>
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                                onClick={handleClose}
                                
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                            >
                                Submit
                            </Button>
                    </div> 
                    </form>
                </div>
            </Box>
        </Modal>
        
      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
        </>
    )
}