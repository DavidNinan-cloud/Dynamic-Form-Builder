import React from 'react'
import { Controller } from "react-hook-form";
import { SingleSelect } from "react-select-material-ui";
import {Autocomplete, Card, Box, Button, Grid, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'

  
const UltimateSelect = ({control, 
    error, 
    options, name,
    label,
    isClearable,
    isSearchable,
    isCreatable}) => {

  return (
    <FormControl   
                        fullWidth
                        size="small" 
                        className="w-48">
            <Controller
                control={control}
                name={name}
                render = {({ field})=> (
                    <SingleSelect
                        {...field}
                        ref={null}
                        options={options}
                        label={label}
                        SelectProps={{
                        isClearable: {isClearable},
                        isSearchable: {isSearchable},
                        isCreatable: {isCreatable}
                        }} 
                        
                    />
                )}
        />
        <FormHelperText style={{color:'#d32f2f'}}>
                            {error?.message}</FormHelperText>
                            
                        </FormControl>
                    
    )
}

export default UltimateSelect