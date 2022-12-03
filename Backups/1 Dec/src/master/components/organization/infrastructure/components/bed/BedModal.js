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
//importing the asynchronous function for using in the react query hooks
import {
  addNewBed,
  autoSearchBed,
  getBedById,
  updateBed,
} from "../../../../../services/infrastructure/bed/BedServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import { getBlockDropdown } from "../../../../../services/infrastructure/block/BlockServices";

import { getFloorDropdown } from "../../../../../services/infrastructure/floor/FloorServices";

import { getWardDropdown } from "../../../../../services/infrastructure/ward/WardServices";

import { getRoomDropdown } from "../../../../../services/infrastructure/room/RoomServices";

import { getClassCategoryDropdown } from "../../../../../services/billing/class/ClassServices";

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

import CreateableSelect from "../../../../../../Common Components/FormFields/CreateableSelect";

function BedModal(props) {
  //All the options in the bed drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [bedOptions, setBedOptions] = useState([]);
  const [classTypeOptions, setClasstypeOptions] = useState([]);
  const [unitId, setUnitId] = useState("");
  const [blockId, setBlockId] = useState("");
  const [floorId, setFloorId] = useState("");

  //Yup schemaOne for the modal form of post request
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
        value: yup.string().required("Please Select block"),
        label: yup.string().required("Please Select block"),
      }),
    floor: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor"),
        label: yup.string().required("Please Select Floor"),
      }),
    ward: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Ward"),
        label: yup.string().required("Please Select Ward"),
      }),
    room: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Room No"),
        label: yup.string().required("Please Select Room No"),
      }),
    classType: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Category"),
        label: yup.string().required("Please Select Category"),
      }),
    bedCode: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Bed Code"),
        label: yup.string().required("Please Select Bed Code"),
      }),
    bedNumber: yup.number().required("Required"),
  });

  //Yup schemaTwo for the modal form of post request
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
        value: yup.string().required("Please Select block"),
        label: yup.string().required("Please Select block"),
      }),
    floor: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor"),
        label: yup.string().required("Please Select Floor"),
      }),
    ward: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Ward"),
        label: yup.string().required("Please Select Ward"),
      }),
    room: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Room No"),
        label: yup.string().required("Please Select Room No"),
      }),
    classType: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Category"),
        label: yup.string().required("Please Select Category"),
      }),
    bedCodeName: yup.string().required("Required"),
    bedNumber: yup.string().required("Required"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    unit: null,
    block: null,
    floor: null,
    ward: null,
    room: null,
    bedCode: "",
    bedNumber: "",
    bedCodeName: "",
    classType: null,
    active: true,
    bedFacility: [{}],
    underMaintenance: false,
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
    console.log("handleCloePut has been called");
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
    watch,
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

      let bedFacilities = [];

      console.log(finalData);

      for (let propertyName in finalData) {
        if (
          propertyName !== "id" &&
          propertyName !== "bedCode" &&
          propertyName !== "bedNumber" &&
          propertyName !== "active" &&
          propertyName !== "bedFacility" &&
          propertyName !== "block" &&
          propertyName !== "classType" &&
          propertyName !== "floor" &&
          propertyName !== "unit" &&
          propertyName !== "ward" &&
          propertyName !== "underMaintenance" &&
          propertyName !== "allocatedFlag"
        ) {
          if (finalData[propertyName] === true) {
            let facilityMatch = props.facilityOptions.find(function(
              singleOption
            ) {
              return singleOption.label === propertyName;
            });

            console.log("The facilityMatch obj is ");

            console.log(facilityMatch);

            let obj = {
              id: facilityMatch.id,
              facility: facilityMatch.label,
            };

            bedFacilities.push(obj);
          }
        }
      }

      let updateObj = {
        active: data.active,
        id: data.id,
        bedCode: data.bedCodeName,
        bedNumber: data.bedNumber,
        bedFacilities: bedFacilities,
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
          id: data.ward.id,
        },
        room: {
          id: data.room.id,
        },
        classType: {
          id: data.classType.id,
        },
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let bedFacilities = [];

      console.log(finalData);

      for (let propertyName in finalData) {
        if (
          propertyName !== "id" &&
          propertyName !== "bedCode" &&
          propertyName !== "bedNumber" &&
          propertyName !== "active" &&
          propertyName !== "bedFacility" &&
          propertyName !== "block" &&
          propertyName !== "classType" &&
          propertyName !== "floor" &&
          propertyName !== "unit" &&
          propertyName !== "ward" &&
          propertyName !== "underMaintenance" &&
          propertyName !== "allocatedFlag"
        ) {
          if (finalData[propertyName] === true) {
            let facilityMatch = props.facilityOptions.find(function(
              singleOption
            ) {
              return singleOption.label === propertyName;
            });

            console.log("The facilityMatch obj is ");

            console.log(facilityMatch);

            let obj = {
              id: facilityMatch.id,
              facility: facilityMatch.label,
            };

            bedFacilities.push(obj);
          }
        }
      }

      let postedObj = {
        active: data.active,
        bed: {
          active: data.active,
          id: data.bedCode.id,
          bedCode: data.bedCode.value,
          bedNumber: data.bedNumber,
        },
        bedFacilities: bedFacilities,
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
          id: data.ward.id,
        },
        room: {
          id: data.room.id,
        },
        classType: {
          id: data.classType.id,
        },
      };
      console.log("The final obj is ");
      console.log(finalData);

      console.log("The post obj is ");
      console.log(postedObj);

      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  useEffect(() => {
    console.log(props.facilityOptions);
    defaultValues.bedFacility = props.facilityOptions;

    const subscription = watch((data) => {
      console.log("The subscribed data is ");
      console.log(data);

      console.log(typeof data);

      setFinalData(data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postBed(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postBed } = useMutation(addNewBed, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      console.log("Record has been created");
      //When the request is successfull ; close the confirmation modal for POST
      props.setOpenBackdrop(false);
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
      handleClosePost();
      props.setOpenBackdrop(false);
      //Code for React toast
    },
  });

  useEffect(() => {
    if (props.edit === true) {
      setValue("unit", props.currentUnitOption);
      setValue("block", props.currentBlockOption);
      setValue("floor", props.currentFloorOption);
      setValue("ward", props.currentWardOption);
      setValue("room", props.currentRoomOption);
      setValue("classType", props.currentClasstypeOption);
    }
  }, [props.edit]);

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["bedInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idUnitValue && props.bedIdValue && openPut !== true) {
        return getBedById(props.idUnitValue, props.bedIdValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("facility options are ");
        console.log(props.facilityOptions);

        console.log(
          "data fetched with no problem by using the react query library"
        );
        console.log(status);
        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        console.log(JSON.parse(data.data.result));

        let resultObj = JSON.parse(data.data.result);

        console.log("resultObj is ");
        console.log(resultObj);

        console.log("selected bedfacilities are ");
        console.log(resultObj.bedfacilities);

        let selectedFacility = resultObj.bedfacilities;

        //iteration on the array selectedFacility
        for (let singleFacility of selectedFacility) {
          // singleFacility.facility
          //tickmark the selected facilities
          setValue(singleFacility.facility, true);
        }

        if (resultObj.active === true) {
          setValue("active", true);
        } else if (resultObj.active === false) {
          setValue("active", false);
        }

        setValue("id", resultObj.bed);
        setValue("bedCodeName", resultObj.bedcode);
        setValue("bedNumber", resultObj.bednumber);

        if (resultObj.undermaintenance === true) {
          setValue("underMaintenance", true);
        } else if (resultObj.undermaintenance === false) {
          setValue("underMaintenance", false);
        }

        setValue("unit", props.currentUnitOption);
        setValue("block", props.currentBlockOption);
        setValue("floor", props.currentFloorOption);
        setValue("ward", props.currentWardOption);
        setValue("room", props.currentRoomOption);
        setValue("classType", props.currentClasstypeOption);
      },
      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("UpdateRecord fun call");
    handleClosePut();
    props.setOpenBackdrop(true);
    updateBed(finalData)
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
        errorAlert(error.message);
        props.setOpenBackdrop(false);
      });
  }

  //Get request to have all the list of countries. This request belongs to the bed-controller on swagger
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

        setValue("ward", null);
        setWardOptions([]);
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

        setValue("ward", null);
        setWardOptions([]);
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

  function updateWardOptions(unitId, blockId, floorId) {
    getWardDropdown(unitId, blockId, floorId)
      .then((response) => {
        console.log("The floor options are " + JSON.stringify(response));

        setValue("ward", null);
        setWardOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (unitId !== "" && blockId !== "" && floorId !== "") {
      updateWardOptions(unitId, blockId, floorId);
    }
  }, [unitId, blockId, floorId]);

  function getRoomList() {
    getRoomDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setRoomOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getRoomList();
  }, []);

  function getCategoryList() {
    getClassCategoryDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setClasstypeOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Store all the options of the ward Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getCategoryList();
  }, []);

  const handleChange = (e) => {
    console.log(e);

    if (e.length > 0) {
      autoSearchBed(e).then((response) => {
        console.log(
          "The response of autoSearchBed is " + JSON.stringify(response)
        );

        // if (response.data.result.length !== 0) {
        //   let displayObj = { value: e, label: e };
        //   console.log("displayObj " + JSON.stringify(displayObj));
        setBedOptions(response.data.result);
        // }
      });
    }
  };

  return (
    <>
      {/* Body of State Modal */}
      <div className="w-full grid items-center rounded mt-4">
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
                {props.edit ? (
                  <legend className="px-2 font-bold text-gray-700 ml-3">
                    Update Bed
                  </legend>
                ) : (
                  <legend className="px-2 font-bold text-gray-700 ml-3">
                    Add Bed
                  </legend>
                )}
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid md:grid-cols-1 w-full  gap-2 px-5"
                >
                  <div className="gap-y-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        placeholder="Select Unit*"
                        dataArray={unitOptions}
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
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
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
                        inputRef={{
                          ...register("block", {
                            onChange: (e) => {
                              console.log(e.target.value);
                              setBlockId(e.target.value.id);
                              updateFloorOptions(e.target.value);
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
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
                        inputRef={{
                          ...register("floor", {
                            onChange: (e) => {
                              console.log(e.target.value);
                              setFloorId(e.target.value.id);
                              // updateWardOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.ward}
                        name="ward"
                        placeholder="Select Ward*"
                        dataArray={wardOptions}
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
                      />
                    </div>
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        Maintanance
                        error={errors.room}
                        name="room"
                        placeholder="Select Room*"
                        dataArray={roomOptions}
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
                      />
                    </div>
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.classType}
                        name="classType"
                        placeholder="Select Category*"
                        dataArray={classTypeOptions}
                        isDisabled={
                          props.idUnitValue === null && props.edit === true
                        }
                      />
                    </div>
                    {props.edit ? (
                      <div className="w-full">
                        <InputField
                          name="bedCodeName"
                          variant="outlined"
                          label="Bed Code*"
                          error={errors.bedCodeName}
                          control={control}
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* bed code input field */}
                        <CreateableSelect
                          control={control}
                          error={errors.bedCode}
                          name="bedCode"
                          placeholder="Bed Code*"
                          dataArray={bedOptions}
                          onInputChange={handleChange}
                          inputRef={{
                            ...register("bedCode", {
                              onChange: (e) => {
                                console.log(
                                  "Selected option is " + JSON.stringify(e)
                                );
                                if (e.target.value !== null) {
                                  setValue("bedNumber", e.target.value.bed);
                                  console.log(e.target.value.bed);
                                } else if (e.target.value === null) {
                                  setValue("bedNumber", "");
                                }
                              },
                            }),
                          }}
                        />
                      </div>
                    )}
                    <div className="w-full">
                      {/* Bed Number Input field */}
                      <InputField
                        name="bedNumber"
                        variant="outlined"
                        label="Bed Number*"
                        error={errors.bedNumber}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <p className="font-bold">Facilities:</p>

                      <fieldset disabled={!props.idUnitValue && props.edit}>
                        {props.facilityOptions.map((singleFacility) => {
                          return (
                            <>
                              <CheckBoxField
                                control={control}
                                name={singleFacility.label}
                                label={singleFacility.label}
                                value={singleFacility.value}
                                style={
                                  !props.idUnitValue && props.edit
                                    ? { color: "gray" }
                                    : null
                                }
                              />
                            </>
                          );
                        })}
                      </fieldset>
                    </div>
                    <div className="w-full">
                      {props.edit ? (
                        <CheckBoxField
                          control={control}
                          name="underMaintenance"
                          label="Under Maintenance"
                          placeholder="Under Maintenance"
                        />
                      ) : null}
                    </div>
                    <div className="">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Active"
                      />
                    </div>

                    {/* Active Checkbox */}
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
export default BedModal;
