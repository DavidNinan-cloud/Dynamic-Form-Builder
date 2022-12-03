import React, { useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import RadioField from "../../../../../Common Components/FormFields/RadioField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  getUnitDropdown,
  getGenderDropdown,
  getAgeTypeDropdown,
  addNewParameter,
  getParameterById,
  updateParameter,
} from "../../../../services/lims/pathology/ParameterServices";
import AddRangeTable from "./AddRangeTable";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import CloseButton from "../../../../../Common Components/Buttons/CloseButton";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import HelpValuesTable from "./HelpVauesTable";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import { UpdateButton } from "../../../../../Common Components/Buttons/CommonButtons";

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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ParameterModal = (props) => {
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [ageTypeOptions, setAgeTypeOptions] = React.useState([]);
  const [finalData, setFinalData] = React.useState({});
  const [openPut, setOpenPut] = React.useState(false);
  const [openPost, setOpenPost] = React.useState(false);
  const [helpValuesData, setHelpValuesData] = React.useState([]);
  const [ageRangeData, setAgeRangeData] = React.useState([]);
  const [editHelpValues, setEditHelpValues] = React.useState(false);
  const [editHelpValuesIndex, setEditHelpValuesIndex] = React.useState();
  const [editAgeRangeIndex, setEditAgeRangeIndex] = React.useState();
  const [editAgeRange, setEditAgeRange] = React.useState(false);
  const [genderOptions, setGenderOptions] = React.useState([]);
  const [radioValue, setRadioValue] = React.useState("numeric");

  let typeOfValue = [
    {
      id: "Numeric",
      label: "Numeric",
      value: "Numeric",
    },
    {
      id: "Text",
      label: "Text",
      value: "Text",
    },
  ];
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    if (event.target.value === "text") {
      setTabValue(0);
    }
  };
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([
    {
      id: 1,
      label: "L1",
    },
    {
      id: 2,
      label: "L2",
    },
    {
      id: 3,
      label: "L3",
    },
  ]);
  const [right, setRight] = React.useState([]);

  const [checkedHelpValues, setCheckedHelpValues] = React.useState([]);
  const [leftHelpValues, setLeftHelpValues] = React.useState([
    {
      id: 1,
      label: "L1",
    },
    {
      id: 2,
      label: "L2",
    },
    {
      id: 3,
      label: "L3",
    },
  ]);
  const [rightHelpValues, setRightHelpValues] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const leftCheckedHelpValues = intersection(checkedHelpValues, leftHelpValues);
  const rightCheckedHelpValues = intersection(
    checkedHelpValues,
    rightHelpValues
  );

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

  const handleToggleHelpValues = (value) => () => {
    console.log("value", value);
    const currentIndex = checkedHelpValues.indexOf(value);
    const newChecked = [...checkedHelpValues];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedHelpValues(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    console.log("checked", checked);

    let string = checked.map((item) => item.label);

    right.push(string.toString());

    // checked.map((item) => {
    //   return setRight([
    //     ...right,
    //     {
    //       id: item.id,
    //       label: item.label,
    //     },
    //   ]);
    // });

    // setRight([...checked]);

    // setRight(right.concat(leftChecked));

    console.log("right", right);
    //  setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setRight([]);
    // setLeft(left.concat(rightChecked));
    // setRight(not(right, rightChecked));
    // setChecked(not(checked, rightChecked));
  };

  const handleCheckedRightHelpValues = () => {
    setRightHelpValues(rightHelpValues.concat(leftCheckedHelpValues));
    setLeftHelpValues(not(leftHelpValues, leftCheckedHelpValues));
    setCheckedHelpValues(not(checkedHelpValues, leftCheckedHelpValues));
  };

  const handleCheckedLeftHelpValues = () => {
    setLeftHelpValues(leftHelpValues.concat(rightCheckedHelpValues));
    setRightHelpValues(not(rightHelpValues, rightCheckedHelpValues));
    setCheckedHelpValues(not(checkedHelpValues, rightCheckedHelpValues));
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const schema = yup.object().shape({
    parameterCode: yup.string().required("Parameter Code required"),
    parameterName: yup.string().required("Parameter Name required"),

    printName: yup.string().required("Print Name required"),
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Unit Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    parameterCode: "",
    parameterName: "",
    printName: "",
    typeOfValue: "",
    unit: "",
    applyAgeWiseRange: false,
    status: true,
    id: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const schemaHelpValues = yup.object().shape({
    addHelpValues: yup.string().required("Help Values required"),
  });

  const {
    control: controlHelpValues,
    handleSubmit: handleSubmitHelpValues,
    reset: resetHelpValues,
    register: registerHelpValues,
    setValue: setValueHelpValues,
    formState: { errors: errorsHelpValues },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaHelpValues),
    defaultValues: {
      addHelpValues: "",
    },
  });

  const schemaAgeRange = yup.object().shape({
    gender: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Gender Required"),
    ageType: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Age Type Required"),
    ageFrom: yup.string().required("Age From required"),
    ageTo: yup.string().required("Age To required"),
    lower: yup.string().required("Lower required"),
    upper: yup.string().required("Upper To required"),
    criticalLower: yup.string().required("CriticalLower required"),
    criticalUpper: yup.string().required("CriticalUpper To required"),
  });

  const {
    control: controlAgeRange,
    handleSubmit: handleSubmitAgeRange,
    reset: resetAgeRange,
    register: registerAgeRange,
    setValue: setValueAgeRange,
    formState: { errors: errorsAgeRange },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaAgeRange),
    defaultValues: {
      gender: "",
      ageType: "",
      ageFrom: "",
      ageTo: "",
      lower: "",
      upper: "",
      criticalLower: "",
      criticalUpper: "",
    },
  });

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    props.setCountClick(0);
    if (openPut) {
      setOpenPut(false);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      //postParameterUnit(finalData);
      postParameter(finalData);
    }
  }

  const onSubmitData = (data) => {
    if (props.edit === true) {
      console.log("Edit");
      console.log("data", data);
      reset(defaultValues);
      console.log("right", right.toString().replaceAll(",", ""));
      console.log("helpValuesData", helpValuesData);
      console.log("ageRangeData", ageRangeData);
      console.log("radioValue", radioValue);
      let arr = [];
      helpValuesData.map((item) => {
        let obj = {
          value: item.addHelpValues,
        };
        arr.push(obj);
      });
      let arr2 = [];
      ageRangeData.map((item) => {
        let obj2 = {
          ageType: {
            id: item.ageType.id,
          },
          criticalLowerLimit: item.criticalLower,
          criticalUpperLimit: item.criticalUpper,
          fromAge: item.ageFrom,
          gender: {
            id: item.gender.id,
          },
          lowerLimit: item.lower,
          toAge: item.ageTo,
          upperLimit: item.upper,
        };
        arr2.push(obj2);
      });
      let submitUpdateObj = {
        active: data.status,
        ageRangeApplicable: data.applyAgeWiseRange,
        id: data.id,
        formula: right.length > 0 ? right.toString().replaceAll(",", "") : null,
        helpValuesList: arr,
        parameterAgeMapping: arr2.length > 0 ? arr2 : null,
        parameterCode: data.parameterCode,
        parameterName: data.parameterName,
        printName: data.printName,
        typeOfValue: data.typeOfValue,
        unit: {
          id: data.unit.id,
        },
      };

      console.log("submitUpdateObj", submitUpdateObj);
      setOpenPut(true);
      setFinalData(submitUpdateObj);
    } else if (props.edit === false) {
      console.log("Not Edit");
      console.log("data", data);
      reset(defaultValues);
      console.log("right", right.toString().replaceAll(",", ""));
      console.log("helpValuesData", helpValuesData);
      console.log("ageRangeData", ageRangeData);
      console.log("radioValue", radioValue);
      let arr = [];
      helpValuesData.map((item) => {
        let obj = {
          value: item.addHelpValues,
        };
        arr.push(obj);
      });
      let arr2 = [];
      ageRangeData.map((item) => {
        let obj2 = {
          ageType: {
            id: item.ageType.id,
          },
          criticalLowerLimit: item.criticalLower,
          criticalUpperLimit: item.criticalUpper,
          fromAge: item.ageFrom,
          gender: {
            id: item.gender.id,
          },
          lowerLimit: item.lower,
          toAge: item.ageTo,
          upperLimit: item.upper,
        };
        arr2.push(obj2);
      });
      let submitObj = {
        active: data.status,
        ageRangeApplicable: data.applyAgeWiseRange,
        formula: right.length > 0 ? right.toString().replaceAll(",", "") : null,
        helpValuesList: arr,
        parameterAgeMapping: arr2.length > 0 ? arr2 : null,
        parameterCode: data.parameterCode,
        parameterName: data.parameterName,
        printName: data.printName,
        typeOfValue: data.typeOfValue,
        unit: {
          id: data.unit.id,
        },
      };

      console.log("submitObj", submitObj);
      setOpenPost(true);
      setFinalData(submitObj);
    }
  };

  const { mutate: postParameter } = useMutation(addNewParameter, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      handleClosePost();
      successAlert();
      props.populateTable({ page: 0, size: 10, searchString: "" });
      console.log("Record has been created");

      props.setEdit(false);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      props.setCountClick(0);
      errorAlert();
      handleClosePost();
    },
  });

  function updateRecord() {
    console.log("Your data has been updated");

    if (props.countClick === 0) {
      updateParameter(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert();
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setCountClick(props.countClick + 1);
            props.setEdit(false);

            reset(defaultValues);
            handleClosePut();
            props.setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setCountClick(props.countClick + 1);
          errorAlert();
          handleClosePut();
        });
    }
  }

  const onSubmitDataHelpValues = (data) => {
    if (editHelpValues) {
      console.log("edit");
      console.log("editHelpValuesIndex", editHelpValuesIndex);
      console.log("data", data);

      let temp = helpValuesData.map((item, index) => {
        if (index === editHelpValuesIndex) {
          return { ...item, value: data.addHelpValues };
        }
        return item;
      });

      setHelpValuesData(temp);
      // let ele = helpValuesData.find(
      //   (item, index) => index === editHelpValuesIndex
      // );
      // ele.value = data.addHelpValues;
      // console.log("ele", ele);
    } else {
      setHelpValuesData([
        ...helpValuesData,
        {
          ...data,
        },
      ]);
      console.log(helpValuesData);
      resetHelpValues();
    }
  };

  const onSubmitDataAgeRange = (data) => {
    if (editAgeRange) {
      console.log("edit");
      console.log("editAgeRangeIndex", editAgeRangeIndex);
      console.log("data", data);

      let temp = ageRangeData.map((item, index) => {
        if (index === editAgeRangeIndex) {
          return {
            ...item,
            ageFrom: data.ageFrom,
            ageTo: data.ageTo,
            lower: data.lower,
            upper: data.upper,
            criticalLower: data.criticalLower,
            criticalUpper: data.criticalUpper,
          };
        }
        return item;
      });

      setAgeRangeData(temp);
    } else {
      console.log("data", data);
      setAgeRangeData([
        ...ageRangeData,
        {
          ...data,
        },
      ]);
      resetAgeRange();
    }
    // console.log("data", data);
    // setAgeRangeData([
    //   ...ageRangeData,
    //   {
    //     ...data,
    //   },
    // ]);
    // resetAgeRange();
  };

  //     const onSubmitDataHandler = (data) => {
  //     console.log("onSubmitDataHandler function has been invoked");

  //     if (props.edit === true) {
  //       console.log(
  //         "Put request is going to be sent to the api and the data is "
  //       );
  //       console.log(data);

  //       updateData(data);
  //     } else if (props.edit === false) {
  //       console.log(
  //         "Post request is going to be sent to the api and the data is "
  //       );
  //       console.log(data);

  //       let obj = {
  //         active: true,
  //         countryCode: data.countryCode,
  //         countryName: data.countryName,
  //         isdCode: data.isdCode,
  //         mobileLength: data.mobileLength,
  //       };

  //       console.log(obj);

  //       postCountry(obj);

  //       props.setOpen(false);
  //     }

  //     //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
  //     props.setEdit(false);

  //     //to set the form fields as blank
  //     reset(defaultValues);

  //     //for closing the modal form
  //     props.setOpen(false);
  //   };

  //useQuery hook for the functionality of edit icon click
  //   const { status } = useQuery(
  //     ["CountryInfo", props.idValue],

  //     //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
  //     () => {
  //       if (props.idValue) {
  //         return getCountryById(props.idValue);
  //       }
  //     },

  //     {
  //       enabled: props.edit,

  //       staleTime: 0,

  //       cacheTime: 0,

  //       onSuccess: (data) => {
  //         console.log(
  //           "data fetched with no problem by using the react query library"
  //         );

  //         console.log(status);

  //         console.log(
  //           "Data fetched from API after clicking on the edit icon is " +
  //             JSON.stringify(data)
  //         );

  //         let resetObj = {
  //           countryCode: data.data.result.countryCode,
  //           countryName: data.data.result.countryName,
  //           id: data.data.result.id,
  //           isdCode: data.data.result.isdCode,
  //           mobileLength: data.data.result.mobileLength,
  //           status: data.data.result.status,
  //         };

  //         //if data is received ; then only execute the reset function to patch the value
  //         if (data) {
  //           reset(resetObj);
  //         }
  //       },

  //       onError: (error) => {
  //         console.log(error);
  //         //Code for React Toast
  //       },
  //     }
  //   );

  //useMutation hook for the implementation of post request data saving
  //   const { mutate: postCountry } = useMutation(addNewCountry, {
  //     onSuccess: (res) => {
  //       const result = {
  //         status: res.status + "-" + res.statusText,
  //         headers: res.headers,
  //         data: res.data,
  //       };
  //       console.log(result);
  //       if (result.status === "200-OK") {
  //         // Swal.fire(
  //         //   "Operation Successfull!",
  //         //   "Record has been Created!",
  //         //   "success"
  //         // );
  //         console.log("Record has been created");
  //       }
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //       //Code for React toast
  //     },
  //   });

  //axios request for data updation. That is PUT request
  //   function updateData(requiredData) {
  //     const url = `http://192.168.0.112:8095/masters/countries`;

  //     axios
  //       .put(url, requiredData)
  //       .then((response) => {
  //         console.log(response);
  //         if (response.status === 200) {
  //           // Swal.fire(
  //           //   "Data Updation Done",
  //           //   "Data has been updated successfully",
  //           //   "success"
  //           // ).then(() => {
  //           //   //to update the ui after successfull data updation. Reload the Country.js component after clicking on the ok button
  //           // });
  //           console("Record has been updated successfully");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         //Code for React Toast
  //       });
  //   }

  useEffect(() => {
    getUnitDropDown();
    getGenderDropDown();
    getAgeTypeDropDown();
  }, []);

  const getUnitDropDown = () => {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGenderDropDown = () => {
    getGenderDropdown()
      .then((response) => {
        console.log("The list of all the gender are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setGenderOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAgeTypeDropDown = () => {
    getAgeTypeDropdown()
      .then((response) => {
        console.log("The list of all the age type are as follows" + response);
        console.log("response", response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);

        setAgeTypeOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHelpValuesEdit = (obj, index) => {
    console.log("index", index);
    setEditHelpValuesIndex(index);
    setEditHelpValues(true);
    console.log("editHelpValues", editHelpValues);
    console.log("obj", obj);
    console.log("obj.formula", obj.formula);
    setValueHelpValues("addHelpValues", obj.value);
  };

  const handleAgeRangeEdit = (obj, index) => {
    console.log("index", index);
    setEditAgeRangeIndex(index);
    setEditAgeRange(true);
    // console.log("editHelpValues", editHelpValues);
    console.log("obj", obj);
    setValueAgeRange("ageFrom", obj.ageFrom);
    setValueAgeRange("ageTo", obj.ageTo);
    setValueAgeRange("lower", obj.lower);
    setValueAgeRange("upper", obj.upper);
    setValueAgeRange("criticalLower", obj.criticalLower);
    setValueAgeRange("criticalUpper", obj.criticalUpper);
    setValueAgeRange("gender", obj.gender);
    setValueAgeRange("ageType", obj.ageType);
    // console.log("obj.formula", obj.formula);
    // setValueHelpValues("addHelpValues", obj.value);
  };

  const customList = (title, items) => (
    <Card>
      <List
        sx={{
          // width: 230,
          height: 180,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
              sx={{ borderBottom: "1px solid lightgrey" }}
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
                primary={`List item ${value.label}`}
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

  const customListHelpValues = (title, items) => (
    <Card>
      <CardHeader sx={{ px: 2, py: 1 }} />
      <List
        sx={{
          width: 230,
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
              onClick={handleToggleHelpValues(value)}
            >
              <ListItemText
                id={labelId}
                primary={`List item ${value + 1}`}
                className={`${
                  checkedHelpValues.indexOf(value) !== -1 && "text-blue-500"
                }`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["ParameterInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getParameterById(props.idValue);
      }
    },

    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        console.log(status);

        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        let obj = JSON.parse(data.data.result);
        console.log("obj", obj);
        let resetObj = {
          id: obj.id,
          parameterCode: obj.parametercode,
          parameterName: obj.parametername,
          printName: obj.printname,
          typeOfValue: obj.typeofvalue,
          unit: obj.labunit,
          applyAgeWiseRange: obj.agerangeapplabunitlicable,
          status: obj.active,
        };

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
          setHelpValuesData(obj.helpvalueslist);
          setRight([obj.formula]);
          let arr = [];
          obj.agemapping.map((item) => {
            let obj = {
              ageFrom: item.fromage,
              ageTo: item.toage,
              lower: item.lowerlimit,
              upper: item.upperlimit,
              criticalLower: item.criticallowerlimit,
              criticalUpper: item.criticalupperlimit,
              gender: item.gender,
              ageType: item.agetype,
            };

            arr.push(obj);
          });
          setAgeRangeData([...arr]);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  return (
    <div className="w-[100%] grid justify-center items-center rounded lg:px-0">
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
        <Box sx={ModalStyle}>
          <div className="grid grid-cols-1 md:grid-cols-1 w-full">
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>

          <div className="row">
            <form onSubmit={handleSubmit(onSubmitData)}>
              <fieldset className="border border-gray-300 text-left w-full lg:mx-auto lg:px-4 md:mr-0 py-2 rounded lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700">
                  Add New Parameter
                </legend>

                <div
                  // onSubmit={handleSubmit(onSubmitData)}
                  className="grid grid-cols-1 md:grid-cols-1 w-full  gap-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-2 gap-2">
                    <div className="lg:col-span-2 md:col-span-1">
                      <InputField
                        name="parameterCode"
                        variant="outlined"
                        label="Parameter Code"
                        error={errors.parameterCode}
                        control={control}
                      />
                    </div>

                    <div className="lg:col-span-2 md:col-span-1">
                      <InputField
                        name="parameterName"
                        variant="outlined"
                        label="Parameter Name"
                        error={errors.parameterName}
                        control={control}
                      />
                    </div>

                    <div className="lg:col-span-2 md:col-span-1">
                      <InputField
                        name="printName"
                        variant="outlined"
                        label="Print Name"
                        error={errors.printName}
                        control={control}
                      />
                    </div>
                    <div className="lg:col-span-2 md:col-span-1">
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <FormLabel
                            id="demo-controlled-radio-buttons-group"
                            size="small"
                          >
                            Type of Value
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="typeOfValue"
                                {...field}
                                size="small"
                              >
                                <FormControlLabel
                                  value="Numeric"
                                  control={<Radio size="small" />}
                                  label="Num"
                                  size="small"
                                />
                                <FormControlLabel
                                  value="Text"
                                  control={<Radio size="small" />}
                                  label="Text"
                                  size="small"
                                />
                              </RadioGroup>
                            )}
                            name="typeOfValue"
                            control={control}
                          />
                        </div>
                      </FormControl>

                      {/* <RadioField
                        label="Type of Value"
                        name="typeOfValue"
                        control={control}
                        dataArray={typeOfValue}
                      /> */}
                    </div>
                    <div className="lg:col-span-2 md:col-span-1">
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        label="Unit"
                        dataArray={unitOptions}
                        isSearchable={false}
                        placeholder="Unit"
                        isClearable={false}
                      />
                    </div>

                    <div className="lg:col-span-2 md:col-span-1">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="applyAgeWiseRange"
                        label="Apply age wise range"
                        placeholder="Apply age wise range"
                      />
                    </div>

                    {/* Active Checkbox */}
                    <div className="">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="status"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 mx-2">
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          margin: 1,
                          backgroundColor: "whitesmoke",
                          borderRadius: "3px",
                        }}
                      >
                        <Tabs
                          value={tabValue}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab label="Help Values" {...a11yProps(0)} />
                          {radioValue !== "text" && (
                            <Tab label="Formula" {...a11yProps(1)} />
                          )}
                          {radioValue !== "text" && (
                            <Tab label="Age/Range" {...a11yProps(2)} />
                          )}
                        </Tabs>
                      </Box>
                      <TabPanel value={tabValue} index={0}>
                        <form
                        // onSubmit={handleSubmitHelpValues(
                        //   onSubmitDataHelpValues
                        // )}
                        >
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center space-x-2 col-span-3">
                              <div className="w-full">
                                <InputField
                                  name="addHelpValues"
                                  variant="outlined"
                                  label="Add Help Values"
                                  error={errorsHelpValues.addHelpValues}
                                  control={controlHelpValues}
                                />
                              </div>

                              {/* <AddButton /> */}

                              <button
                                type="button"
                                className="text-base font-medium  bg-customGreen text-white rounded h-10 w-12 justify-end"
                                onClick={handleSubmitHelpValues(
                                  onSubmitDataHelpValues
                                )}
                              >
                                {editHelpValues ? "Update" : "Add"}
                              </button>
                            </div>
                            {/* <TextField
                              fullWidth
                              label="Lorem epsum"
                              placeholder="Lorem epsum"
                              multiline
                              rows={2}
                              className="col-span-3"
                            /> */}
                            {helpValuesData && helpValuesData.length > 0 && (
                              <div className="col-span-3">
                                <HelpValuesTable
                                  rows={helpValuesData}
                                  handleHelpValuesEdit={handleHelpValuesEdit}
                                />
                              </div>
                            )}
                          </div>
                        </form>
                      </TabPanel>
                      <TabPanel value={tabValue} index={1}>
                        <div className="grid grid-cols-7 grid-rows-2 gap-2">
                          <div className="col-span-3 row-span-2">
                            {customList("Choices", left)}
                          </div>
                          <div className="col-span-1 row-span-2 flex flex-col  justify-center">
                            <div className="my-1 mx-auto">
                              <Button
                                //sx={{ my: 0.5, mx: 2 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={checked.length === 0}
                                aria-label="move selected right 2"
                              >
                                &gt;
                              </Button>
                            </div>
                            {/* <div className="my-1 mx-auto">
                            <Button
                              // sx={{ my: 0.5, mx: 2 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedLeft}
                              disabled={rightChecked.length === 0}
                              aria-label="move selected left 2"
                            >
                              &lt;
                            </Button>
                          </div> */}
                          </div>
                          <div className="col-span-3 row-span-1 border p-2 space-x-1 justify-start">
                            {right &&
                              right.length > 0 &&
                              right.map((item) => {
                                return <span className="">{item}</span>;
                              })}
                            {/* {customList("Chosen", right)} */}
                          </div>
                          <div className="col-span-3 row-span-1 justify-end grid grid-cols-4 gap-2 cursor-pointer">
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log("( button clicked");
                                setRight([...right, "("]);
                              }}
                            >
                              (
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log(") button clicked");
                                setRight([...right, ")"]);
                              }}
                            >
                              )
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log("+ button clicked");
                                setRight([...right, "+"]);
                              }}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log("- button clicked");
                                setRight([...right, "-"]);
                              }}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log("* button clicked");
                                setRight([...right, "*"]);
                              }}
                            >
                              *
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 rounded-md"
                              onClick={() => {
                                console.log("/ button clicked");
                                setRight([...right, "/"]);
                              }}
                            >
                              /
                            </button>

                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 text-red-500 rounded-md"
                              onClick={() => {
                                setRight([]);
                              }}
                            >
                              Clear
                            </button>
                            <button
                              type="button"
                              className="text-center font-semibold hover:shadow-md bg-gray-200 text-blue-500 rounded-md"
                              onClick={() => {
                                console.log("backspace button clicked");
                                let temp = [...right];
                                temp.pop();
                                setRight(temp);
                              }}
                            >
                              <BackspaceIcon />
                            </button>

                            {/* <TextField className='col-span-3' /> */}

                            {/* <div className="col-span-3 border"></div> */}
                          </div>
                          {/* <Grid container spacing={2} justifyContent="start" alignItems="center">
                          <Grid item>{customList('Choices', left)}</Grid>
                          <Grid item>
                            <Grid container direction="column" alignItems="center">
                              <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                              >
                                &gt;
                              </Button>
                              <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                              >
                                &lt;
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item>{customList('Chosen', right)}</Grid>
                        </Grid> */}
                        </div>
                      </TabPanel>

                      <TabPanel value={tabValue} index={2}>
                        <div className="w-full h-1/6 flex flex-col">
                          <form className="grid grid-cols-1 md:grid-cols-1 w-full gap-2">
                            <div className="py-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                              <div className="w-full">
                                <DropdownField
                                  control={controlAgeRange}
                                  error={errorsAgeRange.gender}
                                  name="gender"
                                  label="Gender"
                                  dataArray={genderOptions}
                                  isSearchable={false}
                                  placeholder="Gender"
                                  isClearable={false}
                                />
                              </div>
                              <div className="w-full">
                                <DropdownField
                                  control={controlAgeRange}
                                  error={errorsAgeRange.ageType}
                                  name="ageType"
                                  label="Age Type"
                                  dataArray={ageTypeOptions}
                                  isSearchable={false}
                                  placeholder="Age Type"
                                  isClearable={false}
                                  inputRef={{
                                    ...registerAgeRange("ageType", {
                                      onChange: (e) => {
                                        console.log("e", e.target.value);
                                        // resetAgeRange({
                                        //   ageType: e.target.value,
                                        //   ageFrom: e.target.value.fromage,
                                        //   ageTo: e.target.value.toage,
                                        // });
                                        setValueAgeRange(
                                          "ageType",
                                          e.target.value
                                        );
                                        setValueAgeRange(
                                          "ageFrom",
                                          e.target.value.fromage
                                        );
                                        setValueAgeRange(
                                          "ageTo",
                                          e.target.value.toage
                                        );
                                      },
                                    }),
                                  }}
                                />
                              </div>
                              <div className="w-full">
                                <InputField
                                  name="ageFrom"
                                  variant="outlined"
                                  label="Age From (Yrs)"
                                  disabled={true}
                                  error={errorsAgeRange.ageFrom}
                                  control={controlAgeRange}
                                />
                              </div>
                              <div className="w-full">
                                <InputField
                                  name="ageTo"
                                  variant="outlined"
                                  disabled={true}
                                  label="Age To (Yrs)"
                                  error={errorsAgeRange.ageTo}
                                  control={controlAgeRange}
                                />
                              </div>

                              <div className="w-full">
                                <InputField
                                  name="lower"
                                  variant="outlined"
                                  label="Lower"
                                  error={errorsAgeRange.lower}
                                  control={controlAgeRange}
                                />
                              </div>
                              <div className="w-full">
                                <InputField
                                  name="upper"
                                  variant="outlined"
                                  label="Upper"
                                  error={errorsAgeRange.upper}
                                  control={controlAgeRange}
                                />
                              </div>
                              <div className="w-full">
                                <InputField
                                  name="criticalLower"
                                  variant="outlined"
                                  label="Critical Lower"
                                  error={errorsAgeRange.criticalLower}
                                  control={controlAgeRange}
                                />
                              </div>

                              <div className="w-full">
                                <InputField
                                  name="criticalUpper"
                                  variant="outlined"
                                  label="Critical Upper"
                                  error={errorsAgeRange.criticalUpper}
                                  control={controlAgeRange}
                                />
                              </div>
                              <button
                                className="text-base font-medium  bg-customGreen text-white rounded h-10 w-12 justify-end"
                                type="button"
                                onClick={handleSubmitAgeRange(
                                  onSubmitDataAgeRange
                                )}
                              >
                                Add
                              </button>
                            </div>

                            {ageRangeData && ageRangeData.length > 0 && (
                              <AddRangeTable
                                rows={ageRangeData}
                                handleAgeRangeEdit={handleAgeRangeEdit}
                              />
                            )}

                            {/* <TableContainer sx={{ marginTop: 2 }}>
                            <Table aria-label="simple table" size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: "#F1F1F1" }}>
                                  <TableCell></TableCell>
                                  <TableCell>Code</TableCell>
                                  <TableCell>Parameter Name</TableCell>
                                  <TableCell>Gender</TableCell>
                                  <TableCell>Age Type</TableCell>
                                  <TableCell>Age From</TableCell>
                                  <TableCell>Age To</TableCell>
                                  <TableCell>Lower</TableCell>
                                  <TableCell>Upper</TableCell>
                                  <TableCell>Critical Lower</TableCell>
                                  <TableCell>Critical Upper</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {rows.map((row, index) => (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>{row.male}</TableCell>
                                    <TableCell>{row.code}</TableCell>
                                    <TableCell>{row.parameterName}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.ageType}</TableCell>
                                    <TableCell>{row.ageFrom}</TableCell>
                                    <TableCell>{row.ageTo}</TableCell>
                                    <TableCell>{row.lower}</TableCell>
                                    <TableCell>{row.upper}</TableCell>
                                    <TableCell>{row.criticalLower}</TableCell>
                                    <TableCell>{row.criticalUpper}</TableCell>
                                    <TableCell>
                                      <MdDelete size={18} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer> */}
                          </form>
                        </div>
                      </TabPanel>
                    </Box>
                  </div>
                </div>
              </fieldset>
              <div className="flex space-x-2 justify-end">
                <CloseButton
                  onClick={() => {
                    props.handleClose();
                  }}
                />
                {props.edit ? <UpdateButton /> : <SaveButton />}
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />
      <ConfirmationModal //setEdit(false);
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
    </div>
  );
};

export default ParameterModal;
