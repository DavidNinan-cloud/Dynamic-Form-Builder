import React from 'react'
import {Card, Box, Button, Grid, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

const SelectField = ({
  inputRef,
  name,
  variant = "outlined",
  label,
  error,
  isFocus,
  fullWidth,
  size,
  questionTypes,
  
  control
}) => {
  // let helperText={error?.message};
  return (
    
    <div>
        <FormControl   
                        fullWidth
                        size="small" 
                        className="w-48">
                        <InputLabel  >{label}</InputLabel>
                        <Controller
                            render={({ field }) => (
                            <Select
                            
                            name={name}
                            label={label}
                            inputRef={inputRef}
                            // helperText={error?.message}
                            error={!!error?.message}
                            autoFocus={isFocus}
                            fullWidth={fullWidth}
                            size={size}
                            {...field}
                            // {...register("type", 
                            // {
                            //     onChange: (e) => {
                            //       templateTypeIs(e);
                            //     },
                                
                            // }
                            //   )}
                            >
                                {questionTypes.map(p => (
                                <MenuItem key={"Title-shared" + p.id} value={p.type}>
                                {p.name}
                                </MenuItem>
                                ))}
                            </Select>
                            )}
                            name={name}
                            control={control}
                            defaultValue=""
                        />
                            {/* <FormHelperText style={{color:'#d32f2f'}}>
                            {errors.type?.message}</FormHelperText> */}

                          <FormHelperText style={{color:'#d32f2f'}}>
                            {error?.message}</FormHelperText>
                            {/* {errors.type && <p className='text-red-500'>This is required</p>} */}
                    
                        </FormControl>
    </div>
  )
}

export default SelectField