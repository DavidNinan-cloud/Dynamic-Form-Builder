import { TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import InputField from '../../../../Common Components/FormFields/InputField'

const AnesthesiaNotes = () => {

    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    const {
        control,
        formState: { errors },
        watch,
        register,
        setValue,
        reset,
      } = useFormContext();

      const handleTimeChange = (newValue) => {
        setTime(newValue);
      };
      const handleDateChange = (newValue) => {
        setDate(newValue);
      };

  return (
    <>
       <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <InputField name="anesthesiaType" label="Anesthesia Type" />
          </div>
          <div>
            <div className="flex gap-2">
              <div>
                <Controller
                  control={control}
                  name="anesthesiaStartTime"
                  defaultValue=""
                  render={({ field:{value,onChange} }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Start Time"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField size="small" {...params} 
                          error={errors.anesthesiaStartTime}
                          helperText={errors.anesthesiaStartTime?.message}
                          />
                        )}                       
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="anesthesiaEndTime"
                  defaultValue=""
                  render={({ field:{value,onChange} }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="End Time"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField size="small" {...params}
                          error={errors.anesthesiaEndTime}
                          helperText={errors.anesthesiaEndTime?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <InputField name="bloodPressure" label="Blood Pressure" />
            </div>
            <div>
              <InputField name="pulse" label="Pulse" />
            </div>
          </div>
          <div>
            <InputField name="respirationRate" label="Respiration Rate" />
          </div>
          <div className="col-span-2">
            <InputField name="condition" label="Condition" />
          </div>
        </div>
      </div>
    </>
  )
}

export default AnesthesiaNotes
