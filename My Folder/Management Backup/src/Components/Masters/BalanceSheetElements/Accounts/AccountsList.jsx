import { Button, Card, Grid } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import SearchBar from '../../../Common Components/FormFields/SearchBar';
import { useNavigate } from 'react-router-dom';
export default function AccountsList() {

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

  const navigate = useNavigate();

  const fnAddElement = () => {
    navigate(`/balance-sheet/accounts-form`)
  }
  return (
    <>
    <div className='min-h-screen bg-slate-100 pt-4'>
        <p className="text-xl font-semibold tracking-wide mx-4 w-full text-center">Accounts List 
        </p>

        <div className='w-full p-5'>
            <Grid container spacing={1} >
                {/* Searchbar */}
                <Grid item lg={4} sm={4} className="z-50">
                    <SearchBar
                    name="inputSearch"
                    placeholder="Search by Account Name"
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
                {/* On Balance Sheet */}
                <Grid item lg={3} sm={4}>
                    <DropdownField
                        control={control}
                        error={errors.onBalanceSheet}
                        name={`onBalanceSheet`}
                        dataArray={dropdownArr}
                        placeholder="On Balance Sheet"
                        isSearchable={false}
                        inputRef={{...register(`onBalanceSheet`,
                        {       onChange: (e) => {
                                    // funcSetLedgerData()
                                },
                        })}}
                    />
                </Grid>
                {/* Group Account */}
                <Grid item lg={4} sm={4}>
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
                {/* Search Button */}
                <Grid item lg={1}  sm={1} className='flex justify-end'>
                    <Button 
                        variant='contained'>
                        Search
                    </Button>
                </Grid>

                
            </Grid>

            <Grid container spacing={1} sx={{marginTop:'0.75rem'}}>
                {/* empty space */}

                <Grid item lg={10} sm={4} className='flex justify-end'>
                </Grid>
                {/* Add button */}
                <Grid item lg={2} sm={4} className='flex justify-end'>
                    <Button 
                        className='w-fit'
                        color='warning'
                        variant='contained'
                        onClick={fnAddElement}
                        >

                        Add Account
                    </Button>
                </Grid>
            </Grid>
        </div>
    </div>
    </>
  )
}
