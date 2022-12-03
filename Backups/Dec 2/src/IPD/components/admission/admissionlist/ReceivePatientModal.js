import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import {
  getNurseList,
  receivedPatient,
} from "../../../services/admissiondetails/admissionDetailsService";

const ReceivePatientModal = (props) => {
  const [nurseList, setNurseList] = useState();
  const [openDateTime, setOpenDateTime] = useState(false);

  const validationSchema = yup.object().shape({
    receivedBy: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Select Receiver Name"),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      receivedBy: null,
      receivedDateTime: new Date(),
    },
  });

  useEffect(() => {
    getNurseList()
      .then((response) => {
        setNurseList(response.data.result);
      })
      .catch((res) => {
        console.log("Error", res);
      });
  }, []);

  function onSubmit(data) {
    console.log("Data", data);
    // let receivedYear = data.receivedDateTime.getFullYear();
    // let receivedMonth = String(data.receivedDateTime.getMonth() + 1).padStart(
    //   2,
    //   "0"
    // );
    // let receivedDay = String(data.receivedDateTime.getDate()).padStart(2, "0");
    // let fullReceivedDate = [receivedYear, receivedMonth, receivedDay].join("-");
    let receivedHour = String(data.receivedDateTime.getHours()).padStart(
      2,
      "0"
    );
    let receivedMin = String(data.receivedDateTime.getMinutes()).padStart(
      2,
      "0"
    );
    let receivedSec = String(data.receivedDateTime.getSeconds()).padStart(
      2,
      "0"
    );
    let fullReceivedTime = [receivedHour, receivedMin, receivedSec].join(":");
    // let receivedDateTime = [fullReceivedDate, fullReceivedTime].join(" ");
    let admissionId;
    if (props.row.admissionId && props.row.admissionId !== null) {
      admissionId = props.row.admissionId;
    }
    let finalObj = {
      admissionId: admissionId,
      receivedBy: data.receivedBy.id,
      receivedTime: fullReceivedTime,
    };

    receivedPatient(finalObj)
      .then((response) => {
        if (response.data.statusCode === 200) {
          props.handleList();
          props.setOpenReceiveModal(false);
        }
      })
      .catch((res) => {
        console.log("Error");
      });
  }

  return (
    <div>
      <p className="text-lg font-semibold">Received Details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 my-4">
          <div>
            <DropdownField
              control={control}
              error={errors.receivedBy}
              name="receivedBy"
              label="Received By *"
              dataArray={nurseList}
              isSearchable={true}
              placeholder="Received By *"
              isClearable={false}
            />
          </div>
          <div>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    open={openDateTime}
                    onOpen={() => setOpenDateTime(true)}
                    onClose={() => setOpenDateTime(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        type="date"
                        variant="outlined"
                        label="Received At"
                        name="receivedDateTime"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        readOnly={true}
                        onClick={(e) => setOpenDateTime(true)}
                      />
                    )}
                    PopperProps={{ placement: "auto-end" }}
                    disableFuture
                    {...field}
                  />
                </LocalizationProvider>
              )}
              name="receivedDateTime"
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="h-10 px-3 mx-4 border border-customRed text-customRed rounded text-sm font-semibold"
            onClick={() => {
              props.setOpenReceiveModal(false);
            }}
          >
            Cancel
          </button>
          <button className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceivePatientModal;
