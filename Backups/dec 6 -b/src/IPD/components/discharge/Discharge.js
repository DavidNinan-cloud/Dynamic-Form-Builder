import { TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";

const Discharge = (props) => {
  const [selectedPatient, setSelectedPatient] = React.useState();
  const [admissionId, setAdmissionId] = React.useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm({
    // resolver: yupResolver(),
    defaultValues: {
      isTentativeDischarge: false,
      disDoctor: null,
      disType: null,
      disDestination: null,
      dischargeDate: new Date(),
      dischargeTime: new Date(),
      remark: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Data", data);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="font-semibold text-lg text-gray-700 ml-2 lg:ml-1 lg:px-2 md:px-2">
            Patient Discharge
          </h1>
          <div className="-mt-2">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.setOpenDischargeModal(false);
              }}
            />
          </div>
        </div>
        {admissionId !== null ? (
          <fieldset
            className="border border-gray-300 col-span-3 w-full lg:py-0
               text-left lg:px-2 md:p-2 rounded bg-gray-100"
          >
            <div className=" grid  lg:grid-cols-4 2xl:grid-cols-4 gap-y-1 gap-x-2 px-3 ">
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Patient Name</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.patientName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">UHID</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.uhid}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">ADM Date</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.admissionDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">ADM No.</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.admissionNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Gender</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.gender}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Age</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.age}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Department</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.department}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Doctor</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.doctor}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Ward</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.ward}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Room No.</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.roomNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Bed Category</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.bedCategory}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full col-span-2 xl:col-span-1 font-semibold text-sm py-1">
                <span className=" font-semibold w-28">Bed No.</span>
                <div className="flex space-x-2 items-center">
                  <span>:</span>
                  <span className="text-gray-700 font-normal">
                    {selectedPatient && selectedPatient.bedNumber}
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        ) : (
          ""
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <div>
            <CheckBoxField
              control={control}
              name="isTentativeDischarge"
              label="Tentative Discharge"
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.disDoctor}
              name="disDoctor"
              label="Discharging Doctor*"
              //   dataArray={doctors}
              placeholder="Discharging Doctor*"
              isClearable={false}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.disType}
              name="disType"
              label="Discharge Type*"
              //   dataArray={doctors}
              placeholder="Discharge Type*"
              isClearable={false}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.disDestination}
              name="disDestination"
              label="Discharge Destination*"
              //   dataArray={doctors}
              placeholder="Discharge Destination*"
              isClearable={false}
            />
          </div>

          <div>
            <Controller
              control={control}
              defaultValue={new Date()}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    open={openDate}
                    onOpen={() => setOpenDate(true)}
                    onClose={() => setOpenDate(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        type="date"
                        variant="outlined"
                        label="Discharge Date"
                        name="dischargeDate"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        onClick={(e) => setOpenDate(true)}
                      />
                    )}
                    inputFormat="dd/MM/yyyy"
                    disableFuture
                    disablePast
                    {...field}
                    onAccept={(e) => {
                      // getNewRegDate(e);
                    }}
                    error={Boolean(errors.dischargeDate)}
                    helperText={errors.dischargeDate?.message}
                  />
                </LocalizationProvider>
              )}
              name="dischargeDate"
            />
          </div>

          <div>
            <Controller
              control={control}
              defaultValue={new Date()}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    open={openTime}
                    onOpen={() => setOpenTime(true)}
                    onClose={() => setOpenTime(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        type="date"
                        variant="outlined"
                        label="Discharge Time"
                        name="dischargeTime"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        onClick={(e) => setOpenTime(true)}
                      />
                    )}
                    {...field}
                    onAccept={(e) => {
                      // getNewRegDate(e);
                    }}
                    error={Boolean(errors.dischargeTime)}
                    helperText={errors.dischargeTime?.message}
                  />
                </LocalizationProvider>
              )}
              name="dischargeTime"
            />
          </div>

          <div className="col-span-2">
            <InputField
              name="remark"
              variant="outlined"
              label="Remark"
              error={errors.remark}
              control={control}
              inputProps={{ maxLength: 100 }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Discharge;
