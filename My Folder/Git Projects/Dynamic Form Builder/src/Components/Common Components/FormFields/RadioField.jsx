import React from "react";
import {
  Card,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Controller } from "react-hook-form";
// space-x-2
const RadioField = ({ dataArray, name, label, control }) => {
  return (
    <FormControl className="">
      <div className="flex flex-row lg:flex-row flex-wrap">
        <FormLabel
          sx={{ color: "#000000", fontSize: "0.7rem" }}
          id="demo-radio-buttons-group-label"
          // className="mt-2"
        >
          {label}
        </FormLabel>
        <Controller
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={""}
              name={name}
              {...field}
              sx={{
                marginTop: "-0.3rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {dataArray.map((p) => (
                <FormControlLabel
                  key={name + p.id}
                  value={p.id}
                  control={<Radio size="small" />}
                  label={<Typography variant="body2 " className="w-full">{p.label}</Typography>}
                />
              ))}
            </RadioGroup>
          )}
          name={name}
          control={control}
          defaultValue={""}
        />
      </div>
    </FormControl>
  );
};

export default RadioField;
