import { Button, Grid } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import InputField from '../../../Common Components/FormFields/InputField';
import CheckBoxField from '../../../Common Components/FormFields/CheckBoxField';
import RadioField from '../../../Common Components/FormFields/RadioField';

export default function AccountsGroup() {
    let BalanceSheetElements = [
        {id:0, value:0, label:'Asset'},
        {id:1, value:1, label:'Liability'},
        {id:2, value:2, label:'Equity'},
        {id:3, value:3, label:'Revenue'},
        {id:4, value:4, label:'Expense'},
    ]
    const [dropdownArr,setDropdownArr] = useState([])
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(ValidationObj),
        defaultValues: {
            title:'',
            applicableTo: 0,
            remarks:'',
            itselfAccount:false
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

    
    const onSubmit = (data) => {

    }
  return (
    <>
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Group Accounts Creation 
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
                 {/* TITLE */}
                 <Grid item lg={6} sm={4}>
                    <InputField
                        name={`title`}
                        variant="outlined"
                        label="Title"
                        error={errors.title}
                        control={control}
                        inputRef={{...register(`title`,
                        {       onChange: (e) => {
                                    
                                },
                        })}}
                    />
                </Grid>

                {/* Itself Account */}
                <Grid item lg={3} sm={4}>

                    <div className=" w-full pl-4">
                    <CheckBoxField
                        control={control}
                        name="itselfAccount"
                        label="Itself Account"
                    />
                    </div>
                </Grid>
                
                {/* Remarks */}
                <Grid item lg={6} sm={4}>
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
