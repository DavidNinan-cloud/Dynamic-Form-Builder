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

function createDataAntibiotics(
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

const antibioticRows = [
  createDataAntibiotics("Dengue", "Test", "Test", 5000, "4000-5600", "Image"),
  createDataAntibiotics("Malaria", "Test", "Test", 600, "525-585", "Image"),
  createDataAntibiotics("Malaria", "Test", "Test", 600, "525-585", "Image"),
  createDataAntibiotics("Malaria", "Test", "Test", 600, "525-585", "Image"),
];

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

const rows = [
  createData("Dengue", "Test", "Test", 5000, "4000-5600", "Image"),
  createData("Malaria", "Test", "Test", 600, "525-585", "Image"),
];

const radioOptions = [
  { id: 2, value: "testResult", label: "Test Result" },
  { id: 1, value: "itemConsumption", label: "Item Consumption" },
];

const ReportDetails = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(`<b><i>Start "writing" </i></b>`);

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

  let myResult = [
    {
      Id: 1,
      CategoryCode: "018",
      CategoryShortName: "Bio",
      CategoryName: "BIOCHEMISTRY",
    },
    {
      Id: 2,
      CategoryCode: "019",
      CategoryShortName: "Ser",
      CategoryName: "SEROLOGY",
    },
  ];

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

  useEffect(() => {
    //console.log("result",result)
    setData({
      result: myResult,
      actions: ["Edit", "Delete"],
    });
    console.log("Data", data);
  }, []);

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

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-20  mt-8 md:rounded-md">
        <div className="space-y-2 mb-2">
          <div className="row">
            <span className="text-md font-bold">Patient Details</span>
            {/* search TextField */}
            <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 border bg-white p-2 rounded-md">
              <div className="flex items-center space-x-2 text-sm lg:col-span-2 md:col-span-1">
                <span className="font-semibold">Patient Name :</span>
                <span className="text-gray-500">Subhash Suresh Patil</span>
              </div>
              <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                <span className="font-semibold">UHID :</span>
                <span className="text-gray-500">234356567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                <span className="font-semibold">Sample No :</span>
                <span className="text-gray-500">1249</span>
              </div>
              <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                <span className="font-semibold">Doctor Name :</span>
                <span className="text-gray-500">Atul Joshi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                <span className="font-semibold">OPD No :</span>
                <span className="text-gray-500">40134</span>
              </div>
              <div className="flex items-center space-x-2 text-sm lg:col-span-2">
                <div className="flex flex-col">
                  <span className="font-semibold">Sample Collection</span>
                  <span className="font-semibold"> Date & Time :</span>
                </div>
                <span className="text-gray-500">20/12/2022 12.30 PM</span>
              </div>
            </div>

            {/* Add button to open the Modal Form and table name start */}
          </div>

          {/* <ConfirmationModal
              confirmationOpen={openChild}
              confirmationHandleClose={handleCloseChild}
              confirmationSubmitFunc={deleteRecord}
              confirmationLabel="Confirmation "
              confirmationMsg="Are You Sure you want to delete the record?"
              confirmationButtonMsg="Delete"
            /> */}

          {/* CommonMasterTable Component */}
          {/* {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 ? (
              <CommonMasterTable
                //data to be displayed
                data={data}
                editRow={editRow}
                setOpen={setOpen}
                deleteRow={deleteRow}
                displayView={displayView}
              />
            ) : (
              <div>
                <h3 className="flex justify-center mt-20">
                  No Records Found...
                </h3>
              </div>
            )} */}
          <div className="border bg-white rounded-md p-2 ">
            {checkedCultureTest && (
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
            )}
            <div className="flex items-center w-full space-x-4">
              <div className="text-gray-500 font-bold text-left text-base">
                Result Entry
              </div>

              <div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCultureTest}
                        onChange={handleCheckedChange}
                        size="small"
                      />
                    }
                    label="Culture Test"
                  />
                </FormGroup>
              </div>
            </div>

            {!checkedCultureTest ? (
              <div className="">
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
                      <TableContainer component={Paper} elevation={2}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Test Name</TableCell>
                              <TableCell>Sub Test Name</TableCell>
                              <TableCell>Parameter</TableCell>
                              <TableCell>Report Values</TableCell>
                              <TableCell>Normal Range</TableCell>
                              <TableCell>Upload Image</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.testName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.testName}
                                </TableCell>
                                <TableCell>{row.subTestName}</TableCell>
                                <TableCell>{row.parameter}</TableCell>
                                <TableCell
                                  className={`${
                                    row.reportValues === 600
                                      ? "bg-green-300"
                                      : "bg-orange-300"
                                  }`}
                                >
                                  {row.reportValues}
                                </TableCell>
                                <TableCell>{row.normalRange}</TableCell>
                                <TableCell>{row.uploadImage}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <div className="flex items-center space-x-2 mt-2">
                        <TextField
                          name="remark"
                          size="small"
                          label="Suggestion/Note"
                          placeholder="Suggestion/Note"
                          multiline
                          fullWidth
                          rows={2}
                        />
                        <TextField
                          name="remark"
                          size="small"
                          label="Foot Note"
                          placeholder="Foot Note"
                          multiline
                          fullWidth
                          rows={2}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <div className="grid grid-cols-4 gap-2 col-span-5">
                      <div className="col-span-2">
                        <SearchableDropdown
                          control={control}
                          error={errors.searchOrganism}
                          searchIcon={true}
                          name="searchOrganism"
                          label="Search Organism"
                          //dataArray={pincodes}
                          isSearchable={true}
                          placeholder="Search Organism"
                          isClearable={false}
                        />
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
                          {[0, 1, 2, 3].map((value) => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                              <ListItem key={value} disablePadding size="small">
                                <ListItemButton
                                  role={undefined}
                                  onClick={handleToggle(value)}
                                  dense
                                  size="small"
                                  disableRipple
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      edge="start"
                                      checked={checked.indexOf(value) !== -1}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                      size="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    id={labelId}
                                    primary={`Line item ${value + 1}`}
                                    size="small"
                                  />
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                      <div className="col-span-2">
                        <AntibioticsTable rows={antibioticRows} />
                      </div>
                      {/* <div className="col-start-1 col-span-2 border">
                      {customList("Choices", left)}
                    </div>
                    <div className="col-span-1 border flex flex-col justify-center">
                      <Button
                        sx={{ my: 0.5, mx: 4 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        sx={{ my: 0.5, mx: 4 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </div>
                    <div className="col-span-2 border">
                      {customList("Chosen", right)}
                    </div> */}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <TextField
                        name="remark"
                        size="small"
                        label="Suggestion/Note"
                        placeholder="Suggestion/Note"
                        multiline
                        fullWidth
                        rows={2}
                      />
                      <TextField
                        name="remark"
                        size="small"
                        label="Foot Note"
                        placeholder="Foot Note"
                        multiline
                        fullWidth
                        rows={2}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <div className="flex flex-col space-y-2">
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
                          onBlur={handleUpdate}
                          onChange={(newContent) => {
                            setContent(newContent);
                            console.log("content", content);
                          }}
                        />
                        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
                      </div>
                    </div>
                  </TabPanel>
                </Box>
              </div>
            ) : (
              <div className="p-2">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={handleUpdate}
                  onChange={(newContent) => {
                    console.log(newContent);
                  }}
                />
                {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="border border-red-500 text-red-500 py-1 px-2 rounded-md">
              CLOSE
            </button>
            <button className="border border-orange-500 text-orange-500 py-1 px-2 rounded-md">
              AUTHORIZATION
            </button>
            <button className="border border-green-500 text-green-500 py-1 px-2 rounded-md">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
