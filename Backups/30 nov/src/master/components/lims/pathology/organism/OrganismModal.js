import React, { useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  Tab,
  Tabs,
  Typography,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  List,
} from "@mui/material";
import PropTypes from "prop-types";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

import {
  addNewOrganism,
  getAntibiotics,
  getOrganismById,
  updateOrganism,
} from "../../../../services/lims/pathology/OrganismServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";

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

const OrganismModal = (props) => {
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [antiobioticsData, setAntiobioticsData] = React.useState([]);

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
    console.log("right", right);
  };

  const getAntibioticsList = () => {
    getAntibiotics()
      .then((response) => {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setAntiobioticsData(response.data.result);
        setLeft(response.data.result);
        console.log("left response.data.result", response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAntibioticsList();
  }, []);

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const schema = yup.object().shape({
    organismName: yup.string().required("Organism Name Required"),
    organismCode: yup.string().required("Organism Code Required"),
  });

  const customList = (title, items) => (
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
      {items &&
        items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
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
                primary={`${value.label}`}
                className={`${
                  checked.indexOf(value) !== -1 && "text-blue-500"
                }`}
              />
            </ListItem>
          );
        })}
      <ListItem />
    </List>
  );

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      organismCode: "",
      organismName: "",
      id: "",
      status: true,
    },
  });

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      let temp = [...right];

      temp.map((item) => {
        delete item.value;
        delete item.label;
      });

      console.log("temp", temp);

      let updateObj = {
        active: data.status,
        organismCode: data.organismCode,
        organismName: data.organismName,
        id: data.id,
        antibiotics: [...temp],
      };

      console.log("updateObj", updateObj);
      setOpenPut(true);
      setFinalData(updateObj);

      //updateData(data);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let temp = [...right];

      temp.map((item) => {
        delete item.value;
        delete item.label;
      });

      console.log("temp", temp);

      let obj = {
        active: data.status,
        organismCode: data.organismCode,
        organismName: data.organismName,
        antibiotics: [...temp],
      };

      console.log("obj", obj);
      setOpenPost(true);
      setFinalData(obj);
    }
  };

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  const { mutate: postOrganism } = useMutation(addNewOrganism, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);

      //When the request is successfull ; close the confirmation modal for POST

      successAlert();
      props.populateTable({ page: 0, size: 10, searchString: "" });
      console.log("Record has been created");

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset();

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      props.setOpenBackdrop(false);

      //Code for React toast
      errorAlert();

      //When the request is not successfull ; close the confirmation modal for POST
      handleClosePost();
    },
  });

  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postOrganism(finalData);
  }

  const { status } = useQuery(
    ["Organism", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getOrganismById(props.idValue);
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
          organismName: obj.organismname,
          organismCode: obj.organismcode,
          id: obj.id,
          status: obj.status,
        };

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
          //setLeft([]);

          obj.antibiotics.map((item) => {
            let obj = {
              id: item.id,
              value: item.id,
              label: item.name,
            };
            right.push(obj);
          });
          //setRight([...arr]);
          console.log("left", left);
          console.log("right", right);
          console.log("left===right", left === right);
          if (left !== right) {
            console.log("left", left);
            let result = left.filter(
              (item1) =>
                !right.some(
                  (item2) =>
                    item2.id === item1.id && item2.label === item1.label
                )
            );
            console.log("result", result);
            setLeft([...result]);
          } else if (left === right) {
            setLeft([]);
          }
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    updateOrganism(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset();
          props.setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setOpenBackdrop(false);
        errorAlert(error.message);
      });
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-[100%] grid justify-center items-center rounded lg:px-0 mt-4">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <div className="grid grid-cols-1 md:grid-cols-1  w-full">
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
              }}
            />
          </div>

          <div className="row">
            <form onSubmit={handleSubmit(onSubmitDataHandler)}>
              <fieldset className="border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700">
                  Add New Lab Organism
                </legend>

                <div
                  // onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1 w-full  gap-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-2 gap-2">
                    <div className="lg:col-span-2 md:col-span-1">
                      <InputField
                        name="organismCode"
                        variant="outlined"
                        label="Organism Code"
                        error={errors.organismCode}
                        control={control}
                      />
                    </div>

                    <div className="lg:col-span-2 md:col-span-1">
                      <InputField
                        name="organismName"
                        variant="outlined"
                        label="Organism Name"
                        error={errors.organismName}
                        control={control}
                      />
                    </div>

                    {/* Active Checkbox */}
                    <div className="lg:col-span-1 md:col-span-1">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="status"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                    <span className="lg:col-span-5 md:col-span-2">
                      Antibiotics
                    </span>
                    <div className="grid grid-cols-5 gap-2 lg:col-span-5 md:col-span-2">
                      <div className="col-span-2 border">
                        {customList("Choices", left)}
                      </div>
                      <div className="col-span-1 flex flex-col justify-center">
                        <div className="my-1 mx-auto">
                          <Button
                            //sx={{ my: 0.5, mx: 4 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            &gt;
                          </Button>
                        </div>
                        <div className="my-1 mx-auto">
                          <Button
                            //sx={{ my: 0.5, mx: 4 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            &lt;
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 border">
                        {customList("Chosen", right)}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="flex gap-4 justify-end">
                {props.edit ? (
                  <CancelButton
                    onClick={() => {
                      props.handleClose();
                      props.setEdit(false);
                      reset();
                    }}
                  />
                ) : (
                  <ResetButton onClick={() => reset()} />
                )}

                {props.edit ? <UpdateButton /> : <AddButton />}
                <CommonBackDrop openBackdrop={props.openBackdrop} />
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
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

export default OrganismModal;
