//imports from material ui library
import { Box, Modal, Button } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import CreateAbleSelect from "../../../../../../Common Components/FormFields/CreateableSelect";
//importing the asynchronous function for using in the react query hooks
import {
  addNewFloor,
  getFloorById,
  updateFloor,
  autoSearchFloor,
} from "../../../../../services/infrastructure/floor/FloorServices";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";

import AddButton from "../../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../../../Common Components/Buttons/UpdateButton";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";


function FloorModal(props) {
  //All the options in the Floor drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);

  //Yup schemaOne for the modal form of Post request
  const schemaOne = yup.object().shape({
    unit: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
    block: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select BLock"),
        label: yup.string().required("Please Select BLock"),
      }),
    floorCode: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor Code"),
        label: yup.string().required("Please Select Floor Code"),
      }),
    floorName: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed "
      ),
  });

  //Yup schemaTwo for the modal form of Put request
  const schemaTwo = yup.object().shape({
    unit: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
    block: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select BLock"),
        label: yup.string().required("Please Select BLock"),
      }),
    floorCodeName: yup.string().required("Required"),
    floorName: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed "
      ),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    unit: null,
    block: null,
    floorCode:"",
    floorCodeName: "",
    floorName: "",
    active: true,
  };
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  // useEffect(() => {
  //   console.log("this is Props.value" + props.idValue);
  // }, [props.idValue]);

  //state variable to open the confirmation modal for POST request
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleClosePutHas been called");
    if (openPut) {
      setOpenPut(false);
    }
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = multipleSchemaGenerator();

  function multipleSchemaGenerator() {
    if (props.edit === true) {
      return useForm({
        // use mode to specify the event that triggers each input field
        mode: "onChange",
        resolver: yupResolver(schemaTwo),
        defaultValues,
      });
    } else if (props.edit === false) {
      return useForm({
        // use mode to specify the event that triggers each input field
        mode: "onChange",
        resolver: yupResolver(schemaOne),
        defaultValues,
      });
    }
  }

  //onSubmitDataHandler function is passed as argument to the
  //built in handleSubmit() function of react hook forms.
  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      let updateObj = {
        active: data.active,
        id: data.id,
        floorCode: data.floorCodeName,
        floorName: data.floorName,
        block: {
          id: data.block.id,
        },
        unit: {
          id: data.unit.id,
        },
      };
      console.log(updateObj);
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log("data", data);

      let postedObj = {
        active: data.active,
        unit: {
          id: data.unit.value,
        },
        block: {
          id: data.block.value,
        },
        floor: {
          id: data.floorCode.id,
          code: data.floorCode.value,
          name: data.floorName,
        },
        name: data.floorName,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    setOpenPost(false);

    props.setOpenBackdrop(true);
      postFloor(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postFloor } = useMutation(addNewFloor, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      console.log("Data has been recorded successfully");
      successAlert(result.data.message);
      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      reset(defaultValues);
      props.setOpen(false);
      props.setEdit(false);
    },
    onError: (error) => {
      console.log(error);
      errorAlert(error.message);
      props.setOpenBackdrop(false);
      handleClosePost();
      //Code for React toast
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["floorInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        return getFloorById(props.idValue);
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
        let resetObj = {
          id: data.data.result.id,
          unit: {
            value: props.currentUnitOption.value,
            label: props.currentUnitOption.label,
          },
          block: {
            label: props.currentBlockOption.label,
            value: props.currentBlockOption.value,
          },
          floorName: data.data.result.floorName,
          floorCodeName: data.data.result.floorCode,
          active: data.data.result.status,
        };
        console.log("The resetObj for patching is " + JSON.stringify(resetObj));
        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error.message);
        //Code for React Toast
      },
    }
  );
  //event listener function for the Update button on the Confirmation modal
  //UPDATE PUT API
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Update record clicked");
      updateFloor(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert(response.data.message);
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setEdit(false);
            reset(defaultValues);
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
  //event listener function for the Add button on the modal form

  // Get request to have all the list of countries. This request belongs to the Floor-controller on swagger
  function getUnitList() {
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
  }
  //Store all the options of the unit Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
  }, []);

  function updateBlockOptions(unitId) {
    console.log("The unit id is " + unitId);

    getBlockDropdown(unitId).then((response) => {
      console.log("The response for unitId is " + unitId);

      console.log(JSON.stringify(response));

      //response.data.result

      setBlockOptions(response.data.result);
    });
  }

  //This function is props to the Searchbar component
  const handleChange = (e) => {
    console.log(e);

    console.log(
      "The current value in the Creatale select is " +
        JSON.stringify(getValues("floor"))
    );

    if (e.length > 0) {
      autoSearchFloor(e).then((response) => {
        console.log(
          "The response of autoSearchFloor is " + JSON.stringify(response)
        );

        if (response.data.result.length !== 0) {
          let displayObj = { value: e, label: e };
          console.log("displayObj " + JSON.stringify(displayObj));
          setFloorOptions(response.data.result);
        }
      });
    }
  };

  return (
    <>
      {/* Body of State Modal */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
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
              <fieldset className="border border-gray-300 text-left w-full md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                <legend className="px-2 font-bold text-gray-700 ml-3">
                  Add Floor
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full  gap-2 px-5"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        placeholder="Select Unit*"
                        dataArray={unitOptions}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("unit", {
                            onChange: (e) => {
                              console.log(
                                "Selected unit obj is " +
                                  JSON.stringify(e.target.value)
                              );

                              updateBlockOptions(e.target.value.id);
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.block}
                        name="block"
                        placeholder="Select Block*"
                        dataArray={blockOptions}
                        isDisabled={props.edit}
                      />
                    </div>
                    {props.edit ? (
                      <div className="w-full">
                        <InputField
                          name="floorCodeName"
                          variant="outlined"
                          label="Floor Code*"
                          error={errors.floorCodeName}
                          control={control}
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* floor code input field */}
                        <CreateAbleSelect
                          control={control}
                          name="floorCode"
                          dataArray={floorOptions}
                          onInputChange={handleChange}
                          placeholder="Floor Code*"
                          error={errors.floorCode}
                          inputRef={{
                            ...register("floorCode", {
                              onChange: (e) => {
                                console.log(
                                  "Selected option is " + JSON.stringify(e)
                                );
                                if (e.target.value !== null) {
                                  setValue("floorName", e.target.value.floor);
                                  console.log(e.target.value.floor);
                                } else if (e.target.value === null) {
                                  setValue("floorName", "");
                                }
                              },
                            }),
                          }}
                        />
                      </div>
                    )}
                    <div className="w-full">
                      {/* floor Name Input field */}
                      <InputField
                        name="floorName"
                        variant="outlined"
                        label="Floor Name*"
                        error={errors.floorName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    {/* Active Checkbox */}
                    <div className="">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton onClick={() => reset(defaultValues)} />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </form>
              </fieldset>
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </div>
          </Box>
        </Modal>
        {/* modal and table name button end */}
        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />
        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
    </>
  );
}
export default FloorModal;
