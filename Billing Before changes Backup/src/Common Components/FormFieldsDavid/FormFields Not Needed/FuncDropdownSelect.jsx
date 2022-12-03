import React, { useState } from 'react'
import { Controller } from "react-hook-form";
import {Autocomplete, Card, Box, Button, Grid, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import ReactSelect from "react-select";

const FuncDropdownSelect = ({control, 
    inputRef, 
    error, 
    options,
    name,
    label,handleChange, placeholder}) => {
    return (
    <FormControl   
                        fullWidth
                        size="small" >
            <Controller
                control={control}
                name={name}
                defaultValue={""}
                render = {({ field})=> (
                    <ReactSelect
                        {...field}
                        ref={null}
                        // inputRef={inputRef}
                        options={options}
                        label={label}
                        isClearable={false}
                        onChange={option => handleChange(option)}
                        placeholder={placeholder}
                        defaultValue={""}
                        isSearchable={false}
                    />
                )}
        />
        <FormHelperText style={{color:'#d32f2f'}}>
                            {error?.message}</FormHelperText>
                            
                        </FormControl>
                    
    )
}

export default FuncDropdownSelect