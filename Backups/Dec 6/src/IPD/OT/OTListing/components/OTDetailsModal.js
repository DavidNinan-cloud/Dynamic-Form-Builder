import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OTDetails from "./OTDetails";
import SurgeryDetails from "./SurgeryDetails";
import InputField from "../../../../Common Components/FormFields/InputField";
import SurgeryNotes from "./SurgeryNotes";
import OTCAQI from "./OTCAQI";
import Equipments from "./Equipments";
import OTCheckList from "./OTCheckList";
import FileUpload from "./FileUpload";
import AnesthesiaNotes from "./AnesthesiaNotes";
import { SaveButton } from "../../../../Common Components/Buttons/CommonButtons";
import { OTDetailsModalSchema } from "./OTDetailsModalSchema";

const patientInfo = {
  patientName: "Venkata Narasimha Rajuvaripet",
  uhid: "123-000-3210",
  ipdNo: "IP/135433",
  gender: "Male",
  age: ": 23 Year 02 Months 04 Days",
  admDate: "01/02/2022",
  ward: "General Ward",
  bedCategory: "Semi Pvt. A/C",
  bedNo: 202,
  doctor: "Dr.Stephen Strange",
  opDate: "01/02/2022",
  opTime: "12.00 PM To 02.00 PM",
  opEstTime: "02.00 Hour",
  otTable: "Table No. 5",
  bookingNo: "65522",
};

const OTDetailsModal = (props) => {
  const [expandPanal1, setExpandPanal1] = useState(true);
  const handleChangePanal1 = () => {
    setExpandPanal1(!expandPanal1);
  };

  const [expandPanal2, setExpandPanal2] = useState(true);
  const handleChangePanal2 = () => {
    setExpandPanal2(!expandPanal2);
  };

  const [expandPanal3, setExpandPanal3] = useState(true);
  const handleChangePanal3 = () => {
    setExpandPanal3(!expandPanal3);
  };

  const [expandPanal4, setExpandPanal4] = useState(true);
  const handleChangePanal4 = () => {
    setExpandPanal4(!expandPanal4);
  };

  const [expandPanal5, setExpandPanal5] = useState(true);
  const handleChangePanal5 = () => {
    setExpandPanal5(!expandPanal5);
  };

  const [expandPanal6, setExpandPanal6] = useState(true);
  const handleChangePanal6 = () => {
    setExpandPanal6(!expandPanal6);
  };

  const [expandPanal7, setExpandPanal7] = useState(true);
  const handleChangePanal7 = () => {
    setExpandPanal7(!expandPanal7);
  };

  const [expandPanal8, setExpandPanal8] = useState(true);
  const handleChangePanal8 = () => {
    setExpandPanal8(!expandPanal8);
  };

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 20,
    py: 2,
    px: 2,
  };

  const defaultValues = {
    startTime: "",
    endTime: "",
    totalTime: "",
    emergency: false,
    theater: null,
    otTable: null,
    anesthesiaType: null,
    procedureType: null,
    otStatus: null,
    otResult: null,
    otType: null,
    otCategory: null,
    nurse: null,
    physician: null,
    remark: "",

    group: null,
    subGroup: null,
    theaterService: null,
    surgeryProcedure: null,
    surgeryRate: null,
    qty: "",
    drType: null,
    drName: null,
    drFees: null,
    employeeName: null,

    surgeonArrivalTime: "",
    anesthetistArrivalTime: "",
    patientArrivalTime: "",
    ADMAnesthesiaTime: "",
    wheelInTime: "",
    wheelOutTime: "",
    OTCleanStartTime: "",
    OTCleanEndTime: "",
    staffName: "",
    antibioticInWardTime: "",
    antibioticInOtTime: "",
    patientShiftTime: "",
    reason: "",

    aneshtesiaType: "",
    anesthesiaStartTime: "",
    anesthesiaEndTime: "",
    bloodPressure: "",
    pulse: "",
    respirationRate: "",
    condition: "",

    equipments: "",
    qty: "",

    fileUpload: null,
  };

  const schema = OTDetailsModalSchema;
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data) => {
    console.log("Data", data);
    // setOpen(true);
    // setFormData(data);
  };

  return (
    <>
      <div className="">
        <Modal open={props.openModal}>
          <Box sx={ModalStyle} className="h-[90%] max-h-[90%]">
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  methods.reset(defaultValues);
                }}
              />
            </div>
            <div className="m-5">
              <div className="text-lg font-semibold text-gray-700 ">
                OT Details
              </div>
              <div className="border bg-gray-100 border-gray-300 text-left w-full my-2 p-5">
                <div className="py-2 grid lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2 w-full lg:col-span-2 xl:col-span-1">
                    <span className="font-semibold w-28">Patient Name</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.patientName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">UHID</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.uhid}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28 2xl:w-24">IPD No.</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.ipdNo}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Gender</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.gender}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Age</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.age}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28 2xl:w-24">
                      ADM. Date
                    </span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.admDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Ward</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.ward}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Bed Category</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.bedCategory}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28 2xl:w-24">Bed No.</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.bedNo}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Doctor</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.doctor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Op. Date</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.opDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28 2xl:w-24">
                      Op. Time
                    </span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.opTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Op. Est. Time</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.opEstTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28">Ot Table</span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.otTable}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold w-28 2xl:w-24">
                      Booking No.
                    </span>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-700 font-normal">
                        {patientInfo.bookingNo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full gap-y-2">
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Accordion
                      expanded={expandPanal1}
                      onChange={handleChangePanal1}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">OT Details</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <OTDetails />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal2}
                      onChange={handleChangePanal2}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">Surgery Details</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <SurgeryDetails />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal3}
                      onChange={handleChangePanal3}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">Surgery Notes</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <SurgeryNotes />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal4}
                      onChange={handleChangePanal4}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">
                          Operation Theater Checklist And Quality Indicators
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <OTCAQI />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal5}
                      onChange={handleChangePanal5}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">Anesthesia Notes</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <AnesthesiaNotes />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal6}
                      onChange={handleChangePanal6}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">Equipments</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Equipments />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal7}
                      onChange={handleChangePanal7}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">OT Check List</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <OTCheckList />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expandPanal8}
                      onChange={handleChangePanal8}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          "&.Mui-expanded": {
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold text-lg">File Upload</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FileUpload />
                      </AccordionDetails>
                    </Accordion>
                    <div className="flex justify-end my-2">
                      <SaveButton />
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default OTDetailsModal;
