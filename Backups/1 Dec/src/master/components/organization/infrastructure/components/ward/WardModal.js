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
  addNewWard,
  autoSearchWard,
  getWardById,
  updateWard,
} from "../../../../../services/infrastructure/ward/WardServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

import { getFloorDropdown } from "../../../../../services/infrastructure/floor/FloorServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
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

function WardModal(props) {
  //All the options in the Block drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [unitId, setUnitId] = useState("");
  const [blockId, setBlockId] = useState("");

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
        value: yup.string().required("Please Select Block"),
        label: yup.string().required("Please Select Block"),
      }),
    floor: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor"),
        label: yup.string().required("Please Select Floor"),
      }),
    wardCode: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Ward Code"),
        label: yup.string().required("Please Select Ward Code"),
      }),
    wardName: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed "
      ),
  });
  //Yup schemaOne for the modal form of Put request
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
        value: yup.string().required("Please Select Block"),
        label: yup.string().required("Please Select Block"),
      }),
    floor: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor"),
        label: yup.string().required("Please Select Floor"),
      }),
    wardCodeName: yup.string().required("Required"),
    wardName: yup
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
    floor: null,
    block: null,
    unit: null,
    wardCode: "",
    wardCodeName: "",
    wardName: "",
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
    console.log("handleCloePutHAs been called");
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
        wardCode: data.wardCodeName,
        wardName: data.wardName,
        floor: {
          id: data.floor.id,
        },
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
      console.log(data);

      let postedObj = {
        active: data.active,
        unit: {
          id: data.unit.id,
        },
        block: {
          id: data.block.id,
        },
        floor: {
          id: data.floor.id,
        },
        ward: {
          id: data.wardCode.id,
          code: data.wardCode.value,
          name: data.wardName,
        },
        name: data.wardName,
      };

      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postWard(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postWard } = useMutation(addNewWard, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      console.log("Record has been created");
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
  }); // Get request to have all the list of countries. This request belongs to the ward-controller on swagger

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["WardInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of ward.js
    () => {
      if (props.idValue && openPut !== true) {
        return getWardById(props.idValue);
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
        console.log(status); // Get request to have all the list of countries. This request belongs to the ward-controller on swagger
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
          floor: {
            label: props.currentFloorOption.label,
            value: props.currentFloorOption.value,
          },
          wardName: data.data.result.wardName,
          wardCodeName: data.data.result.wardCode,
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
  function updateRecord() {
    handleClosePut();
    console.log("Update record clicked");
    props.setOpenBackdrop(true);
    updateWard(finalData)
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
  //Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
  }, []);

  function updateBlockOptions(requiredUnitId) {
    getBlockDropdown(requiredUnitId.id)
      .then((response) => {
        console.log(response);

        setValue("block", null);
        setBlockOptions(response.data.result);

        setValue("floor", null);
        setFloorOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateFloorOptions(unitId, blockId) {
    getFloorDropdown(unitId, blockId)
      .then((response) => {
        console.log("The floor options are " + JSON.stringify(response));

        setValue("floor", null);
        setFloorOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (unitId !== "" && blockId !== "") {
      updateFloorOptions(unitId, blockId);
    }
  }, [unitId, blockId]);

  const handleChange = (e) => {
    console.log(e);

    if (e.length > 0) {
      autoSearchWard(e).then((response) => {
        console.log(
          "The response of autoSearchWard is " + JSON.stringify(response)
        );

        // if (response.data.result.length !== 0) {
        //   let displayObj = { value: e, label: e };
        //   console.log("displayObj " + JSON.stringify(displayObj));
        setWardOptions(response.data.result);
        // }
      });
    }
  };

  return (
    <>
      {/* Body of ward Modal */}
      <div className="w-full justify-center items-center rounded lg:px-0 mt-4">
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
                  Add Ward
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full gap-2 px-5"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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
                              console.log(e.target.value.id);
                              setUnitId(e.target.value.id);
                              updateBlockOptions(e.target.value);
                              console.log(e.target.value);
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
                        inputRef={{
                          ...register("block", {
                            onChange: (e) => {
                              console.log(e.target.value);
                              setBlockId(e.target.value.id);
                              // updateFloorOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.floor}
                        name="floor"
                        placeholder="Select Floor*"
                        dataArray={floorOptions}
                        isDisabled={props.edit}
                      />
                    </div>
                    {props.edit ? (
                      <div className="w-full">
                        <InputField
                          name="wardCodeName"
                          variant="outlined"
                          label="Ward Code*"
                          error={errors.wardCodeName}
                          control={control}
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* ward code input field */}
                        <CreateAbleSelect
                          control={control}
                          error={errors.wardCode}
                          name="wardCode"
                          placeholder="Ward Code*"
                          dataArray={wardOptions}
                          onInputChange={handleChange}
                          inputRef={{
                            ...register("wardCode", {
                              onChange: (e) => {
                                console.log(
                                  "Selected option is " + JSON.stringify(e)
                                );
                                if (e.target.value !== null) {
                                  setValue("wardName", e.target.value.ward);
                                  console.log(e.target.value.ward);
                                } else if (e.target.value === null) {
                                  setValue("wardName", "");
                                }
                              },
                            }),
                          }}
                        />
                      </div>
                    )}
                    <div className="w-full">
                      {/* block Name Input field */}
                      <InputField
                        name="wardName"
                        variant="outlined"
                        label="Ward Name*"
                        error={errors.wardName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        useRef
                      />
                    </div>
                    {/* Active Checkbox */}
                    <div className="lg:justify-end">
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
                    <div className="flex items-center gap-4">
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
export default WardModal;
