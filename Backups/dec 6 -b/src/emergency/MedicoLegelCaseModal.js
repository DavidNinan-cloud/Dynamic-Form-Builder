import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Modal,
  Box,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import CancelPresentationIconButton from "../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../Common Components/CommonBackDrop/CommonBackDrop";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InputField from "../Common Components/FormFields/InputField";
import SaveAndPrintButton from "../Common Components/Buttons/SaveAndPrintButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  minHeight: "60%",
  // maxHeight: "80%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 20,
  py: 4,
  px: 2,
};

export default function MedicoLegelModal(props) {
  const schema = yup.object().shape({
    idMarks: yup.array().of(
      yup.object().shape({
        identificationMark: yup
          .string()
          .required("Please Add Identifiction Marks & Conditions")
          .min(1, "Add Aleast 1 Characters"),
      })
    ),
    broughtHospital: yup.array().of(
      yup.object().shape({
        personName: yup
          .string()
          .required("Please Add PersonName")
          .min(1, "Add Aleast 1 Characters"),
        address: yup
          .string()
          .required("Please Add Address")
          .min(1, "Add Aleast 1 Characters"),
        mobileNumber: yup
          .string()
          .required("Please Add Mobile Number")
          .min(1, "Add Aleast 1 Characters"),
      })
    ),
    // .min(1, "Please Add Education Details"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    idMarks: [{ identificationMark: "" }],
    broughtHospital: [{ personName: "", address: "", mobileNumber: "" }],
    expired: false,
  };

  const {
    setValue,
    trigger,
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [fromDate, setFromDate] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const current = new Date();

  const {
    fields: marksField,
    append: marksAppend,
    remove: marksRemove,
  } = useFieldArray({
    control,
    name: "idMarks",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "broughtHospital",
  });

  let expiredItems = watch("expired");
  console.log("expired items" + expiredItems);

  let identificationMarksInput = watch("idMarks");

  let broughtToHospital = watch("broughtHospital");

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      {/* Model and table name start */}
      <Modal
        open={props.open}
        onClose={() => {
          props.handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[90%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.close();
              reset(defaultValues);
            }}
          />

          <div className="row">
            <form
              className="grid grid-cols-1 w-full md:px-3 lg:px-0 py-2"
              onSubmit={handleSubmit(onSubmitDataHandler)}
            >
              <fieldset className="border border-gray-300 px-4 xl:px-4 py-1  text-left rounded ">
                <legend className="md:mx-2 lg:px-2 py-2 font-bold text-gray-700">
                  Medico Legal Case Information
                </legend>

                <div className="flex space-x-3 items-center">
                  <input
                    type="checkbox"
                    {...register("expired")}
                    name="expired"
                    value="true"
                    className="w-5 h-5"
                  />
                  <label className="text-black font-semibold">Expired</label>
                </div>
                <div>
                  <h1 className="text-lg text-black font-semibold">
                    Identification Mark
                  </h1>
                  {marksField.map((item, index) => (
                    <div className=" py-2 w-full  gap-2 ">
                      <div className="flex  w-full gap-4">
                        <div className="w-[48.5%] lg:w-4/12">
                          <InputField
                            name={`idMarks[${index}].identificationMark`}
                            variant="outlined"
                            label="Identification Mark"
                            error={errors.idMarks?.[index]?.identificationMark}
                            control={control}
                          />
                        </div>

                        <div className="flex gap-2">
                          {marksField.length !== 1 && (
                            <RemoveOutlinedIcon
                              className="mt-2 rounded-full border-2 border-red-600"
                              onClick={() => {
                                marksRemove(index);
                                if (
                                  index !==
                                  identificationMarksInput.length - 1
                                ) {
                                  for (
                                    let i = index;
                                    i < identificationMarksInput.length - 1;
                                    i++
                                  ) {
                                    setValue(
                                      `idMarks[${i}].identificationMark`,
                                      identificationMarksInput[i + 1]
                                        .identificationMark
                                    );
                                  }
                                }
                              }}
                            />
                          )}
                          {marksField.length - 1 === index && (
                            <AddOutlinedIcon
                              className="mt-2 mx-1 rounded-full border-2 border-cyan-600"
                              onClick={(index) => {
                                console.log(
                                  "Identification Mark error",
                                  !errors.idMarks
                                );
                                let idMarks = "";
                                identificationMarksInput.map((item) => {
                                  idMarks = item.identificationMark;
                                });
                                if (idMarks !== "" && !errors.idMarks) {
                                  marksAppend({
                                    identificationMark: "",
                                  });
                                } else {
                                  trigger("idMarks");
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className="text-lg text-black font-semibold">
                    Brought to Hospital
                  </h1>
                  <div>
                    <ul>
                      {fields.map((item, index) => (
                        <div className="grid py-2 w-full  gap-2 ">
                          <div className="grid grid-cols-2 lg:grid-cols-4  w-full gap-4">
                            <div className="">
                              <InputField
                                name={`broughtHospital[${index}].personName`}
                                variant="outlined"
                                label="Person Name"
                                error={
                                  errors.broughtHospital?.[index]?.personName
                                }
                                control={control}
                              />
                            </div>
                            <div className="">
                              <InputField
                                name={`broughtHospital[${index}].address`}
                                variant="outlined"
                                label="Address"
                                error={errors.broughtHospital?.[index]?.address}
                                control={control}
                              />
                            </div>
                            <div className="">
                              <InputField
                                name={`broughtHospital[${index}].mobileNumber`}
                                variant="outlined"
                                label="Mobile Number"
                                error={
                                  errors.broughtHospital?.[index]?.mobileNumber
                                }
                                control={control}
                              />
                            </div>

                            <div className="flex gap-2">
                              {fields.length !== 1 && (
                                <RemoveOutlinedIcon
                                  className="mt-2 rounded-full border-2 border-red-600"
                                  onClick={() => {
                                    remove(index);
                                    if (
                                      index !==
                                      broughtToHospital.length - 1
                                    ) {
                                      for (
                                        let i = index;
                                        i < broughtToHospital.length - 1;
                                        i++
                                      ) {
                                        setValue(
                                          `broughtHospital[${i}].personName`,
                                          broughtToHospital[i + 1].personName
                                        );
                                        setValue(
                                          `broughtHospital[${i}].address`,
                                          broughtToHospital[i + 1].address
                                        );
                                        setValue(
                                          `broughtHospital[${i}].mobileNumber`,
                                          broughtToHospital[i + 1].mobileNumber
                                        );
                                      }
                                    }
                                  }}
                                />
                              )}
                              {fields.length - 1 === index && (
                                <AddOutlinedIcon
                                  className="mt-2 mx-1 rounded-full border-2 border-cyan-600"
                                  onClick={(index) => {
                                    console.log(
                                      "Identification Mark error",
                                      !errors.broughtHospital
                                    );
                                    let broughtHospital = "";
                                    broughtToHospital.map((item) => {
                                      broughtHospital = item.personName;
                                      broughtHospital = item.address;
                                      broughtHospital = item.mobileNumber;
                                    });
                                    if (
                                      broughtHospital !== "" &&
                                      !errors.broughtHospital
                                    ) {
                                      append({
                                        personName: "",
                                        address: "",
                                        mobileNumber: "",
                                      });
                                    } else {
                                      trigger("broughtHospital");
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className=" w-full text-lg text-black font-medium items-center ">
                  <FormControl className="w-full">
                    <label className="text-lg text-black font-semibold">
                      Is Being
                    </label>

                    <RadioGroup
                      className="w-full"
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <div className="grid grid-cols-4 gap-2 w-full">
                        <FormControlLabel
                          value="Treated"
                          control={<Radio name="Treated" />}
                          label="Treated"
                        />
                        <FormControlLabel
                          value="Discharged"
                          control={<Radio name="Discharged" />}
                          label="Discharged"
                        />
                        <FormControlLabel
                          value="LAMA"
                          control={<Radio name="LAMA" />}
                          label="LAMA"
                        />
                        <FormControlLabel
                          value="OPD"
                          control={<Radio name="OPD" />}
                          label="OPD"
                        />
                        <div className="col-span-4 lg:col-span-2 flex space-x-2 items-center">
                          <FormControlLabel
                            value="IPD"
                            control={<Radio name="IPD" />}
                            label="IPD"
                          />
                          <InputField
                            name="wardNo"
                            variant="outlined"
                            label="Ward.No"
                            error={errors.wardNo}
                            control={control}
                          />
                        </div>
                        <div className="col-span-4 lg:col-span-2 flex space-x-2 items-center">
                          <FormControlLabel
                            value="referredToHospital"
                            control={<Radio name="referredToHospital" />}
                            className="whitespace-nowrap"
                            label="Referred to Hospital"
                          />
                          <InputField
                            name="referredToHospital"
                            variant="outlined"
                            label="Referred Hospital Name"
                            error={errors.referredToHospital}
                            control={control}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
                {expiredItems === "true" ? (
                  <div>
                    <h1 className="font-semibold text-lg  ">Expired</h1>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2 w-full">
                      <div className="w-full ">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Date"
                            name="date"
                            value={new Date()}
                            onChange={(newValue) => {
                              setFromDate(newValue);
                            }}
                            // readOnly={true}
                            renderInput={(params) => (
                              <TextField
                                className="bg-white"
                                fullWidth
                                size="small"
                                {...params}
                                sx={{
                                  svg: { color: "#0B83A5" },
                                }}
                                isDisabled
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="w-full">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopTimePicker
                            label=" Time"
                            name="time"
                            value={new Date().toJSON()}
                            onChange={(newValue) => {
                              setToTime(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                className="bg-white"
                                fullWidth
                                size="small"
                                {...params}
                                sx={{
                                  svg: { color: "#0B83A5" },
                                }}
                                isDisabled
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </div>

                      <div>
                        <InputField
                          name="remark"
                          variant="outlined"
                          label="Remark"
                          error={errors.remark}
                          control={control}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <h1 className="font-semibold text-lg  ">
                    Admission Date And Time
                  </h1>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2 w-full">
                    <div className="w-full ">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Date"
                          name="date"
                          value={new Date()}
                          onChange={(newValue) => {
                            setFromDate(newValue);
                          }}
                          // readOnly={true}
                          renderInput={(params) => (
                            <TextField
                              className="bg-white"
                              fullWidth
                              size="small"
                              {...params}
                              sx={{
                                svg: { color: "#0B83A5" },
                              }}
                              isDisabled
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="w-full">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopTimePicker
                          label=" Time"
                          name="time"
                          value={new Date().toJSON()}
                          onChange={(newValue) => {
                            setToTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              className="bg-white"
                              fullWidth
                              size="small"
                              {...params}
                              sx={{
                                svg: { color: "#0B83A5" },
                              }}
                              isDisabled
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-span-3 lg:col-span-1">
                      <FormControl>
                        <div className=" flex space-x-3 items-center">
                          <label className="font-semibold text-lg ">
                            MLR attached &nbsp;:
                          </label>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                          >
                            <div className="flex space-x-3 items-center">
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid gap-2">
                  <InputField
                    name="diagnosis"
                    variant="outlined"
                    label="Diagnosis"
                    error={errors.diagnosis}
                    control={control}
                  />
                  <InputField
                    name="grievous"
                    variant="outlined"
                    label="Grievous hurt/head injury/burns"
                    error={errors.grievous}
                    control={control}
                  />
                </div>
                <div className="flex justify-end my-2">
                  <SaveAndPrintButton />
                </div>
              </fieldset>
            </form>
            <CommonBackDrop openBackdrop={props.openBackdrop} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
