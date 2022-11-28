import React from 'react'
import { Controller } from 'react-hook-form'
import {Autocomplete, Card, Box, Button, Grid, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'

const AutocompleteField = ({options,
    setSelectedOption, control, errors,name,
    label}) => {
  return (
    <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                    setSelectedOption(item)
                  }}
                  value={value}
                  options={options}
                  getOptionLabel={(item) => (item.value ? item.value : "")}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.value === value.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
                      margin="normal"
                      variant="outlined"
                    
                      error={!!errors.item}
                      helperText={errors.item && "item required"}
                     // helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
  )
}

export default AutocompleteField