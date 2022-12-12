import React, { useEffect, useState, useRef } from "react";
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
  Backdrop,
  Typography,
} from "@mui/material";
import CloseButton from "../../../../Common Components/Buttons/CloseButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../../Common Components/Buttons/ApplyButton";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PropTypes from "prop-types";
import {
  getTestEntryDetails,
  saveTestEntryDetails,
} from "../../services/ReportDetailsServices";
import ResultEntryTable from "./ResultEntryTable";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  warningAlert,
  successAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import { useMutation } from "@tanstack/react-query";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import IsTemplate from "./IsTemplate";
import IsCultureTest from "./IsCultureTest";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import AuthorizationCodeModal from "./AuthorizationCodeModal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ReportDetailsModal = (props) => {
  let loggedUserObj = {};
  let submitParametersObj;
  // let writerContent = "";
  const {
    showReportDetailsModal,
    setShowReportDetailsModal,
    setBackdropOpen,
    scheduleData,
  } = props;
  const [authObj, setAuthObj] = React.useState({});

  const [spinner, showSpinner] = useState(false);
  const [writerContent, setWriterContent] = useState("");
  const [finalData, setFinalData] = React.useState({});
  const [countClick, setCountClick] = React.useState(0);
  const [reportEntryDetails, setReportEntryDetails] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const [showAuthCodeModal, setShowAuthCodeModal] = React.useState(false);
  const [backdropOpenAuth, setBackdropOpenAuth] = React.useState(false);

  const [contentError, setContentError] = useState("");
  const [authArr, setAuthArr] = useState([]);
  const [initiateAuth, setInitiateAuth] = useState();

  const [openPost, setOpenPost] = React.useState(false);

  const [categoryOptions, setCategoryOptions] = React.useState([]);

  const [testTypeOptions, setTestTypeOptions] = React.useState([]);

  const formOptions = {
    // resolver: yupResolver(validationSchemaPatientDetails, validationSchemaContactDetails),
    mode: "onChange",
    defaultValues: {},
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const getTestEntryDetailsData = (investigationId) => {
    showSpinner(true);
    getTestEntryDetails(investigationId)
      .then((response) => {
        console.log(
          "The list of all the report entry details are as follows" + response
        );

        console.log(JSON.stringify(response));
        console.log(response.data.result);
        let myObj = JSON.parse(response.data.result);
        console.log("myObj", myObj);
        setReportEntryDetails({ ...myObj });

        setPatientDetails(myObj.patientdetails);
        showSpinner(false);
        console.log("reportEntryDetails", reportEntryDetails);
        console.log("patientDetails", patientDetails);
      })
      .catch((error) => {
        console.log(error);
        showSpinner(false);
      });
  };

  const addRecord = () => {
    console.log("A new record has been added");
    if (countClick === 0) {
      setCountClick(countClick + 1);
      saveTestEntryDetailsData(finalData);
    }
  };

  useEffect(() => {
    if (authArr) {
      console.log("authArr", authArr);
    }
  }, [authArr]);

  useEffect(() => {
    loggedUserObj = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("loggedUserObj", loggedUserObj);
    setAuthObj({
      authLevel: loggedUserObj.authorityLevel,
      empName: loggedUserObj.firstName + " " + loggedUserObj.lastName,
      empId: loggedUserObj.employeeId,
    });
  }, []);

  const onSubmitResultEntryTable = (data) => {
    console.log("Data", data);
    console.log("authArr", authArr);
    console.log("patientDetails", patientDetails);
    let valuesArr = [];

    data.reportDetails.map((item) => {
      valuesArr.push(Number(item.reportValues));
    });
    console.log("valuesArr", valuesArr);

    let detailsArr = [];
    let detailsArrFinal = [];
    let myObj;
    reportEntryDetails.parameterslist.map((item, index) => {
      myObj = {
        normalRange: item.normalRange,
        parameterName: item.parameterName,
        reportValue: valuesArr[index],
        subtestName: item.subtestName,
      };
      detailsArr.push(myObj);
    });

    console.log("detailsArr", detailsArr);
    console.log("detailsArrFinal", detailsArrFinal);
    submitParametersObj = {
      authorizationDetails: [...authArr],
      patientInvestigation: {
        id: scheduleData.investigationId,
      },
      footnote: data.footNote,
      isCultureTest: reportEntryDetails?.isculturetest,
      isReportTemplate: reportEntryDetails?.isreport,

      // patientInfo: {
      //   id: patientDetails.id,
      // },
      reportValuesList: [...detailsArr],
      suggestions: data.suggestionNote,
      templateData: null,
      organismList: null,
    };

    console.log("submitParametersObj", submitParametersObj);
    // setOpenPost(true);
    // setFinalData(submitParametersObj);
  };

  const onSubmitTemplateData = (data) => {
    console.log("Data", data);
    console.log("writerContent", writerContent);
    // writerContent = writerContent.replaceAll('"', "'");
    setWriterContent(writerContent.replaceAll('"', "'"));

    if (writerContent.length === 0) {
      console.log("The writer content should not be empty");
      setContentError("The content cannot be empty");
    } else if (writerContent.length !== 0) {
      setContentError("");
    }
    let Obj = {
      authorizationDetails: authArr.length > 0 ? [...authArr] : [],
      patientInvestigation: {
        id: scheduleData.investigationId,
      },
      isCultureTest: reportEntryDetails?.isculturetest,
      isReportTemplate: reportEntryDetails?.isreport,
      footnote: data.footNote,
      // patientInfo: {
      //   id: patientDetails.id,
      // },
      reportValuesList: null,
      suggestions: data.suggestionNote,

      templateData: {
        filmSize: null,
        gender: null,
        noOfFilms: null,
        radiologist: null,
        reportType: null,
        template: null,
        templateData: writerContent ? writerContent : null,
      },
      organismList: null,
    };

    console.log("Obj", Obj);
    setOpenPost(true);
    setFinalData(Obj);
  };

  const onSubmitFinalParametersData = () => {
    console.log("submitParametersObj", submitParametersObj);
    setOpenPost(true);
    setFinalData(submitParametersObj);
  };

  const { mutate: saveTestEntryDetailsData } = useMutation(
    saveTestEntryDetails,
    {
      onSuccess: (response) => {
        console.log("RESP", response.data.statusCode);
        if (response.data.statusCode === 302) {
          warningAlert(response.data.message);
        } else if (response.status === 200) {
          setCountClick(0);
          handleClosePost();
          // getTestEntryDetailsData(scheduleData.orderTestId);
          successAlert(response.data.message);

          setBackdropOpen(false);
          setShowReportDetailsModal(false);
        } else if (response.data.statusCode === 401) {
          warningAlert(response.data.message);
        }
      },
    },
    {
      onError: (err) => {
        setCountClick(0);
        handleClosePost();
        errorAlert(err.data.message);
      },
    }
  );

  useEffect(() => {
    if (scheduleData) {
      getTestEntryDetailsData(scheduleData.investigationId);
      console.log("scheduleData", scheduleData);
    }
  }, []);

  // const onSubmit = (data, e) => {
  //   console.log("data", data);
  // };

  return (
    <form>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl bg-white w-5/6 h-full rounded-md overflow-scroll">
        <div className="-mt-3">
          <div className="flex items-center justify-between pb-2 pt-2">
            <div className="text-xl text-gray-700">Report Entry</div>

            <CancelPresentationIcon
              className="cursor-pointer text-red-500"
              onClick={() => {
                setShowReportDetailsModal(false);
                setBackdropOpen(false);
              }}
            />
          </div>
          <div className="space-y-2 mb-2">
            {spinner ? (
              <div className="grid justify-center">
                <LoadingSpinner />
              </div>
            ) : null}
            {patientDetails && (
              <div className="row">
                <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 border bg-slate-100 p-2 rounded-md">
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2 md:col-span-1">
                    <span className="font-semibold">Patient Name :</span>
                    <span className="text-gray-500">
                      {patientDetails.patientname}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                    <span className="font-semibold">UHID :</span>
                    <span className="text-gray-500">
                      {patientDetails.uhidno}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                    <span className="font-semibold">Sample No :</span>
                    <span className="text-gray-500">
                      {patientDetails.sampleno}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                    <span className="font-semibold">Doctor Name :</span>
                    <span className="text-gray-500">
                      {patientDetails.doctorname}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                    <span className="font-semibold">OPD No :</span>
                    <span className="text-gray-500">40134</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        Collection Date Time :
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {patientDetails.samplecollectiondateandtime}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!scheduleData.isCultureTest &&
              !scheduleData.isTemplate &&
              reportEntryDetails && (
                <div className="flex flex-col h-full">
                  <ResultEntryTable
                    scheduleData={scheduleData}
                    reportEntryDetails={reportEntryDetails}
                    onSubmitResultEntryTable={onSubmitResultEntryTable}
                    authArr={authArr}
                    setAuthArr={setAuthArr}
                    initiateAuth={initiateAuth}
                    setInitiateAuth={setInitiateAuth}
                    authObj={authObj}
                    setAuthObj={setAuthObj}
                  />
                  <fieldset
                    disabled={
                      reportEntryDetails &&
                      reportEntryDetails?.authorizationLevel &&
                      reportEntryDetails?.authorizationLevel ===
                        authObj.authLevel
                        ? false
                        : true
                    }
                  >
                    <div className="flex items-center space-x-2 justify-end my-2">
                      <CloseButton />

                      <button
                        type="button"
                        onClick={onSubmitFinalParametersData}
                        className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </fieldset>
                </div>
              )}

            {!scheduleData.isCultureTest && scheduleData.isTemplate && (
              <IsTemplate
                reportEntryDetails={reportEntryDetails}
                scheduleData={scheduleData}
                patientDetails={patientDetails}
                setOpenPost={setOpenPost}
                setFinalData={setFinalData}
                onSubmit={onSubmitTemplateData}
                writerContent={writerContent}
                setWriterContent={setWriterContent}
                contentError={contentError}
                authArr={authArr}
                setAuthArr={setAuthArr}
                initiateAuth={initiateAuth}
                setInitiateAuth={setInitiateAuth}
                authObj={authObj}
              />
            )}

            {scheduleData.isCultureTest && (
              <IsCultureTest
                reportEntryDetails={reportEntryDetails}
                scheduleData={scheduleData}
                patientDetails={patientDetails}
                setOpenPost={setOpenPost}
                setFinalData={setFinalData}
                writerContent={writerContent}
                setWriterContent={setWriterContent}
                contentError={contentError}
                setContentError={setContentError}
                authArr={authArr}
                setAuthArr={setAuthArr}
                initiateAuth={initiateAuth}
                setInitiateAuth={setInitiateAuth}
                authObj={authObj}
                setAuthObj={setAuthObj}
              />
            )}
          </div>
        </div>

        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </Box>
    </form>
  );
};

export default ReportDetailsModal;
