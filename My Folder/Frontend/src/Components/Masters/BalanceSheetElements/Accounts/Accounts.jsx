import { Button, Grid } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import InputField from '../../../Common Components/FormFields/InputField';
import RadioField from '../../../Common Components/FormFields/RadioField';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Accounts() {
    let BalanceSheetElements = [
        {id:0, value:0, label:'Asset'},
        {id:1, value:1, label:'Liability'},
        {id:2, value:2, label:'Equity'},
        {id:3, value:3, label:'Revenue'},
        {id:4, value:4, label:'Expense'},
    ]
    const [dropdownArr,setDropdownArr] = useState([])
    const [editPage,setEditPage] = useState(false)

    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(ValidationObj),
        defaultValues: {
            accounts:[{title:''}],
            applicableTo: 0,
            remarks:'',
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
      name: "accounts",
    });
  let accounts = watch("accounts");

  const validData = useRef(false)

  const addToAccounts = () => {
    for(let item of accounts){
        if(item.title == '' || item.type == null){
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
    //             
        append({ 
            title:''})

        validData.current = false
    } else {
        trigger(["accounts"])
    }
}

const deleteAccountsRow = (index) => {
    remove(index)
}

    const onSubmit = (data) => {

    }
  return (
    <>
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Accounts
        </p>

        <div className='w-full p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5" >
            <Grid container spacing={1} >

                {/* on balance sheet By */}
                <Grid item lg={12}  sm={12} >
                <RadioField
                    label="On Balance Sheet : - "
                    name={`applicableTo`}
                    control={control}
                    dataArray={BalanceSheetElements}
                />
                </Grid>
                {/* Group Account */}
                <Grid item lg={5} sm={4}>
                    <DropdownField
                        control={control}
                        error={errors.groupAccount}
                        name={`groupAccount`}
                        dataArray={dropdownArr}
                        placeholder="Group Account"
                        isSearchable={false}
                        inputRef={{...register(`groupAccount`,
                        {       onChange: (e) => {
                                    // funcSetLedgerData()
                                },
                        })}}
                    />
                </Grid>
                {/* accounts arrays */}
        {fields.map((item, index) =>{
            return(
                <>
                {
                    editPage ? '':(
                        <Grid item lg={0.8} sm={1} className=''>
                            <div className="flex px-4  my-auto h-full items-center ">
                                {accounts.length !== 1 && (
                                <RemoveOutlinedIcon
                                    className="my-auto rounded-full border-2 border-red-600"
                                    onClick={() => {
                                        deleteAccountsRow(index)
                                    }
                                    }
                                />
                                )}
                                {accounts.length - 1 === index && (
                                <AddOutlinedIcon
                                    className="my-auto mx-1  rounded-full border-2 border-cyan-600"
                                    onClick={addToAccounts}
                                />
                                )}
                            </div>              
                        </Grid> )
                }
                        {/* Title */}
                        <Grid item lg={4} sm={4}>
                            <InputField
                                name={`accounts[${index}]title`}
                                variant="outlined"
                                label="Title"
                                error={errors.accounts?.[index]?.title}
                                control={control}
                            />
                        </Grid>
        </>)})
                }     
                {/* Remarks */}
                <Grid item lg={9} sm={4}>
                    <InputField
                        name={`remarks`}
                        variant="outlined"
                        label="Remarks"
                        error={errors.remarks}
                        control={control}
                        inputRef={{...register(`remarks`,
                        {       onChange: (e) => {
                                    
                                },
                        })}}
                    />
                </Grid>
            </Grid>

            <div className='w-full flex justify-center mt-4'>
                <Button
                    type='submit'
                    variant='contained'
                    color='success'>
                    Submit
                </Button>
            </div>
            </form>
        </div>
    </div>
    </>
  )
}
