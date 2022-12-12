import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  List,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { visuallyHidden } from "@mui/utils";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import JoditEditor from "jodit-react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import AntibioticsTable from "../../../Common/AntibioticsTable";
import { useLocation } from "react-router-dom";
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

function createData(
  testName,
  subTestName,
  parameter,
  reportValues,
  normalRange,
  uploadImage
) {
  return {
    testName,
    subTestName,
    parameter,
    reportValues,
    normalRange,
    uploadImage,
  };
}

let scheduleData;

const ReportDetails = () => {
  const [finalData, setFinalData] = React.useState({});
  const [countClick, setCountClick] = React.useState(0);
  const [reportEntryDetails, setReportEntryDetails] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const location = useLocation();
  scheduleData = location.state;
  const editor = useRef(null);
  const [content, setContent] = useState(`<b><i>Start "writing" </i></b>`);

  const [openPost, setOpenPost] = React.useState(false);

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const getTestEntryDetailsData = (orderTestId) => {
    getTestEntryDetails(orderTestId)
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

        console.log("reportEntryDetails", reportEntryDetails);
        console.log("patientDetails", patientDetails);
      })
      .catch((error) => {
        console.log(error);
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
    if (scheduleData) {
      getTestEntryDetailsData(scheduleData.orderTestId);
      console.log("scheduleData", scheduleData);
    }
  }, []);

  const config = {
    readonly: false,
    height: 300,
    statusbar: false,
    buttons: [
      "bold",
      "underline",
      "strikethrough",
      "italic",
      "indent",
      "outdent",
      "fontsize",
      "paragraph",
      "brush",
      "|",
      "align",
      "ul",
      "ol",
      "table",
      "hr",
      "symbol",
      "eraser",
      "copyformat",
      "superscript",
      "subscript",
      "undo",
      "redo",
      "find",
      "preview",
      "print",
    ],
  };
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
    console.log("content", content);
  };
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    console.log("value", value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const numberOfChecked = (items) => intersection(checked, items).length;
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader sx={{ px: 2, py: 1 }} />

      <List
        sx={{
          //width: 230,
          height: 180,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              {/* <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon> */}
              <ListItemText
                id={labelId}
                primary={`List item ${value + 1}`}
                className={`${
                  checked.indexOf(value) !== -1 && "text-blue-500"
                }`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [checkedCultureTest, setCheckedCultureTest] = React.useState(false);

  const handleCheckedChange = (event) => {
    setCheckedCultureTest(event.target.checked);
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    //resolver: yupResolver(schema),
    // defaultValues,
  });

  let wt;

  const [open, setOpen] = useState(false);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);
  const [checkedList, setCheckedList] = React.useState([0]);

  const handleToggleCheckedList = (value) => () => {
    const currentIndex = checkedList.indexOf(value);
    const newcheckedList = [...checkedList];

    if (currentIndex === -1) {
      newcheckedList.push(value);
    } else {
      newcheckedList.splice(currentIndex, 1);
    }

    setCheckedList(newcheckedList);
  };

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  const onSubmitTableData = (data) => {
    console.log("Data", data);
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
        normalRange: item.normalrange,
        parameterName: item.parametername,
        reportValue: valuesArr[index],
        subtestName: item.subtestname,
      };
      detailsArr.push(myObj);
    });

    console.log("detailsArr", detailsArr);
    console.log("detailsArrFinal", detailsArrFinal);
    let finalObj = {
      labOrderTest: {
        id: scheduleData.orderTestId,
      },
      footnote: data.footNote,
      patientInfo: {
        id: patientDetails.id,
      },
      reportValuesList: [...detailsArr],
      suggestions: data.suggestionNote,
      templateData: null,
      organismList: null,
    };

    console.log("finalObj", finalObj);
    setOpenPost(true);
    setFinalData(finalObj);
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
          getTestEntryDetailsData(scheduleData.orderTestId);
          successAlert(response.data.message);
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

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="space-y-2 mb-2">
          {patientDetails && (
            <div className="row">
              <span className="text-md font-bold">Patient Details</span>
              <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 border bg-white p-2 rounded-md">
                <div className="flex items-center space-x-2 text-sm lg:col-span-2 md:col-span-1">
                  <span className="font-semibold">Patient Name :</span>
                  <span className="text-gray-500">
                    {patientDetails.patientname}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                  <span className="font-semibold">UHID :</span>
                  <span className="text-gray-500">{patientDetails.uhidno}</span>
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
          {/* {reportEntryDetails && (
            <div>
              <ResultEntryTable
                reportEntryDetails={reportEntryDetails}
                onSubmitTableData={onSubmitTableData}
              />
            </div>
          )} */}

          {/* <IsTemplate /> */}

          {/* <IsCultureTest
            reportEntryDetails={reportEntryDetails}
            onSubmitTableData={onSubmitTableData}
          /> */}

          {/* <div className="flex items-center justify-end gap-2">
            <button className="border border-red-500 text-red-500 py-1 px-2 rounded-md">
              CLOSE
            </button>
            <button className="border border-orange-500 text-orange-500 py-1 px-2 rounded-md">
              AUTHORIZATION
            </button>
            <button className="border border-green-500 text-green-500 py-1 px-2 rounded-md">
              SAVE
            </button>
          </div> */}
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
    </div>
  );
};

export default ReportDetails;
