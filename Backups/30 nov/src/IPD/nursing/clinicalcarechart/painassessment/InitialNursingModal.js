import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Style } from "../../../../IPD/components/bedallowcation/Style";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import PatientInformation from "./initialnursingtabs/PatientInformation";
import PatientFallAssessment from "./initialnursingtabs/PatientFallAssessment";
import PatientVulnerabilityCriteria from "./initialnursingtabs/PatientVulnerabilityCriteria";
import BedScoreAssessment from "./initialnursingtabs/BedScoreAssessment";
import NursingSynopsis from "./initialnursingtabs/NursingSynopsis";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";

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

function InitialNursingModal(props) {
  const checkboxVisible = false; //checkboxvisible fro shown common table or not
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [fromTime, setFromTime] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" backdrop-blur-0">
      <Modal
        open={props.open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={Style}
          className="w-[90%] h-[88%] xl:h-[80%] mt-2 xl:max-h-[90%]"
        >
          <div className="sticky top-0 bg-white z-50">
            <div className="px-4 pt-2">
              <div className="flex justify-between items-center w-full mt-2">
                <div className="w-full">
                  <h1 className="font-semibold text-xl">
                    Initial Nursing Assessment
                  </h1>
                </div>

                <CancelPresentationIconButton
                  onClick={() => {
                    props.handleClose();
                  }}
                />
              </div>

              <div className="grid border bg-gray-100 border-gray-300 px-3 rounded mt-1">
                <div className="grid grid-cols-2  lg:grid-cols-3 gap-2 py-2">
                  <div className="grid gap-2  border-r-2  border-slate-500 my-1 ">
                    {/* Patient Name , UHID */}
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-3">
                        <span>PatientName </span>
                        <span className=""> :</span>
                      </h1>
                      <h1 className="text-black font-normal">
                        {props.patientInformation.patientName}
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-20 lg:space-x-20">
                        <span>UHID</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">
                        {props.patientInformation.uhid}
                      </h1>
                    </div>
                  </div>

                  {/* Gender , Age */}
                  <div className="grid gap-2  lg:border-r-2 pl-4 border-slate-500 my-1 ">
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-7 lg:space-x-4">
                        <span>Gender</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">
                        {props.patientInformation.gender}
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-16 lg:space-x-11">
                        <span>Age</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">
                        {props.patientInformation.age}
                      </h1>
                    </div>
                  </div>

                  {/* Bed No */}
                  <div className="lg:pl-4">
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-16">
                        <span>BedNo</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">
                        {props.patientInformation.bedNo}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className=" px-2  mt-2 rounded-md "
                style={{ background: "#F1F1F1" }}
              >
                <Tabs
                  className="text-left mt-2 font-semibold "
                  onChange={handleChange}
                  value={value}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#0B83A5",
                      color: "#0B83A5",
                    },
                  }}
                  // textColor="#0B83A5"
                  textColor="#0B83A5"
                  indicatorColor="#0B83A5"
                  variant="scrollable"
                  scrollButtons
                >
                  <Tab
                    label="Patient's Information"
                    className="PatientInformation"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Patient Fall Assessment"
                    className="PatientFallAssessment"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Patient Vulnerability Criteria"
                    className="PatientVulnerabiltiyCriteria"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="Bed Score Assessment"
                    className="BedScoreAssessment"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label="Nursing Synopsis"
                    className="NursingSynopsis"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    {...a11yProps(4)}
                  />
                </Tabs>
              </div>
            </div>
          </div>

          <div className=" ">
            <div className="">
              <TabPanel value={value} index={0}>
                <PatientInformation />
              </TabPanel>
            </div>
            <TabPanel value={value} index={1}>
              <PatientFallAssessment />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PatientVulnerabilityCriteria />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <BedScoreAssessment />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <NursingSynopsis />
            </TabPanel>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default InitialNursingModal;
