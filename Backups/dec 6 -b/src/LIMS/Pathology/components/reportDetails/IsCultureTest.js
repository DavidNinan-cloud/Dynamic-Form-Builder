import React, { useRef, useEffect, useState } from "react";
import {
  TextField,
  Box,
  Tabs,
  Tab,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Button,
  ListItemText,
  Card,
  CardHeader,
  ListItemIcon,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import AntibioticsTable from "../../../Common/AntibioticsTable";
import ResultEntryTable from "./ResultEntryTable";
import IsTemplate from "./IsTemplate";
import {
  autoSearchOrganisms,
  getAntibioticsByOrganismId,
  getOrganisms,
} from "../../services/ReportDetailsServices";
import SearchIcon from "@mui/icons-material/Search";
import CloseButton from "../../../../Common Components/Buttons/CloseButton";
import AuthorizationTable from "./AuthorizationTable";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

const IsCultureTest = (props) => {
  //let detailsArr = [];
  // let submitAntibioticsArr = [];
  const {
    reportEntryDetails,
    scheduleData,
    patientDetails,
    setOpenPost,
    setFinalData,
    writerContent,
    setWriterContent,
    contentError,
    setContentError,
    authArr,
    setAuthArr,
    initiateAuth,
    setInitiateAuth,
    authObj,
    setAuthObj,
  } = props;
  const editor = useRef(null);
  const [content, setContent] = useState(`<b><i>Start "writing" </i></b>`);
  const [tabValue, setTabValue] = React.useState(0);
  const [checked, setChecked] = React.useState([]);
  const [submitAntibioticsArr, setSubmitAntibioticsArr] = React.useState([]);
  const [detailsArr, setDetailsArr] = React.useState([]);
  const [detailsArrFinal, setDetailsArrFinal] = React.useState([]);
  const [valuesArr, setValuesArr] = React.useState([]);

  const [patchArr, setPatchArr] = React.useState([]);

  const [searchVal, setSearchVal] = React.useState("");
  const [organismId, setOrganismId] = React.useState("");

  const [organismData, setOrganismData] = React.useState([]);

  const [suggestionNote, setSuggestionNote] = React.useState();
  const [footNote, setFootNote] = React.useState();

  const [organismArr, setOrganismArr] = React.useState([]);
  const [antibioticsData, setAntibioticsData] = React.useState([]);

  const handleToggle = (value) => {
    getAntibiotics(value.id);
    setOrganismId(value.id);

    console.log("value.id", value.id);
    console.log("organismId", organismId);
    // console.log("value", value);
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    console.log("value", value);
    const selectedIndex = checked.indexOf(value.id);
    let newSelected = [];

    newSelected = newSelected.concat(value.id);

    console.log("newSelected", newSelected);
    console.log("selectedIndex", selectedIndex);

    console.log("checked", checked);

    if (selectedIndex === 0) {
      newSelected = [];
      setChecked(null);
    }

    setChecked(newSelected);
  };

  const handleChange = (event, newValue, index) => {
    setTabValue(newValue);

    console.log("tabValue", tabValue);
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

  useEffect(() => {
    getOrganismList();
  }, []);

  React.useEffect(() => {
    if (reportEntryDetails) {
      console.log("reportEntryDetails", reportEntryDetails);
      let arr = [];
      reportEntryDetails.parameterslist &&
        reportEntryDetails.parameterslist.map((item) => {
          let myObj = {
            reportValues: item.reportValue,
          };
          arr.push(myObj);
        });
      console.log("arr", arr);

      // setSubmitAntibioticsArr([
      //   ...submitAntibioticsArr,
      //   {
      //     antiBioTicsList: data.antibioticDetails,
      //     organism: { id: organismId },
      //   },
      // ]);

      setSubmitAntibioticsArr([...reportEntryDetails?.organismlist]);
      setFootNote(reportEntryDetails?.footnote);
      setSuggestionNote(reportEntryDetails?.suggestion);
    }
  }, [reportEntryDetails]);

  const onSubmitResultEntryTable = (data) => {
    console.log("Data", data);
    console.log("patientDetails", patientDetails);

    //let valuesArr = [];
    setValuesArr([]);
    setDetailsArr([]);
    let check = data.reportDetails.map((item) => item.reportValues !== "");
    console.log("check", check);

    if (check.every((item) => item === true)) {
      console.log("data is ready");

      data.reportDetails.map((item) => {
        //setValuesArr(Number(item.reportDetails));
        valuesArr.push(Number(item.reportValues));
        setPatchArr([...valuesArr]);
      });

      let myObj;
      reportEntryDetails?.parameterslist &&
        reportEntryDetails.parameterslist.map((item, index) => {
          myObj = {
            normalRange: item.normalRange,
            parameterName: item.parameterName,
            reportValue: valuesArr[index],
            subtestName: item.subtestName,
          };
          detailsArr.push(myObj);
        });
      console.log("final detailsArr", detailsArr);
      setDetailsArrFinal([...detailsArr]);
    }

    // data.reportDetails.map((item) => {
    //   valuesArr.push(Number(item.reportValues));
    // });
    // console.log("valuesArr", valuesArr);

    // let myObj;
    // reportEntryDetails.parameterslist.map((item, index) => {
    //   myObj = {
    //     normalRange: item.normalrange,
    //     parameterName: item.parametername,
    //     reportValue: valuesArr[index],
    //     subtestName: item.subtestname,
    //   };
    //   detailsArr.push(myObj);
    // });

    // console.log("detailsArr", detailsArr);
  };

  const filterOrganisms = (e) => {
    setSearchVal(e.target.value);
    console.log("searchVal", searchVal);
  };

  useEffect(() => {
    let filtered = organismArr.filter((item) => item.label.includes(searchVal));
    console.log("filtered", filtered);
    setOrganismData(filtered);
    console.log("organismData", organismData);
  }, [searchVal, organismArr]);

  const handleInputChange = (e) => {
    console.log("e", e);
    // if (e.length > 0) {
    //   getOrganismSearchData(e);
    // }
  };

  const getOrganismList = () => {
    getOrganisms()
      .then((response) => {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        organismArr.push(response.data.result);
        setOrganismArr(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getOrganismSearchData = (str) => {
  //   autoSearchOrganisms(str)
  //     .then((response) => {
  //       console.log(JSON.stringify(response));
  //       console.log(response.data.result);
  //       setOrganismData(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getAntibiotics = (id) => {
    getAntibioticsByOrganismId(id)
      .then((response) => {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setAntibioticsData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitAntibiotics = (data) => {
    console.log("data", data);
    setSubmitAntibioticsArr([
      ...submitAntibioticsArr,
      {
        antiBioTicsList: data.antibioticDetails,
        organism: { id: organismId },
      },
    ]);
    console.log("submitAntibioticsArr", submitAntibioticsArr);

    // let Obj = {
    //   labOrderTest: {
    //     id: scheduleData.orderTestId,
    //   },
    //   footnote: "test",
    //   patientInfo: {
    //     id: 2,
    //     // id: patientDetails.id,
    //   },
    //   reportValuesList: null,
    //   suggestions: "test",
    //   templateData: null,
    //   organismList: submitAntibioticsArr,
    // };

    // console.log("Obj", Obj);

    //setOpenPost(true);
    //setFinalData(Obj);
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

    console.log("writerContent", writerContent);
  };

  const handleAntibioticsDelete = (obj, itemIndex) => {
    setSubmitAntibioticsArr((parameter) =>
      submitAntibioticsArr.filter((item, index) => index !== itemIndex)
    );
  };

  const onSubmitFinalData = () => {
    console.log("detailsArr", detailsArr);
    let finalObj = {
      authorizationDetails: authArr.length > 0 ? [...authArr] : [],
      patientInvestigation: {
        id: scheduleData.investigationId,
      },
      footnote: footNote,
      isCultureTest: reportEntryDetails?.isculturetest,
      isReportTemplate: reportEntryDetails?.isreport,
      // patientInfo: {
      //   id: patientDetails.id,
      // },
      reportValuesList: [...detailsArrFinal],
      suggestions: suggestionNote,
      templateData: {
        filmSize: null,
        gender: null,
        noOfFilms: null,
        radiologist: null,
        reportType: null,
        template: null,
        templateData: writerContent ? writerContent : null,
      },
      //   templateData: writerContent ? writerContent : null,
      organismList: submitAntibioticsArr ? submitAntibioticsArr : null,
    };
    console.log("finalObj", finalObj);
    setOpenPost(true);
    setFinalData(finalObj);
  };

  return (
    <div className="bg-white">
      <Box
        sx={{
          width: "100%",
          border: "1px solid lightgrey",
          borderRadius: "3px",
          // height: "50vh",
        }}
      >
        <Box
          sx={{
            margin: 1,
            border: "1px solid lightgrey",
            borderRadius: "3px",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Parameters" {...a11yProps(0)} />
            <Tab label="Drug Sensitivity" {...a11yProps(1)} />
            <Tab label="Template" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <div>
            <div>
              <ResultEntryTable
                reportEntryDetails={reportEntryDetails}
                onSubmitResultEntryTable={onSubmitResultEntryTable}
                patchArr={patchArr}
                authArr={authArr}
                setAuthArr={setAuthArr}
                initiateAuth={initiateAuth}
                setInitiateAuth={setInitiateAuth}
                authObj={authObj}
                setAuthObj={setAuthObj}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">
              <TextField
                size="small"
                label="Search Organism"
                fullWidth
                placeholder="Search Organism"
                onChange={(e) => filterOrganisms(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <SearchableDropdown
                control={control}
                error={errors.searchOrganism}
                searchIcon={true}
                name="searchOrganism"
                label="Search Organism"
                //dataArray={organismData}
                isSearchable={true}
                placeholder="Search Organism"
                handleInputChange={handleInputChange}
                isClearable={true}
                // inputRef={{
                //   ...register("searchOrganism", {
                //     onChange: (e) => {
                //       console.log("e", e.target.value.value);
                //       // getAntibiotics(e.target.value.value);
                //     },
                //   }),
                // }}
              /> */}
            </div>

            <div className="col-start-1 col-span-2">
              <List
                sx={{
                  width: "100%",
                  height: "100%",
                  // maxWidth: 360,
                  bgcolor: "background.paper",
                  border: "1px solid lightgrey",
                  borderRadius: "3px",
                }}
              >
                {organismData &&
                  organismData.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value.id} disablePadding size="small">
                        <ListItemButton
                          role={undefined}
                          onClick={() => handleToggle(value)}
                          dense
                          size="small"
                          disableRipple
                          disabled={
                            reportEntryDetails &&
                            reportEntryDetails?.authorizationLevel &&
                            reportEntryDetails?.authorizationLevel ===
                              authObj.authLevel
                              ? false
                              : true
                          }
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value.id) !== -1}
                              tabIndex={1}
                              disableRipple
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              size="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`${value.label}`}
                            size="small"
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
              </List>
            </div>
            <div className="col-span-2">
              <AntibioticsTable
                rows={antibioticsData}
                onSubmit={onSubmitAntibiotics}
                organismId={organismId}
                authObj={authObj}
                setAuthObj={setAuthObj}
                reportEntryDetails={reportEntryDetails}
              />
            </div>
            <div className="col-span-4">
              {submitAntibioticsArr && submitAntibioticsArr.length > 0 && (
                <TableContainer component={Paper} elevation={2}>
                  <Table
                    sx={{ height: "100%" }}
                    aria-label="simple table"
                    size="small"
                  >
                    <TableHead sx={{ backgroundColor: "lightgrey" }}>
                      <TableRow>
                        <TableCell>Antibiotics Name</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Values</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {submitAntibioticsArr.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              {row.antiBioTicsList.map((item) => {
                                return (
                                  <span className=" p-0.5">
                                    {item.antiBioTicName}
                                  </span>
                                );
                              })}
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              {row.antiBioTicsList.map((item) => {
                                return (
                                  <span className=" p-0.5">{item.result}</span>
                                );
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              {row.antiBioTicsList.map((item) => {
                                return (
                                  <span className=" p-0.5">{item.value}</span>
                                );
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              {row.antiBioTicsList.map((item, itemIndex) => {
                                return (
                                  <DeleteOutlineOutlinedIcon
                                    className="text-red-500 cursor-pointer"
                                    onClick={() =>
                                      handleAntibioticsDelete(item, itemIndex)
                                    }
                                  />
                                );
                              })}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <IsTemplate
            scheduleData={scheduleData}
            patientDetails={patientDetails}
            setOpenPost={setOpenPost}
            setFinalData={setFinalData}
            onSubmit={onSubmitTemplateData}
            writerContent={writerContent}
            setWriterContent={setWriterContent}
            contentError={contentError}
            reportEntryDetails={reportEntryDetails}
            authObj={authObj}
          />
          {/* <div className="flex flex-col space-y-2">
            <div className="w-1/3">
              <DropdownField
                control={control}
                error={errors.selectTemplate}
                name="selectTemplate"
                label="Select Template"
                // dataArray={testType}
                isSearchable={false}
                placeholder="Select Template"
                isClearable={false}
                inputRef={{
                  ...register("selectTemplate", {
                    onChange: (e) => {
                      console.log(e.target.value);
                      // setSelectedPrefix(e.target.value.label);
                    },
                  }),
                }}
              />
            </div>
            <div className="">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={(newContent) => {
                  setContent(newContent);
                  console.log("content", content);
                }}
              />
           
            </div>
          </div> */}
        </TabPanel>
      </Box>

      <fieldset
        disabled={
          reportEntryDetails &&
          reportEntryDetails?.authorizationLevel &&
          reportEntryDetails?.authorizationLevel === authObj.authLevel
            ? false
            : true
        }
      >
        <div className="flex items-center space-x-2 my-2 ">
          <TextField
            name="suggestionNote"
            // {...register("suggestionNote")}
            defaultValue={suggestionNote}
            onChange={(e) => setSuggestionNote(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            label="Suggestion/Note"
            placeholder="Suggestion/Note"
            multiline
            fullWidth
            rows={2}
            className="bg-white"
          />
          <TextField
            name="footNote"
            // {...register("footNote")}
            defaultValue={footNote}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFootNote(e.target.value)}
            size="small"
            label="Foot Note"
            placeholder="Foot Note"
            multiline
            fullWidth
            rows={2}
            className="bg-white"
          />
        </div>{" "}
      </fieldset>

      <AuthorizationTable
        reportEntryDetails={reportEntryDetails}
        authArr={authArr}
        setAuthArr={setAuthArr}
        initiateAuth={initiateAuth}
        setInitiateAuth={setInitiateAuth}
      />

      <fieldset
      // disabled={
      //   reportEntryDetails &&
      //   reportEntryDetails?.authorizationLevel &&
      //   reportEntryDetails?.authorizationLevel === authObj.authLevel
      //     ? false
      //     : true
      // }
      >
        <div className="flex items-center space-x-2 justify-end mt-2">
          <CloseButton />
          <button
            type="button"
            onClick={onSubmitFinalData}
            className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
          >
            Save
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default IsCultureTest;
