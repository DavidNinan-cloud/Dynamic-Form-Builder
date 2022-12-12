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

const RadioField = ({ dataArray, name, label, control }) => {
  return (
    <FormControl className="">
      <div className="flex flex-col lg:flex-row space-x-2 flex-wrap">
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
                  label={<Typography variant="body2">{p.label}</Typography>}
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
