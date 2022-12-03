import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Box } from "@mui/material";
import RadioField from "../Common Components/FormFields/RadioField";
import CancelPresentationIconButton from "../Common Components/Buttons/CancelPresentationIconButton";
import OpdRegisteredForm from "./OpdRegisteredForm";
import OpdEmergencyForm from "./OpdEmergencyForm";
import IpdRegisteredForm from "./IpdRegisterForm";
import IpdEmergencyForm from "./IpdEmergencyForm";
import SearchDropdown from "../Common Components/FormFields/searchDropdown";
import { autoSerachPatient } from "./services/emergencyservice/EmergencyServices";
import CommonBackDrop from "../Common Components/CommonBackDrop/CommonBackDrop";
import SearchBar from "../Common Components/FormFields/SearchBar";

export default function EmergencyModal(props) {
  const { populateTable } = props;
  const defaultValues = {
    patientInfo: null,
  };

  const opdIpd = [
    {
      id: "OPD",
      value: "OPD",
      label: "OPD",
    },
    {
      id: "IPD",
      value: "IPD",
      label: "IPD",
    },
  ];
  const resisteremergency = [
    {
      id: "Registered",
      value: "Registered",
      label: "Registered",
    },
    {
      id: "Emergency",
      value: "Emergency",
      label: "Emergency",
    },
  ];

  const [patientInfo, setPatientInfo] = React.useState(false); //hide show
  const [options, setOptions] = React.useState([]); // use for display options in searchbar
  const [patientData, setPatientData] = React.useState();
  const [patientInfoId, setPatientInfoId] = React.useState("");
  const [resetBtnFlag, setResetBtnFlag] = React.useState(false);
  const [resetIPDBtnFlag, setResetIPDBtnFlag] = React.useState(false);

  useEffect(() => {
    console.log("The incoming data is " + JSON.stringify(patientData));
  }, [patientData]);

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });

  //PatientInfo field reset in parent component
  useEffect(() => {
    console.log("resetBtnFlag value is ");
    console.log(resetBtnFlag);

    if (resetBtnFlag !== false) {
      setValue("patientInfo", null);
      setPatientData("");
      setPatientInfoId("");
    }
  }, [resetBtnFlag]);

  useEffect(() => {
    if (resetIPDBtnFlag === true) {
      setValue("patientInfo", null);
      setPatientData("");
      setPatientInfoId("");
    }
  }, [resetIPDBtnFlag]);

  let opdIpdVal = watch("opdIpd");
  let isEmergency = watch("isEmergency");
  useEffect(() => {
    console.log("opdIpd radio field is " + opdIpdVal);
    console.log("opdIpd radio field is " + isEmergency);

    // setValue("unit", null); // every condition unit fieldwas reset

    if (opdIpdVal === "OPD" && isEmergency === "Registered") {
      setValue("patientInfo", null);
      setPatientInfo("");
      setPatientData("");
    } else if (opdIpdVal === "IPD" && isEmergency === "Registered") {
      setValue("patientInfo", null);
      setPatientInfo("");
      setPatientData("");
    }
  }, [opdIpdVal, isEmergency]);

  useEffect(() => {
    setValue("opdIpd", "OPD");
    setValue("isEmergency", "Registered");
  }, []);

  const handleChange = (autoSearchString) => {
    console.log("search string in modal", autoSearchString);
    if (autoSearchString !== "" && autoSearchString !== null) {
      autoSerachPatient(autoSearchString).then((response) => {
        console.log(
          "The response of autoSearchString service is " +
            JSON.stringify(response)
        );

        let obj = response.data.result[0];

        console.log("The first element is ", obj);

        setOptions(response.data.result);
        setPatientInfo("");
      });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    setPatientInfo(true);
    setPatientData("");

    if (value !== null) {
      console.log("target value in the patientInfo", value);
      let PatientData = value;

      console.log("patient data", PatientData);
      setPatientData(value);
      setPatientInfoId(value.id);
    } else if (value === null) {
      setPatientInfo(false); //when we click on cross all patient info screen set false
    }
  };

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

  return (
    <>
      {/* Model and table name start */}
      <Modal
        open={props.open}
        onClose={() => {
          props.handleClose();
          props.setEdit(false);
          reset(defaultValues);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[100%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
              props.setEdit(false);
              reset(defaultValues);
            }}
          />

          <div className="row">
            <fieldset className="border border-gray-300 xl:px-2 mx-1 text-left rounded ">
              <legend className="md:mx-2 lg:px-2 py-2 font-bold text-gray-700">
                Emergency Patient Details
              </legend>

              {/* Radio Buttons 2 Patient Type */}
              <div className="flex gap-2 mx-2 mb-2 items-center">
                {(opdIpdVal === "OPD" && isEmergency === "Registered") ||
                (opdIpdVal === "IPD" && isEmergency === "Registered") ? (
                  <>
                    <div className="grid lg:w-2/5 mt-3">
                      <div className="hidden lg:block">
                        <SearchDropdown
                          control={control}
                          searchIcon={true}
                          isDisabled={false}
                          name="patientInfo"
                          label="Search by UHID/Name"
                          placeholder="Search by UHID/Name"
                          isMulti={false}
                          dataArray={options}
                          handleInputChange={handleChange}
                          onChange={autoSelectedValue}
                          inputRef={{
                            ...register("patientInfo", {
                              onChange: (e) => {
                                console.log(
                                  "The selected PatientName object is" +
                                    JSON.stringify(e)
                                );

                                setPatientInfo(true);
                                setPatientData(e);

                                if (e.target.value !== null) {
                                  console.log(
                                    "target value in the patientInfo",
                                    e.target.value
                                  );
                                  let PatientData = e.target.value;

                                  console.log("patient data", PatientData);
                                  setPatientData(e.target.value);
                                  setPatientInfoId(e.target.value.id);
                                }
                              },
                            }),
                          }}
                        />
                        {/* <SearchBar
                          name="patientInfo"
                          placeholder="Search by UHID/Name"
                          dataArray={options}
                          searchIcon={true}
                          handleInputChange={handleChange}
                          onChange={autoSelectedValue}
                        /> */}
                      </div>
                    </div>
                  </>
                ) : (
                  " "
                )}

                <fieldset className="border border-gray-300 w-full lg:w-52 text-left lg:px-2 rounded ">
                  <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                    Visit Type
                  </legend>
                  <div className="flex justify-center items-center">
                    <RadioField
                      label=""
                      name="opdIpd"
                      control={control}
                      dataArray={opdIpd}
                    />
                  </div>
                </fieldset>
                <fieldset className="border border-gray-300 w-full lg:w-72 text-left lg:px-2 rounded">
                  <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                    Patient Type
                  </legend>
                  <div className="flex justify-center items-center ">
                    <RadioField
                      label=""
                      name="isEmergency"
                      control={control}
                      dataArray={resisteremergency}
                    />
                  </div>
                </fieldset>
              </div>

              {(opdIpdVal === "OPD" && isEmergency === "Registered") ||
              (opdIpdVal === "IPD" && isEmergency === "Registered") ? (
                <>
                  <div className="grid px-2 w-full">
                    <div className="lg:hidden">
                      <SearchBar
                        name="patientInfo"
                        placeholder="Search by UHID/Name"
                        dataArray={options}
                        handleInputChange={handleChange}
                        onChange={autoSelectedValue}
                      />
                    </div>
                  </div>
                </>
              ) : (
                " "
              )}

              {opdIpdVal === "OPD" && isEmergency === "Registered" ? (
                <OpdRegisteredForm
                  patientData={patientData}
                  patientInfo={patientInfo}
                  // setPatientInfo={setPatientInfo}
                  patientInfoId={patientInfoId}
                  // setPatientData={setPatientData}
                  // setPatientInfoId={setPatientInfoId}
                  populateTable={props.populateTable}
                  setOpen={props.setOpen}
                  setOpenBackdrop={props.setOpenBackdrop}
                  setResetBtnFlag={setResetBtnFlag}
                />
              ) : null}

              {opdIpdVal === "OPD" && isEmergency === "Emergency" ? (
                <OpdEmergencyForm
                  patientInfoId={patientInfoId}
                  populateTable={props.populateTable}
                  setOpen={props.setOpen}
                  setOpenBackdrop={props.setOpenBackdrop}
                />
              ) : null}

              {opdIpdVal === "IPD" && isEmergency === "Registered" ? (
                <IpdRegisteredForm
                  patientData={patientData}
                  patientInfo={patientInfo}
                  patientInfoId={patientInfoId}
                  populateTable={props.populateTable}
                  setOpen={props.setOpen}
                  setOpenBackdrop={props.setOpenBackdrop}
                  setResetIPDBtnFlag={setResetIPDBtnFlag}
                />
              ) : null}

              {opdIpdVal === "IPD" && isEmergency === "Emergency" ? (
                <IpdEmergencyForm
                  patientInfoId={patientInfoId}
                  populateTable={props.populateTable}
                  setOpen={props.setOpen}
                  setOpenBackdrop={props.setOpenBackdrop}
                />
              ) : null}
            </fieldset>
            <CommonBackDrop openBackdrop={props.openBackdrop} />
          </div>
        </Box>
      </Modal>
    </>
  );
}
