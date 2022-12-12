import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  TextField,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../../Common Components/Buttons/ApplyButton";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";

import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {
  getCategoryDropdown,
  fetchWorkOrdersList,
  getTestTypeDropdown,
} from "../../services/WorkOrderViewServices";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";

let current = new Date();

const CollectedTimeModal = (props) => {
  const {
    showCollectedTimeModal,
    setShowCollectedTimeModal,
    setBackdropOpen,
    setCheckedIsCollected,
  } = props;

  const formOptions = {
    // resolver: yupResolver(validationSchemaPatientDetails, validationSchemaContactDetails),
    mode: "onChange",
    defaultValues: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  let fromDate = watch("startDate");

  const onSubmit = (data, e) => {
    console.log("data", data);
    const { startDate, endDate, startTime, endTime } = data;
    let fromDateString = `${startDate.getFullYear()}-${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;

    let fromTimeString =
      String(startTime.getHours()).padStart(2, "0") +
      ":" +
      String(startTime.getMinutes()).padStart(2, "0") +
      ":" +
      String(startTime.getSeconds()).padStart(2, "0");

    console.log(fromDateString, fromTimeString);

    setShowCollectedTimeModal(false);
    setBackdropOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-4 shadow-xl bg-white">
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-2 pt-2">
              <div className="text-lg">Collection Date And Time</div>
              {/* <RiCloseCircleFill
                onClick={() => {
                  setShowFiltersModal(false);
                  setBackdropOpen(false);
                }}
                title="Close "
                color="#0B83A5"
                size={28}
                className="cursor-pointer"
              /> */}
              <CancelPresentationIcon
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setShowCollectedTimeModal(false);
                  setBackdropOpen(false);
                  setCheckedIsCollected(false);
                }}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="py-4 grid grid-cols-2 gap-2">
                <FormControl fullWidth error={Boolean(errors?.startDate)}>
                  <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            fullWidth
                            error={Boolean(errors?.startDate)}
                          />
                        )}
                        minDate={current}
                        inputProps={{ readOnly: true }}
                        // mask="____/__/__"
                        inputFormat="dd/MM/yyyy"
                      />
                    )}
                  />
                  <FormHelperText>{errors?.startDate?.message}</FormHelperText>
                </FormControl>

                <FormControl error={Boolean(errors?.startTime)}>
                  <Controller
                    control={control}
                    name={`startTime`}
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TimePicker
                        {...field}
                        label="Start Time"
                        inputProps={{ readOnly: true }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            fullWidth
                            error={Boolean(errors?.startTime)}
                          />
                        )}
                      />
                    )}
                  />
                  <FormHelperText>{errors?.startTime?.message}</FormHelperText>
                </FormControl>
              </div>
            </LocalizationProvider>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <ResetButton onClick={() => reset()} />
            <SaveButton />
          </div>
        </Box>
      </form>
    </div>
  );
};

export default CollectedTimeModal;
