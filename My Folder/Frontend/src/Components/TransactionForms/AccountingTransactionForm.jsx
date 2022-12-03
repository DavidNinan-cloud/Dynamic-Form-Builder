import { Button, Card, Grid } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import DropdownField from '../Common Components/FormFields/DropdownField'
import RadioField from '../Common Components/FormFields/RadioField'
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InputField from '../Common Components/FormFields/InputField'
import ControlledInputField from '../Common Components/FormFields/ControlledInputField'
import { AddAlarmRounded } from '@mui/icons-material';
import {dateIsValid, validateDate, setdateFormat} from "../Common Components/Custom Hooks/DataValidator"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useDidMountEffect from '../Common Components/Custom Hooks/useDidMountEffect'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary
  } from "@mui/material";
import LedgerTable from './LedgerTable';

let Schema = {

    details: yup
    .array()
    .of(
      yup.object().shape({
        type:  yup.object().nullable().shape({
            value: yup.string().required("Required"),
            label: yup.string().required("Required")
        }).required("Required"),
        
        groupAccount: yup.object().nullable().shape({
            value: yup.string().required("Required"),
            label: yup.string().required("Required")
        }).required("Required"),

        account: yup.object().nullable().shape({
            value: yup.string().required("Required"),
            label: yup.string().required("Required")
        }).required("Required"),
       
        amount: yup.number().typeError('You Must Specify A Number').min(0, 'Min value 0.').required("Required"),
  
        // remarks: yup.string().required("Required")
      }),
      
    )
    .min(1, "Required")
  };

export default function AccountingTransactionForm() {
    let typeDummy = [
        {value:0, label:'Credit'},
        {value:1, label:'Debit'}
    ]
    let BalanceSheetElements = [
        {id:0, value:0, label:'Asset'},
        {id:1, value:1, label:'Liability'},
        {id:2, value:2, label:'Equity'},
        {id:3, value:3, label:'Revenue'},
        {id:4, value:4, label:'Expense'},
    ]
    const ValidationObj = yup.object().shape(
            Schema
        ).required();
    // const paymentSchemaObj = paymentAppointValidation
    
  const [editPage,setEditPage] = useState(false)
  const [dropdownArr,setDropdownArr] = useState(typeDummy)
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ValidationObj),
    defaultValues: {
        details:[{
            applicableTo:0,
            type:'',
            groupAccount:'',
            account:'',
            amount:0,
            remarks:''
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
  const { fields, append, remove } = useFieldArray({
    control:control,
    name: "details",
  });
let details = watch("details");
const [dateValues, setDateValues] = React.useState([new Date()]);
const [ledgerTableArr, setLedgerTableArr] = React.useState([]);

const validData = useRef(false)
const addToDetails = () => {
    for(let item of details){
        if(item.type == '' || item.type == null){
            validData.current = false
            break;
        }else if(item.groupAccount == '' || item.groupAccount == null){
            validData.current = false
            break;
        }else if(item.account == '' || item.account == null){
            validData.current = false
            break;
        }else if(item.amount == '' || item.amount == null){
            validData.current = false
            break;
        }else {
            validData.current = true
        }
        // if(item.remarks == '' || item.remarks == null){
        //     validData.current = false
        //     break;
        // }
    }
    if(validData.current) 
    {   
        let arr = [...dateValues]
        arr.push(new Date())
        setDateValues(arr)

    //             
        append({ 
            applicableTo:0,
            type:'',
            groupAccount:'',
            account:'',
            amount:0,
            remarks:''})

        validData.current = false
    } else {
        trigger(["details"])
    }
}

const deletaDetailsRow = (index) => {
    let arr = [...dateValues]
    arr.splice(index, 1);
    setDateValues(arr)

    remove(index)
}
const onSubmit = (data) => {
    console.log('data',data)
    console.log('date',dateValues)
}

const testvalidData = useRef(false)

const funcSetLedgerData = () => {
    for(let item of details){
        if(item.type == '' || item.type == null){
            testvalidData.current = false
            break;
        }else if(item.groupAccount == '' || item.groupAccount == null){
            testvalidData.current = false
            break;
        }else if(item.account == '' || item.account == null){
            testvalidData.current = false
            break;
        }else if(item.amount == '' || item.amount == null){
            testvalidData.current = false
            break;
        }else {
            testvalidData.current = true
        }
        // if(item.remarks == '' || item.remarks == null){
        //     validData.current = false
        //     break;
        // }
    }
    console.log('testvalidData.current',testvalidData.current)
    if(testvalidData.current){
        let arr = [...details]
        let ledgerArr = []
        for(let i=0 ;i<arr.length; i++){
            let dateIs = setdateFormat(dateValues[0])
            let obj = {
                Date:dateIs,
                Account:arr[i].account.label,
                Debit:null,
                Credit:null
            }
            
            let price = Number(arr[i].amount)
            if(arr[i].type.label == 'Debit'){
                obj.Debit = price
                obj.Credit = 0
            }else{
                obj.Credit = price
                obj.Debit = 0
            }

            ledgerArr.push(obj)

        }
        console.log('ledgerArr',ledgerArr)
        setLedgerTableArr(ledgerArr)
    }
}
useDidMountEffect(()=>{
    funcSetLedgerData()
},[details])


  return (
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Accounting Transactions Form 
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="" >
        <div className='w-full p-5'>
        <Grid container spacing={1} >
        {fields.map((item, index) =>{
            return(
                <>
                {
                    editPage ? '':(
                        <Grid item lg={0.8} sm={1} className=''>
                            <div className="flex px-4  my-auto h-full items-center ">
                                {details.length !== 1 && (
                                <RemoveOutlinedIcon
                                    className="my-auto rounded-full border-2 border-red-600"
                                    onClick={() => {
                                        deletaDetailsRow(index)
                                    }
                                    }
                                />
                                )}
                                {details.length - 1 === index && (
                                <AddOutlinedIcon
                                    className="my-auto mx-1  rounded-full border-2 border-cyan-600"
                                    onClick={addToDetails}
                                />
                                )}
                            </div>              
                        </Grid> )
                }
                   
                    
            <Grid item lg={editPage ? 12 : 11.2} sm={editPage ? 12 : 11} className=''>
                        
                    <Card
                        square={true}
                        elevation={1}
                        sx={{
                        backgroundColor:'#ffffff',
                        width: "100%",
                        p:3,
                        overflow:'visible'
                        }}
                    >
                    <Grid container spacing={1} >
                        {/* Balance Sheet Elements */}

            <Grid item lg={12}  sm={12} >
              <RadioField
                label="On Balance Sheet : - "
                name={`details.[${index}].applicableTo`}
                control={control}
                dataArray={BalanceSheetElements}
              />
            </Grid>
                        {/* Date */}

                        <Grid item lg={3} sm={4}>
                        <FormControl
                            sx={{
                                backgroundColor:'white'
                            }}
                            fullWidth
                            size="small"
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Purchase Date"
                                value={dateValues[index]}
                                inputProps={{ readOnly: true }}
                                onChange={(value) => {
                                let isValidDate = validateDate(value)
                                if(isValidDate){
                                    let arr = [...dateValues]
                                    arr[index] = value
                                    setDateValues(arr)
                                    funcSetLedgerData()
                                }
                                }}
                                renderInput={(props) => (
                                <TextField {...props} size="small"  sx={{
                                    svg: { color: "#0B83A5" },
                                }}/>
                                )}
                                name={`details.[${index}]date`}
                                defaultValue=""
                                inputFormat="dd/MM/yyyy"
                            />
                            </LocalizationProvider>

                            <FormHelperText style={{ color: "#d32f2f" }}>
                            {errors.details?.[index]?.dob?.message}
                            </FormHelperText>
                        </FormControl>
                        </Grid>
                        {/* type */}
                        <Grid item lg={1.5} sm={4}>
                            <DropdownField
                                control={control}
                                error={errors.details?.[index]?.type}
                                name={`details.[${index}].type`}
                                dataArray={dropdownArr}
                                placeholder="Type"
                                isSearchable={false}
                                inputRef={{...register(`details[${index}].type`,
                                {       onChange: (e) => {
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid>

                        {/* Group Account */}
                        <Grid item lg={3.5} sm={4}>
                            <DropdownField
                                control={control}
                                error={errors.details?.[index]?.groupAccount}
                                name={`details.[${index}].groupAccount`}
                                dataArray={dropdownArr}
                                placeholder="Group Account"
                                isSearchable={false}
                                inputRef={{...register(`details[${index}].groupAccount`,
                                {       onChange: (e) => {
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid>
                        {/* Account */}
                        <Grid item lg={2.5} sm={4}>
                            <DropdownField
                                control={control}
                                error={errors.details?.[index]?.account}
                                name={`details.[${index}].account`}
                                dataArray={dropdownArr}
                                placeholder="Account"
                                isSearchable={false}
                                inputRef={{...register(`details[${index}].account`,
                                {       onChange: (e) => {
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid>
                        {/* Quantity */}
                        {/* <Grid item lg={2.3} sm={4}>
                            <InputField
                                name={`details.[${index}].quantity`}
                                variant="outlined"
                                label="Quantity"
                                error={errors.details?.[index]?.quantity}
                                control={control}
                                inputRef={{...register(`details[${index}].quantity`,
                                {       onChange: (e) => {
                                            setRateTotal(index)
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid> */}
                        {/* amount */}
                        <Grid item lg={1.5} sm={4}>
                            <InputField
                                name={`details.[${index}].amount`}
                                variant="outlined"
                                label="Amount"
                                error={errors.details?.[index]?.amount}
                                control={control}
                                inputRef={{...register(`details[${index}].amount`,
                                {       onChange: (e) => {
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid>
                        {/* Remarks */}
                        <Grid item lg={8} sm={8}>
                            <InputField
                                name={`details.[${index}].remarks`}
                                variant="outlined"
                                label="Remarks"
                                error={errors.details?.[index]?.remarks}
                                control={control}
                                inputRef={{...register(`details[${index}].remarks`,
                                {       onChange: (e) => {
                                            funcSetLedgerData()
                                        },
                                })}}
                            />
                        </Grid>
                    </Grid>
                    </Card>
          
            </Grid>      
            </>)})
        }              
        </Grid>         
        {/* ledger component */}
        {
            ledgerTableArr && ledgerTableArr.length > 0 ? (
                <LedgerTable ledgerData={ledgerTableArr}/>
            ):''
        }
        <div className='flex justify-center w-full mt-6'>
            <Button 
                color='success'
                variant='contained'
                type='submit'
            >
                Submit
            </Button>
        </div>
        </div>      
        </form>   
    </div>
  )
}
