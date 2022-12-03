import React from 'react'
import { FormControl, FormControlLabel,  FormLabel,  Radio, RadioGroup } from '@mui/material'

import { Controller } from 'react-hook-form'

const RadioField = ({
    dataArray,
    name,
    label,
    control
  }) => {
  return (
    <FormControl className=''>
      <div className='flex flex-col lg:flex-row space-x-1 flex-wrap'>
      <FormLabel sx={{color: '#000000',}} id="demo-radio-buttons-group-label"  
        className='mt-2'> {label}</FormLabel>
      <Controller
            render={({ field }) => (
          <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={""}
              name={name}
              {...field}
              className='-space-x-1 -translate-x-2'
          >
              {dataArray.map((p,i) => (
                          <FormControlLabel className={i==0?'translate-x-4 ':''}   key={name + p.id} value={p.value} control={<Radio />} label={p.label} />
                          ))}
          </RadioGroup>
          )}
          name={name}
          control={control}
          defaultValue=""
      />
    </div>
    </FormControl>
  )
}

export default RadioField