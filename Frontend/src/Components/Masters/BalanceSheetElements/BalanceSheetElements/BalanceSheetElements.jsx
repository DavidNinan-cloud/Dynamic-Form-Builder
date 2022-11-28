import { Button, Grid } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import InputField from '../../../Common Components/FormFields/InputField';

export default function BalanceSheetElements() {

    const [dropdownArr,setDropdownArr] = useState([])
    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(ValidationObj),
        defaultValues: {
            title:'',
            increaseBy:'',
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

    const onSubmit = (data) => {

    }
  return (
    <>
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Balance Sheet Elements 
        </p>

        <div className='w-full p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5" >
            <Grid container spacing={1} >
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
                {/* Increase By */}
                <Grid item lg={3} sm={4}>
                    <DropdownField
                        control={control}
                        error={errors.type}
                        name={`increaseBy`}
                        dataArray={dropdownArr}
                        placeholder="Increase By"
                        isSearchable={false}
                        inputRef={{...register(`increaseBy`,
                        {       onChange: (e) => {
                                    // funcSetLedgerData()
                                },
                        })}}
                    />
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
